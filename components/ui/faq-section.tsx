import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/schema';
import type { Faq } from '@/lib/content';

/**
 * Reusable FAQ accordion. Emits its own FAQPage JSON-LD by default so the block
 * can be dropped onto any page and carry the right schema with it.
 */
export function FaqSection({
  items,
  id = 'faq',
  eyebrow = 'FAQ',
  heading = 'Frequently asked questions',
  withSchema = true,
  className = '',
}: {
  items: Faq[];
  id?: string;
  eyebrow?: string;
  heading?: string;
  withSchema?: boolean;
  className?: string;
}) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby={`${id}-heading`} className={className}>
      {withSchema && <JsonLd data={faqSchema(items.map((f) => ({ q: f.q, a: f.a })))} />}

      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={`${id}-heading`} className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
        {heading}
      </h2>

      <div className="mt-8 space-y-3">
        {items.map((f, i) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-white/40 bg-white/20 px-5 py-5 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-colors duration-300 hover:bg-white/30 open:bg-white/30 open:shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:px-6"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <h3 className="font-display text-lg font-medium text-espresso">{f.q}</h3>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/50 bg-white/30 text-espresso backdrop-blur-sm transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-taupe">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
