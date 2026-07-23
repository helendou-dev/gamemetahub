// ============================================
// robots.ts — Dynamic robots.txt
// Next.js convention: serves at /robots.txt
// ============================================

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // API routes don't need indexing
          '/_next/',     // Next.js internals
          '/og/',        // OG image endpoint (no SEO value)
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',   // Block AI crawlers from scraping content
      },
      {
        userAgent: 'CCBot',
        disallow: '/',   // Block Common Crawl (used for AI training)
      },
    ],
    sitemap: 'https://gamemetahub.com/sitemap.xml',
    host: 'https://gamemetahub.com',
  };
}
