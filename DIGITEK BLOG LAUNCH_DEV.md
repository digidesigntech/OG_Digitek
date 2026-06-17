# Claude Code Prompt — Baptist Digitek Blog Launch (10 posts)

> Apply on top of the existing §14–§16 blog architecture (`/blog` + `/blog/[slug]` + `content/blog/*.mdx` + categories). Implements: **10 MDX posts** (4 launch-published, 6 marked "coming soon"), the **status-aware UI** for blog cards / index page / Home strip / Services strip, and a **stub page** for coming-soon clicks.

---

## 0. Schema additions

Add one new frontmatter field to the existing MDX schema:

```ts
// Add to the post type definition in lib/blog.ts
status: "published" | "coming_soon"
```

Default to `"published"` if missing (backward-compatible).

Add a helper:

```ts
export async function getPublishedPosts(limit?: number) {
  const all = await getAllPosts();
  const published = all
    .filter(p => p.status !== "coming_soon")
    .sort((a, b) => +new Date(b.datePublished) - +new Date(a.datePublished));
  return limit ? published.slice(0, limit) : published;
}

export async function getPublishedByCategory(category: string, limit = 3) {
  const all = await getPublishedPosts();
  return all.filter(p => p.category === category).slice(0, limit);
}
```

---

## 1. The 10 MDX files

Create all 10 under `content/blog/`. Filenames match slugs.

---

### 📄 File 1 of 10 — `content/blog/clinic-website-design-india.mdx`

```mdx
---
title: "How to Build a Clinic Website That Actually Converts Patients"
slug: "clinic-website-design-india"
description: "Clinic website design India guide: trust signals, booking flows, and mobile-first pages that turn searches into appointments."
primaryKeyword: "clinic website design India"
secondaryKeywords: ["aesthetic clinic website", "healthcare web design", "patient booking flow", "mobile-first clinic site"]
category: "Clinic Marketing"
author: "angelin-celena"
datePublished: "2026-04-12"
dateModified: "2026-04-12"
ogImage: "/blog/hero/clinic-website-design-india.jpg"
readingTime: "8 min"
status: "published"
faqs:
  - question: "How long does it take to build a clinic website that converts well?"
    answer: "A clinic platform with a real booking flow, treatment-specific pages and content built for SEO usually takes 6–10 weeks from kickoff to launch. A faster build (3–4 weeks) is possible if you trade treatment-specific pages for a single services page, but conversion drops."
  - question: "Is a WordPress template enough for a small clinic?"
    answer: "For a starter clinic, yes — provided the template is mobile-first, the booking flow is real (not just a contact form) and the page loads in under three seconds. Most off-the-shelf clinic templates fail at least one of those, which is why they convert poorly."
  - question: "Should I show pricing on a clinic website?"
    answer: "Show a range — 'from ₹X' or '₹X–₹Y'. Hiding price entirely sends patients to a competitor who shows one. Showing the exact rupee figure can over-anchor the patient against in-clinic consultation outcomes. A range respects both sides."
  - question: "What's the most underrated trust signal?"
    answer: "A practitioner name + credential beside each photo on the team page, linked to a brief professional bio. Patients search the practitioner name on Google before they call."
speakable:
  intro: "Most clinic websites in India look modern and convert poorly. The fix is rarely a redesign — it's a sharper read of how a patient actually arrives, decides and books."
  takeaway: "Treatment menu above the fold, real booking flow, visible trust signals, mobile-first sticky CTAs, and load under three seconds. That's the short list."
---

<p className="lead">Most clinic websites in India look modern and convert poorly. The fix is rarely a redesign — it's a sharper read of how a patient actually arrives, decides and books.</p>

<div data-speakable="intro">

If you run an aesthetic, dermatology or cosmetology clinic in India, your website is doing one of two things right now: bringing in a steady stream of qualified bookings, or quietly losing them. There isn't much middle ground. The patient who lands on your homepage decides quickly whether your clinic is trustworthy, current and easy to engage. Most clinic sites lose them inside that window — not because the design is bad, but because the design is solving the wrong problem.

</div>

## Why most clinic websites convert poorly

The default clinic website is built like a brochure: a hero image, a paragraph about the founder, a list of services, a contact form at the bottom. That template was fine in 2014. In 2026, a patient searching for a procedure has often already read multiple blog posts, watched before/after content, and compared a handful of clinics within the hour. By the time they reach your site, they're not looking for an introduction — they're looking for a reason to *not* book.

A converting clinic site removes those reasons. It treats every section of the homepage as a possible exit point and asks: what does this patient need to see *here* to stay one more scroll?

## The five elements every converting clinic site has

### 1. A clear, named treatment menu — above the fold

The single biggest mistake we see in clinic websites is hiding the actual treatments behind a generic "Services" link. The visitor came searching for a specific concern (acne scarring, melasma, fillers, laser hair removal). If they can't see that exact term inside the first scroll, they bounce. A converting clinic homepage shows a six-to-eight tile treatment menu immediately under the hero — each tile linking to a dedicated treatment page with photos, pricing range, downtime and FAQs.

### 2. A real booking flow, not a contact form

A "Send us a message" form is a low-conversion path. A real booking flow — date picker, treatment selection, optional concern dropdown, confirmation by WhatsApp — converts at several multiples of that rate, based on industry benchmarks tracked by [HubSpot](https://blog.hubspot.com) and others. The flow doesn't need to be complex; it needs to feel like the clinic is already prepared to receive the appointment.

### 3. Trust signals patients actually look for

Three trust signals carry the most weight in the Indian aesthetic market right now:

- **Practitioner credentials with names and photos** — patients Google the doctor before they call.
- **Real, named before/after gallery** with consent.
- **Google reviews surfaced on the page**, not just a link buried in the footer.

Hidden behind "About Us" is hidden in plain sight.

### 4. Mobile-first, properly

The majority of clinic enquiries in 2026 arrive from mobile. Mobile-first doesn't mean "the desktop site, smaller." It means the booking CTA is always visible — a sticky bottom-bar on the phone — and the WhatsApp number is one tap away from every page.

### 5. Page speed under three seconds

Beautiful clinic sites are routinely four-megabyte affairs that load in nine seconds on 4G. [Google's Core Web Vitals research](https://web.dev/articles/lcp) consistently shows bounce rates climbing sharply between one and three seconds of load time. Compress your imagery, defer heavy scripts, and ship the hero first. The most beautiful site that doesn't load is invisible.

<div data-speakable="takeaway">

**Key Takeaways**

- Move the treatment menu above the fold — patients arrive with specific terms in mind.
- Replace the contact form with a real booking flow — substantially higher conversion.
- Trust signals belong on the homepage, not buried in About Us.
- Mobile-first means a sticky CTA + one-tap WhatsApp, not just a responsive layout.
- Load in under three seconds or the rest doesn't matter.

</div>

## Frequently asked questions

*(Rendered by the standard FAQ accordion component from frontmatter.)*

## References

1. [Web.dev — Largest Contentful Paint](https://web.dev/articles/lcp)
2. [Think with Google — patient digital decision research](https://www.thinkwithgoogle.com)
3. [HubSpot Marketing — online booking conversion benchmarks](https://blog.hubspot.com)

## Want this on your own clinic site?

Digi Design — our in-house design service — has already shipped clinic, doctor and salon brand work across Tamil Nadu. [Browse the portfolio](/digi-design/portfolio) or have a first conversation. Both free.
```

