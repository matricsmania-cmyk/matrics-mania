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
import { ContentProvider } from './ContentProvider';

/**
 * ============================================================================
 * MATRICS MANIA EMPTY BASE PROVIDER
 * ============================================================================
 * 
 * All content is retrieved dynamically from the headless WordPress CMS.
 * No hardcoded dummy data or mock statistics are served.
 */

export const MOCK_NAVIGATION: Navigation = {
  headerMenu: [
    { id: 'nav-services', label: 'Services', url: '/services/' },
    { id: 'nav-industries', label: 'Industries', url: '/industries/' },
    { id: 'nav-case-studies', label: 'Case Studies', url: '/case-studies/' },
    { id: 'nav-insights', label: 'Insights', url: '/insights/' },
    { id: 'nav-about', label: 'About', url: '/about/' },
    { id: 'nav-contact', label: 'Contact', url: '/contact/' },
  ],
  footerMenu: {
    solutions: {
      id: 'footer-sol',
      title: 'Growth Solutions',
      items: [],
    },
    industries: {
      id: 'footer-ind',
      title: 'Industry Verticals',
      items: [],
    },
    locations: {
      id: 'footer-loc',
      title: 'Global Hubs',
      items: [],
    },
    research: {
      id: 'footer-res',
      title: 'Intelligence & Research',
      items: [
        { id: 'f-insights', label: 'Research & Insights', url: '/insights/' },
        { id: 'f-case-studies', label: 'Verified Case Studies', url: '/case-studies/' },
      ],
    },
    company: {
      id: 'footer-comp',
      title: 'Company & Standards',
      items: [
        { id: 'f-about', label: 'About MatricsMania', url: '/about/' },
        { id: 'f-contact', label: 'Contact & Verification', url: '/contact/' },
        { id: 'f-privacy', label: 'Privacy Policy', url: '/privacy/' },
        { id: 'f-terms', label: 'Terms of Service', url: '/terms/' },
      ],
    },
    legal: {
      id: 'footer-leg',
      title: 'Legal & Governance',
      items: [
        { id: 'f-privacy-leg', label: 'Privacy Policy', url: '/privacy/' },
        { id: 'f-terms-leg', label: 'Terms of Service', url: '/terms/' },
      ],
    },
  },
  ctaItem: {
    label: 'Schedule Diagnostic Session',
    action: 'openBooking',
  },
};

export const MOCK_CONTACT_INFO: ContactInformation = {
  companyName: 'MatricsMania',
  legalEntityName: 'MatricsMania Performance Systems Inc.',
  corporateEmail: 'growth@matricsmania.com',
  admissionsEmail: 'diagnostic@matricsmania.com',
  securityEmail: 'security@matricsmania.com',
  pressEmail: 'research@matricsmania.com',
  primaryPhone: '+1 (415) 555-0199',
  headquarters: {
    id: 'hq-sf',
    nodeCode: 'SFO-HQ',
    city: 'San Francisco',
    region: 'California',
    country: 'United States',
    role: 'Global Headquarters & Core Lab',
    address: {
      line1: '500 Howard Street, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States',
    },
    coordinates: {
      latitude: 37.7885,
      longitude: -122.3986,
    },
    phone: '+1 (415) 555-0199',
    email: 'sf@matricsmania.com',
    businessHours: '09:00 - 18:00 PST (Mon - Fri)',
    isHeadquarters: true,
  },
  regionalNodes: [],
  socials: {
    linkedin: 'https://linkedin.com/company/matricsmania',
    twitter: 'https://twitter.com/matricsmania',
    github: 'https://github.com/matricsmania',
  },
  globalCoverageSummary: 'Engineered for globally distributed 24/7 telemetry monitoring and high-velocity growth execution.',
  responseSLAHours: 4,
};

export const MOCK_AUTHORS: Author[] = [];
export const MOCK_SERVICES: Service[] = [];
export const MOCK_INDUSTRIES: Industry[] = [];
export const MOCK_LOCATIONS: Location[] = [];
export const MOCK_INSIGHTS: Insight[] = [];
export const MOCK_CASE_STUDIES: CaseStudy[] = [];
export const MOCK_PAGES: Record<string, Page> = {};
export const MOCK_FAQS: FAQ[] = [];
export const MOCK_TESTIMONIALS: Testimonial[] = [];
export const MOCK_WORK_PROJECTS: WorkProject[] = [];

export class MockDataProvider implements ContentProvider {
  getPageBySlug(slug: string): Page | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_PAGES[clean] || null;
  }

  getAllPages(): Page[] {
    return Object.values(MOCK_PAGES);
  }

  getServiceBySlug(slug: string): Service | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_SERVICES.find((s) => s.slug.toLowerCase() === clean) || null;
  }

  getAllServices(): Service[] {
    return MOCK_SERVICES;
  }

  getIndustryBySlug(slug: string): Industry | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_INDUSTRIES.find((i) => i.slug.toLowerCase() === clean) || null;
  }

  getAllIndustries(): Industry[] {
    return MOCK_INDUSTRIES;
  }

  getLocationBySlug(slug: string): Location | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_LOCATIONS.find((l) => l.slug.toLowerCase() === clean) || null;
  }

  getAllLocations(): Location[] {
    return MOCK_LOCATIONS;
  }

  getCaseStudyBySlug(slug: string): CaseStudy | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_CASE_STUDIES.find((c) => c.slug.toLowerCase() === clean) || null;
  }

  getAllCaseStudies(): CaseStudy[] {
    return MOCK_CASE_STUDIES;
  }

  getInsightBySlug(slug: string): Insight | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_INSIGHTS.find((ins) => ins.slug.toLowerCase() === clean) || null;
  }

  getAllInsights(): Insight[] {
    return MOCK_INSIGHTS;
  }

  getInsightsByCategory(categorySlug: string): Insight[] {
    const clean = (categorySlug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_INSIGHTS.filter((ins) => ins.categorySlug.toLowerCase() === clean);
  }

  getAuthorBySlug(slug: string): Author | null {
    const clean = (slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    return MOCK_AUTHORS.find((a) => a.slug.toLowerCase() === clean) || null;
  }

  getAllAuthors(): Author[] {
    return MOCK_AUTHORS;
  }

  getAllFaqs(category?: string): FAQ[] {
    if (!category) return MOCK_FAQS;
    return MOCK_FAQS.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }

  getAllFAQs(category?: string): FAQ[] {
    return this.getAllFaqs(category);
  }

  getAllTestimonials(): Testimonial[] {
    return MOCK_TESTIMONIALS;
  }

  getAllWorkProjects(): WorkProject[] {
    return MOCK_WORK_PROJECTS;
  }

  getNavigation(): Navigation {
    return MOCK_NAVIGATION;
  }

  getContactInfo(): ContactInformation {
    return MOCK_CONTACT_INFO;
  }

  getContactInformation(): ContactInformation {
    return MOCK_CONTACT_INFO;
  }

  searchContent(query: string) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      return {
        services: [],
        industries: [],
        insights: [],
        caseStudies: [],
      };
    }
    return {
      services: MOCK_SERVICES.filter((s) => s.title.toLowerCase().includes(q)),
      industries: MOCK_INDUSTRIES.filter((i) => i.title.toLowerCase().includes(q)),
      insights: MOCK_INSIGHTS.filter((ins) => ins.title.toLowerCase().includes(q)),
      caseStudies: MOCK_CASE_STUDIES.filter((c) => c.title.toLowerCase().includes(q)),
    };
  }
}

export const mockDataProvider = new MockDataProvider();
