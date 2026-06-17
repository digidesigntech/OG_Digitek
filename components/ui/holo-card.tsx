'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';

/** Capability card with a soft holographic pointer-tracked glow. */
export function HoloCard({
  title,
  desc,
  href,
  index,
}: {
  title: string;
  desc: string;
  href: string;
  index: number;
}) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const num = String(index + 1).padStart(2, '0');

  return (
    <Link href={href} onMouseMove={onMove} className="holo-card group block">
      <div className="relative z-10 flex h-full flex-col">
        {/* Holographic layered 3D numeral */}
        <div className="card-5" aria-hidden="true">
          <div className="card-5__holo">
            <span className="card-5__layer card-5__layer--back">{num}</span>
            <span className="card-5__layer card-5__layer--mid">{num}</span>
            <span className="card-5__layer card-5__layer--front">{num}</span>
          </div>
        </div>
        <h3 className="mt-1 text-xl font-semibold text-espresso">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">{desc}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-espresso">
          Explore
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
