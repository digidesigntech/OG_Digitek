import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, formatAddress } from '@/lib/site';
import { TrackedLink, TrackedAnchor } from '@/components/analytics/tracked';

const company = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Digi Design', href: '/digi-design' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

export function Footer() {
  const { contact, offices } = siteConfig;
  const hq = offices.chromepet;

  return (
    <footer className="mt-24 border-t border-nude-200/70 bg-espresso text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-3">
          <Link href="/" className="flex items-center" aria-label="Baptist Digitek — home">
            <Image
              src="/logo-trim.png"
              alt="Baptist Digitek Private Limited"
              width={150}
              height={40}
              className="h-9 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-nude-200/80">
            A Chennai-based digital company building websites, software, mobile apps and
            brand experiences for businesses across Tamil Nadu and beyond.
          </p>
          <TrackedLink
            href="/contact"
            event="cta_primary"
            params={{ cta_label: 'Start a Project', page: 'footer' }}
            className="mt-6 inline-flex rounded-full border border-nude-300/40 px-5 py-2.5 text-sm font-medium text-nude-100 transition-colors hover:bg-nude-300 hover:text-espresso"
          >
            Start a Project
          </TrackedLink>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-nude-300/70">
            Exclusively for healthcare, beauty &amp; medical businesses
          </p>
        </div>

        {/* Company */}
        <nav className="md:col-span-2" aria-label="Footer — company">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-nude-300">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {company.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-nude-200/80 transition-colors hover:text-cream">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reach us */}
        <div className="md:col-span-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-nude-300">Reach Us</h2>
          <ul className="mt-5 space-y-3 text-sm text-nude-200/80">
            <li>
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryDial}`}
                event="phone_click"
                params={{ phone: contact.phonePrimaryDial, location: 'footer' }}
                className="transition-colors hover:text-cream"
              >
                {contact.phonePrimary}
              </TrackedAnchor>
            </li>
            <li>
              <TrackedAnchor
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                event="whatsapp_click"
                params={{ location: 'footer' }}
                className="transition-colors hover:text-cream"
              >
                WhatsApp · {contact.whatsappLabel}
              </TrackedAnchor>
            </li>
            <li>
              <a href={`mailto:${contact.emailSales}`} className="transition-colors hover:text-cream">
                {contact.emailSales}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.emailSupport}`} className="transition-colors hover:text-cream">
                {contact.emailSupport}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.emailDesign}`} className="transition-colors hover:text-cream">
                {contact.emailDesign}
              </a>
            </li>
          </ul>
        </div>

        {/* Office */}
        <address className="not-italic md:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-nude-300">Office</h2>
          <p className="mt-5 text-sm leading-relaxed text-nude-200/80">
            <span className="block font-medium text-cream">{hq.label}</span>
            {formatAddress(hq)}
          </p>
        </address>

        {/* Legal */}
        <nav className="md:col-span-2" aria-label="Footer — legal">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-nude-300">Legal</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-nude-200/80 transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-nude-300/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-nude-200/70">
            © 2026 {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-nude-200/70">
            Chennai · Chromepet · Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  );
}
