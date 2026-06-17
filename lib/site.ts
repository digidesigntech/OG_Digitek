/**
 * Single source of truth for all brand facts.
 * Per the build brief: do NOT hard-code brand values in components — read everything from here.
 */

export const siteConfig = {
  name: 'Baptist Digitek',
  legalName: 'Baptist Digitek Private Limited',
  url: 'https://baptistdigitek.com',
  description:
    'Chennai-based digital agency building websites, software and apps for healthcare, aesthetic, dermatology and beauty brands — strategy to support under one accountable roof.',
  // Placeholder share image (working SVG). Replace with the branded 1200×630
  // /og/default.jpg from the design pass before launch.
  ogImage: '/og/default.svg',
  foundingDate: '2018',
  tagline: 'Digital, Done Right.',

  // Google Tag Manager container ID (loads GA4 + any tags via GTM).
  gtmId: 'GTM-W8PP4QFL',

  // §29.5 — Static-friendly form handling. Web3Forms posts to a fixed endpoint
  // with an access key; replace the placeholder key with the real one from
  // https://web3forms.com (free) before launch.
  forms: {
    contactEndpoint: 'https://api.web3forms.com/submit',
    web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  },

  contact: {
    phonePrimary: '+91 78458 34708',
    phonePrimaryDial: '+917845834708',
    whatsapp: 'https://wa.me/917845834708',
    whatsappLabel: '+91 78458 34708',
    emailSales: 'sales@baptistdigitek.com',
    emailSupport: 'support@baptistdigitek.com',
    emailDesign: 'design@baptistdigitek.com',
  },

  offices: {
    chromepet: {
      label: 'Registered & Corporate Office',
      name: 'Baptist Digitek — Chromepet',
      street: 'Plot No. 1 & 2, 2nd Floor, Subburaya Nagar, Thiruneermalai Main Road',
      locality: 'Chromepet',
      city: 'Chennai',
      region: 'Tamil Nadu',
      postalCode: '600044',
      country: 'IN',
      phone: '+91 78458 34708',
      phoneDial: '+917845834708',
      // Approx geo for Chromepet, Chennai — refine with exact GBP pin before launch.
      geo: { lat: 12.9516, lng: 80.1462 },
      mapEmbed:
        'https://www.google.com/maps?q=Chromepet,Chennai,Tamil+Nadu+600044&output=embed',
    },
    tanjore: {
      label: 'Branch Office',
      name: 'Baptist Digitek — Tanjore',
      street: 'Thanjavur', // TODO: confirm full street address before launch
      locality: 'Thanjavur',
      city: 'Thanjavur',
      region: 'Tamil Nadu',
      postalCode: '613001',
      country: 'IN',
      phone: '+91 78458 34708',
      phoneDial: '+917845834708',
      geo: { lat: 10.7867, lng: 79.1378 },
      mapEmbed:
        'https://www.google.com/maps?q=Thanjavur,Tamil+Nadu&output=embed',
    },
  },

  hours: {
    label: 'Monday–Saturday · 9:30 AM – 7:00 PM IST',
    sunday: 'Sunday — Closed (urgent support available for retainer clients)',
    // Schema.org openingHours specification
    spec: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    ],
  },

  // List every real social / GBP / Wikidata URL when confirmed. Placeholders until then.
  sameAs: [
    'https://www.linkedin.com/company/baptist-digitek',
    'https://www.instagram.com/baptistdigitek',
    'https://www.facebook.com/baptistdigitek',
    'https://www.youtube.com/@baptistdigitek',
    'https://maps.app.goo.gl/BjxB7fJ5XHp1NbY3A', // Google Business Profile
    // 'https://www.wikidata.org/wiki/Qxxxxxxx' // Wikidata QID — add Week 2
  ],

  // Primary nav — intent-ordered (what we do → proof → offering → who we are).
  // "Home" is intentionally omitted: the logo links home (standard convention),
  // which declutters the bar. Blog and Contact are grouped under "Company" since
  // they're supporting pages, not buying-decision pages. "Start a Project" (the
  // CTA button) is the primary route to Contact.
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/portfolio' },
    {
      label: 'Digi Design',
      href: '/digi-design',
      children: [
        { label: 'Portfolio', href: '/digi-design/portfolio' },
        { label: 'Packages', href: '/digi-design/packages' },
      ],
    },
    {
      label: 'Company',
      href: '/about',
      children: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],

  blog: 'https://baptistdigitek.com/blog',
  blogCategories: [
    'Clinic Marketing',
    'Aesthetic Web Design',
    'Dermatology Tech',
    'Beauty Branding',
    'Cosmetology',
    'Healthcare SEO',
    'Digital Strategy',
  ],
  knowsAbout: [
    'healthcare website development',
    'aesthetic clinic platforms',
    'dermatology web design',
    'beauty brand identity',
    'managed hosting',
    'DPDP Act compliance',
  ],

  authors: {
    'angelin-celena': {
      name: 'Angelin Celena',
      role: 'Chief Technology Officer, Baptist Digitek',
      photo: '/CTO.jpeg',
      bio: 'Angelin Celena, CTO of Baptist Digitek, comes from a family with more than 25 years in healthcare and grew up immersed in beauty and aesthetic care. She pairs that domain fluency with technology to build digital experiences for aesthetic, dermatology and beauty brands.',
      sameAs: [
        'https://www.linkedin.com/company/baptist-digitek',
        // Add Angelin's personal LinkedIn / X when confirmed
      ],
    },
  },
} as const;

export type BlogCategory = (typeof siteConfig.blogCategories)[number];
export type AuthorId = keyof typeof siteConfig.authors;

export type SiteConfig = typeof siteConfig;

/** Structural type for an office (both Chromepet HQ and the Tanjore branch). */
export type Office = {
  label: string;
  name: string;
  street: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneDial: string;
  geo: { lat: number; lng: number };
  mapEmbed: string;
};

/** Helper: full formatted address string for a given office. */
export function formatAddress(office: Office): string {
  return `${office.street}, ${office.locality}, ${office.city} – ${office.postalCode}, ${office.region}, India`;
}
