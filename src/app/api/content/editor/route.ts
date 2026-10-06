import { NextRequest, NextResponse } from 'next/server';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { mockDataProvider } from '@/src/providers/MockDataProvider';

export const dynamic = 'force-dynamic';

interface RouteResolution {
  type: 'home' | 'page' | 'service' | 'industry' | 'case-study' | 'insight' | 'location' | 'archive' | 'unknown';
  slug: string;
  endpoint: string;
  label: string;
}

function resolveRoute(pathname: string): RouteResolution {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean || clean === '') {
    return { type: 'home', slug: 'home', endpoint: 'pages?slug=home&_embed=true', label: 'Homepage' };
  }

  const parts = clean.split('/');
  const section = parts[0]?.toLowerCase();
  const slug = parts[1]?.toLowerCase();

  if (section === 'services') {
    if (!slug) return { type: 'archive', slug: 'services', endpoint: 'services?per_page=100&_embed=true', label: 'Services Archive' };
    return { type: 'service', slug, endpoint: `services?slug=${encodeURIComponent(slug)}&_embed=true`, label: `Service: ${slug}` };
  }

  if (section === 'industries') {
    if (!slug) return { type: 'archive', slug: 'industries', endpoint: 'industries?per_page=100&_embed=true', label: 'Industries Archive' };
    return { type: 'industry', slug, endpoint: `industries?slug=${encodeURIComponent(slug)}&_embed=true`, label: `Industry: ${slug}` };
  }

  if (section === 'case-studies' || section === 'work') {
    if (!slug) return { type: 'archive', slug: 'case-studies', endpoint: 'case_studies?per_page=100&_embed=true', label: 'Case Studies Archive' };
    return { type: 'case-study', slug, endpoint: `case_studies?slug=${encodeURIComponent(slug)}&_embed=true`, label: `Case Study: ${slug}` };
  }

  if (section === 'insights' || section === 'blog') {
    if (!slug) return { type: 'archive', slug: 'insights', endpoint: 'posts?per_page=100&_embed=true', label: 'Insights Archive' };
    return { type: 'insight', slug, endpoint: `posts?slug=${encodeURIComponent(slug)}&_embed=true`, label: `Insight Post: ${slug}` };
  }

  if (section === 'locations') {
    if (!slug) return { type: 'archive', slug: 'locations', endpoint: 'locations?per_page=100&_embed=true', label: 'Locations Archive' };
    return { type: 'location', slug, endpoint: `locations?slug=${encodeURIComponent(slug)}&_embed=true`, label: `Location: ${slug}` };
  }

  // Static pages e.g. /about, /process, /contact, /faq, /terms, /privacy
  return { type: 'page', slug: section, endpoint: `pages?slug=${encodeURIComponent(section)}&_embed=true`, label: `Page: ${section}` };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get('path') || '/';
  const forceRefresh = searchParams.get('refresh') === 'true';

  const resolution = resolveRoute(pathname);
  const wpBaseUrl = wordPressProvider.getBaseUrl();
  const startTime = Date.now();

  let rawWpData: any = null;
  let normalizedEntity: any = null;
  let source: 'wordpress_live' | 'fallback_cache' | 'mock_provider' = 'fallback_cache';
  let httpStatus = 200;
  let errorMessage: string | null = null;

  try {
    // 1. Fetch from WordPress directly
    if (wordPressProvider.isConfigured()) {
      try {
        const fullWpUrl = `${wpBaseUrl}/wp-json/wp/v2/${resolution.endpoint}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const wpRes = await fetch(fullWpUrl, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'User-Agent': 'MatricsMania-Studio-ContentEditor/1.0',
          },
          cache: forceRefresh ? 'no-store' : 'default',
        });
        clearTimeout(timeout);

        if (wpRes.ok) {
          const json = await wpRes.json();
          rawWpData = json;
          source = 'wordpress_live';
        } else {
          httpStatus = wpRes.status;
          errorMessage = `WordPress API responded with HTTP ${wpRes.status} ${wpRes.statusText}`;
        }
      } catch (err: any) {
        errorMessage = err?.name === 'AbortError' ? 'WordPress API timeout (6s)' : err?.message || 'Connection error';
      }
    }

    // 2. Resolve normalized entity for preview
    switch (resolution.type) {
      case 'home':
      case 'page': {
        normalizedEntity =
          (await wordPressProvider.asyncGetPageBySlug(resolution.slug)) ||
          mockDataProvider.getPageBySlug(resolution.slug);
        break;
      }
      case 'service': {
        normalizedEntity =
          (await wordPressProvider.asyncGetServiceBySlug(resolution.slug)) ||
          mockDataProvider.getServiceBySlug(resolution.slug);
        break;
      }
      case 'industry': {
        normalizedEntity =
          (await wordPressProvider.asyncGetIndustryBySlug(resolution.slug)) ||
          mockDataProvider.getIndustryBySlug(resolution.slug);
        break;
      }
      case 'case-study': {
        normalizedEntity =
          (await wordPressProvider.asyncGetCaseStudyBySlug(resolution.slug)) ||
          mockDataProvider.getCaseStudyBySlug(resolution.slug);
        break;
      }
      case 'insight': {
        normalizedEntity =
          (await wordPressProvider.asyncGetInsightBySlug(resolution.slug)) ||
          mockDataProvider.getInsightBySlug(resolution.slug);
        break;
      }
      case 'location': {
        normalizedEntity =
          (await wordPressProvider.asyncGetLocationBySlug(resolution.slug)) ||
          mockDataProvider.getLocationBySlug(resolution.slug);
        break;
      }
      default: {
        normalizedEntity = null;
      }
    }

    if (!rawWpData && normalizedEntity) {
      source = 'fallback_cache';
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      latencyMs,
      pathname,
      resolution,
      source,
      httpStatus,
      errorMessage,
      wpBaseUrl,
      rawWpData: Array.isArray(rawWpData) ? rawWpData[0] || rawWpData : rawWpData,
      normalizedEntity,
      // Metadata summary
      metadata: {
        title: normalizedEntity?.seo?.title || normalizedEntity?.title || 'Not specified in CMS',
        metaDescription: normalizedEntity?.seo?.metaDescription || normalizedEntity?.excerpt || 'Not specified in CMS',
        canonicalUrl: normalizedEntity?.seo?.canonicalUrl || `https://matricsmania.com${pathname}`,
        openGraph: normalizedEntity?.seo?.openGraph || null,
        twitter: normalizedEntity?.seo?.twitter || null,
        schema: normalizedEntity?.seo?.schema || null,
        slug: resolution.slug,
        id: normalizedEntity?.id || null,
        status: rawWpData?.[0]?.status || rawWpData?.status || 'published',
        dateModified: rawWpData?.[0]?.modified || rawWpData?.modified || new Date().toISOString(),
      },
      // Body content summary
      bodyContent: {
        rawHtml: rawWpData?.[0]?.content?.rendered || rawWpData?.content?.rendered || normalizedEntity?.description || '',
        rawExcerpt: rawWpData?.[0]?.excerpt?.rendered || rawWpData?.excerpt?.rendered || normalizedEntity?.excerpt || '',
        acfFields: rawWpData?.[0]?.acf || rawWpData?.acf || normalizedEntity?.customFields || {},
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        pathname,
        resolution,
        error: error?.message || 'Failed to inspect page content',
      },
      { status: 500 }
    );
  }
}
