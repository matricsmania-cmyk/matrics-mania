import { Media } from '../models/media';
import { SEO, RobotsDirectives } from '../models/seo';
import { BreadcrumbItem } from '../models/breadcrumb';

/**
 * Global Domain Constants
 */
export const PUBLIC_DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matricsmania.com').replace(/\/$/, '');
export const CMS_DOMAIN = (process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || 'https://cms.matricsmania.com').replace(/\/$/, '');
export const DEFAULT_SITE_NAME = 'MatricsMania';
export const DEFAULT_LOCALE = 'en_IN';
export const DEFAULT_LANG = 'en-IN';
export const TWITTER_SITE_HANDLE = '@matricsmania';
export const TWITTER_CREATOR_HANDLE = '@matricsmania';

export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
export const DEFAULT_FAVICON_DARK = '/matrics-mania-logo-dark.webp';
export const DEFAULT_FAVICON_LIGHT = '/matrics-mania-logo-light.webp';
export const DEFAULT_THEME_COLOR = '#0136BD';

export const DEFAULT_TITLE =
  "MatricsMania - India's #1 Performance Digital Marketing Agency | SEO, PPC & Growth";
export const DEFAULT_DESCRIPTION =
  "MatricsMania is India's leading performance digital marketing agency specializing in 100% On-Page SEO, high-ROAS PPC advertising, CRO web development, and real-time revenue attribution engines.";
export const DEFAULT_KEYWORDS = [
  'digital marketing agency india',
  'performance marketing agency',
  'best SEO agency in india',
  'PPC management india',
  'CRO web development',
  'growth marketing agency',
  'bangalore seo agency',
  'ai search optimization',
  'revenue attribution',
];

/**
 * Resolved SEO payload ready for client-side injection and server-side SSR insertion
 */
export interface SEOResolved {
  title: string;
  metaTitle: string;
  description: string;
  canonicalUrl: string;
  robotsString: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  robotsDirectives: RobotsDirectives;
  keywords: string[];
  lang: string;
  locale: string;
  themeColor: string;
  faviconDark: string;
  faviconLight: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: 'website' | 'article' | 'profile' | 'business.business';
    siteName: string;
    locale: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    site: string;
    creator: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  alternateLanguages: {
    hrefLang: string;
    href: string;
  }[];
  breadcrumbs: BreadcrumbItem[];
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  rawCmsSeo?: Partial<SEO>;
}

/**
 * Universal Input for any route, template, or component providing SEO data.
 * Can be static, dynamic, or from a future CMS API response.
 */
export interface SEOMetadataInput {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  routePath?: string;
  slug?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsDirectives?: Partial<RobotsDirectives>;
  ogType?: 'website' | 'article' | 'profile' | 'business.business';
  ogImage?: string | Media;
  ogTitle?: string;
  ogDescription?: string;
  twitterImage?: string | Media;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[] | string;
  lang?: string;
  locale?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  cmsSeo?: Partial<SEO>;
  entityData?: {
    title?: string;
    name?: string;
    excerpt?: string;
    shortDescription?: string;
    featuredImage?: string | Media;
    publishedAt?: string;
    updatedAt?: string;
    author?: { name: string };
    category?: string;
    tags?: string[];
    seo?: Partial<SEO>;
    [key: string]: any;
  };
}

/**
 * Canonical URL Normalization
 * 
 * Strict Rules:
 * 1. Always uses the public domain (https://matricsmania.com).
 * 2. Replaces any staging, localhost, or CMS domains (e.g. cms.matricsmania.com).
 * 3. Strips query parameters, tracking parameters (utm_*, gclid, etc.), and hash fragments.
 * 4. Ensures lowercase path and standard trailing slash.
 */
