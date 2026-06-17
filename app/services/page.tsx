import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { RelatedInsights } from '@/components/blog/related-insights';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { serviceSchema, pageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { services, serviceFaqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Web Development Services for Clinics & Beauty Brands',
  description:
    'Web development services for clinics and beauty brands: corporate sites, clinic platforms, custom software, mobile apps, branding, marketing and managed hosting in Chennai.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Web Development Services for Clinics & Beauty Brands | Baptist Digitek',
    description:
      'Corporate sites, clinic platforms, custom software, apps, branding, marketing and hosting — built for healthcare and aesthetic brands in Tamil Nadu.',
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* One Service schema per offering */}
      {services.map((s) => (
        <JsonLd key={s.slug} data={serviceSchema(s)} />
      ))}
      <JsonLd
        data={pageSchema({
          type: 'WebPage',
          path: '/services',
          name: metadata.title as string,
          description: metadata.description as string,
        })}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        {/*
          WebGL fractal-flow shader (components/ui/shader-animation), recoloured to
          the site's own soft pink → cream shade so the hero reads as the site
          background gently moving. Decorative + client-only; the headline/copy
          below stay server-rendered and indexable.
        */}
        <ShaderAnimation />
        {/* Whisper-light veil — only enough to keep the espresso copy crisp on the left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/55 via-cream/20 to-transparent"
        />
        {/* Bottom fade so the shader dissolves into the body (no hard cut) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-cream"
        />
        <div className="container-x relative z-10 py-14 sm:py-20 lg:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-nude-300/70 bg-white/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-espresso backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-wine" />
              Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              Web development services for clinics &amp;{' '}
              <span className="bg-gradient-to-r from-wine to-espresso-light bg-clip-text text-transparent">
                beauty brands
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              Seven services, one accountable team. We cover the full digital stack — and we go
              deepest where it matters most for aesthetic care: dermatology, cosmetic and
              beauty platforms. Over 100 clinic and aesthetic-brand websites shipped from
              Chromepet since 2018.
            </p>
          </Reveal>

          {/* Trust signals */}
          <Reveal delay={0.13}>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {[
                ['100+', 'Clinic & brand sites'],
                ['7', 'Services, one team'],
                ['2018', 'Building since'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-3xl font-semibold leading-none text-espresso">
                    {value}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-taupe">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Quick nav */}
          <Reveal delay={0.17} className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-nude-300/70 bg-white/60 px-4 py-2 font-mono text-xs text-espresso backdrop-blur transition-colors hover:border-espresso/30 hover:bg-nude-100"
              >
                {s.name}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Seam fade — dissolve the hero's cream into the pink page backdrop below
          so the showcase section doesn't begin on a hard horizontal line. */}
      <div
        aria-hidden
        className="pointer-events-none h-24 w-full bg-gradient-to-b from-cream to-transparent sm:h-32"
      />

      {/* ---------- Service sections (GSAP sticky visual swap) ---------- */}
      <ServicesShowcase services={services} faqs={serviceFaqs} />

      {/* ---------- Related insights ---------- */}
      <RelatedInsights category="Clinic Marketing" heading="Insights for clinics & brands" />


      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        headline="Not sure which service you need?"
        body="Tell us the problem, not the solution — we’ll point you to the right starting line. First conversations are always free."
      />
    </>
  );
}
