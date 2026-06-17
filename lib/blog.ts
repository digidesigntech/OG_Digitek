import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogFaq = { question: string; answer: string };

export type BlogStatus = 'published' | 'coming_soon';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  author: string;
  datePublished: string;
  dateModified: string;
  ogImage: string;
  /** Optional real cover photo (shown on the card/featured panel). Falls back
   *  to the category gradient when empty. */
  coverImage: string;
  readingTime: string;
  status: BlogStatus;
  faqs: BlogFaq[];
  speakable: { intro: string; takeaway: string };
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, 'content'>;

function readPostFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    primaryKeyword: data.primaryKeyword ?? '',
    secondaryKeywords: data.secondaryKeywords ?? [],
    category: data.category ?? 'Digital Strategy',
    author: data.author ?? 'angelin-celena',
    datePublished: data.datePublished ?? '',
    dateModified: data.dateModified ?? data.datePublished ?? '',
    ogImage: data.ogImage ?? '/og/default.svg',
    coverImage: data.coverImage ?? '',
    readingTime: data.readingTime ?? `${Math.max(1, Math.round(words / 200))} min`,
    // Default to "published" if missing (backward-compatible).
    status: data.status === 'coming_soon' ? 'coming_soon' : 'published',
    faqs: data.faqs ?? [],
    speakable: data.speakable ?? { intro: '', takeaway: '' },
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export function getAllPostMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta);
}

/** Published posts only, newest first. Optionally limited. */
export function getPublishedPosts(limit?: number): BlogPost[] {
  const published = getAllPosts().filter((p) => p.status !== 'coming_soon');
  return limit ? published.slice(0, limit) : published;
}

/** Published posts in a category, newest first (limited). */
export function getPublishedByCategory(category: string, limit = 3): BlogPost[] {
  return getPublishedPosts()
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = ['.mdx', '.md'].map((ext) => `${slug}${ext}`).find((f) =>
    fs.existsSync(path.join(BLOG_DIR, f))
  );
  return file ? readPostFile(file) : null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedPosts(
  category: string,
  excludeSlug: string,
  count = 3
): BlogPostMeta[] {
  // Strips (home, services, blog post, portfolio) only ever surface published posts.
  const all = getPublishedPosts().filter((p) => p.slug !== excludeSlug);
  const sameCategory = all.filter((p) => p.category === category);
  const filler = all.filter((p) => p.category !== category);
  return [...sameCategory, ...filler].slice(0, count).map(({ content, ...m }) => m);
}

/** Slug helpers for routing. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Category slug <-> label helpers (e.g. "Clinic Marketing" <-> "clinic-marketing"). */
export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function slugToCategory(slug: string, categories: readonly string[]): string | null {
  return categories.find((c) => categoryToSlug(c) === slug) ?? null;
}
