import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getPublishedPosts, categoryToSlug } from '@/lib/blog';
import { getAllCaseStudies } from '@/lib/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date('2026-06-03');

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/portfolio', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/digi-design', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/digi-design/portfolio', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/digi-design/packages', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog posts (published only — coming-soon stubs are noindex)
  for (const post of getPublishedPosts()) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(`${post.dateModified || post.datePublished}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Blog category pages
  for (const category of siteConfig.blogCategories) {
    entries.push({
      url: `${base}/blog/category/${categoryToSlug(category)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  }

  // Portfolio case studies
  for (const cs of getAllCaseStudies()) {
    entries.push({
      url: `${base}/portfolio/${cs.slug}`,
      lastModified: new Date(`${cs.datePublished}T00:00:00Z`),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
