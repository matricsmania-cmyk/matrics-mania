import { PUBLIC_DOMAIN } from './seo';

export type RedirectStatusCode = 301 | 302 | 307 | 308;

export interface RedirectRule {
  source: string | RegExp;
  destination: string;
  statusCode: RedirectStatusCode;
  description?: string;
}

/**
 * System redirect table.
 * Designed to be populated both from static definitions and dynamic CMS/WordPress redirection APIs.
 */
export const STATIC_REDIRECT_RULES: RedirectRule[] = [
  // Legacy & Alias Routes
  {
    source: /^\/blog\/?$/,
    destination: '/insights/',
    statusCode: 301,
    description: 'Legacy blog index migrated to canonical insights hub',
  },
  {
    source: /^\/blog\/([a-zA-Z0-9_-]+)\/?$/,
    destination: '/insights/$1/',
    statusCode: 301,
    description: 'Legacy individual blog post redirect',
  },
  {
    source: /^\/digital-marketing-agency-in-bangalore\/?$/,
    destination: '/locations/bangalore/',
    statusCode: 301,
    description: 'Legacy Bangalore landing page redirected to structured location hub',
  },
  {
    source: /^\/bangalore\/?$/,
    destination: '/locations/bangalore/',
    statusCode: 301,
    description: 'Shortcut Bangalore slug redirected to structured location hub',
  },
  {
    source: /^\/agency\/?$/,
    destination: '/about/',
    statusCode: 301,
    description: 'Legacy agency page redirected to about hub',
  },
  {
    source: /^\/portfolio\/?$/,
    destination: '/work/',
    statusCode: 301,
    description: 'Legacy portfolio alias redirected to work index',
  },
  {
    source: /^\/case-study\/?$/,
    destination: '/case-studies/',
    statusCode: 301,
    description: 'Singular case-study alias redirected to plural case-studies hub',
  },
  {
    source: /^\/service\/?$/,
    destination: '/services/',
    statusCode: 301,
    description: 'Singular service alias redirected to plural services hub',
  },
  {
    source: /^\/industry\/?$/,
    destination: '/industries/',
    statusCode: 301,
    description: 'Singular industry alias redirected to plural industries hub',
  },
  {
    source: /^\/location\/?$/,
    destination: '/locations/',
    statusCode: 301,
    description: 'Singular location alias redirected to plural locations hub',
  },
];

/**
 * Dynamic redirect store interface (for future WordPress / headless CMS plugins like Redirection, Yoast, RankMath).
 */
export interface RedirectResolver {
  findRedirect(path: string): Promise<RedirectResult | null> | RedirectResult | null;
}

export interface RedirectResult {
  statusCode: RedirectStatusCode;
  destination: string;
  sourceRule?: string;
}

/**
 * Evaluates an incoming URL path against redirect rules and trailing slash policies.
 */
export function getHttpRedirect(
  rawPath: string,
  host: string = PUBLIC_DOMAIN,
  customRules: RedirectRule[] = []
): RedirectResult | null {
  if (!rawPath || typeof rawPath !== 'string') return null;

  // Extract path and query
  let path = rawPath.trim();
  let query = '';
  if (path.includes('?')) {
    const parts = path.split('?');
    path = parts[0];
    query = parts[1] ? `?${parts[1]}` : '';
  }

  // Skip static assets, internal APIs, and Vite internal dev paths
  if (
    path.startsWith('/api/') ||
    path.startsWith('/@') ||
    path.startsWith('/src/') ||
    path.startsWith('/node_modules/') ||
    path.startsWith('/__') ||
    path === '/favicon.ico' ||
    path === '/robots.txt' ||
    path === '/sitemap.xml' ||
    path.includes('.')
  ) {
    return null;
  }

  // 1. Check Custom / Static Redirect Rules
  const allRules = [...customRules, ...STATIC_REDIRECT_RULES];
  for (const rule of allRules) {
    if (typeof rule.source === 'string') {
      if (path === rule.source || path === rule.source.replace(/\/+$/, '') || path === rule.source + '/') {
        let dest = rule.destination;
        if (!dest.startsWith('http://') && !dest.startsWith('https://')) {
          if (!dest.startsWith('/')) dest = '/' + dest;
          if (dest !== '/' && !dest.endsWith('/')) dest = dest + '/';
        }
        return {
          statusCode: rule.statusCode,
          destination: `${dest}${query}`,
          sourceRule: rule.description || String(rule.source),
        };
      }
    } else if (rule.source instanceof RegExp) {
      const match = path.match(rule.source);
      if (match) {
        let dest = rule.destination;
        // Replace captured groups ($1, $2, etc.)
        for (let i = 1; i < match.length; i++) {
          dest = dest.replace(new RegExp(`\\$${i}`, 'g'), match[i]);
        }
        if (!dest.startsWith('http://') && !dest.startsWith('https://')) {
          if (!dest.startsWith('/')) dest = '/' + dest;
          if (dest !== '/' && !dest.endsWith('/')) dest = dest + '/';
        }
        return {
          statusCode: rule.statusCode,
          destination: `${dest}${query}`,
          sourceRule: rule.description || rule.source.toString(),
        };
      }
    }
  }

  // 2. Trailing Slash Normalization: If path has no trailing slash and isn't root, redirect with 308 Permanent Redirect
  if (path !== '/' && !path.endsWith('/') && !path.includes('.')) {
    return {
      statusCode: 308,
      destination: `${path}/${query}`,
      sourceRule: 'Canonical trailing-slash enforcement',
    };
  }

  return null;
}