---

### 📄 File 2 of 10 — `content/blog/baptist-healthcare-digital-first.mdx`

```mdx
---
title: "Why Beauty Brands That Distribute Products Are Building Digital First — Lessons from Baptist Healthcare"
slug: "baptist-healthcare-digital-first"
description: "How India's beauty distributors are pivoting from catalogue-first to digital-first — drawn from Baptist Healthcare's industry experience."
primaryKeyword: "beauty product distribution digital transformation India"
secondaryKeywords: ["digital strategy for beauty brands", "India beauty industry trends 2026", "B2B beauty digital", "beauty distributor website"]
category: "Beauty Branding"
author: "angelin-celena"
datePublished: "2026-04-28"
dateModified: "2026-04-28"
ogImage: "/blog/hero/baptist-healthcare-digital-first.jpg"
readingTime: "7 min"
status: "published"
faqs:
  - question: "Why are beauty distributors moving away from catalogues?"
    answer: "Two reasons. First, retail buyers and clinic owners increasingly research online before placing wholesale orders — they want SKU-level information, certifications and stock status on demand. Second, distributors that stay catalogue-only lose share to ones that surface their range in search results and on AI engines."
  - question: "Does this matter for a clinic that doesn't sell products?"
    answer: "Yes — clinics buy from distributors. The distributor's digital footprint shapes which products end up on the clinic's shelf. Indirectly, it shapes which brands the clinic ends up recommending to patients."
  - question: "What does 'digital first' actually mean for a beauty brand?"
    answer: "It means the website, the search presence, the AI-engine visibility and the brand's voice on Reddit/Quora are treated as the *primary* sales surface — not a brochure that supplements a sales team. Distributors going digital-first redirect budget from print catalogues to content, schema, search and direct B2B portals."
  - question: "Is this happening fast enough to matter for clinics right now?"
    answer: "Yes — the shift is already several years in. Clinics that align their website experience with the new digital-first distributor ecosystem (clean treatment pages, branded product showcases, real reviews) are pulling ahead. Clinics that don't are slowly losing visibility in the same search results."
speakable:
  intro: "India's beauty distribution industry is in the middle of a quiet pivot. The catalogue is becoming the lookup, the website is becoming the warehouse, and the brands that adapt fastest are pulling ahead."
  takeaway: "Beauty brands and clinics that align their digital presence — clean product information, real search visibility, and AI-friendly content — pull ahead of the ones still relying on catalogues and word-of-mouth."
---

<p className="lead">India's beauty distribution industry is in the middle of a quiet pivot. The catalogue is becoming the lookup, the website is becoming the warehouse, and the brands that adapt fastest are pulling ahead.</p>

<div data-speakable="intro">

For decades, beauty product distribution in India ran on relationships, printed catalogues and the sales rep's monthly visit. That model still works — but it is no longer where the next decade of growth is being decided. A new pattern is forming: distributors and brands that publish their range online with structured data, real product information and clear digital presence are becoming the first ones a clinic owner remembers when she opens her laptop to place the next order. The catalogue still arrives. It just no longer makes the decision.

</div>

This piece is drawn from what we've seen across [Baptist Healthcare](https://baptisthealthcare.in)'s years in beauty product distribution — the parent company that shapes how Baptist Digitek thinks about digital for the beauty industry.

## The shift in plain terms

Three things are changing simultaneously:

- **Buyers research before they call.** Clinic owners, retail buyers and salon owners now Google products, brands and treatment-grade certifications before they pick up the phone to a distributor. If the product isn't findable, it loses against the one that is.
- **AI engines are the new shortlist makers.** When a clinic owner asks ChatGPT or Perplexity *"what skincare brands distribute clinical-grade products in Tamil Nadu?"*, the answer comes from sources the AI engines can read. Brands without crawlable, well-structured digital presence don't get mentioned.
- **B2B portals are replacing fax-and-phone.** Distributors that ship a clean B2B portal — login, browse, order, repeat — see retention spike. Distributors that still rely on quarterly catalogues are losing the smaller, faster clinics first.

## What distributors are doing differently

The brands moving early are doing three things consistently:

### 1. Treating their website as the primary catalogue

Not a brochure. The website is where every SKU lives — full description, ingredient list, certifications, pack sizes, intended use, and (where relevant) a "request quote" or wholesale-pricing flow. This becomes the single source of truth that every other surface (catalogue, sales pitch, retailer marketing) points back to.

### 2. Investing in content that ranks

Treatment guides, ingredient explainers, "what to look for when sourcing X" articles. These rank for the questions clinic owners and beauty professionals search. Each article quietly pulls qualified buyers into the brand's funnel — without a single ad spend.

### 3. Making products discoverable to AI engines

Through structured schema (`Product`, `Brand`, `Organization` with proper `sameAs`), through Wikidata entries, and through consistent NAP across listings. When AI engines build their answer to a beauty product question, brands with this scaffolding get cited; brands without it stay invisible.

## What this means for clinics

If you run a clinic, this shift affects you whether or not you sell products yourself:

- The distributors you buy from are increasingly investing in clean product pages — meaning you can lift better imagery, copy and certifications onto your own site for the products you stock.
- Your own digital presence has to match the standard your distributors set. A clinic with a polished website pulls professional-grade brand partnerships more easily than one with a 2018 template.
- The brands clinics recommend to patients are increasingly chosen on digital discoverability, not just margin. Patients Google products their dermatologist mentions; if the brand can't be found, the recommendation softens.

<div data-speakable="takeaway">

**Key Takeaways**

- The catalogue era of Indian beauty distribution is ending; the digital-first era is several years in.
- Distributors winning are the ones treating websites as primary catalogues, ranking content, and making themselves AI-engine-discoverable.
- Clinics benefit when their digital presence aligns with the distributor brands they stock — the two reinforce each other.
- The brand whose presence ranks and gets cited is the brand the clinic recommends — and the patient remembers.

</div>

## Frequently asked questions

*(Rendered by the standard FAQ accordion component from frontmatter.)*

## References

1. [Baptist Healthcare — parent company](https://baptisthealthcare.in)
2. Industry coverage of India's beauty distribution shift in 2025–26 — [Economic Times Retail](https://retail.economictimes.indiatimes.com)
3. [Statista — India personal care market trends](https://www.statista.com)

## Want a digital presence that holds up to this shift?

Digi Design — our in-house design service — already builds for beauty brands, distributors and clinics. [Browse the portfolio](/digi-design/portfolio) or have a first call. Both free.
```

