// Generates web-optimised portfolio assets from the raw print-resolution design
// files in public/og/images/. Those source files are huge (the folder is ~925MB,
// with single files up to 76MB) and must never be shipped to the browser as-is.
//
// For every source image this script writes:
//   public/portfolio/thumbs/<cat>/<slug>.webp   — masonry tile (max 720px wide)
//   public/portfolio/full/<cat>/<slug>.webp     — lightbox view (max 1600px wide)
// and emits lib/portfolio-gallery.ts — a typed manifest the gallery imports
// directly (so the page stays statically rendered, no client fetch).
//
// The sub-folders inside public/og/images/ become the filter categories; loose
// images sitting directly in that folder are grouped under "Posters & Creatives".
//
// Run: node scripts/gen-portfolio.mjs   (also wired as a prebuild step)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'public', 'og', 'images');
const OUT = path.join(ROOT, 'public', 'portfolio');
const THUMB_DIR = path.join(OUT, 'thumbs');
const FULL_DIR = path.join(OUT, 'full');
const MANIFEST = path.join(ROOT, 'lib', 'portfolio-gallery.ts');

const IMG_RE = /\.(jpe?g|png|webp)$/i;

// folder name (lower-case) -> { label, blurb, order }. The order controls how
// filter tabs are listed; "All" is always first and injected by the component.
const CATEGORIES = {
  'social media': { label: 'Social Media', blurb: 'Campaign creatives and on-brand social posts.', order: 1 },
  'wall poster': { label: 'Wall Posters', blurb: 'Large-format wall and pillar branding for clinics.', order: 2 },
  standee: { label: 'Standees', blurb: 'Floor standees and roll-up display banners.', order: 3 },
  'new folder': { label: 'Letterheads & Stationery', blurb: 'Letterheads, pamphlets and brand stationery.', order: 4 },
  'patient file': { label: 'Patient Files', blurb: 'Branded patient record folders and inserts.', order: 5 },
  'qr code scanner': { label: 'QR & Branding', blurb: 'QR standees and quick brand touchpoints.', order: 6 },
  __root__: { label: 'Posters & Creatives', blurb: 'Treatment posters, pamphlets and print creatives.', order: 7 },
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'item';
}

