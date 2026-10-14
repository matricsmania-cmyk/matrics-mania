import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ServiceTemplate } from '@/src/templates/ServiceTemplate';
import { IndustryTemplate } from '@/src/templates/IndustryTemplate';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { InsightTemplate } from '@/src/templates/InsightTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { asyncResolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface DynamicSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Set of static top-level routes and section indexes that must never be handled as root entity slugs
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
  'industry',
  'locations',
  'location',
  'case-studies',
  'insights',
  'blog',
  'sitemap',
  'robots',
  'api',
]);

export async function generateStaticParams() {
  const [services, industries, locations, insights] = await Promise.all([
    wordPressProvider.asyncGetAllServices(),
    wordPressProvider.asyncGetAllIndustries(),
    wordPressProvider.asyncGetAllLocations(),
    wordPressProvider.asyncGetAllInsights(),
  ]);

  const allSlugs = new Set<string>();

  for (const s of services) {
    if (s.slug && !RESERVED_TOP_LEVEL_SLUGS.has(s.slug.toLowerCase())) {
      allSlugs.add(s.slug.toLowerCase());
    }
  }
  for (const i of industries) {
    if (i.slug && !RESERVED_TOP_LEVEL_SLUGS.has(i.slug.toLowerCase())) {
      allSlugs.add(i.slug.toLowerCase());
    }
  }
  for (const l of locations) {
    if (l.slug && !RESERVED_TOP_LEVEL_SLUGS.has(l.slug.toLowerCase())) {
      allSlugs.add(l.slug.toLowerCase());
    }
  }
  for (const ins of insights) {
    if (ins.slug && !RESERVED_TOP_LEVEL_SLUGS.has(ins.slug.toLowerCase())) {
      allSlugs.add(ins.slug.toLowerCase());
    }
  }

  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DynamicSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (RESERVED_TOP_LEVEL_SLUGS.has(cleanSlug)) {
    return {
      title: 'Page Not Found | MatricsMania',
      robots: { index: false, follow: false },
    };
  }

  // 1. Service Resolution
  const service = await wordPressProvider.asyncGetServiceBySlug(cleanSlug);
  if (service) {
    const seo = await asyncResolveSeoMetadata({
      entityData: service,
      routePath: `/${cleanSlug}/`,
      cmsSourceUrl: `/services/${cleanSlug}/`,
    });
    return toNextMetadata(seo);
  }

  // 2. Industry Resolution
  const industry = await wordPressProvider.asyncGetIndustryBySlug(cleanSlug);
  if (industry) {
    const seo = await asyncResolveSeoMetadata({
      entityData: industry,
      routePath: `/${cleanSlug}/`,
      cmsSourceUrl: `/industries/${cleanSlug}/`,
    });
    return toNextMetadata(seo);
  }

  // 3. Location Resolution
  const location = await wordPressProvider.asyncGetLocationBySlug(cleanSlug);
  if (location) {
    const seo = await asyncResolveSeoMetadata({
      entityData: location,
      routePath: `/${cleanSlug}/`,
      cmsSourceUrl: `/locations/${cleanSlug}/`,
    });
    return toNextMetadata(seo);
  }

  // 4. WordPress Post (Insight) Resolution at root level
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);
  if (insight) {
    const seo = await asyncResolveSeoMetadata({
      entityData: insight,
      routePath: `/${cleanSlug}/`,
      cmsSourceUrl: `/insights/${cleanSlug}/`,
    });
    return toNextMetadata(seo);
  }

  return {
    title: 'Page Not Found | MatricsMania',
    robots: { index: false, follow: false },
  };
}

export default async function RootDynamicSlugPage({ params }: DynamicSlugPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (RESERVED_TOP_LEVEL_SLUGS.has(cleanSlug)) {
    notFound();
  }

  // 1. Service Check
  const service = await wordPressProvider.asyncGetServiceBySlug(cleanSlug);
  if (service) {
    return <ServiceTemplate service={service} />;
  }

  // 2. Industry Check
  const industry = await wordPressProvider.asyncGetIndustryBySlug(cleanSlug);
  if (industry) {
    return <IndustryTemplate industry={industry} />;
  }

  // 3. Location Check
  const location = await wordPressProvider.asyncGetLocationBySlug(cleanSlug);
  if (location) {
    return <LocationTemplate location={location} />;
  }

  // 4. WordPress Post (Insight) Check
  const insight = await wordPressProvider.asyncGetInsightBySlug(cleanSlug);
  if (insight) {
    return <InsightTemplate insight={insight} />;
  }

  notFound();
}
