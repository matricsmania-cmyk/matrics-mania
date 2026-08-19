export interface RouteMatch {
  pathname: string;
  routeId: string;
  params: Record<string, string>;
  canonicalUrl: string;
}

export interface RouteDefinition {
  id: string;
  pattern: RegExp;
  template: 'static' | 'service' | 'industry' | 'location' | 'insight' | 'case-study';
  getCanonical: (params: Record<string, string>) => string;
}

export const BASE_URL = 'https://matricsmania.com';

/**
 * Normalized route definitions for MatricsMania.
 * All public URLs strictly enforce trailing slashes.
 */
export const ROUTES: RouteDefinition[] = [
  {
    id: 'home',
    pattern: /^\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/`,
  },
  {
    id: 'about',
    pattern: /^\/about\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/about/`,
  },
  {
    id: 'work',
    pattern: /^\/work\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/work/`,
  },
  {
    id: 'case-studies-index',
    pattern: /^\/case-studies\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/case-studies/`,
  },
  {
    id: 'case-study-detail',
    pattern: /^\/case-studies\/([a-zA-Z0-9_-]+)\/?$/,
    template: 'case-study',
    getCanonical: (p) => `${BASE_URL}/case-studies/${p.slug}/`,
  },
  {
    id: 'services-index',
    pattern: /^\/services\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/services/`,
  },
  {
    id: 'service-detail',
    pattern: /^\/services\/([a-zA-Z0-9_-]+)\/?$/,
    template: 'service',
    getCanonical: (p) => `${BASE_URL}/services/${p.slug}/`,
  },
  {
    id: 'industries-index',
    pattern: /^\/industries\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/industries/`,
  },
  {
    id: 'industry-detail',
    pattern: /^\/industries\/([a-zA-Z0-9_-]+)\/?$/,
    template: 'industry',
    getCanonical: (p) => `${BASE_URL}/industries/${p.slug}/`,
  },
  {
    id: 'locations-index',
    pattern: /^\/locations\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/locations/`,
  },
  {
    id: 'location-detail',
    pattern: /^\/locations\/([a-zA-Z0-9_-]+)\/?$/,
    template: 'location',
    getCanonical: (p) => `${BASE_URL}/locations/${p.slug}/`,
  },
  {
    id: 'insights-index',
    pattern: /^\/(?:insights|blog)\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/insights/`,
  },
  {
    id: 'insight-detail',
    pattern: /^\/(?:insights|blog)\/([a-zA-Z0-9_-]+)\/?$/,
    template: 'insight',
    getCanonical: (p) => `${BASE_URL}/insights/${p.slug}/`,
  },
  {
    id: 'process',
    pattern: /^\/process\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/process/`,
  },
  {
    id: 'careers',
    pattern: /^\/careers\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/careers/`,
  },
  {
    id: 'faq',
    pattern: /^\/faq\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/faq/`,
  },
  {
    id: 'contact',
    pattern: /^\/contact\/?$/,
    template: 'static',
    getCanonical: () => `${BASE_URL}/contact/`,
  },
];

/**
 * Normalizes any input path to enforce standard trailing slash.
 */
export function normalizePath(path: string): string {
  let cleaned = path.trim();
  // Strip hash if present
  if (cleaned.startsWith('#')) {
    cleaned = cleaned.replace(/^#\/?/, '/');
  }
  // Ensure leading slash
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned;
  }
  // Enforce trailing slash (except empty/root)
  if (cleaned !== '/' && !cleaned.endsWith('/')) {
    cleaned = cleaned + '/';
  }
  return cleaned;
}

/**
 * Resolves the route match for a given pathname or hash.
 */
export function resolveRoute(rawPath: string): RouteMatch {
  const normalized = normalizePath(rawPath);

  // Check explicit legacy / shortcut aliases
  if (normalized === '/digital-marketing-agency-in-bangalore/' || normalized === '/bangalore/') {
    return {
      pathname: '/locations/bangalore/',
      routeId: 'location-detail',
      params: { slug: 'bangalore' },
      canonicalUrl: `${BASE_URL}/locations/bangalore/`,
    };
  }

  for (const def of ROUTES) {
    const match = normalized.match(def.pattern);
    if (match) {
      const params: Record<string, string> = {};
      if (match[1]) {
        params.slug = match[1];
      }
      return {
        pathname: normalized,
        routeId: def.id,
        params,
        canonicalUrl: def.getCanonical(params),
      };
    }
  }

  // Fallback to home
  return {
    pathname: '/',
    routeId: 'home',
    params: {},
    canonicalUrl: `${BASE_URL}/`,
  };
}
