'use client';

/**
 * §29.2 — Blog scroll-depth engagement events. Fires `blog_scroll_25` and
 * `blog_scroll_75` once each, when the reader passes those depths of the page.
 * Renders nothing; mount it inside the blog post template.
 */

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export function useScrollDepth(slug: string, category?: string) {
  useEffect(() => {
    const fired = { 25: false, 75: false };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      if (!fired[25] && pct >= 25) {
        fired[25] = true;
        track('blog_scroll_25', { post_slug: slug, post_category: category });
      }
      if (!fired[75] && pct >= 75) {
        fired[75] = true;
        track('blog_scroll_75', { post_slug: slug, post_category: category });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // catch short posts already past a threshold on load
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, category]);
}

export function ScrollDepth({ slug, category }: { slug: string; category?: string }) {
  useScrollDepth(slug, category);
  return null;
}
