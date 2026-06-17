import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { pageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service | Baptist Digitek',
  description:
    'The terms that govern your use of the Baptist Digitek website and our design, development and digital services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service | Baptist Digitek',
    description: 'The terms governing your use of the Baptist Digitek website and services.',
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'WebPage',
          path: '/terms',
          name: 'Terms of Service | Baptist Digitek',
          description: metadata.description as string,
        })}
      />

      <section className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-taupe">
            Last updated 3 June 2026
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-taupe">
            <p>
              These terms govern your use of {siteConfig.url} and the services provided by{' '}
              {siteConfig.legalName} (“Baptist Digitek”, “we”, “us”). By using our site or engaging
              our services, you agree to these terms. Specific projects are also governed by a separate
              written proposal or service agreement, which takes precedence where it differs.
            </p>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">1. Our services</h2>
              <p className="mt-4">
                We provide website design and development, custom software, mobile apps, brand identity,
                digital marketing, and managed hosting and support. The scope, timeline and price of any
                engagement are set out in a written proposal agreed before work begins.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">2. Proposals, fees &amp; payment</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-nude-500">
                <li>Project fees and milestones are defined in your proposal. Most projects use milestone payments — a deposit to begin, a stage payment at design sign-off, and the balance on delivery.</li>
                <li>Hosting, support and marketing are billed monthly per the agreed plan.</li>
                <li>Quotes are valid for the period stated in the proposal. Taxes apply as per Indian law.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">3. Client responsibilities</h2>
              <p className="mt-4">
                You agree to provide timely content, feedback, approvals and access needed for the work,
                and to ensure that materials you supply do not infringe third-party rights. Delays in
                providing these may affect timelines.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">4. Intellectual property</h2>
              <p className="mt-4">
                On full payment, ownership of the final deliverables created specifically for you
                transfers to you, except for third-party assets, open-source components and our
                pre-existing tools, which remain under their respective licences. We may showcase
                completed work in our portfolio unless agreed otherwise in writing.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">5. Confidentiality</h2>
              <p className="mt-4">
                We treat your confidential information as private and will sign a non-disclosure
                agreement on request. We handle personal data as described in our{' '}
                <Link href="/privacy" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">Privacy Policy</Link>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">6. Warranties &amp; liability</h2>
              <p className="mt-4">
                We deliver our services with reasonable skill and care. To the extent permitted by law,
                our total liability arising from an engagement is limited to the fees paid for that
                engagement. We are not liable for indirect or consequential losses. Nothing in these
                terms excludes liability that cannot be excluded by law.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">7. Governing law</h2>
              <p className="mt-4">
                These terms are governed by the laws of India, and the courts of Chennai, Tamil Nadu
                have exclusive jurisdiction over any dispute.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">8. Contact</h2>
              <p className="mt-4">
                Questions about these terms? Email{' '}
                <a href={`mailto:${siteConfig.contact.emailSales}`} className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">
                  {siteConfig.contact.emailSales}
                </a>{' '}
                or reach us via the{' '}
                <Link href="/contact" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
