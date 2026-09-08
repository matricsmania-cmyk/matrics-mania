import React from 'react';
import { WorkTemplate } from '@/src/templates/WorkTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('work'));

export default function WorkPage() {
  const projects = wordPressProvider.getAllWorkProjects();
  return <WorkTemplate projects={projects} />;
}
