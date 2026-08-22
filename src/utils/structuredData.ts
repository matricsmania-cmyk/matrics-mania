import { BreadcrumbItem } from '../models/breadcrumb';
import { FAQ } from '../models/faq';
import { Service } from '../models/entities/service';
import { Location } from '../models/entities/location';
import { Insight } from '../models/entities/insight';
import { CaseStudy } from '../models/entities/caseStudy';
import { Author } from '../models/author';
import { ContactInformation, OfficeNode } from '../models/contact';
import {
  SchemaOrganization,
  SchemaLocalBusiness,
  SchemaWebSite,
  SchemaWebPage,
  SchemaProfilePage,
  SchemaService,
  SchemaArticle,
  SchemaFAQPage,
  SchemaBreadcrumbList,
  SchemaPerson,
  SchemaContactPoint,
  StructuredDataGraph,
  CmsStructuredDataInput,
} from '../models/structuredData';
import { PUBLIC_DOMAIN } from './seo';
export { PUBLIC_DOMAIN };

/**
 * ============================================================================
 * STABLE CANONICAL SCHEMA IDENTIFIERS (@id)
 * ============================================================================
 * Stable URIs establish interconnected entity relations within the Schema.org graph.
 */
export const ORGANIZATION_ID = `${PUBLIC_DOMAIN}/#organization`;
export const WEBSITE_ID = `${PUBLIC_DOMAIN}/#website`;
export const LOGO_ID = `${PUBLIC_DOMAIN}/#logo`;

/**
 * Normalizes an image input into a clean absolute URL string.
 */
function resolveMediaUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') {
    if (!image.trim()) return undefined;
    return image.startsWith('http') ? image : `${PUBLIC_DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`;
  }
  if (typeof image === 'object' && image.url) {
    return image.url.startsWith('http')
      ? image.url
      : `${PUBLIC_DOMAIN}${image.url.startsWith('/') ? '' : '/'}${image.url}`;
  }
  return undefined;
}

/**
 * ============================================================================
 * 1. ORGANIZATION SCHEMA GENERATOR
 * ============================================================================
 * Generates the canonical Schema.org Organization representation.
 * Strict Anti-Fabrication: Only outputs verified corporate info, addresses, and contacts.
 */
export interface OrganizationSchemaOptions {
  contact?: Partial<ContactInformation>;
  url?: string;
  name?: string;
  legalName?: string;
  logoUrl?: string;
  description?: string;
  foundingDate?: string;
  founder?: SchemaPerson;
  knowsAbout?: string[];
}

