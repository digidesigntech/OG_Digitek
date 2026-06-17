import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { JsonLd } from '@/components/seo/json-ld';
import { FaqSection } from '@/components/ui/faq-section';
import { Byline, AuthorBio } from '@/components/blog/byline';
import { RelatedInsights } from '@/components/blog/related-insights';
import { mdxComponents } from '@/components/blog/mdx-components';
import { ScrollDepth } from '@/components/blog/scroll-depth';
import { TrackedLink } from '@/components/analytics/tracked';
import { blogPostingSchema, speakableSchema, authorPersonSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  // Coming-soon stubs are not ready to index yet.
  if (post.status === 'coming_soon') {
    return {
      title: `${post.title} (coming soon)`,
      description: post.description,
      alternates: { canonical: `/blog/${post.slug}` },
      robots: { index: false, follow: true },
    };
  }
  return {
    title: post.title,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [`${siteConfig.url}/about`],
      tags: [post.category, ...post.secondaryKeywords],
      images: [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Coming-soon stub — no full article template, no BlogPosting schema yet.
  if (post.status === 'coming_soon') {
    return (
      <article className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-taupe">
            <span className="rounded-full bg-nude-100 px-3 py-1 text-espresso">{post.category}</span>
            <span className="rounded-full border border-nude-300 px-3 py-1">Coming soon</span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] text-espresso sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-taupe">
            This article is being written and will be published shortly.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/blog" className="btn-primary">
              Browse other insights
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const author = authorPersonSchema(post.author);

  return (
    <>
      {/* §29.2 — blog engagement: blog_scroll_25 / blog_scroll_75 */}
      <ScrollDepth slug={post.slug} category={post.category} />

      <JsonLd
        data={blogPostingSchema({
          slug: post.slug,
          title: post.title,
          description: post.description,
          ogImage: post.ogImage,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          category: post.category,
          primaryKeyword: post.primaryKeyword,
          secondaryKeywords: post.secondaryKeywords,
          author: post.author,
          excerpt: post.speakable.intro || post.description,
        })}
      />
      {author && <JsonLd data={author} />}
      <JsonLd
        data={speakableSchema(`/blog/${post.slug}`, [
          '[data-speakable="intro"]',
          '[data-speakable="takeaway"]',
        ])}
      />

      <article className="container-x py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Category + reading time */}
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-taupe">
            <Link
              href={`/blog/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="rounded-full bg-nude-100 px-3 py-1 text-espresso transition-colors hover:bg-nude-200"
            >
              {post.category}
            </Link>
            <span>{post.readingTime} read</span>
          </div>

          {/* H1 */}
          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] text-espresso sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="mt-7">
            <Byline
              authorId={post.author}
              datePublished={post.datePublished}
              dateModified={post.dateModified}
              readingTime={`${post.readingTime} read`}
            />
          </div>

          {/* Featured banner — real cover photo if present, else branded block */}
          {post.coverImage ? (
            <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-3xl border border-nude-200/70 bg-white">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="relative mt-8 flex aspect-[1200/500] items-end overflow-hidden rounded-3xl bg-gradient-to-br from-nude-400 to-espresso p-7">
              <span aria-hidden className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <span aria-hidden className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-2xl bg-cream/85 font-display text-2xl leading-none text-espresso">
                B
              </span>
              <span className="rounded-full bg-cream/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-espresso backdrop-blur">
                {post.category}
              </span>
            </div>
          )}

          {/* Body */}
          <div className="mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* FAQ */}
          {post.faqs.length > 0 && (
            <FaqSection
              items={post.faqs.map((f) => ({ q: f.question, a: f.answer }))}
              id="post-faq"
              eyebrow="FAQ"
              heading="Frequently asked questions"
              className="mt-14"
            />
          )}

          {/* Author bio (E-E-A-T) */}
          <AuthorBio authorId={post.author} />

          {/* Back to blog */}
          <div className="mt-10">
            <Link href="/blog" className="link-underline text-sm font-medium text-espresso">
              ← All articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related insights */}
      <RelatedInsights category={post.category} currentSlug={post.slug} />

      {/* CTA */}
      <section className="container-x pb-20">
        <div className="surface flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-espresso">
              Ready to put this into practice?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-taupe">
              Tell us about your clinic or brand and we’ll map the right starting point — first
              conversations are always free.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <TrackedLink
              href="/digi-design"
              event="cta_blog_end"
              params={{ post_slug: post.slug, post_category: post.category, cta_label: 'See Digi Design' }}
              className="btn-secondary"
            >
              See Digi Design
            </TrackedLink>
            <TrackedLink
              href="/contact"
              event="cta_blog_end"
              params={{ post_slug: post.slug, post_category: post.category, cta_label: 'Talk to Us' }}
              className="btn-primary"
            >
              Talk to Us
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
