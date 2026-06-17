import { Reveal } from '@/components/ui/reveal';

type Stat = { value: string; label: string; sub: string };

const stats: Stat[] = [
  { value: '100+', label: 'Projects shipped', sub: 'from Chromepet since 2018' },
  { value: '6+', label: 'Years in business', sub: 'and still building' },
  { value: '5+', label: 'Year-long relationships', sub: 'clients on their 5th & 6th year' },
  { value: '1', label: 'Accountable team', sub: 'strategy to support, one roof' },
];

export function TrackRecord() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow">Chapter Three · 03 / 03 — The Track Record</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Clients who keep coming back — the clearest signal that the work works.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-taupe">
            Some relationships are now in their fifth and sixth year. Multi-year clients, hundreds
            of sites shipped, one accountable team. That continuity is the metric we are proudest of.
          </p>
        </Reveal>
      </div>

      {/* Desktop — expanding accordion (hover a panel to reveal the figure) */}
      <Reveal className="relative mt-12 hidden gap-2 overflow-hidden rounded-[1.75rem] bg-espresso-dark p-2 lg:flex">
        {/* Plum textured backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/robot-background.jpg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        {stats.map((s) => (
          <div
            key={s.label}
            className="group/panel relative h-[300px] flex-1 overflow-hidden rounded-3xl border border-white/25 bg-espresso/40 backdrop-blur-[2px] transition-all duration-500 ease-out hover:flex-[3.5] hover:border-white/50 hover:bg-espresso/60"
          >
            {/* Collapsed — horizontal label */}
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center px-4 transition-opacity duration-300 group-hover/panel:opacity-0"
            >
              <span className="text-center font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-cream [text-shadow:0_1px_10px_rgba(27,12,26,0.55)]">
                {s.label}
              </span>
            </span>

            {/* Expanded — full figure */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100 group-hover/panel:delay-150">
              <p className="font-display text-6xl font-semibold leading-none text-cream">{s.value}</p>
              <p className="mt-4 font-display text-xl font-medium text-cream">{s.label}</p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-nude-300/80">
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </Reveal>

      {/* Mobile / tablet — stacked cards (no hover) */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {stats.map((s) => (
          <Reveal
            key={s.label}
            className="rounded-3xl border border-nude-200/70 bg-white p-7 shadow-card"
          >
            <p className="font-display text-5xl font-semibold leading-none text-espresso">
              {s.value}
            </p>
            <p className="mt-4 font-display text-lg font-medium text-espresso">{s.label}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-taupe">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
