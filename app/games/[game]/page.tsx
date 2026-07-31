// ============================================
// [game]/page.tsx — Individual Game Hub Page
// Dark gaming theme — 2026 redesign
// ============================================

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { listAllContent, ContentListItem } from '@/lib/content';

// Game metadata lookup — extend as you add more games
const GAME_META: Record<string, {
  name: string;
  headerImage?: string;
  description: string;
  releaseYear: string;
  developer: string;
  publisher: string;
  tags: string[];
}> = {
  'elden-ring': {
    name: 'Elden Ring',
    headerImage: '/images/games/elden-ring-header.jpg',
    description: 'FromSoftware\'s masterpiece — an open-world action RPG set in the Lands Between. Explore a vast dark fantasy world, face demigods, and become the Elden Lord.',
    releaseYear: '2022',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    tags: ['Action RPG', 'Open World', 'Soulslike', 'Dark Fantasy'],
  },
  'baldurs-gate-3': {
    name: "Baldur's Gate 3",
    headerImage: '/images/games/baldurs-gate-3-header.jpg',
    description: 'Larian Studios\' award-winning CRPG set in the Dungeons & Dragons universe. Experience deep storytelling, tactical turn-based combat, and unprecedented player freedom.',
    releaseYear: '2023',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    tags: ['CRPG', 'Turn-Based', 'D&D', 'Fantasy', 'Story-Rich'],
  },
  'assassins-creed-black-flag-resynced': {
    name: "Assassin's Creed Black Flag Resynced",
    headerImage: '/images/games/ac-black-flag-header.jpg',
    description: 'The remastered edition of the iconic pirate adventure. Sail the Caribbean as Edward Kenway in stunning 4K with enhanced gameplay mechanics.',
    releaseYear: '2026',
    developer: 'Ubisoft',
    publisher: 'Ubisoft',
    tags: ['Action-Adventure', 'Open World', 'Pirate', 'Stealth', 'Remaster'],
  },
  'rampage-evolution': {
    name: 'Rampage Evolution',
    headerImage: '/images/games/rampage-evolution-header.jpg',
    description: 'Tencent\'s massive 2026 summer hit — open-world survival PVP with mutation-based evolution, territory control, and base building. 40 million pre-registrations worldwide.',
    releaseYear: '2026',
    developer: 'Tencent',
    publisher: 'Tencent',
    tags: ['Survival', 'Open World', 'Evolution', 'PVP', 'Multiplayer'],
  },
};

export function generateStaticParams() {
  const allArticles = listAllContent();
  const games = [...new Set(allArticles.map((a) => a.game))];
  return games.map((game) => ({ game }));
}

export async function generateMetadata({
  params,
}: {
  params: { game: string };
}): Promise<Metadata> {
  const meta = GAME_META[params.game];
  if (!meta) return {};

  return {
    title: { absolute: `${meta.name} Guides, Tier Lists & News` },
    description: meta.description,
    openGraph: {
      title: `${meta.name} — GameMetaHub`,
      description: meta.description,
      ...(meta.headerImage ? { images: [{ url: meta.headerImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

const TYPE_BADGE: Record<string, string> = {
  guide: 'type-badge-guide',
  tier_list: 'type-badge-tier',
  comparison: 'type-badge-comparison',
  error_fix: 'type-badge-fix',
  patch_notes: 'type-badge-patch',
  news: 'type-badge-news',
  game_release: 'type-badge-release',
};

const TYPE_LABEL: Record<string, string> = {
  guide: '📖 Guide',
  tier_list: '🏆 Tier List',
  comparison: '⚖️ Compare',
  error_fix: '🔧 Fix',
  patch_notes: '📋 Patch',
  news: '📰 News',
  game_release: '🚀 Release',
};

const TYPE_ICON: Record<string, string> = {
  guide: '📖',
  tier_list: '🏆',
  comparison: '⚖️',
  error_fix: '🔧',
  patch_notes: '📋',
  news: '📰',
  game_release: '🚀',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function ArticleCard({ item }: { item: ContentListItem }) {
  const hasImage = !!item.image;
  const date = formatDate(item.date);
  const badge = TYPE_BADGE[item.type] || 'type-badge-guide';
  const label = TYPE_LABEL[item.type] || '🎮 Article';

  return (
    <Link href={item.url} className="block h-full group">
      <div className="glow-card h-full flex flex-col">
        {hasImage ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.6), transparent 50%)' }} />
            <span className={`type-badge ${badge} absolute top-3 left-3`}>{label}</span>
          </div>
        ) : (
          <>
            <div className="h-1" style={{
              background: `linear-gradient(90deg, var(--accent-purple), var(--accent-blue))`,
            }} />
            <div className="p-5 flex flex-col flex-1">
              <span className={`type-badge ${badge} mb-3 self-start`}>{label}</span>
              <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-3 text-xs pt-3 mt-auto" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {date && <span>{date}</span>}
                {item.tags.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {item.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {hasImage && (
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>
            <div className="flex items-center gap-3 text-xs pt-3 mt-auto" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {date && <span>{date}</span>}
              {item.tags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {item.tags[0]}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function GameHubPage({
  params,
}: {
  params: { game: string };
}) {
  const meta = GAME_META[params.game];
  if (!meta) notFound();

  const allArticles = listAllContent();
  const gameArticles = allArticles.filter((a) => a.game === params.game);

  // Stats by type
  const typeCounts: Record<string, number> = {};
  gameArticles.forEach((a) => {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  });

  return (
    <div>
      {/* ===== Hero Banner ===== */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
        {/* Background image */}
        {meta.headerImage && (
          <div className="absolute inset-0">
            <img
              src={meta.headerImage}
              alt={meta.name}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, var(--bg-deep) 0%, rgba(6,6,11,0.5) 40%, rgba(6,6,11,0.3) 100%)',
            }} />
          </div>
        )}

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/games" className="hover:text-white transition-colors">Games</Link>
            <span>/</span>
            <span className="text-white">{meta.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            {meta.name}
          </h1>

          <p className="text-base md:text-lg max-w-2xl mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {meta.description}
          </p>

          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
              {meta.releaseYear}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
              {meta.developer}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
              {meta.publisher}
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-5">
            <div className="text-center px-5 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{gameArticles.length}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Articles</div>
            </div>
            {/* Type counts */}
            {Object.entries(typeCounts).sort(([, a], [, b]) => b - a).slice(0, 4).map(([type, count]) => (
              <div key={type} className="text-center px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{count}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {TYPE_ICON[type] || '🎮'} {TYPE_LABEL[type]?.split(' ').pop() || type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-deep))' }} />
      </section>

      {/* ===== Article Grid ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              📝 Articles
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {gameArticles.length} article{gameArticles.length !== 1 ? 's' : ''} for {meta.name}
            </p>
          </div>

          {/* Type filter chips */}
          <div className="hidden sm:flex gap-2">
            {['guide', 'tier_list', 'comparison', 'error_fix', 'patch_notes', 'game_release'].map((type) => {
              const count = gameArticles.filter((a) => a.type === type).length;
              if (count === 0) return null;
              return (
                <Link
                  key={type}
                  href={`/${type === 'tier_list' ? 'tier-lists' : type === 'error_fix' ? 'fixes' : type === 'patch_notes' ? 'news' : type === 'game_release' ? 'releases' : `${type}s`}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {TYPE_ICON[type]} {count}
                </Link>
              );
            })}
          </div>
        </div>

        {gameArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🕹️</div>
            <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No articles yet</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Content for this game is coming soon</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gameArticles.map((item) => (
              <ArticleCard key={`${item.game}/${item.slug}`} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
