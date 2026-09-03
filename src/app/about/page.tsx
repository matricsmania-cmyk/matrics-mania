import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('about'));

export default async function AboutPage() {
  const page = (await wordPressProvider.asyncGetPageBySlug('about')) || wordPressProvider.getPageBySlug('about');
  return <StaticPageTemplate page={page || undefined} slug="about" hideHero={true} />;
}
