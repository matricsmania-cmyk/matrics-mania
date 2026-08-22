import { ContentProvider } from '../providers/ContentProvider';
import { EntityRef, Service, Industry, Location, Insight, CaseStudy } from '../models';

/**
 * Normalizes a URL slug into canonical path format '/<basePath>/<slug>/'
 */
export function formatInternalUrl(basePath: string, slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  return `/${basePath}/${cleanSlug}/`;
}

/**
 * Resolves a raw entity or slug into a validated EntityRef against the ContentProvider.
 * Returns null if the target entity does not actually exist in the data repository.
 */
export function resolveEntityRef(
  item: EntityRef | string | number | Service | Industry | Location | Insight | CaseStudy | any,
  type: 'service' | 'industry' | 'location' | 'insight' | 'caseStudy',
  provider: ContentProvider
): EntityRef | null {
  const slug = typeof item === 'object' && item.slug ? item.slug : String(item);
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '').replace(/^(services|industries|locations|insights|case-studies)\//, '');

  if (!cleanSlug) return null;

  switch (type) {
    case 'service': {
      const srv = provider.getServiceBySlug(cleanSlug);
      if (srv) {
        return {
          id: srv.id,
          slug: srv.slug,
          title: srv.title,
          url: `/services/${srv.slug}/`,
          excerpt: srv.shortDescription || srv.excerpt,
          category: srv.category || 'Service Architecture',
        };
      }
      break;
    }
    case 'industry': {
      const ind = provider.getIndustryBySlug(cleanSlug);
      if (ind) {
        return {
          id: ind.id,
          slug: ind.slug,
          title: ind.title,
          url: `/industries/${ind.slug}/`,
          excerpt: ind.marketSummary || ind.excerpt || ind.tagline,
          category: ind.industryCode || 'Industry Practice',
        };
      }
      break;
    }
    case 'location': {
      const loc = provider.getLocationBySlug(cleanSlug);
      if (loc) {
        return {
          id: loc.id,
          slug: loc.slug,
          title: loc.city ? `${loc.city} Regional Hub` : loc.title,
          url: `/locations/${loc.slug}/`,
          excerpt: loc.localMarketSummary || loc.excerpt,
          category: loc.country || 'Operating Node',
        };
      }
      break;
    }
    case 'insight': {
      const ins = provider.getInsightBySlug(cleanSlug);
      if (ins) {
        return {
          id: ins.id,
          slug: ins.slug,
          title: ins.title,
          url: `/insights/${ins.slug}/`,
          excerpt: ins.standfirst || ins.excerpt,
          category: ins.category || 'Technical Research',
        };
      }
      break;
    }
    case 'caseStudy': {
      const cs = provider.getCaseStudyBySlug(cleanSlug);
      if (cs) {
        return {
          id: cs.id,
          slug: cs.slug,
          title: cs.clientName ? `${cs.clientName} Case Evidence` : cs.title,
          url: `/case-studies/${cs.slug}/`,
          excerpt: cs.executiveSummary || cs.challengeSummary || cs.excerpt,
          category: cs.clientIndustry || 'Empirical Proof',
        };
      }
      break;
    }
  }

  // If passed an EntityRef object whose URL is already explicitly set and non-empty, keep it if title exists
  if (typeof item === 'object' && item.title && item.url) {
    return {
      id: item.id || cleanSlug,
      slug: item.slug || cleanSlug,
      title: item.title,
      url: item.url.startsWith('/') ? item.url : `/${item.url}`,
      excerpt: item.excerpt,
      category: item.category,
    };
  }

  return null;
}

/**
 * Filters a list of raw entity refs or slugs, keeping ONLY those that exist in the data.
 */
export function filterExistingEntities(
  items: (EntityRef | string | any)[] | undefined,
  type: 'service' | 'industry' | 'location' | 'insight' | 'caseStudy',
  provider: ContentProvider
): EntityRef[] {
  if (!items || !Array.isArray(items)) return [];

  const seen = new Set<string>();
  const results: EntityRef[] = [];

  for (const item of items) {
    const resolved = resolveEntityRef(item, type, provider);
    if (resolved && !seen.has(resolved.slug)) {
      seen.add(resolved.slug);
      results.push(resolved);
    }
  }

  return results;
}

