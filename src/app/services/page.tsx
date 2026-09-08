import React from 'react';
import { ServicesIndexTemplate } from '@/src/templates/ServicesIndexTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('services-index'));

export default async function ServicesPage() {
  const services = await wordPressProvider.asyncGetAllServices();
  return <ServicesIndexTemplate services={services} />;
}
