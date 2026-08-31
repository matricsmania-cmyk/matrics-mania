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

export async function generateStaticParams() {
  const services = wordPressProvider.getAllServices();
  const slugSet = new Set(services.map((s) => s.slug));
  const knownSlugs = [
    'technical-seo',
    'seo-growth',
    'generative-engine-optimization',
    'semantic-knowledge-graphs',
    'b2b-seo-strategy',
    'paid-media-architecture',
    'performance-marketing',
    'paid-search-engineering',
    'server-side-capi',
    'abm-retargeting',
    'web-cro-engineering',
    'cro-revenue-experimentation',
    'multi-touch-attribution',
    'growth-audit-blueprint',
    'content-authority',
    'growth-intelligence',
  ];
  knownSlugs.forEach((s) => slugSet.add(s));
  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = (await wordPressProvider.asyncGetServiceBySlug(slug)) || wordPressProvider.getServiceBySlug(slug);
  if (!service) {
    return { title: 'Service Not Found | MatricsMania' };
  }
  const seo = resolveSeoMetadata({
    entityData: service,
    routePath: `/services/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = (await wordPressProvider.asyncGetServiceBySlug(slug)) || wordPressProvider.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceTemplate service={service} />;
}
