import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { pageSchema, itemListSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { DesignGallery } from '@/components/sections/design-gallery';
import { galleryItems, galleryCategories } from '@/lib/portfolio-gallery';

export const metadata: Metadata = {
  title: 'Design Portfolio | Digi Design | Baptist Digitek',
  description:
    'Brand and design portfolio from Chennai — logo systems, packaging, social creative and brand guidelines for aesthetic, dermatology and beauty brands.',
  alternates: { canonical: '/digi-design/portfolio' },
  openGraph: {
    title: 'Brand & Design Portfolio Chennai | Digi Design',
    description:
      'Logo systems, packaging and creative for healthcare and beauty brands by the Digi Design studio.',
    url: `${siteConfig.url}/digi-design/portfolio`,
  },
};

export default function DigiDesignPortfolioPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'CollectionPage',
          path: '/digi-design/portfolio',
          name: metadata.title as string,
          description: metadata.description as string,
          mainEntity: itemListSchema(galleryItems.slice(0, 30).map((d) => ({ name: d.title }))),
        })}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-grain">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-6 -z-10 h-96 w-96 rounded-full bg-nude-300/40 blur-3xl" />
        <div className="container-x py-14 sm:py-20 lg:py-24">
          <Reveal>
            <span className="eyebrow">Digi Design · Portfolio</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              Brand &amp; design portfolio
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              Real work the studio has shipped for aesthetic, dermatology and beauty brands —
              social campaigns, wall posters, standees, stationery and print. Filter by type,
              or scroll the full collection.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Live gallery ---------- */}
      <section className="container-x pb-12">
        <DesignGallery items={galleryItems} categories={galleryCategories} />

        <Reveal className="mt-12 text-sm text-taupe">
          Like what you see? Compare{' '}
          <Link href="/digi-design/packages" className="link-underline font-medium text-espresso">design packages</Link>{' '}
          or{' '}
          <Link href="/contact" className="link-underline font-medium text-espresso">start a brand project</Link>.
        </Reveal>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        headline="Let’s design something worth remembering."
        body="From a single logo to a full brand system — tell us what you’re building. First conversations are always free."
        primaryLabel="Start a Brand Project"
      />
    </>
  );
}
