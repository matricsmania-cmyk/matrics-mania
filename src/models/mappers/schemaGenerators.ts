import { Service } from '../entities/service';
import { Location } from '../entities/location';
import { Insight } from '../entities/insight';
import { CaseStudy } from '../entities/caseStudy';
import { Author } from '../author';
import { FAQ } from '../faq';
import { BreadcrumbTrail } from '../breadcrumb';
import { ContactInformation, OfficeNode } from '../contact';
import {
  SchemaOrganization,
  SchemaService,
  SchemaLocalBusiness,
  SchemaArticle,
  SchemaFAQPage,
  SchemaBreadcrumbList,
  SchemaWebSite,
  SchemaWebPage,
  SchemaProfilePage,
  StructuredDataGraph,
  CmsStructuredDataInput,
} from '../structuredData';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateProfilePageSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  generateCaseStudySchema,
  generateCompleteSchemaGraph,
  parseCmsStructuredData,
  mergeSchemaGraphs,
  CompleteSchemaOptions,
  PUBLIC_DOMAIN,
} from '../../utils/structuredData';

/**
 * Re-export core generators from utility for domain and mapper consumers
 */
export {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateProfilePageSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  generateCaseStudySchema,
  generateCompleteSchemaGraph,
  parseCmsStructuredData,
  mergeSchemaGraphs,
};

/**
 * Creates Schema.org Organization Graph from ContactInformation
 */
export function createOrganizationSchema(contact: ContactInformation): SchemaOrganization {
  return generateOrganizationSchema({ contact });
}

/**
 * Creates Schema.org Service Graph for a Service entity
 */
export function createServiceSchema(service: Service): SchemaService {
  return generateServiceSchema(service, `${PUBLIC_DOMAIN}/services/${service.slug}/`);
}

/**
 * Creates Schema.org LocalBusiness / ProfessionalService Graph for a Location entity
 */
export function createLocalBusinessSchema(location: Location): SchemaLocalBusiness | undefined {
  return generateLocalBusinessSchema(location, `${PUBLIC_DOMAIN}/locations/${location.slug}/`);
}

/**
 * Creates Schema.org Article / TechArticle Graph for an Insight entity
 */
export function createArticleSchema(insight: Insight): SchemaArticle {
  return generateArticleSchema(insight, `${PUBLIC_DOMAIN}/insights/${insight.slug}/`);
}

/**
 * Creates Schema.org CaseStudy Article / Report Graph for a CaseStudy entity
 */
export function createCaseStudySchema(caseStudy: CaseStudy): SchemaArticle {
  return generateCaseStudySchema(caseStudy, `${PUBLIC_DOMAIN}/case-studies/${caseStudy.slug}/`);
}

/**
 * Creates Schema.org ProfilePage Graph for an Author entity
 */
export function createProfilePageSchema(author: Author): { profilePage: SchemaProfilePage; person: any } | undefined {
  return generateProfilePageSchema(author, `${PUBLIC_DOMAIN}/authors/${author.slug}/`);
}

/**
 * Creates Schema.org FAQPage Graph
 */
export function createFAQPageSchema(faqs: FAQ[]): SchemaFAQPage | undefined {
  return generateFAQPageSchema(faqs);
}

/**
 * Creates Schema.org BreadcrumbList Graph
 */
export function createBreadcrumbListSchema(trail: BreadcrumbTrail): SchemaBreadcrumbList | undefined {
  return generateBreadcrumbListSchema(trail.items);
}

/**
 * Creates unified Structured Data Graph for complete page envelope
 */
export function buildPageStructuredDataGraph(
  entities: Array<Record<string, any> | undefined>,
  cmsInput?: CmsStructuredDataInput
): StructuredDataGraph {
  const validEntities = entities.filter((e): e is Record<string, any> => Boolean(e));
  let merged = validEntities;

  if (cmsInput) {
    const cmsNodes = parseCmsStructuredData(cmsInput);
    merged = mergeSchemaGraphs(validEntities, cmsNodes);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': merged,
  };
}
