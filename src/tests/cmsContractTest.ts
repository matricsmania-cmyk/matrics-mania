/**
 * CMS Contract Validation Test Suite
 * ============================================================================
 * Validates that raw WordPress REST responses, when processed by domain normalizers,
 * strictly conform to the expected MatricsMania domain model contract.
 *
 * This contract prevents WordPress schema changes, field renames, or plugin updates
 * from silently breaking the frontend application.
 * ============================================================================
 */

import {
  RawWpServicePost,
  RawWpIndustryPost,
  RawWpLocationPost,
  RawWpInsightPost,
  RawWpCaseStudyPost,
  RawWpBasePost,
} from '../models/mappers/rawWpTypes';
import {
  normalizeWpService,
  normalizeWpIndustry,
  normalizeWpLocation,
  normalizeWpInsight,
  normalizeWpCaseStudy,
  normalizeWpPage,
} from '../models/mappers/normalizers';
import { Service } from '../models/entities/service';
import { Industry } from '../models/entities/industry';
import { Location } from '../models/entities/location';
import { Insight } from '../models/entities/insight';
import { CaseStudy } from '../models/entities/caseStudy';
import { Page } from '../models/entities/page';
import { SEO } from '../models/seo';

// Test Assertion Utilities
class ContractAssertionError extends Error {
  constructor(entityName: string, fieldName: string, expected: string, actual: any) {
    super(`[CMS Contract Failure] ${entityName}.${fieldName}: Expected ${expected}, received ${JSON.stringify(actual)}`);
    this.name = 'ContractAssertionError';
  }
}

function assertDefined(entityName: string, fieldName: string, value: any) {
  if (value === undefined || value === null) {
    throw new ContractAssertionError(entityName, fieldName, 'non-null defined value', value);
  }
}

function assertString(entityName: string, fieldName: string, value: any, allowEmpty = true) {
  if (typeof value !== 'string') {
    throw new ContractAssertionError(entityName, fieldName, 'string', typeof value);
  }
  if (!allowEmpty && value.trim() === '') {
    throw new ContractAssertionError(entityName, fieldName, 'non-empty string', value);
  }
}

function assertBoolean(entityName: string, fieldName: string, value: any) {
  if (typeof value !== 'boolean') {
    throw new ContractAssertionError(entityName, fieldName, 'boolean', typeof value);
  }
}

function assertArray(entityName: string, fieldName: string, value: any) {
  if (!Array.isArray(value)) {
    throw new ContractAssertionError(entityName, fieldName, 'Array', typeof value);
  }
}

function validateSeoContract(entityName: string, seo: SEO) {
  assertDefined(entityName, 'seo', seo);
  assertString(entityName, 'seo.seoTitle', seo.seoTitle, false);
  assertString(entityName, 'seo.metaDescription', seo.metaDescription);
  assertString(entityName, 'seo.canonicalUrl', seo.canonicalUrl, false);
  assertString(entityName, 'seo.ogTitle', seo.ogTitle, false);
  assertString(entityName, 'seo.ogDescription', seo.ogDescription);
  assertString(entityName, 'seo.ogImage', seo.ogImage, false);
  assertBoolean(entityName, 'seo.robotsIndex', seo.robotsIndex);
  assertBoolean(entityName, 'seo.robotsFollow', seo.robotsFollow);
}

// --- SAMPLE RAW WORDPRESS REST API PAYLOADS ---

const mockRawServicePost: RawWpServicePost = {
  id: 101,
  date: '2026-01-15T09:00:00',
  date_gmt: '2026-01-15T09:00:00',
  modified: '2026-02-01T10:30:00',
  modified_gmt: '2026-02-01T10:30:00',
  slug: 'technical-seo',
  status: 'publish',
  type: 'services',
  link: 'https://cms.matricsmania.com/services/technical-seo/',
  title: { rendered: 'Technical SEO &amp; Algorithmic Architecture' },
  content: { rendered: '<p>Enterprise technical search engine optimization and crawl budget engineering.</p>' },
  excerpt: { rendered: '<p>Enterprise technical search engine optimization.</p>' },
  author: 1,
  featured_media: 501,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: {},
  yoast_head_json: {
    title: 'Technical SEO Engineering | MatricsMania',
    description: 'Deep-funnel B2B technical search engine optimization.',
    canonical: 'https://matricsmania.com/services/technical-seo/',
    robots: { index: 'index', follow: 'follow' },
    og_title: 'Technical SEO Engineering',
    og_description: 'Deep-funnel B2B technical search engine optimization.',
    og_image: [{ url: 'https://matricsmania.com/images/og-tech-seo.png' }],
  },
  acf: {
    service_code: 'SEO-01',
    category: 'Search & Organic Architecture',
    short_description: 'Enterprise technical search engine optimization.',
    tagline: 'Algorithmic Search Engineering',
    icon_name: 'Search',
    deliverables_summary: ['Crawl Budget Audit', 'Core Web Vitals Engineering'],
    related_industries: [201],
    related_case_studies: [301],
  },
};

