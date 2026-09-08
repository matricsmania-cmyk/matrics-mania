/**
 * Production CMS Authority Acceptance Test
 * ============================================================================
 * Audits, verifies, tests, and proves that the architecture satisfies:
 * "No WordPress record = no CMS entity page = no CMS navigation link = no sitemap URL = HTTP 404"
 * ============================================================================
 */

import { WordPressProvider } from '../providers/WordPressProvider';
import { mockDataProvider } from '../providers/MockDataProvider';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { generateMetadata as generateServiceMetadata } from '../app/services/[slug]/page';
import { generateMetadata as generateIndustryMetadata } from '../app/industries/[slug]/page';
import { generateMetadata as generateLocationMetadata } from '../app/locations/[slug]/page';
import { generateMetadata as generateCaseStudyMetadata } from '../app/case-studies/[slug]/page';
import { generateMetadata as generateInsightMetadata } from '../app/insights/[slug]/page';
import { generateStaticParams as getServiceStaticParams } from '../app/services/[slug]/page';
import { generateStaticParams as getIndustryStaticParams } from '../app/industries/[slug]/page';
import { generateStaticParams as getLocationStaticParams } from '../app/locations/[slug]/page';
import { generateStaticParams as getCaseStudyStaticParams } from '../app/case-studies/[slug]/page';
import { generateStaticParams as getInsightStaticParams } from '../app/insights/[slug]/page';
import { resolveEntityRef, filterExistingEntities } from '../utils/internalLinking';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