export function normalizeCanonicalUrl(rawUrl?: string, pathFallback: string = '/'): string {
  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim() === '') {
    return buildPublicUrlFromPath(pathFallback);
  }

  let cleaned = rawUrl.trim();

  // Strip hash fragment
  if (cleaned.includes('#')) {
    cleaned = cleaned.split('#')[0];
  }

  // Strip query parameters
  if (cleaned.includes('?')) {
    cleaned = cleaned.split('?')[0];
  }

  // Replace CMS domain or localhost with public domain
  cleaned = cleaned
    .replace(/^https?:\/\/cms\.matricsmania\.com/i, PUBLIC_DOMAIN)
    .replace(/^https?:\/\/localhost(:\d+)?/i, PUBLIC_DOMAIN)
    .replace(/^https?:\/\/127\.0\.0\.1(:\d+)?/i, PUBLIC_DOMAIN)
    .replace(/^https?:\/\/ais-[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+\.run\.app/i, PUBLIC_DOMAIN);

  // If it's a relative path, prefix with public domain
  if (cleaned.startsWith('/')) {
    return buildPublicUrlFromPath(cleaned);
  }

  // If it starts with https://matricsmania.com or other protocol
  try {
    const urlObj = new URL(cleaned);
    let pathname = urlObj.pathname;
    
    // Normalize path to have leading and trailing slash
    if (!pathname.startsWith('/')) pathname = '/' + pathname;
    if (pathname !== '/' && !pathname.endsWith('/')) pathname = pathname + '/';

    return `${PUBLIC_DOMAIN}${pathname.toLowerCase()}`;
  } catch {
    return buildPublicUrlFromPath(cleaned);
  }
}

/**
 * Helper to build public canonical URL from a pathname
 */
export function buildPublicUrlFromPath(path: string = '/'): string {
  let cleaned = path.trim();
  if (cleaned.startsWith('#')) cleaned = cleaned.replace(/^#\/?/, '/');
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  if (cleaned !== '/' && !cleaned.endsWith('/')) cleaned = cleaned + '/';
  return `${PUBLIC_DOMAIN}${cleaned.toLowerCase()}`;
}

/**
 * Normalizes Media or image URL into an absolute HTTPS image URL
 */
export function resolveAbsoluteImageUrl(image?: string | Media, fallback: string = DEFAULT_OG_IMAGE): string {
  if (!image) return fallback;

  let url = '';
  if (typeof image === 'string') {
    url = image.trim();
  } else if (image && typeof image === 'object') {
    url = image.url || image.sizes?.full?.url || image.sizes?.large?.url || '';
  }

  if (!url) return fallback;

  // Relative URLs
  if (url.startsWith('/')) {
    return `${PUBLIC_DOMAIN}${url}`;
  }

  // Replace localhost or CMS domain
  if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) {
    return fallback;
  }

  return url;
}

/**
 * Builds standard robots meta directive string
 */
export function buildRobotsContentString(directives: RobotsDirectives): string {
  if (!directives.index && !directives.follow) {
    return 'noindex, nofollow';
  }
  if (!directives.index && directives.follow) {
    return 'noindex, follow';
  }
  if (directives.index && !directives.follow) {
    return 'index, nofollow';
  }

  const parts: string[] = ['index', 'follow'];
  if (directives.maxImagePreview) {
    parts.push(`max-image-preview:${directives.maxImagePreview}`);
  } else {
    parts.push('max-image-preview:large');
  }
  if (directives.maxSnippet !== undefined) {
    parts.push(`max-snippet:${directives.maxSnippet}`);
  } else {
    parts.push('max-snippet:-1');
  }
  if (directives.maxVideoPreview !== undefined) {
    parts.push(`max-video-preview:${directives.maxVideoPreview}`);
  } else {
    parts.push('max-video-preview:-1');
  }
  if (directives.noarchive) parts.push('noarchive');
  if (directives.nosnippet) parts.push('nosnippet');
  if (directives.noimageindex) parts.push('noimageindex');

  return parts.join(', ');
}

