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
  normalizeWpPage,
  normalizeWpAuthor,
} from '../models/mappers/normalizers';
import {
  RawWpServicePost,
  RawWpIndustryPost,
  RawWpLocationPost,
  RawWpInsightPost,
  RawWpCaseStudyPost,
  RawWpBasePost,
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
 * - Case Study Model  <-> CPT: `case_studies` / `case-studies` <-> Endpoint: `/wp/v2/case_studies?_embed=true`
 * - Page Model        <-> CPT: `pages`         <-> Endpoint: `/wp/v2/pages?_embed=true`
 * 
 * Resilience Features:
 * 1. Automatic ByetHost/InfinityFree bot-protection challenge solver (__test cookie)
 * 2. Self-signed and incomplete TLS chain handling
 * 3. Resilient fallback to mockDataProvider if WordPress is unavailable
 * 4. Dual async (server/ISR) & synchronous cached access
 */

function sanitizeBaseUrl(raw?: string): string {
  if (!raw) return 'https://cms.matricsmania.com';
  let cleaned = raw.trim();
  // Strip any accidental assignment string e.g. "NEXT_PUBLIC_WORDPRESS_URL=https://..."
  if (cleaned.includes('=')) {
    cleaned = cleaned.split('=').pop()?.trim() || cleaned;
  }
  cleaned = cleaned.replace(/\/+$/, '');
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }
  return cleaned;
}

export class WordPressProvider implements ContentProvider {
  private baseUrl: string;
  private fallbackProvider: ContentProvider;
  private sessionCookie: string | null = null;
  private aesScriptCache: string | null = null;

  // Caches
  private servicesCache: Service[] | null = null;
  private serviceMap: Map<string, Service> = new Map();

  private industriesCache: Industry[] | null = null;
  private industryMap: Map<string, Industry> = new Map();

  private locationsCache: Location[] | null = null;
  private locationMap: Map<string, Location> = new Map();

  private caseStudiesCache: CaseStudy[] | null = null;
  private caseStudyMap: Map<string, CaseStudy> = new Map();

  private insightsCache: Insight[] | null = null;
  private insightMap: Map<string, Insight> = new Map();

  private pagesCache: Page[] | null = null;
  private pageMap: Map<string, Page> = new Map();

  // Serialization queue & handshake lock to protect free host from concurrent connection drop
  private requestQueue: Promise<unknown> = Promise.resolve();
  private handshakePromise: Promise<string | null> | null = null;

