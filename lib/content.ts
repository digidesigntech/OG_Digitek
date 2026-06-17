/** Editorial content for the site. Keeps page components lean. */

export type Service = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  definition: string; // one-sentence, GEO-quotable
  outcomes: string[];
  who: string;
  flagship?: boolean;
};

export const services: Service[] = [
  {
    slug: 'corporate-websites',
    name: 'Corporate Websites',
    headline: 'A website that does the selling before your team picks up the phone.',
    description:
      'We design and build corporate websites that turn first impressions into qualified enquiries — fast, accessible, search-ready and easy for your team to update. Strategy, copy, design and code under one accountable roof.',
    definition:
      'A corporate website is a fast, search-optimised business site that communicates credibility and converts visitors into qualified enquiries.',
    outcomes: [
      'Higher-quality enquiries from organic search',
      'Sub-2.5s load times and 90+ Lighthouse scores',
      'A CMS your team can edit without a developer',
      'Brand-consistent design across every screen size',
    ],
    who: 'For established businesses across Tamil Nadu that have outgrown a template site.',
  },
  {
    slug: 'clinic-platforms',
    name: 'Clinic & Aesthetic Healthcare Platforms',
    headline: 'Built for dermatology, cosmetic and aesthetic clinics — where trust is the product.',
    description:
      'Our flagship specialisation. We build clinic platforms for dermatology, beauty and cosmetic practices: treatment catalogues, appointment booking, before/after galleries and consent flows that feel premium and convert. Aesthetics that match the care you give.',
    definition:
      'A clinic platform is a privacy-aware website with appointment booking, treatment-catalogue pages, before/after galleries and consent flow built in.',
    outcomes: [
      'Online consultation and appointment booking',
      'Treatment-catalogue pages optimised for "near me" search',
      'Compliant before/after galleries and consent capture',
      'A premium aesthetic that reflects clinical quality',
    ],
    who: 'For dermatology, cosmetic, aesthetic and beauty clinics that want bookings, not just brochures.',
    flagship: true,
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    headline: 'The tool your business actually runs on — built around how you work.',
    description:
      'When off-the-shelf software fights your workflow, we build the system that fits it. Internal dashboards, booking engines, inventory, CRM and automation — engineered to scale, documented to last.',
    definition:
      'Custom software is a purpose-built application — dashboard, CRM, booking engine or automation — engineered around a specific business workflow.',
    outcomes: [
      'Manual processes automated end to end',
      'A single source of truth for your operations',
      'Architecture that scales with your business',
      'Clean documentation and handover',
    ],
    who: 'For operations-heavy businesses where spreadsheets and generic tools have hit their ceiling.',
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile Apps',
    headline: 'iOS and Android apps your customers keep on the home screen.',
    description:
      'From loyalty and booking apps to full product platforms, we design and ship cross-platform mobile experiences that are fast, intuitive and genuinely useful — then support them after launch.',
    definition:
      'A mobile app is a native or cross-platform iOS/Android application designed for booking, loyalty, commerce or service delivery.',
    outcomes: [
      'One codebase, both app stores',
      'Push notifications and offline-ready flows',
      'Store submission handled for you',
      'Post-launch monitoring and updates',
    ],
    who: 'For brands and clinics ready to put booking, loyalty or service in their customers’ pockets.',
  },
  {
    slug: 'brand-identity',
    name: 'Brand Identity & Design',
    headline: 'A brand that looks as considered as the work behind it.',
    description:
      'Logo systems, colour, typography, packaging and creative — crafted by our in-house studio, Digi Design. We build identities that feel premium and stay consistent across every touchpoint.',
    definition:
      'Brand identity is a complete visual system — logo, colour, typography and creative assets — that keeps a brand recognisable across every touchpoint.',
    outcomes: [
      'A full logo and identity system',
      'Brand guidelines your whole team can follow',
      'Social, print and packaging creative',
      'A look that feels premium, not templated',
    ],
    who: 'For clinics and beauty brands that want to look the part — handled by our Digi Design studio.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    headline: 'Visibility that turns into booked appointments.',
    description:
      'SEO, local search, social and paid campaigns built specifically for healthcare and aesthetic brands. We focus on the metrics that matter — enquiries and bookings — not vanity numbers.',
    definition:
      'Digital marketing for clinics combines local SEO, social and paid campaigns engineered to drive appointment enquiries rather than vanity metrics.',
    outcomes: [
      'Ranking for high-intent local searches',
      'Consistent, on-brand social presence',
      'Paid campaigns measured against bookings',
      'Monthly reporting in plain language',
    ],
    who: 'For clinics and brands that have a great site but want more people to find it.',
  },
  {
    slug: 'managed-hosting',
    name: 'Managed Hosting & Support',
    headline: 'Your site stays fast, secure and online — so you never think about it.',
    description:
      'Managed hosting, monitoring, backups, security patching and on-call support. One accountable team that keeps everything running and answers when something needs attention.',
    definition:
      'Managed hosting is a fully maintained hosting plan with monitoring, daily backups, security patching and responsive technical support.',
    outcomes: [
      'Daily backups and uptime monitoring',
      'Security patches applied for you',
      'Fast, real-person support',
      'No surprise downtime',
    ],
    who: 'For every client who wants their site cared for, not just shipped.',
  },
];

