import React from 'react';
import { WorkTemplate } from '@/src/templates/WorkTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('work'));

export default function WorkPage() {
  const projects = mockDataProvider.getAllWorkProjects();
  return <WorkTemplate projects={projects} />;
}
