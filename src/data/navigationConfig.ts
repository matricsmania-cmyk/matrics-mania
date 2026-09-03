/**
 * MatricsMania — Centralized Navigation & Information Architecture Config
 * 
 * Synchronized with WordPress CMS Headless Endpoints:
 * - Services: /services/[slug]/ (technical-seo, seo-growth, performance-marketing, web-cro-engineering, content-authority, growth-intelligence)
 * - Industries: /industries/[slug]/ (saas, real-estate, luxury-d2c, healthcare)
 * - Locations: /locations/[slug]/ (bangalore, mumbai, delhi-ncr)
 * - Case Studies: /case-studies/[slug]/ (velociti-cloud, aethelgard-luxury)
 * - Insights: /insights/[slug]/ (search-architecture-2026, paid-demand-science-2026, conversion-engineering-playbook, perplexity-rag-entity-modeling, b2b-pipeline-velocity-framework, programmatic-seo-taxonomy-systems)
 * - Pages: /about/, /work/, /process/, /careers/, /faq/, /contact/
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
  isExternal?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  description?: string;
  items: NavItem[];
}

export interface NavigationConfig {
  services: {
    title: string;
    href: string;
    groups: NavGroup[];
    featured?: {
      title: string;
      description: string;
      href: string;
      badge: string;
    };
  };
  industries: {
    title: string;
    href: string;
    groups: NavGroup[];
    featured?: {
      title: string;
      description: string;
      href: string;
      badge: string;
    };
  };
  insights: {
    title: string;
    href: string;
    categories: NavItem[];
    featured: {
      title: string;
      description: string;
      href: string;
      readTime: string;
      category: string;
    };
  };
  company: {
    title: string;
    items: NavItem[];
  };
  locations: {
    title: string;
    href: string;
    items: NavItem[];
  };
  primaryNav: NavItem[];
  footer: {
    solutions: NavItem[];
    industries: NavItem[];
    insights: NavItem[];
    hubs: NavItem[];
    company: NavItem[];
    legal: NavItem[];
  };
}

export const NAVIGATION_CONFIG: NavigationConfig = {
  // 1. SERVICES NAVIGATION (Direct from WordPress CMS)
  services: {
    title: 'Services',
    href: '/services/',
    featured: {
      title: 'Technical SEO & Search Architecture',
      description: 'Algorithmic search architecture, programmatic taxonomy expansion, and Core Web Vitals optimization.',
      href: '/services/technical-seo/',
      badge: 'SRV-SEO-01',
    },
    groups: [
      {
        id: 'search-organic',
        title: 'Search & Organic Systems',
        description: 'Algorithmic organic indexing and search engineering',
        items: [
          {
            id: 'technical-seo',
            label: 'Technical SEO & Search Architecture',
            href: '/services/technical-seo/',
            description: 'Algorithmic search architecture and Core Web Vitals.',
            badge: 'SRV-SEO-01',
          },
          {
            id: 'seo-growth',
            label: 'SEO Growth Engineering',
            href: '/services/seo-growth/',
            description: 'Programmatic taxonomy expansion and search acquisition.',
            badge: 'SRV-SEO-02',
          },
          {
            id: 'content-authority',
            label: 'Content Authority Systems',
            href: '/services/content-authority/',
            description: 'Information architecture and authoritative topical graph models.',
            badge: 'SRV-CNT-01',
          },
        ],
      },
      {
        id: 'performance-conversion',
        title: 'Paid Acquisition & CRO',
        description: 'Predictable demand capture and revenue experimentation',
        items: [
          {
            id: 'performance-marketing',
            label: 'Performance Marketing',
            href: '/services/performance-marketing/',
            description: 'Precision algorithmic bidding with server-side CAPI tracking.',
            badge: 'SRV-PAID-01',
          },
          {
            id: 'web-cro-engineering',
            label: 'Web CRO Engineering',
            href: '/services/web-cro-engineering/',
            description: 'Sub-second landing page architecture and conversion funnels.',
            badge: 'SRV-CRO-01',
          },
          {
            id: 'growth-intelligence',
            label: 'Growth Intelligence',
            href: '/services/growth-intelligence/',
            description: 'Raw BigQuery telemetry and predictive econometric models.',
            badge: 'SRV-DATA-01',
          },
        ],
      },
    ],
  },

  // 2. INDUSTRIES NAVIGATION (Direct from WordPress CMS)
  industries: {
    title: 'Industries',
    href: '/industries/',
    featured: {
      title: 'B2B & Enterprise SaaS',
      description: 'Pipeline velocity models and search conquesting for multi-product software suites.',
      href: '/industries/saas/',
      badge: 'IND-SAAS-01',
    },
    groups: [
      {
        id: 'enterprise-b2b',
        title: 'Enterprise Sectors',
        items: [
          {
            id: 'saas',
            label: 'B2B & Enterprise SaaS',
            href: '/industries/saas/',
            description: 'Pipeline velocity and software buyer journey modeling',
            badge: 'IND-SAAS-01',
          },
          {
            id: 'real-estate',
            label: 'Real Estate & Infrastructure',
            href: '/industries/real-estate/',
            description: 'Hyper-local search clusters and high-value lead acquisition',
            badge: 'IND-REAL-01',
          },
        ],
      },
      {
        id: 'consumer-clinical',
        title: 'Specialized Markets',
        items: [
          {
            id: 'luxury-d2c',
            label: 'Luxury & Premium D2C',
            href: '/industries/luxury-d2c/',
            description: 'High-AOV acquisition funnels and brand affinity modeling',
            badge: 'IND-LUX-01',
          },
          {
            id: 'healthcare',
            label: 'Healthcare & Clinical',
            href: '/industries/healthcare/',
            description: 'E-E-A-T compliant medical content and HIPAA-compliant tracking',
            badge: 'IND-HLTH-01',
          },
        ],
      },
    ],
  },

  // 3. INSIGHTS NAVIGATION (Direct from WordPress CMS)
  insights: {
    title: 'Insights',
    href: '/insights/',
    featured: {
      title: 'Algorithmic Retrieval and Search Architecture in Modern B2B',
      description: 'An in-depth technical analysis of neural search ranking factors and programmatic information architectures.',
      href: '/insights/search-architecture-2026/',
      readTime: '8 min read',
      category: 'Search Architecture',
    },
    categories: [
      { id: 'search-architecture', label: 'Search Architecture', href: '/insights/search-architecture-2026/' },
      { id: 'paid-demand-science', label: 'Paid Demand Science', href: '/insights/paid-demand-science-2026/' },
      { id: 'conversion-engineering', label: 'Conversion Engineering', href: '/insights/conversion-engineering-playbook/' },
      { id: 'rag-optimization', label: 'Perplexity RAG Optimization', href: '/insights/perplexity-rag-entity-modeling/' },
      { id: 'pipeline-velocity', label: 'B2B Pipeline Velocity', href: '/insights/b2b-pipeline-velocity-framework/' },
      { id: 'programmatic-seo', label: 'Programmatic SEO Taxonomy', href: '/insights/programmatic-seo-taxonomy-systems/' },
    ],
  },

  // 4. LOCATIONS NAVIGATION (Direct from WordPress CMS)
  locations: {
    title: 'Locations',
    href: '/locations/',
    items: [
      {
        id: 'loc-bangalore',
        label: 'Bangalore Headquarters',
        href: '/locations/bangalore/',
        description: 'Koramangala 4th Block, Bengaluru, Karnataka 560034',
        badge: 'HQ Node',
      },
      {
        id: 'loc-mumbai',
        label: 'Mumbai Hub',
        href: '/locations/mumbai/',
        description: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051',
        badge: 'Financial Node',
      },
      {
        id: 'loc-delhi-ncr',
        label: 'Delhi NCR Hub',
        href: '/locations/delhi-ncr/',
        description: 'DLF Cyber City, Phase 2, Gurugram, Haryana 122002',
        badge: 'Strategic Node',
      },
    ],
  },

  // 5. COMPANY NAVIGATION (Direct from WordPress CMS)
  company: {
    title: 'Company',
    items: [
      { id: 'about', label: 'About MatricsMania', href: '/about/', description: 'Engineering ethos and operating principles' },
      { id: 'work', label: 'Engineered Systems & Portfolio', href: '/work/', description: 'Verified client growth deployments' },
      { id: 'case-studies', label: 'Case Studies', href: '/case-studies/', description: 'In-depth revenue and pipeline transformations' },
      { id: 'process', label: 'Engineering Protocol', href: '/process/', description: '5-phase standardized growth protocol' },
      { id: 'careers', label: 'Careers & Fellowships', href: '/careers/', description: 'Open growth engineering positions' },
      { id: 'faq', label: 'FAQs & Specifications', href: '/faq/', description: 'Retainer terms, SLAs, and architecture' },
      { id: 'contact', label: 'Contact Growth Engineers', href: '/contact/', description: 'Schedule an executive diagnostic' },
    ],
  },

  // 6. PRIMARY HEADER NAVIGATION
  primaryNav: [
    { id: 'nav-services', label: 'Services', href: '/services/' },
    { id: 'nav-industries', label: 'Industries', href: '/industries/' },
    { id: 'nav-work', label: 'Work', href: '/work/' },
    { id: 'nav-case-studies', label: 'Case Studies', href: '/case-studies/' },
    { id: 'nav-insights', label: 'Insights', href: '/insights/' },
    { id: 'nav-company', label: 'Company', href: '/about/' },
    { id: 'nav-contact', label: 'Contact', href: '/contact/' },
  ],

  // 7. FOOTER STRUCTURED COLUMNS
  footer: {
    solutions: [
      { id: 'f-tech-seo', label: 'Technical SEO & Search Architecture', href: '/services/technical-seo/' },
      { id: 'f-seo-growth', label: 'SEO Growth Engineering', href: '/services/seo-growth/' },
      { id: 'f-performance-mktg', label: 'Performance Marketing', href: '/services/performance-marketing/' },
      { id: 'f-cro-eng', label: 'Web CRO Engineering', href: '/services/web-cro-engineering/' },
      { id: 'f-content-auth', label: 'Content Authority Systems', href: '/services/content-authority/' },
      { id: 'f-growth-intel', label: 'Growth Intelligence', href: '/services/growth-intelligence/' },
      { id: 'f-all-services', label: 'All Growth Services →', href: '/services/' },
    ],
    industries: [
      { id: 'f-saas', label: 'B2B & Enterprise SaaS', href: '/industries/saas/' },
      { id: 'f-real-estate', label: 'Real Estate & Infrastructure', href: '/industries/real-estate/' },
      { id: 'f-luxury', label: 'Luxury & Premium D2C', href: '/industries/luxury-d2c/' },
      { id: 'f-healthcare', label: 'Healthcare & Clinical', href: '/industries/healthcare/' },
      { id: 'f-all-industries', label: 'All Industries →', href: '/industries/' },
    ],
    insights: [
      { id: 'f-ins-1', label: 'Algorithmic Retrieval and Search Architecture', href: '/insights/search-architecture-2026/' },
      { id: 'f-ins-2', label: 'Eliminating CAC Waste in B2B Paid Media Systems', href: '/insights/paid-demand-science-2026/' },
      { id: 'f-ins-3', label: 'Deterministic CRO: Why Latency Decides Revenue', href: '/insights/conversion-engineering-playbook/' },
      { id: 'f-ins-4', label: 'Perplexity RAG Optimization & Knowledge Graph Citation', href: '/insights/perplexity-rag-entity-modeling/' },
      { id: 'f-all-insights', label: 'All Research & Insights →', href: '/insights/' },
    ],
    hubs: [
      { id: 'f-bangalore', label: 'Bangalore Headquarters', href: '/locations/bangalore/' },
      { id: 'f-mumbai', label: 'Mumbai Financial Hub', href: '/locations/mumbai/' },
      { id: 'f-delhi-ncr', label: 'Delhi NCR Strategic Node', href: '/locations/delhi-ncr/' },
      { id: 'f-all-locations', label: 'All Engineering Hubs →', href: '/locations/' },
    ],
    company: [
      { id: 'f-about', label: 'About MatricsMania', href: '/about/' },
      { id: 'f-work', label: 'Portfolio & Proof of Work', href: '/work/' },
      { id: 'f-case-studies', label: 'Case Studies', href: '/case-studies/' },
      { id: 'f-process', label: 'Engineering Protocol', href: '/process/' },
      { id: 'f-careers', label: 'Careers & Fellowships', href: '/careers/' },
      { id: 'f-faq', label: 'FAQs & Specifications', href: '/faq/' },
      { id: 'f-contact', label: 'Contact', href: '/contact/' },
    ],
    legal: [
      { id: 'f-privacy', label: 'Privacy Policy', href: '/privacy/' },
      { id: 'f-terms', label: 'Terms of Service', href: '/terms/' },
      { id: 'f-faq-legal', label: 'Retainer Terms & SLAs', href: '/faq/' },
    ],
  },
};