  constructor(baseUrl?: string) {
    // Disable TLS unauthorized error on Node.js server side if host certificate is missing intermediate chain
    if (typeof process !== 'undefined' && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const envUrl =
      typeof process !== 'undefined'
        ? process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL
        : undefined;

    this.baseUrl = sanitizeBaseUrl(baseUrl || envUrl);
    this.fallbackProvider = mockDataProvider;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public isConfigured(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.startsWith('http'));
  }

  // --- MANUAL CACHE INJECTION (For testing & SSR pre-warming) ---
  public setServicesCache(services: Service[]): void {
    this.servicesCache = services;
    this.serviceMap.clear();
    services.forEach((s) => this.serviceMap.set(s.slug, s));
  }

  public setIndustriesCache(industries: Industry[]): void {
    this.industriesCache = industries;
    this.industryMap.clear();
    industries.forEach((i) => this.industryMap.set(i.slug, i));
  }

  public setLocationsCache(locations: Location[]): void {
    this.locationsCache = locations;
    this.locationMap.clear();
    locations.forEach((l) => this.locationMap.set(l.slug, l));
  }

  public setCaseStudiesCache(caseStudies: CaseStudy[]): void {
    this.caseStudiesCache = caseStudies;
    this.caseStudyMap.clear();
    caseStudies.forEach((c) => this.caseStudyMap.set(c.slug, c));
  }

  public setInsightsCache(insights: Insight[]): void {
    this.insightsCache = insights;
    this.insightMap.clear();
    insights.forEach((ins) => this.insightMap.set(ins.slug, ins));
  }

  public getServicesCache(): Service[] | null {
    return this.servicesCache;
  }

  public getIndustriesCache(): Industry[] | null {
    return this.industriesCache;
  }

  public getLocationsCache(): Location[] | null {
    return this.locationsCache;
  }

  public getCaseStudiesCache(): CaseStudy[] | null {
    return this.caseStudiesCache;
  }

  public getInsightsCache(): Insight[] | null {
    return this.insightsCache;
  }

  /**
   * Clears all in-memory caches to allow instant real-time reflection of CMS changes
   */
  public clearCache(): void {
    this.servicesCache = null;
    this.serviceMap.clear();
    this.industriesCache = null;
    this.industryMap.clear();
    this.locationsCache = null;
    this.locationMap.clear();
    this.caseStudiesCache = null;
    this.caseStudyMap.clear();
    this.insightsCache = null;
    this.insightMap.clear();
    this.pagesCache = null;
    this.pageMap.clear();
  }

  /**
   * Refreshes all caches concurrently from live WordPress REST API
   */
  public async refreshAll(): Promise<{
    servicesCount: number;
    industriesCount: number;
    locationsCount: number;
    caseStudiesCount: number;
    insightsCount: number;
  }> {
    this.clearCache();
    const [services, industries, locations, caseStudies, insights] = await Promise.all([
      this.asyncGetAllServices(),
      this.asyncGetAllIndustries(),
      this.asyncGetAllLocations(),
      this.asyncGetAllCaseStudies(),
      this.asyncGetAllInsights(),
    ]);

    return {
      servicesCount: services.length,
      industriesCount: industries.length,
      locationsCount: locations.length,
      caseStudiesCount: caseStudies.length,
      insightsCount: insights.length,
    };
  }

  // --- PAGES ---
  getPageBySlug(slug: string): Page | null {
    if (this.pageMap.has(slug)) {
      return this.pageMap.get(slug)!;
    }
    return this.fallbackProvider.getPageBySlug(slug);
  }

  getAllPages(): Page[] {
    if (this.pagesCache && this.pagesCache.length > 0) {
      return this.pagesCache;
    }
    return this.fallbackProvider.getAllPages();
  }

  // --- SERVICES ---
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

  // --- INDUSTRIES ---
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

  // --- LOCATIONS ---
  getLocationBySlug(slug: string): Location | null {
    if (this.locationMap.has(slug)) {
      return this.locationMap.get(slug)!;
    }
    return this.fallbackProvider.getLocationBySlug(slug);
  }

  getAllLocations(): Location[] {
    if (this.locationsCache && this.locationsCache.length > 0) {
      return this.locationsCache;
    }
    return this.fallbackProvider.getAllLocations();
  }

  // --- CASE STUDIES ---
  getCaseStudyBySlug(slug: string): CaseStudy | null {
    if (this.caseStudyMap.has(slug)) {
      return this.caseStudyMap.get(slug)!;
    }
    return this.fallbackProvider.getCaseStudyBySlug(slug);
  }

  getAllCaseStudies(): CaseStudy[] {
    if (this.caseStudiesCache && this.caseStudiesCache.length > 0) {
      return this.caseStudiesCache;
    }
    return this.fallbackProvider.getAllCaseStudies();
  }

  // --- INSIGHTS ---
  getInsightBySlug(slug: string): Insight | null {
    if (this.insightMap.has(slug)) {
      return this.insightMap.get(slug)!;
    }
    return this.fallbackProvider.getInsightBySlug(slug);
  }

  getAllInsights(): Insight[] {
    if (this.insightsCache && this.insightsCache.length > 0) {
      return this.insightsCache;
    }
    return this.fallbackProvider.getAllInsights();
  }

  getInsightsByCategory(categorySlug: string): Insight[] {
    const all = this.getAllInsights();
    const filtered = all.filter((i) => i.categorySlug === categorySlug);
    if (filtered.length > 0) return filtered;
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
    const activeIndustries = this.getAllIndustries().filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.tagline?.toLowerCase().includes(q) ||
        i.industryCode?.toLowerCase().includes(q)
    );
    const activeCaseStudies = this.getAllCaseStudies().filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.clientName?.toLowerCase().includes(q) ||
        c.clientIndustry?.toLowerCase().includes(q)
    );
    const activeInsights = this.getAllInsights().filter(
      (ins) =>
        ins.title.toLowerCase().includes(q) ||
        ins.excerpt?.toLowerCase().includes(q) ||
        ins.category?.toLowerCase().includes(q)
    );

