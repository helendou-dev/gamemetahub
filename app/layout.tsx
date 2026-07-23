import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gamemetahub.com'),
  title: {
    default: 'GameMetaHub — Latest Gaming Guides, News & Tier Lists',
    template: '%s | GameMetaHub',
  },
  description:
    'Stay ahead with trending game guides, tier lists, patch notes, and gaming news. Expert tips for PC, console, and mobile games. Updated daily.',
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
    title: 'GameMetaHub — Latest Gaming Guides, News & Tier Lists',
    description:
      'Stay ahead with trending game guides, tier lists, patch notes, and gaming news. Expert tips for PC, console, and mobile games. Updated daily.',
    url: 'https://gamemetahub.com',
    images: [
      {
        url: '/og?title=GameMetaHub+—+Trending+Gaming+Guides+%26+News&type=default',
        width: 1200,
        height: 630,
        alt: 'GameMetaHub — Trending Gaming Guides & News',
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
    <html lang="en">
      <head>
        {/* DNS preconnect for faster ad/analytics loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* Preload Inter font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
              🎮 GameMetaHub
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="/games" className="text-slate-600 hover:text-blue-600 transition-colors">All Games</a>
              <a href="/guides" className="text-slate-600 hover:text-blue-600 transition-colors">Guides</a>
              <a href="/tier-lists" className="text-slate-600 hover:text-blue-600 transition-colors">Tier Lists</a>
              <a href="/news" className="text-slate-600 hover:text-blue-600 transition-colors">News</a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-white font-bold text-lg mb-3">🎮 GameMetaHub</div>
              <p className="text-sm leading-relaxed">
                Trending game guides, tier lists, and news — updated daily.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Disclosure</h4>
              <p className="text-xs leading-relaxed">
                GameMetaHub is reader-supported. When you buy through links on our site,
                we may earn an affiliate commission.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 text-center py-6 text-xs">
            &copy; {new Date().getFullYear()} GameMetaHub. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
