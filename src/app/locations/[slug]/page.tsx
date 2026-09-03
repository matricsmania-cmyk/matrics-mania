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
  const locations = await wordPressProvider.asyncGetAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await wordPressProvider.asyncGetLocationBySlug(slug);
  if (!location) {
    return {
      title: 'Location Not Found | MatricsMania',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const seo = resolveSeoMetadata({
    entityData: location,
    routePath: `/locations/${slug}/`,
  });
  return toNextMetadata(seo);
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await wordPressProvider.asyncGetLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return <LocationTemplate location={location} />;
}
