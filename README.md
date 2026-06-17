# Baptist Digitek — Website

Marketing site for **Baptist Digitek Private Limited**, a Chennai-based digital agency
specialising in tech-based aesthetic healthcare, beauty and dermatology clients.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**,
configured for **static export** so it can be served from Hostinger as plain files.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produces the static site in ./out
```

`npm run build` runs `next build`; with `output: 'export'` in `next.config.mjs` it
writes a fully static site to **`out/`**. Upload the **contents of `out/`** to your
Hostinger `public_html` directory.

---

## Design system

Active scheme: **Peach/Blush + Plum/Wine**, derived from the hero robot backdrop image.
Token *keys* are kept stable (used as Tailwind classes across the app); their *values*
in `tailwind.config.ts` define the scheme.

| Token (key) | Value | Role |
|---|---|---|
| `nude` | `#F6C9B4` | Dominant brand colour — peach pink |
| `blush` / `nude-100` | `#FADCD5` | Soft blush — calm, nurturing section tint |
| `espresso` | `#4B2138` | Deep plum — premium contrast anchor |
| `espresso-light` | `#6D3C52` | Rose-wine — hover / secondary deep |
| `espresso-dark` | `#1B0C1A` | Near-black plum — deepest ground |
| `espresso-ink` | `#2D222F` | Dark eggplant — alt deep neutral |
| `cream` | `#FFF6EF` | Warm cream backgrounds |
| `taupe` | `#765D67` | Mauve — muted text |
| `wine` | `#E8927C` | Coral — warm accent |

> To re-theme, change only the **values** in `tailwind.config.ts` (and the few raw
> hex spots: shadow rgbas in the config, `bg-grain`/holo glow in `globals.css`, inline
> SVG strokes, `favicon.svg`, `og/default.svg`, and `themeColor` in `app/layout.tsx`).

- **Display:** Clash Display (loaded from Fontshare — not on Google Fonts)
- **Body:** Instrument Sans (`next/font/google`)
- **Mono / tags:** Space Mono (`next/font/google`)

## Project structure

```
app/                 Routes (App Router). Each page.tsx exports `metadata` + JSON-LD.
  layout.tsx         <html lang="en-IN">, site metadata, Organization schema, chrome
  sitemap.ts         → /sitemap.xml
  robots.ts          → /robots.txt
components/
  layout/            Navbar (with Digi Design dropdown), Footer
  ui/                Breadcrumb (visible trail + BreadcrumbList JSON-LD), Reveal, HoloCard
  sections/          Cta, Scrollytelling, PortfolioGrid, ContactForm
  seo/json-ld.tsx    <script type="application/ld+json"> helper
lib/
  site.ts            SINGLE SOURCE OF TRUTH — brand facts, nav, offices, hours, sameAs
  schema.ts          JSON-LD builders (all read from site.ts)
  content.ts         Services, portfolio, packages, FAQ copy
```

> **Rule:** never hard-code brand values in components — read from `siteConfig` in `lib/site.ts`.

---

## SEO coverage (per the brief, §1–§10)

- `output: 'export'` + `images.unoptimized` → static `out/` for Hostinger ✓
- `<html lang="en-IN">`, `metadataBase`, title template, OG + Twitter defaults, robots, theme-color ✓
- Per-page `metadata` (unique title / description / canonical / OG) on every route ✓
- One primary keyword per page in `<title>`, H1 and OG title (creative H1s keep the
  designed visible headline; the primary keyword is added inside the H1 as an
  `sr-only` span so it is crawlable + accessible) ✓
- **JSON-LD per page** (verified parsing, 36 blocks, 0 failures):
  - `/` Organization + WebSite (SearchAction) + WebPage (Speakable)
  - `/about` AboutPage + Organization + Person (Angelin Celena)
  - `/services` 7× Service + Organization
  - `/portfolio` CollectionPage → ItemList
  - `/digi-design` AboutPage + Organization
  - `/digi-design/portfolio` CollectionPage → ItemList
  - `/digi-design/packages` OfferCatalog (Offers) + CollectionPage
  - `/contact` ContactPage + LocalBusiness ×2 (both offices) + FAQPage
  - BreadcrumbList on every non-home page
- Internal links use `next/link` with descriptive anchor text; each page links to 3–5 others ✓
- Semantic HTML (`header`/`main`/`nav`/`section`/`article`/`aside`/`footer`), one H1/page ✓
- `sitemap.ts` + `robots.ts` ✓
- AIEO/GEO: `sameAs`, entity facts in schema, one-line service definitions, brand stat
  ("100+ clinic and aesthetic-brand websites shipped from Chromepet since 2018"),
  Speakable schema on hero + closing CTA ✓

---

## ⚠️ Before launch — replace these placeholders

All live in `lib/site.ts` / `components/sections/contact-form.tsx`:

1. **Web3Forms key** — `WEB3FORMS_ACCESS_KEY` in `components/sections/contact-form.tsx`
   (free key from web3forms.com). Until set, the form UI works but submissions won't deliver.
2. **OG image** — `/og/default.svg` is a working placeholder. Replace with the branded
   **1200×630 `/og/default.jpg`** from the design pass and update `ogImage` in `lib/site.ts`.
   (SVG renders in-app but some social crawlers prefer JPG/PNG.)
3. **Tanjore branch address** — `offices.tanjore.street` is a placeholder; confirm the full NAP.
4. **Geo coordinates** — Chromepet/Tanjore `geo` values are approximate; set exact GBP pins.
5. **`sameAs` URLs** — confirm real LinkedIn / Instagram / Facebook / YouTube / GBP URLs;
   add the Wikidata QID once submitted.
6. **Clash Display** — currently from the Fontshare CDN. For best CWV, self-host the woffs
   and switch to `next/font/local`.

---

## §12 Validation gates (run before deploying)

The build was validated locally: TypeScript passes, all 13 routes prerender statically,
all 36 JSON-LD blocks parse, exactly one H1 per page. Still run the four external gates
on the deployed (or `npx serve out`) URLs:

1. **W3C HTML validator** — https://validator.w3.org/ (target: 0 errors)
2. **Google Rich Results Test** — https://search.google.com/test/rich-results
3. **Lighthouse** — Performance 90+ · SEO 100 · Accessibility 90+ · Best Practices 100
4. **Schema.org validator** — https://validator.schema.org/

Share-test the homepage in the **Facebook Sharing Debugger** and **Twitter Card Validator**
after the real OG JPG is in place.

```bash
# serve the static export locally for the validators
npx serve out
```
