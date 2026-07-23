// ============================================
// content.ts — Content Reading Utilities
// Reads MDX files from the /content directory,
// parses frontmatter, supports listing & search.
// ============================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentFrontmatter {
  title: string;
  description?: string;
  game?: string;
  type?: string;
  date?: string;
  author?: string;
  tags?: string[];
  image?: string;
  keywords?: string;
  publishDate?: string;
  modifiedDate?: string;
  jsonLd?: Record<string, unknown>;
  canonicalUrl?: string;
  [key: string]: unknown;
}

export interface ContentEntry {
  slug: string;
  game: string;
  frontmatter: ContentFrontmatter;
  content: string;
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Read a single MDX content page by game slug and page slug.
 */
export function getContentByPath(game: string, slug: string): ContentEntry | null {
  const filePath = path.join(CONTENT_DIR, 'games', game, slug, 'page.mdx');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    game,
    frontmatter: data as ContentFrontmatter,
    content,
    filePath,
  };
}

/**
 * Parse JSON-LD from raw MDX content (since it's embedded as a frontmatter field).
 */
export function extractJsonLd(rawContent: string): Record<string, unknown> | null {
  const { data } = matter(rawContent);
  if (data.jsonLd) {
    return data.jsonLd as Record<string, unknown>;
  }
  return null;
}

/**
 * List all content pages in the /content/games directory.
 */
export function listAllContent(): { game: string; slug: string; frontmatter: ContentFrontmatter }[] {
  const gamesDir = path.join(CONTENT_DIR, 'games');
  if (!fs.existsSync(gamesDir)) return [];

  const entries: { game: string; slug: string; frontmatter: ContentFrontmatter }[] = [];

  const gameFolders = fs.readdirSync(gamesDir, { withFileTypes: true });
  for (const gameFolder of gameFolders) {
    if (!gameFolder.isDirectory()) continue;

    const gamePath = path.join(gamesDir, gameFolder.name);
    const pageFolders = fs.readdirSync(gamePath, { withFileTypes: true });

    for (const pageFolder of pageFolders) {
      if (!pageFolder.isDirectory()) continue;

      const mdxPath = path.join(gamePath, pageFolder.name, 'page.mdx');
      if (!fs.existsSync(mdxPath)) continue;

      const raw = fs.readFileSync(mdxPath, 'utf-8');
      const { data } = matter(raw);

      entries.push({
        game: gameFolder.name,
        slug: pageFolder.name,
        frontmatter: data as ContentFrontmatter,
      });
    }
  }

  // Sort by date descending
  entries.sort((a, b) => {
    const dateA = a.frontmatter.publishDate || a.frontmatter.date || '';
    const dateB = b.frontmatter.publishDate || b.frontmatter.date || '';
    return dateB.localeCompare(dateA);
  });

  return entries;
}

/**
 * Estimate reading time from word count.
 */
export function readingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Generate schema.org JSON-LD for a content page.
 */
export function generatePageJsonLd(
  frontmatter: ContentFrontmatter,
  url: string,
): Record<string, unknown> {
  // If the frontmatter already has embedded JSON-LD, use it
  if (frontmatter.jsonLd) {
    return frontmatter.jsonLd as Record<string, unknown>;
  }

  // Otherwise generate a basic Article schema
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description || '',
    datePublished: frontmatter.publishDate || frontmatter.date,
    dateModified: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date,
    author: frontmatter.author
      ? { '@type': 'Person', name: frontmatter.author }
      : { '@type': 'Organization', name: 'GameMetaHub' },
    publisher: {
      '@type': 'Organization',
      name: 'GameMetaHub',
      url: 'https://gamemetahub.com',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

/**
 * Generate a sitemap-ready URL entry.
 */
export function contentToSitemapEntry(
  game: string,
  slug: string,
  frontmatter: ContentFrontmatter,
) {
  return {
    url: `https://gamemetahub.com/games/${game}/${slug}`,
    lastModified: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date || new Date().toISOString(),
    changeFrequency: frontmatter.type === 'news' ? 'daily' : 'weekly',
    priority: frontmatter.type === 'guide' ? 0.9 : 0.7,
  };
}
