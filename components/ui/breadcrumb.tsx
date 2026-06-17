'use client';

import { usePathname } from 'next/navigation';
import { breadcrumbSchema } from '@/lib/schema';

const LABELS: Record<string, string> = {
  about: 'About Us',
  services: 'Services',
  portfolio: 'Portfolio',
  'digi-design': 'Digi Design',
  packages: 'Packages',
  contact: 'Contact',
};

function label(segment: string) {
  return (
    LABELS[segment] ??
    segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function Breadcrumb() {
  const pathname = usePathname();

  // Hidden on the homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const trail = [
    { name: 'Home', path: '/' },
    ...segments.map((seg, i) => ({
      name: label(seg),
      path: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  // The visible breadcrumb bar was removed by request; we still emit the
  // BreadcrumbList structured data so breadcrumb rich results keep working.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail)) }}
    />
  );
}
