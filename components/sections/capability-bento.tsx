import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/reveal';
import { capabilities } from '@/lib/content';

/** Minimal line icons keyed by capability title. */
const icons: Record<string, JSX.Element> = {
  'Corporate Sites': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M7 6.5h.01M9.5 6.5h.01" />
    </svg>
  ),
  'Clinic Platforms': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20.5C7 17 3.5 13.8 3.5 9.8 3.5 7 5.7 5 8.2 5c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2 2.5 0 4.7 2 4.7 4.8 0 4-3.5 7.2-8.5 10.7Z" />
      <path d="M12 9v4M10 11h4" />
    </svg>
  ),
  'Custom Software': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </svg>
  ),
  'Mobile Apps': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  'Brand Identity': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="M18.5 16.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
    </svg>
  ),
  'Managed Hosting': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 2.5v5c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9v-5L12 3Z" />
      <path d="m9.2 12 1.9 1.9L15 10.2" />
    </svg>
  ),
};

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CapabilityBento() {
  const flagship = capabilities.find((c) => c.title === 'Clinic Platforms')!;
  const standard = capabilities.filter(
    (c) => c.title !== 'Clinic Platforms' && c.title !== 'Managed Hosting'
  );
  const wide = capabilities.find((c) => c.title === 'Managed Hosting')!;
  const indexOf = (title: string) => capabilities.findIndex((c) => c.title === title) + 1;
  const num = (title: string) => String(indexOf(title)).padStart(2, '0');

  return (
    <section className="container-x py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow">What we build</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Six capabilities. One accountable roof.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-taupe">
            From corporate sites to clinic platforms, we cover the full digital stack — and we
            specialise in the aesthetic-healthcare brands that live or die on first impressions.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:auto-rows-[220px]">
        {/* Flagship feature cell */}
        <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <Link
            href={flagship.href}
            className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-espresso p-8 text-cream shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
          >
            {/* Hero plum-textured backdrop */}
            <Image
              src="/robot-background.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-dark/85 via-espresso-dark/40 to-espresso-dark/30" />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-wine/25 blur-3xl" />
            </div>
            <div className="relative flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-nude-300/15 text-nude-300">
                {icons[flagship.title]}
              </span>
              <span className="rounded-full bg-nude-300/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-nude-300">
                Flagship niche
              </span>
            </div>
            <div className="relative">
              <span className="font-mono text-xs text-nude-300/80">{num(flagship.title)}</span>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-cream">
                {flagship.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-nude-200/85">
                {flagship.desc} Booking, treatment catalogues, before/after galleries and consent
                — built for dermatology, cosmetic and beauty clinics.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-nude-100">
                Explore
                <Arrow className="text-nude-100 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Standard cells */}
        {standard.map((cap, i) => (
          <Reveal key={cap.title} delay={i * 0.05}>
            <Link
              href={cap.href}
              className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-nude-200/70 bg-cream p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-espresso/20 hover:shadow-glow"
            >
              {/* Pink-card backdrop */}
              <Image
                src="/og/pink_card_female.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/85 via-cream/55 to-cream/30" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-nude-100 text-espresso transition-colors duration-300 group-hover:bg-espresso group-hover:text-nude-300">
                  {icons[cap.title]}
                </span>
                <span className="font-mono text-xs text-taupe">{num(cap.title)}</span>
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-semibold text-espresso">{cap.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-taupe">{cap.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-espresso">
                  Explore
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Wide cell — Managed Hosting */}
        <Reveal className="sm:col-span-2 lg:col-span-4">
          <Link
            href={wide.href}
            className="group flex h-full min-h-[150px] flex-col items-start justify-between gap-5 rounded-3xl border border-nude-200/70 bg-gradient-to-r from-white to-nude-50 p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex items-center gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-nude-100 text-espresso transition-colors duration-300 group-hover:bg-espresso group-hover:text-nude-300">
                {icons[wide.title]}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-espresso">{wide.title}</h3>
                  <span className="font-mono text-xs text-taupe">{num(wide.title)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-taupe">
                  {wide.desc} Daily backups, monitoring, security patching and real-person support
                  — so your site is never something you have to think about.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-espresso">
              Explore
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
