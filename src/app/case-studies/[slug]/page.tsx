import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CaseStudyTemplate } from '@/src/templates/CaseStudyTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const caseStudies = wordPressProvider.getAllCaseStudies();
  const slugSet = new Set(caseStudies.map((c) => c.slug));
  const knownSlugs = [
    'shashi-solar-energy',
    'cloudscale-infra-migration',
    'finflow-compliance-automation',
    'healthbridge-telehealth-platform',
    'retailcore-omnichannel-expansion',
  ];
  knownSlugs.forEach((s) => slugSet.add(s));
  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = (await wordPressProvider.asyncGetCaseStudyBySlug(slug)) || wordPressProvider.getCaseStudyBySlug(slug);
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
  const caseStudy = (await wordPressProvider.asyncGetCaseStudyBySlug(slug)) || wordPressProvider.getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
