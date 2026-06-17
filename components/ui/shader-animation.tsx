'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * WebGL fractal-flow shader, adapted from the shadcn "shader-animation" demo into
 * a decorative hero BACKGROUND:
 *   - sizes to its parent box (not the window) so it lives inside a hero section;
 *   - recoloured to the site's own soft pink → cream shade (the original blue /
 *     magenta ramp has been replaced) so the hero reads as the site background
 *     gently moving, not a separate colour panel;
 *   - client-only + freezes for prefers-reduced-motion;
 *   - disposes its GL program / buffers on unmount.
 *
 * Render it as an absolutely-positioned layer inside a `relative` section.
 */
type ShaderAnimationProps = {
  className?: string;
  /** Track the pointer for a subtle ripple. Default: true. */
  interactive?: boolean;
};

export function ShaderAnimation({ className, interactive = true }: ShaderAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  // Keep the latest `interactive` value readable inside the GL effect without
  // re-initialising the whole context when the prop changes.
  const interactiveRef = useRef(interactive);
  interactiveRef.current = interactive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Recoloured to the brand shade: a soft pink (top) → cream (bottom) base — the
    // same gradient as the site backdrop — with light, on-palette shimmer veins.
    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // High-luminance warm palette (peach / blush / rose) — stays light.
      vec3 palette(float t) {
        vec3 a = vec3(0.95, 0.85, 0.83);
        vec3 b = vec3(0.06, 0.10, 0.12);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.00, 0.12, 0.22);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        float d = length(uv);
        vec3 glints = vec3(0.0);

        // Animated fractal layers (Kishimisu-style flow), kept subtle.
        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;

          d = length(uv) * exp(-length(uv0));
          vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.02);

          d = sin(d * 4.0 + u_time) / 36.0;
          d = pow(0.004 / abs(d), 1.3);

          // Gentle pointer ripple.
          vec2 m = u_mouse - uv0;
          d *= 1.0 + sin(length(m) * 10.0 - u_time * 2.0) * 0.08;

          glints += color * d;
        }

        // Site backdrop: soft pink at the top, cream at the bottom.
        vec3 gradTop = vec3(0.965, 0.788, 0.824); // ~ #F6C9D2 soft rose
        vec3 gradBot = vec3(1.000, 0.973, 0.957); // ~ #FFF8F4 cream
        vec3 base = mix(gradBot, gradTop, uv0.y);

        // Add the shimmer softly so it never overwhelms the light base.
        vec3 col = base + glints * 0.05;
        col = clamp(col, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(ctx: WebGLRenderingContext, type: number, source: string) {
      const shader = ctx.createShader(type);
      if (!shader) return null;
      ctx.shaderSource(shader, source);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        console.error('Shader compilation error:', ctx.getShaderInfoLog(shader));
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    // Full-screen quad.
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    const draw = (t: number) => {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, t);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Size the drawing buffer to the canvas's own box (the hero), capped DPR.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (reduceMotion) draw(0); // keep a crisp static frame after layout changes
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveRef.current) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let raf = 0;
    const startTime = performance.now();
    if (reduceMotion) {
      draw(0); // single frozen frame — respects the user's motion preference
    } else {
      const loop = () => {
        draw((performance.now() - startTime) * 0.001);
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default ShaderAnimation;