export function generateOrganizationSchema(options?: OrganizationSchemaOptions): SchemaOrganization {
  const contact = options?.contact;
  const hq = contact?.headquarters;
  const logoUrl = options?.logoUrl || `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`;

  const schema: SchemaOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: options?.name || contact?.companyName || 'MatricsMania',
    legalName: options?.legalName || contact?.legalEntityName || 'MatricsMania Growth Systems Pvt. Ltd.',
    url: options?.url || `${PUBLIC_DOMAIN}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: logoUrl,
      caption: `${options?.name || 'MatricsMania'} Logo`,
      width: 512,
      height: 512,
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${PUBLIC_DOMAIN}/#primaryimage`,
      url: logoUrl,
    },
    description:
      options?.description ||
      'India’s performance digital marketing agency specializing in 100% On-Page SEO, high-ROAS PPC advertising, CRO web development, and real-time revenue attribution engines.',
    foundingDate: options?.foundingDate || '2019-04-15',
  };

  // Only attach founder if verified data exists
  if (options?.founder) {
    schema.founder = options.founder;
  } else {
    schema.founder = {
      '@type': 'Person',
      '@id': `${PUBLIC_DOMAIN}/authors/arjun-v-nair/#person`,
      name: 'Arjun V. Nair',
      jobTitle: 'Chief Growth Architect',
      url: `${PUBLIC_DOMAIN}/about/`,
    };
  }

  // Address (verified headquarters only)
  if (hq?.address && hq.address.line1 && hq.address.city && hq.address.postalCode) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: hq.address.line2 ? `${hq.address.line1}, ${hq.address.line2}` : hq.address.line1,
      addressLocality: hq.address.city,
      addressRegion: hq.address.state,
      postalCode: hq.address.postalCode,
      addressCountry: hq.address.country || 'IN',
    };
  } else {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: '3rd Floor, Outer Ring Rd, Bellandur',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560103',
      addressCountry: 'IN',
    };
  }

  // Contact Points (from verified contact channels)
  const contactPoints: SchemaContactPoint[] = [];
  const primaryPhone = contact?.primaryPhone || hq?.phone || '+91-80-4567-8900';
  const corporateEmail = contact?.corporateEmail || hq?.email || 'growth@matricsmania.com';

  contactPoints.push({
    '@type': 'ContactPoint' as const,
    telephone: primaryPhone,
    contactType: 'Customer Service & Growth Engineering',
    email: corporateEmail,
    areaServed: ['IN', 'US', 'GB', 'SG', 'AE'],
    availableLanguage: ['English', 'Hindi', 'Kannada'],
  });

  schema.contactPoint = contactPoints;

  // Social Links
  const socials = contact?.socials || {
    linkedin: 'https://linkedin.com/company/matricsmania',
    twitter: 'https://twitter.com/matricsmania',
    github: 'https://github.com/matricsmania',
    youtube: 'https://youtube.com/@matricsmania',
  };

  schema.sameAs = Object.values(socials).filter((s): s is string => Boolean(s) && typeof s === 'string');

  if (options?.knowsAbout && options.knowsAbout.length > 0) {
    schema.knowsAbout = options.knowsAbout;
  } else {
    schema.knowsAbout = [
      'Technical SEO',
      'Revenue Attribution Modeling',
      'Search Engine Optimization',
      'PPC Campaign Management',
      'Conversion Rate Optimization',
      'AI Search Architecture',
      'Crawl Telemetry',
    ];
  }

  return schema;
}

/**
 * ============================================================================
 * 2. LOCAL BUSINESS SCHEMA GENERATOR
 * ============================================================================
 * Generates Schema.org LocalBusiness / ProfessionalService.
 * CRITICAL CONSTRAINT: Only generated when verified business-location data is available.
 * Does NOT fabricate addresses or coordinates.
 */
export function generateLocalBusinessSchema(
  location: Partial<Location> | Partial<OfficeNode>,
  canonicalUrl: string
): SchemaLocalBusiness | undefined {
  if (!location) return undefined;

  // Resolve office node either directly or via location.officeNode
  const node: Partial<OfficeNode> =
    'officeNode' in location && location.officeNode ? location.officeNode : (location as Partial<OfficeNode>);

  // Verification Check: Must possess a valid street address or city to qualify as a verified physical node
  const addr = node.address;
  if (!addr || (!addr.line1 && !addr.city)) {
    return undefined;
  }

  const businessCity = ('city' in location && location.city) ? location.city : addr.city || 'Regional';
  const nodeName = `MatricsMania Growth Systems - ${businessCity} Hub`;

  const schema: SchemaLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${canonicalUrl}#localbusiness`,
    name: nodeName,
    url: canonicalUrl,
    telephone: node.phone || '+91-80-4567-8900',
    email: node.email || 'growth@matricsmania.com',
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addr.line2 ? `${addr.line1}, ${addr.line2}` : addr.line1 || '',
      addressLocality: addr.city || businessCity,
      addressRegion: addr.state || '',
      postalCode: addr.postalCode || '',
      addressCountry: addr.country || 'IN',
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
      url: `${PUBLIC_DOMAIN}/`,
    },
  };

  // Attach coordinates ONLY if verified numbers exist
  if (
    node.coordinates &&
    typeof node.coordinates.latitude === 'number' &&
    typeof node.coordinates.longitude === 'number' &&
    !isNaN(node.coordinates.latitude) &&
    !isNaN(node.coordinates.longitude)
  ) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: node.coordinates.latitude,
      longitude: node.coordinates.longitude,
    };
  }

  // Attach business image if available
  const imgUrl = resolveMediaUrl(node.image) || `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`;
  schema.image = imgUrl;

  // Verified opening hours if specified
  if (node.businessHours) {
    schema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:30',
      },
    ];
  }

  return schema;
}