/**
 * Builds breadcrumbs trail from path if not explicitly provided
 */
export function buildBreadcrumbsFromPath(path: string = '/'): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: `${PUBLIC_DOMAIN}/`, position: 1 },
  ];

  const segments = path.split('/').filter(Boolean);
  let accumulatedPath = '';

  segments.forEach((seg, idx) => {
    accumulatedPath += `/${seg}/`;
    const position = idx + 2;
    const isCurrentPage = idx === segments.length - 1;

    let formattedName = seg
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    if (seg === 'services') formattedName = 'Services';
    if (seg === 'industries') formattedName = 'Industries';
    if (seg === 'insights' || seg === 'blog') formattedName = 'Insights';
    if (seg === 'locations') formattedName = 'Locations';
    if (seg === 'case-studies') formattedName = 'Case Studies';
    if (seg === 'about') formattedName = 'About';
    if (seg === 'work') formattedName = 'Work';
    if (seg === 'process') formattedName = 'Process';
    if (seg === 'careers') formattedName = 'Careers';
    if (seg === 'faq') formattedName = 'FAQ';
    if (seg === 'contact') formattedName = 'Contact';

    items.push({
      name: formattedName,
      url: `${PUBLIC_DOMAIN}${accumulatedPath}`,
      position,
      isCurrentPage,
    });
  });

  return items;
}

/**
 * Central SEO Metadata Resolution Engine
 * 
 * Resolves static, dynamic, CMS-provided, and fallback metadata into a single
 * deterministic SEOResolved structure.
 */
