/**
 * §29.3 / §29.4 — Cookie consent state (PDPA / GDPR / DPDP Act).
 *
 * Decision is persisted in localStorage under `bd_consent`. Applying a decision
 * updates Google Consent Mode v2 signals, pushes a `consent_update` dataLayer
 * event, and — when analytics is granted — loads GTM (lib/gtm.ts).
 */

import { loadGtm } from './gtm';

export type Consent = { analytics: boolean; marketing: boolean; ts: number };

export const CONSENT_KEY = 'bd_consent';

/** Custom DOM event other components can dispatch to reopen the settings drawer. */
export const OPEN_CONSENT_EVENT = 'bd:open-consent';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (typeof c?.analytics === 'boolean' && typeof c?.marketing === 'boolean') return c;
    return null;
  } catch {
    return null;
  }
}

/**
 * Persist and apply a consent decision. Pushes Consent Mode v2 signals via the
 * `gtag` shim defined inline in <head>, falling back to a raw dataLayer push.
 */
export function applyConsent(c: Consent) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    /* storage may be blocked — still honour the decision for this session */
  }

  const update = {
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
    analytics_storage: c.analytics ? 'granted' : 'denied',
  } as const;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', update);
  } else {
    window.dataLayer.push(['consent', 'update', update]);
  }

  window.dataLayer.push({ event: 'consent_update', ...update });

  if (c.analytics) loadGtm();
}
