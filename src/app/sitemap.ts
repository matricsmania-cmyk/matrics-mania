import { MetadataRoute } from 'next';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { PUBLIC_DOMAIN } from '@/src/utils/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/about/',
    '/work/',
    '/case-studies/',
    '/services/',
    '/industries/',
    '/locations/',
    '/insights/',
    '/process/',
    '/careers/',
    '/faq/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];

  const now = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${PUBLIC_DOMAIN}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Add services
  const services = mockDataProvider.getAllServices();
  for (const s of services) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/services/${s.slug}/`,
      lastModified: s.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Add industries
  const industries = mockDataProvider.getAllIndustries();
  for (const ind of industries) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/industries/${ind.slug}/`,
      lastModified: ind.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // Add locations
  const locations = mockDataProvider.getAllLocations();
  for (const loc of locations) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/locations/${loc.slug}/`,
      lastModified: loc.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Add case studies
  const caseStudies = mockDataProvider.getAllCaseStudies();
  for (const cs of caseStudies) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/case-studies/${cs.slug}/`,
      lastModified: cs.updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Add insights
  const insights = mockDataProvider.getAllInsights();
  for (const ins of insights) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/insights/${ins.slug}/`,
      lastModified: ins.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.75,
    });
  }

  return routes;
}
