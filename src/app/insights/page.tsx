import React from 'react';
import { InsightIndexTemplate } from '@/src/templates/InsightIndexTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('insights-index'));

export default function InsightsPage() {
  const insights = mockDataProvider.getAllInsights();
  return <InsightIndexTemplate insights={insights} />;
}
