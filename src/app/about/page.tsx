import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('about'));

export default async function AboutPage() {
  const page = (await wordPressProvider.asyncGetPageBySlug('about')) || wordPressProvider.getPageBySlug('about');
  return <StaticPageTemplate page={page || undefined} />;
}
