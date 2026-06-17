import { Reveal } from '@/components/ui/reveal';
import { siteConfig } from '@/lib/site';
import { TrackedLink, TrackedAnchor } from '@/components/analytics/tracked';

export function CtaSection({
  headline,
  body,
  primaryLabel = 'Talk to Us',
  primaryHref = '/contact',
  showWhatsapp = true,
  speakable = false,
}: {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  showWhatsapp?: boolean;
  speakable?: boolean;
}) {
  return (
    <section className="container-x py-16 sm:py-24">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-16 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-nude-400 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-wine blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <h2
            className={`font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl ${speakable ? 'cta-speakable' : ''}`}
          >
            {headline}
          </h2>
          <p className={`mt-5 text-base leading-relaxed text-nude-200/85 ${speakable ? 'cta-speakable' : ''}`}>
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <TrackedLink
              href={primaryHref}
              event="cta_primary"
              params={{ cta_label: primaryLabel, page: 'cta_section' }}
              className="btn bg-nude-300 text-espresso shadow-soft hover:-translate-y-0.5 hover:bg-nude-400"
            >
              {primaryLabel}
            </TrackedLink>
            {showWhatsapp && (
              <TrackedAnchor
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                event="whatsapp_click"
                params={{ location: 'cta_section' }}
                className="btn border border-nude-300/40 text-nude-100 hover:bg-white/10"
              >
                WhatsApp Us
              </TrackedAnchor>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
