import React from 'react';
import { LocationsIndexTemplate } from '@/src/templates/LocationsIndexTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 300;

export const metadata = toNextMetadata(getStaticRouteSeo('locations-index'));

export default async function LocationsPage() {
  const locations = await wordPressProvider.asyncGetAllLocations();
  return <LocationsIndexTemplate locations={locations} />;
}