---

### 📄 File 3 of 10 — `content/blog/skincare-routine-ordering.mdx`

```mdx
---
title: "Skincare Routine Ordering: What Every Aesthetic Clinic Should Educate Patients About"
slug: "skincare-routine-ordering"
description: "The right order — cleanse, treat, moisturise, protect — and why educating patients reduces no-shows and product returns."
primaryKeyword: "skincare routine order"
secondaryKeywords: ["aesthetic clinic patient education", "layering skincare products", "retinol vs aha", "post-procedure skincare", "clinic website patient guide"]
category: "Cosmetology"
author: "angelin-celena"
datePublished: "2026-05-19"
dateModified: "2026-05-19"
ogImage: "/blog/hero/skincare-routine-ordering.jpg"
readingTime: "6 min"
status: "published"
faqs:
  - question: "Should patients use the same routine year-round?"
    answer: "No. In India, summer routines should lean toward lighter textures and a higher-SPF sunscreen, while winter routines need richer moisturisers. Clinics should run a brief seasonal review with regular patients every quarter."
  - question: "How do we explain routine order to elderly or first-time patients?"
    answer: "Numbered cards work best — visual, sequential, non-clinical language. Photos of each product step are even better. Avoid jargon like 'occlusive' or 'humectant' on patient-facing material."
  - question: "What's the single most impactful product order change to teach?"
    answer: "'Sunscreen always last in the daytime.' If the patient internalises only one rule, that's the one that protects results across every other product they use."
  - question: "Can the clinic website really help with this kind of education?"
    answer: "Yes — and it ranks well, because most aesthetic clinic sites in India don't bother. A clear routine-order page positions your clinic as the educated voice on the topic, attracts informational search traffic, and quietly converts those readers when they're ready to book a consultation."
speakable:
  intro: "A patient who layers retinol over their moisturiser, or applies sunscreen under their treatment serum, is undoing your clinic's work between visits. Order matters. Most clinics don't teach it — and the gap costs everyone results."
  takeaway: "Thinnest to thickest, sunscreen last in the daytime, actives at night, retinol and AHAs on alternate nights. The simpler the patient education, the better the outcome."
---

<p className="lead">A patient who layers retinol over their moisturiser, or applies sunscreen under their treatment serum, is undoing your clinic's work between visits. Order matters. Most clinics don't teach it — and the gap costs everyone results.</p>

<div data-speakable="intro">

At any aesthetic, dermatology or cosmetology clinic in India, the most expensive product on the shelf can't outperform a misordered home routine. A patient walks out after a chemical peel with three products and detailed instructions, and a week later applies them in whatever order feels intuitive — which is almost never the right one. The result: muted in-clinic outcomes, patient frustration, and sometimes return visits where the issue isn't the treatment but the home regimen working against it.

Patient education on routine ordering isn't a luxury. It's a clinical extension of the service. And the clinics that turn it into a documented, visible part of their offering — both in-clinic and on their website — quietly outperform clinics that don't.

</div>

## The standard order, in five steps

For a typical morning routine, dermatology guidance from bodies like the [American Academy of Dermatology](https://www.aad.org/) and the [Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)](https://www.iadvl.org/) broadly converges on the following sequence:

1. **Cleanser** — gentle, pH-balanced, removes overnight oil and pollutants.
2. **Toner or essence** — optional; preps the skin for absorption.
3. **Treatment serum** — vitamin C in the morning, retinol/AHAs at night. Thinnest first, thickest last.
4. **Moisturiser** — locks in the active layer.
5. **Sunscreen (mornings only)** — broad-spectrum, SPF 30+. Always the final daytime step.

Night routines drop the sunscreen and may add a richer night cream. Photosensitive actives — **retinol and AHAs (like glycolic acid)** — belong in the evening, not the morning, to reduce sun sensitivity. **Niacinamide** is flexible and works either morning or night.

## Three mistakes patients make consistently

### 1. Applying sunscreen *before* moisturiser

The most common error in Indian climates — patients reach for the lightest-feeling product first. But sunscreen should be the final daytime layer, applied two finger-lengths' worth, evenly across the face and neck. Otherwise it sits between active ingredients and the skin, partially blocking absorption and not providing full UV protection.

### 2. Combining retinol and AHAs in the same routine

Retinol and alpha-hydroxy acids are both effective alone but, layered together, frequently cause redness, peeling and barrier compromise. The standard practice: alternate them on different nights (e.g., retinol Monday and Thursday, AHA Tuesday and Friday), and never on the night before a clinical treatment.

### 3. Treating sunscreen as optional after a treatment

Following chemical peels, microneedling, laser sessions or any active in-clinic treatment, the skin is more vulnerable to pigmentation. Daily SPF 50+ broad-spectrum sunscreen is non-negotiable for the post-treatment window — patient surveys consistently show compliance drops sharply within weeks if the clinic doesn't reinforce it.

## How your clinic should teach this — including online

The most effective clinics treat patient education as a service deliverable, not an afterthought. Three patterns that work in 2026:

### A printed routine card, personalised at checkout

A small, branded card listing the patient's specific products in the correct order, with morning/night markers. Takes two minutes to fill in. Reduces follow-up confusion calls noticeably per clinic feedback we've seen.

### A WhatsApp-delivered routine PDF

Same content, digital. Patients screenshot, share with family, refer back to. Carries the clinic name and treatment name — quiet brand presence in the patient's daily life.

### A clinic website page that mirrors the in-clinic guidance

This is where most clinics miss a win. A clear page on the clinic website — *"Building your at-home routine"* — ranks for the exact searches your prospective patients make, and reassures existing patients before they call. The page should mirror the in-clinic guidance exactly so the messaging is consistent.

<div data-speakable="takeaway">

**Key Takeaways**

- Order rule of thumb: thinnest to thickest, sunscreen last in the daytime, actives at night.
- Retinol and AHAs alternate nights — never combined.
- Niacinamide is flexible — works morning or night.
- Sunscreen post-procedure is daily and non-negotiable for at least two weeks.
- Personalised routine cards + digital PDFs reduce confusion and reinforce results.
- A dedicated patient-education page on the clinic website ranks for real searches and lifts trust.

</div>

## Frequently asked questions

*(Rendered by the standard FAQ accordion component from frontmatter.)*

## References

1. [American Academy of Dermatology — skincare basics](https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-tips)
2. [Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)](https://www.iadvl.org/)
3. [Indian Journal of Dermatology, Venereology and Leprology](https://ijdvl.com)
4. [National Library of Medicine — topical retinoid + AHA safety guidance](https://www.ncbi.nlm.nih.gov)

## Want this on your own clinic website?

Digi Design — our in-house design service — already builds patient-education pages and treatment flows for dermatology, aesthetic and cosmetology clinics across Tamil Nadu. [Browse the portfolio](/digi-design/portfolio) or have a first call. Both free.
```