    const mockResults = this.fallbackProvider.searchContent(query);
    return {
      services: activeServices.length > 0 ? activeServices : mockResults.services,
      industries: activeIndustries.length > 0 ? activeIndustries : mockResults.industries,
      insights: activeInsights.length > 0 ? activeInsights : mockResults.insights,
      caseStudies: activeCaseStudies.length > 0 ? activeCaseStudies : mockResults.caseStudies,
    };
  }

  /**
   * Helper to load aes.js encryption solver if challenge is encountered
   */
  private async getAesScript(): Promise<string> {
    if (this.aesScriptCache) return this.aesScriptCache;
    try {
      const userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      const res = await fetch(`${this.baseUrl}/aes.js`, {
        headers: { 'User-Agent': userAgent },
      });
      if (res.ok) {
        this.aesScriptCache = await res.text();
        return this.aesScriptCache;
      }
    } catch {
      // ignore
    }
    return '';
  }

  /**
   * Proactively solves ByetHost anti-bot challenge once so subsequent requests have a valid session cookie.
   */
  private async ensureSession(): Promise<string | null> {
    if (this.sessionCookie) return this.sessionCookie;
    if (this.handshakePromise) return this.handshakePromise;

    this.handshakePromise = (async () => {
      try {
        await this.performFetchInternal('services?per_page=1');
        return this.sessionCookie;
      } catch {
        return null;
      } finally {
        this.handshakePromise = null;
      }
    })();

    return this.handshakePromise;
  }

  /**
   * Internal HTTP fetcher that solves ByetHost / InfinityFree JavaScript challenges in a VM context.
   */
  private async performFetchInternal<T>(endpoint: string): Promise<T | null> {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const cleanEndpoint = endpoint.replace(/^\//, '');
    let targetUrl = `${this.baseUrl}/wp-json/wp/v2/${cleanEndpoint}`;

    for (let attempt = 0; attempt < 3; attempt++) {
      const headers: Record<string, string> = {
        'User-Agent': userAgent,
        'Accept': 'application/json, text/html, */*',
      };
      if (this.sessionCookie) {
        headers['Cookie'] = this.sessionCookie;
      }

      try {
        const res = await fetch(targetUrl, {
          headers,
          cache: 'no-store',
        });

        const text = await res.text();

        // 1. Direct JSON response
        if (text.startsWith('[') || text.startsWith('{')) {
          try {
            const parsed = JSON.parse(text);
            // Ignore WordPress REST API error objects (e.g. 404 rest_no_route)
            if (
              parsed &&
              typeof parsed === 'object' &&
              !Array.isArray(parsed) &&
              'code' in parsed &&
              typeof (parsed as any).code === 'string'
            ) {
              return null;
            }
            return parsed as T;
          } catch {
            // continue checking
          }
        }

        // 2. ByetHost / InfinityFree JavaScript anti-bot challenge page detection
        if (text.includes('slowAES') || text.includes('/aes.js')) {
          const aesCode = await this.getAesScript();
          const scriptMatch = text.match(/<script>([\s\S]*?)<\/script>/);

          if (aesCode && scriptMatch && typeof window === 'undefined') {
            try {
              // Execute in Node.js safe VM context to extract __test cookie
              const vm = await import('vm');
              let cookieVal = '';
              let redirectHref = '';

              const sandbox = {
                document: {
                  set cookie(val: string) {
                    const m = val.match(/__test=([^;]+)/);
                    if (m) cookieVal = `__test=${m[1]}`;
                  },
                },
                location: {
                  set href(val: string) {
                    redirectHref = val;
                  },
                },
              };

              const context = vm.createContext(sandbox);
              vm.runInContext(aesCode, context);
              vm.runInContext(scriptMatch[1], context);

              if (cookieVal) {
                this.sessionCookie = cookieVal;
                if (redirectHref) {
                  targetUrl = redirectHref;
                }
                continue; // Retry with decrypted session cookie
              }
            } catch {
              // Handshake failed, break to return null
              break;
            }
          }
        }
      } catch {
        // Fetch failed on this attempt
      }
    }

    return null;
  }

  /**
   * Core resilient HTTP fetcher for WordPress REST API.
   * Queues requests sequentially to prevent free-host TCP drops and solve challenges reliably.
   */
  async fetchFromWordPress<T>(endpoint: string): Promise<T | null> {
    if (!this.isConfigured()) return null;

    if (!this.sessionCookie && typeof window === 'undefined') {
      await this.ensureSession();
    }

    const execute = new Promise<T | null>((resolve) => {
      this.requestQueue = this.requestQueue.then(async () => {
        try {
          const res = await this.performFetchInternal<T>(endpoint);
          resolve(res);
        } catch {
          resolve(null);
        }
      });
    });

    return execute;
  }

  // --- ASYNC SERVICES ---
  async asyncGetServiceBySlug(slug: string): Promise<Service | null> {
    if (!slug) return null;
    if (this.serviceMap.has(slug)) {
      return this.serviceMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>(
          `services?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const service = normalizeWpService(raw[0]);
          this.serviceMap.set(service.slug, service);
          return service;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getServiceBySlug(slug);
  }

  async asyncGetAllServices(): Promise<Service[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>('services?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const services = raw.map((post) => normalizeWpService(post));
          this.servicesCache = services;
          this.serviceMap.clear();
          services.forEach((s) => this.serviceMap.set(s.slug, s));
          return services;
        }
      } catch {
        // Graceful fallback
      }
      if (this.servicesCache && this.servicesCache.length > 0) {
        return this.servicesCache;
      }
      return this.fallbackProvider.getAllServices();
    }
    return this.getAllServices();
  }

  // --- ASYNC INDUSTRIES ---
  async asyncGetIndustryBySlug(slug: string): Promise<Industry | null> {
    if (!slug) return null;
    if (this.industryMap.has(slug)) {
      return this.industryMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>(
          `industries?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const industry = normalizeWpIndustry(raw[0]);
          this.industryMap.set(industry.slug, industry);
          return industry;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getIndustryBySlug(slug);
  }

  async asyncGetAllIndustries(): Promise<Industry[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>('industries?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const industries = raw.map((post) => normalizeWpIndustry(post));
          this.industriesCache = industries;
          this.industryMap.clear();
          industries.forEach((i) => this.industryMap.set(i.slug, i));
          return industries;
        }
      } catch {
        // Graceful fallback
      }
      if (this.industriesCache && this.industriesCache.length > 0) {
        return this.industriesCache;
      }
      return this.fallbackProvider.getAllIndustries();
    }
    return this.getAllIndustries();
  }

  // --- ASYNC LOCATIONS ---
  async asyncGetLocationBySlug(slug: string): Promise<Location | null> {
    if (!slug) return null;
    if (this.locationMap.has(slug)) {
      return this.locationMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpLocationPost[]>(
          `locations?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const location = normalizeWpLocation(raw[0]);
          this.locationMap.set(location.slug, location);
          return location;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getLocationBySlug(slug);
  }

  async asyncGetAllLocations(): Promise<Location[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpLocationPost[]>('locations?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const locations = raw.map((post) => normalizeWpLocation(post));
          this.locationsCache = locations;
          this.locationMap.clear();
          locations.forEach((l) => this.locationMap.set(l.slug, l));
          return locations;
        }
      } catch {
        // Graceful fallback
      }
      if (this.locationsCache && this.locationsCache.length > 0) {
        return this.locationsCache;
      }
      return this.fallbackProvider.getAllLocations();
    }
    return this.getAllLocations();
  }

  // --- ASYNC CASE STUDIES ---
  async asyncGetCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    if (!slug) return null;
    if (this.caseStudyMap.has(slug)) {
      return this.caseStudyMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        let raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(
          `case_studies?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (!raw || !Array.isArray(raw)) {
          raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(
            `case-studies?slug=${encodeURIComponent(slug)}&_embed=true`
          );
        }
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const caseStudy = normalizeWpCaseStudy(raw[0]);
          this.caseStudyMap.set(caseStudy.slug, caseStudy);
          return caseStudy;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getCaseStudyBySlug(slug);
  }

  async asyncGetAllCaseStudies(): Promise<CaseStudy[]> {
    if (this.isConfigured()) {
      try {
        let raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>('case_studies?_embed=true&per_page=100');
        if (!raw || !Array.isArray(raw)) {
          raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>('case-studies?_embed=true&per_page=100');
        }
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const caseStudies = raw.map((post) => normalizeWpCaseStudy(post));
          this.caseStudiesCache = caseStudies;
          this.caseStudyMap.clear();
          caseStudies.forEach((c) => this.caseStudyMap.set(c.slug, c));
          return caseStudies;
        }
      } catch {
        // Graceful fallback
      }
      if (this.caseStudiesCache && this.caseStudiesCache.length > 0) {
        return this.caseStudiesCache;
      }
      return this.fallbackProvider.getAllCaseStudies();
    }
    return this.getAllCaseStudies();
  }

  // --- ASYNC INSIGHTS ---
  async asyncGetInsightBySlug(slug: string): Promise<Insight | null> {
    if (!slug) return null;
    if (this.insightMap.has(slug)) {
      return this.insightMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        let raw = await this.fetchFromWordPress<RawWpInsightPost[]>(
          `posts?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
          const customInsights = await this.fetchFromWordPress<RawWpInsightPost[]>(
            `insights?slug=${encodeURIComponent(slug)}&_embed=true`
          );
          if (customInsights && Array.isArray(customInsights) && customInsights.length > 0) {
            raw = customInsights;
          }
        }
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const insight = normalizeWpInsight(raw[0]);
          this.insightMap.set(insight.slug, insight);
          return insight;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getInsightBySlug(slug);
  }

  async asyncGetAllInsights(): Promise<Insight[]> {
    if (this.isConfigured()) {
      try {
        let raw = await this.fetchFromWordPress<RawWpInsightPost[]>('posts?_embed=true&per_page=100');
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
          const customInsights = await this.fetchFromWordPress<RawWpInsightPost[]>('insights?_embed=true&per_page=100');
          if (customInsights && Array.isArray(customInsights) && customInsights.length > 0) {
            raw = customInsights;
          }
        }
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const insights = raw.map((post) => normalizeWpInsight(post));
          this.insightsCache = insights;
          this.insightMap.clear();
          insights.forEach((ins) => this.insightMap.set(ins.slug, ins));
          return insights;
        }
      } catch {
        // Graceful fallback
      }
      if (this.insightsCache && this.insightsCache.length > 0) {
        return this.insightsCache;
      }
      return this.fallbackProvider.getAllInsights();
    }
    return this.getAllInsights();
  }

  // --- ASYNC PAGES ---
  async asyncGetPageBySlug(slug: string): Promise<Page | null> {
    if (!slug) return null;
    if (this.pageMap.has(slug)) {
      return this.pageMap.get(slug)!;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpBasePost[]>(
          `pages?slug=${encodeURIComponent(slug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const page = normalizeWpPage(raw[0]);
          this.pageMap.set(page.slug, page);
          return page;
        }
      } catch {
        // Graceful fallback
      }
    }
    return this.getPageBySlug(slug);
  }

  async asyncGetAllPages(): Promise<Page[]> {
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpBasePost[]>('pages?_embed=true&per_page=100');
        if (raw && Array.isArray(raw) && raw.length > 0) {
          const pages = raw.map((post) => normalizeWpPage(post));
          this.pagesCache = pages;
          this.pageMap.clear();
          pages.forEach((p) => this.pageMap.set(p.slug, p));
          return pages;
        }
      } catch {
        // Graceful fallback
      }
      if (this.pagesCache && this.pagesCache.length > 0) {
        return this.pagesCache;
      }
      return this.fallbackProvider.getAllPages();
    }
    return this.getAllPages();
  }
}

export const wordPressProvider = new WordPressProvider();