const mockRawIndustryPost: RawWpIndustryPost = {
  id: 201,
  date: '2026-01-10T08:00:00',
  date_gmt: '2026-01-10T08:00:00',
  modified: '2026-01-20T12:00:00',
  modified_gmt: '2026-01-20T12:00:00',
  slug: 'b2b-saas',
  status: 'publish',
  type: 'industries',
  link: 'https://cms.matricsmania.com/industries/b2b-saas/',
  title: { rendered: 'B2B SaaS Growth Engine' },
  content: { rendered: '<p>Growth engineering for high-ACV SaaS platforms.</p>' },
  excerpt: { rendered: '<p>Growth engineering for high-ACV SaaS platforms.</p>' },
  author: 1,
  featured_media: 502,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: {},
  acf: {
    industry_code: 'IND-SAAS',
    tagline: 'High-Velocity PLG & SLG Performance Architecture',
    market_summary: 'B2B SaaS growth architecture addressing high CAC and extended sales cycles.',
    related_services: [101],
  },
};

const mockRawLocationPost: RawWpLocationPost = {
  id: 401,
  date: '2026-01-05T08:00:00',
  date_gmt: '2026-01-05T08:00:00',
  modified: '2026-01-10T08:00:00',
  modified_gmt: '2026-01-10T08:00:00',
  slug: 'bangalore',
  status: 'publish',
  type: 'locations',
  link: 'https://cms.matricsmania.com/locations/bangalore/',
  title: { rendered: 'Bangalore Engineering Hub' },
  content: { rendered: '<p>Primary engineering and search intelligence center.</p>' },
  excerpt: { rendered: '<p>Primary engineering and search intelligence center.</p>' },
  author: 1,
  featured_media: 503,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: {},
  acf: {
    city: 'Bangalore',
    country: 'India',
    location_code: 'NODE-BLR',
    hub_type: 'Regional Growth Hub',
  },
};

const mockRawInsightPost: RawWpInsightPost = {
  id: 501,
  date: '2026-02-01T08:00:00',
  date_gmt: '2026-02-01T08:00:00',
  modified: '2026-02-05T08:00:00',
  modified_gmt: '2026-02-05T08:00:00',
  slug: 'technical-seo-crawl-budget',
  status: 'publish',
  type: 'post',
  link: 'https://cms.matricsmania.com/posts/technical-seo-crawl-budget/',
  title: { rendered: 'Crawl Budget Optimization at Scale' },
  content: { rendered: '<p>Comprehensive breakdown of log analysis for enterprise sites.</p>' },
  excerpt: { rendered: '<p>Log analysis and rendering cost reduction strategy.</p>' },
  author: 1,
  featured_media: 504,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: {},
  acf: {
    standfirst: 'Analyzing 50M+ requests across enterprise rendering nodes.',
    category: 'Technical Search',
    reading_time_minutes: 8,
  },
};

const mockRawCaseStudyPost: RawWpCaseStudyPost = {
  id: 301,
  date: '2026-01-25T08:00:00',
  date_gmt: '2026-01-25T08:00:00',
  modified: '2026-01-28T08:00:00',
  modified_gmt: '2026-01-28T08:00:00',
  slug: 'fintech-pipeline-growth',
  status: 'publish',
  type: 'case-studies',
  link: 'https://cms.matricsmania.com/case-studies/fintech-pipeline-growth/',
  title: { rendered: 'FinTech Pipeline Acceleration' },
  content: { rendered: '<p>Full case study narrative of FinTech acquisition architecture.</p>' },
  excerpt: { rendered: '<p>+312% organic revenue pipeline growth in 120 days.</p>' },
  author: 1,
  featured_media: 505,
  comment_status: 'closed',
  ping_status: 'closed',
  template: '',
  meta: {},
  acf: {
    case_study_code: 'CS-FINTECH',
    client_name: 'AlphaPay',
    client_industry: 'FinTech',
    hero_headline: 'Scaling Enterprise FinTech Organic Revenue',
    challenge_summary: 'Legacy monolith infrastructure throttling indexing.',
    solution_architecture: 'Headless Next.js migration with automated edge rendering.',
  },
};

const mockRawPagePost: RawWpBasePost = {
  id: 11,
  date: '2026-01-01T08:00:00',
  date_gmt: '2026-01-01T08:00:00',
  modified: '2026-01-01T08:00:00',
  modified_gmt: '2026-01-01T08:00:00',
  slug: 'about',
  status: 'publish',
  type: 'page',
  link: 'https://cms.matricsmania.com/about/',
  title: { rendered: 'About MatricsMania' },
  content: { rendered: '<p>Growth engineering consultancy.</p>' },
  excerpt: { rendered: '<p>Growth engineering consultancy.</p>' },
  author: 1,
  featured_media: 506,
  comment_status: 'closed',
  ping_status: 'closed',
  template: 'default',
  meta: {},
};

// --- CONTRACT TEST SUITE EXECUTION ---

