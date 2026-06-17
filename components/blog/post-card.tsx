import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

/** Brand gradient per category (keeps card thumbnails clean — the text-heavy
 *  OG image is reserved for social sharing, not the card visual). */
const categoryGradient: Record<string, string> = {
  'Clinic Marketing': 'from-nude-400 to-wine',
  'Aesthetic Web Design': 'from-nude-300 to-espresso',
  'Dermatology Tech': 'from-nude-300 to-espresso-light',
  'Beauty Branding': 'from-nude-400 to-wine',
  'Cosmetology': 'from-nude-200 to-wine',
  'Healthcare SEO': 'from-nude-200 to-taupe',
  'Digital Strategy': 'from-nude-300 to-espresso',
};

export function PostCard({ post }: { post: BlogPostMeta }) {
  const gradient = categoryGradient[post.category] ?? 'from-nude-300 to-espresso';
  const comingSoon = post.status === 'coming_soon';
  const hasCover = Boolean(post.coverImage);

  // Shared inner content — the thumbnail + text block. Reused for both the
  // clickable (published) and non-clickable (coming-soon) variants.
  const inner = (
    <>
      {/* Thumbnail — real cover (whole image on white) or branded gradient */}
      <div className={`relative flex aspect-[16/9] items-end overflow-hidden p-5 ${hasCover ? 'bg-white' : `bg-gradient-to-br ${gradient}`}`}>
        {hasCover ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <>
            <span aria-hidden className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/15 blur-xl" />
            <span aria-hidden className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-xl bg-cream/85 font-display text-lg leading-none text-espresso">
              B
            </span>
          </>
        )}
        <span className="relative z-10 rounded-full bg-cream/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-espresso backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {comingSoon ? (
          <div className="font-mono text-[10px] uppercase tracking-wider text-taupe">In production</div>
        ) : (
          <div className="font-mono text-[10px] uppercase tracking-wider text-taupe">
            {post.readingTime} read
          </div>
        )}
        <h3 className={`mt-2 font-display text-lg font-semibold leading-snug text-espresso ${comingSoon ? '' : 'transition-colors group-hover:text-espresso-light'}`}>
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-taupe">{post.description}</p>
        {comingSoon ? (
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-nude-300 px-3 py-1 text-xs font-medium text-taupe">
            Coming soon
          </span>
        ) : (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-espresso">
            Read article →
          </span>
        )}
      </div>
    </>
  );

  if (comingSoon) {
    // Not clickable; muted. Title attribute acts as the hover tooltip.
    return (
      <article
        id={`blog-${post.slug}`}
        title="Article in production"
        aria-label={`${post.title} — coming soon`}
        className="h-full scroll-mt-28 cursor-default overflow-hidden rounded-3xl border border-nude-200/70 bg-white opacity-60 shadow-card"
      >
        <div className="flex h-full flex-col">{inner}</div>
      </article>
    );
  }

  return (
    <article id={`blog-${post.slug}`} className="group h-full scroll-mt-28 overflow-hidden rounded-3xl border border-nude-200/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        {inner}
      </Link>
    </article>
  );
}
