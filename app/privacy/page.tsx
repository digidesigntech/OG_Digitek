import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { pageSchema } from '@/lib/schema';
import { siteConfig, formatAddress } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Baptist Digitek',
  description:
    'How Baptist Digitek collects, uses and protects your personal data, in line with India’s Digital Personal Data Protection (DPDP) Act, 2023.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | Baptist Digitek',
    description: 'How Baptist Digitek collects, uses and protects your personal data.',
    url: `${siteConfig.url}/privacy`,
  },
};

const hq = siteConfig.offices.chromepet;

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'WebPage',
          path: '/privacy',
          name: 'Privacy Policy | Baptist Digitek',
          description: metadata.description as string,
        })}
      />

      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-taupe">
            Last updated 3 June 2026
          </p>

          <div className="prose-legal mt-10 space-y-8 text-base leading-relaxed text-taupe">
            <p>
              {siteConfig.legalName} (“Baptist Digitek”, “we”, “us”) respects your privacy. This
              policy explains what personal data we collect, why, how we use and protect it, and the
              rights you have — consistent with India’s Digital Personal Data Protection (DPDP) Act,
              2023. It applies to {siteConfig.url} and our services.
            </p>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">1. Data we collect</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-nude-500">
                <li><strong className="text-espresso">Contact data</strong> you submit via our enquiry form, email or WhatsApp — name, email, phone, and the project details you share.</li>
                <li><strong className="text-espresso">Usage data</strong> collected automatically — pages viewed, approximate location, device and browser, via analytics cookies.</li>
                <li><strong className="text-espresso">Client project data</strong> shared with us during an engagement, handled under our service agreement and any NDA.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">2. How we use your data</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-nude-500">
                <li>To respond to enquiries and provide quotes and proposals.</li>
                <li>To deliver, support and improve the services you engage us for.</li>
                <li>To understand site performance and improve our content and user experience.</li>
                <li>To meet legal, accounting and security obligations.</li>
              </ul>
              <p className="mt-4">We process data on the basis of your consent, our legitimate business interests, and to perform our contract with you.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">3. Cookies &amp; analytics</h2>
              <p className="mt-4">
                We use cookies and similar technologies for essential site function and analytics
                (for example Google Analytics 4 via Google Tag Manager). You can control cookies
                through your browser settings; disabling non-essential cookies will not break the site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">4. Third-party processors</h2>
              <p className="mt-4">
                We share data only with trusted processors who help us operate, including analytics
                (Google Analytics / Tag Manager), our hosting and infrastructure providers, and our
                form-handling service. These providers process data on our behalf under their own
                safeguards. We do not sell your personal data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">5. Data retention &amp; security</h2>
              <p className="mt-4">
                We keep personal data only as long as necessary for the purposes above or as required
                by law, then delete or anonymise it. We apply reasonable technical and organisational
                safeguards — access controls, encryption in transit, and vetted infrastructure — to
                protect your data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">6. Your rights</h2>
              <p className="mt-4">Under the DPDP Act you may request to access, correct, update or erase your personal data, and withdraw consent. To exercise these rights, contact us using the details below.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">7. Contact for data requests</h2>
              <p className="mt-4">
                Email{' '}
                <a href={`mailto:${siteConfig.contact.emailSupport}`} className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">
                  {siteConfig.contact.emailSupport}
                </a>{' '}
                or write to us at {formatAddress(hq)}. You can also reach us via the{' '}
                <Link href="/contact" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">contact page</Link>.
              </p>
            </div>

            <p className="text-sm">
              We may update this policy from time to time; the “last updated” date reflects the
              latest version. See also our{' '}
              <Link href="/terms" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