/**
 * Resolved contextual relationships for a Service page.
 * Services can link to:
 * - related industries
 * - related insights
 * - relevant case studies
 * - related services
 */
export interface ResolvedServiceRelationships {
  relatedIndustries: EntityRef[];
  relatedInsights: EntityRef[];
  relevantCaseStudies: EntityRef[];
  relatedServices: EntityRef[];
}

export function getServiceContextualLinks(
  service: Service,
  provider: ContentProvider
): ResolvedServiceRelationships {
  // 1. Related Industries
  const relatedIndustries = filterExistingEntities(
    service.relationships?.industries,
    'industry',
    provider
  );

  // 2. Related Insights
  const rawInsights = [
    ...(service.relationships?.insights || []),
    ...provider.getAllInsights().filter((ins) => ins.relationships?.services?.some((s) => s.slug === service.slug)),
  ];
  const relatedInsights = filterExistingEntities(rawInsights, 'insight', provider);

  // 3. Relevant Case Studies
  const rawCaseStudies = [
    ...(service.relationships?.caseStudies || []),
    ...provider.getAllCaseStudies().filter((cs) => cs.relationships?.services?.some((s) => s.slug === service.slug)),
  ];
  const relevantCaseStudies = filterExistingEntities(rawCaseStudies, 'caseStudy', provider);

  // 4. Related Services (excluding current service)
  const rawRelatedServices = [
    ...(service.relationships?.relatedServices || []),
    ...provider.getAllServices().filter((s) => s.slug !== service.slug && s.categorySlug === service.categorySlug),
  ];
  const relatedServices = filterExistingEntities(rawRelatedServices, 'service', provider).filter(
    (s) => s.slug !== service.slug
  );

  return {
    relatedIndustries,
    relatedInsights,
    relevantCaseStudies,
    relatedServices,
  };
}

/**
 * Resolved contextual relationships for an Industry page.
 * Industry pages can link to:
 * - relevant services
 * - relevant insights
 * - relevant case studies
 */
export interface ResolvedIndustryRelationships {
  relevantServices: EntityRef[];
  relevantInsights: EntityRef[];
  relevantCaseStudies: EntityRef[];
}

export function getIndustryContextualLinks(
  industry: Industry,
  provider: ContentProvider
): ResolvedIndustryRelationships {
  // 1. Relevant Services
  const rawServices = [
    ...(industry.relationships?.services || []),
    ...(industry.serviceRecommendations?.map((sr) => sr.serviceSlug) || []),
    ...provider.getAllServices().filter((srv) => srv.relationships?.industries?.some((i) => i.slug === industry.slug)),
  ];
  const relevantServices = filterExistingEntities(rawServices, 'service', provider);

  // 2. Relevant Insights
  const rawInsights = [
    ...(industry.relationships?.insights || []),
    ...provider.getAllInsights().filter((ins) => ins.relationships?.industries?.some((i) => i.slug === industry.slug)),
  ];
  const relevantInsights = filterExistingEntities(rawInsights, 'insight', provider);

  // 3. Relevant Case Studies
  const rawCaseStudies = [
    ...(industry.relationships?.caseStudies || []),
    ...provider.getAllCaseStudies().filter((cs) => cs.clientIndustrySlug === industry.slug || cs.relationships?.industries?.some((i) => i.slug === industry.slug)),
  ];
  const relevantCaseStudies = filterExistingEntities(rawCaseStudies, 'caseStudy', provider);

  return {
    relevantServices,
    relevantInsights,
    relevantCaseStudies,
  };
}

/**
 * Resolved contextual relationships for a Location page.
 * Location pages can link to:
 * - services
 * - industries
 * - insights
 * - relevant work (case studies)
 */
export interface ResolvedLocationRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  insights: EntityRef[];
  relevantWork: EntityRef[];
}

