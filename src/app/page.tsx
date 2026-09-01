import React from 'react';
import { HomeTemplate } from '@/src/templates/HomeTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('home'));

export default async function HomePage() {
  const [services, industries, caseStudies, insights] = await Promise.all([
    wordPressProvider.asyncGetAllServices(),
    wordPressProvider.asyncGetAllIndustries(),
    wordPressProvider.asyncGetAllCaseStudies(),
    wordPressProvider.asyncGetAllInsights(),
  ]);

  return (
    <HomeTemplate
      services={services.length > 0 ? services : wordPressProvider.getAllServices()}
      industries={industries.length > 0 ? industries : wordPressProvider.getAllIndustries()}
      caseStudies={caseStudies.length > 0 ? caseStudies : wordPressProvider.getAllCaseStudies()}
      insights={insights.length > 0 ? insights : wordPressProvider.getAllInsights()}
    />
  );
}
