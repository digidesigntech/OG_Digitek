import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fraunces, instrumentSans, spaceMono, cinzel } from './fonts';
import { siteConfig } from '@/lib/site';
import { organizationSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ConsentBanner } from '@/components/consent/consent-banner';
import { CursorEffect } from '@/components/ui/cursor-effect';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Healthcare & Aesthetic Web Development Agency in Chennai | Baptist Digitek',
    template: '%s | Baptist Digitek',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'healthcare website development Chennai',
    'aesthetic clinic web design',
    'dermatology website agency',
    'beauty brand digital marketing',
    'IT solutions Chromepet',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Healthcare & Aesthetic Web Development Agency in Chennai | Baptist Digitek',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Baptist Digitek — digital agency for healthcare and aesthetic brands in Chennai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare & Aesthetic Web Development Agency in Chennai | Baptist Digitek',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#F6C9B4',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${instrumentSans.variable} ${spaceMono.variable} ${cinzel.variable}`}>
      <head>
        {/* Resource hints (§28.4) — analytics origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Hero LCP image preload (next/image priority also handles this) */}
        <link rel="preload" as="image" href="/og/landing.jpeg" />
        {/*
          §29.4 — Google Consent Mode v2. Runs before any tag with ZERO network
          cost: defines the dataLayer + gtag shim and sets all storage to
          'denied' by default. If the visitor previously consented (bd_consent),
          we replay their choice so returning consenters aren't re-prompted. GTM
          itself is loaded later (lib/gtm.ts) only once analytics is granted — so
          with consent rejected, no request to googletagmanager.com is ever made.
        */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem('bd_consent'));if(c){gtag('consent','update',{ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied',analytics_storage:c.analytics?'granted':'denied'});}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {/* Global Organization schema — referenced by @id from every page */}
        <JsonLd data={organizationSchema()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>

        <Navbar />
        <Breadcrumb />
        <main id="main">{children}</main>
        <Footer />
        <ConsentBanner />
        <CursorEffect />
      </body>
    </html>
  );
}
