import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { asyncGetStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  const seo = await asyncGetStaticRouteSeo('about', '/about/');
  return toNextMetadata(seo);
}

export default async function AboutPage() {
  const page = (await wordPressProvider.asyncGetPageBySlug('about')) || wordPressProvider.getPageBySlug('about');
  return <StaticPageTemplate page={page || undefined} />;
}
