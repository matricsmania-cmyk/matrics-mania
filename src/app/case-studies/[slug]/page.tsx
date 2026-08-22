import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CaseStudyTemplate } from '@/src/templates/CaseStudyTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = mockDataProvider.getAllCaseStudies();
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = mockDataProvider.getCaseStudyBySlug(slug);
  if (!caseStudy) {
    return { title: 'Case Study Not Found | MatricsMania' };
  }
  const seo = resolveSeoMetadata({
    entityData: caseStudy,
    routePath: `/case-studies/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = mockDataProvider.getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
