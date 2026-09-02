import { Media, createMediaFromUrl } from '../media';
import { SEO } from '../seo';
import { Author } from '../author';
import { FAQ } from '../faq';
import { EntityRef, ServiceRelationships, IndustryRelationships, LocationRelationships, InsightRelationships, CaseStudyRelationships } from '../relationships';
import { Page } from '../entities/page';
import { Service } from '../entities/service';
import { Industry } from '../entities/industry';
import { Location } from '../entities/location';
import { Insight } from '../entities/insight';
import { CaseStudy } from '../entities/caseStudy';
import {
  RawWpBasePost,
  RawWpEmbeddedMedia,
  RawWpEmbeddedAuthor,
  RawWpServicePost,
  RawWpIndustryPost,
  RawWpLocationPost,
  RawWpInsightPost,
  RawWpCaseStudyPost,
  RawWpYoastHeadJson,
} from './rawWpTypes';

/**
 * Strips HTML tags and decodes common HTML entities for plain text fields
 */
export function sanitizePlainText(html: string = ''): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Normalizes Raw WordPress Embedded Media into the domain Media model
 */
export function normalizeWpMedia(rawMedia?: RawWpEmbeddedMedia): Media {
  if (!rawMedia || !rawMedia.source_url) {
    return createMediaFromUrl('/placeholder.svg', 'MatricsMania Asset');
  }

  const sizes = rawMedia.media_details?.sizes || {};

  return {
    id: rawMedia.id,
    url: rawMedia.source_url,
    altText: rawMedia.alt_text || sanitizePlainText(rawMedia.title?.rendered) || 'MatricsMania Asset',
    title: sanitizePlainText(rawMedia.title?.rendered),
    caption: sanitizePlainText(rawMedia.caption?.rendered),
    mimeType: rawMedia.mime_type || 'image/jpeg',
    mediaType: (rawMedia.media_type === 'video' ? 'video' : 'image') as any,
    dimensions: rawMedia.media_details
      ? {
          width: rawMedia.media_details.width,
          height: rawMedia.media_details.height,
          aspectRatio: `${rawMedia.media_details.width}/${rawMedia.media_details.height}`,
        }
      : undefined,
    sizes: {
      thumbnail: sizes.thumbnail
        ? {
            url: sizes.thumbnail.source_url,
            width: sizes.thumbnail.width,
            height: sizes.thumbnail.height,
            mimeType: sizes.thumbnail.mime_type,
          }
        : undefined,
      medium: sizes.medium
        ? {
            url: sizes.medium.source_url,
            width: sizes.medium.width,
            height: sizes.medium.height,
            mimeType: sizes.medium.mime_type,
          }
        : undefined,
      large: sizes.large
        ? {
            url: sizes.large.source_url,
            width: sizes.large.width,
            height: sizes.large.height,
            mimeType: sizes.large.mime_type,
          }
        : undefined,
      full: {
        url: rawMedia.source_url,
        width: rawMedia.media_details?.width || 1200,
        height: rawMedia.media_details?.height || 630,
        mimeType: rawMedia.mime_type,
      },
    },
  };
}

/**
 * Normalizes SEO metadata from ACF custom fields, Yoast/RankMath, or raw WP post fallback
 */
