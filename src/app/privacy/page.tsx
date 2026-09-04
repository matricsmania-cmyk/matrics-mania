import React from 'react';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('privacy'));

export default async function PrivacyPage() {
  const page = (await wordPressProvider.asyncGetPageBySlug('privacy')) || wordPressProvider.getPageBySlug('privacy');
  return <StaticPageTemplate page={page || undefined} />;
}
