import { permanentRedirect, notFound } from 'next/navigation';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await wordPressProvider.asyncGetAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function LegacyServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  if (!cleanSlug) {
    notFound();
  }

  // Issue permanent HTTP 308 redirect from /services/:slug to /:slug/
  permanentRedirect(`/${cleanSlug}/`);
}
