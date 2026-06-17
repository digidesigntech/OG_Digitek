import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { getRelatedPosts } from '@/lib/blog';

/**
 * Related Insights strip — 3 recent posts in the same category (excluding the
 * current one). Used on blog posts, service pages, the homepage and portfolio.
 */
export function RelatedInsights({
  category,
  currentSlug = '',
  count = 3,
  heading = 'Related insights',
  eyebrow = 'From the blog',
}: {
  category: string;
  currentSlug?: string;
  count?: number;
  heading?: string;
  eyebrow?: string;
}) {
  const posts = getRelatedPosts(category, currentSlug, count);
  if (!posts.length) return null;

  return (
    <section aria-label="Related insights" className="container-x py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-espresso sm:text-3xl">
            {heading}
          </h2>
        </div>
        <Link href="/blog" className="link-underline text-sm font-medium text-espresso">
          Read all articles →
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
