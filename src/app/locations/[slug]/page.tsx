import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { resolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = mockDataProvider.getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = mockDataProvider.getLocationBySlug(slug);
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
  const location = mockDataProvider.getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return <LocationTemplate location={location} />;
}
