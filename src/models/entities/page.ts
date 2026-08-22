import { BaseContentEntity } from '../base';
import { EntityRef } from '../relationships';
import { CTA } from '../cta';
import { FAQ } from '../faq';

export type PageTemplateType =
  | 'default'
  | 'homepage'
  | 'about'
  | 'process'
  | 'work-index'
  | 'careers'
  | 'faq'
  | 'contact'
  | 'legal'
  | 'services-hub'
  | 'industries-hub'
  | 'locations-hub'
  | 'insights-hub'
  | 'case-studies-hub';

export interface ContentBlock {
  id: string;
  blockType: string;
  order: number;
  data: Record<string, any>;
}

export interface PageRelationships {
  parentPage?: EntityRef | null;
  childPages?: EntityRef[];
  featuredServices?: EntityRef[];
  featuredIndustries?: EntityRef[];
  featuredCaseStudies?: EntityRef[];
  featuredInsights?: EntityRef[];
}

/**
 * Page Domain Model
 */
export interface Page extends BaseContentEntity<PageRelationships> {
  template: PageTemplateType;
  heroHeadline?: string;
  heroSubheadline?: string;
  blocks?: ContentBlock[];
  faqs?: FAQ[];
  cta?: CTA;
}
