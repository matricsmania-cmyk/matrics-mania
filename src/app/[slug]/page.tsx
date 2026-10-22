import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ServiceTemplate } from '@/src/templates/ServiceTemplate';
import { IndustryTemplate } from '@/src/templates/IndustryTemplate';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { InsightTemplate } from '@/src/templates/InsightTemplate';
import { StaticPageTemplate } from '@/src/templates/StaticPageTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { asyncResolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface DynamicSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

// Set of static top-level routes and section indexes that must never be handled as root entity slugs
const RESERVED_TOP_LEVEL_SLUGS = new Set([
  'about',
  'contact',
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
  const [services, industries, locations, insights, pages] = await Promise.all([
    wordPressProvider.asyncGetAllServices(),
    wordPressProvider.asyncGetAllIndustries(),
    wordPressProvider.asyncGetAllLocations(),
    wordPressProvider.asyncGetAllInsights(),
    wordPressProvider.asyncGetAllPages(),
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
    if (l.city) {
      const citySlug = l.city.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (citySlug && !RESERVED_TOP_LEVEL_SLUGS.has(citySlug)) {
        allSlugs.add(citySlug);
      }
    }
    if (l.seo?.canonicalUrl) {
      try {
        const canonicalSlug = new URL(l.seo.canonicalUrl).pathname.replace(/^\/+|\/+$/g, '').split('/').pop();
        if (canonicalSlug && !RESERVED_TOP_LEVEL_SLUGS.has(canonicalSlug.toLowerCase())) {
          allSlugs.add(canonicalSlug.toLowerCase());
        }
      } catch {}
    }
    if (l.slug.includes('bangalore') || l.city?.toLowerCase() === 'bangalore') {
      allSlugs.add('bangalore');
    }
  }
  for (const ins of insights) {
    if (ins.slug && !RESERVED_TOP_LEVEL_SLUGS.has(ins.slug.toLowerCase())) {
      allSlugs.add(ins.slug.toLowerCase());
    }
  }
  for (const p of pages) {
    if (p.slug && !RESERVED_TOP_LEVEL_SLUGS.has(p.slug.toLowerCase()) && p.slug !== 'home') {
      allSlugs.add(p.slug.toLowerCase());
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
      routePath: `/services/${cleanSlug}/`,
      cmsSourceUrl: `/services/${cleanSlug}/`,
    });
    return toNextMetadata(seo);
  }

  // 2. Industry Resolution
  const industry = await wordPressProvider.asyncGetIndustryBySlug(cleanSlug);
  if (industry) {
    const seo = await asyncResolveSeoMetadata({
      entityData: industry,
      routePath: `/industries/${cleanSlug}/`,
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

  // 5. WordPress Page Resolution at root level
  const page = await wordPressProvider.asyncGetPageBySlug(cleanSlug);
  if (page) {
    const seo = await asyncResolveSeoMetadata({
      entityData: page,
      routePath: `/${cleanSlug}/`,
      cmsSourceUrl: `/${cleanSlug}/`,
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

  // Retrieve candidate entities across supported content types for collision audit
  const [service, industry, location, insight, page] = await Promise.all([
    wordPressProvider.asyncGetServiceBySlug(cleanSlug),
    wordPressProvider.asyncGetIndustryBySlug(cleanSlug),
    wordPressProvider.asyncGetLocationBySlug(cleanSlug),
    wordPressProvider.asyncGetInsightBySlug(cleanSlug),
    wordPressProvider.asyncGetPageBySlug(cleanSlug),
  ]);

  const conflicts: string[] = [];
  if (service) conflicts.push('Service');
  if (industry) conflicts.push('Industry');
  if (location) conflicts.push('Location');
  if (insight) conflicts.push('Insight');
  if (page) conflicts.push('Page');

  if (conflicts.length > 1) {
    console.warn(
      `[Collision Resolution] Slug "/${cleanSlug}" matches multiple CMS content types: [${conflicts.join(
        ', '
      )}]. Deterministically resolving according to priority hierarchy: Service > Industry > Location > Insight > Page.`
    );
  }

  // 1. Service Check
  if (service) {
    return <ServiceTemplate service={service} />;
  }

  // 2. Industry Check
  if (industry) {
    return <IndustryTemplate industry={industry} />;
  }

  // 3. Location Check
  if (location) {
    return <LocationTemplate location={location} />;
  }

  // 4. WordPress Post (Insight) Check
  if (insight) {
    return <InsightTemplate insight={insight} />;
  }

  // 5. WordPress Page Check
  if (page) {
    return <StaticPageTemplate page={page} />;
  }

  notFound();
}
