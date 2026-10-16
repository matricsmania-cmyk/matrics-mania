import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import crypto from 'crypto';

/**
 * ============================================================================
 * PRODUCTION WORDPRESS -> NEXT.JS REVALIDATION WEBHOOK ENDPOINT
 * ============================================================================
 *
 * Endpoint: POST /api/revalidate
 *
 * Authentication (Server-Side Only):
 * - Primary: Authorization: Bearer <WORDPRESS_REVALIDATE_SECRET>
 * - Custom Header: x-revalidate-secret: <WORDPRESS_REVALIDATE_SECRET>
 *
 * Security Invariants:
 * - Strictly loads secret from server-side `process.env.WORDPRESS_REVALIDATE_SECRET`.
 * - Fails CLOSED: If `WORDPRESS_REVALIDATE_SECRET` is missing/empty, returns HTTP 500
 *   Server Configuration Error immediately with NO revalidation performed.
 * - Zero hardcoded secret fallback.
 * - Constant-time comparison using `crypto.timingSafeEqual` to prevent timing attacks.
 * - Secret is never exposed via NEXT_PUBLIC_*, client bundles, logs, or error responses.
 *
 * Supported Payload Format (JSON):
 * {
 *   "action": "create" | "update" | "delete" | "trash" | "publish" | "untrash" | "save_post",
 *   "post_type": "services" | "industries" | "locations" | "case_studies" | "posts" | "pages",
 *   "slug": "technical-seo",
 *   "old_slug": "previous-slug", // optional previous slug when changed
 *   "path": "/services/technical-seo" // optional explicit path override
 * }
 */

export const dynamic = 'force-dynamic';

// Deduplication sliding window map for webhook protection (3 seconds)
const recentWebhooks = new Map<string, number>();

function isDuplicateWebhook(key: string): boolean {
  const now = Date.now();
  for (const [k, timestamp] of recentWebhooks.entries()) {
    if (now - timestamp > 30000) {
      recentWebhooks.delete(k);
    }
  }
  const lastTime = recentWebhooks.get(key);
  if (lastTime && now - lastTime < 3000) {
    return true;
  }
  recentWebhooks.set(key, now);
  return false;
}

