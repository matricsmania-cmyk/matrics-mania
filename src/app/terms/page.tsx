import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('terms'));

export default function TermsPage() {
  const page = mockDataProvider.getPageBySlug('terms');
  return <StaticPageTemplate page={page || undefined} />;
}
