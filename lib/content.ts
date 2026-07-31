// ============================================
// content.ts — Content Reading Utilities
// Reads MDX files from the /content directory,
// parses frontmatter, supports listing & search.
// ============================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from './site-config';

export interface ContentFrontmatter {
  title: string;
  description?: string;
  metaDescription?: string;
  game?: string;
  gameName?: string;
  type?: string;
  contentType?: string;
  date?: string;
  publishedAt?: string;
  publishDate?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  image?: string;
  keywords?: string;
  modifiedDate?: string;
  jsonLd?: Record<string, unknown>;
  canonicalUrl?: string;
  canonical?: string;
  platforms?: string[];
  [key: string]: unknown;
}

export interface ContentEntry {
  slug: string;
  game: string;
  frontmatter: ContentFrontmatter;
  content: string;
  filePath: string;
}

export interface ContentListItem {
  game: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  url: string;
  readingTime?: number;
  platforms?: string[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Normalize a content entry from frontmatter for display use.
 */
export function normalizeEntry(
  game: string,
  slug: string,
  fm: ContentFrontmatter,
  rawContent?: string,
): ContentListItem {
  const platforms = (fm.platforms as string[]) || [];
  const readTime = rawContent ? readingTime(rawContent) : undefined;

  return {
    game,
    slug,
    title: fm.title || slug,
    description: fm.description || fm.metaDescription || '',
    type: (fm.type || fm.contentType || 'guide') as string,
    date: (fm.publishDate || fm.publishedAt || fm.updatedAt || fm.date || '') as string,
    author: (fm.author || 'GameMetaHub') as string,
    tags: (fm.tags || []) as string[],
    image: (fm.image || fm.featuredImage || '') as string | undefined,
    url: `/games/${game}/${slug}`,
    readingTime: readTime,
    platforms: platforms.length > 0 ? platforms : undefined,
  };
}

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
 * Normalize a JSON-LD value that may be stored as a string or object.
 */
export function parseJsonLd(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

/**
 * Parse JSON-LD from raw MDX content (since it's embedded as a frontmatter field).
 */
export function extractJsonLd(rawContent: string): Record<string, unknown> | null {
  const { data } = matter(rawContent);
  return parseJsonLd(data.jsonLd);
}

/**
 * List all content pages in the /content/games directory.
 * Returns normalized items sorted by date descending.
 */
export function listAllContent(): ContentListItem[] {
  const gamesDir = path.join(CONTENT_DIR, 'games');
  if (!fs.existsSync(gamesDir)) return [];

  const entries: ContentListItem[] = [];

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
      const fm = data as ContentFrontmatter;

      entries.push(normalizeEntry(gameFolder.name, pageFolder.name, fm, raw));
    }
  }

  // Sort by date descending
  const getDate = (item: ContentListItem): string => item.date;
  entries.sort((a, b) => getDate(b).localeCompare(getDate(a)));

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
  // If the frontmatter already has embedded JSON-LD, use it (parse if stored as string)
  if (frontmatter.jsonLd) {
    const parsed = parseJsonLd(frontmatter.jsonLd);
    if (parsed) return parsed;
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
      url: siteConfig.url,
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
    url: `${siteConfig.url}/games/${game}/${slug}`,
    lastModified: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date || new Date().toISOString(),
    changeFrequency: frontmatter.type === 'news' ? 'daily' : 'weekly',
    priority: frontmatter.type === 'guide' ? 0.9 : 0.7,
  };
}
