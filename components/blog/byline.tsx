import Image from 'next/image';
import { siteConfig } from '@/lib/site';

function fmt(date: string) {
  if (!date) return '';
  const d = new Date(date + 'T00:00:00Z');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function Byline({
  authorId,
  datePublished,
  dateModified,
  readingTime,
}: {
  authorId: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
}) {
  const author = (siteConfig.authors as Record<string, { name: string; role: string; photo: string }>)[authorId];
  if (!author) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 border-y border-nude-200/70 py-5">
      <Image
        src={author.photo}
        alt={`${author.name}, ${author.role}`}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full object-cover object-top"
      />
      <div className="text-sm">
        <p className="font-display font-semibold text-espresso">{author.name}</p>
        <p className="text-taupe">{author.role}</p>
      </div>
      <div className="ml-auto text-right font-mono text-[11px] uppercase tracking-wider text-taupe">
        <p>
          <time dateTime={datePublished}>{fmt(datePublished)}</time> · {readingTime}
        </p>
        {dateModified && dateModified !== datePublished && (
          <p className="mt-0.5 text-taupe/70">
            Updated <time dateTime={dateModified}>{fmt(dateModified)}</time>
          </p>
        )}
      </div>
    </div>
  );
}

export function AuthorBio({ authorId }: { authorId: string }) {
  const author = (siteConfig.authors as Record<string, { name: string; role: string; photo: string; bio: string }>)[authorId];
  if (!author) return null;
  return (
    <aside className="surface mt-12 flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center">
      <Image
        src={author.photo}
        alt={`${author.name}, ${author.role}`}
        width={72}
        height={72}
        className="h-18 w-18 shrink-0 rounded-2xl object-cover object-top"
        style={{ height: 72, width: 72 }}
      />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-taupe">Written by</p>
        <p className="mt-1 font-display text-lg font-semibold text-espresso">{author.name}</p>
        <p className="text-sm text-taupe">{author.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-taupe">{author.bio}</p>
      </div>
    </aside>
  );
}
