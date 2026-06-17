'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * GSAP ScrollTrigger "hook" storytelling section. A pinned deep-plum panel
 * scrubs through 4 brand-story beats as you scroll. The copy is server-rendered
 * (indexable + readable with no JS — it simply stacks); GSAP converts it into
 * the pinned, cross-faded scrollytelling after hydration. Respects
 * prefers-reduced-motion (no pin, static stacked beats).
 */
const beats = [
  { lead: 'Your next patient or client is choosing a clinic', highlight: 'right now — on their phone.' },
  { lead: 'A slow, dated website plants one quiet doubt:', highlight: '“is the care any better?”' },
  { lead: 'We build clinic platforms that don’t just look good —', highlight: 'they earn the booking.' },
  { lead: 'Strategy, design, development and support —', highlight: 'under one accountable roof.' },
];

export function StoryScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return; // leave the static stacked layout in place

      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = (gsapMod as any).default ?? gsapMod;
      const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const els = beatRefs.current.filter(Boolean) as HTMLDivElement[];
        if (els.length < 2) return;

        // Stack the beats; first is centred, the rest wait below the frame.
        gsap.set(els, { position: 'absolute', inset: 0, opacity: 0, yPercent: 60 });
        gsap.set(els[0], { opacity: 1, yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${els.length * 60}%`,
            pin: panelRef.current,
            scrub: 0.6,
            onUpdate: (self: { progress: number }) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Slide-through: the outgoing line exits upward while the incoming line
        // rises from below — they're never in the same place, so no overlap.
        for (let i = 1; i < els.length; i++) {
          tl.to(els[i - 1], { opacity: 0, yPercent: -55, duration: 0.55, ease: 'power2.in' }, i);
          tl.fromTo(
            els[i],
            { opacity: 0, yPercent: 55 },
            { opacity: 1, yPercent: 0, duration: 0.55, ease: 'power2.out' },
            i + 0.35
          );
        }

        ScrollTrigger.refresh();
      }, sectionRef);

      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Why a clinic website matters"
      className="relative overflow-hidden bg-espresso-dark text-cream"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-wine/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-espresso-light/40 blur-3xl" />
      </div>

      <div ref={panelRef} className="relative flex min-h-screen flex-col justify-center py-24">
        {/* Plum-textured backdrop */}
        <Image
          src="/robot-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-espresso-dark/70" />
        <div className="container-x">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-nude-300/80">
            Why it matters
          </p>

          {/* Beats — stacked + readable with no JS, cross-faded by GSAP with JS */}
          <div className="relative mt-8 min-h-[40vh] max-w-4xl">
            {beats.map((b, i) => (
              <div
                key={i}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className="flex flex-col justify-center"
              >
                <p className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-nude-100 sm:text-5xl lg:text-6xl">
                  {b.lead}{' '}
                  <span className="bg-gradient-to-r from-nude-300 via-wine to-nude-300 bg-clip-text text-transparent">
                    {b.highlight}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link href="/services" className="btn bg-nude-300 text-espresso shadow-soft hover:-translate-y-0.5 hover:bg-nude-400">
              See how we build it
            </Link>
            <Link href="/portfolio" className="link-underline text-sm font-medium text-nude-100">
              Or see the work →
            </Link>
          </div>
        </div>

        {/* Scrub progress bar */}
        <div className="container-x mt-10">
          <div className="h-px w-full max-w-4xl overflow-hidden bg-nude-300/15">
            <span
              ref={progressRef}
              className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-nude-300 to-wine"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