export type CaseStudy = {
  name: string;
  industry: 'Aesthetic Clinic' | 'Dermatology' | 'Beauty Brand' | 'Other';
  outcome: string;
  accent: string; // gradient seed for the placeholder hero
};

export const caseStudies: CaseStudy[] = [
  { name: 'Lumina Skin Clinic', industry: 'Dermatology', outcome: '3× online consultation bookings in four months.', accent: 'from-nude-400 to-wine' },
  { name: 'Velvet Aesthetics', industry: 'Aesthetic Clinic', outcome: 'New booking platform cut no-shows by 40%.', accent: 'from-nude-300 to-espresso' },
  { name: 'Aura Derma Studio', industry: 'Dermatology', outcome: 'Ranked #1 locally for three core treatments.', accent: 'from-nude-200 to-taupe' },
  { name: 'Glow & Co.', industry: 'Beauty Brand', outcome: 'D2C storefront launch hit ₹10L in first quarter.', accent: 'from-nude-400 to-espresso-light' },
  { name: 'Serene Cosmetic Care', industry: 'Aesthetic Clinic', outcome: 'Premium rebrand lifted average treatment value.', accent: 'from-nude-300 to-wine' },
  { name: 'Petals Beauty Bar', industry: 'Beauty Brand', outcome: 'Loyalty app drove 28% repeat-visit growth.', accent: 'from-nude-200 to-espresso' },
  { name: 'Dermis & Co.', industry: 'Dermatology', outcome: 'Consolidated five locations into one platform.', accent: 'from-nude-400 to-taupe' },
  { name: 'Bloom Skin Lab', industry: 'Aesthetic Clinic', outcome: 'Booking funnel doubled qualified enquiries.', accent: 'from-nude-300 to-espresso-light' },
  { name: 'Nirvana Wellness', industry: 'Other', outcome: 'Wellness portal with membership and scheduling.', accent: 'from-nude-200 to-wine' },
  { name: 'Radiance Med Spa', industry: 'Aesthetic Clinic', outcome: 'Conversion-first site, 2.1s LCP nationwide.', accent: 'from-nude-400 to-espresso' },
];

export const designSamples = [
  { name: 'Lumina — Identity System', tag: 'Brand Identity', accent: 'from-nude-400 to-wine' },
  { name: 'Velvet — Packaging', tag: 'Packaging', accent: 'from-nude-300 to-espresso' },
  { name: 'Glow & Co. — Social Kit', tag: 'Social Creative', accent: 'from-nude-200 to-taupe' },
  { name: 'Aura — Logo Suite', tag: 'Logo Design', accent: 'from-nude-400 to-espresso-light' },
  { name: 'Petals — Menu & Print', tag: 'Print', accent: 'from-nude-300 to-wine' },
  { name: 'Serene — Brand Guidelines', tag: 'Guidelines', accent: 'from-nude-200 to-espresso' },
  { name: 'Bloom — Campaign', tag: 'Campaign', accent: 'from-nude-400 to-taupe' },
  { name: 'Radiance — Web Visuals', tag: 'Web Design', accent: 'from-nude-300 to-espresso-light' },
];

