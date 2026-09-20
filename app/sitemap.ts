// ============================================
// sitemap.ts — Dynamic XML Sitemap
// Next.js convention: serves at /sitemap.xml
// Scans content/games/ for all published pages
// ============================================

import { MetadataRoute } from 'next';
import { listAllContent, canonicalType } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { ALL_GAMES } from '@/lib/game-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const pages = listAllContent();

  // `lastmod` must reflect when content actually changed, not when the site was
  // built. Using `new Date()` here stamped every static/hub URL with the build
  // timestamp, which teaches Google to distrust lastmod entirely.
  // Instead we anchor those routes to the newest article date, so the signal
  // stays meaningful and only moves when real content lands.
  const latestContentDate = pages.reduce<Date | null>((acc, p) => {
    const d = p.updated || p.date;
    if (!d) return acc;
    const parsed = new Date(d);
    if (Number.isNaN(parsed.getTime())) return acc;
    return !acc || parsed > acc ? parsed : acc;
  }, null);
  const siteLastModified = latestContentDate || new Date('2026-08-01T00:00:00.000Z');

  // Static pages (always indexed)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tier-lists`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comparisons`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fixes`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/releases`,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Game hub pages (e.g. /games/elden-ring)
  const gameHubRoutes: MetadataRoute.Sitemap = Object.keys(ALL_GAMES).map((slug) => ({
    url: `${baseUrl}/games/${slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  // Dynamic content pages from /content/games/
  const GUIDE_TYPES = new Set(['guide', 'deep-guide', 'beginner_guide', 'preview_guide']);
  const NEWS_TYPES = new Set(['hot-take', 'news', 'patch_notes', 'game_release']);

  const contentRoutes: MetadataRoute.Sitemap = pages.map((p) => {
    const type = canonicalType(p.type);
    const isNews = NEWS_TYPES.has(type);
    const isGuide = GUIDE_TYPES.has(type);

    return {
      url: `${baseUrl}/games/${p.game}/${p.slug}`,
      lastModified: p.updated || p.date ? new Date(p.updated || p.date) : siteLastModified,
      changeFrequency: (isNews ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: isGuide ? 0.9 : isNews ? 0.7 : 0.8,
    };
  });

  return [...staticRoutes, ...gameHubRoutes, ...contentRoutes];
}
