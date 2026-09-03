import { ContentProvider } from '../providers/ContentProvider';
import { wordPressProvider } from '../providers/WordPressProvider';
import { PUBLIC_DOMAIN } from './seo';

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Normalizes a date string or timestamp to W3C YYYY-MM-DD format.
 */
export function formatW3CDate(dateInput?: string | number | Date): string {
  if (!dateInput) {
    return new Date().toISOString().split('T')[0];
  }
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split('T')[0];
    }
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Normalizes and validates a canonical URL for inclusion in the sitemap.
 * Returns null if the URL is non-canonical, excluded, or invalid.
 */
export function sanitizeSitemapUrl(rawUrl: string, host: string = PUBLIC_DOMAIN): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  const cleanHost = host.replace(/\/+$/, '');
  let path = rawUrl.trim();

  // Strip host if included
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const parsed = new URL(path);
      // Strictly exclude any CMS domains (e.g. cms.matricsmania.com, staging.matricsmania.com)
      if (parsed.hostname.includes('cms.') || parsed.hostname.includes('admin.')) {
        return null;
      }
      path = parsed.pathname;
    } catch {
      return null;
    }
  }

  // Strip query parameters and hashes
  path = path.split('?')[0].split('#')[0].trim();

  // Exclude non-public, preview, CMS, and API routes
  const excludedPatterns = [
    /^\/api\//i,
    /^\/admin\//i,
    /^\/wp-admin\//i,
    /^\/wp-login/i,
    /^\/wp-json\//i,
    /^\/preview\//i,
    /^\/draft\//i,
    /^\/staging\//i,
    /^\/private\//i,
    /^\/404\/?$/i,
    /^\/500\/?$/i,
  ];

  if (excludedPatterns.some((pattern) => pattern.test(path))) {
    return null;
  }

  // Ensure standard leading and trailing slashes
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (path !== '/' && !path.endsWith('/')) {
    path = path + '/';
  }

  return `${cleanHost}${path}`;
}

/**
 * Generates the complete list of indexable, canonical sitemap entries.
 * 
 * Works seamlessly with WordPressProvider headless CMS.
 */
