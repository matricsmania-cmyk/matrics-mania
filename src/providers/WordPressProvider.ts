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
  private servicesCache: Service[] | null = null;
  private serviceMap: Map<string, Service> = new Map();
  private industriesCache: Industry[] | null = null;
  private industryMap: Map<string, Industry> = new Map();

  constructor(baseUrl?: string) {
    this.baseUrl = (
      baseUrl ||
      (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL) : '') ||
      'https://cms.matricsmania.com'
    ).replace(/\/$/, '');
    this.fallbackProvider = mockDataProvider;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public isConfigured(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.startsWith('http'));
  }

  public setServicesCache(services: Service[]): void {
    this.servicesCache = services;
    services.forEach((s) => this.serviceMap.set(s.slug, s));
  }

  public setIndustriesCache(industries: Industry[]): void {
    this.industriesCache = industries;
    industries.forEach((i) => this.industryMap.set(i.slug, i));
  }

  // --- PAGES ---
  getPageBySlug(slug: string): Page | null {
    return this.fallbackProvider.getPageBySlug(slug);
  }

  getAllPages(): Page[] {
    return this.fallbackProvider.getAllPages();
  }

  // --- SERVICES (Live WordPress Integration with Mock Fallback) ---
  getServiceBySlug(slug: string): Service | null {
    if (this.serviceMap.has(slug)) {
      return this.serviceMap.get(slug)!;
    }
    return this.fallbackProvider.getServiceBySlug(slug);
  }

  getAllServices(): Service[] {
    if (this.servicesCache && this.servicesCache.length > 0) {
      return this.servicesCache;
    }
    return this.fallbackProvider.getAllServices();
  }

  // --- INDUSTRIES (Live WordPress Integration with Mock Fallback) ---
  getIndustryBySlug(slug: string): Industry | null {
    if (this.industryMap.has(slug)) {
      return this.industryMap.get(slug)!;
    }
    return this.fallbackProvider.getIndustryBySlug(slug);
  }

  getAllIndustries(): Industry[] {
    if (this.industriesCache && this.industriesCache.length > 0) {
      return this.industriesCache;
    }
    return this.fallbackProvider.getAllIndustries();
  }

  // --- LOCATIONS (Deferred until Service E2E verified) ---
  getLocationBySlug(slug: string): Location | null {
    return this.fallbackProvider.getLocationBySlug(slug);
  }

  getAllLocations(): Location[] {
    return this.fallbackProvider.getAllLocations();
  }

  // --- CASE STUDIES (Deferred until Service E2E verified) ---
  getCaseStudyBySlug(slug: string): CaseStudy | null {
    return this.fallbackProvider.getCaseStudyBySlug(slug);
  }

  getAllCaseStudies(): CaseStudy[] {
    return this.fallbackProvider.getAllCaseStudies();
  }

  // --- INSIGHTS (Deferred until Service E2E verified) ---
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
    const q = query.toLowerCase();
    const activeServices = this.getAllServices().filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription?.toLowerCase().includes(q) ||
        s.serviceCode?.toLowerCase().includes(q)
    );
    const mockResults = this.fallbackProvider.searchContent(query);
    return {
      services: activeServices.length > 0 ? activeServices : mockResults.services,
      industries: mockResults.industries,
      insights: mockResults.insights,
      caseStudies: mockResults.caseStudies,
    };
  }

  /**
   * Async REST API hydration method for server-side pre-fetching or ISR
   */
  async fetchFromWordPress<T>(endpoint: string): Promise<T | null> {
    if (!this.isConfigured()) return null;
    try {
      const cleanEndpoint = endpoint.replace(/^\//, '');
      const res = await fetch(`${this.baseUrl}/wp-json/wp/v2/${cleanEndpoint}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }

  /**
   * Async Service retrieval from live WordPress REST API.
   * Endpoint: /wp/v2/services?slug=<slug>&_embed=true
   */
  async asyncGetServiceBySlug(slug: string): Promise<Service | null> {
    if (!slug) return null;

    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>(
          `services?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw[0]) {
          const service = normalizeWpService(raw[0]);
          this.serviceMap.set(service.slug, service);
          return service;
        }
      } catch {
        // Graceful fallback to mock data provider
      }
    }
    return this.getServiceBySlug(slug);
  }

  /**
   * Async retrieval of all services from live WordPress REST API.
   * Endpoint: /wp/v2/services?_embed=true&per_page=100
   */
  async asyncGetAllServices(): Promise<Service[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>('services?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const services = raw.map((post) => normalizeWpService(post));
          this.servicesCache = services;
          services.forEach((s) => this.serviceMap.set(s.slug, s));
          return services;
        }
      } catch {
        // Graceful fallback to mock data provider
      }
    }
    return this.getAllServices();
  }

  /**
   * Async Industry retrieval from live WordPress REST API.
   * Endpoint: /wp/v2/industries?slug=<slug>&_embed=true
   */
  async asyncGetIndustryBySlug(slug: string): Promise<Industry | null> {
    if (!slug) return null;

    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>(
          `industries?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw[0]) {
          const industry = normalizeWpIndustry(raw[0]);
          this.industryMap.set(industry.slug, industry);
          return industry;
        }
      } catch {
        // Graceful fallback to mock data provider
      }
    }
    return this.getIndustryBySlug(slug);
  }

  /**
   * Async retrieval of all industries from live WordPress REST API.
   * Endpoint: /wp/v2/industries?_embed=true&per_page=100
   */
  async asyncGetAllIndustries(): Promise<Industry[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>('industries?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const industries = raw.map((post) => normalizeWpIndustry(post));
          this.industriesCache = industries;
          industries.forEach((i) => this.industryMap.set(i.slug, i));
          return industries;
        }
      } catch {
        // Graceful fallback to mock data provider
      }
    }
    return this.getAllIndustries();
  }
}

export const wordPressProvider = new WordPressProvider();
