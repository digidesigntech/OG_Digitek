'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Lazy-load the WebGL fluid sim client-side only — it's heavy and never needed
// on the server.
const SplashCursor = dynamic(() => import('@/components/ui/splash-cursor'), {
  ssr: false,
});

/**
 * Mounts the SplashCursor fluid effect, but only when it's appropriate:
 * - skips users who prefer reduced motion (§30 accessibility),
 * - skips touch/coarse-pointer devices (it's a cursor effect and the GPU sim is
 *   costly on phones).
 */
export function CursorEffect() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!reduce && finePointer) setEnabled(true);
  }, []);

  if (!enabled) return null;
  return <SplashCursor />;
}
