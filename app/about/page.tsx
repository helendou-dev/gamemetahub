// ============================================
// about/page.tsx — About GameMetaHub
// Dark gaming theme — 2026 redesign
// ============================================

import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: { absolute: 'About Us — GameMetaHub' },
  description: 'GameMetaHub is your go-to source for tier lists, build guides, patch breakdowns, and bug fixes for the games everyone\'s playing. Fresh, accurate, and actually helpful.',
  openGraph: {
    title: 'About GameMetaHub',
    description: 'Guides for the games you\'re playing now. Tier lists, build guides, patch breakdowns, and more — all in one place.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