export function normalizeWpSeo(rawPost: RawWpBasePost, canonicalUrlFallback?: string): SEO {
  const acf = rawPost.acf || {};
  const yoast = rawPost.yoast_head_json;
  const rankMath = rawPost.rank_math_seo;

  const fallbackTitle = sanitizePlainText(rawPost.title?.rendered) + ' | MatricsMania Growth Systems';
  const fallbackExcerpt = sanitizePlainText(rawPost.excerpt?.rendered) || 'Growth engineering and technical search systems for B2B enterprises.';

  // Map acf.metatitle -> seoTitle / metaTitle
  const title = acf.metatitle || yoast?.title || rankMath?.title || fallbackTitle;

  // Map acf.metadescription -> metaDescription
  const metaDescription = acf.metadescription || yoast?.description || rankMath?.description || fallbackExcerpt;

  // Map acf.canonicalurl -> canonicalUrl
  const rawCanonical = acf.canonicalurl || yoast?.canonical || rankMath?.canonical || canonicalUrlFallback || rawPost.link || `https://matricsmania.com/${rawPost.slug}/`;
  let canonicalUrl = rawCanonical.trim();
  if (canonicalUrl.includes('#')) canonicalUrl = canonicalUrl.split('#')[0];
  if (canonicalUrl.includes('?')) canonicalUrl = canonicalUrl.split('?')[0];
  canonicalUrl = canonicalUrl.replace(/^https?:\/\/cms\.matricsmania\.com/i, 'https://matricsmania.com');
  if (canonicalUrl.startsWith('/')) {
    canonicalUrl = `https://matricsmania.com${canonicalUrl}`;
  }
  if (!canonicalUrl.endsWith('/')) {
    canonicalUrl = `${canonicalUrl}/`;
  }

  // Map acf.ogtitle -> ogTitle
  const ogTitle = acf.ogtitle || yoast?.og_title || rankMath?.openGraph?.title || title;

  // Map acf.ogdescription -> ogDescription
  const ogDescription = acf.ogdescription || yoast?.og_description || rankMath?.openGraph?.description || metaDescription;

  // Map acf.ogimage -> ogImage
  const ogImageUrl =
    acf.ogimage ||
    yoast?.og_image?.[0]?.url ||
    rankMath?.openGraph?.images?.[0]?.url ||
    rawPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200';

  const twitterImageUrl =
    acf.ogimage ||
    yoast?.twitter_image ||
    rankMath?.twitter?.image ||
    ogImageUrl;

  // Map acf.robotsindex -> robotsIndex
  let robotsIndex = true;
  if (acf.robotsindex !== undefined && acf.robotsindex !== null) {
    if (typeof acf.robotsindex === 'boolean') {
      robotsIndex = acf.robotsindex;
    } else if (typeof acf.robotsindex === 'string') {
      robotsIndex = acf.robotsindex !== 'noindex' && acf.robotsindex !== '0' && acf.robotsindex !== 'false';
    }
  } else {
    robotsIndex = yoast?.robots?.index !== 'noindex' && rankMath?.robots?.index !== false;
  }

  // Map acf.robotsfollow -> robotsFollow
  let robotsFollow = true;
  if (acf.robotsfollow !== undefined && acf.robotsfollow !== null) {
    if (typeof acf.robotsfollow === 'boolean') {
      robotsFollow = acf.robotsfollow;
    } else if (typeof acf.robotsfollow === 'string') {
      robotsFollow = acf.robotsfollow !== 'nofollow' && acf.robotsfollow !== '0' && acf.robotsfollow !== 'false';
    }
  } else {
    robotsFollow = yoast?.robots?.follow !== 'nofollow' && rankMath?.robots?.follow !== false;
  }

  return {
    seoTitle: title,
    metaDescription,
    canonicalUrl,
    robotsIndex,
    robotsFollow,
    ogTitle,
    ogDescription,
    ogImage: ogImageUrl,
    twitterTitle: ogTitle,
    twitterDescription: ogDescription,
    twitterImage: twitterImageUrl,
    robotsDirectives: {
      index: robotsIndex,
      follow: robotsFollow,
      maxSnippet: yoast?.robots?.['max-snippet'] ? parseInt(yoast.robots['max-snippet'], 10) : undefined,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      type: (yoast?.og_type as any) || 'website',
      siteName: yoast?.og_site_name || 'MatricsMania',
      locale: yoast?.og_locale || 'en_US',
      image: ogImageUrl,
    },
    twitter: {
      card: yoast?.twitter_card || 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      image: twitterImageUrl,
    },
  };
}

/**
 * Normalizes embedded Author
 */
