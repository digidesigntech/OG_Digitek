'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaqSection } from '@/components/ui/faq-section';
import { track } from '@/lib/analytics';
import type { Service, Faq } from '@/lib/content';

/**
 * Services with a GSAP ScrollTrigger "sticky visual swap": a pinned panel on the
 * left cross-fades a branded visual for the active service while the content
 * scrolls on the right. Pure-CSS sticky handles the pin; GSAP drives the swap.
 * Static-export safe (gsap is dynamically imported, client-only) and respects
 * prefers-reduced-motion (instant swap, no animation).
 */
export function ServicesShowcase({
  services,
  faqs,
}: {
  services: Service[];
  faqs: Record<string, Faq[]>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = (gsapMod as any).default ?? gsapMod;
      const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
      gsap.registerPlugin(ScrollTrigger);

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const ctx = gsap.context(() => {
        const layers = visualRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!layers.length) return;

        gsap.set(layers, { opacity: 0, yPercent: 4 });
        gsap.set(layers[0], { opacity: 1, yPercent: 0 });

        const setActive = (i: number) => {
          gsap.to(layers, { opacity: 0, yPercent: 4, duration: reduce ? 0 : 0.45, overwrite: true, ease: 'power2.out' });
          gsap.to(layers[i], { opacity: 1, yPercent: 0, duration: reduce ? 0 : 0.45, overwrite: true, ease: 'power2.out' });
        };

        const blocks = gsap.utils.toArray('[data-service-block]') as HTMLElement[];
        blocks.forEach((block: HTMLElement, i: number) => {
          ScrollTrigger.create({
            trigger: block,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });
        });

        ScrollTrigger.refresh();
      }, rootRef);

      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div ref={rootRef} className="container-x">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Pinned visual (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 h-[60vh] min-h-[420px]">
            <div className="relative h-full w-full">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  ref={(el) => {
                    visualRefs.current[i] = el;
                  }}
                  aria-hidden
                  style={{ backgroundImage: "url('/card_background.jpg')" }}
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-espresso/10 bg-cover bg-center p-9 text-espresso shadow-glow"
                >
                  {/* Soft cream wash + tint blobs over the silk for depth + legibility */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream/55 via-cream/25 to-cream/45" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-wine/25 blur-3xl" />
                    <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-nude-400/40 blur-3xl" />
                  </div>
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-espresso/70">
                      {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                    {s.flagship && (
                      <span className="rounded-full bg-espresso/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-espresso">
                        Flagship niche
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <p className="font-display text-7xl font-semibold leading-none text-espresso">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-espresso">
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-espresso-light">
                      {s.headline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling content */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-nude-200/70">
            {services.map((s, i) => {
              const related = services.filter((r) => r.slug !== s.slug).slice(i, i + 2);
              return (
                <section
                  key={s.slug}
                  id={s.slug}
                  data-service-block
                  className="scroll-mt-28 py-12 first:pt-0 lg:py-16"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-taupe">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.flagship && (
                      <span className="rounded-full bg-espresso px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-nude-300">
                        Flagship niche
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-espresso">
                    {s.name}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-espresso-light">{s.headline}</p>

                  <p className="mt-6 text-base leading-relaxed text-taupe">{s.description}</p>

                  <p className="mt-6 rounded-2xl border border-nude-200 bg-nude-50/70 p-5 text-base leading-relaxed text-espresso">
                    <span className="font-mono text-xs uppercase tracking-wider text-taupe">In one line — </span>
                    {s.definition}
                  </p>

                  <h3 className="mt-8 font-display text-lg font-semibold text-espresso">What you get</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-taupe">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0 text-nude-500">
                          <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.25" />
                          <path d="M5.5 9l2.2 2.2L12.5 6.5" stroke="#4B2138" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 text-sm text-taupe">
                    <span className="font-semibold text-espresso">Who it’s for — </span>
                    {s.who}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      onClick={() => track('cta_primary', { cta_label: 'Talk to Us', page: 'services' })}
                      className="btn-primary"
                    >
                      Talk to Us
                    </Link>
                    <span className="text-sm text-taupe">
                      Related:{' '}
                      {related.map((r, idx) => (
                        <span key={r.slug}>
                          <a href={`#${r.slug}`} className="link-underline font-medium text-espresso">
                            {r.name}
                          </a>
                          {idx < related.length - 1 ? ', ' : ''}
                        </span>
                      ))}{' '}
                      ·{' '}
                      <Link href="/portfolio" className="link-underline font-medium text-espresso">
                        See the work
                      </Link>
                    </span>
                  </div>

                  {faqs[s.slug] && (
                    <FaqSection
                      items={faqs[s.slug]}
                      id={`faq-${s.slug}`}
                      eyebrow=""
                      heading="Common questions"
                      className="mt-10"
                    />
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
