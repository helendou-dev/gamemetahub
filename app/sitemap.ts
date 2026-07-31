// ============================================
// sitemap.ts — Dynamic XML Sitemap
// Next.js convention: serves at /sitemap.xml
// Scans content/games/ for all published pages
// ============================================

import { MetadataRoute } from 'next';
import { listAllContent } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamemetahub.com';
  const pages = listAllContent();

  // Static pages (always indexed)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tier-lists`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic content pages from /content/games/
  const contentRoutes: MetadataRoute.Sitemap = pages.map((p) => {
    const isNews = p.type === 'news' || p.type === 'patch_notes';
    const isGuide = p.type === 'guide';

    return {
      url: `${baseUrl}/games/${p.game}/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: (isNews ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: isGuide ? 0.9 : isNews ? 0.7 : 0.8,
    };
  });

  return [...staticRoutes, ...contentRoutes];
}