export function resolveSeoMetadata(input: SEOMetadataInput = {}): SEOResolved {
  const cms = input.cmsSeo || input.entityData?.seo || {};
  const entity = input.entityData || {};

  // 1. Resolve Title
  const rawTitle =
    input.title ||
    cms.seoTitle ||
    (entity.title ? `${entity.title} | MatricsMania` : '') ||
    (entity.name ? `${entity.name} | MatricsMania` : '') ||
    DEFAULT_TITLE;

  const title = rawTitle.includes('MatricsMania') || rawTitle.includes('Matricsmania')
    ? rawTitle
    : `${rawTitle} | MatricsMania`;

  // 2. Resolve Description
  const description =
    input.description ||
    cms.metaDescription ||
    entity.excerpt ||
    entity.shortDescription ||
    DEFAULT_DESCRIPTION;

  // 3. Resolve Path & Canonical URL
  const routePath = input.routePath || (entity.slug ? `/${entity.slug}/` : '/');
  const canonicalUrl = normalizeCanonicalUrl(
    input.canonicalUrl || cms.canonicalUrl,
    routePath
  );

  // 4. Resolve Robots Directives
  const isNoIndex =
    input.noindex === true ||
    cms.robotsIndex === false ||
    cms.robotsDirectives?.index === false;

  const isNoFollow =
    input.nofollow === true ||
    cms.robotsFollow === false ||
    cms.robotsDirectives?.follow === false;

  const robotsDirectives: RobotsDirectives = {
    index: !isNoIndex,
    follow: !isNoFollow,
    maxImagePreview: cms.robotsDirectives?.maxImagePreview || 'large',
    maxSnippet: cms.robotsDirectives?.maxSnippet ?? -1,
    maxVideoPreview: cms.robotsDirectives?.maxVideoPreview ?? -1,
    noarchive: cms.robotsDirectives?.noarchive || false,
    nosnippet: cms.robotsDirectives?.nosnippet || false,
    noimageindex: cms.robotsDirectives?.noimageindex || false,
    ...input.robotsDirectives,
  };

  const robotsString = buildRobotsContentString(robotsDirectives);

  // 5. Resolve Open Graph
  const ogTitle = input.ogTitle || cms.ogTitle || cms.openGraph?.title || title;
  const ogDescription =
    input.ogDescription ||
    cms.ogDescription ||
    cms.openGraph?.description ||
    description;
  const ogImage = resolveAbsoluteImageUrl(
    input.ogImage || cms.ogImage || cms.openGraph?.image || entity.featuredImage
  );
  const ogType = input.ogType || cms.openGraph?.type || (input.category || entity.category ? 'article' : 'website');

  // 6. Resolve Twitter / X
  const twitterTitle =
    input.twitterTitle || cms.twitterTitle || cms.twitter?.title || ogTitle;
  const twitterDescription =
    input.twitterDescription ||
    cms.twitterDescription ||
    cms.twitter?.description ||
    ogDescription;
  const twitterImage = resolveAbsoluteImageUrl(
    input.twitterImage || cms.twitterImage || cms.twitter?.image || ogImage
  );
  const rawTwitterCard = input.twitterCard || cms.twitter?.card || 'summary_large_image';
  const twitterCard: 'summary' | 'summary_large_image' =
    rawTwitterCard === 'summary' ? 'summary' : 'summary_large_image';

  // 7. Resolve Keywords
  let keywords: string[] = [];
  if (Array.isArray(input.keywords)) {
    keywords = input.keywords;
  } else if (typeof input.keywords === 'string') {
    keywords = input.keywords.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (cms.metaKeywords && cms.metaKeywords.length > 0) {
    keywords = cms.metaKeywords;
  } else if (entity.tags && Array.isArray(entity.tags)) {
    keywords = entity.tags;
  } else {
    keywords = DEFAULT_KEYWORDS;
  }

  // 8. Breadcrumbs
  const breadcrumbs = input.breadcrumbs || buildBreadcrumbsFromPath(routePath);

  // 9. Alternate Languages
  const alternateLanguages = cms.alternateLanguages || [
    { hrefLang: 'en-IN', href: canonicalUrl },
    { hrefLang: 'x-default', href: canonicalUrl },
  ];

  return {
    title,
    metaTitle: title,
    description,
    canonicalUrl,
    robotsString,
    robotsIndex: robotsDirectives.index,
    robotsFollow: robotsDirectives.follow,
    robotsDirectives,
    keywords,
    lang: input.lang || DEFAULT_LANG,
    locale: input.locale || cms.openGraph?.locale || DEFAULT_LOCALE,
    themeColor: DEFAULT_THEME_COLOR,
    faviconDark: DEFAULT_FAVICON_DARK,
    faviconLight: DEFAULT_FAVICON_LIGHT,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      type: ogType,
      siteName: cms.openGraph?.siteName || DEFAULT_SITE_NAME,
      locale: input.locale || cms.openGraph?.locale || DEFAULT_LOCALE,
      image: ogImage,
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: ogTitle,
      publishedTime: input.publishedAt || entity.publishedAt,
      modifiedTime: input.updatedAt || entity.updatedAt,
      author: input.authorName || (typeof entity.author === 'string' ? entity.author : entity.author?.name),
      section: input.category || entity.category,
      tags: input.tags || entity.tags,
    },
    twitter: {
      card: twitterCard,
      site: TWITTER_SITE_HANDLE,
      creator: TWITTER_CREATOR_HANDLE,
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
      imageAlt: twitterTitle,
    },
    alternateLanguages,
    breadcrumbs,
    structuredData: input.structuredData || cms.structuredData,
    rawCmsSeo: cms,
  };
}

/**
 * Built-in static route SEO resolver
 */
