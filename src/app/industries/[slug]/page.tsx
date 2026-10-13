import { permanentRedirect, notFound } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const industries = await wordPressProvider.asyncGetAllIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function LegacyIndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (!cleanSlug) {
    notFound();
  }

  // Issue permanent HTTP 308 redirect from /industries/:slug to /:slug/
  permanentRedirect(`/${cleanSlug}/`);
}
