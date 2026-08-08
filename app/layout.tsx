import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/header';

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
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
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
        {/* Organization structured data for Google's Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'GameMetaHub',
              url: 'https://www.gamemetahub.com',
              description:
                'Trending game guides, tier lists, and gaming news — updated daily by real players.',
              foundingDate: '2026',
              logo: 'https://www.gamemetahub.com/icon.png',
            }),
          }}
        />
        {/* WebSite structured data for Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GameMetaHub',
              url: 'https://www.gamemetahub.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://www.gamemetahub.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg-deep)' }}>
        <GoogleAnalytics gaId={siteConfig.gaId} />
        <Header />

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
