import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { ContactForm } from '@/components/sections/contact-form';
import { TrackedAnchor } from '@/components/analytics/tracked';
import { pageSchema, localBusinessSchema, faqSchema } from '@/lib/schema';
import { siteConfig, formatAddress } from '@/lib/site';
import { contactFaqs, services } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact | Baptist Digitek | Web Agency in Chromepet, Chennai',
  description:
    'Contact Baptist Digitek, a web agency in Chromepet, Chennai. Call, WhatsApp or email us — first conversations are always free. Office address, hours and enquiry form.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Baptist Digitek — Web Agency in Chromepet, Chennai',
    description:
      'Reach Baptist Digitek by phone, WhatsApp or email. Office in Chromepet, Chennai. First conversations are always free.',
    url: `${siteConfig.url}/contact`,
  },
};

const hq = siteConfig.offices.chromepet;
const { contact, hours } = siteConfig;

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface h-full rounded-3xl p-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-taupe">{label}</h3>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-espresso">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'ContactPage',
          path: '/contact',
          name: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      {localBusinessSchema().map((biz, i) => (
        <JsonLd key={i} data={biz} />
      ))}
      <JsonLd data={faqSchema(contactFaqs)} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-grain">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-0 -z-10 h-96 w-96 rounded-full bg-nude-300/40 blur-3xl" />
        <div className="container-x py-14 sm:py-20 lg:py-24">
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              Let’s talk about your next project
              <span className="sr-only">
                {' '}
                — contact Baptist Digitek, a web agency in Chromepet, Chennai.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-taupe">
              A single landing page, a full software platform, or a second opinion on what your
              business should do next online — we’re easy to reach and quick to respond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Cards + Form ---------- */}
      <section className="container-x grid gap-10 pb-8 lg:grid-cols-12">
        {/* Left: info cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:content-start">
          <Reveal as="div" className="sm:col-span-2">
            <Card label={hq.label}>
              <address className="not-italic">
                <span className="block font-display text-lg font-semibold text-espresso">
                  {hq.name}
                </span>
                {formatAddress(hq)}
              </address>
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryDial}`}
                event="phone_click"
                params={{ phone: contact.phonePrimaryDial, location: 'contact' }}
                className="link-underline mt-2 inline-block font-medium"
              >
                {hq.phone}
              </TrackedAnchor>
            </Card>
          </Reveal>

          <Reveal as="div">
            <Card label="Email">
              <p>
                New enquiries:{' '}
                <a href={`mailto:${contact.emailSales}`} className="link-underline font-medium">
                  {contact.emailSales}
                </a>
              </p>
              <p>
                Client support:{' '}
                <a href={`mailto:${contact.emailSupport}`} className="link-underline font-medium">
                  {contact.emailSupport}
                </a>
              </p>
              <p>
                Design:{' '}
                <a href={`mailto:${contact.emailDesign}`} className="link-underline font-medium">
                  {contact.emailDesign}
                </a>
              </p>
            </Card>
          </Reveal>

          <Reveal as="div">
            <Card label="WhatsApp">
              <TrackedAnchor
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                event="whatsapp_click"
                params={{ location: 'contact' }}
                className="link-underline font-medium"
              >
                {contact.whatsappLabel}
              </TrackedAnchor>
              <p className="text-taupe">Fastest way to reach us — message anytime.</p>
            </Card>
          </Reveal>

          <Reveal as="div" className="sm:col-span-2">
            <Card label="Hours">
              <p className="font-medium">{hours.label}</p>
              <p className="text-taupe">{hours.sunday}</p>
            </Card>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal as="div" className="lg:col-span-5">
          <ContactForm />
        </Reveal>
      </section>

      {/* ---------- Map ---------- */}
      <section className="container-x py-8" aria-label="Office location map">
        <Reveal className="overflow-hidden rounded-3xl border border-nude-200/70 shadow-card">
          <iframe
            title={`Google Map — ${hq.name}, ${hq.locality}, Chennai`}
            src={hq.mapEmbed}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, display: 'block' }}
          />
        </Reveal>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="container-x py-16" aria-labelledby="faq-heading">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Common questions, answered upfront
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-nude-200/70 border-y border-nude-200/70">
          {contactFaqs.map((faq, i) => (
            <Reveal as="div" key={i} delay={i * 0.04}>
              <details className="group py-5" {...(i === 0 ? { open: true } : {})}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-medium text-espresso">{faq.q}</h3>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-nude-300 text-espresso transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-taupe">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Service discovery (internal linking) ---------- */}
      <section className="container-x pb-20" aria-label="Explore our services">
        <Reveal className="surface rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold text-espresso">Or jump straight to a service</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="inline-block rounded-full border border-nude-300/70 bg-white px-4 py-2 text-sm text-espresso transition-colors hover:bg-nude-100"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
