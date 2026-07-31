'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ContentListItem } from '@/lib/content';

const TYPE_CONFIG: Record<string, { emoji: string; label: string; badgeClass: string }> = {
  guide: { emoji: '📖', label: 'Guide', badgeClass: 'type-badge-guide' },
  news: { emoji: '📰', label: 'News', badgeClass: 'type-badge-news' },
  tier_list: { emoji: '🏆', label: 'Tier List', badgeClass: 'type-badge-tier' },
  comparison: { emoji: '⚖️', label: 'Comparison', badgeClass: 'type-badge-comparison' },
  error_fix: { emoji: '🔧', label: 'Fix Guide', badgeClass: 'type-badge-fix' },
  patch_notes: { emoji: '📋', label: 'Patch Notes', badgeClass: 'type-badge-patch' },
  game_release: { emoji: '🚀', label: 'Launch Guide', badgeClass: 'type-badge-release' },
};

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] || { emoji: '🎮', label: type, badgeClass: 'type-badge-guide' };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

const PLATFORM_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  PC: { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
  PS5: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  Xbox: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
  Switch: { bg: 'rgba(244,63,94,0.12)', color: '#fb7185', border: 'rgba(244,63,94,0.2)' },
  Steam: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', border: 'rgba(99,102,241,0.2)' },
};