export type Package = {
  name: string;
  /** Monthly price in INR. Omitted for the quote-only Custom tier. */
  price?: number;
  priceLabel: string;
  cadence: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

export const designPackages: Package[] = [
  {
    name: 'Starter',
    price: 5000,
    priceLabel: '₹5,000',
    cadence: '/ month',
    tagline: 'Get your practice posting consistently.',
    features: [
      '8 Posts',
      '4 Stories',
      '2 Reels',
    ],
  },
  {
    name: 'Growth',
    price: 7500,
    priceLabel: '₹7,500',
    cadence: '/ month',
    tagline: 'We design and run your social channels.',
    features: [
      'Everything in Starter',
      'Posting on your channels',
      'Social media handling',
    ],
  },
  {
    name: 'Pro',
    price: 25000,
    priceLabel: '₹25,000',
    cadence: '/ month',
    tagline: 'Unlimited creative plus paid growth.',
    features: [
      'Unlimited designs',
      'Custom designs',
      'Corrections included',
      'Social media handling',
      'Meta ads running*',
    ],
    featured: true,
  },
  {
    name: 'Custom',
    priceLabel: 'Quoted',
    cadence: 'tailored to you',
    tagline: 'Built around your practice and goals.',
    features: [
      'Everything in Pro',
      '+ SEO',
      '+ Practice website',
      'Built around your goals',
    ],
  },
];

export const contactFaqs = [
  {
    q: 'How does a project usually start?',
    a: 'It starts with a free first conversation — over WhatsApp, phone or at our Chromepet office. We learn your goals, then send a written proposal with scope, timeline and fixed pricing before any work begins.',
  },
  {
    q: 'How long does a website or platform take?',
    a: 'A focused corporate or clinic website typically takes 3–6 weeks. Custom software and mobile apps run 8–16 weeks depending on scope. We share a milestone timeline up front and keep you updated at every stage.',
  },
  {
    q: 'How does payment work?',
    a: 'Most projects are split into milestone payments — a deposit to begin, a stage payment at design sign-off, and the balance on delivery. Hosting, support and marketing are billed monthly. Everything is agreed in writing first.',
  },
  {
    q: 'Do you specialise in healthcare and aesthetic clinics?',
    a: 'Yes — clinic and aesthetic-healthcare platforms are our flagship niche. We have shipped over 100 clinic and beauty-brand websites from Chromepet, so we understand booking flows, treatment catalogues, consent and the premium feel these brands need.',
  },
  {
    q: 'What happens after launch?',
    a: 'We do not disappear. Managed hosting, monitoring, backups and support keep your site fast and secure, and our team stays reachable Monday to Saturday — with urgent support available for retainer clients on Sundays too.',
  },
];

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: 'Do you work only with healthcare or aesthetic businesses?',
    a: 'We specialise in aesthetic healthcare, beauty and dermatology brands, but we also build corporate sites, custom software and apps for any business based in Tamil Nadu and across India.',
  },
  {
    q: 'Where is Baptist Digitek based?',
    a: 'Our registered head office is in Chromepet, Chennai, with a branch office in Tanjore. We work with clients across India and beyond.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A standard corporate site ships in 3–5 weeks; clinic platforms with booking and patient flows take 6–10 weeks; custom software and apps are scoped per project.',
  },
  {
    q: 'Do you handle hosting and maintenance after launch?',
    a: 'Yes — managed hosting and ongoing support are one of our core services. Most clients stay with us multi-year.',
  },
  {
    q: 'What’s the first step?',
    a: 'A free, no-pressure first call. WhatsApp +91 78458 34708 or send an enquiry from the contact page — first conversations are always free.',
  },
];

