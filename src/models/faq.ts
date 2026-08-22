export type FAQCategory =
  | 'General'
  | 'Services'
  | 'Pricing & Retainers'
  | 'Engineering & SLA'
  | 'Implementation'
  | 'Onboarding'
  | 'Security & Compliance';

export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
  category: FAQCategory | string;
  sortOrder?: number;
  order?: number;
  featured?: boolean;
  relatedServiceSlugs?: string[];
  relatedIndustrySlugs?: string[];
  relatedLocationSlugs?: string[];
}
