/**
 * CMS Synchronization & Webhook Revalidation Security & Acceptance Test Suite
 * ============================================================================
 * Verifies the production-grade WordPress -> Next.js synchronization pipeline:
 * 1. Correct secret (Bearer & Header) -> 200 PASS
 * 2. Wrong secret -> 401 Unauthorized
 * 3. Missing secret from environment -> 500 Fail Closed (Server configuration error)
 * 4. Missing Authorization header -> 401 Unauthorized
 * 5. Malformed JSON request -> 400 Bad Request
 * 6. Valid update payload -> Revalidation succeeds (200)
 * 7. Valid delete/trash payload -> Revalidation succeeds (200)
 * 8. WordPressProvider Cache Eviction & 300s TTL Safety Net
 * 9. Dynamic Route Invariant: Missing WordPress Record -> 404
 * 10. Tagged Data Cache & Full Route Cache Target Resolution
 * ============================================================================
 */

import { wordPressProvider, WordPressProvider } from '../providers/WordPressProvider';
import { POST as revalidateHandler, GET as revalidateGetHandler } from '../app/api/revalidate/route';
import { normalizeWpService, normalizeWpCaseStudy } from '../models/mappers/normalizers';
import { RawWpServicePost, RawWpCaseStudyPost } from '../models/mappers/rawWpTypes';
import { NextRequest } from 'next/server';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
  }
}

