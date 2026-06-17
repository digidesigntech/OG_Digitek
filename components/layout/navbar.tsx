'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';
import { track } from '@/lib/analytics';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which dropdown is open, keyed by the parent href (null = none). Keyed (not a
  // boolean) so each of the multiple dropdowns opens independently.
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu + any open dropdown on navigation
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // On Digi Design routes, swap the brand mark to the "digi designs" logo.
  const isDigi = pathname.startsWith('/digi-design');
  const logo = isDigi
    ? { src: '/digi-logo.png', alt: 'digi designs — by Baptist Digitek', width: 86, height: 40 }
    : { src: '/logo-trim.png', alt: 'Baptist Digitek Private Limited', width: 150, height: 40 };

  // Overlay mode: at the top of the home page the bar is transparent over the
  // hero video, so links + logo flip to light for contrast. Once scrolled (any
  // page) the solid cream bar returns with the dark palette.
  const overlay = pathname === '/' && !scrolled;
  const navLinkColor = (active: boolean) =>
    overlay
      ? active
        ? 'text-cream'
        : 'text-nude-100/85 hover:text-cream'
      : active
        ? 'text-espresso'
        : 'text-taupe hover:text-espresso';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-nude-200/70 bg-cream/85 backdrop-blur-md'
          : overlay
            ? 'bg-gradient-to-b from-espresso-dark/30 to-transparent'
            : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[4.5rem] items-center justify-between py-3.5" aria-label="Primary">
        <Link href="/" className="group flex items-center" aria-label="Baptist Digitek — home">
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className={`h-9 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-10 ${overlay ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) =>
            'children' in item && item.children ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.href)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu(item.href)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setOpenMenu(null);
                    e.currentTarget.querySelector('a')?.focus();
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.href}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 font-display text-[0.95rem] font-medium transition-colors ${navLinkColor(
                    isActive(item.href)
                  )}`}
                >
                  {item.label}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition-transform ${openMenu === item.href ? 'rotate-180' : ''}`}>
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div
                  className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    openMenu === item.href ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <ul className="surface overflow-hidden p-2 shadow-soft">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                            isActive(child.href)
                              ? 'bg-nude-100 text-espresso'
                              : 'text-taupe hover:bg-nude-50 hover:text-espresso'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 font-display text-[0.95rem] font-medium transition-colors ${navLinkColor(
                    isActive(item.href)
                  )}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            onClick={() => track('cta_primary', { cta_label: 'Start a Project', page: 'navbar' })}
            className="btn-primary text-sm"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`grid h-10 w-10 place-items-center rounded-xl border lg:hidden ${overlay ? 'border-cream/30 text-cream' : 'border-nude-200 text-espresso'}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${mobileOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${mobileOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
        <ul className="container-x flex flex-col gap-1 border-t border-nude-200/70 bg-cream/95 pb-6 pt-3 backdrop-blur">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-2xl px-4 py-3 font-display text-base font-medium ${
                  isActive(item.href) ? 'bg-nude-100 text-espresso' : 'text-taupe'
                }`}
              >
                {item.label}
              </Link>
              {'children' in item && item.children && (
                <ul className="ml-4 border-l border-nude-200 pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="block rounded-xl px-4 py-2.5 text-sm text-taupe">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="mt-3">
            <Link
              href="/contact"
              onClick={() => track('cta_primary', { cta_label: 'Start a Project', page: 'navbar_mobile' })}
              className="btn-primary w-full"
            >
              Start a Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
