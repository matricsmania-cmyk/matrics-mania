import React from 'react';
import { LocationTemplate } from '@/src/templates/LocationTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('locations-index'));

export default function LocationsPage() {
  const locations = mockDataProvider.getAllLocations();
  const defaultLocation = locations[0] || undefined;

  return <LocationTemplate location={defaultLocation} />;
}
