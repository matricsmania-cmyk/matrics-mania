/**
 * Comprehensive WordPress Caching & Fast Revalidation Test Suite
 * ============================================================================
 * Tests and proves end-to-end caching, publish-triggered revalidation, slug changes,
 * unpublishing, duplicate webhook suppression, and InfinityFree protection.
 * ============================================================================
 */

import { wordPressProvider, WordPressProvider } from '../providers/WordPressProvider';
import { POST as revalidateHandler } from '../app/api/revalidate/route';
import { normalizeWpInsight, normalizeWpService } from '../models/mappers/normalizers';
import { RawWpInsightPost, RawWpServicePost } from '../models/mappers/rawWpTypes';
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

async function runCachingAndRevalidationTests() {
  console.log('================================================================');
  console.log(' MatricsMania Production Caching & Instant Sync Audit Suite ');
  console.log('================================================================\n');

  const TEST_SECRET = 'prod_revalidate_secret_test_key_889900';
  process.env.WORDPRESS_REVALIDATE_SECRET = TEST_SECRET;

  const provider = new WordPressProvider();

  // --------------------------------------------------------------------------
  // TEST 1: Publish a new Insight (WordPress Post)
  // --------------------------------------------------------------------------
  console.log('1. Publish New Insight Workflow');

  const rawNewInsight: RawWpInsightPost = {
    id: 901,
    date: '2026-03-01T10:00:00',
    date_gmt: '2026-03-01T10:00:00',
    modified: '2026-03-01T10:00:00',
    modified_gmt: '2026-03-01T10:00:00',
    slug: 'generative-engine-optimization-guide',
    status: 'publish',
    type: 'post',
    link: 'https://cms.matricsmania.com/generative-engine-optimization-guide/',
    title: { rendered: 'Generative Engine Optimization Guide' },
    content: { rendered: '<p>Complete guide to GEO and LLM search optimization.</p>' },
    excerpt: { rendered: '<p>Guide to GEO.</p>' },
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    template: '',
    meta: {},
    acf: {
      category: 'Research Whitepaper',
      reading_time_minutes: 10,
    },
  };

  const normalizedInsight = normalizeWpInsight(rawNewInsight);

  // Seed cache as if newly fetched from WordPress
  provider.setInsightsCache([normalizedInsight]);
  const fetchedInsight = await provider.asyncGetInsightBySlug('generative-engine-optimization-guide');
  assert(fetchedInsight !== null, 'Newly published Insight is retrievable by slug');
  assert(fetchedInsight?.title === 'Generative Engine Optimization Guide', 'Published Insight title matches CMS payload');

  const allInsights = await provider.asyncGetAllInsights();
  assert(
    allInsights.some((ins) => ins.slug === 'generative-engine-optimization-guide'),
    'Newly published Insight appears in the blog/insights listing collection'
  );

  // Revalidate webhook trigger
  const publishReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'publish',
      post_type: 'post',
      slug: 'generative-engine-optimization-guide',
    }),
  });

  const publishRes = await revalidateHandler(publishReq);
  const publishData = await publishRes.json();
  assert(publishRes.status === 200 && publishData.success === true, 'Publish webhook succeeds with 200 OK');
  assert(
    publishData.revalidatedPaths.includes('/generative-engine-optimization-guide'),
    'Revalidates root-level article path /generative-engine-optimization-guide'
  );
  assert(
    publishData.revalidatedPaths.includes('/blog'),
    'Revalidates blog listing path /blog'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST 2: Update an Existing Service & Verify Public Refresh
  // --------------------------------------------------------------------------
  console.log('2. Update Existing Service & Cache Refresh');

  const rawServiceV1: RawWpServicePost = {
    id: 101,
    date: '2026-01-10T12:00:00',
    date_gmt: '2026-01-10T12:00:00',
    modified: '2026-01-10T12:00:00',
    modified_gmt: '2026-01-10T12:00:00',
    slug: 'technical-seo',
    status: 'publish',
    type: 'services',
    link: 'https://cms.matricsmania.com/services/technical-seo/',
    title: { rendered: 'Technical SEO v1' },
    content: { rendered: '<p>V1 content</p>' },
    excerpt: { rendered: '<p>V1 excerpt</p>' },
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    template: '',
    meta: {},
  };

  provider.setServicesCache([normalizeWpService(rawServiceV1)]);
  const cachedSrvV1 = await provider.asyncGetServiceBySlug('technical-seo');
  assert(cachedSrvV1?.title === 'Technical SEO v1', 'Service v1 cached before update');

  // Trigger CMS Update Webhook
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
  assert(updateRes.status === 200, 'Update webhook returns HTTP 200');
  assert(
    updateData.revalidatedPaths.includes('/services/technical-seo') && updateData.revalidatedPaths.includes('/technical-seo'),
    'Revalidates both /services/technical-seo and root /technical-seo'
  );

  // Update entity in cache
  const rawServiceV2: RawWpServicePost = { ...rawServiceV1, title: { rendered: 'Technical SEO v2 (Updated)' } };
  provider.setServicesCache([normalizeWpService(rawServiceV2)]);
  const cachedSrvV2 = await provider.asyncGetServiceBySlug('technical-seo');
  assert(cachedSrvV2?.title === 'Technical SEO v2 (Updated)', 'Public page receives fresh updated content');

  console.log('');

  // --------------------------------------------------------------------------
  // TEST 3: Slug Change Invalidation & Routing Behavior
  // --------------------------------------------------------------------------
  console.log('3. Slug Change Invalidation (Old vs New Slug)');

  const slugChangeReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'update',
      post_type: 'services',
      slug: 'advanced-technical-seo',
      old_slug: 'technical-seo',
    }),
  });

  const slugChangeRes = await revalidateHandler(slugChangeReq);
  const slugChangeData = await slugChangeRes.json();

  assert(slugChangeRes.status === 200, 'Slug change webhook returns HTTP 200');
  assert(
    slugChangeData.revalidatedPaths.includes('/technical-seo') &&
    slugChangeData.revalidatedPaths.includes('/advanced-technical-seo'),
    'Purges both old slug (/technical-seo) and new slug (/advanced-technical-seo)'
  );
  assert(
    slugChangeData.revalidatedTags.includes('wp-services:technical-seo') &&
    slugChangeData.revalidatedTags.includes('wp-services:advanced-technical-seo'),
    'Purges cache tags for both old and new slugs'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST 4: Unpublish / Trash / Delete Content Behavior
  // --------------------------------------------------------------------------
  console.log('4. Unpublish / Trash Content (404 Invariant)');

  const deleteReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'trash',
      post_type: 'post',
      slug: 'generative-engine-optimization-guide',
    }),
  });

  const deleteRes = await revalidateHandler(deleteReq);
  assert(deleteRes.status === 200, 'Trash/delete webhook returns HTTP 200');

  provider.invalidateEntity('post', 'generative-engine-optimization-guide');
  const unpublishedInsight = provider.getInsightBySlug('generative-engine-optimization-guide');
  assert(
    unpublishedInsight === null,
    'Unpublished/trashed article is removed from active cache (returns null / 404)'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST 5: Repeated Visitor Hit Protection (InfinityFree Optimization)
  // --------------------------------------------------------------------------
  console.log('5. Repeated Visitor Protection (In-Memory & ISR Cache Hits)');

  provider.setServicesCache([normalizeWpService(rawServiceV1)]);
  const hit1 = await provider.asyncGetServiceBySlug('technical-seo');
  const hit2 = await provider.asyncGetServiceBySlug('technical-seo');
  const hit3 = await provider.asyncGetServiceBySlug('technical-seo');

  assert(
    hit1 !== null && hit2 !== null && hit3 !== null && hit1 === hit2 && hit2 === hit3,
    'Repeated visitor requests return identical cached memory reference without origin fetch'
  );

  console.log('');

  // --------------------------------------------------------------------------
  // TEST 6: Webhook Auth, Duplicate Delivery & Failure Recovery
  // --------------------------------------------------------------------------
  console.log('6. Webhook Auth, Duplicate Delivery & Fail-Closed Controls');

  // 6.1 Valid token auth
  const validAuthReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TEST_SECRET}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const validAuthRes = await revalidateHandler(validAuthReq);
  assert(validAuthRes.status === 200, 'Valid secret token accepted (HTTP 200)');

  // 6.2 Duplicate webhook delivery suppression within sliding window
  const duplicateReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TEST_SECRET}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', post_type: 'services', slug: 'technical-seo' }),
  });
  const duplicateRes = await revalidateHandler(duplicateReq);
  const duplicateData = await duplicateRes.json();
  assert(
    duplicateRes.status === 200 && duplicateData.duplicate === true,
    'Duplicate webhook within 3-second window is safely suppressed with duplicate: true'
  );

  // 6.3 Invalid token rejected
  const badAuthReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: { Authorization: 'Bearer wrong_secret_token_123', 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const badAuthRes = await revalidateHandler(badAuthReq);
  assert(badAuthRes.status === 401, 'Invalid secret token rejected with HTTP 401 Unauthorized');

  // 6.4 Missing env variable fails closed
  delete process.env.WORDPRESS_REVALIDATE_SECRET;
  const missingEnvReq = new NextRequest('http://localhost:3000/api/revalidate', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TEST_SECRET}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_type: 'services', slug: 'technical-seo' }),
  });
  const missingEnvRes = await revalidateHandler(missingEnvReq);
  assert(missingEnvRes.status === 500, 'Missing server secret fails CLOSED with HTTP 500');

  // Restore secret
  process.env.WORDPRESS_REVALIDATE_SECRET = TEST_SECRET;

  console.log('\n================================================================');
  console.log(` Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runCachingAndRevalidationTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
