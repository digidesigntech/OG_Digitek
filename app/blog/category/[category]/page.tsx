import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { PostCard } from '@/components/blog/post-card';
import { pageSchema, itemListSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { getPostsByCategory, categoryToSlug, slugToCategory } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.blogCategories.map((c) => ({ category: categoryToSlug(c) }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = slugToCategory(params.category, siteConfig.blogCategories);
  if (!category) return {};
  return {
    title: `${category} Insights | Baptist Digitek Blog`,
    description: `${category} articles and guidance from Baptist Digitek — practical insights for aesthetic, dermatology and beauty brands in Chennai and across India.`,
    alternates: { canonical: `/blog/category/${params.category}` },
    openGraph: {
      title: `${category} insights from Baptist Digitek`,
      description: `${category} articles for clinics and beauty brands.`,
      url: `${siteConfig.url}/blog/category/${params.category}`,
    },
  };
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = slugToCategory(params.category, siteConfig.blogCategories);
  if (!category) notFound();
  const posts = getPostsByCategory(category);

  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'CollectionPage',
          path: `/blog/category/${params.category}`,
          name: `${category} Insights | Baptist Digitek Blog`,
          description: `${category} articles and guidance from Baptist Digitek.`,
          mainEntity: itemListSchema(
            posts.map((p) => ({ name: p.title, url: `${siteConfig.url}/blog/${p.slug}` }))
          ),
        })}
      />

      <section className="relative overflow-hidden bg-grain">
        <div className="container-x py-14 sm:py-20">
          <Reveal>
            <p className="eyebrow">Blog · Category</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl">
              {category} insights
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
            <Link href="/blog" className="rounded-full border border-nude-300/70 bg-white/60 px-4 py-2 font-mono text-xs text-espresso hover:bg-nude-100">
              All articles
            </Link>
            {siteConfig.blogCategories.map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categoryToSlug(c)}`}
                className={`rounded-full px-4 py-2 font-mono text-xs transition-colors ${
                  c === category
                    ? 'bg-espresso text-cream'
                    : 'border border-nude-300/70 bg-white/60 text-espresso hover:bg-nude-100'
                }`}
              >
                {c}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-12">
        {posts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.05}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-taupe">
            No articles in this category yet —{' '}
            <Link href="/blog" className="link-underline font-medium text-espresso">browse all insights</Link>.
          </p>
        )}
      </section>

      <CtaSection
        headline="Want this applied to your brand?"
        body="Tell us where you want to be online — first conversations are always free."
      />
    </>
  );
}
