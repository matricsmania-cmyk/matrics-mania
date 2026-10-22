import { permanentRedirect, notFound } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const insights = await wordPressProvider.asyncGetAllInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export default async function LegacyInsightRedirectPage({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);
  if (insight) {
    permanentRedirect(`/${cleanSlug}`);
  }
  notFound();
}
