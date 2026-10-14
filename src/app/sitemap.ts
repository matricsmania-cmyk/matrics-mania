import { MetadataRoute } from 'next';
import { wordPressProvider } from '../providers/WordPressProvider';
import { PUBLIC_DOMAIN } from '../utils/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/blog/',
    '/about/',
    '/work/',
    '/case-studies/',
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

  // Add services from WordPress
  const services = await wordPressProvider.asyncGetAllServices();
  for (const s of services) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/${s.slug}/`,
      lastModified: s.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Add industries from WordPress
  const industries = await wordPressProvider.asyncGetAllIndustries();
  for (const ind of industries) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/${ind.slug}/`,
      lastModified: ind.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // Add locations from WordPress
  const locations = await wordPressProvider.asyncGetAllLocations();
  for (const loc of locations) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/${loc.slug}/`,
      lastModified: loc.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Add case studies from WordPress
  const caseStudies = await wordPressProvider.asyncGetAllCaseStudies();
  for (const cs of caseStudies) {
    routes.push({
      url: `${PUBLIC_DOMAIN}/case-studies/${cs.slug}/`,
      lastModified: cs.updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Add WordPress Posts (Blog / Insights) at root level
  const insights = await wordPressProvider.asyncGetAllInsights();
  for (const ins of insights) {
    if (ins.slug) {
      routes.push({
        url: `${PUBLIC_DOMAIN}/${ins.slug}/`,
        lastModified: ins.updatedAt || now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  return routes;
}
