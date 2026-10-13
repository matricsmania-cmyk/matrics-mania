import { permanentRedirect, notFound } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const locations = await wordPressProvider.asyncGetAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export default async function LegacyLocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (!cleanSlug) {
    notFound();
  }

  // Issue permanent HTTP 308 redirect from /locations/:slug to /:slug/
  permanentRedirect(`/${cleanSlug}/`);
}
