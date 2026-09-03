import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { IndustryTemplate } from '@/src/templates/IndustryTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const industries = await wordPressProvider.asyncGetAllIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await wordPressProvider.asyncGetIndustryBySlug(slug);
  if (!industry) {
    return {
      title: 'Industry Not Found | MatricsMania',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const seo = resolveSeoMetadata({
    entityData: industry,
    routePath: `/industries/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await wordPressProvider.asyncGetIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryTemplate industry={industry} />;
}
