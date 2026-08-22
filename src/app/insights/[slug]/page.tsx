import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { InsightTemplate } from '@/src/templates/InsightTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const insights = mockDataProvider.getAllInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = mockDataProvider.getInsightBySlug(slug);
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
  const insight = mockDataProvider.getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return <InsightTemplate insight={insight} />;
}
