'use client';

import dynamic from 'next/dynamic';

// WebGL shader — load client-only so it never runs during the static prerender.
const Warp = dynamic(
  () => import('@paper-design/shaders-react').then((m) => m.Warp),
  { ssr: false }
);

type WarpBackgroundProps = {
  className?: string;
  speed?: number;
  /** Override the colour ramp (CSS colour strings). Defaults to brand peach + plum. */
  colors?: string[];
};

// Brand palette as a soft marble: cream → blush → peach → plum accent.
const BRAND_COLORS = [
  'hsl(30, 100%, 96%)', // cream  #FFF6EF
  'hsl(13, 78%, 91%)', // blush  #FADCD5
  'hsl(20, 72%, 83%)', // peach  #F6C9B4
  'hsl(327, 42%, 27%)', // deep plum #4B2138
];

export function WarpBackground({
  className,
  speed = 0.6,
  colors = BRAND_COLORS,
}: WarpBackgroundProps) {
  return (
    <div aria-hidden className={className} style={{ position: 'absolute', inset: 0 }}>
      <Warp
        style={{ height: '100%', width: '100%' }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={speed}
        colors={colors}
      />
    </div>
  );
}

export default WarpBackground;
