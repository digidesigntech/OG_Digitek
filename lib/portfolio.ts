import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'content', 'portfolio');

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  ogImage: string;
  datePublished: string;
  client: string;
  industry: string;
  services: string[];
  liveUrl?: string;
  quote?: string;
  quoteAuthor?: string;
  outcome: string;
  content: string;
};

export type CaseStudyMeta = Omit<CaseStudy, 'content'>;

function read(fileName: string): CaseStudy {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    primaryKeyword: data.primaryKeyword ?? '',
    ogImage: data.ogImage ?? '/og/default.svg',
    datePublished: data.datePublished ?? '2026-01-01',
    client: data.client ?? '',
    industry: data.industry ?? 'Other',
    services: data.services ?? [],
    liveUrl: data.liveUrl ?? '',
    quote: data.quote ?? '',
    quoteAuthor: data.quoteAuthor ?? '',
    outcome: data.outcome ?? '',
    content,
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const file = ['.mdx', '.md'].map((e) => `${slug}${e}`).find((f) =>
    fs.existsSync(path.join(DIR, f))
  );
  return file ? read(file) : null;
}

export function getAllCaseStudySlugs(): string[] {
  return getAllCaseStudies().map((c) => c.slug);
}

/** Slug map so /portfolio cards can detect which have detail pages. */
export function caseStudySlugSet(): Set<string> {
  return new Set(getAllCaseStudySlugs());
}
