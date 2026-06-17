'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const orbit = [
  'Lumina Skin Clinic',
  'Velvet Aesthetics',
  'Glow & Co.',
  'Aura Derma Studio',
  'Radiance Med Spa',
  'Petals Beauty Bar',
  'Serene Cosmetic Care',
  'Bloom Skin Lab',
];

export function Scrollytelling() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const counterRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.92]);

  return (
    <section ref={ref} className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Chapter Three · 03 / 03 — The Track Record</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Clients who keep coming back — the clearest signal that the work works.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-taupe">
            Some relationships are now in their fifth and sixth year. Multi-year clients,
            hundreds of sites shipped, one accountable team. That continuity is the metric
            we are proudest of.
          </p>
          <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-taupe">
            <span className="inline-block h-2 w-2 animate-float rounded-full bg-nude-400" />
            Scroll to orbit
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <motion.div style={{ rotate, scale }} className="absolute inset-0">
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-nude-300/60" />
            <div className="absolute inset-[14%] rounded-full border border-nude-300/40" />
            <div className="absolute inset-[28%] rounded-full border border-nude-300/30" />

            {orbit.map((name, i) => {
              const angle = (i / orbit.length) * Math.PI * 2;
              const radius = 46; // % from centre
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <motion.div
                  key={name}
                  style={{ left: `${x}%`, top: `${y}%`, rotate: counterRotate }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="whitespace-nowrap rounded-full border border-nude-200 bg-white/90 px-3 py-1.5 font-mono text-[10px] text-espresso shadow-card backdrop-blur">
                    {name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Centre hub */}
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-espresso text-center shadow-glow">
            <span className="font-display text-2xl font-semibold leading-none text-nude-300">
              100+
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-nude-200/80">
              projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