---

### 📄 File 4 of 10 — `content/blog/aesthetic-clinic-website-cost-india.mdx`

```mdx
---
title: "Aesthetic Clinic Website Cost in India: What to Budget in 2026"
slug: "aesthetic-clinic-website-cost-india"
description: "Aesthetic clinic website cost in India ranges from ₹25,000 to ₹3,50,000+. Learn what drives pricing and what you can safely skip."
primaryKeyword: "aesthetic clinic website cost India"
secondaryKeywords: ["dermatology website pricing", "clinic website budget", "healthcare web design cost", "clinic platform pricing 2026"]
category: "Clinic Marketing"
author: "angelin-celena"
datePublished: "2026-06-02"
dateModified: "2026-06-02"
ogImage: "/blog/hero/aesthetic-clinic-website-cost-india.jpg"
readingTime: "9 min"
status: "published"
faqs:
  - question: "What's the cheapest realistic clinic website that still converts?"
    answer: "Around ₹40,000–₹60,000 for a 5–7 page template-based site with a real booking flow, decent imagery, mobile-first design and basic SEO. Below ₹40,000 you're usually getting a static brochure that won't move the needle on appointments."
  - question: "What pushes a clinic website over ₹1.5 lakh?"
    answer: "Custom design (versus template), 15+ pages, individual treatment pages with their own SEO content, a proper booking system with payment integration, professional photography or video, brand identity work, and ongoing maintenance retainers. Each of those adds ₹20k–₹60k."
  - question: "Should I pay for monthly maintenance?"
    answer: "Yes — but know what you're paying for. A real maintenance contract covers hosting, SSL renewals, plugin/dependency updates, security patches, daily backups, content edits up to a set limit, and uptime monitoring. ₹3,000–₹8,000 a month is the typical Indian range for a clinic site. Anything cheaper usually doesn't include backups or security."
  - question: "Is it worth paying extra for a custom-coded site over WordPress?"
    answer: "For most clinics, a well-built WordPress or modern-framework site (Next.js, Astro) is fine and ranks well. Custom-coded becomes worth it if the clinic plans to grow into a multi-location group, a teledermatology platform, or any custom workflow the off-the-shelf tools can't handle. Otherwise it's overspending."
  - question: "How much should I budget for ongoing content?"
    answer: "If you want the site to keep ranking and attracting new patients, plan ₹5,000–₹15,000 per month for content — that covers 2–4 blog posts a month, ongoing FAQ updates, and seasonal landing pages. Most clinic-website budgets underspend here, which is why their sites plateau."
speakable:
  intro: "Aesthetic clinic websites in India range from ₹25,000 to ₹3,50,000-plus. The spread isn't random — it tracks five things that quietly drive cost up. Here's how to think about budgeting cleanly."
  takeaway: "Three usable budget tiers: ₹40–60k starter, ₹75k–1.5L professional, ₹2–3.5L+ premium. The smartest budget allocates ~70% to the build and ~30% reserved for the first year of content, hosting and small tweaks."
---

<p className="lead">Aesthetic clinic websites in India range from ₹25,000 to ₹3,50,000-plus. The spread isn't random — it tracks five things that quietly drive cost up. Here's how to think about budgeting cleanly.</p>

<div data-speakable="intro">

Pricing for clinic websites in India is, frankly, opaque. The same brief sent to five different vendors can come back with quotes spanning a 10x range. Some of that gap reflects real differences in what's being built. A lot of it reflects vendors guessing what the clinic will pay. This piece breaks the price tiers down honestly, shows what drives the cost in each, and flags where you can safely skip without hurting conversion.

</div>

## The three honest tiers

### Tier 1 — Starter: ₹25,000–₹60,000

What you get: a 5–7 page template-based site, mobile-responsive, basic SEO (titles, meta, sitemap), a contact form or simple booking widget, brand colours applied, royalty-free imagery.

What you don't get: custom design, individual treatment pages with depth, real booking flow with calendar + WhatsApp confirmation, ongoing content, anything beyond the structural minimum.

Best for: a brand-new clinic that needs to exist online quickly while it builds the rest of the practice. **A starter site is not a long-term solution** — most clinics outgrow it within 12 months and rebuild.

### Tier 2 — Professional: ₹75,000–₹1,50,000

What you get: a more carefully designed site (custom-themed if not fully custom), 10–15 pages, individual treatment pages with their own SEO content, a real booking flow with date picker + WhatsApp confirmation, structured data (LocalBusiness schema, treatment schema), 3–5 FAQ blocks, decent photography (either custom shoot or curated stock), brand identity refresh if needed.

This is **the right tier for most established Indian clinics in 2026** — it ranks, it converts, it doesn't need rebuilding for 3–4 years.

### Tier 3 — Premium: ₹2,00,000–₹3,50,000+

What you get: full custom design, 20+ pages, full treatment library with before/after galleries, a proper booking system with payment integration, custom photography or video shoot, brand identity work (logo, palette, voice), content depth (blog, patient resources, glossary), advanced SEO with AEO/AIEO setup, integrations (CRM, EMR, payment gateway), and the first 6 months of content production rolled in.

Best for: multi-location clinic groups, teledermatology platforms, or clinics that want to dominate local search for the next 5 years. **The investment pays back in 18–24 months** if booking volumes are at typical clinic-group scale.

## What quietly drives the price up

Five factors push a clinic website cost from one tier into the next:

### 1. Custom design vs template

A custom-designed site takes 3–5 weeks of designer time. A template implementation takes 4–6 days. The delta is roughly ₹40,000–₹80,000.

### 2. Number of treatment pages with individual SEO content

A page about "Microneedling at [clinic name]" — with photos, pricing, downtime, FAQs — costs ₹3,000–₹8,000 to produce well. Multiply across 8–15 treatments and that's ₹40k–₹120k just in treatment-page content.

### 3. Real booking system

A contact form is free. A real booking flow with calendar UX, WhatsApp confirmation, optional payment, and the clinic-side dashboard runs ₹25k–₹60k for build + first-year platform fees.

### 4. Custom photography or video

Stock imagery is free. A half-day shoot of the clinic, the team and a couple of treatments adds ₹20k–₹50k but lifts trust signals enormously.

### 5. Brand identity work

If the clinic doesn't have a clean logo, palette, voice and typography system, the website project either inherits an inconsistent identity (and looks dated within a year) or includes a small brand identity refresh as part of scope. Add ₹30k–₹80k for the latter.

## What you can safely skip if budget is tight

Three commonly oversold things you can defer to a Phase 2:

- **Custom photography of the founder/team** — start with one good headshot per person and high-quality stock for treatment scenes. Plan a real shoot in Year 2 once revenue justifies it.
- **A blog at launch** — better to launch with a strong 6-page core site + 2–3 cornerstone blog posts than to launch with a sprawling 25-page site full of half-written content. Add blog volume in Phase 2.
- **Multi-language toggle** — unless the clinic genuinely serves a non-English-first patient base, defer. Most aesthetic-clinic audiences in urban India research in English even if they consult in Tamil/Hindi.

## Hidden costs to plan for

What clinic budgets routinely miss:

- **Hosting** — ₹500–₹3,000 per month depending on platform.
- **SSL certificate** — usually bundled with hosting, but verify.
- **Domain renewal** — ₹800–₹1,500 a year.
- **Maintenance retainer** — ₹3,000–₹8,000 a month for security, backups, small edits.
- **Content updates** — if you want to keep ranking, ₹5,000–₹15,000 a month for ongoing blog and seasonal content.
- **Ad creative for Meta/Google ads** — separate budget if running paid acquisition.

A clinic budgeting only the build cost and treating the rest as optional is the clinic whose site has gone stale by Year 2.

<div data-speakable="takeaway">

**Key Takeaways**

- Three usable tiers: Starter ₹25–60k, Professional ₹75k–1.5L, Premium ₹2–3.5L+.
- Custom design, individual treatment pages, real booking systems, photography and brand work each push the budget up by ₹20k–₹80k.
- Most established Indian clinics in 2026 should be at the Professional tier — it converts and lasts 3–4 years without rebuild.
- Allocate ~70% to the build and ~30% reserved for Year 1 content, hosting and tweaks.
- Hidden recurring costs (hosting, maintenance, content) are where clinic budgets routinely fall short.

</div>

## Frequently asked questions

*(Rendered by the standard FAQ accordion component from frontmatter.)*

## References

1. [Statista — India digital services pricing benchmarks](https://www.statista.com)
2. [Think with Google — India SMB digital benchmark research](https://www.thinkwithgoogle.com)
3. Industry pricing observations across Tamil Nadu clinic sites, 2024–26.

## Want a clinic website that doesn't need rebuilding in 18 months?

Digi Design — our in-house design service — has shipped clinic, dermatology and salon sites across all three tiers. [Browse the portfolio](/digi-design/portfolio) or have a first conversation. Both free.
```

