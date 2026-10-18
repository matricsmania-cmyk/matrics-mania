import { permanentRedirect, notFound } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const locations = await wordPressProvider.asyncGetAllLocations();
  const slugs = new Set<string>();
  for (const l of locations) {
    if (l.slug) slugs.add(l.slug.toLowerCase());
    if (l.city) slugs.add(l.city.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    if (l.seo?.canonicalUrl) {
      try {
        const canonicalSlug = new URL(l.seo.canonicalUrl).pathname.replace(/^\/+|\/+$/g, '').split('/').pop();
        if (canonicalSlug) slugs.add(canonicalSlug.toLowerCase());
      } catch {}
    }
    if (l.slug.includes('bangalore') || l.city?.toLowerCase() === 'bangalore') {
      slugs.add('bangalore');
      slugs.add('banglore');
    }
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function LegacyLocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (!cleanSlug) {
    notFound();
  }

  // Verify the target actually resolves to an authoritative published location
  const location = await wordPressProvider.asyncGetLocationBySlug(cleanSlug);
  if (!location) {
    notFound();
  }

  // Issue permanent HTTP 308 redirect from legacy /locations/:slug to root-level /:slug
  permanentRedirect(`/${cleanSlug}`);
}
