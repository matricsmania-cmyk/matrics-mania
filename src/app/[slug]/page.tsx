import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ServiceTemplate } from '@/src/templates/ServiceTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { asyncResolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

// Set of static top-level routes and section indexes that must never be handled as root service slugs
const RESERVED_TOP_LEVEL_SLUGS = new Set([
  'about',
  'contact',
  'careers',
  'faq',
  'privacy',
  'terms',
  'work',
  'process',
  'services',
  'industries',
  'locations',
  'case-studies',
  'insights',
  'sitemap',
  'robots',
  'api',
]);

export async function generateStaticParams() {
  const services = await wordPressProvider.asyncGetAllServices();
  return services
    .filter((s) => s.slug && !RESERVED_TOP_LEVEL_SLUGS.has(s.slug.toLowerCase()))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (RESERVED_TOP_LEVEL_SLUGS.has(cleanSlug)) {
    return {
      title: 'Page Not Found | MatricsMania',
      robots: { index: false, follow: false },
    };
  }

  const service = await wordPressProvider.asyncGetServiceBySlug(cleanSlug);
  if (!service) {
    return {
      title: 'Service Not Found | MatricsMania',
      robots: { index: false, follow: false },
    };
  }

  const seo = await asyncResolveSeoMetadata({
    entityData: service,
    routePath: `/${cleanSlug}/`,
  });

  return toNextMetadata(seo);
}

export default async function RootServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (RESERVED_TOP_LEVEL_SLUGS.has(cleanSlug)) {
    notFound();
  }

  const service = await wordPressProvider.asyncGetServiceBySlug(cleanSlug);

  if (!service) {
    notFound();
  }

  return <ServiceTemplate service={service} />;
}