function safeTimingCompare(provided: string, expected: string): boolean {
  if (typeof provided !== 'string' || typeof expected !== 'string') {
    return false;
  }
  const bufProvided = Buffer.from(provided, 'utf8');
  const bufExpected = Buffer.from(expected, 'utf8');
  if (bufProvided.length !== bufExpected.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufProvided, bufExpected);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Server-Side Environment Secret Configuration (Fail-Closed)
    const configuredSecret = process.env.WORDPRESS_REVALIDATE_SECRET;
    if (!configuredSecret || configuredSecret.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // 2. Extract Provided Authentication Token from Headers
    const authHeader = req.headers.get('authorization') || '';
    let providedSecret: string | undefined;

    if (authHeader.toLowerCase().startsWith('bearer ')) {
      providedSecret = authHeader.slice(7).trim();
    } else if (req.headers.has('x-revalidate-secret')) {
      providedSecret = req.headers.get('x-revalidate-secret')?.trim();
    }

    // 3. Verify Authentication
    if (!providedSecret || !safeTimingCompare(providedSecret, configuredSecret)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // 4. Parse & Validate Request Payload
    let bodyData: Record<string, any> = {};
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        bodyData = await req.json();
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid JSON payload',
          },
          { status: 400 }
        );
      }
    } else {
      try {
        bodyData = await req.json();
      } catch {
        bodyData = {};
      }
    }

    // Extract CMS event details
    const action = String(bodyData.action || bodyData.event || bodyData.hook || 'update').toLowerCase();
    const rawPostType = String(
      bodyData.post_type || bodyData.postType || bodyData.type || ''
    ).toLowerCase();
    const rawSlug = String(
      bodyData.slug || bodyData.post_name || bodyData.post_slug || bodyData.postSlug || ''
    ).toLowerCase().trim();
    const oldSlug = String(
      bodyData.old_slug || bodyData.oldSlug || bodyData.previous_slug || bodyData.previousSlug || ''
    ).toLowerCase().trim();
    const explicitPath = bodyData.path;

    // Deduplication check
    const dedupKey = `${action}:${rawPostType}:${rawSlug}:${oldSlug}`;
    if (isDuplicateWebhook(dedupKey)) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        message: 'Duplicate webhook event suppressed within window',
        timestamp: new Date().toISOString(),
        action,
        post_type: rawPostType || 'all',
        slug: rawSlug || undefined,
      });
    }

    // 1. Invalidate WordPressProvider in-memory entity and collection caches
    if (rawPostType) {
      wordPressProvider.invalidateEntity(rawPostType, rawSlug || undefined, oldSlug || undefined);
    }
    wordPressProvider.clearCache();

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = ['wordpress', 'wp-all'];

    // 2. Next.js Data Cache Invalidation (revalidateTag)
    const safeRevalidateTag = (tag: string) => {
      try {
        (revalidateTag as any)(tag, 'max');
      } catch {
        try {
          (revalidateTag as any)(tag);
        } catch {
          // ignore outside of active Next.js server context
        }
      }
    };

    const safeRevalidatePath = (path: string, type?: 'layout' | 'page') => {
      try {
        if (type) {
          revalidatePath(path, type);
        } else {
          revalidatePath(path);
        }
      } catch {
        // ignore outside of active Next.js server context
      }
    };

    try {
      safeRevalidateTag('wordpress');
      safeRevalidateTag('wp-all');

      if (rawPostType) {
        if (rawPostType.includes('service')) {
          safeRevalidateTag('wp-services');
          revalidatedTags.push('wp-services');
          if (rawSlug) {
            safeRevalidateTag(`wp-services:${rawSlug}`);
            revalidatedTags.push(`wp-services:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-services:${oldSlug}`);
            revalidatedTags.push(`wp-services:${oldSlug}`);
          }
        } else if (rawPostType.includes('industr')) {
          safeRevalidateTag('wp-industries');
          revalidatedTags.push('wp-industries');
          if (rawSlug) {
            safeRevalidateTag(`wp-industries:${rawSlug}`);
            revalidatedTags.push(`wp-industries:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-industries:${oldSlug}`);
            revalidatedTags.push(`wp-industries:${oldSlug}`);
          }
        } else if (rawPostType.includes('location')) {
          safeRevalidateTag('wp-locations');
          revalidatedTags.push('wp-locations');
          if (rawSlug) {
            safeRevalidateTag(`wp-locations:${rawSlug}`);
            revalidatedTags.push(`wp-locations:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-locations:${oldSlug}`);
            revalidatedTags.push(`wp-locations:${oldSlug}`);
          }
        } else if (rawPostType.includes('case') || rawPostType.includes('stud')) {
          safeRevalidateTag('wp-case_studies');
          safeRevalidateTag('wp-case-studies');
          revalidatedTags.push('wp-case-studies');
          if (rawSlug) {
            safeRevalidateTag(`wp-case_studies:${rawSlug}`);
            safeRevalidateTag(`wp-case-studies:${rawSlug}`);
            revalidatedTags.push(`wp-case-studies:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-case_studies:${oldSlug}`);
            safeRevalidateTag(`wp-case-studies:${oldSlug}`);
            revalidatedTags.push(`wp-case-studies:${oldSlug}`);
          }
        } else if (rawPostType.includes('post') || rawPostType.includes('insight')) {
          safeRevalidateTag('wp-posts');
          safeRevalidateTag('wp-insights');
          safeRevalidateTag('wp-blog');
          revalidatedTags.push('wp-insights', 'wp-blog');
          if (rawSlug) {
            safeRevalidateTag(`wp-posts:${rawSlug}`);
            safeRevalidateTag(`wp-insights:${rawSlug}`);
            revalidatedTags.push(`wp-posts:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-posts:${oldSlug}`);
            safeRevalidateTag(`wp-insights:${oldSlug}`);
            revalidatedTags.push(`wp-posts:${oldSlug}`);
          }
        } else if (rawPostType.includes('page')) {
          safeRevalidateTag('wp-pages');
          revalidatedTags.push('wp-pages');
          if (rawSlug) {
            safeRevalidateTag(`wp-pages:${rawSlug}`);
            revalidatedTags.push(`wp-pages:${rawSlug}`);
          }
          if (oldSlug) {
            safeRevalidateTag(`wp-pages:${oldSlug}`);
            revalidatedTags.push(`wp-pages:${oldSlug}`);
          }
        }
      }
    } catch {
      // revalidateTag may be no-op during non-standard request contexts
    }

    // 3. Dynamic Route Resolution & Next.js Full Route Cache Invalidation (revalidatePath)
    if (explicitPath) {
      if (explicitPath === 'all' || explicitPath === '*') {
        safeRevalidatePath('/', 'layout');
        revalidatedPaths.push('/* (all routes)');
      } else {
        safeRevalidatePath(explicitPath);
        revalidatedPaths.push(explicitPath);
      }
    } else {
      if (rawPostType.includes('service')) {
        safeRevalidatePath('/services');
        revalidatedPaths.push('/services');
        if (rawSlug) {
          safeRevalidatePath(`/services/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`, 'page');
          revalidatedPaths.push(`/services/${rawSlug}`, `/${rawSlug}`);
        }
        if (oldSlug) {
          safeRevalidatePath(`/services/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`, 'page');
          revalidatedPaths.push(`/services/${oldSlug}`, `/${oldSlug}`);
        }
      } else if (rawPostType.includes('industr')) {
        safeRevalidatePath('/industries');
        revalidatedPaths.push('/industries');
        if (rawSlug) {
          safeRevalidatePath(`/industries/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`, 'page');
          revalidatedPaths.push(`/industries/${rawSlug}`, `/${rawSlug}`);
        }
        if (oldSlug) {
          safeRevalidatePath(`/industries/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`, 'page');
          revalidatedPaths.push(`/industries/${oldSlug}`, `/${oldSlug}`);
        }
      } else if (rawPostType.includes('location')) {
        safeRevalidatePath('/locations');
        revalidatedPaths.push('/locations');
        if (rawSlug) {
          safeRevalidatePath(`/locations/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`, 'page');
          revalidatedPaths.push(`/locations/${rawSlug}`, `/${rawSlug}`);
        }
        if (oldSlug) {
          safeRevalidatePath(`/locations/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`, 'page');
          revalidatedPaths.push(`/locations/${oldSlug}`, `/${oldSlug}`);
        }
      } else if (rawPostType.includes('case') || rawPostType.includes('stud')) {
        safeRevalidatePath('/case-studies');
        revalidatedPaths.push('/case-studies');
        if (rawSlug) {
          safeRevalidatePath(`/case-studies/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`);
          safeRevalidatePath(`/case-studies/${rawSlug}`, 'page');
          revalidatedPaths.push(`/case-studies/${rawSlug}`, `/${rawSlug}`);
        }
        if (oldSlug) {
          safeRevalidatePath(`/case-studies/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`, 'page');
          revalidatedPaths.push(`/case-studies/${oldSlug}`, `/${oldSlug}`);
        }
      } else if (rawPostType.includes('post') || rawPostType.includes('insight')) {
        safeRevalidatePath('/blog');
        safeRevalidatePath('/insights');
        revalidatedPaths.push('/blog', '/insights');
        if (rawSlug) {
          safeRevalidatePath(`/${rawSlug}`);
          safeRevalidatePath(`/blog/${rawSlug}`);
          safeRevalidatePath(`/insights/${rawSlug}`);
          safeRevalidatePath(`/${rawSlug}`, 'page');
          revalidatedPaths.push(`/${rawSlug}`, `/blog/${rawSlug}`, `/insights/${rawSlug}`);
        }
        if (oldSlug) {
          safeRevalidatePath(`/${oldSlug}`);
          safeRevalidatePath(`/blog/${oldSlug}`);
          safeRevalidatePath(`/insights/${oldSlug}`);
          safeRevalidatePath(`/${oldSlug}`, 'page');
          revalidatedPaths.push(`/${oldSlug}`, `/blog/${oldSlug}`, `/insights/${oldSlug}`);
        }
      } else if (rawPostType.includes('page')) {
        const pagePath = rawSlug === 'home' || !rawSlug ? '/' : `/${rawSlug}`;
        safeRevalidatePath(pagePath);
        safeRevalidatePath(pagePath, 'page');
        revalidatedPaths.push(pagePath);
        if (oldSlug) {
          const oldPagePath = `/${oldSlug}`;
          safeRevalidatePath(oldPagePath);
          safeRevalidatePath(oldPagePath, 'page');
          revalidatedPaths.push(oldPagePath);
        }
      } else {
        // Fallback for general or unspecified CMS events
        safeRevalidatePath('/services');
        safeRevalidatePath('/industries');
        safeRevalidatePath('/locations');
        safeRevalidatePath('/case-studies');
        safeRevalidatePath('/blog');
        safeRevalidatePath('/insights');
        revalidatedPaths.push('/services', '/industries', '/locations', '/case-studies', '/blog', '/insights');
      }
    }

    // Always revalidate api content endpoint for client-side navigation
    safeRevalidatePath('/api/content');
    revalidatedPaths.push('/api/content');

    // Always revalidate homepage and global layout for updated nav/footer/widgets
    safeRevalidatePath('/');
    safeRevalidatePath('/', 'layout');
    revalidatedPaths.push('/', '/layout');

    // Revalidate sitemap
    safeRevalidatePath('/sitemap.xml');
    safeRevalidatePath('/sitemap');
    revalidatedPaths.push('/sitemap.xml');

    // Immediate Synchronous Cache Refetching & Pre-warming
    try {
      if (rawPostType.includes('service')) {
        await wordPressProvider.asyncGetAllServices();
      } else if (rawPostType.includes('industr')) {
        await wordPressProvider.asyncGetAllIndustries();
      } else if (rawPostType.includes('location')) {
        await wordPressProvider.asyncGetAllLocations();
      } else if (rawPostType.includes('case') || rawPostType.includes('stud')) {
        await wordPressProvider.asyncGetAllCaseStudies();
      } else if (rawPostType.includes('post') || rawPostType.includes('insight')) {
        await wordPressProvider.asyncGetAllInsights();
      } else if (rawPostType.includes('page')) {
        await wordPressProvider.asyncGetAllPages();
      } else {
        await wordPressProvider.refreshAll();
      }
    } catch {
      // ignore pre-warming network hiccups
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      action,
      post_type: rawPostType || 'all',
      slug: rawSlug || undefined,
      old_slug: oldSlug || undefined,
      revalidatedPaths,
      revalidatedTags,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error during CMS revalidation',
      },
      { status: 500 }
    );
  }
}

// Strictly reject GET or unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method Not Allowed. Use POST with Authorization secret token.',
    },
    { status: 405 }
  );
}