export async function getSitemapEntries(
  provider: ContentProvider = wordPressProvider,
  host: string = PUBLIC_DOMAIN
): Promise<SitemapUrlEntry[]> {
  const entriesMap = new Map<string, SitemapUrlEntry>();

  const addEntry = (entry: SitemapUrlEntry) => {
    const canonicalLoc = sanitizeSitemapUrl(entry.loc, host);
    if (!canonicalLoc) return;

    // Deduplicate: if exists, keep the higher priority
    const existing = entriesMap.get(canonicalLoc);
    if (!existing || (entry.priority ?? 0.5) > (existing.priority ?? 0.5)) {
      entriesMap.set(canonicalLoc, {
        loc: canonicalLoc,
        lastmod: formatW3CDate(entry.lastmod),
        changefreq: entry.changefreq || 'monthly',
        priority: typeof entry.priority === 'number' ? Math.min(1.0, Math.max(0.1, entry.priority)) : 0.5,
      });
    }
  };

  const defaultUpdatedDate = '2026-08-01';

  // 1. Static Core Landing Pages
  const staticCorePages: Array<{ path: string; changefreq: SitemapUrlEntry['changefreq']; priority: number }> = [
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/services/', changefreq: 'weekly', priority: 0.9 },
    { path: '/industries/', changefreq: 'weekly', priority: 0.9 },
    { path: '/case-studies/', changefreq: 'weekly', priority: 0.9 },
    { path: '/insights/', changefreq: 'daily', priority: 0.9 },
    { path: '/locations/', changefreq: 'weekly', priority: 0.8 },
    { path: '/about/', changefreq: 'monthly', priority: 0.8 },
    { path: '/work/', changefreq: 'weekly', priority: 0.8 },
    { path: '/process/', changefreq: 'monthly', priority: 0.7 },
    { path: '/faq/', changefreq: 'monthly', priority: 0.7 },
    { path: '/contact/', changefreq: 'monthly', priority: 0.8 },
    { path: '/careers/', changefreq: 'monthly', priority: 0.6 },
    { path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms/', changefreq: 'yearly', priority: 0.3 },
  ];

  staticCorePages.forEach((p) => {
    addEntry({
      loc: `${host}${p.path}`,
      lastmod: defaultUpdatedDate,
      changefreq: p.changefreq,
      priority: p.priority,
    });
  });

  // 2. Generic Pages from ContentProvider
  try {
    const allPages = provider.getAllPages ? provider.getAllPages() : [];
    allPages.forEach((page) => {
      if (page.status && page.status !== 'published') return;
      if (page.seo?.robotsIndex === false) return;

      const slugPath = page.slug === 'home' || page.slug === '' ? '/' : `/${page.slug}/`;
      addEntry({
        loc: `${host}${slugPath}`,
        lastmod: page.updatedAt || page.publishedAt || defaultUpdatedDate,
        changefreq: 'monthly',
        priority: 0.7,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching pages:', err);
  }

  // 3. Services from ContentProvider
  try {
    const allServices = provider.getAllServices ? provider.getAllServices() : [];
    allServices.forEach((service) => {
      if (service.status && service.status !== 'published') return;
      if (service.seo?.robotsIndex === false) return;

      addEntry({
        loc: `${host}/services/${service.slug}/`,
        lastmod: service.updatedAt || service.publishedAt || defaultUpdatedDate,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching services:', err);
  }

  // 4. Industries from ContentProvider
  try {
    const allIndustries = provider.getAllIndustries ? provider.getAllIndustries() : [];
    allIndustries.forEach((industry) => {
      if (industry.status && industry.status !== 'published') return;
      if (industry.seo?.robotsIndex === false) return;

      addEntry({
        loc: `${host}/industries/${industry.slug}/`,
        lastmod: industry.updatedAt || industry.publishedAt || defaultUpdatedDate,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching industries:', err);
  }

  // 5. Locations from ContentProvider
  try {
    const allLocations = provider.getAllLocations ? provider.getAllLocations() : [];
    allLocations.forEach((location) => {
      if (location.status && location.status !== 'published') return;
      if (location.seo?.robotsIndex === false) return;

      addEntry({
        loc: `${host}/locations/${location.slug}/`,
        lastmod: location.updatedAt || location.publishedAt || defaultUpdatedDate,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching locations:', err);
  }

  // 6. Insights from ContentProvider
  try {
    const allInsights = provider.getAllInsights ? provider.getAllInsights() : [];
    allInsights.forEach((insight) => {
      if (insight.status && insight.status !== 'published') return;
      if (insight.seo?.robotsIndex === false) return;

      addEntry({
        loc: `${host}/insights/${insight.slug}/`,
        lastmod: insight.updatedAt || insight.publishedAt || defaultUpdatedDate,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching insights:', err);
  }

  // 7. Case Studies from ContentProvider
  try {
    const allCaseStudies = provider.getAllCaseStudies ? provider.getAllCaseStudies() : [];
    allCaseStudies.forEach((caseStudy) => {
      if (caseStudy.status && caseStudy.status !== 'published') return;
      if (caseStudy.seo?.robotsIndex === false) return;

      addEntry({
        loc: `${host}/case-studies/${caseStudy.slug}/`,
        lastmod: caseStudy.updatedAt || caseStudy.publishedAt || defaultUpdatedDate,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching case studies:', err);
  }

  // 8. Authors from ContentProvider
  try {
    const allAuthors = provider.getAllAuthors ? provider.getAllAuthors() : [];
    allAuthors.forEach((author) => {
      addEntry({
        loc: `${host}/authors/${author.slug}/`,
        lastmod: defaultUpdatedDate,
        changefreq: 'monthly',
        priority: 0.6,
      });
    });
  } catch (err) {
    console.warn('[Sitemap] Error fetching authors:', err);
  }

  return Array.from(entriesMap.values());
}

/**
 * Builds the canonical sitemap.xml string according to the Sitemap Protocol 0.9.
 */
export async function generateSitemapXml(
  provider: ContentProvider = wordPressProvider,
  host: string = PUBLIC_DOMAIN
): Promise<string> {
  const entries = await getSitemapEntries(provider, host);

  const urlElements = entries
    .map((entry) => {
      return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority?.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}