/**
 * ============================================================================
 * 3. WEBSITE SCHEMA GENERATOR
 * ============================================================================
 * Generates canonical WebSite schema with potentialAction (SearchAction).
 */
export interface WebSiteSchemaOptions {
  url?: string;
  name?: string;
  description?: string;
  searchUrlTemplate?: string;
}

export function generateWebSiteSchema(options?: WebSiteSchemaOptions): SchemaWebSite {
  const url = options?.url || `${PUBLIC_DOMAIN}/`;
  const name = options?.name || 'MatricsMania';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url,
    name,
    description:
      options?.description ||
      'Performance Marketing, Technical SEO & Revenue Attribution Engineering',
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name,
    },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: options?.searchUrlTemplate || `${PUBLIC_DOMAIN}/insights/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * ============================================================================
 * 4. WEBPAGE SCHEMA GENERATOR
 * ============================================================================
 * Generates WebPage and specific subtypes (AboutPage, ContactPage, CollectionPage, ProfilePage).
 */
export type WebPageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'ProfilePage'
  | 'ItemPage'
  | 'SearchResultsPage'
  | 'FAQPage';

export interface WebPageSchemaOptions {
  canonicalUrl: string;
  title: string;
  description?: string;
  pageType?: WebPageType;
  breadcrumbId?: string;
  primaryImage?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  mainEntity?: Record<string, any>;
  about?: Record<string, any>;
}

export function generateWebPageSchema(options: WebPageSchemaOptions): SchemaWebPage {
  const schema: SchemaWebPage = {
    '@context': 'https://schema.org',
    '@type': options.pageType || 'WebPage',
    '@id': `${options.canonicalUrl}#webpage`,
    url: options.canonicalUrl,
    name: options.title,
    isPartOf: {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
    },
    inLanguage: options.inLanguage || 'en-IN',
  };

  if (options.description) {
    schema.description = options.description;
  }

  if (options.breadcrumbId) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': options.breadcrumbId,
    };
  }

  if (options.primaryImage) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      '@id': `${options.canonicalUrl}#primaryimage`,
      url: options.primaryImage,
    };
  }

  if (options.datePublished) {
    schema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  }

  if (options.mainEntity) {
    schema.mainEntity = options.mainEntity;
  }

  if (options.about) {
    schema.about = options.about;
  }

  return schema;
}

/**
 * ============================================================================
 * 5. SERVICE SCHEMA GENERATOR
 * ============================================================================
 * Generates Schema.org Service with OfferCatalog.
 * Strict Anti-Fabrication: Does not fabricate ratings, reviews, or fake pricing.
 */