export function runCmsContractTest(): { success: boolean; testsRun: number; failures: string[] } {
  const failures: string[] = [];
  let testsRun = 0;

  console.log('------------------------------------------------------------');
  console.log('RUNNING CMS CONTRACT VALIDATION TEST SUITE');
  console.log('------------------------------------------------------------');

  // 1. SERVICE CONTRACT TEST
  try {
    testsRun++;
    const service: Service = normalizeWpService(mockRawServicePost);
    assertDefined('Service', 'id', service.id);
    assertString('Service', 'slug', service.slug, false);
    assertString('Service', 'title', service.title, false);
    assertString('Service', 'excerpt', service.excerpt);
    assertString('Service', 'content', service.content);
    assertDefined('Service', 'featuredImage', service.featuredImage);
    assertDefined('Service', 'relationships', service.relationships);
    assertArray('Service', 'relationships.industries', service.relationships.industries);
    assertArray('Service', 'relationships.caseStudies', service.relationships.caseStudies);
    assertString('Service', 'serviceCode', service.serviceCode, false);
    assertString('Service', 'category', service.category, false);
    validateSeoContract('Service', service.seo);
    console.log('✓ Service CPT Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Service CPT Contract Failed:', err.message);
  }

  // 2. INDUSTRY CONTRACT TEST
  try {
    testsRun++;
    const industry: Industry = normalizeWpIndustry(mockRawIndustryPost);
    assertDefined('Industry', 'id', industry.id);
    assertString('Industry', 'slug', industry.slug, false);
    assertString('Industry', 'title', industry.title, false);
    assertString('Industry', 'excerpt', industry.excerpt);
    assertString('Industry', 'content', industry.content);
    assertString('Industry', 'industryCode', industry.industryCode, false);
    assertString('Industry', 'tagline', industry.tagline);
    assertString('Industry', 'marketSummary', industry.marketSummary);
    validateSeoContract('Industry', industry.seo);
    console.log('✓ Industry CPT Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Industry CPT Contract Failed:', err.message);
  }

  // 3. LOCATION CONTRACT TEST
  try {
    testsRun++;
    const location: Location = normalizeWpLocation(mockRawLocationPost);
    assertDefined('Location', 'id', location.id);
    assertString('Location', 'slug', location.slug, false);
    assertString('Location', 'title', location.title, false);
    assertString('Location', 'city', location.city, false);
    assertString('Location', 'country', location.country, false);
    assertDefined('Location', 'officeNode', location.officeNode);
    validateSeoContract('Location', location.seo);
    console.log('✓ Location CPT Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Location CPT Contract Failed:', err.message);
  }

  // 4. INSIGHT (NATIVE POST) CONTRACT TEST
  try {
    testsRun++;
    const insight: Insight = normalizeWpInsight(mockRawInsightPost);
    assertDefined('Insight', 'id', insight.id);
    assertString('Insight', 'slug', insight.slug, false);
    assertString('Insight', 'title', insight.title, false);
    assertString('Insight', 'category', insight.category, false);
    assertDefined('Insight', 'author', insight.author);
    validateSeoContract('Insight', insight.seo);
    console.log('✓ Insight (WP Native Post) Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Insight Contract Failed:', err.message);
  }

  // 5. CASE STUDY CONTRACT TEST
  try {
    testsRun++;
    const caseStudy: CaseStudy = normalizeWpCaseStudy(mockRawCaseStudyPost);
    assertDefined('CaseStudy', 'id', caseStudy.id);
    assertString('CaseStudy', 'slug', caseStudy.slug, false);
    assertString('CaseStudy', 'title', caseStudy.title, false);
    assertString('CaseStudy', 'clientName', caseStudy.clientName, false);
    assertString('CaseStudy', 'clientIndustry', caseStudy.clientIndustry, false);
    assertString('CaseStudy', 'heroHeadline', caseStudy.heroHeadline, false);
    validateSeoContract('CaseStudy', caseStudy.seo);
    console.log('✓ Case Study CPT Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Case Study Contract Failed:', err.message);
  }

  // 6. PAGE CONTRACT TEST
  try {
    testsRun++;
    const page: Page = normalizeWpPage(mockRawPagePost);
    assertDefined('Page', 'id', page.id);
    assertString('Page', 'slug', page.slug, false);
    assertString('Page', 'title', page.title, false);
    validateSeoContract('Page', page.seo);
    console.log('✓ Page CPT Contract Passed');
  } catch (err: any) {
    failures.push(err.message || String(err));
    console.error('✕ Page Contract Failed:', err.message);
  }

  console.log('------------------------------------------------------------');
  console.log(`SUMMARY: ${testsRun - failures.length}/${testsRun} CMS Contracts Passed.`);
  console.log('------------------------------------------------------------');

  return {
    success: failures.length === 0,
    testsRun,
    failures,
  };
}

// Auto-run if executed directly via CLI/tsx
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('cmsContractTest')) {
  const result = runCmsContractTest();
  if (!result.success) {
    process.exit(1);
  }
}
