'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import type { BlogPostMeta } from '@/lib/blog';

/**
 * Premium, GSAP-driven blog index body: a parallax featured story + a grid of
 * cards that stagger into view on scroll. All copy is server-rendered (indexable
 * with no JS) — GSAP only enhances the reveal after hydration. Static-export safe
 * (gsap is dynamically imported, client-only) and respects prefers-reduced-motion.
 */
export function BlogShowcase({
  featured,
  posts,
}: {
  featured?: BlogPostMeta;
  posts: BlogPostMeta[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const hasCover = Boolean(featured?.coverImage);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = (gsapMod as any).default ?? gsapMod;
      const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (reduce) return; // leave everything in its visible resting state

        // Staggered card reveal — fires per row as cards enter the viewport.
        const cards = gsap.utils.toArray('[data-blog-card]') as HTMLElement[];
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 48 });
          ScrollTrigger.batch('[data-blog-card]', {
            start: 'top 90%',
            onEnter: (els: HTMLElement[]) =>
              gsap.to(els, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.09,
                overwrite: true,
              }),
          });
        }

        // Featured panel — parallax. With a real cover photo we drift the image
        // (ken-burns); otherwise we drift the glow + oversized ghost word.
        if (panelRef.current) {
          if (coverRef.current) {
            // Very subtle float (no zoom) — keeps the entire image visible.
            gsap.fromTo(
              coverRef.current,
              { yPercent: -2 },
              {
                yPercent: 2,
                ease: 'none',
                scrollTrigger: {
                  trigger: panelRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
          if (glowRef.current) {
            gsap.fromTo(
              glowRef.current,
              { yPercent: -14 },
              {
                yPercent: 14,
                ease: 'none',
                scrollTrigger: {
                  trigger: panelRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
          if (ghostRef.current) {
            gsap.fromTo(
              ghostRef.current,
              { xPercent: 6 },
              {
                xPercent: -6,
                ease: 'none',
                scrollTrigger: {
                  trigger: panelRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        }

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
    <div ref={rootRef} className="container-x pb-12">
      {/* ---------- Featured story ---------- */}
      {featured && (
        <Link
          id={`blog-${featured.slug}`}
          href={`/blog/${featured.slug}`}
          className="group relative mb-16 grid scroll-mt-28 overflow-hidden rounded-[2.25rem] border border-nude-200/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow lg:grid-cols-[1.05fr_1fr]"
        >
          {/* Visual panel */}
          <div
            ref={panelRef}
            className={`relative flex aspect-[16/11] items-end overflow-hidden p-8 lg:aspect-auto lg:min-h-[460px] ${
              hasCover ? 'bg-white' : 'bg-gradient-to-br from-nude-400 via-wine to-espresso'
            }`}
          >
            {hasCover ? (
              <>
                {/* Real cover — entire image shown (contain) on a white panel so the
                    mockup's white margins blend in seamlessly; gentle float. */}
                <div ref={coverRef} aria-hidden className="absolute inset-0">
                  <Image
                    src={featured!.coverImage}
                    alt={featured!.title}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Parallax glow layers */}
                <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0">
                  <span className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
                  <span className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-espresso/40 blur-3xl" />
                </div>

                {/* Oversized ghost wordmark — parallax */}
                <span
                  ref={ghostRef}
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[8rem] font-semibold leading-none text-white/10 sm:text-[11rem]"
                >
                  Insight
                </span>
              </>
            )}

            {/* Overlay tags only on the gradient fallback — a real cover photo fills the panel clean */}
            {!hasCover && (
              <>
                <span className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-cream/90 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-espresso backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-wine" />
                  Featured insight
                </span>

                <span className="relative rounded-full bg-cream/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-espresso backdrop-blur">
                  {featured.category}
                </span>
              </>
            )}
          </div>

          {/* Text side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-taupe">
              <span className="rounded-full bg-espresso px-3 py-1 text-cream">Latest</span>
              <span className="rounded-full bg-nude-100 px-2.5 py-1 text-espresso">{featured.category}</span>
              <span>{featured.readingTime} read</span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-espresso sm:text-4xl lg:text-[2.75rem]">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-taupe">
              {featured.description}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-espresso">
              Read the article
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>
      )}

      {/* ---------- Archive grid ---------- */}
      <div className="flex items-end justify-between gap-4 border-t border-nude-200/70 pt-10">
        <div>
          <p className="eyebrow">The archive</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
            All articles
          </h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-taupe">
          {String(posts.length + (featured ? 1 : 0)).padStart(2, '0')} insights
        </span>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} data-blog-card>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