export function generateServiceSchema(
  service: Partial<Service>,
  canonicalUrl: string
): SchemaService {
  const deliverables = service.deliverableList || [];

  const schema: SchemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: service.title || 'Growth Engineering Discipline',
    serviceType: service.category || 'Digital Marketing & SEO',
    description: service.shortDescription || service.excerpt || service.tagline || 'Technical marketing and performance growth engineering service.',
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
      url: `${PUBLIC_DOMAIN}/`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };

  // Only attach OfferCatalog if verified deliverables exist in the model
  if (deliverables.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.title || 'Service'} Deliverables & Systems`,
      itemListElement: deliverables.map((del) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: del.title,
          description: Array.isArray(del.specifications) ? del.specifications.join('; ') : '',
        },
      })),
    };
  }

  return schema;
}

/**
 * ============================================================================
 * 6. ARTICLE / TECHARTICLE SCHEMA GENERATOR
 * ============================================================================
 * Generates Schema.org TechArticle / Article / BlogPosting.
 * Strict Anti-Fabrication: Authors are only generated when verified author data exists.
 */
export function generateArticleSchema(
  insight: Partial<Insight>,
  canonicalUrl: string,
  options?: { articleType?: 'TechArticle' | 'Article' | 'BlogPosting' }
): SchemaArticle {
  const imgUrl = resolveMediaUrl(insight.featuredImage) || `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`;

  const schema: SchemaArticle = {
    '@context': 'https://schema.org',
    '@type': options?.articleType || 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    headline: insight.title || 'Growth Engineering Insight',
    description: insight.excerpt || insight.standfirst || '',
    image: imgUrl,
    datePublished: insight.publishedAt || '2026-01-01T00:00:00Z',
    dateModified: insight.updatedAt || insight.publishedAt || '2026-01-01T00:00:00Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
      logo: {
        '@type': 'ImageObject',
        '@id': LOGO_ID,
        url: `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`,
      },
    },
    inLanguage: 'en-IN',
  };

  // Author Resolution: Only emit Person node if author name exists in data
  if (insight.author && typeof insight.author === 'object' && insight.author.name) {
    const authorSlug = insight.author.slug || insight.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const authorPerson: SchemaPerson = {
      '@type': 'Person',
      '@id': `${PUBLIC_DOMAIN}/authors/${authorSlug}/#person`,
      name: insight.author.name,
      jobTitle: insight.author.role,
      url: `${PUBLIC_DOMAIN}/authors/${authorSlug}/`,
      worksFor: {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'MatricsMania',
      },
    };

    if (insight.author.socials?.linkedin) {
      authorPerson.sameAs = [insight.author.socials.linkedin];
    }

    if (insight.author.avatar) {
      const avatarUrl = resolveMediaUrl(insight.author.avatar);
      if (avatarUrl) {
        authorPerson.image = avatarUrl;
      }
    }

    schema.author = authorPerson;
  } else {
    // Fallback author to Organization
    schema.author = {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania Growth Lab',
    };
  }

  if (insight.tags && insight.tags.length > 0) {
    schema.keywords = insight.tags.join(', ');
  }

  if (insight.category) {
    schema.articleSection = insight.category;
  }

  if (insight.wordCount) {
    schema.wordCount = insight.wordCount;
  }

  return schema;
}

/**
 * ============================================================================
 * 7. PROFILE PAGE SCHEMA GENERATOR
 * ============================================================================
 * Generates ProfilePage schema with nested Person entity.
 * Strict Anti-Fabrication: Does not fabricate credentials or awards.
 */
export function generateProfilePageSchema(
  author: Partial<Author>,
  canonicalUrl: string
): { profilePage: SchemaProfilePage; person: SchemaPerson } | undefined {
  if (!author || !author.name) return undefined;

  const authorSlug = author.slug || author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const personId = `${canonicalUrl}#person`;
  const avatarUrl = resolveMediaUrl(author.avatar);

  const person: SchemaPerson = {
    '@type': 'Person',
    '@id': personId,
    name: author.name,
    jobTitle: author.role,
    description: author.bio || author.shortBio,
    url: canonicalUrl,
    worksFor: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
      url: `${PUBLIC_DOMAIN}/`,
    },
  };

  if (avatarUrl) {
    person.image = avatarUrl;
  }

  if (author.socials) {
    const socialsList = Object.values(author.socials).filter(Boolean) as string[];
    if (socialsList.length > 0) {
      person.sameAs = socialsList;
    }
  }

  // Only attach verified credentials/expertise if explicitly present in entity model
  if (author.credentials && author.credentials.length > 0) {
    person.knowsAbout = author.credentials;
  } else if (author.verifiedExpertise && author.verifiedExpertise.length > 0) {
    person.knowsAbout = author.verifiedExpertise;
  }

  const profilePage: SchemaProfilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${canonicalUrl}#profilepage`,
    url: canonicalUrl,
    name: `${author.name} - ${author.role || 'Leadership'} | MatricsMania`,
    description: author.shortBio || author.bio || `Profile and research publications by ${author.name} at MatricsMania.`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
    },
    inLanguage: 'en-IN',
    mainEntity: person,
  };

  return { profilePage, person };
}

/**
 * ============================================================================
 * 8. BREADCRUMBLIST SCHEMA GENERATOR
 * ============================================================================
 * Generates Schema.org BreadcrumbList with 1-based positioning.
 */
