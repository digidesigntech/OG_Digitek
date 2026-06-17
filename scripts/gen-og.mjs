// Generates branded 1200×630 OG SVGs for each blog post and case study.
// Run: node scripts/gen-og.mjs   (also wired as a prebuild step)
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();

function esc(s = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrap(text, max = 26) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

function svg({ title, label }) {
  const lines = wrap(title, 24);
  const startY = 300 - (lines.length - 1) * 38;
  const tspans = lines
    .map((l, i) => `<tspan x="90" dy="${i === 0 ? 0 : 76}">${esc(l)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF6EF"/>
      <stop offset="1" stop-color="#FADCD5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1010" cy="120" r="220" fill="#F6C9B4" opacity="0.55"/>
  <circle cx="1080" cy="540" r="180" fill="#E8927C" opacity="0.35"/>
  <g transform="translate(90,86)">
    <rect width="64" height="64" rx="16" fill="#4B2138"/>
    <text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="38" font-weight="700" fill="#F6C9B4">B</text>
    <text x="84" y="42" font-family="monospace" font-size="20" letter-spacing="2" fill="#765D67">BAPTIST DIGITEK · CHENNAI</text>
  </g>
  <text x="92" y="210" font-family="monospace" font-size="22" letter-spacing="4" fill="#6D3C52">${esc(label.toUpperCase())}</text>
  <text x="90" y="${startY}" font-family="Georgia, serif" font-size="62" font-weight="700" fill="#4B2138">${tspans}</text>
  <text x="90" y="560" font-family="monospace" font-size="20" letter-spacing="2" fill="#765D67">HEALTHCARE · AESTHETIC · DERMATOLOGY · BEAUTY</text>
</svg>
`;
}

function processDir(srcDir, outDir, labelKey) {
  const abs = path.join(ROOT, srcDir);
  if (!fs.existsSync(abs)) return 0;
  const outAbs = path.join(ROOT, outDir);
  fs.mkdirSync(outAbs, { recursive: true });
  let n = 0;
  for (const file of fs.readdirSync(abs).filter((f) => /\.mdx?$/.test(f))) {
    const slug = file.replace(/\.mdx?$/, '');
    const { data } = matter(fs.readFileSync(path.join(abs, file), 'utf8'));
    const label = data[labelKey] || data.category || data.industry || 'Insight';
    fs.writeFileSync(path.join(outAbs, `${slug}.svg`), svg({ title: data.title || slug, label }));
    n++;
  }
  return n;
}

const blog = processDir('content/blog', 'public/og/blog', 'category');
const portfolio = processDir('content/portfolio', 'public/og/portfolio', 'industry');
console.log(`Generated OG images — blog: ${blog}, portfolio: ${portfolio}`);
