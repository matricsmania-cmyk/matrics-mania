import { Media } from './media';

export interface Testimonial {
  id: string | number;
  authorName?: string;
  authorRole?: string;
  companyName?: string;
  quote: string;
  rating?: number; // e.g. 5
  metricHighlight?: string; // e.g. "+318% Organic Pipeline"
  avatar?: string | Media;
  companyLogo?: string | Media;
  verifiedAudit?: boolean;
  relatedServiceSlug?: string;
  relatedIndustrySlug?: string;
  relatedCaseStudySlug?: string;

  // Compatibility aliases for legacy consumers
  name?: string;
  role?: string;
  company?: string;
}
