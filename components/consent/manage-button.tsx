'use client';

/**
 * §29.6 — Reopens the consent settings drawer from anywhere (e.g. the /cookies
 * page). Dispatches the custom event the ConsentBanner listens for.
 */

import { OPEN_CONSENT_EVENT } from '@/lib/consent';

export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className ?? 'btn-primary'}
    >
      Manage cookie preferences
    </button>
  );
}
