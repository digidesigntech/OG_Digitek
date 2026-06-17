import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { BlogShowcase } from '@/components/blog/blog-showcase';
import { pageSchema, itemListSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { getAllPostMeta, categoryToSlug } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Healthcare & Beauty Web Insights | Baptist Digitek',
  description:
    'Insights on clinic websites, aesthetic web design, dermatology tech, healthcare SEO and beauty branding — practical guidance from Baptist Digitek in Chennai.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Healthcare & Beauty Web Insights | Baptist Digitek',
    description:
      'Practical insights on clinic websites, aesthetic web design, dermatology tech and healthcare SEO from Baptist Digitek.',
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  // Feature the newest *published* post; everything else (incl. coming-soon)
  // flows into the grid below in date order.
  const featured = posts.find((p) => p.status !== 'coming_soon');
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'CollectionPage',
          path: '/blog',
          name: metadata.title as string,
          description: metadata.description as string,
          mainEntity: itemListSchema(
            posts.map((p) => ({ name: p.title, url: `${siteConfig.url}/blog/${p.slug}` }))
          ),
        })}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-grain">
        <div aria-hidden className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-nude-300/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-wine/10 blur-3xl" />
        <div className="container-x py-16 sm:py-24 lg:py-28">
          <Reveal>
            <span className="eyebrow">Insights · Journal</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
              Healthcare &amp; beauty
              <br />
              <span className="italic text-espresso-light">web insights</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              Practical, no-fluff guidance on clinic websites, aesthetic web design, dermatology
              tech, healthcare SEO and beauty branding — written by the team that builds them.
            </p>
          </Reveal>

          {/* Category filter */}
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
            <span className="rounded-full bg-espresso px-4 py-2 font-mono text-xs text-cream">All</span>
            {siteConfig.blogCategories.map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categoryToSlug(c)}`}
                className="rounded-full border border-nude-300/70 bg-white/60 px-4 py-2 font-mono text-xs text-espresso backdrop-blur transition-colors hover:border-espresso/40 hover:bg-nude-100"
              >
                {c}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Featured + grid (GSAP ScrollTrigger) */}
      <BlogShowcase featured={featured} posts={rest} />

      <CtaSection
        headline="Have a project the blog can’t fully answer?"
        body="Tell us about your clinic or brand — first conversations are always free."
      />
    </>
  );
}
