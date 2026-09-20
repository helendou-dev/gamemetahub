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
  excerpt?: string;
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
  featuredImage?: string;
  headerImage?: string;
  ogImage?: string;
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
  /** Last meaningful modification (falls back to the publish date). */
  updated: string;
  author: string;
  tags: string[];
  image?: string;
  url: string;
  readingTime?: number;
  platforms?: string[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Canonicalize a content type value.
 * Legacy articles use inconsistent spellings ("review-roundup", "review roundup",
 * "Endings Guide"), which bypass the type badge / label maps. Map known variants
 * onto the canonical snake_case tokens used across the app.
 */
const TYPE_ALIASES: Record<string, string> = {
  'review-roundup': 'review_roundup',
  'review roundup': 'review_roundup',
  'endings guide': 'guide',
  'hot take': 'hot-take',
  'deep guide': 'deep-guide',
  'beginner guide': 'beginner_guide',
  'preview guide': 'preview_guide',
  'tier list': 'tier_list',
  'meta tier list': 'meta_tier_list',
  'patch notes': 'patch_notes',
  'error fix': 'error_fix',
  'game release': 'game_release',
};

export function canonicalType(value: unknown): string {
  if (typeof value !== 'string') return '';
  const raw = value.trim();
  if (!raw) return '';
  return TYPE_ALIASES[raw.toLowerCase()] || raw;
}

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

  // Description: legacy articles use `excerpt`, newer ones use `description`/`metaDescription`.
  const description = (fm.description || fm.metaDescription || fm.excerpt || '') as string;

  // Hero image: articles across three generations of frontmatter schema use
  // `image`, `featuredImage`, `ogImage`, or `headerImage`. Keep all four in the chain.
  const heroImage = (fm.image || fm.featuredImage || fm.ogImage || fm.headerImage || '') as string;

  return {
    game,
    slug,
    title: fm.title || slug,
    description,
    type: canonicalType(fm.type) || canonicalType(fm.contentType) || 'guide',
    date: (fm.publishDate || fm.publishedAt || fm.updatedAt || fm.date || '') as string,
    updated: (fm.updatedAt ||
      fm.modifiedDate ||
      fm.publishDate ||
      fm.publishedAt ||
      fm.date ||
      '') as string,
    author: (fm.author || 'GameMetaHub') as string,
    tags: (fm.tags || []) as string[],
    image: heroImage || undefined,
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
 * Enhanced with image, wordCount, inLanguage, and FAQ auto-detection.
 */
export function generatePageJsonLd(
  frontmatter: ContentFrontmatter,
  url: string,
  rawContent?: string,
): Record<string, unknown> {
  // If the frontmatter already has embedded JSON-LD, use it (parse if stored as string)
  if (frontmatter.jsonLd) {
    const parsed = parseJsonLd(frontmatter.jsonLd);
    if (parsed) return parsed;
  }

  const publishDate = frontmatter.publishDate || frontmatter.date;
  const modifiedDate = frontmatter.modifiedDate || publishDate;
  const wordCount = rawContent ? rawContent.split(/\s+/).length : undefined;
  const heroImage = (frontmatter.image as string) || (frontmatter.headerImage as string) || '';

  // Determine schema type: hot-take → NewsArticle, deep-guide → Article
  const isHotTake =
    canonicalType(frontmatter.contentType) === 'hot-take' ||
    canonicalType(frontmatter.type) === 'hot-take' ||
    canonicalType(frontmatter.contentType) === 'news' ||
    canonicalType(frontmatter.type) === 'news';
  const schemaType = isHotTake ? 'NewsArticle' : 'Article';

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: frontmatter.title,
    description: frontmatter.description || frontmatter.metaDescription || (frontmatter.excerpt as string) || '',
    datePublished: publishDate,
    dateModified: modifiedDate,
    inLanguage: 'en',
    author: frontmatter.author && frontmatter.author !== 'GameMetaHub'
      ? { '@type': 'Person', name: frontmatter.author, url: `${siteConfig.url}/about` }
      : { '@type': 'Organization', name: 'GameMetaHub', url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: 'GameMetaHub',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  // Add image if available (critical for Google Discover)
  if (heroImage) {
    article.image = heroImage.startsWith('http')
      ? heroImage
      : `${siteConfig.url}${heroImage}`;
  }

  // Add word count if available
  if (wordCount) {
    article.wordCount = wordCount;
  }

  return article;
}

/**
 * Auto-detect FAQ sections in article content and generate FAQPage schema.
 *
 * Two markup styles are supported:
 *  1. `<details className="faq-section"><summary>Q</summary><p>A</p></details>`
 *     (preferred — pre-renders safely, so most newer articles use it)
 *  2. markdown `### Question` pairs nested under an `## FAQ` heading
 */
export function generateFaqSchema(
  frontmatter: ContentFrontmatter,
  url: string,
  rawContent: string,
): Record<string, unknown> | null {
  const MAX_PAIRS = 10;

  // Only process documents that actually declare an FAQ block. This prevents
  // unrelated <details> toggles (spoiler warnings, patch notes, etc.) from
  // being published as FAQPage structured data.
  const hasFaqHeading = /^#{1,3}\s+(FAQ|Frequently Asked Questions?)/mi.test(rawContent);
  const hasFaqMarkup = /faq-section/.test(rawContent);
  if (!hasFaqHeading && !hasFaqMarkup) return null;

  const qaPairs: { question: string; answer: string }[] = [];

  const cleanText = (input: string): string =>
    input
      .replace(/<[^>]*>/g, ' ')
      .replace(/[`*_~[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const pushPair = (rawQuestion: string, rawAnswer: string): void => {
    if (qaPairs.length >= MAX_PAIRS) return;
    const question = cleanText(rawQuestion);
    let answer = cleanText(rawAnswer);
    if (!question || !answer) return;
    if (answer.length > 300) answer = answer.slice(0, 297) + '...';
    qaPairs.push({ question, answer });
  };

  // --- Pass 1: <summary>Question</summary> … </details> markup
  const detailsRegex = /<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)(?=<\/details>|$)/g;
  let dm: RegExpExecArray | null;
  while ((dm = detailsRegex.exec(rawContent)) !== null && qaPairs.length < MAX_PAIRS) {
    pushPair(dm[1], dm[2]);
  }

  // --- Pass 2: "### Question" pairs under a FAQ heading (only if Pass 1 found nothing)
  if (qaPairs.length === 0) {
    const headingMatch = rawContent.match(/^#{1,3}\s+(FAQ|Frequently Asked Questions?)/mi);
    if (headingMatch && headingMatch.index !== undefined) {
      const faqSection = rawContent.slice(headingMatch.index);
      const qaRegex = /^###\s+(.+?)\s*$\s*\n([\s\S]*?)(?=\n###\s|\n##\s|$)/gm;
      let m: RegExpExecArray | null;
      while ((m = qaRegex.exec(faqSection)) !== null && qaPairs.length < MAX_PAIRS) {
        pushPair(m[1], m[2]);
      }
    }
  }

  if (qaPairs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qaPairs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
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
  const type = canonicalType(frontmatter.contentType) || canonicalType(frontmatter.type);
  const isGuide = type === 'deep-guide' || type === 'guide' || type === 'beginner_guide';
  const isNews = type === 'hot-take' || type === 'news';
  return {
    url: `${siteConfig.url}/games/${game}/${slug}`,
    lastModified: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date || new Date().toISOString(),
    changeFrequency: isNews ? 'daily' : isGuide ? 'weekly' : 'monthly',
    priority: isGuide ? 0.9 : isNews ? 0.8 : 0.7,
  };
}
