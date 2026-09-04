import React from 'react';
import { InsightIndexTemplate } from '@/src/templates/InsightIndexTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('insights-index'));

export default async function InsightsPage() {
  const insights = await wordPressProvider.asyncGetAllInsights();
  return <InsightIndexTemplate insights={insights} />;
}