export function normalizeWpAuthor(rawAuthor?: RawWpEmbeddedAuthor): Author {
  if (!rawAuthor) {
    return {
      id: 'author-default',
      slug: 'matricsmania-research-lab',
      name: 'MatricsMania Research Lab',
      role: 'Growth Systems Architecture Group',
      bio: 'Deep-funnel B2B performance engineering and algorithmic intelligence.',
      avatar: '/avatars/default.png',
    };
  }

  const avatar =
    rawAuthor.avatar_urls?.['96'] ||
    rawAuthor.avatar_urls?.['48'] ||
    rawAuthor.avatar_urls?.['24'] ||
    '/avatars/default.png';

  return {
    id: rawAuthor.id,
    slug: rawAuthor.slug,
    name: rawAuthor.name,
    role: rawAuthor.acf?.job_title || 'Growth Architect',
    bio: rawAuthor.description || '',
    avatar,
    department: rawAuthor.acf?.department,
    isLeadership: rawAuthor.acf?.is_leadership,
    credentials: rawAuthor.acf?.credentials,
    socials: {
      linkedin: rawAuthor.acf?.social_linkedin,
      twitter: rawAuthor.acf?.social_twitter,
      github: rawAuthor.acf?.social_github,
    },
  };
}

/**
 * Helper to extract entity reference from raw relation objects or IDs
 */
export function normalizeEntityRef(item: any, fallbackCategory = ''): EntityRef {
  if (typeof item === 'number' || typeof item === 'string') {
    return {
      id: item,
      slug: `${item}`,
      title: `Node #${item}`,
      url: `/${item}/`,
    };
  }

  return {
    id: item.id || `ref-${item.slug}`,
    slug: item.slug || '',
    title: sanitizePlainText(item.title?.rendered || item.title || item.name || 'Related Node'),
    url: item.link || `/${item.slug}/`,
    excerpt: sanitizePlainText(item.excerpt?.rendered || item.excerpt || ''),
    category: item.category || fallbackCategory,
    featuredImageUrl: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || item.featuredImage?.url,
  };
}

/**
 * Normalizes Raw Service CPT to Service Domain Model
 */