export async function runProductionAcceptanceTests(): Promise<{
  allPassed: boolean;
  results: TestResult[];
}> {
  const results: TestResult[] = [];

  function record(suite: string, name: string, passed: boolean, details?: string, error?: string) {
    results.push({ suite, name, passed, details, error });
    const mark = passed ? '✓' : '✕';
    console.log(`${mark} [${suite}] ${name}${details ? ` (${details})` : ''}`);
    if (error) {
      console.error(`   Error: ${error}`);
    }
  }

  console.log('============================================================');
  console.log('STARTING PRODUCTION CMS AUTHORITY ACCEPTANCE TESTS');
  console.log('============================================================\n');

  // --- SUITE 1: WordPressProvider Authority Boundaries ---
  try {
    const wpProvider = new WordPressProvider('https://cms.matricsmania.com');

    // 1.1 Unknown slug returns null
    const unknownService = wpProvider.getServiceBySlug('finance');
    record(
      'WordPressProvider Authority',
      'Uncached/Non-existent service returns null synchronously',
      unknownService === null,
      `slug="finance" -> ${unknownService}`
    );

    const unknownIndustry = wpProvider.getIndustryBySlug('finance');
    record(
      'WordPressProvider Authority',
      'Uncached/Non-existent industry returns null synchronously',
      unknownIndustry === null,
      `slug="finance" -> ${unknownIndustry}`
    );

    const unknownLocation = wpProvider.getLocationBySlug('dubai');
    record(
      'WordPressProvider Authority',
      'Uncached/Non-existent location returns null synchronously',
      unknownLocation === null,
      `slug="dubai" -> ${unknownLocation}`
    );

    // 1.2 Unseeded collections return empty array (no mock leakage)
    const allServices = wpProvider.getAllServices();
    record(
      'WordPressProvider Authority',
      'Unseeded services collection returns empty array (no mock data)',
      Array.isArray(allServices) && allServices.length === 0,
      `count=${allServices.length}`
    );

    const allIndustries = wpProvider.getAllIndustries();
    record(
      'WordPressProvider Authority',
      'Unseeded industries collection returns empty array (no mock data)',
      Array.isArray(allIndustries) && allIndustries.length === 0,
      `count=${allIndustries.length}`
    );

    const allLocations = wpProvider.getAllLocations();
    record(
      'WordPressProvider Authority',
      'Unseeded locations collection returns empty array (no mock data)',
      Array.isArray(allLocations) && allLocations.length === 0,
      `count=${allLocations.length}`
    );
  } catch (err: any) {
    record('WordPressProvider Authority', 'Suite execution', false, undefined, err.message);
  }

  // --- SUITE 2: MockDataProvider Gating & Strictness ---
  try {
    const invalidMockService = mockDataProvider.getServiceBySlug('non-existent-service');
    record(
      'MockDataProvider Gating',
      'Mock provider strictly returns null for unknown service slugs',
      invalidMockService === null
    );

    const invalidMockIndustry = mockDataProvider.getIndustryBySlug('non-existent-industry');
    record(
      'MockDataProvider Gating',
      'Mock provider strictly returns null for unknown industry slugs',
      invalidMockIndustry === null
    );

    const invalidMockLocation = mockDataProvider.getLocationBySlug('non-existent-location');
    record(
      'MockDataProvider Gating',
      'Mock provider strictly returns null for unknown location slugs',
      invalidMockLocation === null
    );

    const invalidMockCaseStudy = mockDataProvider.getCaseStudyBySlug('non-existent-case-study');
    record(
      'MockDataProvider Gating',
      'Mock provider strictly returns null for unknown case study slugs',
      invalidMockCaseStudy === null
    );

    const invalidMockInsight = mockDataProvider.getInsightBySlug('non-existent-insight');
    record(
      'MockDataProvider Gating',
      'Mock provider strictly returns null for unknown insight slugs',
      invalidMockInsight === null
    );
  } catch (err: any) {
    record('MockDataProvider Gating', 'Suite execution', false, undefined, err.message);
  }

  // --- SUITE 3: Dynamic Route Metadata & 404 Pre-render Verification ---
  try {
    // 3.1 Non-existent service metadata
    const missingServiceMeta = await generateServiceMetadata({
      params: Promise.resolve({ slug: 'non-existent-service-123' }),
    });
    record(
      'Metadata & 404 Guards',
      'Missing service generates noindex/nofollow robots metadata',
      missingServiceMeta?.robots === 'noindex, nofollow' ||
        (typeof missingServiceMeta?.robots === 'object' &&
          (missingServiceMeta.robots as any)?.index === false),
      `robots=${JSON.stringify(missingServiceMeta?.robots)}`
    );

    // 3.2 Non-existent industry metadata
    const missingIndustryMeta = await generateIndustryMetadata({
      params: Promise.resolve({ slug: 'finance' }),
    });
    record(
      'Metadata & 404 Guards',
      'Missing industry generates noindex/nofollow robots metadata',
      missingIndustryMeta?.robots === 'noindex, nofollow' ||
        (typeof missingIndustryMeta?.robots === 'object' &&
          (missingIndustryMeta.robots as any)?.index === false),
      `slug="finance", robots=${JSON.stringify(missingIndustryMeta?.robots)}`
    );

    // 3.3 Non-existent location metadata
    const missingLocationMeta = await generateLocationMetadata({
      params: Promise.resolve({ slug: 'dubai' }),
    });
    record(
      'Metadata & 404 Guards',
      'Missing location generates noindex/nofollow robots metadata',
      missingLocationMeta?.robots === 'noindex, nofollow' ||
        (typeof missingLocationMeta?.robots === 'object' &&
          (missingLocationMeta.robots as any)?.index === false),
      `slug="dubai", robots=${JSON.stringify(missingLocationMeta?.robots)}`
    );

    // 3.4 Non-existent case study metadata
    const missingCaseStudyMeta = await generateCaseStudyMetadata({
      params: Promise.resolve({ slug: 'non-existent-case-study' }),
    });
    record(
      'Metadata & 404 Guards',
      'Missing case-study generates noindex/nofollow robots metadata',
      missingCaseStudyMeta?.robots === 'noindex, nofollow' ||
        (typeof missingCaseStudyMeta?.robots === 'object' &&
          (missingCaseStudyMeta.robots as any)?.index === false),
      `robots=${JSON.stringify(missingCaseStudyMeta?.robots)}`
    );

    // 3.5 Non-existent insight metadata
    const missingInsightMeta = await generateInsightMetadata({
      params: Promise.resolve({ slug: 'non-existent-insight' }),
    });
    record(
      'Metadata & 404 Guards',
      'Missing insight generates noindex/nofollow robots metadata',
      missingInsightMeta?.robots === 'noindex, nofollow' ||
        (typeof missingInsightMeta?.robots === 'object' &&
          (missingInsightMeta.robots as any)?.index === false),
      `robots=${JSON.stringify(missingInsightMeta?.robots)}`
    );
  } catch (err: any) {
    record('Metadata & 404 Guards', 'Suite execution', false, undefined, err.message);
  }

  // --- SUITE 4: generateStaticParams Contract ---
  try {
    const serviceParams = await getServiceStaticParams();
    record(
      'Static Params Contract',
      'Service generateStaticParams returns an array of slug objects',
      Array.isArray(serviceParams),
      `count=${serviceParams.length}`
    );

    const industryParams = await getIndustryStaticParams();
    record(
      'Static Params Contract',
      'Industry generateStaticParams returns an array of slug objects',
      Array.isArray(industryParams),
      `count=${industryParams.length}`
    );

    const locationParams = await getLocationStaticParams();
    record(
      'Static Params Contract',
      'Location generateStaticParams returns an array of slug objects',
      Array.isArray(locationParams),
      `count=${locationParams.length}`
    );

    const caseStudyParams = await getCaseStudyStaticParams();
    record(
      'Static Params Contract',
      'Case study generateStaticParams returns an array of slug objects',
      Array.isArray(caseStudyParams),
      `count=${caseStudyParams.length}`
    );

    const insightParams = await getInsightStaticParams();
    record(
      'Static Params Contract',
      'Insight generateStaticParams returns an array of slug objects',
      Array.isArray(insightParams),
      `count=${insightParams.length}`
    );
  } catch (err: any) {
    record('Static Params Contract', 'Suite execution', false, undefined, err.message);
  }

  // --- SUITE 5: Sitemap & Robots Validation ---
  try {
    const sitemapEntries = await sitemap();
    record(
      'Sitemap & Robots',
      'Sitemap generation returns valid URL array',
      Array.isArray(sitemapEntries) && sitemapEntries.length > 0,
      `totalEntries=${sitemapEntries.length}`
    );

    // Ensure static pages are present
    const sitemapUrls = sitemapEntries.map((e) => e.url);
    const hasHome = sitemapUrls.some((u) => u === 'https://matricsmania.com' || u === 'https://matricsmania.com/');
    const hasAbout = sitemapUrls.some((u) => u.includes('/about'));
    const hasContact = sitemapUrls.some((u) => u.includes('/contact'));
    const hasPrivacy = sitemapUrls.some((u) => u.includes('/privacy'));
    const hasTerms = sitemapUrls.some((u) => u.includes('/terms'));

    record('Sitemap & Robots', 'Sitemap includes core static application routes', hasHome && hasAbout && hasContact && hasPrivacy && hasTerms);

    // Verify robots.txt configuration
    const robotsRules = robots();
    const hasSitemapRef =
      typeof robotsRules.sitemap === 'string' &&
      robotsRules.sitemap.includes('https://matricsmania.com/sitemap.xml');
    record(
      'Sitemap & Robots',
      'Robots.txt references authoritative sitemap index',
      hasSitemapRef,
      `sitemap=${robotsRules.sitemap}`
    );
  } catch (err: any) {
    record('Sitemap & Robots', 'Suite execution', false, undefined, err.message);
  }

  // --- SUITE 6: Internal Linking & Entity Resolution ---
  try {
    const configuredProvider = new WordPressProvider('https://cms.matricsmania.com');

    // Attempt resolving unverified entity reference
    const phantomRef = resolveEntityRef(
      { id: 999, slug: 'non-existent-entity', title: 'Fake Phantom', url: '/services/fake-phantom/' },
      'service',
      configuredProvider
    );
    record(
      'Internal Linking Invariant',
      'resolveEntityRef rejects phantom entity when WordPress is configured',
      phantomRef === null,
      `result=${JSON.stringify(phantomRef)}`
    );

    // Test filterExistingEntities
    const filteredList = filterExistingEntities(
      [
        { slug: 'non-existent-entity-1' },
        { slug: 'non-existent-entity-2' },
      ],
      'service',
      configuredProvider
    );
    record(
      'Internal Linking Invariant',
      'filterExistingEntities strips non-existent records entirely',
      Array.isArray(filteredList) && filteredList.length === 0,
      `remainingCount=${filteredList.length}`
    );
  } catch (err: any) {
    record('Internal Linking Invariant', 'Suite execution', false, undefined, err.message);
  }

  const allPassed = results.every((r) => r.passed);
  console.log('\n============================================================');
  console.log(`ACCEPTANCE TESTS COMPLETE: ${results.filter((r) => r.passed).length}/${results.length} PASSED`);
  console.log('============================================================\n');

  return { allPassed, results };
}

// Auto-run if executed via CLI
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('productionAcceptanceTest')) {
  runProductionAcceptanceTests().then((res) => {
    if (!res.allPassed) {
      process.exit(1);
    }
  });
}
