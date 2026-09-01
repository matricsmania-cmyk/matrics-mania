import React from 'react';
import { IndustryTemplate } from '@/src/templates/IndustryTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('industries-index'));

export default async function IndustriesPage() {
  const industries = (await wordPressProvider.asyncGetAllIndustries()) || wordPressProvider.getAllIndustries();
  const defaultIndustry = industries[0] || undefined;

  return <IndustryTemplate industry={defaultIndustry} />;
}