export function normalizeWpService(raw: RawWpServicePost): Service {
  const acf = raw.acf || {};
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);

  const industries = Array.isArray(acf.related_industries)
    ? acf.related_industries.map((i) => normalizeEntityRef(i, 'Industry'))
    : [];
  const insights = Array.isArray(acf.related_insights)
    ? acf.related_insights.map((i) => normalizeEntityRef(i, 'Insight'))
    : [];
  const caseStudies = Array.isArray(acf.related_case_studies)
    ? acf.related_case_studies.map((i) => normalizeEntityRef(i, 'Case Study'))
    : [];

  const relationships: ServiceRelationships = {
    industries,
    insights,
    caseStudies,
  };

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || acf.short_description || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/services/${raw.slug}/`),
    relationships,

    serviceCode: acf.servicecode || acf.service_code || `SRV-${raw.slug.toUpperCase().slice(0, 4)}`,
    category: (acf.category as any) || 'Search & Organic Architecture',
    categorySlug: acf.category_slug || 'search-architecture',
    iconName: acf.icon_name || 'Terminal',
    shortDescription: acf.short_description || sanitizePlainText(raw.excerpt?.rendered),
    tagline: acf.tagline || 'Engineered for Enterprise Performance',
    deliverablesSummary: acf.deliverables_summary || [],
    metrics: (acf.metrics || []).map((m) => ({
      label: m.label,
      value: m.value,
      timeframe: m.timeframe,
    })),
    processPhases: (acf.process_phases || []).map((p) => ({
      step: p.step,
      title: p.title,
      duration: p.duration,
      description: p.description,
      keyOutputs: p.key_outputs || [],
    })),
    deliverableList: (acf.deliverable_list || []).map((d) => ({
      title: d.title,
      category: d.category,
      specifications: d.specifications || [],
      cadence: (d.cadence as any) || 'Monthly',
    })),
    toolchain: (acf.toolchain || []).map((t) => ({
      name: t.name,
      purpose: t.purpose,
      category: (t.category as any) || 'Infrastructure',
    })),
    priceStartingMonthly: acf.price_starting_monthly,
    positioningStatement: acf.positioning_statement || acf.positioningstatement,
    whyTraditionalFails: acf.why_traditional_fails || acf.whytraditionalfails,
    idealClientProfile: acf.ideal_client_profile || acf.idealclientprofile,
    recommendedFor: acf.recommended_for || [],
    slaCommitment: acf.sla_commitment,
    faqs: (acf.faqs || []).map((f, idx) => ({
      id: `faq-${raw.id}-${idx}`,
      question: f.question,
      answer: f.answer,
      category: f.category || 'Services',
    })),
  };
}

/**
 * Normalizes Raw Industry CPT to Industry Domain Model
 */
export function normalizeWpIndustry(raw: RawWpIndustryPost): Industry {
  const acf = raw.acf || {};
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);

  const services = Array.isArray(acf.related_services)
    ? acf.related_services.map((s) => normalizeEntityRef(s, 'Service'))
    : [];
  const insights = Array.isArray(acf.related_insights)
    ? acf.related_insights.map((i) => normalizeEntityRef(i, 'Insight'))
    : [];
  const caseStudies = Array.isArray(acf.related_case_studies)
    ? acf.related_case_studies.map((c) => normalizeEntityRef(c, 'Case Study'))
    : [];

  const relationships: IndustryRelationships = {
    services,
    insights,
    caseStudies,
  };

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || acf.marketsummary || acf.market_summary || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/industries/${raw.slug}/`),
    relationships,

    industryCode: acf.industrycode || acf.industry_code || `IND-${raw.slug ? raw.slug.toUpperCase().slice(0, 3) : 'GEN'}`,
    tagline: acf.tagline || 'Sector-Specific High-Velocity Growth Architecture',
    marketSummary: acf.marketsummary || acf.market_summary || sanitizePlainText(raw.excerpt?.rendered) || '',
    challenges: Array.isArray(acf.challenges)
      ? acf.challenges.map((c) => ({
          title: c.title,
          description: c.description,
          impactLevel: (c.impact_level as any) || 'High',
          typicalCACWaste: c.typical_cac_waste,
        }))
      : [],
    benchmarks: Array.isArray(acf.benchmarks)
      ? acf.benchmarks.map((b) => ({
          metric: b.metric,
          industryAverage: b.industry_average,
          matricsManiaEngineered: b.matrics_mania_engineered,
          deltaPercent: b.delta_percent,
        }))
      : [],
    playbookPillars: Array.isArray(acf.playbook_pillars)
      ? acf.playbook_pillars.map((p) => ({
          phase: p.phase,
          title: p.title,
          actionItems: p.action_items || [],
          expectedImpact: p.expected_impact,
        }))
      : [],
    complianceStandards: Array.isArray(acf.compliance_standards) ? acf.compliance_standards : [],
    typicalSalesCycle: acf.typical_sales_cycle || '60-90 Days',
    averageACV: acf.average_acv || '$50k - $250k',
    faqs: Array.isArray(acf.faqs)
      ? acf.faqs.map((f, idx) => ({
          id: `faq-ind-${raw.id}-${idx}`,
          question: f.question,
          answer: f.answer,
          category: 'Industry Playbook',
        }))
      : [],
  };
}

/**
 * Normalizes Raw Location CPT to Location Domain Model
 */
