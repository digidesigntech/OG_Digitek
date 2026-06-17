'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-bleed muted, looping background video for the hero. Autoplays after
 * hydration. Respects prefers-reduced-motion: motion-sensitive users get the
 * static poster frame (no autoplay) instead of a looping clip. The poster also
 * serves as the instant LCP frame while the video buffers.
 */
export function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // muted must be set as a property for autoplay to be allowed by browsers.
    v.muted = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    v.play().catch(() => {
      /* autoplay may be blocked — poster stays visible, which is fine */
    });
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
