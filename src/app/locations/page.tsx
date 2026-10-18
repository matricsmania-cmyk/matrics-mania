import React from 'react';
import { Metadata } from 'next';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { LocationsIndexTemplate } from '@/src/templates/LocationsIndexTemplate';
import { asyncResolveSeoMetadata } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await asyncResolveSeoMetadata({
    routePath: '/locations/',
    cmsSourceUrl: '/locations/',
    title: 'Global Operating Hubs & Engineering Labs | MatricsMania',
    description: 'Explore MatricsMania regional nodes and engineering offices across Bangalore, London, and global telemetry hubs.',
  });
  return toNextMetadata(seo);
}

export default async function LocationsPage() {
  const locations = await wordPressProvider.asyncGetAllLocations();
  return <LocationsIndexTemplate locations={locations} />;
}
