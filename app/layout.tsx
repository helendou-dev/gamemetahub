import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'GameMetaHub — Game Guides, Tier Lists & Patch Notes',
    template: '%s | GameMetaHub',
  },
  description:
    'Tier lists, build guides, patch breakdowns, and bug fixes for the games everyone is playing right now. Updated daily by real players.',
  keywords: [
    'game guides',
    'video game tips',
    'gaming news',
    'tier lists',
    'game walkthrough',
    'patch notes',
  ],
  openGraph: {
    type: 'website',
    siteName: 'GameMetaHub',
    locale: 'en_US',
    title: 'GameMetaHub — Game Guides, Tier Lists & Patch Notes',
    description:
      'Tier lists, build guides, patch breakdowns, and bug fixes for the games everyone is playing right now. Updated daily.',
    url: siteConfig.url,
    images: [
      {
        url: '/og?title=GameMetaHub+—+Level+Up+Your+Game%2C+Every+Day&type=default',
        width: 1200,
        height: 630,
        alt: 'GameMetaHub — Level Up Your Game, Every Day',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gamemetahub',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg-deep)' }}>
        {/* ===== Glassmorphism Header ===== */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            background: 'rgba(10, 10, 18, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(255,255,255,0.06)',
            transform: 'translateZ(0)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight transition-opacity hover:opacity-80"
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white font-bold"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)',
                  boxShadow: '0 2px 12px rgba(99,102,241,0.4)',
                }}
              >
                G
              </span>
              <span className="gradient-text" style={{ color: '#a78bfa' }}>GameMetaHub</span>
            </Link>

            {/* Desktop Nav — CSS-only hover using group */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {[
                { href: '/guides', label: 'Guides' },
                { href: '/tier-lists', label: 'Tier Lists' },
                { href: '/comparisons', label: 'Compare' },
                { href: '/fixes', label: 'Fixes' },
                { href: '/news', label: 'Patches' },
                { href: '/releases', label: 'Releases' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link px-3 py-2 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg"
                style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)' }}
                aria-label="Menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* ===== Modern Footer ===== */}
        <footer className="mt-20" style={{ background: 'var(--bg-base)' }}>
          {/* Top gradient line */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
                  >
                    G
                  </span>
                  <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>GameMetaHub</span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Trending game guides, tier lists, and gaming news — updated daily by real players.
                </p>
              </div>

              {/* Links */}
              {[
                {
                  title: 'Content',
                  links: [
                    { href: '/guides', label: 'Game Guides' },
                    { href: '/tier-lists', label: 'Tier Lists' },
                    { href: '/comparisons', label: 'Comparisons' },
                    { href: '/fixes', label: 'Fix Guides' },
                  ],
                },
                {
                  title: 'More',
                  links: [
                    { href: '/news', label: 'Patch Notes' },
                    { href: '/releases', label: 'Game Releases' },
                    { href: '/about', label: 'About Us' },
                    { href: '/contact', label: 'Contact' },
                  ],
                },
                {
                  title: 'Legal',
                  links: [
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms', label: 'Terms of Service' },
                    { href: '/affiliate', label: 'Affiliate Disclosure' },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {col.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="footer-link text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>&copy; {new Date().getFullYear()} GameMetaHub. All rights reserved.</span>
              <span>GameMetaHub is reader-supported. When you buy through links on our site, we may earn an affiliate commission.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
