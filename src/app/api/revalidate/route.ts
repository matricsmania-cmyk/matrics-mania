import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { wordPressProvider } from '@/src/providers/WordPressProvider';

/**
 * ============================================================================
 * INSTANT REAL-TIME WORDPRESS REVALIDATION WEBHOOK
 * ============================================================================
 * 
 * Whenever a post, page, service, industry, location, case study, or ACF field
 * is saved / updated in the WordPress admin panel, WordPress can ping this endpoint:
 * 
 * Method: POST or GET
 * URL: https://your-domain.com/api/revalidate
 * Optional Query / Body Params:
 *  - secret: string (matches WORDPRESS_REVALIDATE_SECRET or NEXT_PUBLIC_REVALIDATE_SECRET)
 *  - path: string (e.g. "/services/technical-seo" or "/" or "/all")
 *  - post_type / type: "services" | "industries" | "locations" | "posts" | "case_studies" | "pages"
 *  - slug / post_name: string (e.g. "technical-seo")
 * 
 * Features:
 * 1. Flushes WordPressProvider memory cache instantly
 * 2. Executes Next.js ISR on-demand revalidatePath & revalidateTag
 * 3. Pre-warms the cache in the background with fresh WordPress REST data
 */

export const dynamic = 'force-dynamic';

async function handleRevalidation(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const querySecret = url.searchParams.get('secret');
    const queryPath = url.searchParams.get('path');
    const queryType = url.searchParams.get('type') || url.searchParams.get('post_type');
    const querySlug = url.searchParams.get('slug') || url.searchParams.get('post_name');

    let bodySecret: string | undefined;
    let bodyPath: string | undefined;
    let bodyType: string | undefined;
    let bodySlug: string | undefined;

    if (req.method === 'POST') {
      try {
        const body = await req.json();
        bodySecret = body.secret || body.token;
        bodyPath = body.path;
        bodyType = body.post_type || body.type;
        bodySlug = body.post_name || body.slug;
      } catch {
        // Body might not be JSON (e.g., standard form post)
      }
    }

    const secret = querySecret || bodySecret;
    const configuredSecret =
      process.env.WORDPRESS_REVALIDATE_SECRET ||
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET ||
      'matricsmania_instant_sync';

    // If a secret is provided or configured, verify it (allow open secret match or default secret)
    if (configuredSecret && secret && secret !== configuredSecret && secret !== 'matricsmania_instant_sync') {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret token' },
        { status: 401 }
      );
    }

    const targetType = (queryType || bodyType || '').toLowerCase();
    const targetSlug = (querySlug || bodySlug || '').toLowerCase();
    const explicitPath = queryPath || bodyPath;

    // 1. Flush in-memory cache instantly
    wordPressProvider.clearCache();

    // 2. Determine paths to revalidate
    const revalidatedPaths: string[] = [];

    if (explicitPath) {
      if (explicitPath === 'all' || explicitPath === '*') {
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/* (all routes)');
      } else {
        revalidatePath(explicitPath);
        revalidatedPaths.push(explicitPath);
      }
    } else {
      // Automatic path inference based on post_type and slug
      if (targetType.includes('service')) {
        revalidatePath('/services');
        revalidatedPaths.push('/services');
        if (targetSlug) {
          revalidatePath(`/services/${targetSlug}`);
          revalidatedPaths.push(`/services/${targetSlug}`);
        }
      } else if (targetType.includes('industr')) {
        revalidatePath('/industries');
        revalidatedPaths.push('/industries');
        if (targetSlug) {
          revalidatePath(`/industries/${targetSlug}`);
          revalidatedPaths.push(`/industries/${targetSlug}`);
        }
      } else if (targetType.includes('location')) {
        revalidatePath('/locations');
        revalidatedPaths.push('/locations');
        if (targetSlug) {
          revalidatePath(`/locations/${targetSlug}`);
          revalidatedPaths.push(`/locations/${targetSlug}`);
        }
      } else if (targetType.includes('case') || targetType.includes('stud')) {
        revalidatePath('/case-studies');
        revalidatedPaths.push('/case-studies');
        if (targetSlug) {
          revalidatePath(`/case-studies/${targetSlug}`);
          revalidatedPaths.push(`/case-studies/${targetSlug}`);
        }
      } else if (targetType.includes('post') || targetType.includes('insight')) {
        revalidatePath('/insights');
        revalidatedPaths.push('/insights');
        if (targetSlug) {
          revalidatePath(`/insights/${targetSlug}`);
          revalidatedPaths.push(`/insights/${targetSlug}`);
        }
      } else {
        // Revalidate main landing and indexes by default
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/', '/services', '/industries', '/insights', '/case-studies', '/locations');
      }
    }

    // Always revalidate home page and global layout
    revalidatePath('/', 'layout');

    // 3. Trigger immediate cache warm-up asynchronously
    const refreshSummary = await wordPressProvider.refreshAll().catch(() => null);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'WordPress content revalidated and caches flushed successfully in real-time',
      revalidatedPaths,
      refreshSummary,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Error executing real-time revalidation',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}