---

### 📄 Files 5–10 of 10 — Coming-Soon Stubs

Create these six MDX files with the frontmatter exactly as below. **Body content is one paragraph each** — they're not yet published.

#### File 5 — `content/blog/microneedling-101-patient-guide.mdx`

```mdx
---
title: "Microneedling 101: A Clear Patient Communication Guide for Clinics"
slug: "microneedling-101-patient-guide"
description: "A practical communication script — what to tell patients before, during and after a microneedling session — and how clinic websites can pre-answer it."
primaryKeyword: "microneedling patient communication"
secondaryKeywords: ["microneedling patient education", "clinic communication script", "aesthetic treatment FAQ"]
category: "Dermatology Tech"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "7 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

#### File 6 — `content/blog/freelance-vs-agency-clinics.mdx`

```mdx
---
title: "Freelance Web Designer vs Agency for Clinics: Which One Won't Cost You Later"
slug: "freelance-vs-agency-clinics"
description: "Cheap freelancers are tempting. Here's where they save clinics money and where they quietly cost two years later."
primaryKeyword: "freelance vs agency clinic website"
secondaryKeywords: ["clinic website hire", "web designer cost India", "agency vs freelancer healthcare"]
category: "Digital Strategy"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "7 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

#### File 7 — `content/blog/dermatology-concerns-india-2026.mdx`