export function getLocationContextualLinks(
  location: Location,
  provider: ContentProvider
): ResolvedLocationRelationships {
  // 1. Services
  const rawServices = [
    ...(location.relationships?.services || []),
    ...provider.getAllServices().slice(0, 4),
  ];
  const services = filterExistingEntities(rawServices, 'service', provider);

  // 2. Industries
  const rawIndustries = [
    ...(location.relationships?.industries || []),
    ...(location.targetSectors || []),
    ...provider.getAllIndustries().slice(0, 3),
  ];
  const industries = filterExistingEntities(rawIndustries, 'industry', provider);

  // 3. Insights
  const rawInsights = [
    ...(location.relationships?.insights || []),
    ...provider.getAllInsights().slice(0, 2),
  ];
  const insights = filterExistingEntities(rawInsights, 'insight', provider);

  // 4. Relevant Work / Case Studies
  const rawWork = [
    ...(location.relationships?.caseStudies || []),
    ...provider.getAllCaseStudies().slice(0, 2),
  ];
  const relevantWork = filterExistingEntities(rawWork, 'caseStudy', provider);

  return {
    services,
    industries,
    insights,
    relevantWork,
  };
}

/**
 * Resolved contextual relationships for an Insight page.
 * Insights can link to:
 * - services
 * - industries
 * - locations
 * - case studies
 * - related insights
 */
export interface ResolvedInsightRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  locations: EntityRef[];
  caseStudies: EntityRef[];
  relatedInsights: EntityRef[];
}

export function getInsightContextualLinks(
  insight: Insight,
  provider: ContentProvider
): ResolvedInsightRelationships {
  // 1. Services
  const services = filterExistingEntities(insight.relationships?.services, 'service', provider);

  // 2. Industries
  const industries = filterExistingEntities(insight.relationships?.industries, 'industry', provider);

  // 3. Locations
  const locations = filterExistingEntities(insight.relationships?.locations, 'location', provider);

  // 4. Case Studies
  const caseStudies = filterExistingEntities(insight.relationships?.caseStudies, 'caseStudy', provider);

  // 5. Related Insights (excluding current insight)
  const rawRelatedInsights = [
    ...(insight.relationships?.insights || []),
    ...(insight.relationships?.relatedInsights || []),
    ...provider.getAllInsights().filter((i) => i.slug !== insight.slug && i.categorySlug === insight.categorySlug),
  ];
  const relatedInsights = filterExistingEntities(rawRelatedInsights, 'insight', provider).filter(
    (i) => i.slug !== insight.slug
  );

  return {
    services,
    industries,
    locations,
    caseStudies,
    relatedInsights,
  };
}

/**
 * Resolved contextual relationships for a Case Study page.
 * Case studies can link to:
 * - services
 * - industries
 * - related insights
 * - related case studies (optional)
 */
export interface ResolvedCaseStudyRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  relatedInsights: EntityRef[];
  relatedCaseStudies: EntityRef[];
}

export function getCaseStudyContextualLinks(
  caseStudy: CaseStudy,
  provider: ContentProvider
): ResolvedCaseStudyRelationships {
  // 1. Services
  const services = filterExistingEntities(caseStudy.relationships?.services, 'service', provider);

  // 2. Industries
  const rawIndustries = [
    ...(caseStudy.relationships?.industries || []),
    ...(caseStudy.clientIndustrySlug ? [caseStudy.clientIndustrySlug] : []),
  ];
  const industries = filterExistingEntities(rawIndustries, 'industry', provider);

  // 3. Related Insights
  const rawInsights = [
    ...(caseStudy.relationships?.insights || []),
    ...provider.getAllInsights().filter((ins) => ins.relationships?.caseStudies?.some((cs) => cs.slug === caseStudy.slug)),
  ];
  const relatedInsights = filterExistingEntities(rawInsights, 'insight', provider);

  // 4. Related Case Studies (excluding current case study)
  const rawCaseStudies = [
    ...(caseStudy.relationships?.relatedCaseStudies || []),
    ...provider.getAllCaseStudies().filter((cs) => cs.slug !== caseStudy.slug),
  ];
  const relatedCaseStudies = filterExistingEntities(rawCaseStudies, 'caseStudy', provider).filter(
    (cs) => cs.slug !== caseStudy.slug
  );

  return {
    services,
    industries,
    relatedInsights,
    relatedCaseStudies,
  };
}
