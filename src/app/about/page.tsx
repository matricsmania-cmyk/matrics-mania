import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('about'));

export default function AboutPage() {
  const page = mockDataProvider.getPageBySlug('about');
  return <StaticPageTemplate page={page || undefined} />;
}