```mdx
---
title: "Top 7 Dermatology Concerns Indian Patients Search For in 2026"
slug: "dermatology-concerns-india-2026"
description: "Pigmentation, acne, hair fall, sensitive skin — the seven dominant Indian search themes and what clinic content should address."
primaryKeyword: "dermatology concerns India 2026"
secondaryKeywords: ["Indian patient skincare search", "dermatology trends India", "clinic content strategy"]
category: "Dermatology Tech"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "8 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

#### File 8 — `content/blog/dermatology-booking-system.mdx`

```mdx
---
title: "Best Online Booking System for Dermatology Clinics"
slug: "dermatology-booking-system"
description: "Booking system for dermatology clinics: a complete guide to features, build-vs-buy, pricing, and what works in India."
primaryKeyword: "booking system for dermatology clinics"
secondaryKeywords: ["clinic appointment software India", "online booking platform dermatology"]
category: "Dermatology Tech"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "7 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

#### File 9 — `content/blog/ai-generated-clinic-websites.mdx`

```mdx
---
title: "AI-Generated Clinic Websites: Why Cheap Templates Are Hurting Aesthetic Brands"
slug: "ai-generated-clinic-websites"
description: "AI-built sites look fine for a week. Here's what happens to bookings, SEO and trust over the following six months."
primaryKeyword: "AI-generated clinic website"
secondaryKeywords: ["AI website builder clinic", "cheap website templates aesthetic"]
category: "Digital Strategy"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "8 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

#### File 10 — `content/blog/aesthetic-clinic-setup-checklist-india.mdx`

```mdx
---
title: "Setting Up an Aesthetic Clinic in India: The 2026 Digital + Regulatory Checklist"
slug: "aesthetic-clinic-setup-checklist-india"
description: "Licences, registrations, infection-control norms — plus the digital footprint every new aesthetic clinic should establish on day one."
primaryKeyword: "aesthetic clinic setup India"
secondaryKeywords: ["dermatology clinic registration India", "clinic launch checklist", "new aesthetic clinic 2026"]
category: "Clinic Marketing"
author: "angelin-celena"
datePublished: null
dateModified: null
ogImage: "/blog/hero/coming-soon.jpg"
readingTime: "10 min"
status: "coming_soon"
faqs: []
speakable: { intro: "", takeaway: "" }
---

