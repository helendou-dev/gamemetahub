// Server component — fetches data, passes to client component for rendering
import { listAllContent } from '@/lib/content';
import HomePageClient from '@/components/home-page-client';

export default function HomePage() {
  const allArticles = listAllContent();
  return <HomePageClient allArticles={allArticles} />;
}
