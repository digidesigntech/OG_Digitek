import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { pageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:py-24">
      <JsonLd
        data={{
          ...pageSchema({
            type: 'WebPage',
            path: '/404',
            name: 'Page Not Found | Baptist Digitek',
            description: 'The page you are looking for could not be found.',
          }),
          // Honour the noindex intent in the structured data too.
          // (Google reads the meta robots tag; this keeps the schema consistent.)
        }}
      />
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-display text-4xl font-semibold text-espresso sm:text-5xl">
        This page took a different path.
      </h1>
      <p className="mt-4 max-w-md text-base text-taupe">
        The page you’re looking for isn’t here. Let’s get you back to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/services" className="btn-secondary">
          Services
        </Link>
        <Link href="/blog" className="btn-secondary">
          Blog
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact
        </Link>
      </div>
    </section>
  );
}