This article is being written and will be published shortly. In the meantime, see our [other insights for clinics & brands](/blog) or [talk to us](/contact) about your project.
```

---

## 2. UI changes

### 2.1 Blog index page (`/blog`)

Show **all 10 cards** (no filtering by status). Apply different visuals based on `status`:

- **`published` cards** — unchanged. Full opacity, "Read article →" link active, links to `/blog/[slug]`.
- **`coming_soon` cards**:
  - Card opacity: **60–70%** (`opacity-60` Tailwind utility or similar).
  - "Read article →" replaced with a non-link **"Coming soon"** badge.
  - Reading-time meta hidden (since the article isn't out).
  - Card not clickable (no `<Link>` wrapper). Optional: hover state shows a small tooltip "Article in production."

### 2.2 Blog post route (`/blog/[slug]`) — coming-soon handling

If `getPostBySlug(slug).status === "coming_soon"`, render a small stub page instead of the full post template:

- Same breadcrumb (Home › Blog › [Category] › [Title])
- H1 = post title
- Single paragraph: *"This article is being written and will be published shortly."*
- Two CTAs: *Browse other insights* (`/blog`) and *Talk to us* (`/contact`)
- Set `metadata.robots = { index: false, follow: true }` on these stub pages — we don't want them indexed yet.

### 2.3 Home page strip ("Insights for clinics & brands")

Currently shows the latest 3 blog cards. Update the data source:

```tsx
// Replace getAllPosts().slice(0,3) with:
const latestPosts = await getPublishedPosts(3);
```

Only published posts ever appear here. As new posts publish (status flipped from `coming_soon` to `published` and `datePublished` set), they rotate in automatically — oldest drops off.

### 2.4 Services page strip ("From the blog")

Same idea, with category filtering. On each service section, pass the relevant blog category:

```tsx
// Example for the Clinic Platforms service section
const relevantPosts = await getPublishedByCategory("Clinic Marketing", 3);