export function getStaticRouteSeo(routeId: string, pathname: string = '/'): SEOResolved {
  switch (routeId) {
    case 'home':
      return resolveSeoMetadata({
        title: "MatricsMania - India's #1 Performance Digital Marketing Agency | SEO, PPC & Growth",
        description: "MatricsMania is India's leading performance digital marketing agency specializing in 100% On-Page SEO, high-ROAS PPC advertising, CRO web development, and real-time revenue attribution engines.",
        routePath: '/',
      });
    case 'about':
      return resolveSeoMetadata({
        title: 'About MatricsMania | Performance Marketing & Search Architecture Agency',
        description: 'Learn about MatricsMania, our data-driven growth methodology, leadership team, and track record delivering predictable enterprise revenue.',
        routePath: '/about/',
      });
    case 'work':
      return resolveSeoMetadata({
        title: 'Client Work & Growth Evidence | MatricsMania Portfolio',
        description: 'Explore verified growth engineering outcomes, SEO organic traffic scale, and multi-million dollar revenue transformations delivered by MatricsMania.',
        routePath: '/work/',
      });
    case 'case-studies-index':
      return resolveSeoMetadata({
        title: 'Enterprise Growth Case Studies | Verified Revenue Impact | MatricsMania',
        description: 'In-depth B2B SaaS, D2C, and enterprise growth case studies detailing attribution models, crawl telemetry, and high-ROAS customer acquisition.',
        routePath: '/case-studies/',
      });
    case 'services-index':
      return resolveSeoMetadata({
        title: 'Performance Marketing & Technical Growth Services | MatricsMania',
        description: 'Full-spectrum growth engineering services: Technical SEO, High-ROAS Paid Acquisition, CRO Web Development, and Server-Side Attribution Intelligence.',
        routePath: '/services/',
      });
    case 'industries-index':
      return resolveSeoMetadata({
        title: 'Industry-Specific Growth Frameworks | MatricsMania',
        description: 'Tailored customer acquisition and search engine dominance frameworks for B2B SaaS, HealthTech, FinTech, Real Estate, and High-Growth E-Commerce.',
        routePath: '/industries/',
      });
    case 'locations-index':
      return resolveSeoMetadata({
        title: 'Operating Locations & Regional Hubs | MatricsMania',
        description: 'MatricsMania regional engineering hubs delivering enterprise SEO and revenue attribution in Bangalore, Mumbai, and Delhi NCR.',
        routePath: '/locations/',
      });
    case 'insights-index':
      return resolveSeoMetadata({
        title: 'Growth Engineering Research & Insights | MatricsMania',
        description: 'Proprietary research papers on AI search engine optimization, full-funnel attribution mathematics, log-file crawl telemetry, and conversion testing.',
        routePath: '/insights/',
      });
    case 'process':
      return resolveSeoMetadata({
        title: 'The MatricsMania 5-Phase Growth Engineering Process',
        description: 'Understand our deterministic 5-stage growth framework: Diagnostic Audit, Architecture Sprint, Execution Sprints, Telemetry, and Continuous CRO.',
        routePath: '/process/',
      });
    case 'careers':
      return resolveSeoMetadata({
        title: 'Careers at MatricsMania | Join Our Growth Engineering Team',
        description: 'Build the future of technical SEO, attribution modeling, and data science. Explore open engineering and performance marketing roles.',
        routePath: '/careers/',
      });
    case 'faq':
      return resolveSeoMetadata({
        title: 'Frequently Asked Questions | Pricing, SLA & Growth Mechanics | MatricsMania',
        description: 'Answers to common questions about our guaranteed SEO performance benchmarks, contract terms, attribution stacks, and onboarding timelines.',
        routePath: '/faq/',
      });
    case 'contact':
      return resolveSeoMetadata({
        title: 'Contact MatricsMania | Schedule an Enterprise Growth Diagnostic',
        description: 'Connect with our Principal Growth Architects to audit your log files, conversion tracking, and paid media efficiency.',
        routePath: '/contact/',
      });
    case 'privacy':
      return resolveSeoMetadata({
        title: 'Privacy Policy & Data Protection Governance | MatricsMania',
        description: 'Review our enterprise privacy policies, GDPR compliance, first-party cookie governance, and client data protection commitments.',
        routePath: '/privacy/',
      });
    case 'terms':
      return resolveSeoMetadata({
        title: 'Terms of Engagement & Service Level Agreement (SLA) | MatricsMania',
        description: 'Master service terms, growth engineering retainer commitments, intellectual property clauses, and technical governance standards.',
        routePath: '/terms/',
      });
    default:
      return resolveSeoMetadata({ routePath: pathname });
  }
}

