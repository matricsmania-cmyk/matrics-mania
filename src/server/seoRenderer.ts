import { resolveRoute, RouteMatch } from '../routes/routes';
import { mockDataProvider } from '../providers/MockDataProvider';
import { ContentProvider } from '../providers/ContentProvider';
import { resolveSeoMetadata, getStaticRouteSeo, SEOResolved, PUBLIC_DOMAIN } from '../utils/seo';
import { generateCompleteSchemaGraph } from '../utils/structuredData';

export interface ServerRouteResolution {
  statusCode: 200 | 404 | 500;
  isNotFound: boolean;
  routeId: string;
  seo: SEOResolved;
  schema: Record<string, any>;
  routeMatch: RouteMatch;
}

/**
 * 404 Not Found SEO generator.
 * Strictly outputs `noindex, nofollow` robots directive and 404 Schema.
 */
export function get404SeoMetadata(requestedPath: string): SEOResolved {
  return resolveSeoMetadata({
    title: '404 Page Not Found | Resource Unresolved | MatricsMania',
    description: 'The requested resource or architecture blueprint could not be resolved on the MatricsMania network.',
    canonicalUrl: `${PUBLIC_DOMAIN}${requestedPath}`,
    routePath: requestedPath,
    noindex: true,
    nofollow: true,
  });
}

/**
 * Server-Side Route & SEO Resolver.
 * Performs deterministic validation against content providers and emits exact HTTP status codes.
 */
