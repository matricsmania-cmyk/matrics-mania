import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ServiceTemplate } from '@/src/templates/ServiceTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const services = await wordPressProvider.asyncGetAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await wordPressProvider.asyncGetServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Service Not Found | MatricsMania',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const seo = resolveSeoMetadata({
    entityData: service,
    routePath: `/services/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await wordPressProvider.asyncGetServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceTemplate service={service} />;
}
