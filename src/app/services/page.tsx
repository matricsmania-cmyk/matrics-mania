import React from 'react';
import { ServicesIndexTemplate } from '@/src/templates/ServicesIndexTemplate';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('services-index'));

export default function ServicesPage() {
  return <ServicesIndexTemplate />;
}
