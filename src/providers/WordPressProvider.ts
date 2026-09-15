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

function sanitizeBaseUrl(raw?: string | { endpoint?: string; baseUrl?: string; url?: string }): string {
  if (!raw) return '';
  let str = '';
  if (typeof raw === 'object') {
    str = raw.endpoint || raw.baseUrl || raw.url || '';
  } else {
    str = String(raw);
  }
  let cleaned = str.trim();
  if (cleaned === '' || cleaned === 'offline' || cleaned === 'disabled') return '';
  // Strip any accidental assignment string e.g. "NEXT_PUBLIC_WORDPRESS_URL=https://..."
  if (cleaned.includes('=')) {
    cleaned = cleaned.split('=').pop()?.trim() || cleaned;
  }
  // Strip /wp-json/wp/v2 suffix if user provided full API route rather than base domain
  cleaned = cleaned.replace(/\/wp-json\/wp\/v2\/?$/i, '');
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
  private workingCaseStudyEndpoint: string | null = null;

  // In-flight request deduplication
  private inFlightRequests: Map<string, Promise<any>> = new Map();

  // Cache TTL: 300 seconds (5 minutes) safety net
  private readonly CACHE_TTL_MS = 300 * 1000;
  private cacheExpiry: { [key: string]: number } = {};

  // In-memory Caches
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

  constructor(baseUrlOrConfig?: string | { endpoint?: string; baseUrl?: string; url?: string; timeoutMs?: number }) {
    // Disable TLS unauthorized error on Node.js server side if host certificate is missing intermediate chain
    if (typeof process !== 'undefined' && process.env) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const envUrl =
      typeof process !== 'undefined'
        ? process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || 'https://cms.matricsmania.com'
        : 'https://cms.matricsmania.com';

    this.baseUrl = sanitizeBaseUrl(baseUrlOrConfig !== undefined ? baseUrlOrConfig : envUrl);
    this.fallbackProvider = mockDataProvider;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public isConfigured(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.startsWith('http'));
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry[key];
    return typeof expiry === 'number' && Date.now() < expiry;
  }

  // --- MANUAL CACHE INJECTION (For testing & SSR pre-warming) ---
  public setServicesCache(services: Service[]): void {
    this.servicesCache = services;
    this.cacheExpiry['services'] = Date.now() + this.CACHE_TTL_MS;
    this.serviceMap.clear();
    services.forEach((s) => {
      this.serviceMap.set(s.slug, s);
      this.cacheExpiry[`service:${s.slug}`] = Date.now() + this.CACHE_TTL_MS;
    });
  }

  public setIndustriesCache(industries: Industry[]): void {
    this.industriesCache = industries;
    this.cacheExpiry['industries'] = Date.now() + this.CACHE_TTL_MS;
    this.industryMap.clear();
    industries.forEach((i) => {
      this.industryMap.set(i.slug, i);
      this.cacheExpiry[`industry:${i.slug}`] = Date.now() + this.CACHE_TTL_MS;
    });
  }

  public setLocationsCache(locations: Location[]): void {
    this.locationsCache = locations;
    this.cacheExpiry['locations'] = Date.now() + this.CACHE_TTL_MS;
    this.locationMap.clear();
    locations.forEach((l) => {
      this.locationMap.set(l.slug, l);
      this.cacheExpiry[`location:${l.slug}`] = Date.now() + this.CACHE_TTL_MS;
    });
  }

  public setCaseStudiesCache(caseStudies: CaseStudy[]): void {
    this.caseStudiesCache = caseStudies;
    this.cacheExpiry['case_studies'] = Date.now() + this.CACHE_TTL_MS;
    this.caseStudyMap.clear();
    caseStudies.forEach((c) => {
      this.caseStudyMap.set(c.slug, c);
      this.cacheExpiry[`case_study:${c.slug}`] = Date.now() + this.CACHE_TTL_MS;
    });
  }

  public setInsightsCache(insights: Insight[]): void {
    this.insightsCache = insights;
    this.cacheExpiry['insights'] = Date.now() + this.CACHE_TTL_MS;
    this.insightMap.clear();
    insights.forEach((ins) => {
      this.insightMap.set(ins.slug, ins);
      this.cacheExpiry[`insight:${ins.slug}`] = Date.now() + this.CACHE_TTL_MS;
    });
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
   * Granularly invalidates a specific entity or content type
   */
  public invalidateEntity(postType: string, slug?: string): void {
    const cleanType = (postType || '').toLowerCase();
    const cleanSlug = slug ? slug.toLowerCase().trim() : undefined;

    if (cleanType.includes('service')) {
      this.servicesCache = null;
      delete this.cacheExpiry['services'];
      if (cleanSlug) {
        this.serviceMap.delete(cleanSlug);
        delete this.cacheExpiry[`service:${cleanSlug}`];
      } else {
        this.serviceMap.clear();
      }
    } else if (cleanType.includes('industr')) {
      this.industriesCache = null;
      delete this.cacheExpiry['industries'];
      if (cleanSlug) {
        this.industryMap.delete(cleanSlug);
        delete this.cacheExpiry[`industry:${cleanSlug}`];
      } else {
        this.industryMap.clear();
      }
    } else if (cleanType.includes('location')) {
      this.locationsCache = null;
      delete this.cacheExpiry['locations'];
      if (cleanSlug) {
        this.locationMap.delete(cleanSlug);
        delete this.cacheExpiry[`location:${cleanSlug}`];
      } else {
        this.locationMap.clear();
      }
    } else if (cleanType.includes('case') || cleanType.includes('stud')) {
      this.caseStudiesCache = null;
      delete this.cacheExpiry['case_studies'];
      if (cleanSlug) {
        this.caseStudyMap.delete(cleanSlug);
        delete this.cacheExpiry[`case_study:${cleanSlug}`];
      } else {
        this.caseStudyMap.clear();
      }
    } else if (cleanType.includes('post') || cleanType.includes('insight')) {
      this.insightsCache = null;
      delete this.cacheExpiry['insights'];
      if (cleanSlug) {
        this.insightMap.delete(cleanSlug);
        delete this.cacheExpiry[`insight:${cleanSlug}`];
      } else {
        this.insightMap.clear();
      }
    } else if (cleanType.includes('page')) {
      this.pagesCache = null;
      delete this.cacheExpiry['pages'];
      if (cleanSlug) {
        this.pageMap.delete(cleanSlug);
        delete this.cacheExpiry[`page:${cleanSlug}`];
      } else {
        this.pageMap.clear();
      }
    } else {
      this.clearCache();
    }
  }

  /**
   * Clears all in-memory caches to allow instant reflection of CMS changes via webhook
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
    this.cacheExpiry = {};
    this.inFlightRequests.clear();
  }

  /**
   * Refreshes all caches sequentially with controlled pacing to prevent InfinityFree concurrency spikes
   */
  public async refreshAll(): Promise<{
    servicesCount: number;
    industriesCount: number;
    locationsCount: number;
    caseStudiesCount: number;
    insightsCount: number;
  }> {
    this.clearCache();
    // Run sequentially to never trigger Entry Process limit on free hosting
    const services = await this.asyncGetAllServices();
    const industries = await this.asyncGetAllIndustries();
    const locations = await this.asyncGetAllLocations();
    const caseStudies = await this.asyncGetAllCaseStudies();
    const insights = await this.asyncGetAllInsights();

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
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getPageBySlug(slug);
  }

  getAllPages(): Page[] {
    if (this.pagesCache !== null) {
      return this.pagesCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllPages();
  }

  // --- SERVICES ---
  getServiceBySlug(slug: string): Service | null {
    if (this.serviceMap.has(slug)) {
      return this.serviceMap.get(slug)!;
    }
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getServiceBySlug(slug);
  }

  getAllServices(): Service[] {
    if (this.servicesCache !== null) {
      return this.servicesCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllServices();
  }

  // --- INDUSTRIES ---
  getIndustryBySlug(slug: string): Industry | null {
    if (this.industryMap.has(slug)) {
      return this.industryMap.get(slug)!;
    }
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getIndustryBySlug(slug);
  }

  getAllIndustries(): Industry[] {
    if (this.industriesCache !== null) {
      return this.industriesCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllIndustries();
  }

  // --- LOCATIONS ---
  getLocationBySlug(slug: string): Location | null {
    if (this.locationMap.has(slug)) {
      return this.locationMap.get(slug)!;
    }
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getLocationBySlug(slug);
  }

  getAllLocations(): Location[] {
    if (this.locationsCache !== null) {
      return this.locationsCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllLocations();
  }

  // --- CASE STUDIES ---
  getCaseStudyBySlug(slug: string): CaseStudy | null {
    if (this.caseStudyMap.has(slug)) {
      return this.caseStudyMap.get(slug)!;
    }
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getCaseStudyBySlug(slug);
  }

  getAllCaseStudies(): CaseStudy[] {
    if (this.caseStudiesCache !== null) {
      return this.caseStudiesCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllCaseStudies();
  }

  // --- INSIGHTS ---
  getInsightBySlug(slug: string): Insight | null {
    if (this.insightMap.has(slug)) {
      return this.insightMap.get(slug)!;
    }
    if (this.isConfigured()) {
      return null;
    }
    return this.fallbackProvider.getInsightBySlug(slug);
  }

  getAllInsights(): Insight[] {
    if (this.insightsCache !== null) {
      return this.insightsCache;
    }
    if (this.isConfigured()) {
      return [];
    }
    return this.fallbackProvider.getAllInsights();
  }

  getInsightsByCategory(categorySlug: string): Insight[] {
    const all = this.getAllInsights();
    const filtered = all.filter((i) => i.categorySlug === categorySlug);
    if (filtered.length > 0) return filtered;
    if (this.isConfigured()) return [];
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

    if (this.isConfigured()) {
      return {
        services: activeServices,
        industries: activeIndustries,
        insights: activeInsights,
        caseStudies: activeCaseStudies,
      };
    }

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
        next: { revalidate: 86400, tags: ['wordpress', 'wp-aes'] },
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
   * Core resilient HTTP fetcher for WordPress REST API with in-flight deduplication
   * and Next.js ISR fetch caching.
   */
  async fetchFromWordPress<T>(endpoint: string): Promise<T | null> {
    if (!this.isConfigured()) return null;

    const cleanEndpoint = endpoint.replace(/^\//, '');
    const targetUrl = `${this.baseUrl}/wp-json/wp/v2/${cleanEndpoint}`;

    // 1. In-flight request deduplication: if identical URL is already being requested, return the same promise
    if (this.inFlightRequests.has(targetUrl)) {
      return this.inFlightRequests.get(targetUrl) as Promise<T | null>;
    }

    const fetchPromise = this.performFetchWithRetry<T>(targetUrl, cleanEndpoint);
    this.inFlightRequests.set(targetUrl, fetchPromise);

    try {
      return await fetchPromise;
    } finally {
      this.inFlightRequests.delete(targetUrl);
    }
  }

  private async performFetchWithRetry<T>(targetUrl: string, cleanEndpoint: string): Promise<T | null> {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    let currentUrl = targetUrl;
    const baseEndpoint = cleanEndpoint.split('?')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    const tags: string[] = ['wordpress', `wp-${baseEndpoint}`];

    // Granular entity tag extraction
    const slugMatch = cleanEndpoint.match(/slug=([^&]+)/);
    if (slugMatch && slugMatch[1]) {
      const slugVal = decodeURIComponent(slugMatch[1]).toLowerCase();
      tags.push(`wp-${baseEndpoint}:${slugVal}`);
    }

    for (let attempt = 0; attempt < 2; attempt++) {
      const headers: Record<string, string> = {
        'User-Agent': userAgent,
        'Accept': 'application/json, text/html, */*',
      };
      if (this.sessionCookie) {
        headers['Cookie'] = this.sessionCookie;
      }

      try {
        const fetchOptions: RequestInit = {
          headers,
          signal: AbortSignal.timeout(10000), // 10-second timeout to prevent hung PHP workers
        };

        // On server-side Next.js, leverage Next.js Data Cache (ISR) with 300-second safety net
        if (typeof window === 'undefined') {
          (fetchOptions as any).next = {
            revalidate: 300, // 300-second (5 minute) safety net
            tags,
          };
        }

        const res = await fetch(currentUrl, fetchOptions);
        const text = await res.text();

        // 1. Direct JSON response
        if (text.startsWith('[') || text.startsWith('{')) {
          try {
            return JSON.parse(text) as T;
          } catch {
            // continue
          }
        }

        // 2. ByetHost / InfinityFree JavaScript anti-bot challenge page detection
        if (text.includes('slowAES') || text.includes('/aes.js')) {
          const aesCode = await this.getAesScript();
          const scriptMatch = text.match(/<script>([\s\S]*?)<\/script>/);

          if (aesCode && scriptMatch && typeof window === 'undefined') {
            try {
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
                  currentUrl = redirectHref;
                }
                continue; // Retry with decrypted session cookie
              }
            } catch {
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

  // --- ASYNC SERVICES ---
  async asyncGetServiceBySlug(slug: string): Promise<Service | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    // 1. Check direct map with TTL validity
    if (this.serviceMap.has(cleanSlug) && this.isCacheValid(`service:${cleanSlug}`)) {
      return this.serviceMap.get(cleanSlug)!;
    }
    // 2. Check collection cache with TTL validity
    if (this.servicesCache && this.servicesCache.length > 0 && this.isCacheValid('services')) {
      const found = this.servicesCache.find((s) => s.slug === cleanSlug);
      if (found) {
        this.serviceMap.set(cleanSlug, found);
        this.cacheExpiry[`service:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    // 3. Query remote API with deduplication
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>(
          `services?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const service = normalizeWpService(raw[0]);
          this.serviceMap.set(service.slug, service);
          this.cacheExpiry[`service:${service.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return service;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getServiceBySlug(cleanSlug);
  }

  async asyncGetAllServices(): Promise<Service[]> {
    if (this.servicesCache !== null && this.isCacheValid('services')) {
      return this.servicesCache;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpServicePost[]>('services?_embed=true&per_page=100');
        if (raw && Array.isArray(raw)) {
          const services = raw.map((post) => normalizeWpService(post));
          this.servicesCache = services;
          this.cacheExpiry['services'] = Date.now() + this.CACHE_TTL_MS;
          services.forEach((s) => {
            this.serviceMap.set(s.slug, s);
            this.cacheExpiry[`service:${s.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return services;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.servicesCache || [];
    }
    return this.getAllServices();
  }

  // --- ASYNC INDUSTRIES ---
  async asyncGetIndustryBySlug(slug: string): Promise<Industry | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (this.industryMap.has(cleanSlug) && this.isCacheValid(`industry:${cleanSlug}`)) {
      return this.industryMap.get(cleanSlug)!;
    }
    if (this.industriesCache && this.industriesCache.length > 0 && this.isCacheValid('industries')) {
      const found = this.industriesCache.find((i) => i.slug === cleanSlug);
      if (found) {
        this.industryMap.set(cleanSlug, found);
        this.cacheExpiry[`industry:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>(
          `industries?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const industry = normalizeWpIndustry(raw[0]);
          this.industryMap.set(industry.slug, industry);
          this.cacheExpiry[`industry:${industry.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return industry;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getIndustryBySlug(cleanSlug);
  }

  async asyncGetAllIndustries(): Promise<Industry[]> {
    if (this.industriesCache !== null && this.isCacheValid('industries')) {
      return this.industriesCache;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpIndustryPost[]>('industries?_embed=true&per_page=100');
        if (raw && Array.isArray(raw)) {
          const industries = raw.map((post) => normalizeWpIndustry(post));
          this.industriesCache = industries;
          this.cacheExpiry['industries'] = Date.now() + this.CACHE_TTL_MS;
          industries.forEach((i) => {
            this.industryMap.set(i.slug, i);
            this.cacheExpiry[`industry:${i.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return industries;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.industriesCache || [];
    }
    return this.getAllIndustries();
  }

  // --- ASYNC LOCATIONS ---
  async asyncGetLocationBySlug(slug: string): Promise<Location | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (this.locationMap.has(cleanSlug) && this.isCacheValid(`location:${cleanSlug}`)) {
      return this.locationMap.get(cleanSlug)!;
    }
    if (this.locationsCache && this.locationsCache.length > 0 && this.isCacheValid('locations')) {
      const found = this.locationsCache.find((l) => l.slug === cleanSlug);
      if (found) {
        this.locationMap.set(cleanSlug, found);
        this.cacheExpiry[`location:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpLocationPost[]>(
          `locations?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const location = normalizeWpLocation(raw[0]);
          this.locationMap.set(location.slug, location);
          this.cacheExpiry[`location:${location.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return location;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getLocationBySlug(cleanSlug);
  }

  async asyncGetAllLocations(): Promise<Location[]> {
    if (this.locationsCache !== null && this.isCacheValid('locations')) {
      return this.locationsCache;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpLocationPost[]>('locations?_embed=true&per_page=100');
        if (raw && Array.isArray(raw)) {
          const locations = raw.map((post) => normalizeWpLocation(post));
          this.locationsCache = locations;
          this.cacheExpiry['locations'] = Date.now() + this.CACHE_TTL_MS;
          locations.forEach((l) => {
            this.locationMap.set(l.slug, l);
            this.cacheExpiry[`location:${l.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return locations;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.locationsCache || [];
    }
    return this.getAllLocations();
  }

  // --- ASYNC CASE STUDIES ---
  async asyncGetCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (this.caseStudyMap.has(cleanSlug) && this.isCacheValid(`case_study:${cleanSlug}`)) {
      return this.caseStudyMap.get(cleanSlug)!;
    }
    if (this.caseStudiesCache && this.caseStudiesCache.length > 0 && this.isCacheValid('case_studies')) {
      const found = this.caseStudiesCache.find((c) => c.slug === cleanSlug);
      if (found) {
        this.caseStudyMap.set(cleanSlug, found);
        this.cacheExpiry[`case_study:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    if (this.isConfigured()) {
      try {
        const endpoint = this.workingCaseStudyEndpoint || 'case_studies';
        let raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(
          `${endpoint}?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (!Array.isArray(raw) && !this.workingCaseStudyEndpoint) {
          raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(
            `case-studies?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
          );
          if (Array.isArray(raw)) {
            this.workingCaseStudyEndpoint = 'case-studies';
          }
        } else if (Array.isArray(raw)) {
          this.workingCaseStudyEndpoint = endpoint;
        }
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const caseStudy = normalizeWpCaseStudy(raw[0]);
          this.caseStudyMap.set(caseStudy.slug, caseStudy);
          this.cacheExpiry[`case_study:${caseStudy.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return caseStudy;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getCaseStudyBySlug(cleanSlug);
  }

  async asyncGetAllCaseStudies(): Promise<CaseStudy[]> {
    if (this.caseStudiesCache !== null && this.isCacheValid('case_studies')) {
      return this.caseStudiesCache;
    }
    if (this.isConfigured()) {
      try {
        const endpoint = this.workingCaseStudyEndpoint || 'case_studies';
        let raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>(`${endpoint}?_embed=true&per_page=100`);
        if (!Array.isArray(raw) && !this.workingCaseStudyEndpoint) {
          raw = await this.fetchFromWordPress<RawWpCaseStudyPost[]>('case-studies?_embed=true&per_page=100');
          if (Array.isArray(raw)) {
            this.workingCaseStudyEndpoint = 'case-studies';
          }
        } else if (Array.isArray(raw)) {
          this.workingCaseStudyEndpoint = endpoint;
        }
        if (raw && Array.isArray(raw)) {
          const caseStudies = raw.map((post) => normalizeWpCaseStudy(post));
          this.caseStudiesCache = caseStudies;
          this.cacheExpiry['case_studies'] = Date.now() + this.CACHE_TTL_MS;
          caseStudies.forEach((c) => {
            this.caseStudyMap.set(c.slug, c);
            this.cacheExpiry[`case_study:${c.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return caseStudies;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.caseStudiesCache || [];
    }
    return this.getAllCaseStudies();
  }

  // --- ASYNC INSIGHTS ---
  async asyncGetInsightBySlug(slug: string): Promise<Insight | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (this.insightMap.has(cleanSlug) && this.isCacheValid(`insight:${cleanSlug}`)) {
      return this.insightMap.get(cleanSlug)!;
    }
    if (this.insightsCache && this.insightsCache.length > 0 && this.isCacheValid('insights')) {
      const found = this.insightsCache.find((ins) => ins.slug === cleanSlug);
      if (found) {
        this.insightMap.set(cleanSlug, found);
        this.cacheExpiry[`insight:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpInsightPost[]>(
          `posts?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const insight = normalizeWpInsight(raw[0]);
          this.insightMap.set(insight.slug, insight);
          this.cacheExpiry[`insight:${insight.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return insight;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getInsightBySlug(cleanSlug);
  }

  async asyncGetAllInsights(): Promise<Insight[]> {
    if (this.insightsCache !== null && this.isCacheValid('insights')) {
      return this.insightsCache;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpInsightPost[]>('posts?_embed=true&per_page=100');
        if (raw && Array.isArray(raw)) {
          const insights = raw.map((post) => normalizeWpInsight(post));
          this.insightsCache = insights;
          this.cacheExpiry['insights'] = Date.now() + this.CACHE_TTL_MS;
          insights.forEach((ins) => {
            this.insightMap.set(ins.slug, ins);
            this.cacheExpiry[`insight:${ins.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return insights;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.insightsCache || [];
    }
    return this.getAllInsights();
  }

  // --- ASYNC PAGES ---
  async asyncGetPageBySlug(slug: string): Promise<Page | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    if (this.pageMap.has(cleanSlug) && this.isCacheValid(`page:${cleanSlug}`)) {
      return this.pageMap.get(cleanSlug)!;
    }
    if (this.pagesCache && this.pagesCache.length > 0 && this.isCacheValid('pages')) {
      const found = this.pagesCache.find((p) => p.slug === cleanSlug);
      if (found) {
        this.pageMap.set(cleanSlug, found);
        this.cacheExpiry[`page:${cleanSlug}`] = Date.now() + this.CACHE_TTL_MS;
        return found;
      }
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpBasePost[]>(
          `pages?slug=${encodeURIComponent(cleanSlug)}&_embed=true`
        );
        if (raw && Array.isArray(raw) && raw.length > 0 && raw[0]) {
          const page = normalizeWpPage(raw[0]);
          this.pageMap.set(page.slug, page);
          this.cacheExpiry[`page:${page.slug}`] = Date.now() + this.CACHE_TTL_MS;
          return page;
        }
      } catch {
        // Fallback to local provider on network interruption
      }
    }
    return this.getPageBySlug(cleanSlug);
  }

  async asyncGetAllPages(): Promise<Page[]> {
    if (this.pagesCache !== null && this.isCacheValid('pages')) {
      return this.pagesCache;
    }
    if (this.isConfigured()) {
      try {
        const raw = await this.fetchFromWordPress<RawWpBasePost[]>('pages?_embed=true&per_page=100');
        if (raw && Array.isArray(raw)) {
          const pages = raw.map((post) => normalizeWpPage(post));
          this.pagesCache = pages;
          this.cacheExpiry['pages'] = Date.now() + this.CACHE_TTL_MS;
          pages.forEach((p) => {
            this.pageMap.set(p.slug, p);
            this.cacheExpiry[`page:${p.slug}`] = Date.now() + this.CACHE_TTL_MS;
          });
          return pages;
        }
      } catch {
        // Fallback to in-memory cache if available
      }
      return this.pagesCache || [];
    }
    return this.getAllPages();
  }
}

export const wordPressProvider = new WordPressProvider();