function ArticleCard({ item, index }: { item: ContentListItem; index: number }) {
  const tc = getTypeConfig(item.type);
  const date = formatDate(item.date);
  const hasImage = !!item.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={item.url} className="block h-full">
        <div className="glow-card h-full flex flex-col">
          {/* Image thumbnail */}
          {hasImage ? (
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.6), transparent 50%)' }} />
              <span className={`type-badge ${tc.badgeClass} absolute top-3 left-3`}>
                {tc.emoji} {tc.label}
              </span>
            </div>
          ) : (
            <>
              <div className="h-1" style={{
                background: item.type === 'tier_list'
                  ? 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
                  : item.type === 'guide'
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : item.type === 'comparison'
                  ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                  : item.type === 'error_fix'
                  ? 'linear-gradient(90deg, #f97316, #fb923c)'
                  : item.type === 'patch_notes'
                  ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                  : item.type === 'game_release'
                  ? 'linear-gradient(90deg, #ec4899, #f472b6)'
                  : 'linear-gradient(90deg, #6366f1, #818cf8)',
              }} />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`type-badge ${tc.badgeClass}`}>
                    {tc.emoji} {tc.label}
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2 transition-colors duration-200"
                  style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
                <div className="flex items-center gap-3 text-xs pt-3 mt-auto"
                  style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  {date && <span>{date}</span>}
                  {item.readingTime && <span>⏱ {item.readingTime} min</span>}
                  {item.tags.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {item.tags[0]}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Card body for image variant */}
          {hasImage && (
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2 transition-colors duration-200"
                style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-3 text-xs pt-3 mt-auto"
                style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {date && <span>{date}</span>}
                {item.readingTime && <span>⏱ {item.readingTime} min</span>}
                {item.tags.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {item.tags[0]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePageClient({ allArticles }: { allArticles: ContentListItem[] }) {
  const heroShapes = [
    { color: 'rgba(139,92,246,0.4)', size: 300, x: '10%', y: '20%', delay: 0 },
    { color: 'rgba(59,130,246,0.3)', size: 250, x: '80%', y: '30%', delay: 2 },
    { color: 'rgba(6,182,212,0.25)', size: 200, x: '50%', y: '60%', delay: 4 },
  ];

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'var(--bg-deep)' }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.08) 0%, transparent 50%)',
        }}>
          {heroShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: shape.size, height: shape.size,
                left: shape.x, top: shape.y,
                background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
              }}
              animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.15, 0.95, 1] }}
              transition={{ duration: 8, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a78bfa' }} />
              Updated Daily
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span style={{ color: 'var(--text-primary)' }}>Level Up Your</span>
              <br />
              <span className="gradient-text" style={{ color: '#a78bfa' }}>Game, Every Day</span>
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}>
              Tier lists, build guides, patch breakdowns, and bug fixes for the games
              everyone&apos;s playing right now — all in one place.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/games" className="btn-primary">
                Browse All Games
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/guides" className="btn-ghost">Latest Guides</Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-deep), transparent)' }} />
      </section>

      {/* ===== Trending Now ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            🔥 Trending Now
            <span className="text-sm font-normal ml-3" style={{ color: 'var(--text-muted)' }}>
              {allArticles.length} articles
            </span>
          </h2>
          <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
            The latest tier lists, guides, and patch breakdowns
          </p>
        </motion.div>

        {allArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🕹️</div>
            <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No articles yet</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Check back soon for new guides</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allArticles.map((item, i) => (
              <ArticleCard key={`${item.game}/${item.slug}`} item={item} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ===== Browse by Type ===== */}
      <section className="py-16 md:py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Browse by Type
            </h2>
            <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
              6 content pillars covering everything you need
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { href: '/guides', emoji: '📖', label: 'Guides', count: allArticles.filter(a => a.type === 'guide').length, gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))' },
              { href: '/tier-lists', emoji: '🏆', label: 'Tier Lists', count: allArticles.filter(a => a.type === 'tier_list').length, gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))' },
              { href: '/comparisons', emoji: '⚖️', label: 'Compare', count: allArticles.filter(a => a.type === 'comparison').length, gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))' },
              { href: '/fixes', emoji: '🔧', label: 'Fixes', count: allArticles.filter(a => a.type === 'error_fix').length, gradient: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))' },
              { href: '/news', emoji: '📋', label: 'Patches', count: allArticles.filter(a => a.type === 'patch_notes').length, gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))' },
              { href: '/releases', emoji: '🚀', label: 'Releases', count: allArticles.filter(a => a.type === 'game_release').length, gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))' },
            ].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <div className="group relative">
                  <Link href={link.href} className="block text-center rounded-xl p-5 h-full transition-all duration-300 group-hover:-translate-y-1"
                    style={{ background: link.gradient, border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                  <div className="text-2xl mb-2">{link.emoji}</div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{link.label}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {link.count} article{link.count !== 1 ? 's' : ''}
                  </p>
                </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Popular Games ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Popular Games
            </h2>
            <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
              Jump straight to the game you&apos;re playing
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { href: '/games/elden-ring', name: 'Elden Ring', image: '/images/games/elden-ring-header.jpg', emoji: '⚔️' },
              { href: '/games/baldurs-gate-3', name: "Baldur's Gate 3", image: '/images/games/baldurs-gate-3-header.jpg', emoji: '🎲' },
              { href: '/games/rampage-evolution', name: 'Rampage Evolution', image: '/images/games/rampage-evolution-header.jpg', emoji: '🦖' },
              { href: '/games/assassins-creed-black-flag-resynced', name: 'AC: Black Flag', image: '/images/games/ac-black-flag-header.jpg', emoji: '🏴‍☠️' },
            ].map((game, i) => {
              const count = allArticles.filter(a => a.game === game.href.split('/').pop()).length;
              return (
                <motion.div
                  key={game.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link href={game.href} className="group block relative rounded-2xl overflow-hidden h-56"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <img
                      src={game.image}
                      alt={game.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(6,6,11,0.92) 20%, rgba(6,6,11,0.3) 60%, transparent 100%)',
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{game.emoji}</span>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{game.name}</h3>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {count} article{count !== 1 ? 's' : ''} · guides, tier lists & more
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-10 md:p-14 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06), rgba(6,182,212,0.04))',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to Level Up?
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Bookmark GameMetaHub for daily updates on the games you love.
              New guides drop every day.
            </p>
            <Link href="/guides" className="btn-primary text-base">
              Start Exploring
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
