import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const locations = wordPressProvider.getAllLocations();
  const slugSet = new Set(locations.map((l) => l.slug));
  const knownSlugs = ['bangalore', 'mumbai', 'delhi-ncr', 'singapore', 'san-francisco'];
  knownSlugs.forEach((s) => slugSet.add(s));
  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = (await wordPressProvider.asyncGetLocationBySlug(slug)) || wordPressProvider.getLocationBySlug(slug);
  if (!location) {
    return { title: 'Location Not Found | MatricsMania' };
  }
  const seo = resolveSeoMetadata({
    entityData: location,
    routePath: `/locations/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = (await wordPressProvider.asyncGetLocationBySlug(slug)) || wordPressProvider.getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return <LocationTemplate location={location} />;
}
