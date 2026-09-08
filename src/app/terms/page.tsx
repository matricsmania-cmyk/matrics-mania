import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('terms'));

export default async function TermsPage() {
  const page = (await wordPressProvider.asyncGetPageBySlug('terms')) || wordPressProvider.getPageBySlug('terms');
  return <StaticPageTemplate page={page || undefined} />;
}
