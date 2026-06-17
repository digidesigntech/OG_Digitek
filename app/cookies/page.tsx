import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { pageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { ManageCookiesButton } from '@/components/consent/manage-button';

export const metadata: Metadata = {
  title: 'Cookie Policy | Baptist Digitek',
  description:
    'How Baptist Digitek uses cookies, the consent choices available to you, and how to change your preferences at any time.',
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Cookie Policy | Baptist Digitek',
    description: 'How Baptist Digitek uses cookies and how to manage your preferences.',
    url: `${siteConfig.url}/cookies`,
  },
};

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'WebPage',
          path: '/cookies',
          name: 'Cookie Policy | Baptist Digitek',
          description: metadata.description as string,
        })}
      />

      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-taupe">
            Last updated 9 June 2026
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-taupe">
            <p>
              This policy explains how {siteConfig.legalName} uses cookies and similar
              technologies on {siteConfig.url}, and the choices you have. It complements our{' '}
              <Link href="/privacy" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">Essential cookies</h2>
              <p className="mt-4">
                Required for the site to function — for example remembering your cookie
                preferences. These are always on and don’t need consent.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">Analytics cookies</h2>
              <p className="mt-4">
                With your consent, we use Google Analytics 4 (via Google Tag Manager) to
                understand how visitors use the site so we can improve it. Analytics scripts are
                only loaded after you grant consent — reject them and nothing is sent.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">Marketing cookies</h2>
              <p className="mt-4">
                With your consent, these help us measure campaigns. They remain disabled unless
                you opt in.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">Manage your choices</h2>
              <p className="mt-4">
                You can change your consent at any time. Your choice is stored on your device and
                applied immediately.
              </p>
              <div className="mt-5">
                <ManageCookiesButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
