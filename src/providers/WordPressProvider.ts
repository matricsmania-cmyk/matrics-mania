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
import {
  normalizeWpService,
  normalizeWpIndustry,
  normalizeWpLocation,
  normalizeWpInsight,
  normalizeWpCaseStudy,
  normalizeWpAuthor,
} from '../models/mappers/normalizers';
import {
  RawWpServicePost,
  RawWpIndustryPost,
  RawWpLocationPost,
  RawWpInsightPost,
  RawWpCaseStudyPost,
  RawWpEmbeddedAuthor,
} from '../models/mappers/rawWpTypes';
import { ContentProvider } from './ContentProvider';
import { mockDataProvider } from './MockDataProvider';

/**
 * ============================================================================
 * MATRICS MANIA HEADLESS WORDPRESS PROVIDER
 * ============================================================================
 * 
 * Maps WordPress REST API CPTs & ACF field payloads to clean domain models.
 * 
 * Mapping Reference:
 * - Service Model     <-> CPT: `services`      <-> Endpoint: `/wp/v2/services?_embed=true`
 * - Industry Model    <-> CPT: `industries`    <-> Endpoint: `/wp/v2/industries?_embed=true`
 * - Location Model    <-> CPT: `locations`     <-> Endpoint: `/wp/v2/locations?_embed=true`
 * - Insight Model     <-> CPT: `posts`/`insights`<-> Endpoint: `/wp/v2/posts?_embed=true`
 * - Case Study Model  <-> CPT: `case-studies`  <-> Endpoint: `/wp/v2/case-studies?_embed=true`
 * - Page Model        <-> CPT: `pages`         <-> Endpoint: `/wp/v2/pages?_embed=true`
 * - Author Model      <-> WP Users             <-> Endpoint: `/wp/v2/users`
 * 
 * Clean Decoupled Boundary:
 * UI templates consume `ContentProvider` contracts. Component trees never fetch
 * raw WordPress JSON directly.
 */

export class WordPressProvider implements ContentProvider {
  private baseUrl: string;
  private fallbackProvider: ContentProvider;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || '').replace(/\/$/, '');
    this.fallbackProvider = mockDataProvider;
  }

  private isConfigured(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.startsWith('http'));
  }

  // --- PAGES ---
  getPageBySlug(slug: string): Page | null {
    return this.fallbackProvider.getPageBySlug(slug);
  }

  getAllPages(): Page[] {
    return this.fallbackProvider.getAllPages();
  }

  // --- SERVICES ---
  getServiceBySlug(slug: string): Service | null {
    return this.fallbackProvider.getServiceBySlug(slug);
  }

  getAllServices(): Service[] {
    return this.fallbackProvider.getAllServices();
  }

  // --- INDUSTRIES ---
  getIndustryBySlug(slug: string): Industry | null {
    return this.fallbackProvider.getIndustryBySlug(slug);
  }

  getAllIndustries(): Industry[] {
    return this.fallbackProvider.getAllIndustries();
  }

  // --- LOCATIONS ---
  getLocationBySlug(slug: string): Location | null {
    return this.fallbackProvider.getLocationBySlug(slug);
  }

  getAllLocations(): Location[] {
    return this.fallbackProvider.getAllLocations();
  }

  // --- CASE STUDIES ---
  getCaseStudyBySlug(slug: string): CaseStudy | null {
    return this.fallbackProvider.getCaseStudyBySlug(slug);
  }

  getAllCaseStudies(): CaseStudy[] {
    return this.fallbackProvider.getAllCaseStudies();
  }

  // --- INSIGHTS ---
  getInsightBySlug(slug: string): Insight | null {
    return this.fallbackProvider.getInsightBySlug(slug);
  }

  getAllInsights(): Insight[] {
    return this.fallbackProvider.getAllInsights();
  }

  getInsightsByCategory(categorySlug: string): Insight[] {
    return this.fallbackProvider.getInsightsByCategory(categorySlug);
  }

  // --- AUTHORS ---
  getAuthorBySlug(slug: string): Author | null {
    return this.fallbackProvider.getAuthorBySlug(slug);
  }

  getAllAuthors(): Author[] {
    return this.fallbackProvider.getAllAuthors();
  }

  // --- PRIMITIVES & SUPPORTING ENTITIES ---
  getAllFaqs(category?: string): FAQ[] {
    return this.fallbackProvider.getAllFaqs(category);
  }

  getAllFAQs(category?: string): FAQ[] {
    return this.fallbackProvider.getAllFAQs(category);
  }

  getAllTestimonials(): Testimonial[] {
    return this.fallbackProvider.getAllTestimonials();
  }

  getAllWorkProjects(): WorkProject[] {
    return this.fallbackProvider.getAllWorkProjects();
  }

  getNavigation(): Navigation {
    return this.fallbackProvider.getNavigation();
  }

  getContactInfo(): ContactInformation {
    return this.fallbackProvider.getContactInfo();
  }

  getContactInformation(): ContactInformation {
    return this.fallbackProvider.getContactInformation();
  }

  // --- SEARCH ---
  searchContent(query: string) {
    return this.fallbackProvider.searchContent(query);
  }

  /**
   * Async REST API hydration method for server-side pre-fetching or ISR
   */
  async fetchFromWordPress<T>(endpoint: string): Promise<T | null> {
    if (!this.isConfigured()) return null;
    try {
      const res = await fetch(`${this.baseUrl}/wp-json/wp/v2/${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }

  async asyncGetServiceBySlug(slug: string): Promise<Service | null> {
    const raw = await this.fetchFromWordPress<RawWpServicePost[]>(`services?slug=${encodeURIComponent(slug)}&_embed=true`);
    if (raw && raw[0]) {
      return normalizeWpService(raw[0]);
    }
    return this.getServiceBySlug(slug);
  }

  async asyncGetIndustryBySlug(slug: string): Promise<Industry | null> {
    const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>(`industries?slug=${encodeURIComponent(slug)}&_embed=true`);
    if (raw && raw[0]) {
      return normalizeWpIndustry(raw[0]);
    }
    return this.getIndustryBySlug(slug);
  }

  async asyncGetLocationBySlug(slug: string): Promise<Location | null> {
    const raw = await this.fetchFromWordPress<RawWpLocationPost[]>(`locations?slug=${encodeURIComponent(slug)}&_embed=true`);
    if (raw && raw[0]) {
      return normalizeWpLocation(raw[0]);
    }
    return this.getLocationBySlug(slug);
  }

  async asyncGetInsightBySlug(slug: string): Promise<Insight | null> {
    const raw = await this.fetchFromWordPress<RawWpInsightPost[]>(`posts?slug=${encodeURIComponent(slug)}&_embed=true`);
    if (raw && raw[0]) {
      return normalizeWpInsight(raw[0]);
    }
    return this.getInsightBySlug(slug);
  }

  async asyncGetCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    const raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(`case-studies?slug=${encodeURIComponent(slug)}&_embed=true`);
    if (raw && raw[0]) {
      return normalizeWpCaseStudy(raw[0]);
    }
    return this.getCaseStudyBySlug(slug);
  }
}

export const wordPressProvider = new WordPressProvider();