export function normalizeWpLocation(raw: RawWpLocationPost): Location {
  const acf = raw.acf || {};
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);

  const services = Array.isArray(acf.related_services)
    ? acf.related_services.map((s) => normalizeEntityRef(s, 'Service'))
    : [];
  const industries = Array.isArray(acf.related_industries)
    ? acf.related_industries.map((i) => normalizeEntityRef(i, 'Industry'))
    : [];
  const insights = Array.isArray(acf.related_insights)
    ? acf.related_insights.map((i) => normalizeEntityRef(i, 'Insight'))
    : [];

  const relationships: LocationRelationships = {
    services,
    industries,
    insights,
  };

  const city = acf.city || sanitizePlainText(raw.title?.rendered) || 'Bangalore';
  const country = acf.country || 'India';
  const stateOrRegion = acf.stateorregion || acf.state_or_region || '';
  const nodeCode = acf.node_code || `NODE-${city.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'BLR'}`;

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || acf.localmarketsummary || acf.local_market_summary || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/locations/${raw.slug}/`),
    relationships,

    locationCode: acf.location_code || nodeCode,
    city,
    stateOrRegion,
    country,
    countryCode: acf.country_code || 'IN',
    hubType: (acf.hub_type as any) || 'Regional Growth Hub',
    officeNode: {
      id: `node-${raw.id}`,
      nodeCode,
      city,
      region: stateOrRegion,
      country,
      role: (acf.hub_type as any) || 'Regional Growth Hub',
      address: {
        line1: acf.officenode || acf.address_line1 || 'Executive Growth Node',
        line2: acf.address_line2,
        city,
        state: stateOrRegion,
        postalCode: acf.postal_code || '',
        country,
      },
      coordinates: {
        latitude: acf.latitude || 12.9716,
        longitude: acf.longitude || 77.5946,
      },
      phone: acf.phone || '+91 80 4123 4567',
      email: acf.email || 'bangalore@matricsmania.com',
      businessHours: acf.business_hours || 'Mon-Fri 09:00 - 18:30 IST',
      isHeadquarters: city.toLowerCase() === 'bangalore',
    },
    localMarketSummary: acf.localmarketsummary || acf.local_market_summary || sanitizePlainText(raw.excerpt?.rendered) || '',
    marketDrivers: Array.isArray(acf.market_drivers)
      ? acf.market_drivers.map((d) => ({
          title: d.title,
          metric: d.metric,
          description: d.description,
        }))
      : [],
    regionalClients: Array.isArray(acf.regional_clients)
      ? acf.regional_clients.map((rc) => ({
          clientName: rc.client_name,
          industry: rc.industry,
          resultMetric: rc.result_metric,
          locationArea: rc.location_area,
        }))
      : [],
    targetSectors: Array.isArray(acf.target_sectors) ? acf.target_sectors : [],
    supportedLanguages: Array.isArray(acf.supported_languages) ? acf.supported_languages : ['English'],
    localTimeZone: acf.timezone || 'Asia/Kolkata',
  };
}

/**
 * Normalizes Raw Insight CPT to Insight Domain Model
 */
export function normalizeWpInsight(raw: RawWpInsightPost): Insight {
  const acf = raw.acf || {};
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);
  const embeddedAuthor = raw._embedded?.author?.[0];
  const author = normalizeWpAuthor(embeddedAuthor);

  const services = Array.isArray(acf.related_services)
    ? acf.related_services.map((s) => normalizeEntityRef(s, 'Service'))
    : [];
  const industries = Array.isArray(acf.related_industries)
    ? acf.related_industries.map((i) => normalizeEntityRef(i, 'Industry'))
    : [];
  const locations = Array.isArray(acf.related_locations)
    ? acf.related_locations.map((l) => normalizeEntityRef(l, 'Location'))
    : [];
  const caseStudies = Array.isArray(acf.related_case_studies)
    ? acf.related_case_studies.map((c) => normalizeEntityRef(c, 'Case Study'))
    : [];

  const relationships: InsightRelationships = {
    services,
    industries,
    locations,
    caseStudies,
  };

  const category = acf.category || 'Industry Intelligence';

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/insights/${raw.slug}/`),
    relationships,

    standfirst: acf.standfirst,
    category,
    categorySlug: category.toLowerCase().replace(/\s+/g, '-'),
    contentType: (acf.contenttype as any) || (acf.content_type as any) || 'Research',
    author,
    reviewer: acf.reviewer_name
      ? {
          name: acf.reviewer_name,
          role: acf.reviewer_role || 'Senior Growth Analyst',
        }
      : undefined,
    readingTimeMinutes: acf.reading_time_minutes || 6,
    wordCount: acf.word_count || 1800,
    tags: Array.isArray(raw._embedded?.['wp:term']?.[1]) ? raw._embedded['wp:term'][1].map((t) => t.name) : [],
    keyTakeaways: Array.isArray(acf.key_takeaways) ? acf.key_takeaways : [],
    sections: Array.isArray(acf.sections)
      ? acf.sections.map((sec, idx) => ({
          id: sec.id || `section-${idx}`,
          title: sec.title,
          subtitle: sec.subtitle,
          content: sec.content,
          keyPoints: sec.key_points,
          quote: sec.quote,
          codeSnippet: sec.code_snippet,
          codeLanguage: sec.code_language,
        }))
      : [],
    originalStudyData: acf.original_study_data
      ? {
          sampleSize: acf.original_study_data.sample_size,
          timeframe: acf.original_study_data.timeframe,
          methodology: acf.original_study_data.methodology,
          stats: acf.original_study_data.stats || [],
        }
      : undefined,
  };
}

