/**
 * §29.4 — Consent-gated GTM loader.
 *
 * GTM is NOT loaded on first paint. We set Consent Mode v2 defaults (all denied)
 * inline in <head> with zero network cost, then only inject the GTM container
 * once the visitor grants analytics consent. This satisfies the §29.7 gate:
 * with consent rejected, the Network panel shows zero requests to
 * googletagmanager.com / google-analytics.com.
 */

import { siteConfig } from './site';

let injected = false;

/** Idempotently inject the GTM container script. Safe to call repeatedly. */
export function loadGtm() {
  if (typeof window === 'undefined') return;
  if (injected || document.getElementById('gtm-script')) return;
  injected = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const s = document.createElement('script');
  s.id = 'gtm-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${siteConfig.gtmId}`;
  document.head.appendChild(s);
}