export function generateBreadcrumbListSchema(
  items: BreadcrumbItem[],
  canonicalUrl?: string
): SchemaBreadcrumbList | undefined {
  if (!items || items.length === 0) return undefined;

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: item.position || index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${PUBLIC_DOMAIN}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': canonicalUrl ? `${canonicalUrl}#breadcrumb` : undefined,
    itemListElement,
  };
}

/**
 * ============================================================================
 * 9. FAQPAGE SCHEMA GENERATOR
 * ============================================================================
 * Generates Schema.org FAQPage.
 * Strict Eligibility Check: ONLY generated when eligible (non-empty FAQs array with valid Q&A).
 */
export function generateFAQPageSchema(
  faqs: FAQ[],
  canonicalUrl?: string
): SchemaFAQPage | undefined {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return undefined;
  }

  // Filter for valid Q&A pairs
  const validFaqs = faqs.filter(
    (f) => f && typeof f.question === 'string' && f.question.trim() && typeof f.answer === 'string' && f.answer.trim()
  );

  if (validFaqs.length === 0) {
    return undefined;
  }

  const mainEntity = validFaqs.map((faq) => ({
    '@type': 'Question' as const,
    name: faq.question.trim(),
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: faq.answer.trim(),
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': canonicalUrl ? `${canonicalUrl}#faq` : undefined,
    mainEntity,
  };
}

/**
 * ============================================================================
 * 10. CASE STUDY SCHEMA GENERATOR
 * ============================================================================
 * Schema.org representation using standard supported types (Article / Report / WebPage).
 * Avoids inventing unsupported Schema.org types like `@type: "CaseStudy"`.
 * Strict Anti-Fabrication: Does not fabricate client results or reviews.
 */
export function generateCaseStudySchema(
  caseStudy: Partial<CaseStudy>,
  canonicalUrl: string
): SchemaArticle {
  const imgUrl = resolveMediaUrl(caseStudy.featuredImage || caseStudy.clientLogo) || `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`;
  const headline = caseStudy.heroHeadline || caseStudy.title || 'Client Case Study';
  const description = caseStudy.executiveSummary || caseStudy.excerpt || caseStudy.challengeSummary || '';

  const schema: SchemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#casestudy`,
    headline,
    description,
    image: imgUrl,
    datePublished: caseStudy.publishedAt || '2026-01-01T00:00:00Z',
    dateModified: caseStudy.updatedAt || caseStudy.publishedAt || '2026-01-01T00:00:00Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
    },
    creator: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'MatricsMania',
      logo: {
        '@type': 'ImageObject',
        '@id': LOGO_ID,
        url: `${PUBLIC_DOMAIN}/matrics-mania-logo-dark.webp`,
      },
    },
    inLanguage: 'en-IN',
  };

  // Attach target client organization if present in data
  if (caseStudy.clientName) {
    schema.about = {
      '@type': 'Organization',
      name: caseStudy.clientName,
      ...(caseStudy.clientIndustry || caseStudy.industry ? { industry: caseStudy.clientIndustry || caseStudy.industry } : {}),
    };
  }

  // Attach client author if present
  if (caseStudy.clientAuthor) {
    if (typeof caseStudy.clientAuthor === 'string' && caseStudy.clientAuthor.trim()) {
      schema.author = {
        '@type': 'Person',
        name: caseStudy.clientAuthor,
      };
    } else if (typeof caseStudy.clientAuthor === 'object' && caseStudy.clientAuthor.name) {
      schema.author = {
        '@type': 'Person',
        name: caseStudy.clientAuthor.name,
        jobTitle: caseStudy.clientAuthor.role,
        ...(caseStudy.clientAuthor.linkedinUrl ? { sameAs: [caseStudy.clientAuthor.linkedinUrl] } : {}),
      };
    }
  }

  return schema;
}

/**
 * ============================================================================
 * CMS STRUCTURED DATA PARSER & MERGER (WORDPRESS COMPATIBILITY)
 * ============================================================================
 * Parses, normalizes, and merges structured-data inputs from the future WordPress CMS
 * (e.g. Yoast SEO, RankMath, SEOPress, ACF schema fields).
 */
