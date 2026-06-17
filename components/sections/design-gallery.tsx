'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { GalleryCategory, GalleryItem } from '@/lib/portfolio-gallery';

// Repeat each row until at least this many tiles so even small categories fill
// the viewport and the two-copy seamless loop has no visible gap.
const MIN_ROW_TILES = 6;

/**
 * Design gallery for Digi Design — an auto-looping horizontal marquee that
 * applies to every filter (All and each category). Images flow across rows with
 * alternating direction; rows pause on hover and any tile opens the lightbox.
 *
 * Row count scales to the number of items, and short rows are repeated so the
 * loop stays seamless. Under prefers-reduced-motion it falls back to a static
 * CSS-columns masonry grid that keeps each image's natural aspect ratio.
 */
export function DesignGallery({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: GalleryCategory[];
}) {
  const reduce = useReducedMotion();
  const tabs = useMemo(() => ['All', ...categories.map((c) => c.label)], [categories]);
  const [active, setActive] = useState<string>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () => (active === 'All' ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  // Marquee everywhere; static masonry only when motion is reduced.
  const isMarquee = !reduce;

  // Scale rows to item count: ≤6 → 1 row, ≤12 → 2 rows, else 3.
  const rowCount = Math.min(3, Math.max(1, Math.ceil(shown.length / 6)));

  // Round-robin into rows (varied content per row), then repeat short rows so
  // each one is wide enough for a gap-free seamless loop.
  const rows = useMemo(() => {
    const r: { item: GalleryItem; idx: number }[][] = Array.from({ length: rowCount }, () => []);
    shown.forEach((item, idx) => r[idx % rowCount].push({ item, idx }));
    return r.map((row) => {
      if (row.length === 0 || row.length >= MIN_ROW_TILES) return row;
      const reps = Math.ceil(MIN_ROW_TILES / row.length);
      return Array.from({ length: reps }, () => row).flat();
    });
  }, [shown, rowCount]);

  const activeBlurb =
    active === 'All'
      ? `${items.length} pieces across branding, print and social.`
      : categories.find((c) => c.label === active)?.blurb ?? '';

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((cur) => (cur === null ? cur : (cur + dir + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  const current = lightbox === null ? null : shown[lightbox];

  return (
    <div>
      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter design work by type" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            onClick={() => setActive(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === t
                ? 'bg-espresso text-cream shadow-soft'
                : 'border border-nude-300/70 bg-white/60 text-taupe hover:text-espresso'
            }`}
          >
            {t}
            {t !== 'All' && (
              <span className="ml-1.5 text-xs opacity-60">
                {categories.find((c) => c.label === t)?.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-taupe">
        {activeBlurb}
        {isMarquee && <span className="ml-1 text-taupe/60">Hover to pause · click to enlarge.</span>}
      </p>

      {/* ---- Marquee (All) ---- */}
      {isMarquee ? (
        <div className="mt-8 space-y-5">
          {rows.map((row, ri) => (
            <div key={ri} className="marquee-row group relative overflow-hidden">
              <div
                className="marquee-track"
                style={{
                  animationDuration: `${Math.max(36, row.length * 5)}s`,
                  animationDirection: ri % 2 ? 'reverse' : 'normal',
                }}
              >
                {[...row, ...row].map(({ item, idx }, k) => (
                  <button
                    key={item.thumb + k}
                    type="button"
                    aria-hidden={k >= row.length}
                    tabIndex={k >= row.length ? -1 : 0}
                    onClick={() => setLightbox(idx)}
                    aria-label={`View ${item.title}`}
                    className="group/cell relative mr-5 block h-40 shrink-0 overflow-hidden rounded-2xl border border-nude-200/70 bg-white shadow-card transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso sm:h-48 lg:h-56"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumb}
                      alt={item.title}
                      style={{ aspectRatio: `${item.w} / ${item.h}` }}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto object-cover transition-transform duration-700 ease-out group-hover/cell:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/cell:opacity-100">
                      <div className="p-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-nude-100">
                          {item.category}
                        </span>
                        <p className="mt-0.5 line-clamp-2 font-display text-xs font-semibold text-cream">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ---- Masonry (category, or reduced-motion) ---- */
        <div className="mt-8 [column-gap:1.25rem] columns-2 sm:columns-3 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item, i) => (
              <motion.button
                key={item.thumb}
                type="button"
                layout
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : Math.min(i, 12) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setLightbox(i)}
                aria-label={`View ${item.title}`}
                className="group/cell mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-nude-200/70 bg-white shadow-card transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumb}
                    alt={item.title}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: `${item.w} / ${item.h}` }}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover/cell:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/cell:opacity-100">
                    <div className="p-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-nude-100">
                        {item.category}
                      </span>
                      <p className="mt-0.5 line-clamp-2 font-display text-sm font-semibold text-cream">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ---- Lightbox (shared) ---- */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso-dark/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {shown.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20 sm:left-6"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20 sm:right-6"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}

            <motion.figure
              key={current.full}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.full}
                alt={current.title}
                className="max-h-[80vh] w-auto rounded-xl object-contain shadow-glow"
              />
              <figcaption className="mt-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-nude-300">
                  {current.category}
                </span>
                <p className="mt-1 font-display text-base font-semibold text-cream">{current.title}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
