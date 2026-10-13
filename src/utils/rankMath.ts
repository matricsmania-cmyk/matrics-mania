import { PUBLIC_DOMAIN, CMS_DOMAIN } from './constants';
import { wordPressProvider } from '../providers/WordPressProvider';

export interface ParsedRankMathHead {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robotsString?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'business.business';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  rawHeadHtml?: string;
  isWordPress404?: boolean;
}

/**
 * Decodes common HTML entities in title/description metadata
 */
export function decodeHtmlEntities(htmlStr: string = ''): string {
  if (!htmlStr) return '';
  return htmlStr
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .trim();
}

/**
 * Parses HTML metadata string returned in JSON `head` property by Rank Math
 */
export function parseRankMathHeadHtml(headHtml: string, expectedPublicUrl?: string): ParsedRankMathHead {
  if (!headHtml || typeof headHtml !== 'string') {
    return { isWordPress404: true };
  }

  // Detect WordPress 404 response in head
  const is404Title =
    /<title[^>]*>.*?(Page Not Found|404 Not Found).*?<\/title>/i.test(headHtml) ||
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*(Page Not Found|404 Not Found)[^"']*["']/i.test(headHtml) ||
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*(Page Not Found|404 Not Found)[^"']*["']/i.test(headHtml);

  if (is404Title) {
    return { isWordPress404: true, rawHeadHtml: headHtml };
  }

  // Extract <title>, og:title, or twitter:title
  let title: string | undefined;
  const titleMatch = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1] && titleMatch[1].trim()) {
    title = decodeHtmlEntities(titleMatch[1]);
  } else {
    const ogTitleMatch = headHtml.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
      title = decodeHtmlEntities(ogTitleMatch[1]);
    } else {
      const twTitleMatch = headHtml.match(/<meta\s+name=["']twitter:title["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
      if (twTitleMatch && twTitleMatch[1]) {
        title = decodeHtmlEntities(twTitleMatch[1]);
      }
    }
  }

  // Extract Meta Description
  let description: string | undefined;
  const descMatch =
    headHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    headHtml.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']\s*\/?>/i) ||
    headHtml.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    headHtml.match(/<meta\s+name=["']twitter:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (descMatch && descMatch[1]) {
    description = decodeHtmlEntities(descMatch[1]);
  }

  // Extract Canonical URL
  let canonicalUrl: string | undefined;
  const canonicalMatch =
    headHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']\s*\/?>/i) ||
    headHtml.match(/<link\s+href=["']([\s\S]*?)["']\s+rel=["']canonical["']\s*\/?>/i);

  if (canonicalMatch && canonicalMatch[1]) {
    let rawCanonical = canonicalMatch[1].trim();
    // Normalize CMS domain or localhost to public frontend domain
    rawCanonical = rawCanonical
      .replace(/^https?:\/\/cms\.matricsmania\.com/i, PUBLIC_DOMAIN)
      .replace(/^https?:\/\/localhost(:\d+)?/i, PUBLIC_DOMAIN);

    if (!rawCanonical.startsWith('http://') && !rawCanonical.startsWith('https://')) {
      rawCanonical = `${PUBLIC_DOMAIN}${rawCanonical.startsWith('/') ? '' : '/'}${rawCanonical}`;
    }
    canonicalUrl = rawCanonical;
  } else if (expectedPublicUrl) {
    canonicalUrl = expectedPublicUrl;
  }

  // Extract Robots
  let robotsString: string | undefined;
  let robotsIndex = true;
  let robotsFollow = true;
  const robotsMatch = headHtml.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (robotsMatch && robotsMatch[1]) {
    robotsString = decodeHtmlEntities(robotsMatch[1]);
    if (robotsString.toLowerCase().includes('noindex')) {
      robotsIndex = false;
    }
    if (robotsString.toLowerCase().includes('nofollow')) {
      robotsFollow = false;
    }
  }

  // Extract Open Graph Tags
  let ogTitle: string | undefined;
  const ogTitleMatch = headHtml.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (ogTitleMatch && ogTitleMatch[1]) {
    ogTitle = decodeHtmlEntities(ogTitleMatch[1]);
  }

  let ogDescription: string | undefined;
  const ogDescMatch = headHtml.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (ogDescMatch && ogDescMatch[1]) {
    ogDescription = decodeHtmlEntities(ogDescMatch[1]);
  }

  let ogImage: string | undefined;
  const ogImgMatch = headHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (ogImgMatch && ogImgMatch[1]) {
    ogImage = ogImgMatch[1].trim();
  }

  let ogType: 'website' | 'article' | 'profile' | 'business.business' | undefined;
  const ogTypeMatch = headHtml.match(/<meta\s+property=["']og:type["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (ogTypeMatch && ogTypeMatch[1]) {
    const rawType = ogTypeMatch[1].toLowerCase().trim();
    if (rawType === 'article') ogType = 'article';
    else if (rawType === 'profile') ogType = 'profile';
    else if (rawType === 'business.business') ogType = 'business.business';
    else ogType = 'website';
  }

  // Extract Twitter / X Tags
  let twitterTitle: string | undefined;
  const twTitleMatch = headHtml.match(/<meta\s+name=["']twitter:title["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (twTitleMatch && twTitleMatch[1]) {
    twitterTitle = decodeHtmlEntities(twTitleMatch[1]);
  }

  let twitterDescription: string | undefined;
  const twDescMatch = headHtml.match(/<meta\s+name=["']twitter:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (twDescMatch && twDescMatch[1]) {
    twitterDescription = decodeHtmlEntities(twDescMatch[1]);
  }

  let twitterImage: string | undefined;
  const twImgMatch = headHtml.match(/<meta\s+name=["']twitter:image["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (twImgMatch && twImgMatch[1]) {
    twitterImage = twImgMatch[1].trim();
  }

  let twitterCard: 'summary' | 'summary_large_image' | undefined;
  const twCardMatch = headHtml.match(/<meta\s+name=["']twitter:card["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (twCardMatch && twCardMatch[1]) {
    twitterCard = twCardMatch[1].includes('summary_large') ? 'summary_large_image' : 'summary';
  }

  // Extract JSON-LD Structured Data
  let structuredData: Record<string, any> | Array<Record<string, any>> | undefined;
  const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch: RegExpExecArray | null;
  const parsedSchemas: Array<Record<string, any>> = [];

  while ((scriptMatch = scriptRegex.exec(headHtml)) !== null) {
    if (scriptMatch[1]) {
      try {
        const parsed = JSON.parse(scriptMatch[1].trim());
        if (Array.isArray(parsed)) {
          parsedSchemas.push(...parsed);
        } else if (parsed && typeof parsed === 'object') {
          parsedSchemas.push(parsed);
        }
      } catch {
        // Continue
      }
    }
  }

  if (parsedSchemas.length === 1) {
    structuredData = parsedSchemas[0];
  } else if (parsedSchemas.length > 1) {
    structuredData = parsedSchemas;
  }

  return {
    title,
    description,
    canonicalUrl,
    robotsString,
    robotsIndex,
    robotsFollow,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    structuredData,
    rawHeadHtml: headHtml,
    isWordPress404: false,
  };
}

// In-memory cache with 300s TTL
const rankMathMemoryCache: Map<string, { data: ParsedRankMathHead | null; expiry: number }> = new Map();
const CACHE_TTL_MS = 300 * 1000;

async function fetchRankMathEndpointWithChallengeSolver(endpointUrlStr: string, cacheKey: string): Promise<any | null> {
  let currentUrl = endpointUrlStr;
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  for (let attempt = 0; attempt < 2; attempt++) {
    const headers: Record<string, string> = {
      'User-Agent': userAgent,
      'Accept': 'application/json, text/html, */*',
    };

    const sessionCookie = (wordPressProvider as any).sessionCookie;
    if (sessionCookie) {
      headers['Cookie'] = sessionCookie;
    }

    try {
      const fetchOptions: RequestInit = {
        headers,
        signal: AbortSignal.timeout(6000),
      };

      if (typeof window === 'undefined') {
        (fetchOptions as any).next = {
          revalidate: 300,
          tags: ['rank-math', `rank-math:${cacheKey}`],
        };
      }

      const res = await fetch(currentUrl, fetchOptions);
      const text = await res.text();

      // 1. Direct JSON response
      if (text.startsWith('{') || text.startsWith('[')) {
        try {
          return JSON.parse(text);
        } catch {
          // ignore
        }
      }

      // 2. InfinityFree / ByetHost challenge page solver
      if (text.includes('slowAES') || text.includes('/aes.js')) {
        const aesCode = await (wordPressProvider as any).getAesScript?.();
        const scriptMatch = text.match(/<script>([\s\S]*?)<\/script>/);

        if (aesCode && scriptMatch && typeof window === 'undefined') {
          try {
            const vm = await import('vm');
            let cookieVal = '';
            let redirectHref = '';

            const sandbox = {
              document: {
                set cookie(val: string) {
                  const m = val.match(/__test=([^;]+)/);
                  if (m) cookieVal = `__test=${m[1]}`;
                },
              },
              location: {
                set href(val: string) {
                  redirectHref = val;
                },
              },
            };

            const context = vm.createContext(sandbox);
            vm.runInContext(aesCode, context);
            vm.runInContext(scriptMatch[1], context);

            if (cookieVal) {
              (wordPressProvider as any).sessionCookie = cookieVal;
              if (redirectHref) {
                currentUrl = redirectHref;
              }
              continue; // Retry attempt 1 with session cookie set
            }
          } catch {
            break;
          }
        }
      }
    } catch {
      // Attempt failed
    }
  }
  return null;
}

/**
 * Server-side Rank Math metadata fetcher.
 * Queries `https://cms.matricsmania.com/wp-json/rankmath/v1/getHead?url=FULL_URL`
 *
 * Checks WordPress CMS domain URLs first (e.g. `https://cms.matricsmania.com/services/technical-seo/?i=1`
 * or `https://cms.matricsmania.com/services/technical-seo/`) so Rank Math plugin on WordPress resolves
 * the page correctly without returning a 404 response.
 */
export async function fetchRankMathMetadata(
  pagePathOrUrl: string,
  cmsSourceUrlFallback?: string
): Promise<ParsedRankMathHead | null> {
  if (!pagePathOrUrl) return null;

  // Standardize clean relative path e.g. "/technical-seo/"
  let cleanPath = pagePathOrUrl.trim();
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      const u = new URL(cleanPath);
      cleanPath = u.pathname;
    } catch {
      // keep cleanPath
    }
  }
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  if (cleanPath !== '/' && !cleanPath.endsWith('/')) cleanPath = cleanPath + '/';

  const expectedPublicUrl = `${PUBLIC_DOMAIN}${cleanPath}`;
  const cmsBase = CMS_DOMAIN || 'https://cms.matricsmania.com';

  const cacheKey = cleanPath.toLowerCase();
  const cached = rankMathMemoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  // Candidate URLs to query Rank Math API with:
  const candidateUrlsToQuery: string[] = [];

  // 1. Explicit CMS Source URL if provided
  if (cmsSourceUrlFallback) {
    let cleanCmsSource = cmsSourceUrlFallback.trim();
    if (cleanCmsSource.startsWith('http://') || cleanCmsSource.startsWith('https://')) {
      try {
        cleanCmsSource = new URL(cleanCmsSource).pathname;
      } catch {
        // keep cleanCmsSource
      }
    }
    if (!cleanCmsSource.startsWith('/')) cleanCmsSource = '/' + cleanCmsSource;
    if (cleanCmsSource !== '/' && !cleanCmsSource.endsWith('/')) cleanCmsSource += '/';

    candidateUrlsToQuery.push(`${cmsBase}${cleanCmsSource}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}${cleanCmsSource}`);
  }

  // 2. If path does not start with CPT prefix, try CPT prefixes
  if (
    !cleanPath.startsWith('/services/') &&
    !cleanPath.startsWith('/industries/') &&
    !cleanPath.startsWith('/locations/') &&
    !cleanPath.startsWith('/case-studies/') &&
    !cleanPath.startsWith('/insights/') &&
    cleanPath !== '/'
  ) {
    candidateUrlsToQuery.push(`${cmsBase}/services${cleanPath}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}/services${cleanPath}`);
    candidateUrlsToQuery.push(`${cmsBase}/industries${cleanPath}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}/industries${cleanPath}`);
    candidateUrlsToQuery.push(`${cmsBase}/locations${cleanPath}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}/locations${cleanPath}`);
    candidateUrlsToQuery.push(`${cmsBase}/case-studies${cleanPath}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}/case-studies${cleanPath}`);
    candidateUrlsToQuery.push(`${cmsBase}/insights${cleanPath}?i=1`);
    candidateUrlsToQuery.push(`${cmsBase}/insights${cleanPath}`);
  }

  // 3. Direct path candidates
  candidateUrlsToQuery.push(`${cmsBase}${cleanPath}?i=1`);
  candidateUrlsToQuery.push(`${cmsBase}${cleanPath}`);
  candidateUrlsToQuery.push(expectedPublicUrl);

  for (const targetUrl of candidateUrlsToQuery) {
    const endpointUrl = new URL('/wp-json/rankmath/v1/getHead', cmsBase);
    endpointUrl.searchParams.set('url', targetUrl);

    try {
      const json = await fetchRankMathEndpointWithChallengeSolver(endpointUrl.toString(), cacheKey);

      if (!json || json.success !== true || typeof json.head !== 'string' || !json.head.trim()) {
        continue;
      }

      const parsed = parseRankMathHeadHtml(json.head, expectedPublicUrl);

      // If this candidate URL resulted in a 404 response in Rank Math, try next candidate URL
      if (parsed.isWordPress404) {
        continue;
      }

      // Found valid Rank Math metadata! Cache and return
      rankMathMemoryCache.set(cacheKey, { data: parsed, expiry: Date.now() + CACHE_TTL_MS });
      return parsed;
    } catch {
      // Candidate request failed, try next
      continue;
    }
  }

  // All candidates returned 404 or failed -> cache null for 60s and return null so ACF fallback takes over
  rankMathMemoryCache.set(cacheKey, { data: null, expiry: Date.now() + 60000 });
  return null;
}

