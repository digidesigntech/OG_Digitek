import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { CtaSection } from '@/components/sections/cta';
import { pageSchema, personSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Baptist Digitek | Healthcare Web Agency in Chromepet, Chennai',
  description:
    'About Baptist Digitek, an aesthetic and healthcare web agency in Chromepet, Chennai. Meet CTO Angelin Celena and the strategy-first approach behind every project.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Baptist Digitek — Aesthetic & Healthcare Web Agency',
    description:
      'Meet the team and the strategy-first philosophy behind Baptist Digitek, an aesthetic and healthcare web agency in Chromepet, Chennai.',
    url: `${siteConfig.url}/about`,
  },
};

const bio = [
  'Angelin Celena comes from a family deeply rooted in the healthcare industry — more than 25 years across patient care, healthcare services, and wellness solutions. She grew up in an environment where healthcare, beauty, and aesthetic care were part of everyday conversation, gaining early exposure to the industry’s evolving needs, challenges, and opportunities.',
  'That upbringing groomed a genuine healthcare consciousness. From a young age she was immersed in the practical side of beauty and aesthetic care — learning first-hand about customer expectations, treatment outcomes, service excellence, and the importance of personalised care — and developing a deep understanding of the pain points both practitioners and clients face in the beauty and wellness sector.',
  'Her focus is the aesthetic and healthcare space: years spent working closely with aesthetic clinics, cosmetology studios, and dermatology practices have given her a working fluency in the language of skin, treatments, and patient trust. She understands how a consultation actually converts, why a before-and-after has to be handled with care, and what makes a clinic feel credible the moment a patient lands on the page.',
  'With a foundation built through family mentorship and hands-on industry exposure, she pairs traditional domain knowledge with contemporary technology — websites, branding, graphic creatives, and full digital platforms — approaching each project with purpose, precision, and a clinician’s respect for accuracy.',
  'Her vision is to contribute meaningfully to the growth of the beauty and wellness industry — embracing ethical practices, customer-focused service, and emerging technology that elevates the client experience — helping aesthetic, beauty, and dermatology brands not just establish their presence, but elevate the way they connect with the patients they care for.',
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          type: 'AboutPage',
          path: '/about',
          name: 'About Baptist Digitek — Aesthetic & Healthcare Web Agency',
          description: metadata.description as string,
        })}
      />
      <JsonLd data={personSchema()} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-grain">
        {/*
          WebGL fractal-flow shader (components/ui/shader-animation), recoloured to
          the site's own soft pink → cream shade so the "Know Us" hero reads as the
          site background gently moving. Decorative + client-only; the headline and
          quote below stay server-rendered and indexable.
        */}
        <ShaderAnimation />
        {/* Whisper-light veil to keep the headline crisp on the left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/55 via-cream/20 to-transparent"
        />
        {/* Bottom fade so the shader dissolves into the cream body (no hard cut) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-cream"
        />
        <div className="container-x relative z-10 py-14 sm:py-20 lg:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-nude-300/70 bg-white/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-espresso backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-wine" />
              Know Us
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
              A word from the{' '}
              <span className="bg-gradient-to-r from-wine to-espresso-light bg-clip-text text-transparent">
                Chief Technology Officer
              </span>
              <span className="sr-only">
                {' '}
                — about Baptist Digitek, an aesthetic &amp; healthcare web agency in Chromepet, Chennai.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-10 max-w-2xl border-l-2 border-nude-400 pl-6">
              <p className="font-display text-2xl font-medium italic leading-snug text-espresso sm:text-3xl">
                “Great digital solutions are not built — they’re strategically designed.”
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-taupe">
              Influence over impression. Strategy over surface. Long-term growth over quick
              wins — that’s the lens every Baptist Digitek project is built through.
            </p>
          </Reveal>

          {/* The three pillars, stated up front */}
          <Reveal delay={0.2}>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {[
                ['Influence', 'over impression'],
                ['Strategy', 'over surface'],
                ['Long-term', 'over quick wins'],
              ].map(([value, label]) => (
                <div key={value}>
                  <dt className="font-display text-2xl font-semibold leading-none text-espresso">
                    {value}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-taupe">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Seam fade — dissolve the hero's cream into the pink page backdrop below
          so the "Meet the CTO" section doesn't begin on a hard horizontal line. */}
      <div
        aria-hidden
        className="pointer-events-none h-24 w-full bg-gradient-to-b from-cream to-transparent sm:h-32"
      />

      {/* ---------- Meet the CTO ---------- */}
      <section className="container-x py-12 lg:py-20">
        <article className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
                <div className="absolute -inset-2 rotate-3 rounded-[2rem] bg-gradient-to-br from-nude-300 to-nude-100 shadow-glow" />
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/70 bg-cream shadow-soft">
                  <Image
                    src="/CTO.jpeg"
                    alt="Angelin Celena, Chief Technology Officer of Baptist Digitek"
                    fill
                    sizes="(max-width: 1024px) 80vw, 320px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <h2 className="font-display text-2xl font-semibold text-espresso">Angelin Celena</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-taupe">
                  Chief Technology Officer · Baptist Digitek
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">Meet Our CTO</p>
            </Reveal>
            <div className="mt-6 space-y-6">
              {bio.map((para, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} className="text-lg leading-relaxed text-taupe">
                  {para}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Influence', 'over impression'],
                ['Strategy', 'over surface'],
                ['Long-term', 'over quick wins'],
              ].map(([a, b]) => (
                <div key={a} className="surface rounded-2xl p-5">
                  <p className="font-display text-xl font-semibold text-espresso">{a}</p>
                  <p className="mt-1 text-sm text-taupe">{b}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-10">
              <p className="text-base leading-relaxed text-taupe">
                That philosophy shows up in our{' '}
                <Link href="/services" className="link-underline font-medium text-espresso">range of services</Link>, our{' '}
                <Link href="/portfolio" className="link-underline font-medium text-espresso">portfolio of clinic and beauty projects</Link>, and the
                creative work of our{' '}
                <Link href="/digi-design" className="link-underline font-medium text-espresso">Digi Design studio</Link>.
              </p>
            </Reveal>
          </div>
        </article>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <CtaSection
        headline="Still reading? You're probably the right fit."
        body="First call is on us. No script, no pressure — just an honest conversation about whether we should work together. From our office in Chromepet, Chennai."
        primaryLabel="Let's Talk"
        showWhatsapp={false}
      />
    </>
  );
}
