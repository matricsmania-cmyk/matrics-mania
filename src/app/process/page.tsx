import React from 'react';
import { ProcessTemplate } from '@/src/templates/ProcessTemplate';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('process'));

export default function ProcessPage() {
  return <ProcessTemplate />;
}