/**
 * Normalizes Raw Case Study CPT to CaseStudy Domain Model
 */
export function normalizeWpCaseStudy(raw: RawWpCaseStudyPost): CaseStudy {
  const acf = raw.acf || {};
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);

  const services = Array.isArray(acf.related_services)
    ? acf.related_services.map((s) => normalizeEntityRef(s, 'Service'))
    : [];
  const industries = Array.isArray(acf.related_industries)
    ? acf.related_industries.map((i) => normalizeEntityRef(i, 'Industry'))
    : [];
  const insights = Array.isArray(acf.related_insights)
    ? acf.related_insights.map((i) => normalizeEntityRef(i, 'Insight'))
    : [];

  const relationships: CaseStudyRelationships = {
    services,
    industries,
    insights,
  };

  const clientName = acf.clientname || acf.client_name || sanitizePlainText(raw.title?.rendered);
  const clientIndustry = acf.clientindustry || acf.client_industry || 'Enterprise SaaS';

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || acf.challengesummary || acf.challenge_summary || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/case-studies/${raw.slug}/`),
    relationships,

    caseStudyCode: acf.case_study_code || `CS-${raw.slug ? raw.slug.toUpperCase().slice(0, 4) : 'PROJ'}`,
    clientName,
    clientIndustry,
    clientIndustrySlug: acf.client_industry_slug || clientIndustry.toLowerCase().replace(/\s+/g, '-'),
    clientLogo: acf.client_author_avatar || '/placeholder.svg',
    heroHeadline: acf.heroheadline || acf.hero_headline || sanitizePlainText(raw.title?.rendered),
    challengeSummary: acf.challengesummary || acf.challenge_summary || '',
    solutionArchitecture: acf.solution_architecture || '',
    executiveSummary: acf.executive_summary || sanitizePlainText(raw.excerpt?.rendered) || '',
    results: Array.isArray(acf.results)
      ? acf.results.map((r) => ({
          metric: r.metric,
          label: r.label,
          baseline: r.baseline,
          achieved: r.achieved,
          timeframe: r.timeframe,
        }))
      : [],
    beforeAfterComparison: Array.isArray(acf.before_after_comparison)
      ? acf.before_after_comparison.map((ba) => ({
          aspect: ba.aspect,
          before: ba.before,
          after: ba.after,
          delta: ba.delta,
        }))
      : [],
    techStackDeployed: Array.isArray(acf.tech_stack_deployed) ? acf.tech_stack_deployed : [],
    testimonialQuote: acf.testimonial_quote || '',
    clientAuthor: {
      name: acf.client_author_name || 'Chief Marketing Officer',
      role: acf.client_author_role || 'Executive Client Lead',
      avatar: acf.client_author_avatar,
    },
    verifiedAuditReportUrl: acf.verified_audit_report_url,
  };
}

/**
 * Normalizes Raw Page CPT to Page Domain Model
 */
export function normalizeWpPage(raw: RawWpBasePost): Page {
  const embeddedMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = normalizeWpMedia(embeddedMedia);

  return {
    id: raw.id,
    slug: raw.slug,
    title: sanitizePlainText(raw.title?.rendered),
    excerpt: sanitizePlainText(raw.excerpt?.rendered) || '',
    content: raw.content?.rendered || '',
    featuredImage,
    publishedAt: raw.date,
    updatedAt: raw.modified,
    status: raw.status === 'publish' ? 'published' : (raw.status as any),
    seo: normalizeWpSeo(raw, `https://matricsmania.com/${raw.slug}/`),
    relationships: {},
    template: (raw.template as any) || 'default',
    heroHeadline: raw.acf?.hero_headline,
    heroSubheadline: raw.acf?.hero_subheadline,
  };
}