// Turn a messy source filename into a presentable title.
function titleFromFile(file, label) {
  const base = file.replace(/\.[a-z0-9]+$/i, '');
  // Generic auto-named exports get a clean, brand-appropriate title.
  if (/^chatgpt image/i.test(base) || /^whatsapp image/i.test(base) || /^[0-9a-f]{8}-?[0-9a-f-]{8,}$/i.test(base)) {
    return `${label} — Mockup`;
  }
  let t = base
    .replace(/\s*-\s*copy/gi, '')
    .replace(/\bcopy\b/gi, '')
    .replace(/\b\d{1,3}\s*[xX]\s*\d{1,3}(\.\d+)?\b/g, '') // strip dims like 36X32
    .replace(/\bA[1-6]\s*size\b/gi, '')
    .replace(/[._]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (!t) t = label;
  // Sentence-ish casing: capitalise first letter, leave the rest as authored.
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMG_RE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

async function processImage({ srcPath, catKey, label, file, index }) {
  const slug = `${slugify(file)}-${index}`;
  const relThumb = `portfolio/thumbs/${catKey}/${slug}.webp`;
  const relFull = `portfolio/full/${catKey}/${slug}.webp`;
  const thumbPath = path.join(ROOT, 'public', relThumb);
  const fullPath = path.join(ROOT, 'public', relFull);
  ensureDir(path.dirname(thumbPath));
  ensureDir(path.dirname(fullPath));

  try {
    // limitInputPixels:false allows the largest print sources through (one
    // exceeds sharp's default ~268MP cap); failOn:'none' tolerates minor corruption.
    const img = sharp(srcPath, { failOn: 'none', limitInputPixels: false }).rotate(); // respect EXIF orientation

    const thumbInfo = await img
      .clone()
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(thumbPath);

    await img
      .clone()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(fullPath);

    return {
      title: titleFromFile(file, label),
      category: label,
      thumb: `/${relThumb}`,
      full: `/${relFull}`,
      w: thumbInfo.width,
      h: thumbInfo.height,
    };
  } catch (err) {
    console.warn(`  ! skipped ${file}: ${err.message}`);
    return null;
  }
}

async function run() {
  // The raw print-resolution sources (public/og/images) are intentionally NOT
  // committed to git — they're ~2.4GB. On a fresh clone (e.g. a Vercel build)
  // they're absent, but the generated gallery (public/portfolio + the manifest
  // lib/portfolio-gallery.ts) IS committed, so there's nothing to regenerate.
  // Skip gracefully instead of wiping the committed output and failing the build.
  if (!fs.existsSync(SRC)) {
    console.log(
      `gen-portfolio: source folder ${path.relative(ROOT, SRC)} not found — ` +
        'using the committed gallery manifest as-is (skipping regeneration).',
    );
    return;
  }

  // Clean previous output so removed source files don't linger.
  fs.rmSync(OUT, { recursive: true, force: true });
  ensureDir(THUMB_DIR);
  ensureDir(FULL_DIR);

  const entries = fs.readdirSync(SRC, { withFileTypes: true });
  const tasks = [];

  // Loose files directly in og/images -> __root__ category.
  const rootCat = CATEGORIES.__root__;
  listImages(SRC).forEach((file, i) =>
    tasks.push({ srcPath: path.join(SRC, file), catKey: 'root', label: rootCat.label, file, index: i, order: rootCat.order }),
  );

  // Sub-folders -> their mapped category.
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const meta = CATEGORIES[ent.name.toLowerCase()];
    if (!meta) {
      console.warn(`  ? unmapped folder "${ent.name}" — skipping`);
      continue;
    }
    const dir = path.join(SRC, ent.name);
    const files = listImages(dir);
    if (!files.length) continue;
    const catKey = slugify(ent.name);
    files.forEach((file, i) =>
      tasks.push({ srcPath: path.join(dir, file), catKey, label: meta.label, file, index: i, order: meta.order }),
    );
  }

  console.log(`Generating portfolio assets for ${tasks.length} images…`);
  const items = [];
  // Process sequentially-ish in small batches to keep memory bounded (some
  // sources are 70MB+ and sharp buffers the decode).
  const BATCH = 4;
  for (let i = 0; i < tasks.length; i += BATCH) {
    const batch = tasks.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(processImage));
    results.forEach((r, k) => {
      if (r) items.push({ ...r, order: batch[k].order });
    });
    process.stdout.write(`  ${Math.min(i + BATCH, tasks.length)}/${tasks.length}\r`);
  }
  console.log(`\nProcessed ${items.length} images.`);

  // Build ordered category list from what actually produced output.
  const seen = new Map();
  for (const it of items) {
    if (!seen.has(it.category)) {
      const metaEntry = Object.values(CATEGORIES).find((c) => c.label === it.category);
      seen.set(it.category, { label: it.category, blurb: metaEntry?.blurb ?? '', order: it.order, count: 0 });
    }
    seen.get(it.category).count += 1;
  }
  const categories = [...seen.values()].sort((a, b) => a.order - b.order).map(({ order, ...c }) => c);

  // Strip the transient `order` field from items before emitting.
  const cleanItems = items.map(({ order, ...it }) => it);

  const banner =
    '// AUTO-GENERATED by scripts/gen-portfolio.mjs — do not edit by hand.\n' +
    '// Run `node scripts/gen-portfolio.mjs` to regenerate from public/og/images/.\n\n';
  const body =
    'export type GalleryItem = {\n' +
    '  title: string;\n  category: string;\n  thumb: string;\n  full: string;\n  w: number;\n  h: number;\n};\n\n' +
    'export type GalleryCategory = { label: string; blurb: string; count: number };\n\n' +
    `export const galleryCategories: GalleryCategory[] = ${JSON.stringify(categories, null, 2)};\n\n` +
    `export const galleryItems: GalleryItem[] = ${JSON.stringify(cleanItems, null, 2)};\n`;

  fs.writeFileSync(MANIFEST, banner + body);
  console.log(`Wrote ${path.relative(ROOT, MANIFEST)} (${cleanItems.length} items, ${categories.length} categories).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
