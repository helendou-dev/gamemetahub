// ============================================
// [game]/[slug]/page.tsx — Dynamic MDX Page
// Renders any MDX content from /content/games/
// with full SEO metadata, JSON-LD, breadcrumbs.
// ============================================

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentByPath, listAllContent, readingTime, generatePageJsonLd } from '@/lib/content';
import { mdxComponents, BreadcrumbJsonLd } from '@/components/mdx-components';

// ─── Static Params (build-time optimization) ───
export function generateStaticParams() {
  const pages = listAllContent();
  return pages.map((p) => ({ game: p.game, slug: p.slug }));
}

// ─── SEO Metadata ───────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { game: string; slug: string };
}): Promise<Metadata> {
  const content = getContentByPath(params.game, params.slug);
  if (!content) return {};

  const { frontmatter } = content;
  const url = `https://gamemetahub.com/games/${params.game}/${params.slug}`;

  return {
    // Use absolute title to prevent layout template from appending "| GameMetaHub"
    // (content pages already have descriptive titles; brand suffix would make them too long)
    title: {
      absolute: frontmatter.title,
    },
    description: frontmatter.description || `Guide and tips for ${params.game.replace(/-/g, ' ')}`,
    keywords: frontmatter.keywords || frontmatter.tags?.join(', '),
    alternates: { canonical: frontmatter.canonicalUrl || url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || '',
      url,
      type: 'article',
      publishedTime: frontmatter.publishDate || frontmatter.date,
      modifiedTime: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date,
      ...(frontmatter.image
        ? { images: [{ url: frontmatter.image, width: 1200, height: 630 }] }
        : {
            images: [
              {
                url: `/og?title=${encodeURIComponent(frontmatter.title)}&type=${encodeURIComponent(frontmatter.type || 'default')}&game=${encodeURIComponent(frontmatter.game || params.game.replace(/-/g, ' '))}`,
                width: 1200,
                height: 630,
                alt: frontmatter.title,
              },
            ],
          }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description || '',
    },
    // Signal freshness to search engines
    ...(frontmatter.type === 'news'
      ? { robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } }
      : {}),
  };
}

// ─── Page Component ─────────────────────────
export default async function GameContentPage({
  params,
}: {
  params: { game: string; slug: string };
}) {
  const content = getContentByPath(params.game, params.slug);
  if (!content) notFound();

  const { frontmatter } = content;
  const url = `https://gamemetahub.com/games/${params.game}/${params.slug}`;
  const jsonLd = frontmatter.jsonLd || generatePageJsonLd(frontmatter, url);
  const readTime = readingTime(content.content);

  // Parse tags
  const tags = frontmatter.tags || [];
  const gameName = frontmatter.game || params.game.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* Structured Data (JSON-LD) — injected before DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gamemetahub.com' },
          { name: 'Games', url: 'https://gamemetahub.com/games' },
          { name: gameName, url: `https://gamemetahub.com/games/${params.game}` },
          { name: frontmatter.title, url },
        ]}
      />

      {/* Article Page */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/games" className="hover:text-blue-600 transition-colors">Games</a>
          <span className="mx-2">/</span>
          <a
            href={`/games/${params.game}`}
            className="hover:text-blue-600 transition-colors"
          >
            {gameName}
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-600">{frontmatter.title?.slice(0, 60)}...</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          {/* Type Badge */}
          {frontmatter.type && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              {frontmatter.type === 'guide'
                ? '📖 Guide'
                : frontmatter.type === 'news'
                  ? '📰 News'
                  : frontmatter.type === 'tierlist'
                    ? '🏆 Tier List'
                    : frontmatter.type === 'comparison'
                      ? '⚖️ Comparison'
                      : frontmatter.type}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {frontmatter.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
            {frontmatter.author && (
              <span>✍️ {frontmatter.author}</span>
            )}
            {(frontmatter.publishDate || frontmatter.date) && (
              <time dateTime={frontmatter.publishDate || frontmatter.date}>
                📅 {new Date(frontmatter.publishDate || frontmatter.date!).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <span>⏱ {readTime} min read</span>
            {frontmatter.game && (
              <span>🎮 {gameName}</span>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Body — MDXRemote renders the .mdx content */}
        <div className="article-body">
          <MDXRemote source={content.content} components={mdxComponents} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">GameMetaHub</p>
              <p>Your go-to source for trending game guides and news.</p>
            </div>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>

          {/* Ad Placeholder (Phase 2 — Month 3+) */}
          <div
            className="mt-8 p-4 bg-slate-100 border border-dashed border-slate-300 rounded-lg text-center text-sm text-slate-400"
            data-ad-slot="article-footer"
          >
            Ad placeholder — will activate in Month 3 after sandbox period
          </div>
        </footer>
      </article>
    </>
  );
}

// Dynamic rendering — pipeline-generated pages don't need build-time pre-render
export const dynamic = 'force-dynamic';

// ISR: revalidate every 1 hour (for pipeline-generated pages)
export const revalidate = 3600;
