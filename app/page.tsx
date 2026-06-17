import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { CtaSection } from '@/components/sections/cta';
import { HeroVideo } from '@/components/sections/hero-video';
import { TrackedLink } from '@/components/analytics/tracked';
import { TrackRecord } from '@/components/sections/track-record';
import { CapabilityBento } from '@/components/sections/capability-bento';
import { StoryScroll } from '@/components/sections/story-scroll';
import { FaqSection } from '@/components/ui/faq-section';
import { RelatedInsights } from '@/components/blog/related-insights';
import { websiteSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { processSteps, homeFaqs } from '@/lib/content';

// Homepage uses the site-level default title from app/layout.tsx (the primary
// keyword target). Speakable schema added below for voice/AI excerpting.
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.url}/#webpage`,
  url: siteConfig.url,
  name: 'Healthcare & Aesthetic Web Development Agency in Chennai',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero-speakable', '.cta-speakable'],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={speakableSchema} />

      {/* ---------- Hero ---------- */}
      {/* Pulled up under the sticky nav (h-[4.5rem]) so the transparent navbar
          overlays the video; inner padding keeps the copy clear of the bar. */}
      <section className="relative -mt-[4.5rem] overflow-hidden">
        {/* Full-bleed hero backdrop — muted, looping video (static poster for
            reduced-motion users) */}
        <HeroVideo
          src="/og/landing-video.mp4"
          poster="/og/landing.jpeg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Readability overlays — keep the copy legible over the texture */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-espresso-dark/92 via-espresso-dark/70 to-espresso-dark/35"
        />
        <div aria-hidden className="absolute inset-0 bg-espresso-dark/25" />

        <div className="container-x relative z-10 flex min-h-[74vh] flex-col justify-center py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="font-hero text-4xl font-semibold leading-[1.1] tracking-normal text-cream sm:text-5xl lg:text-6xl">
                The clinic patients
                <br />
                <span className="bg-gradient-to-r from-nude-300 via-wine to-nude-200 bg-clip-text text-transparent">
                  <span className="whitespace-nowrap">find first,</span>{' '}
                  <span className="whitespace-nowrap">trust first,</span>{' '}
                  <span className="whitespace-nowrap">book first.</span>
                </span>
                <span className="sr-only">
                  {' '}
                  — Healthcare &amp; aesthetic web development agency in Chennai.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="hero-speakable mt-7 max-w-2xl text-lg leading-relaxed text-nude-200/90">
                Beautiful care deserves a beautiful first impression — websites, branding
                and booking flows built exclusively for healthcare, aesthetic and beauty
                brands across Tamil Nadu.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink
                  href="/contact"
                  event="cta_primary"
                  params={{ cta_label: 'Start a Project', page: 'home' }}
                  className="btn bg-nude-300 text-espresso shadow-soft hover:-translate-y-0.5 hover:bg-nude-400"
                >
                  Start a Project
                </TrackedLink>
                <Link
                  href="/portfolio"
                  className="btn border border-nude-300/40 text-nude-100 backdrop-blur hover:bg-white/10"
                >
                  See Our Work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-nude-300/20 pt-7">
                {[
                  ['100+', 'Projects completed'],
                  ['6+', 'Years in business'],
                  ['Aesthetic', 'Healthcare specialists'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-semibold text-cream">{n}</dt>
                    <dd className="font-mono text-[10px] uppercase tracking-wider text-nude-200/70">{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section aria-label="Why clients trust us" className="border-y border-nude-200/70 bg-white/50">
        <div className="container-x flex flex-col items-center justify-center gap-3 py-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-taupe sm:flex-row sm:gap-8">
          <span>Multi-year clients</span>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-nude-400 sm:block" />
          <span>Hundreds of sites</span>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-nude-400 sm:block" />
          <span>One accountable team</span>
        </div>
      </section>

      {/* ---------- Story hook (GSAP scrollytelling) ---------- */}
      <StoryScroll />

      {/* ---------- Capability bento ---------- */}
      <CapabilityBento />

      {/* ---------- Process strip ---------- */}
      <section aria-label="How we work" className="border-y border-nude-200/70 bg-blush/40">
        <div className="container-x py-14">
          <Reveal>
            <p className="eyebrow text-center">How we work</p>
          </Reveal>
          <ol className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 0.04}>
                <span className="inline-flex items-center gap-2 rounded-full border border-nude-300/70 bg-white px-5 py-2.5 text-sm font-medium text-espresso shadow-card">
                  <span className="font-mono text-xs text-taupe">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Track record (animated stat counters) ---------- */}
      <TrackRecord />

      {/* ---------- Related insights (latest blog posts) ---------- */}
      <RelatedInsights category="" heading="Latest insights" eyebrow="From the blog" />

      {/* ---------- FAQ ---------- */}
      <section className="container-x py-8">
        <FaqSection items={homeFaqs} id="home-faq" heading="Frequently asked questions" />
      </section>

      {/* ---------- Internal linking strip ---------- */}
      <section className="container-x pb-4">
        <Reveal className="surface flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-espresso">Explore the work in depth</h2>
            <p className="mt-2 max-w-lg text-sm text-taupe">
              Read about our <Link href="/services" className="link-underline font-medium text-espresso">services for clinics and beauty brands</Link>,
              browse the <Link href="/portfolio" className="link-underline font-medium text-espresso">healthcare web development portfolio</Link>,
              meet the team on the <Link href="/about" className="link-underline font-medium text-espresso">About Us page</Link>, or
              visit our <Link href="/digi-design" className="link-underline font-medium text-espresso">Digi Design studio</Link>.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Contact us
          </Link>
        </Reveal>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        speakable
        headline="Have a project, a question, or a rough sketch on paper?"
        body="Send us a WhatsApp or pick up the phone — first conversations are always free."
      />
    </>
  );
}
