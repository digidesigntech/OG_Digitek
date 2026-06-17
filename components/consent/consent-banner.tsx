'use client';

/**
 * §29.3 / §29.4 / §29.6 — Cookie consent banner.
 *
 * - Non-intrusive bottom-right card (never a full-screen interstitial — Google
 *   penalises those).
 * - Accept all · Reject non-essential · Settings (two toggles: Analytics,
 *   Marketing).
 * - Decision persisted in localStorage (`bd_consent`); doesn't reappear unless
 *   reopened from the footer /cookies link or storage is cleared.
 * - Keyboard-accessible: focus-trapped while open, Esc rejects non-essential.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  applyConsent,
  readConsent,
  OPEN_CONSENT_EVENT,
  type Consent,
} from '@/lib/consent';
import { loadGtm } from '@/lib/gtm';

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  // On mount: if no prior decision, show the banner. If the visitor previously
  // granted analytics, load GTM now (the inline <head> script only restores the
  // consent-mode signals, not the deferred container).
  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setShow(true);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
      if (stored.analytics) loadGtm();
    }
  }, []);

  // Footer /cookies link (and the /cookies page) can reopen the settings drawer.
  useEffect(() => {
    const open = () => {
      const stored = readConsent();
      if (stored) {
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
      }
      setSettings(true);
      setShow(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const decide = useCallback((c: Omit<Consent, 'ts'>) => {
    applyConsent({ ...c, ts: Date.now() });
    setShow(false);
    setSettings(false);
  }, []);

  // Focus trap + Esc handling while the dialog is open.
  useEffect(() => {
    if (!show) return;
    const node = dialogRef.current;
    if (!node) return;

    const focusables = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        decide({ analytics: false, marketing: false });
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [show, settings, decide]);

  if (!show) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={headingId}
      className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-nude-200/70 bg-cream/95 p-6 shadow-soft backdrop-blur-md"
    >
      <h2 id={headingId} className="font-display text-lg font-semibold text-espresso">
        We value your privacy
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-taupe">
        We use essential cookies to run this site and, with your consent, analytics
        cookies to understand how it’s used. See our{' '}
        <a href="/cookies" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">
          Cookie&nbsp;Policy
        </a>
        .
      </p>

      {settings && (
        <div className="mt-4 space-y-3 rounded-2xl border border-nude-200/70 bg-white/60 p-4">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-espresso"
            />
            <span>
              <span className="font-medium text-espresso">Analytics</span>
              <span className="block text-taupe">Helps us measure and improve the site.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-espresso"
            />
            <span>
              <span className="font-medium text-espresso">Marketing</span>
              <span className="block text-taupe">Used to measure campaigns and ads.</span>
            </span>
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {settings ? (
          <button
            type="button"
            onClick={() => decide({ analytics, marketing })}
            className="btn-primary flex-1 text-sm"
          >
            Save preferences
          </button>
        ) : (
          <button
            type="button"
            onClick={() => decide({ analytics: true, marketing: true })}
            className="btn-primary flex-1 text-sm"
          >
            Accept all
          </button>
        )}
        <button
          type="button"
          onClick={() => decide({ analytics: false, marketing: false })}
          className="btn-secondary flex-1 text-sm"
        >
          Reject non-essential
        </button>
        {!settings && (
          <button
            type="button"
            onClick={() => setSettings(true)}
            className="btn-ghost w-full text-sm"
          >
            Settings
          </button>
        )}
      </div>
    </div>
  );
}
