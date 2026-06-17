'use client';

import { useRef, useState, type FormEvent } from 'react';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

const PROJECT_TYPES = [
  'Corporate Website',
  'Clinic / Aesthetic Platform',
  'Custom Software',
  'Mobile App',
  'Brand Identity & Design',
  'Digital Marketing',
  'Managed Hosting & Support',
  'Something else',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional phone: digits, spaces, +, -, () — 7–15 digits.
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  // §29.5 — time-based bot check: anything submitted <2s after mount is a bot.
  const mountTime = useRef<number>(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // §29.5 — Honeypot. A real user never fills the hidden "website" field.
    // Silently drop (pretend success, send nothing) so bots don't retry.
    if ((data.get('website') as string)?.trim() || (data.get('botcheck') as string)) {
      setStatus('success');
      form.reset();
      return;
    }

    // §29.5 — Time-based check: too fast to be human → silent drop.
    if (Date.now() - mountTime.current < 2000) {
      setStatus('success');
      form.reset();
      return;
    }

    // Client-side validation (the endpoint also validates server-side).
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const phone = (data.get('phone') as string)?.trim();
    const message = (data.get('message') as string)?.trim();
    const projectType = (data.get('project_type') as string) || '';
    const consent = data.get('consent');

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = 'Please enter your name.';
    if (!email) nextErrors.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (phone && !PHONE_RE.test(phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!projectType) nextErrors.project_type = 'Please choose a project type.';
    if (!message) nextErrors.message = 'Please tell us a little about your project.';
    if (!consent) nextErrors.consent = 'Please agree to be contacted before sending.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    data.append('access_key', siteConfig.forms.web3formsAccessKey);
    data.append('subject', 'New enquiry — baptistdigitek.com');
    data.append('from_name', 'Baptist Digitek Website');

    try {
      const res = await fetch(siteConfig.forms.contactEndpoint, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        track('form_submit', { form_id: 'contact', project_type: projectType });
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="surface rounded-3xl p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-nude-200">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <path d="M7 13.5l4 4L19 8" stroke="#4B2138" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-espresso">Message sent</h3>
        <p className="mt-2 text-sm text-taupe">
          Thank you — we’ll be in touch within one business day. For anything urgent, WhatsApp us.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">
          Send another
        </button>
      </div>
    );
  }

  const inputClass =
    'mt-1.5 w-full rounded-2xl border border-nude-200 bg-white px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:border-espresso focus:outline-none focus:ring-2 focus:ring-espresso/15';
  const errClass = 'mt-1.5 text-xs font-medium text-wine';

  return (
    <form onSubmit={handleSubmit} noValidate className="surface rounded-3xl p-6 sm:p-8">
      {/* §29.5 — Honeypot fields (hidden from humans + assistive tech). */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-espresso">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errClass}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-espresso">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errClass}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-espresso">
            Phone <span className="text-taupe">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass}
            placeholder="+91 ..."
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className={errClass}>
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="project_type" className="text-sm font-medium text-espresso">
            Project type
          </label>
          <select
            id="project_type"
            name="project_type"
            required
            defaultValue=""
            aria-invalid={!!errors.project_type}
            aria-describedby={errors.project_type ? 'project_type-error' : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              Select one…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.project_type && (
            <p id="project_type-error" role="alert" className={errClass}>
              {errors.project_type}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-espresso">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={inputClass}
          placeholder="Tell us about your project, goals or rough idea…"
        />
        {errors.message && (
          <p id="message-error" role="alert" className={errClass}>
            {errors.message}
          </p>
        )}
      </div>

      {/* §29.5 — Consent checkbox (required). */}
      <div className="mt-5">
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-taupe">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 h-4 w-4 accent-espresso"
          />
          <span>
            I agree to be contacted about my enquiry. See our{' '}
            <a href="/privacy" className="font-medium text-espresso underline decoration-nude-400 underline-offset-2">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className={errClass}>
            {errors.consent}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-2xl bg-wine/10 px-4 py-3 text-sm text-wine">
          Something went wrong. Please try again, or WhatsApp us directly.
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
      <p className="mt-3 text-center font-mono text-[11px] text-taupe">
        First conversations are always free · No spam, ever
      </p>
    </form>
  );
}
