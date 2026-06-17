'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/*
  "Cathedral" WebGL2 shader, adapted from the shadcn component into a decorative
  hero BACKGROUND. The original is a fullscreen, black-backed, multi-colour
  effect; here the fragment shader is recoloured to the site's soft pink → cream
  shade and rendered light, so the Digi Design hero keeps its espresso text and
  stays consistent with the Services / About heroes. The original WebGL2 runtime
  (DPR handling, ResizeObserver, context-loss recovery) is preserved; pointer
  interaction is dropped (it's a non-interactive background) and motion freezes
  for prefers-reduced-motion.
*/

const FRAG_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution; // (width, height, dpr)
uniform float iTime;       // seconds

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2  r  = iResolution.xy;
  float t  = iTime;
  vec3  FC = vec3(fragCoord, t);
  vec4  o  = vec4(0.0);

  vec3 p;
  for (float i, z, d; i++ < 5e1; o += (sin(p.y + vec4(6., 1., 2., 3.)) + 2.) / d / z) {
    p = z * normalize(FC.rgb * 2. - r.xyx) + t;
    z += d = length(vec2(
      length(cos(sin(.5 * p) + p).xy + 1.) - 2.,
      min(d = p.z - t + 9., d * .1) * .5
    ));
  }

  o = tanh(o / 5e1);

  // Intensity of the "cathedral" light structure.
  float glow = clamp((o.r + o.g + o.b) / 3.0, 0.0, 1.0);

  // Site backdrop: soft pink at the top, cream at the bottom.
  vec2 uv = fragCoord / r;
  vec3 gradTop = vec3(0.965, 0.788, 0.824); // ~ #F6C9D2 soft rose
  vec3 gradBot = vec3(1.000, 0.973, 0.957); // ~ #FFF8F4 cream
  vec3 base = mix(gradBot, gradTop, uv.y);

  // Warm peach / coral accent for the light rays — kept soft so the base stays light.
  vec3 accent = vec3(0.910, 0.573, 0.486); // ~ coral
  vec3 col = mix(base, accent, glow * 0.40);
  col += glow * 0.12; // gentle highlight
  col = clamp(col, 0.0, 1.0);

  fragColor = vec4(col, 1.0);
}

void main() { mainImage(fragColor, gl_FragCoord.xy); }
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(sh) || '';
  return { shader: ok ? sh : null, log };
}

function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(prog) || '';
  return { program: ok ? prog : null, log };
}

type CathedralProps = {
  className?: string;
  /** Clamp the device-pixel-ratio for performance. Defaults to min(dpr, 2). */
  pixelRatio?: number;
};

export function Cathedral({ className, pixelRatio }: CathedralProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });
    if (!gl) return; // WebGL2 unsupported → site backdrop shows through (graceful)

    let disposed = false;
    // Declared up-front so `cleanup` can reference it even on the early-return
    // paths below (shader compile / program link failure), where the
    // ResizeObserver is never created. A bare `const ro` declared later would
    // put `ro` in the temporal dead zone and make cleanup throw.
    let ro: ResizeObserver | null = null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fullscreen triangle.
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const cleanup = () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      ro?.disconnect();
      try { gl.deleteBuffer(vbo); } catch {}
      try { gl.deleteVertexArray(vao); } catch {}
      // Explicitly release the GL context so dev Fast Refresh / unmounts don't
      // leak contexts and hit the browser's live-context cap.
      try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
    };

    const { shader: vs, log: vsLog } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    if (!vs) { console.error('Vertex compile error:\n' + vsLog); return cleanup; }
    const { shader: fs, log: fsLog } = safeCompile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!fs) { console.error('Fragment compile error:\n' + fsLog); gl.deleteShader(vs); return cleanup; }
    const { program, log: linkLog } = safeLink(gl, vs, fs);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!program) { console.error('Program link error:\n' + linkLog); return cleanup; }

    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');

    const getDpr = () => {
      const sys = window.devicePixelRatio || 1;
      return Math.max(1, Math.min(2, pixelRatio ?? sys));
    };

    const render = (t: number) => {
      gl.useProgram(program);
      const dpr = getDpr();
      if (uResolution) gl.uniform3f(uResolution, canvas.width, canvas.height, dpr);
      if (uTime) gl.uniform1f(uTime, t);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let resizeScheduled = false;
    const applySize = () => {
      resizeScheduled = false;
      if (disposed) return;
      const dpr = getDpr();
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        if (reduce) render(0); // keep a crisp static frame after layout changes
      }
    };
    const scheduleSize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    };
    ro = new ResizeObserver(scheduleSize);
    ro.observe(canvas);
    applySize();

    function onContextLost(ev: Event) {
      ev.preventDefault();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    function onContextRestored() {
      scheduleSize();
      startRef.current = performance.now();
      if (!reduce && !rafRef.current) rafRef.current = requestAnimationFrame(tick);
    }
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    startRef.current = performance.now();

    function tick(now: number) {
      if (disposed) return;
      if (gl!.isContextLost()) { rafRef.current = requestAnimationFrame(tick); return; }
      if (resizeScheduled) applySize();
      try {
        render((now - startRef.current) / 1000);
      } catch (err) {
        console.error((err as Error)?.message ?? String(err));
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    if (reduce) {
      render(0); // single frozen frame — respects the user's motion preference
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return cleanup;
  }, [pixelRatio]);

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default Cathedral;