export function resolveServerRoute(
  requestUrl: string,
  provider: ContentProvider = mockDataProvider
): ServerRouteResolution {
  const routeMatch = resolveRoute(requestUrl);
  const routeId = routeMatch.routeId;
  const slug = routeMatch.params.slug;

  let seo: SEOResolved;
  let schema: Record<string, any>;
  let statusCode: 200 | 404 | 500 = 200;
  let isNotFound = false;

  switch (routeId) {
    case 'service-detail': {
      const service = slug ? provider.getServiceBySlug(slug) : null;
      if (service) {
        seo = resolveSeoMetadata({
          title: service.seo?.seoTitle || `${service.title} | Enterprise Growth Engineering | MatricsMania`,
          description: service.seo?.metaDescription || service.shortDescription || service.excerpt,
          canonicalUrl: service.seo?.canonicalUrl || `${PUBLIC_DOMAIN}/services/${service.slug}/`,
          routePath: `/services/${service.slug}/`,
          ogImage: service.featuredImage || service.seo?.ogImage,
          ogType: 'website',
          cmsSeo: service.seo,
          entityData: service,
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Services', url: `${PUBLIC_DOMAIN}/services/`, position: 2 },
            { name: service.title, url: `${PUBLIC_DOMAIN}/services/${service.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'service',
          breadcrumbs: seo.breadcrumbs,
          entity: service,
        });
      } else {
        // Nonexistent service slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'industry-detail': {
      const industry = slug ? provider.getIndustryBySlug(slug) : null;
      if (industry) {
        seo = resolveSeoMetadata({
          title: industry.seo?.seoTitle || `${industry.title} Growth Systems & Customer Acquisition | MatricsMania`,
          description: industry.seo?.metaDescription || industry.marketSummary || industry.tagline || industry.excerpt,
          canonicalUrl: industry.seo?.canonicalUrl || `${PUBLIC_DOMAIN}/industries/${industry.slug}/`,
          routePath: `/industries/${industry.slug}/`,
          ogImage: industry.featuredImage || industry.seo?.ogImage,
          ogType: 'website',
          cmsSeo: industry.seo,
          entityData: industry,
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Industries', url: `${PUBLIC_DOMAIN}/industries/`, position: 2 },
            { name: industry.title, url: `${PUBLIC_DOMAIN}/industries/${industry.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'industry',
          breadcrumbs: seo.breadcrumbs,
          entity: industry,
        });
      } else {
        // Nonexistent industry slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'location-detail': {
      const location = slug ? provider.getLocationBySlug(slug) : null;
      if (location) {
        seo = resolveSeoMetadata({
          title: location.seo?.seoTitle || `Performance Digital Marketing Agency in ${location.city} | MatricsMania`,
          description: location.seo?.metaDescription || location.localMarketSummary || location.excerpt || `MatricsMania ${location.city} regional hub delivering technical SEO, paid acquisition, and revenue attribution.`,
          canonicalUrl: location.seo?.canonicalUrl || `${PUBLIC_DOMAIN}/locations/${location.slug}/`,
          routePath: `/locations/${location.slug}/`,
          ogImage: location.featuredImage || location.seo?.ogImage,
          ogType: 'business.business',
          cmsSeo: location.seo,
          entityData: location,
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Locations', url: `${PUBLIC_DOMAIN}/locations/`, position: 2 },
            { name: location.city, url: `${PUBLIC_DOMAIN}/locations/${location.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'location',
          breadcrumbs: seo.breadcrumbs,
          entity: location,
        });
      } else {
        // Nonexistent location slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'insight-detail': {
      const insight = slug ? provider.getInsightBySlug(slug) : null;
      if (insight) {
        seo = resolveSeoMetadata({
          title: insight.seo?.seoTitle || `${insight.title} | Research & Insights | MatricsMania`,
          description: insight.seo?.metaDescription || insight.excerpt || insight.standfirst,
          canonicalUrl: insight.seo?.canonicalUrl || `${PUBLIC_DOMAIN}/insights/${insight.slug}/`,
          routePath: `/insights/${insight.slug}/`,
          ogImage: insight.featuredImage || insight.seo?.ogImage,
          ogType: 'article',
          publishedAt: insight.publishedAt,
          updatedAt: insight.updatedAt,
          authorName: insight.author?.name,
          category: insight.category,
          tags: insight.tags,
          cmsSeo: insight.seo,
          entityData: insight,
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Insights', url: `${PUBLIC_DOMAIN}/insights/`, position: 2 },
            { name: insight.title, url: `${PUBLIC_DOMAIN}/insights/${insight.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'insight',
          breadcrumbs: seo.breadcrumbs,
          entity: insight,
        });
      } else {
        // Nonexistent insight slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'case-study-detail': {
      const caseStudy = slug ? provider.getCaseStudyBySlug(slug) : null;
      if (caseStudy) {
        seo = resolveSeoMetadata({
          title: caseStudy.seo?.seoTitle || `${caseStudy.title} - Growth Case Study | MatricsMania`,
          description: caseStudy.seo?.metaDescription || caseStudy.executiveSummary || caseStudy.heroHeadline || caseStudy.excerpt,
          canonicalUrl: caseStudy.seo?.canonicalUrl || `${PUBLIC_DOMAIN}/case-studies/${caseStudy.slug}/`,
          routePath: `/case-studies/${caseStudy.slug}/`,
          ogImage: caseStudy.featuredImage || caseStudy.seo?.ogImage,
          ogType: 'article',
          cmsSeo: caseStudy.seo,
          entityData: caseStudy,
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Case Studies', url: `${PUBLIC_DOMAIN}/case-studies/`, position: 2 },
            { name: caseStudy.clientName || caseStudy.title, url: `${PUBLIC_DOMAIN}/case-studies/${caseStudy.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'case-study',
          breadcrumbs: seo.breadcrumbs,
          entity: caseStudy,
          cmsStructuredData: caseStudy.seo?.structuredData,
        });
      } else {
        // Nonexistent case-study slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'author-detail': {
      const author = slug ? provider.getAuthorBySlug(slug) : null;
      if (author) {
        seo = resolveSeoMetadata({
          title: `${author.name} - ${author.role} | Research & Leadership | MatricsMania`,
          description: author.shortBio || author.bio || `Profile and growth engineering publications by ${author.name} at MatricsMania.`,
          canonicalUrl: `${PUBLIC_DOMAIN}/authors/${author.slug}/`,
          routePath: `/authors/${author.slug}/`,
          ogImage: author.avatar,
          ogType: 'profile',
          breadcrumbs: [
            { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
            { name: 'Authors & Leadership', url: `${PUBLIC_DOMAIN}/about/`, position: 2 },
            { name: author.name, url: `${PUBLIC_DOMAIN}/authors/${author.slug}/`, position: 3, isCurrentPage: true },
          ],
        });
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'profile',
          breadcrumbs: seo.breadcrumbs,
          author: author,
        });
      } else {
        // Nonexistent author slug -> HTTP 404
        statusCode = 404;
        isNotFound = true;
        seo = get404SeoMetadata(routeMatch.pathname);
        schema = generateCompleteSchemaGraph({
          canonicalUrl: seo.canonicalUrl,
          title: seo.title,
          description: seo.description,
          pageType: 'home',
          breadcrumbs: [],
        });
      }
      break;
    }

    case 'faq': {
      seo = getStaticRouteSeo('faq', requestUrl);
      const allFaqs = provider.getAllFAQs();
      schema = generateCompleteSchemaGraph({
        canonicalUrl: seo.canonicalUrl,
        title: seo.title,
        description: seo.description,
        pageType: 'faq',
        breadcrumbs: seo.breadcrumbs,
        faqs: allFaqs,
      });
      break;
    }

    case 'not-found': {
      statusCode = 404;
      isNotFound = true;
      seo = get404SeoMetadata(routeMatch.pathname);
      schema = generateCompleteSchemaGraph({
        canonicalUrl: seo.canonicalUrl,
        title: seo.title,
        description: seo.description,
        pageType: 'home',
        breadcrumbs: [],
      });
      break;
    }

    default: {
      seo = getStaticRouteSeo(routeId, requestUrl);
      schema = generateCompleteSchemaGraph({
        canonicalUrl: seo.canonicalUrl,
        title: seo.title,
        description: seo.description,
        pageType: (routeId as any) || 'home',
        breadcrumbs: routeId === 'home' ? [] : seo.breadcrumbs,
      });
      break;
    }
  }

  return { statusCode, isNotFound, routeId, seo, schema, routeMatch };
}

/**
 * Backward-compatible resolver export
 */
export function resolveServerSeoForUrl(requestUrl: string): {
  seo: SEOResolved;
  schema: Record<string, any>;
  routeId: string;
} {
  const result = resolveServerRoute(requestUrl);
  return { seo: result.seo, schema: result.schema, routeId: result.routeId };
}

/**
 * Injects Server-Rendered Meta Tags and Structured Data into index.html
 */
export function injectServerSeoIntoHtml(
  htmlTemplate: string,
  requestUrl: string,
  provider: ContentProvider = mockDataProvider
): { html: string; statusCode: 200 | 404 | 500; isNotFound: boolean } {
  const resolution = resolveServerRoute(requestUrl, provider);
  const { seo, schema, statusCode, isNotFound } = resolution;
  let html = htmlTemplate;

  const escape = (str: string = '') =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  // 1. Update Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escape(seo.title)}</title>`);

  // 2. Update Meta Description
  if (html.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escape(seo.description)}" />`);
  }

  // 3. Update Meta Title
  if (html.includes('name="title"')) {
    html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${escape(seo.title)}" />`);
  }

  // 4. Update Robots
  if (html.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="${escape(seo.robotsString)}" />`);
  } else {
    html = html.replace('</head>', `    <meta name="robots" content="${escape(seo.robotsString)}" />\n  </head>`);
  }

  // 5. Update Canonical Link
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escape(seo.canonicalUrl)}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${escape(seo.canonicalUrl)}" />\n  </head>`);
  }

  // 6. Update OpenGraph Tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escape(seo.openGraph.title)}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escape(seo.openGraph.description)}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${escape(seo.openGraph.url)}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${escape(seo.openGraph.image)}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${escape(seo.openGraph.type)}" />`);

  // 7. Update Twitter Tags
  html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:title" content="${escape(seo.twitter.title)}" />`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${escape(seo.twitter.description)}" />`);
  html = html.replace(/<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:image" content="${escape(seo.twitter.image)}" />`);
  html = html.replace(/<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:url" content="${escape(seo.canonicalUrl)}" />`);

  // 8. Replace JSON-LD Structured Data Schema
  const schemaJson = JSON.stringify(schema, null, 2);
  const schemaScriptTag = `<script type="application/ld+json" id="matricsmania-structured-data">\n${schemaJson}\n    </script>`;

  if (html.includes('<script type="application/ld+json">') || html.includes('id="matricsmania-structured-data"')) {
    html = html.replace(
      /<script\s+type="application\/ld\+json"(?:\s+id="[^"]*")?>[\s\S]*?<\/script>/i,
      schemaScriptTag
    );
  } else {
    html = html.replace('</head>', `    ${schemaScriptTag}\n  </head>`);
  }

  return { html, statusCode, isNotFound };
}
