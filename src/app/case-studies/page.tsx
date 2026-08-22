import React from 'react';
import { CaseStudyIndexTemplate } from '@/src/templates/CaseStudyIndexTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('case-studies-index'));

export default function CaseStudiesPage() {
  const caseStudies = mockDataProvider.getAllCaseStudies();
  return <CaseStudyIndexTemplate caseStudies={caseStudies} />;
}
