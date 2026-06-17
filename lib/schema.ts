/**
 * Centralised JSON-LD builders. Every value is pulled from siteConfig so the
 * structured data and the visible content can never drift apart.
 */
import { siteConfig, formatAddress, type Office } from './site';

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

function postalAddress(office: Office) {
  return {
    '@type': 'PostalAddress',
    streetAddress: office.street,
    addressLocality: office.locality,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: office.country,
  };
}

/** Organization — referenced (by @id) from every other schema on the site. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingDate: siteConfig.foundingDate,
    slogan: siteConfig.tagline,
    blog: siteConfig.blog,
    knowsAbout: siteConfig.knowsAbout,
    address: postalAddress(siteConfig.offices.chromepet),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phonePrimary,
        contactType: 'sales',
        email: siteConfig.contact.emailSales,
        areaServed: 'IN',
        availableLanguage: ['en', 'ta'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phonePrimary,
        contactType: 'customer support',
        email: siteConfig.contact.emailSupport,
        areaServed: 'IN',
        availableLanguage: ['en', 'ta'],
      },
    ],
    areaServed: { '@type': 'State', name: 'Tamil Nadu' },
    sameAs: siteConfig.sameAs,
  };
}

/** WebSite + SearchAction — homepage. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** LocalBusiness — full NAP for both offices, used on /contact. */
export function localBusinessSchema() {
  const build = (office: Office, suffix: string) => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#localbusiness-${suffix}`,
    name: `${siteConfig.legalName} — ${office.city}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    url: siteConfig.url,
    telephone: office.phone,
    priceRange: '₹₹',
    address: postalAddress(office),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.geo.lat,
      longitude: office.geo.lng,
    },
    openingHoursSpecification: siteConfig.hours.spec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    sameAs: siteConfig.sameAs,
    parentOrganization: { '@id': ORG_ID },
  });
  return [
    build(siteConfig.offices.chromepet, 'chromepet'),
    build(siteConfig.offices.tanjore, 'tanjore'),
  ];
}

/** Person — Angelin Celena, CTO (About page). */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/about/#angelin-celena`,
    name: 'Angelin Celena',
    jobTitle: 'Chief Technology Officer',
    image: `${siteConfig.url}/CTO.jpeg`,
    worksFor: { '@id': ORG_ID },
    knowsAbout: [
      'Aesthetic clinic web design',
      'Cosmetology brand experience',
      'Dermatology practice websites',
      'Healthcare digital strategy',
    ],
    description:
      'Angelin Celena is the Chief Technology Officer of Baptist Digitek, leading digital strategy for aesthetic, cosmetology and dermatology brands. She pairs deep domain experience across the aesthetic and healthcare space with technology, design and business innovation.',
  };
}

/** WebPage / AboutPage / ContactPage / CollectionPage generic builder. */
export function pageSchema(opts: {
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  path: string;
  name: string;
  description: string;
  mainEntity?: object;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.type,
    '@id': `${siteConfig.url}${opts.path}#webpage`,
    url: `${siteConfig.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
  if (opts.mainEntity) data.mainEntity = opts.mainEntity;
  return data;
}

/** Service schema (one per offering on /services). */
export function serviceSchema(s: {
  slug: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/services/#${s.slug}`,
    serviceType: s.name,
    name: s.name,
    description: s.description,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'State', name: 'Tamil Nadu' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
    },
  };
}

/** ItemList of case studies (portfolio collection pages). */
export function itemListSchema(items: { name: string; url?: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { url: it.url } : {}),
    })),
  };
}

/** FAQPage (contact page). */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** OfferCatalog for Digi Design packages. */
export function offerCatalogSchema(
  packages: { name: string; price: number; description: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Digi Design Branding & Design Packages',
    url: `${siteConfig.url}/digi-design/packages`,
    provider: { '@id': ORG_ID },
    itemListElement: packages.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.description,
      price: p.price,
      priceCurrency: 'INR',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1 },
      availability: 'https://schema.org/InStock',
    })),
  };
}

/** BreadcrumbList — emitted by the Breadcrumb component. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${siteConfig.url}${t.path}`,
    })),
  };
}

/** Person schema for a blog author (from siteConfig.authors). */
export function authorPersonSchema(authorId: string) {
  const a = (siteConfig.authors as Record<string, { name: string; role: string; photo: string; bio: string; sameAs: readonly string[] }>)[authorId];
  if (!a) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/blog/author/${authorId}#person`,
    name: a.name,
    jobTitle: a.role,
    image: `${siteConfig.url}${a.photo}`,
    description: a.bio,
    worksFor: { '@id': ORG_ID },
    sameAs: a.sameAs,
  };
}

/** BlogPosting schema for a blog post. */
export function blogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  ogImage: string;
  datePublished: string;
  dateModified: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  author: string;
  excerpt: string;
}) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const a = (siteConfig.authors as Record<string, { name: string }>)[post.author];
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.ogImage}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: a?.name ?? 'Baptist Digitek',
      url: `${siteConfig.url}/about`,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
    articleBody: post.excerpt,
    inLanguage: 'en-IN',
  };
}

/** SpeakableSpecification block for a page. */
export function speakableSchema(path: string, selectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}${path}#speakable`,
    url: `${siteConfig.url}${path}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors,
    },
  };
}

/** Article schema for a portfolio case study. */
export function articleSchema(cs: {
  slug: string;
  title: string;
  description: string;
  ogImage: string;
  datePublished: string;
  industry: string;
}) {
  const url = `${siteConfig.url}/portfolio/${cs.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: cs.title,
    description: cs.description,
    image: `${siteConfig.url}${cs.ogImage}`,
    datePublished: cs.datePublished,
    dateModified: cs.datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    about: cs.industry,
    inLanguage: 'en-IN',
  };
}

export { formatAddress };
