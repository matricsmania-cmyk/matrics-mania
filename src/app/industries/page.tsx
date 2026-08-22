import React from 'react';
import { IndustryTemplate } from '@/src/templates/IndustryTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('industries-index'));

export default function IndustriesPage() {
  const industries = mockDataProvider.getAllIndustries();
  const defaultIndustry = industries[0] || undefined;

  return <IndustryTemplate industry={defaultIndustry} />;
}