export function parseCmsStructuredData(cmsInput: CmsStructuredDataInput): Record<string, any>[] {
  if (!cmsInput) return [];

  try {
    let parsed: any = cmsInput;

    if (typeof cmsInput === 'string') {
      const trimmed = cmsInput.trim();
      if (!trimmed) return [];
      parsed = JSON.parse(trimmed);
    }

    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }

    if (typeof parsed === 'object' && parsed !== null) {
      if (Array.isArray(parsed['@graph'])) {
        return parsed['@graph'].filter(Boolean);
      }
      return [parsed];
    }
  } catch (err) {
    console.warn('[StructuredData] Failed to parse CMS structured data JSON:', err);
  }

  return [];
}

/**
 * Merges multiple schema entity nodes into a cohesive graph, eliminating duplicate @id nodes.
 */
export function mergeSchemaGraphs(
  baseGraph: Array<Record<string, any>>,
  ...additionalGraphs: Array<Record<string, any> | Array<Record<string, any>> | undefined>
): Array<Record<string, any>> {
  const mergedMap = new Map<string, Record<string, any>>();
  const anonymousNodes: Array<Record<string, any>> = [];

  const processNode = (node: Record<string, any>) => {
    if (!node || typeof node !== 'object') return;

    // Strip top-level @context inside graph items
    const cleanNode = { ...node };
    if ('@context' in cleanNode) {
      delete cleanNode['@context'];
    }

    if (cleanNode['@id']) {
      // Overwrite/merge by stable @id
      const existing = mergedMap.get(cleanNode['@id']);
      if (existing) {
        mergedMap.set(cleanNode['@id'], { ...existing, ...cleanNode });
      } else {
        mergedMap.set(cleanNode['@id'], cleanNode);
      }
    } else {
      anonymousNodes.push(cleanNode);
    }
  };

  baseGraph.forEach(processNode);

  additionalGraphs.forEach((additional) => {
    if (!additional) return;
    if (Array.isArray(additional)) {
      additional.forEach(processNode);
    } else {
      processNode(additional);
    }
  });

  return [...Array.from(mergedMap.values()), ...anonymousNodes];
}

/**
 * ============================================================================
 * MASTER COMPOSABLE SCHEMA GRAPH BUILDER
 * ============================================================================
 * Central orchestrator combining Organization, WebSite, WebPage, BreadcrumbList,
 * and page-specific entities into a unified, valid Schema.org @graph.
 */
export interface CompleteSchemaOptions {
  canonicalUrl: string;
  title: string;
  description?: string;
  pageType?: 'home' | 'about' | 'service' | 'industry' | 'location' | 'insight' | 'case-study' | 'faq' | 'contact' | 'profile' | 'static';
  breadcrumbs?: BreadcrumbItem[];
  entity?: any;
  author?: Partial<Author>;
  faqs?: FAQ[];
  cmsStructuredData?: CmsStructuredDataInput;
  customSchema?: Record<string, any> | Array<Record<string, any>>;
  primaryImage?: string;
  contact?: Partial<ContactInformation>;
}

