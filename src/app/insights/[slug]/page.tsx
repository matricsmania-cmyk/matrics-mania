import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { InsightTemplate } from '@/src/templates/InsightTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const insights = wordPressProvider.getAllInsights();
  const slugSet = new Set(insights.map((i) => i.slug));
  const knownSlugs = [
    'b2b-growth-playbook-2025',
    'search-algorithm-intelligence-report',
    'cro-audit-framework',
    'multi-region-infrastructure-scaling',
  ];
  knownSlugs.forEach((s) => slugSet.add(s));
  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = (await wordPressProvider.asyncGetInsightBySlug(slug)) || wordPressProvider.getInsightBySlug(slug);
  if (!insight) {
    return { title: 'Insight Not Found | MatricsMania' };
  }
  const seo = resolveSeoMetadata({
    entityData: insight,
    routePath: `/insights/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = (await wordPressProvider.asyncGetInsightBySlug(slug)) || wordPressProvider.getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return <InsightTemplate insight={insight} />;
}
