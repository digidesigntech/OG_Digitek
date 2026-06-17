import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { pageSchema, offerCatalogSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { designPackages } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Design Packages | Digi Design | Baptist Digitek',
  description:
    'Monthly design and social media packages in Chennai for aesthetic and beauty practices — four clear tiers, from a starter posting plan to a fully custom system. Transparent pricing.',
  alternates: { canonical: '/digi-design/packages' },
  openGraph: {
    title: 'Design & Social Packages Chennai | Digi Design',
    description:
      'Four transparent monthly tiers for healthcare and beauty brands — Starter, Growth, Pro and Custom.',
    url: `${siteConfig.url}/digi-design/packages`,
  },
};

export default function DigiDesignPackagesPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'CollectionPage',
          path: '/digi-design/packages',
          name: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <JsonLd
        data={offerCatalogSchema(
          // Only tiers with a fixed price belong in the OfferCatalog; the
          // quote-only Custom tier has no price to advertise.
          designPackages
            .filter((p): p is typeof p & { price: number } => p.price != null)
            .map((p) => ({
              name: p.name,
              price: p.price,
              description: p.tagline,
            }))
        )}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-grain">
        <div aria-hidden className="pointer-events-none absolute -right-24 top-6 -z-10 h-96 w-96 rounded-full bg-nude-300/40 blur-3xl" />
        <div className="container-x py-14 sm:py-20 lg:py-24">
          <Reveal>
            <span className="eyebrow">Digi Design · Packages</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              Choose the package that matches your practice
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              Start small and scale — or jump straight into the full system. Four clear monthly
              tiers, transparent pricing, no surprises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Pricing cards ---------- */}
      <section className="container-x pb-12">
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {designPackages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-[2rem] border p-8 transition-all ${
                  pkg.featured
                    ? 'border-espresso bg-espresso text-cream shadow-glow lg:-translate-y-3'
                    : 'border-nude-200/70 bg-white text-espresso shadow-card'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute right-7 top-7 rounded-full bg-nude-300 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-espresso">
                    Most chosen
                  </span>
                )}
                <h2 className={`font-display text-2xl font-semibold ${pkg.featured ? 'text-cream' : 'text-espresso'}`}>
                  {pkg.name}
                </h2>
                <p className={`mt-2 text-sm ${pkg.featured ? 'text-nude-200/85' : 'text-taupe'}`}>
                  {pkg.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold">{pkg.priceLabel}</span>
                  <span className={`font-mono text-xs ${pkg.featured ? 'text-nude-200/70' : 'text-taupe'}`}>
                    {pkg.cadence}
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0">
                        <circle cx="9" cy="9" r="9" fill={pkg.featured ? '#F6C9B4' : '#4B2138'} opacity="0.2" />
                        <path d="M5.5 9l2.2 2.2L12.5 6.5" stroke={pkg.featured ? '#F6C9B4' : '#4B2138'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={pkg.featured ? 'text-nude-100' : 'text-taupe'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 ${
                    pkg.featured
                      ? 'btn bg-nude-300 text-espresso hover:bg-nude-400'
                      : 'btn-primary'
                  } w-full`}
                >
                  {pkg.price == null ? 'Get a Quote' : `Choose ${pkg.name}`}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-taupe/80">
          *Meta ad spend is billed separately from the package fee.
        </p>

        <Reveal className="mt-8 text-center text-sm text-taupe">
          Need something bespoke? We tailor packages for multi-brand clinics and product
          ranges —{' '}
          <Link href="/contact" className="link-underline font-medium text-espresso">talk to us</Link>{' '}
          or browse the{' '}
          <Link href="/digi-design/portfolio" className="link-underline font-medium text-espresso">design portfolio</Link>.
        </Reveal>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        headline="Not sure which tier fits?"
        body="Tell us about your brand and budget — we’ll recommend the right starting point honestly. First conversations are always free."
        primaryLabel="Get a Recommendation"
      />
    </>
  );
}