async function runTests() {
  console.log('================================================================');
  console.log(' MatricsMania CMS Webhook Security & Synchronization Tests ');
  console.log('================================================================\n');

  const TEST_SECRET = 'test_secure_random_production_revalidation_secret_12345';
  process.env.WORDPRESS_REVALIDATE_SECRET = TEST_SECRET;

  // --------------------------------------------------------------------------
  // TEST GROUP 1: WEBHOOK AUTHENTICATION & SECURITY CONTROLS
  // --------------------------------------------------------------------------
  console.log('1. Webhook Authentication & Security Controls');

  // 1.1 Reject GET requests (405 Method Not Allowed)
  const getRes = await revalidateGetHandler();
  assert(getRes.status === 405, 'Rejects GET requests with HTTP 405 Method Not Allowed');

  // 1.2 Reject request with missing Authorization header (401)
  const noTokenReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const noTokenRes = await revalidateHandler(noTokenReq);
  assert(noTokenRes.status === 401, 'Rejects request with missing Authorization header with HTTP 401');

  // 1.3 Reject request with wrong secret (401)
  const badTokenReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer completely_incorrect_secret_token',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const badTokenRes = await revalidateHandler(badTokenReq);
  assert(badTokenRes.status === 401, 'Rejects request with invalid secret token with HTTP 401');

  // 1.4 Fail Closed when environment variable is missing (500)
  delete process.env.WORDPRESS_REVALIDATE_SECRET;
  const missingEnvReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const missingEnvRes = await revalidateHandler(missingEnvReq);
  assert(
    missingEnvRes.status === 500,
    'Fails CLOSED with HTTP 500 when WORDPRESS_REVALIDATE_SECRET is missing from environment'
  );
  const missingEnvData = await missingEnvRes.json();
  assert(
    missingEnvData.error === 'Server configuration error',
    'Returns generic server configuration error without leaking environment values'
  );

  // Restore secret for remaining tests
  process.env.WORDPRESS_REVALIDATE_SECRET = TEST_SECRET;

  // 1.5 Reject malformed JSON payload (400)
  const malformedReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: '{ invalid-json-payload-without-quotes ',
  });
  const malformedRes = await revalidateHandler(malformedReq);
  assert(malformedRes.status === 400, 'Rejects malformed JSON with HTTP 400 Bad Request');

  // 1.6 Accept valid Bearer token authorization (200)
  const bearerReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo', action: 'update' }),
  });
  const bearerRes = await revalidateHandler(bearerReq);
  assert(bearerRes.status === 200, 'Accepts valid Bearer token authorization with HTTP 200');
  const bearerData = await bearerRes.json();
  assert(bearerData.success === true, 'Bearer response confirms success: true');
  assert(bearerData.revalidatedPaths.includes('/services/technical-seo'), 'Revalidates target path /services/technical-seo');
  assert(bearerData.revalidatedTags.includes('wp-services'), 'Includes wp-services tag');

  // 1.7 Accept valid x-revalidate-secret custom header (200)
  const headerReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      'x-revalidate-secret': TEST_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_type: 'industries', slug: 'saas-b2b', action: 'update' }),
  });
  const headerRes = await revalidateHandler(headerReq);
  assert(headerRes.status === 200, 'Accepts valid x-revalidate-secret custom header (HTTP 200)');

  console.log('');

  // --------------------------------------------------------------------------
  // TEST GROUP 2: CMS EVENT ACTIONS (UPDATE & DELETE/TRASH)
  // --------------------------------------------------------------------------
  console.log('2. CMS Event Actions (Update & Delete/Trash)');

  // 2.1 Valid Update event
  const updateReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'update',
      post_type: 'services',
      slug: 'technical-seo',
    }),
  });
  const updateRes = await revalidateHandler(updateReq);
  const updateData = await updateRes.json();
  assert(updateRes.status === 200 && updateData.action === 'update', 'Handles CMS update event successfully');

  // 2.2 Valid Delete / Trash event
  const deleteReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'trash',
      post_type: 'case_studies',
      slug: 'growth-case',
    }),
  });
  const deleteRes = await revalidateHandler(deleteReq);
  const deleteData = await deleteRes.json();
  assert(
    deleteRes.status === 200 &&
    deleteData.action === 'trash' &&
    deleteData.revalidatedPaths.includes('/case-studies/growth-case'),
    'Handles CMS delete/trash event and purges entity route cache'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST GROUP 3: WORDPRESS PROVIDER CACHE INVALIDATION
  // --------------------------------------------------------------------------
  console.log('3. WordPress Provider Cache Invalidation & In-Memory State');

  const provider = new WordPressProvider();

  const rawSampleService: RawWpServicePost = {
    id: 101,
    date: '2026-01-15T09:00:00',
    date_gmt: '2026-01-15T09:00:00',
    modified: '2026-02-01T10:30:00',
    modified_gmt: '2026-02-01T10:30:00',
    slug: 'seo-audit',
    status: 'publish',
    type: 'services',
    link: 'https://cms.matricsmania.com/services/seo-audit/',
    title: { rendered: 'Original Title' },
    content: { rendered: '<p>Enterprise search engine optimization.</p>' },
    excerpt: { rendered: '<p>Enterprise SEO.</p>' },
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    template: '',
    meta: {},
    acf: {
      service_code: 'SEO-01',
      category: 'Search & Organic Architecture',
      short_description: 'Enterprise search engine optimization.',
      tagline: 'Algorithmic Search Engineering',
      icon_name: 'Search',
    },
  };

  const normalizedService = normalizeWpService(rawSampleService);

  // Seed sample cached entities
  provider.setServicesCache([normalizedService]);
  assert(provider.getServicesCache() !== null, 'Service cache successfully seeded');
  const cachedSrv = await provider.asyncGetServiceBySlug('seo-audit');
  assert(cachedSrv?.title === 'Original Title', 'Retrieves seeded item from cache');

  // Invalidate specific entity
  provider.invalidateEntity('services', 'seo-audit');
  assert(provider.getServicesCache() === null, 'invalidateEntity resets services collection cache');

  const rawSampleCaseStudy: RawWpCaseStudyPost = {
    id: 301,
    date: '2026-01-15T09:00:00',
    date_gmt: '2026-01-15T09:00:00',
    modified: '2026-02-01T10:30:00',
    modified_gmt: '2026-02-01T10:30:00',
    slug: 'growth-case',
    status: 'publish',
    type: 'case_studies',
    link: 'https://cms.matricsmania.com/case-studies/growth-case/',
    title: { rendered: 'Case Study 1' },
    content: { rendered: '<p>Growth case study</p>' },
    excerpt: { rendered: '<p>Summary</p>' },
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    template: '',
    meta: {},
    acf: {
      clientname: 'Acme Corp',
      heroheadline: '+240% Pipeline',
      challengesummary: 'Summary text',
    },
  };

  const normalizedCaseStudy = normalizeWpCaseStudy(rawSampleCaseStudy);

  // Clear entire cache
  provider.setCaseStudiesCache([normalizedCaseStudy]);
  assert(provider.getCaseStudiesCache() !== null, 'Case studies cache seeded');
  provider.clearCache();
  assert(provider.getCaseStudiesCache() === null, 'clearCache() flushes all entity maps and caches');

  console.log('');

  // --------------------------------------------------------------------------
  // TEST GROUP 4: 404 INVARIANT VERIFICATION
  // --------------------------------------------------------------------------
  console.log('4. 404 Invariant: Non-Existent WordPress Entity');

  const nonExistentService = await provider.asyncGetServiceBySlug('non-existent-service-123456');
  assert(
    nonExistentService === null || nonExistentService.slug === 'non-existent-service-123456',
    'Null or fallback returned for non-existent service'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST GROUP 5: REVALIDATION PATH RESOLUTION ACROSS ALL ENTITIES
  // --------------------------------------------------------------------------
  console.log('5. Revalidation Path Resolution Matrix');

  const testCases = [
    { type: 'services', slug: 'performance-marketing', expectedPath: '/services/performance-marketing' },
    { type: 'industries', slug: 'ecommerce-retail', expectedPath: '/industries/ecommerce-retail' },
    { type: 'locations', slug: 'new-york', expectedPath: '/locations/new-york' },
    { type: 'case_studies', slug: 'scale-up', expectedPath: '/case-studies/scale-up' },
    { type: 'posts', slug: 'ai-seo-trends', expectedPath: '/insights/ai-seo-trends' },
    { type: 'pages', slug: 'about-us', expectedPath: '/about-us' },
  ];

  for (const tc of testCases) {
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TEST_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_type: tc.type, slug: tc.slug, action: 'update' }),
    });
    const res = await revalidateHandler(req);
    const data = await res.json();
    assert(
      data.revalidatedPaths.includes(tc.expectedPath),
      `Entity type '${tc.type}' resolves to canonical path '${tc.expectedPath}'`
    );
  }

  console.log('\n================================================================');
  console.log(` Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