/** Per-service FAQ blocks (keyed by service slug). 3–5 Q&As each. */
export const serviceFaqs: Record<string, Faq[]> = {
  'corporate-websites': [
    { q: 'Can we update the website ourselves after launch?', a: 'Yes — we build on a content management system your team can edit without a developer, and we train you on it at handover.' },
    { q: 'Will the site be fast and mobile-friendly?', a: 'Every site we ship targets sub-2.5s load times, a 90+ Lighthouse score and a mobile-first layout, because most of your visitors arrive on a phone.' },
    { q: 'Do you write the content or do we?', a: 'Either works. We can write conversion-focused copy for you, polish your draft, or build around content you supply.' },
  ],
  'clinic-platforms': [
    { q: 'What’s the difference between a clinic platform and a regular website?', a: 'A clinic platform adds patient-facing tooling — online appointment booking, treatment-catalogue pages, before/after galleries and consent capture — on top of a normal website, so it generates bookings, not just impressions.' },
    { q: 'Do you build online appointment booking and patient intake forms?', a: 'Yes. We build real-time booking, automated reminders to cut no-shows, and digital intake and consent forms that feed straight into your workflow.' },
    { q: 'Is the platform compliant with healthcare data privacy norms?', a: 'We build to India’s Digital Personal Data Protection (DPDP) Act, 2023 — consent capture, encryption, access control and careful handling of patient images and data. We recommend confirming specifics with your compliance advisor.' },
    { q: 'Can the platform integrate with our existing practice management software?', a: 'In most cases yes — we integrate with common practice-management and calendar tools via their APIs, or build a custom bridge where needed.' },
  ],
  'custom-software': [
    { q: 'What kinds of custom software do you build?', a: 'Internal dashboards, booking engines, inventory and CRM systems, and workflow automation — purpose-built around how your business actually runs.' },
    { q: 'Do you sign NDAs?', a: 'Yes, gladly. We sign an NDA before any sensitive discussion or scoping work begins.' },
    { q: 'How is custom software priced — fixed or hourly?', a: 'Most projects are fixed-price against an agreed scope and milestones, so you know the cost up front. Larger, evolving builds can run on a monthly retainer.' },
  ],
  'mobile-apps': [
    { q: 'Do you build iOS, Android or both?', a: 'Both — we build cross-platform apps from a single codebase, so you ship to the Apple App Store and Google Play together.' },
    { q: 'Do you handle App Store submission?', a: 'Yes. We manage store listings, review submission and the launch process for you, and support updates afterwards.' },
    { q: 'Can the app work with our existing website or platform?', a: 'Yes — we connect the app to your existing site, booking system or backend so data stays in sync across everything.' },
  ],
  'brand-identity': [
    { q: 'What’s included in a brand identity engagement?', a: 'Typically a logo system, colour palette, typography, brand guidelines and the core creative assets — handled by our in-house Digi Design studio. Packages scale from a launch identity to a full creative system.' },
    { q: 'Do you also redesign existing brands?', a: 'Yes — we run rebrands and brand refreshes, evolving what works while fixing what holds the brand back.' },
    { q: 'Can branding and the website be done together?', a: 'That’s the ideal — a unified team designs the identity and builds the site around it, so everything feels consistent from day one.' },
  ],
  'digital-marketing': [
    { q: 'Do you handle Meta Ads, Google Ads or organic SEO?', a: 'All three. We run local and organic SEO, Google and Meta ad campaigns, and on-brand social — measured against enquiries and bookings, not vanity metrics.' },
    { q: 'What’s the minimum monthly retainer?', a: 'Marketing runs on a monthly retainer scoped to your goals and ad spend. Tell us your targets on a first call and we’ll propose a plan and a clear minimum.' },
    { q: 'How soon will we see results?', a: 'Paid campaigns can drive enquiries within weeks; SEO compounds over 3–6 months. We report progress monthly in plain language.' },
  ],
  'managed-hosting': [
    { q: 'What’s included in managed hosting?', a: 'Fully managed hosting with daily backups, uptime monitoring, security patching and responsive technical support — so your site stays fast, secure and online without you thinking about it.' },
    { q: 'Where are your servers based?', a: 'We host on reputable cloud infrastructure with India and global regions available, choosing the location that gives your audience the fastest, most compliant setup.' },
    { q: 'What happens if the site goes down?', a: 'Monitoring alerts us before most issues reach your visitors, and our team is reachable Monday–Saturday, with urgent support available for retainer clients on Sundays too.' },
  ],
};

export const capabilities = [
  { title: 'Corporate Sites', desc: 'Credibility-first business websites that convert.', href: '/services#corporate-websites' },
  { title: 'Clinic Platforms', desc: 'Booking, treatments and consent for aesthetic care.', href: '/services#clinic-platforms' },
  { title: 'Custom Software', desc: 'Systems built around how your business actually runs.', href: '/services#custom-software' },
  { title: 'Mobile Apps', desc: 'iOS & Android experiences people keep using.', href: '/services#mobile-apps' },
  { title: 'Brand Identity', desc: 'Premium identity systems from our Digi Design studio.', href: '/services#brand-identity' },
  { title: 'Managed Hosting', desc: 'Fast, secure, monitored — handled for you.', href: '/services#managed-hosting' },
];

export const processSteps = [
  'Strategy',
  'Design',
  'Development',
  'Deployment',
  'Marketing',
  'Support',
];
