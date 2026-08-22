/**
 * Entity Relationship Domain Models
 * Provides strict bidirectional and cross-taxonomy bindings between CPTs.
 */

export interface EntityRef {
  id: string | number;
  slug: string;
  title: string;
  url: string;
  excerpt?: string;
  category?: string;
  featuredImageUrl?: string;
}

/**
 * Service Relationships
 * - Services ↔ Industries
 * - Services ↔ Insights
 * - Services ↔ Case Studies
 */
export interface ServiceRelationships {
  industries: EntityRef[];
  insights: EntityRef[];
  caseStudies: EntityRef[];
  relatedServices?: EntityRef[];
  parentService?: EntityRef | null;
}

/**
 * Industry Relationships
 * - Industries ↔ Services
 * - Industries ↔ Insights
 * - Industries ↔ Case Studies
 */
export interface IndustryRelationships {
  services: EntityRef[];
  insights: EntityRef[];
  caseStudies?: EntityRef[];
  relatedIndustries?: EntityRef[];
}

/**
 * Location Relationships
 * - Locations ↔ Services
 * - Locations ↔ Industries
 * - Locations ↔ Insights
 */
export interface LocationRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  insights?: EntityRef[];
  caseStudies?: EntityRef[];
  regionalPeers?: EntityRef[];
}

/**
 * Insight / Editorial Relationships
 * - Insights ↔ Services
 * - Insights ↔ Industries
 * - Insights ↔ Locations
 * - Insights ↔ Case Studies
 */
export interface InsightRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  locations: EntityRef[];
  caseStudies?: EntityRef[];
  insights?: EntityRef[];
  relatedInsights?: EntityRef[];
}

/**
 * Case Study Relationships
 * - Case Studies ↔ Services
 * - Case Studies ↔ Industries
 * - Case Studies ↔ Insights
 */
export interface CaseStudyRelationships {
  services: EntityRef[];
  industries: EntityRef[];
  insights?: EntityRef[];
  relatedCaseStudies?: EntityRef[];
}

/**
 * Generic Entity Relationships Union
 */
export type EntityRelationships =
  | ServiceRelationships
  | IndustryRelationships
  | LocationRelationships
  | InsightRelationships
  | CaseStudyRelationships;
