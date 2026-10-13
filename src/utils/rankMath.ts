import { PUBLIC_DOMAIN, CMS_DOMAIN } from './seo';

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
  Decodes common HTML entities in title/description metadata
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
  const is404Title = /<title[^>]*>.*?(Page Not Found|404 Not Found).*?<\/title>/i.test(headHtml);
  if (is404Title) {
    return { isWordPress404: true, rawHeadHtml: headHtml };
  }

  // Extract <title>
  let title: string | undefined;
  const titleMatch = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    title = decodeHtmlEntities(titleMatch[1]);
  }

  // Extract Meta Description
  let description: string | undefined;
  const descMatch =
    headHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    headHtml.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']\s*\/?>/i);
  if (descMatch && descMatch[1]) {
    description = decodeHtmlEntities(descMatch[1]);
  }

  // Extract Canonical URL
  let canonicalUrl: string | undefined;
  const canonicalMatch = headHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']\s*\/?>/i) || headHtml.match(/<link\s+href=["']([\s\S]*?)["']\s+rel=["']canonical["']\s*\/?>/i);
  if (canonicalMatch && canonicalMatch[1]) {
    let rawCanonical = canonicalMatch[1].trim();
    // Normalize CMS domain to public domain
    rawCanonical = rawCanonical.replace(/^https?:\/\/cms\.matricsmania\.com/i, PUBLIC_DOMAIN);
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
        // Continue parsing remaining script tags
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

/**
 * Server-side Rank Math metadata fetcher.
 * Queries `https://cms.matricsmania.com/wp-json/rankmath/v1/getHead?url=FULL_URL`
 */
export async function fetchRankMathMetadata(
  pagePathOrUrl: string
): Promise<ParsedRankMathHead | null> {
  if (!pagePathOrUrl) return null;

  // Build complete page URL using URL API
  let targetFullUrl = pagePathOrUrl.trim();
  if (targetFullUrl.startsWith('/')) {
    targetFullUrl = `${PUBLIC_DOMAIN}${targetFullUrl}`;
  } else if (!targetFullUrl.startsWith('http://') && !targetFullUrl.startsWith('https://')) {
    targetFullUrl = `${PUBLIC_DOMAIN}/${targetFullUrl}`;
  }

  const cacheKey = targetFullUrl.toLowerCase();
  const cached = rankMathMemoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  const cmsBase = CMS_DOMAIN || 'https://cms.matricsmania.com';
  
  // Construct endpoint URL using standard URL API
  const endpointUrl = new URL('/wp-json/rankmath/v1/getHead', cmsBase);
  endpointUrl.searchParams.set('url', targetFullUrl);

  try {
    const fetchOptions: RequestInit = {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NextJS-RankMath-Relay/1.0',
      },
      signal: AbortSignal.timeout(8000), // 8s timeout safeguard
    };

    if (typeof window === 'undefined') {
      (fetchOptions as any).next = {
        revalidate: 300,
        tags: ['rank-math', `rank-math:${cacheKey}`],
      };
    }

    const res = await fetch(endpointUrl.toString(), fetchOptions);

    if (!res.ok) {
      // 404 or 500 response from Rank Math API
      rankMathMemoryCache.set(cacheKey, { data: null, expiry: Date.now() + 60000 }); // cache 60s
      return null;
    }

    const json = await res.json();

    if (!json || json.success !== true || typeof json.head !== 'string' || !json.head.trim()) {
      rankMathMemoryCache.set(cacheKey, { data: null, expiry: Date.now() + 60000 });
      return null;
    }

    const parsed = parseRankMathHeadHtml(json.head, targetFullUrl);

    // If Rank Math returned a 404 page head for a valid route, return null so ACF/entity fallback kicks in
    if (parsed.isWordPress404) {
      rankMathMemoryCache.set(cacheKey, { data: null, expiry: Date.now() + 60000 });
      return null;
    }

    rankMathMemoryCache.set(cacheKey, { data: parsed, expiry: Date.now() + CACHE_TTL_MS });
    return parsed;
  } catch (err) {
    // Network error or timeout -> graceful fallback
    rankMathMemoryCache.set(cacheKey, { data: null, expiry: Date.now() + 30000 });
    return null;
  }
}
