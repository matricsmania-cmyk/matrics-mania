import React from 'react';
import { CareersTemplate } from '@/src/templates/CareersTemplate';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('careers'));

export default function CareersPage() {
  return <CareersTemplate />;
}
