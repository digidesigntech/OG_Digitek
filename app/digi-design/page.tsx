import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { Cathedral } from '@/components/ui/cathedral';
import { CtaSection } from '@/components/sections/cta';
import { pageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Digi Design | Branding for Healthcare & Beauty | Baptist Digitek',
  description:
    'Digi Design is the in-house branding and creative studio for aesthetic brands — logo systems, packaging and creative crafted with intent in Chennai.',
  alternates: { canonical: '/digi-design' },
  openGraph: {
    title: 'Digi Design — Branding & Creative Studio for Aesthetic Brands',
    description:
      'The in-house branding and creative studio of Baptist Digitek, designing identities for healthcare and beauty brands.',
    url: `${siteConfig.url}/digi-design`,
  },
};

const offerings = [
  { title: 'Brand Identity', desc: 'Logo systems, colour, type and the rules that hold them together.' },
  { title: 'Packaging & Print', desc: 'Boxes, labels, menus and collateral that feel premium in the hand.' },
  { title: 'Social Creative', desc: 'On-brand templates and campaigns that stay consistent at scale.' },
  { title: 'Art Direction', desc: 'Photography and visual direction that set the tone for the whole brand.' },
];

export default function DigiDesignPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'AboutPage',
          path: '/digi-design',
          name: 'Digi Design — Branding & Creative Studio for Aesthetic Brands',
          description: metadata.description as string,
        })}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-grain">
        {/*
          "Cathedral" WebGL2 shader (components/ui/cathedral), recoloured to the
          site's soft pink → cream shade so the hero reads as the site background
          gently moving. Decorative + client-only; the headline/copy below stay
          server-rendered and indexable.
        */}
        <Cathedral />
        {/* Whisper-light veil — keeps the espresso copy crisp on the left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/55 via-cream/20 to-transparent"
        />
        {/* Bottom fade so the shader dissolves into the body (no hard cut) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-cream"
        />
        <div className="container-x relative z-10 py-14 sm:py-20 lg:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-nude-300/70 bg-white/60 px-4 py-1.5 font-mono text-xs text-espresso backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-wine" />
              A Baptist Digitek studio
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1] text-espresso sm:text-6xl lg:text-7xl">
              Digi Design — design with{' '}
              <span className="bg-gradient-to-r from-wine to-espresso-light bg-clip-text text-transparent">
                intent.
              </span>
              <span className="sr-only">
                {' '}
                Branding &amp; creative studio for aesthetic and beauty brands in Chennai.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              Our in-house creative studio crafts brand identities for aesthetic, dermatology
              and beauty businesses. Every mark, palette and layout earns its place —
              strengthening the brand and compounding into long-term growth.
            </p>
          </Reveal>

          {/* What the studio covers, at a glance */}
          <Reveal delay={0.13}>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {[
                ['Identity', 'Logo & brand systems'],
                ['Packaging', 'Print & collateral'],
                ['Creative', 'Social & art direction'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-semibold leading-none text-espresso">
                    {value}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-taupe">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.17}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/digi-design/portfolio" className="btn-primary">
                View Design Portfolio
              </Link>
              <Link href="/digi-design/packages" className="btn-secondary">
                See Packages
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- What the studio does ---------- */}
      <section className="container-x py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">What the studio does</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            A complete visual system, not a one-off logo.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <div className="surface h-full rounded-3xl p-7">
                <span className="font-mono text-xs text-taupe">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-espresso">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-base leading-relaxed text-taupe">
          Browse the{' '}
          <Link href="/digi-design/portfolio" className="link-underline font-medium text-espresso">design portfolio</Link>, compare{' '}
          <Link href="/digi-design/packages" className="link-underline font-medium text-espresso">branding packages</Link>, see how design pairs with our{' '}
          <Link href="/services" className="link-underline font-medium text-espresso">web and software services</Link>, or{' '}
          <Link href="/contact" className="link-underline font-medium text-espresso">start a conversation</Link>.
        </Reveal>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        headline="Ready to look as good as the work you do?"
        body="Tell us about your brand — we’ll show you what a considered identity could do for it. First conversations are always free."
        primaryLabel="Start a Brand Project"
      />
    </>
  );
}
