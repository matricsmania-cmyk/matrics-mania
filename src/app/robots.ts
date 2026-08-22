import { MetadataRoute } from 'next';
import { PUBLIC_DOMAIN } from '@/src/utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${PUBLIC_DOMAIN}/sitemap.xml`,
  };
}
