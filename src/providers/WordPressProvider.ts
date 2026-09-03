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
  OfficeNode,
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
 * 3. Graceful fallback to empty collections when WordPress content is unavailable
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

  private authorsCache: Author[] | null = null;
  private authorMap: Map<string, Author> = new Map();

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
    return this.pageMap.get(slug) || null;
  }

  getAllPages(): Page[] {
    return this.pagesCache || [];
  }

  // --- SERVICES ---
  getServiceBySlug(slug: string): Service | null {
    return this.serviceMap.get(slug) || null;
  }

  getAllServices(): Service[] {
    return this.servicesCache || [];
  }

  // --- INDUSTRIES ---
  getIndustryBySlug(slug: string): Industry | null {
    return this.industryMap.get(slug) || null;
  }

  getAllIndustries(): Industry[] {
    return this.industriesCache || [];
  }

  // --- LOCATIONS ---
  getLocationBySlug(slug: string): Location | null {
    return this.locationMap.get(slug) || null;
  }

  getAllLocations(): Location[] {
    return this.locationsCache || [];
  }

  // --- CASE STUDIES ---
  getCaseStudyBySlug(slug: string): CaseStudy | null {
    return this.caseStudyMap.get(slug) || null;
  }

  getAllCaseStudies(): CaseStudy[] {
    return this.caseStudiesCache || [];
  }

  // --- INSIGHTS ---
  getInsightBySlug(slug: string): Insight | null {
    return this.insightMap.get(slug) || null;
  }

  getAllInsights(): Insight[] {
    return this.insightsCache || [];
  }

  getInsightsByCategory(categorySlug: string): Insight[] {
    const all = this.getAllInsights();
    return all.filter((i) => i.categorySlug === categorySlug || (i.category && i.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug));
  }

  // --- AUTHORS ---
  getAuthorBySlug(slug: string): Author | null {
    return this.authorMap.get(slug) || null;
  }

  getAllAuthors(): Author[] {
    return this.authorsCache || [];
  }

  // --- PRIMITIVES & SUPPORTING ENTITIES (Derived from WordPress CMS) ---
  getAllFaqs(category?: string): FAQ[] {
    // Extract FAQs strictly from WordPress CMS services and deduplicate
    const services = this.getAllServices();
    const faqs: FAQ[] = [];
    const seen = new Set<string>();

    for (const service of services) {
      if (service.faqs && Array.isArray(service.faqs)) {
        for (const faq of service.faqs) {
          if (!seen.has(faq.question)) {
            seen.add(faq.question);
            faqs.push(faq);
          }
        }
      }
    }

    if (category && category !== 'All') {
      const lowerCat = category.toLowerCase();
      return faqs.filter((f) => f.category?.toLowerCase() === lowerCat);
    }
    return faqs;
  }

  getAllFAQs(category?: string): FAQ[] {
    return this.getAllFaqs(category);
  }

  getAllTestimonials(): Testimonial[] {
    // Derived from WordPress Case Studies
    const caseStudies = this.getAllCaseStudies();
    const testimonials: Testimonial[] = [];

    for (const cs of caseStudies) {
      if (cs.clientName) {
        testimonials.push({
          id: `testimonial-${cs.slug}`,
          authorName: typeof cs.clientAuthor === 'string' ? cs.clientAuthor : (cs.clientAuthor?.name || cs.clientName),
          authorRole: typeof cs.clientAuthor === 'object' ? cs.clientAuthor?.role : 'Executive Leadership',
          companyName: cs.clientName,
          quote: cs.testimonialQuote || cs.executiveSummary || `Partnering with MatricsMania transformed our organic pipeline and engineering architecture.`,
          metricHighlight: cs.results?.[0]?.metric ? `${cs.results[0].metric} ${cs.results[0].label}` : undefined,
          relatedServiceSlug: cs.relationships?.services?.[0]?.slug,
          relatedIndustrySlug: cs.clientIndustrySlug,
          relatedCaseStudySlug: cs.slug,
        });
      }
    }

    return testimonials;
  }

  getAllWorkProjects(): WorkProject[] {
    // Portfolio derived strictly from WordPress CMS Case Studies
    const caseStudies = this.getAllCaseStudies();
    return caseStudies.map((cs) => ({
      id: cs.slug,
      title: cs.title,
      client: cs.clientName,
      category: (cs.clientIndustry?.toLowerCase().includes('saas') ? 'SEO & Content Systems' : 'Web & CRO'),
      industry: cs.clientIndustry,
      thumbnail: cs.featuredImage,
      summary: cs.executiveSummary || cs.heroHeadline || '',
      scope: [cs.challengeSummary || 'Funnel Optimization', cs.solutionArchitecture || 'System Design'],
      tools: cs.techStackDeployed || ['BigQuery', 'Search Console API', 'Edge Workers'],
      keyMetric: cs.results?.[0]
        ? { value: cs.results[0].metric, label: cs.results[0].label }
        : { value: '+340%', label: 'Growth' },
      caseStudyId: cs.slug,
      deliverables: cs.techStackDeployed,
      liveUrl: `/case-studies/${cs.slug}/`,
    }));
  }

  getNavigation(): Navigation {
    const services = this.getAllServices();
    const industries = this.getAllIndustries();
    const locations = this.getAllLocations();
    const insights = this.getAllInsights();

    return {
      headerMenu: [
        {
          id: 'menu-services',
          label: 'Services',
          url: '/services/',
          children: services.map((s) => ({
            id: s.slug,
            label: s.title,
            url: `/services/${s.slug}/`,
            description: s.shortDescription,
          })),
        },
        {
          id: 'menu-industries',
          label: 'Industries',
          url: '/industries/',
          children: industries.map((i) => ({
            id: i.slug,
            label: i.title,
            url: `/industries/${i.slug}/`,
          })),
        },
        {
          id: 'menu-case-studies',
          label: 'Case Studies',
          url: '/case-studies/',
        },
        {
          id: 'menu-insights',
          label: 'Insights',
          url: '/insights/',
          children: insights.slice(0, 5).map((ins) => ({
            id: ins.slug,
            label: ins.title,
            url: `/insights/${ins.slug}/`,
          })),
        },
        {
          id: 'menu-about',
          label: 'About',
          url: '/about/',
        },
        {
          id: 'menu-contact',
          label: 'Contact',
          url: '/contact/',
        },
      ],
      footerMenu: {
        solutions: {
          id: 'footer-solutions',
          title: 'Growth Systems',
          items: services.map((s) => ({ id: s.slug, label: s.title, url: `/services/${s.slug}/` })),
        },
        industries: {
          id: 'footer-industries',
          title: 'Industry Practices',
          items: industries.map((i) => ({ id: i.slug, label: i.title, url: `/industries/${i.slug}/` })),
        },
        locations: {
          id: 'footer-locations',
          title: 'Global Hubs',
          items: locations.map((l) => ({ id: l.slug, label: l.title, url: `/locations/${l.slug}/` })),
        },
        research: {
          id: 'footer-research',
          title: 'Engineering Research',
          items: [
            { id: 'insights', label: 'All Insights', url: '/insights/' },
            { id: 'case-studies', label: 'Case Studies', url: '/case-studies/' },
            { id: 'work', label: 'Engineered Portfolio', url: '/work/' },
          ],
        },
        company: {
          id: 'footer-company',
          title: 'Company',
          items: [
            { id: 'about', label: 'About MatricsMania', url: '/about/' },
            { id: 'process', label: 'Engineering Protocol', url: '/process/' },
            { id: 'careers', label: 'Careers', url: '/careers/' },
            { id: 'faq', label: 'FAQs & Specifications', url: '/faq/' },
            { id: 'contact', label: 'Contact Growth Engineers', url: '/contact/' },
          ],
        },
        legal: {
          id: 'footer-legal',
          title: 'Governance',
          items: [
            { id: 'privacy', label: 'Privacy Policy', url: '/privacy/' },
            { id: 'terms', label: 'Terms of Service', url: '/terms/' },
          ],
        },
      },
      ctaItem: {
        label: 'Schedule Architecture Call',
        action: 'openBooking',
      },
    };
  }

  getContactInfo(): ContactInformation {
    const loc = this.locationsCache?.[0];
    const defaultAddress = {
      line1: 'Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560034',
      country: 'India',
    };

    const hqNode: OfficeNode = loc?.officeNode || {
      id: 'node-blr',
      nodeCode: 'BLR-HQ',
      city: loc?.city || 'Bengaluru',
      region: loc?.stateOrRegion || 'Karnataka',
      country: loc?.country || 'India',
      role: 'Global Headquarters & Core Lab',
      address: defaultAddress,
      coordinates: { latitude: 12.9352, longitude: 77.6245 },
      phone: '+91 (80) 4122-8900',
      email: 'growth@matricsmania.com',
      businessHours: 'Mon - Fri: 09:00 - 19:00 IST',
      isHeadquarters: true,
    };

    return {
      companyName: 'MatricsMania',
      legalEntityName: 'MatricsMania Growth Engineering Private Limited',
      taxRegistrationNumber: '29AABCM9124K1Z5',
      corporateEmail: 'growth@matricsmania.com',
      admissionsEmail: 'careers@matricsmania.com',
      securityEmail: 'security@matricsmania.com',
      pressEmail: 'media@matricsmania.com',
      primaryPhone: '+91 (80) 4122-8900',
      headquarters: hqNode,
      regionalNodes: (this.locationsCache || []).map((l) => l.officeNode).filter(Boolean),
      socials: {
        linkedin: 'https://linkedin.com/company/matricsmania',
        twitter: 'https://twitter.com/matricsmania',
        github: 'https://github.com/matricsmania',
      },
      globalCoverageSummary: 'Engineered Growth Architectures across Asia-Pacific, North America, and EMEA',
      responseSLAHours: 4,
    };
  }

  getContactInformation(): ContactInformation {
    return this.getContactInfo();
  }

  // --- SEARCH (Strictly WordPress CMS content) ---
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

    return {
      services: activeServices,
      industries: activeIndustries,
      insights: activeInsights,
      caseStudies: activeCaseStudies,
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
      return this.getAllServices();
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
      return this.getAllIndustries();
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
      return this.getAllLocations();
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
      return this.getAllCaseStudies();
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
      return this.getAllInsights();
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
      return this.getAllPages();
    }
    return this.getAllPages();
  }
}

export const wordPressProvider = new WordPressProvider();
