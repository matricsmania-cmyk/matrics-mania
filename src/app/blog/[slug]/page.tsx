import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { asyncResolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);
  if (!insight) {
    return {
      title: 'Post Not Found | MatricsMania',
      robots: { index: false, follow: false },
    };
  }

  const seo = await asyncResolveSeoMetadata({
    entityData: insight,
    routePath: `/${cleanSlug}/`,
    cmsSourceUrl: `/insights/${cleanSlug}/`,
  });
  return toNextMetadata(seo);
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);

  if (!insight) {
    notFound();
  }

  // Canonical article location is root-level /<slug>/
  redirect(`/${cleanSlug}/`);
}
