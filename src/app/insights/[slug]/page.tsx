import { redirect } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { notFound } from 'next/navigation';

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LegacyInsightRedirectPage({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);
  if (insight) {
    redirect(`/${cleanSlug}/`);
  }
  notFound();
}