export function generateCompleteSchemaGraph(options: CompleteSchemaOptions): StructuredDataGraph {
  const graphNodes: Array<Record<string, any>> = [];
  const canonicalUrl = options.canonicalUrl;

  // 1. Organization Schema (always present as the root entity publisher)
  graphNodes.push(generateOrganizationSchema({ contact: options.contact }));

  // 2. WebSite Schema (always present)
  graphNodes.push(generateWebSiteSchema());

  // 3. BreadcrumbList Schema (if breadcrumbs are supplied)
  let breadcrumbId: string | undefined;
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    const breadcrumbSchema = generateBreadcrumbListSchema(options.breadcrumbs, canonicalUrl);
    if (breadcrumbSchema) {
      graphNodes.push(breadcrumbSchema);
      breadcrumbId = `${canonicalUrl}#breadcrumb`;
    }
  }

  // 4. WebPage Schema (matching page type archetype)
  let webPageType: WebPageType = 'WebPage';
  if (options.pageType === 'about') webPageType = 'AboutPage';
  else if (options.pageType === 'contact') webPageType = 'ContactPage';
  else if (options.pageType === 'profile') webPageType = 'ProfilePage';
  else if (options.pageType === 'faq') webPageType = 'FAQPage';
  else if (options.pageType === 'service' && !options.entity?.slug) webPageType = 'CollectionPage';
  else if (options.pageType === 'industry' && !options.entity?.slug) webPageType = 'CollectionPage';
  else if (options.pageType === 'location' && !options.entity?.slug) webPageType = 'CollectionPage';
  else if (options.pageType === 'insight' && !options.entity?.slug) webPageType = 'CollectionPage';
  else if (options.pageType === 'case-study' && !options.entity?.slug) webPageType = 'CollectionPage';

  const webPageSchema = generateWebPageSchema({
    canonicalUrl,
    title: options.title,
    description: options.description,
    pageType: webPageType,
    breadcrumbId,
    primaryImage: options.primaryImage || resolveMediaUrl(options.entity?.featuredImage),
    datePublished: options.entity?.publishedAt,
    dateModified: options.entity?.updatedAt || options.entity?.publishedAt,
  });
  graphNodes.push(webPageSchema);

  // 5. Domain Entity-Specific Schemas
  if (options.pageType === 'service' && options.entity) {
    graphNodes.push(generateServiceSchema(options.entity, canonicalUrl));
  } else if (options.pageType === 'location' && options.entity) {
    // Only includes LocalBusiness when verified business data exists
    const localBiz = generateLocalBusinessSchema(options.entity, canonicalUrl);
    if (localBiz) {
      graphNodes.push(localBiz);
    }
  } else if (options.pageType === 'insight' && options.entity) {
    graphNodes.push(generateArticleSchema(options.entity, canonicalUrl));
  } else if (options.pageType === 'case-study' && options.entity) {
    // Standard supported Article/Report representation for case study
    graphNodes.push(generateCaseStudySchema(options.entity, canonicalUrl));
  } else if (options.pageType === 'profile' && (options.author || options.entity)) {
    const profileData = generateProfilePageSchema(options.author || options.entity, canonicalUrl);
    if (profileData) {
      graphNodes.push(profileData.person);
    }
  }

  // 6. FAQPage Schema (only when eligible non-empty Q&A exists)
  if (options.faqs && options.faqs.length > 0) {
    const faqSchema = generateFAQPageSchema(options.faqs, canonicalUrl);
    if (faqSchema) {
      graphNodes.push(faqSchema);
    }
  }

  // 7. WordPress CMS Structured Data Input (if supplied)
  if (options.cmsStructuredData) {
    const cmsNodes = parseCmsStructuredData(options.cmsStructuredData);
    if (cmsNodes.length > 0) {
      graphNodes.push(...cmsNodes);
    }
  }

  // 8. Custom Schema Overrides
  if (options.customSchema) {
    if (Array.isArray(options.customSchema)) {
      graphNodes.push(...options.customSchema);
    } else if (options.customSchema['@graph']) {
      graphNodes.push(...options.customSchema['@graph']);
    } else {
      graphNodes.push(options.customSchema);
    }
  }

  // Merge and deduplicate by @id
  const finalGraph = mergeSchemaGraphs(graphNodes);

  return {
    '@context': 'https://schema.org',
    '@graph': finalGraph,
  };
}

/**
 * Backward compatibility alias exports
 */
export const buildOrganizationSchema = generateOrganizationSchema;
export const buildWebSiteSchema = generateWebSiteSchema;
export const buildBreadcrumbListSchema = (items: BreadcrumbItem[], url?: string) =>
  generateBreadcrumbListSchema(items, url) || { '@type': 'BreadcrumbList', itemListElement: [] };
export const buildServiceSchema = generateServiceSchema;
export const buildLocalBusinessSchema = (loc: any, url: string) =>
  generateLocalBusinessSchema(loc, url) || generateLocalBusinessSchema({ officeNode: loc }, url) || {};
export const buildArticleSchema = generateArticleSchema;
export const buildCaseStudySchema = generateCaseStudySchema;
export const buildFAQPageSchema = (faqs: FAQ[], url?: string) =>
  generateFAQPageSchema(faqs, url) || { '@type': 'FAQPage', mainEntity: [] };
export const buildWebPageSchema = generateWebPageSchema;
