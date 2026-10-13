import { parseRankMathHeadHtml, ParsedRankMathHead } from '../utils/rankMath';
import { resolveSeoMetadata, asyncResolveSeoMetadata, PUBLIC_DOMAIN } from '../utils/seo';
import { toNextMetadata } from '../utils/nextMetadata';

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  message: string;
  details?: any;
}

export async function runRankMathIntegrationTests(): Promise<{
  allPassed: boolean;
  results: TestResult[];
}> {
  const results: TestResult[] = [];

  // --------------------------------------------------------------------------
  // TEST A: Valid published post with Rank Math metadata
  // --------------------------------------------------------------------------
  try {
    const mockRankMathHtml = `
      <title>Rank Math Title - Custom SEO | MatricsMania</title>
      <meta name="description" content="This is a custom Rank Math meta description for technical SEO page." />
      <link rel="canonical" href="https://cms.matricsmania.com/services/technical-seo/" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:title" content="OG Rank Math Title" />
      <meta property="og:description" content="OG Rank Math Description" />
      <meta property="og:image" content="https://matricsmania.com/og-rankmath.png" />
    `;

    const parsed = parseRankMathHeadHtml(mockRankMathHtml, 'https://matricsmania.com/services/technical-seo/');
    const resolved = resolveSeoMetadata({
      routePath: '/services/technical-seo/',
      rankMathSeo: parsed,
      cmsSeo: {
        seoTitle: 'ACF Title Fallback',
        metaDescription: 'ACF Description Fallback',
      },
    });

    const passed =
      resolved.title.includes('Rank Math Title') &&
      resolved.description === 'This is a custom Rank Math meta description for technical SEO page.' &&
      resolved.canonicalUrl === 'https://matricsmania.com/services/technical-seo/';

    results.push({
      testId: 'Test A',
      description: 'Valid published post with Rank Math metadata',
      passed,
      message: passed
        ? 'Rank Math title, description, and canonical URL prioritized correctly over ACF.'
        : `Failed: Title=${resolved.title}, Desc=${resolved.description}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test A',
      description: 'Valid published post with Rank Math metadata',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST B: Valid published post without Rank Math metadata
  // --------------------------------------------------------------------------
  try {
    const resolved = resolveSeoMetadata({
      routePath: '/services/performance-marketing/',
      rankMathSeo: undefined, // Unavailable or empty Rank Math
      cmsSeo: {
        seoTitle: 'ACF Performance Marketing Title',
        metaDescription: 'ACF Performance Marketing Description',
      },
      entityData: {
        title: 'Performance Marketing',
        excerpt: 'Fallback excerpt',
      },
    });

    const passed =
      resolved.title.includes('ACF Performance Marketing Title') &&
      resolved.description === 'ACF Performance Marketing Description';

    results.push({
      testId: 'Test B',
      description: 'Valid published post without Rank Math metadata (ACF fallback)',
      passed,
      message: passed
        ? 'Successfully fell back to ACF custom fields.'
        : `Failed: Title=${resolved.title}, Desc=${resolved.description}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test B',
      description: 'Valid published post without Rank Math metadata',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST C: Rank Math API unavailable
  // --------------------------------------------------------------------------
  try {
    const resolved = resolveSeoMetadata({
      routePath: '/industries/b2b-saas/',
      rankMathSeo: undefined,
      entityData: {
        title: 'B2B SaaS Growth',
        excerpt: 'B2B SaaS growth strategies',
      },
    });

    const passed =
      resolved.title.includes('B2B SaaS Growth') &&
      resolved.description === 'B2B SaaS growth strategies';

    results.push({
      testId: 'Test C',
      description: 'Rank Math API unavailable graceful execution',
      passed,
      message: passed
        ? 'Application rendered without breaking when Rank Math API is unavailable.'
        : `Failed: Title=${resolved.title}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test C',
      description: 'Rank Math API unavailable',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST D: Rank Math endpoint returns a WordPress 404
  // --------------------------------------------------------------------------
  try {
    const mock404Head = `
      <title>Page Not Found - Matrics Mania</title>
      <meta name="robots" content="noindex, follow" />
    `;

    const parsed404 = parseRankMathHeadHtml(mock404Head);
    const passedParse = parsed404.isWordPress404 === true;

    // Resolve SEO passing a 404 parsed head for a valid published entity
    const resolved = resolveSeoMetadata({
      routePath: '/case-studies/enterprise-scale/',
      rankMathSeo: parsed404,
      cmsSeo: {
        seoTitle: 'Valid ACF Case Study Title',
        metaDescription: 'Valid ACF Case Study Description',
      },
      entityData: {
        title: 'Enterprise Scale Case Study',
      },
    });

    const passedResolution =
      !resolved.title.includes('Page Not Found') &&
      resolved.title.includes('Valid ACF Case Study Title') &&
      resolved.robotsIndex === true;

    const passed = passedParse && passedResolution;

    results.push({
      testId: 'Test D',
      description: 'Rank Math 404 response detection and rejection on valid post',
      passed,
      message: passed
        ? '404 head correctly detected and rejected; valid ACF fallback preserved indexability.'
        : `Failed: is404=${parsed404.isWordPress404}, Title=${resolved.title}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test D',
      description: 'Rank Math 404 response detection',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST E: Valid post with a custom canonical URL
  // --------------------------------------------------------------------------
  try {
    const mockHeadWithCanonical = `
      <title>Custom Canonical Page | MatricsMania</title>
      <link rel="canonical" href="https://cms.matricsmania.com/custom-path/" />
    `;

    const parsed = parseRankMathHeadHtml(mockHeadWithCanonical);
    const resolved = resolveSeoMetadata({
      routePath: '/custom-path/',
      rankMathSeo: parsed,
    });

    const passed = resolved.canonicalUrl === 'https://matricsmania.com/custom-path/';

    results.push({
      testId: 'Test E',
      description: 'Valid post with custom canonical URL normalized to public domain',
      passed,
      message: passed
        ? 'CMS-domain canonical URL successfully mapped to public domain https://matricsmania.com.'
        : `Failed: Canonical=${resolved.canonicalUrl}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test E',
      description: 'Valid post with custom canonical URL',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST F: Intentional noindex page
  // --------------------------------------------------------------------------
  try {
    const mockNoIndexHead = `
      <title>Private Page | MatricsMania</title>
      <meta name="robots" content="noindex, nofollow" />
    `;

    const parsed = parseRankMathHeadHtml(mockNoIndexHead);
    const resolved = resolveSeoMetadata({
      routePath: '/private-page/',
      rankMathSeo: parsed,
      noindex: true,
    });

    const passed = resolved.robotsIndex === false && resolved.robotsFollow === false;

    results.push({
      testId: 'Test F',
      description: 'Intentional noindex page directive preservation',
      passed,
      message: passed
        ? 'noindex, nofollow directives preserved correctly.'
        : `Failed: Index=${resolved.robotsIndex}, Follow=${resolved.robotsFollow}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test F',
      description: 'Intentional noindex page',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST G: SEO metadata with special characters & HTML entities
  // --------------------------------------------------------------------------
  try {
    const mockEntitiesHead = `
      <title>Growth &amp; Scalability &quot;2026&quot; &#8211; MatricsMania</title>
      <meta name="description" content="A &amp; B testing &quot;methods&quot; for CRO &#039;tactics&#039;." />
    `;

    const parsed = parseRankMathHeadHtml(mockEntitiesHead);
    const resolved = resolveSeoMetadata({
      routePath: '/growth-scalability/',
      rankMathSeo: parsed,
    });

    const passed =
      resolved.title.includes('Growth & Scalability "2026"') &&
      resolved.description === 'A & B testing "methods" for CRO \'tactics\'.';

    results.push({
      testId: 'Test G',
      description: 'SEO metadata with special characters and HTML entity decoding',
      passed,
      message: passed
        ? 'HTML entities (&amp;, &quot;, &#039;, &#8211;) correctly decoded without double escaping.'
        : `Failed: Title=${resolved.title}, Desc=${resolved.description}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test G',
      description: 'SEO metadata with special characters',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST H: Slug or permalink resolution
  // --------------------------------------------------------------------------
  try {
    const resolved = resolveSeoMetadata({
      routePath: '/services/technical-seo/',
      entityData: {
        slug: 'technical-seo',
        title: 'Technical SEO',
      },
    });

    const passed = resolved.canonicalUrl === `${PUBLIC_DOMAIN}/services/technical-seo/`;

    results.push({
      testId: 'Test H',
      description: 'Slug or permalink resolution',
      passed,
      message: passed
        ? 'Route path mapped cleanly to public canonical permalink structure.'
        : `Failed: Canonical=${resolved.canonicalUrl}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test H',
      description: 'Slug or permalink resolution',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST I: Next.js Metadata API Object Transformation
  // --------------------------------------------------------------------------
  try {
    const resolved = resolveSeoMetadata({
      title: 'Next.js App Router Title | MatricsMania',
      description: 'Server-rendered initial HTML metadata test.',
      canonicalUrl: 'https://matricsmania.com/about/',
    });

    const nextMeta = toNextMetadata(resolved);

    const passed =
      nextMeta.title === 'Next.js App Router Title | MatricsMania' &&
      nextMeta.description === 'Server-rendered initial HTML metadata test.' &&
      nextMeta.alternates?.canonical === 'https://matricsmania.com/about/';

    results.push({
      testId: 'Test I',
      description: 'Next.js App Router Metadata Object Transformation',
      passed,
      message: passed
        ? 'Next.js Metadata API object formatted correctly for initial server HTML generation.'
        : `Failed: NextMeta=${JSON.stringify(nextMeta)}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test I',
      description: 'Next.js Metadata API Object Transformation',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  // --------------------------------------------------------------------------
  // TEST J: Existing content and ACF functionality
  // --------------------------------------------------------------------------
  try {
    const resolved = resolveSeoMetadata({
      routePath: '/contact/',
      cmsSeo: {
        seoTitle: 'Contact Us | MatricsMania',
        metaDescription: 'Schedule a diagnostic session with MatricsMania.',
      },
    });

    const passed =
      resolved.title === 'Contact Us | MatricsMania' &&
      resolved.description === 'Schedule a diagnostic session with MatricsMania.';

    results.push({
      testId: 'Test J',
      description: 'Existing content and ACF functionality preservation',
      passed,
      message: passed
        ? 'ACF field structure and content rendering fully preserved.'
        : `Failed: Title=${resolved.title}`,
    });
  } catch (err: any) {
    results.push({
      testId: 'Test J',
      description: 'Existing content and ACF functionality',
      passed: false,
      message: `Exception: ${err?.message || err}`,
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { allPassed, results };
}