/**
 * Server-Side HTML Metadata Generator
 * Generates ready-to-inject HTML strings for server-rendered <head> tags.
 */
export function buildServerMetaTags(seo: SEOResolved, structuredDataJson?: string): { headTagsHtml: string; title: string; lang: string } {
  const tags: string[] = [];

  // Title
  tags.push(`<title>${escapeHtml(seo.title)}</title>`);
  tags.push(`<meta name="title" content="${escapeHtml(seo.title)}" />`);
  tags.push(`<meta name="description" content="${escapeHtml(seo.description)}" />`);
  
  if (seo.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${escapeHtml(seo.keywords.join(', '))}" />`);
  }

  // Robots
  tags.push(`<meta name="robots" content="${escapeHtml(seo.robotsString)}" />`);

  // Canonical Link
  tags.push(`<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`);

  // Alternate Language Hreflangs
  seo.alternateLanguages.forEach((alt) => {
    tags.push(`<link rel="alternate" hreflang="${escapeHtml(alt.hrefLang)}" href="${escapeHtml(alt.href)}" />`);
  });

  // Open Graph
  tags.push(`<meta property="og:type" content="${escapeHtml(seo.openGraph.type)}" />`);
  tags.push(`<meta property="og:url" content="${escapeHtml(seo.openGraph.url)}" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(seo.openGraph.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(seo.openGraph.description)}" />`);
  tags.push(`<meta property="og:image" content="${escapeHtml(seo.openGraph.image)}" />`);
  tags.push(`<meta property="og:site_name" content="${escapeHtml(seo.openGraph.siteName)}" />`);
  tags.push(`<meta property="og:locale" content="${escapeHtml(seo.openGraph.locale)}" />`);

  if (seo.openGraph.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(seo.openGraph.publishedTime)}" />`);
  }
  if (seo.openGraph.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${escapeHtml(seo.openGraph.modifiedTime)}" />`);
  }
  if (seo.openGraph.section) {
    tags.push(`<meta property="article:section" content="${escapeHtml(seo.openGraph.section)}" />`);
  }
  if (seo.openGraph.tags && seo.openGraph.tags.length > 0) {
    seo.openGraph.tags.forEach((tag) => {
      tags.push(`<meta property="article:tag" content="${escapeHtml(tag)}" />`);
    });
  }

  // Twitter / X
  tags.push(`<meta name="twitter:card" content="${escapeHtml(seo.twitter.card)}" />`);
  tags.push(`<meta name="twitter:site" content="${escapeHtml(seo.twitter.site)}" />`);
  tags.push(`<meta name="twitter:creator" content="${escapeHtml(seo.twitter.creator)}" />`);
  tags.push(`<meta name="twitter:url" content="${escapeHtml(seo.canonicalUrl)}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(seo.twitter.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(seo.twitter.description)}" />`);
  tags.push(`<meta name="twitter:image" content="${escapeHtml(seo.twitter.image)}" />`);

  // Favicon & Theme Color
  tags.push(`<meta name="theme-color" content="${escapeHtml(seo.themeColor)}" />`);

  // Structured Data
  if (structuredDataJson) {
    tags.push(`<script type="application/ld+json" id="matricsmania-structured-data">${structuredDataJson}</script>`);
  } else if (seo.structuredData) {
    tags.push(`<script type="application/ld+json" id="matricsmania-structured-data">${JSON.stringify(seo.structuredData)}</script>`);
  }

  return {
    headTagsHtml: tags.join('\n    '),
    title: seo.title,
    lang: seo.lang,
  };
}

function escapeHtml(str: string = ''): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
