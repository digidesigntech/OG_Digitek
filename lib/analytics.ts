/**
 * §29.1 — GTM dataLayer wrapper.
 *
 * Single helper used by every CTA. SSR-safe: no-ops on the server and never
 * throws if the dataLayer isn't initialised yet. Events only do anything useful
 * once the user has granted consent and GTM has loaded (see lib/gtm.ts), but
 * pushing to the dataLayer before then is harmless — GTM replays the queue.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function track(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event: eventName, ...params });
}
