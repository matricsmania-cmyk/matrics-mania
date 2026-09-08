import React from 'react';
import { CaseStudyIndexTemplate } from '@/src/templates/CaseStudyIndexTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('case-studies-index'));

export default async function CaseStudiesPage() {
  const caseStudies = await wordPressProvider.asyncGetAllCaseStudies();
  return <CaseStudyIndexTemplate caseStudies={caseStudies} />;
}
