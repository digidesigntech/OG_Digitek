'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// WebGL mesh-gradient shader — loaded client-only so it never runs during the
// static prerender (keeps the hero's <h1>/body/links server-rendered + indexable).
const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((m) => m.MeshGradient),
  { ssr: false }
);

type MeshGradientBackgroundProps = {
  className?: string;
  /** Override the colour ramp (CSS colour strings). Defaults to the brand palette. */
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
};

// Brand palette — light-led so dark espresso text stays legible on top:
// cream → blush → peach, with coral + rose-wine + deep-plum accents.
const BRAND_COLORS = [
  '#FFF6EF', // cream
  '#FADCD5', // blush
  '#F6C9B4', // peach (dominant)
  '#E8927C', // coral accent
  '#6D3C52', // rose-wine
  '#4B2138', // deep plum
];

export function MeshGradientBackground({
  className,
  colors = BRAND_COLORS,
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.4,
  offsetX = 0.08,
}: MeshGradientBackgroundProps) {
  // Respect reduced-motion: freeze the shader (speed 0) for those who ask for it.
  const [animSpeed, setAnimSpeed] = useState(speed);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setAnimSpeed(mq.matches ? 0 : speed);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [speed]);

  return (
    <div aria-hidden className={className} style={{ position: 'absolute', inset: 0 }}>
      <MeshGradient
        style={{ height: '100%', width: '100%' }}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={0}
        grainOverlay={0}
        speed={animSpeed}
        offsetX={offsetX}
      />
    </div>
  );
}

export default MeshGradientBackground;