// Fallback if fewer than 3 in category
if (relevantPosts.length < 3) {
  const padding = await getPublishedPosts();
  const padded = [
    ...relevantPosts,
    ...padding.filter(p => !relevantPosts.find(r => r.slug === p.slug))
  ].slice(0, 3);
}
```

Map service → relevant category:
- Corporate Websites → "Clinic Marketing"
- Clinic & Aesthetic Healthcare Platforms → "Clinic Marketing"
- Custom Software → "Digital Strategy"
- Mobile Apps → "Digital Strategy"
- Brand Identity → "Beauty Branding"
- Digital Marketing → "Healthcare SEO"
- Managed Hosting & Support → "Digital Strategy"

### 2.5 Sitemap

`app/sitemap.ts` — currently includes all posts. **Exclude `coming_soon` posts** from sitemap; they're not indexed:

```ts
const publishedPosts = await getPublishedPosts();
// ...use publishedPosts in the sitemap return
```

---

## 3. Hero images

The 4 launch posts reference these image paths in frontmatter:

```
public/blog/hero/clinic-website-design-india.jpg
public/blog/hero/baptist-healthcare-digital-first.jpg
public/blog/hero/skincare-routine-ordering.jpg
public/blog/hero/aesthetic-clinic-website-cost-india.jpg
```

Plus one shared placeholder for coming-soon posts:

```
public/blog/hero/coming-soon.jpg
```

### Source images (Unsplash — free for commercial use, no attribution required)

| Slug | Unsplash URL |
|---|---|
| `clinic-website-design-india` | https://unsplash.com/photos/9xc2zCc3C8U |
| `baptist-healthcare-digital-first` | https://unsplash.com/photos/tvLvkRMNl70 |
| `skincare-routine-ordering` | https://unsplash.com/photos/BCozEYDNmOQ |
| `aesthetic-clinic-website-cost-india` | https://unsplash.com/photos/Mg2vrrgtWiw |

### Download script (PowerShell)

Run this from any PowerShell terminal — edit the `$dest` path to match your repo:

```powershell
$dest = "D:\Digitek\Digitek\public\blog\hero"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$images = @(
    @{slug = "9xc2zCc3C8U"; file = "clinic-website-design-india.jpg"},
    @{slug = "tvLvkRMNl70"; file = "baptist-healthcare-digital-first.jpg"},
    @{slug = "BCozEYDNmOQ"; file = "skincare-routine-ordering.jpg"},
    @{slug = "Mg2vrrgtWiw"; file = "aesthetic-clinic-website-cost-india.jpg"}
)

foreach ($img in $images) {
    $url = "https://unsplash.com/photos/$($img.slug)/download?force=true&w=2400"
    $out = Join-Path $dest $img.file
    Write-Host "Downloading $($img.file)..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing `
            -MaximumRedirection 5 -UserAgent "Mozilla/5.0"
        $size = [math]::Round((Get-Item $out).Length / 1KB, 0)
        Write-Host "  Saved ($size KB)" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
    }
}
```

After download:
1. Open each in **squoosh.app**.
2. Crop to **1200×630 px** (16:8.4 ratio).
3. Compress to **under 300 KB** (WebP or MozJPEG quality 75–80).
4. Save back to `public/blog/hero/`, overwriting the raw download.

### Coming-soon placeholder

For `public/blog/hero/coming-soon.jpg` — use any soft branded image (nude pink solid-colour, or a neutral abstract). Generate via [coolors.co](https://coolors.co) gradient or use one of the same gradients the site already uses. 1200×630, under 100 KB.

---

## 4. Validation

After implementation:

- [ ] All 10 MDX files in `content/blog/`, build passes.
- [ ] `/blog` index shows 10 cards — 4 normal + 6 muted with "Coming soon" badge.
- [ ] Each of the 4 published posts loads at `/blog/[slug]` with full content.
- [ ] Each coming-soon slug loads a stub page with `noindex` meta.
- [ ] Home page strip shows the 3 most-recent published posts (rotating).
- [ ] Each Services section strip shows 3 relevant published posts, with category-fallback logic working.
- [ ] `sitemap.xml` includes only the 4 published posts (no coming-soon).
- [ ] All 4 hero images present in `public/blog/hero/`, sized 1200×630, under 300 KB.
- [ ] `coming-soon.jpg` placeholder present.
- [ ] Each published post passes Google **Rich Results Test** for `BlogPosting`, `FAQPage`, `SpeakableSpecification`, `BreadcrumbList`, `Person`.
- [ ] Lighthouse on each published post: SEO 100, Performance 95+, A11y 95+, Best Practices 100.

---

**End of prompt.** Hand to Claude Code in the dev's environment. After completion, run the validation checklist above before pushing.
