import Link from 'next/link';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

function Anchor({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith('/') || href.startsWith('#');
  if (internal) {
    return (
      <Link href={href} className="font-medium text-espresso underline decoration-nude-400 underline-offset-2 hover:decoration-espresso">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-espresso underline decoration-nude-400 underline-offset-2 hover:decoration-espresso"
      {...rest}
    >
      {children}
    </a>
  );
}

/** Styling map for MDX-rendered blog/case-study bodies. */
export const mdxComponents = {
  h2: (p: { children?: ReactNode }) => (
    <h2 className="mt-12 scroll-mt-28 font-display text-2xl font-semibold leading-tight text-espresso sm:text-3xl" {...p} />
  ),
  h3: (p: { children?: ReactNode }) => (
    <h3 className="mt-8 font-display text-xl font-semibold text-espresso" {...p} />
  ),
  h4: (p: { children?: ReactNode }) => (
    <h4 className="mt-6 font-display text-lg font-semibold text-espresso" {...p} />
  ),
  p: (p: { children?: ReactNode }) => (
    <p className="mt-5 text-base leading-relaxed text-taupe" {...p} />
  ),
  ul: (p: { children?: ReactNode }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-taupe marker:text-nude-500" {...p} />
  ),
  ol: (p: { children?: ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-taupe marker:text-taupe" {...p} />
  ),
  li: (p: { children?: ReactNode }) => <li className="pl-1.5" {...p} />,
  a: Anchor,
  strong: (p: { children?: ReactNode }) => <strong className="font-semibold text-espresso" {...p} />,
  blockquote: (p: { children?: ReactNode }) => (
    <blockquote className="my-7 rounded-2xl border-l-2 border-nude-400 bg-nude-50/70 py-4 pl-6 pr-5 text-base leading-relaxed text-espresso [&>p]:mt-0 [&>p]:text-espresso" {...p} />
  ),
  hr: () => <hr className="my-10 border-nude-200" />,
  table: (p: { children?: ReactNode }) => (
    <div className="my-7 overflow-x-auto rounded-2xl border border-nude-200/70">
      <table className="w-full border-collapse text-left text-sm" {...p} />
    </div>
  ),
  thead: (p: { children?: ReactNode }) => <thead className="bg-nude-50" {...p} />,
  th: (p: { children?: ReactNode }) => (
    <th className="border-b border-nude-200 px-4 py-3 font-display text-sm font-semibold text-espresso" {...p} />
  ),
  td: (p: { children?: ReactNode }) => (
    <td className="border-b border-nude-200/60 px-4 py-3 align-top text-taupe" {...p} />
  ),
  code: (p: { children?: ReactNode }) => (
    <code className="rounded bg-nude-100 px-1.5 py-0.5 font-mono text-[0.85em] text-espresso" {...p} />
  ),
  // data-speakable wrappers pass through; the intro gets lead styling.
  div: ({ children, ...rest }: { children?: ReactNode; 'data-speakable'?: string }) => {
    const isIntro = rest['data-speakable'] === 'intro';
    return (
      <div className={isIntro ? 'text-lg leading-relaxed text-espresso [&>p]:mt-5 [&>p:first-child]:mt-0' : ''} {...rest}>
        {children}
      </div>
    );
  },
};
