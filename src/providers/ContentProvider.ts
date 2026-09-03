import {
  Page,
  Service,
  Industry,
  Location,
  CaseStudy,
  Insight,
  Author,
  FAQ,
  Testimonial,
  Navigation,
  ContactInformation,
  WorkProject,
} from '../models';

/**
 * MatricsMania Content Provider Contract
 * 
 * Abstract interface implemented by WordPressProvider (headless CMS hydration via wp/v2 REST endpoints).
 * 
 * Page components and layout shells strictly query this contract.
 */
export interface ContentProvider {
  // Pages
  getPageBySlug(slug: string): Page | null;
  getAllPages(): Page[];

  // Services
  getServiceBySlug(slug: string): Service | null;
  getAllServices(): Service[];

  // Industries
  getIndustryBySlug(slug: string): Industry | null;
  getAllIndustries(): Industry[];

  // Locations
  getLocationBySlug(slug: string): Location | null;
  getAllLocations(): Location[];

  // Case Studies
  getCaseStudyBySlug(slug: string): CaseStudy | null;
  getAllCaseStudies(): CaseStudy[];

  // Insights / Editorial
  getInsightBySlug(slug: string): Insight | null;
  getAllInsights(): Insight[];
  getInsightsByCategory(categorySlug: string): Insight[];

  // Authors
  getAuthorBySlug(slug: string): Author | null;
  getAllAuthors(): Author[];

  // Supporting Primitives
  getAllFaqs(category?: string): FAQ[];
  getAllFAQs(category?: string): FAQ[];
  getAllTestimonials(): Testimonial[];
  getAllWorkProjects(): WorkProject[];
  getNavigation(): Navigation;
  getContactInfo(): ContactInformation;
  getContactInformation(): ContactInformation;

  // Search & Cross-Taxonomy Queries
  searchContent(query: string): {
    services: Service[];
    industries: Industry[];
    insights: Insight[];
    caseStudies: CaseStudy[];
  };
}
