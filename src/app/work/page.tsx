import React from 'react';
import { WorkTemplate } from '@/src/templates/WorkTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('work'));

export default function WorkPage() {
  const projects = wordPressProvider.getAllWorkProjects();
  return <WorkTemplate projects={projects} />;
}
