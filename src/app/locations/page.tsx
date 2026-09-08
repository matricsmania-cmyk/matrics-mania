import React from 'react';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('locations-index'));

export default async function LocationsPage() {
  const locations = await wordPressProvider.asyncGetAllLocations();
  const defaultLocation = locations[0] || undefined;

  return <LocationTemplate location={defaultLocation} />;
}
