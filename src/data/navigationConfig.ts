/**
 * MatricsMania — Centralized Navigation & Information Architecture Config
 * 
 * This file centralizes all navigation structures, taxonomy labels,
 * routing paths, descriptions, and metadata. In the future, this configuration
 * will be dynamically hydrated or mapped from the WordPress REST API endpoints
 * (e.g. wp/v2/menus, wp/v2/services, wp/v2/categories).
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
  // 1. SERVICES NAVIGATION (Grouped by Growth Disciplines)
  services: {
    title: 'Services',
    href: '/',
    featured: {
      title: 'Generative Engine Optimization (GEO)',
      description: 'Pioneering LLM citation indexing, semantic vector tuning, and Perplexity/ChatGPT brand visibility architectures.',
      href: '/generative-engine-optimization/',
      badge: '2025 Architecture',
    },
    groups: [
      {
        id: 'search-systems',
        title: 'Search & LLM Discovery',
        description: 'Algorithmic organic indexing and AI answer engine dominance',
        items: [
          {
            id: 'technical-seo',
            label: 'Technical SEO Infrastructure',
            href: '/technical-seo/',
            description: 'Core Web Vitals, headless crawl graphs, indexation pipelines',
            badge: 'Core',
          },
          {
            id: 'aeo-geo',
            label: 'AEO & Generative Engine Optimization',
            href: '/generative-engine-optimization/',
            description: 'Optimization for Perplexity, ChatGPT Search, and Google SGE',
            badge: 'New',
          },
          {
            id: 'semantic-knowledge-graphs',
            label: 'Semantic Knowledge Graphs',
            href: '/semantic-knowledge-graphs/',
            description: 'Schema.org JSON-LD entity validation and topical authority vectors',
          },
          {
            id: 'b2b-search-strategy',
            label: 'High-Intent B2B SEO Strategy',
            href: '/b2b-seo-strategy/',
            description: 'Pipeline-generating non-brand search acquisition models',
          },
        ],
      },
      {
        id: 'performance-media',
        title: 'Paid Acquisition & Media',
        description: 'Precision algorithmic bidding with server-side CAPI tracking',
        items: [
          {
            id: 'enterprise-paid-search',
            label: 'Enterprise Google & Bing Ads',
            href: '/paid-search-engineering/',
            description: 'Value-based smart bidding and high-intent keyword conquesting',
          },
          {
            id: 'paid-social-capi',
            label: 'Paid Social & Server-Side CAPI',
            href: '/server-side-capi/',
            description: 'First-party data matching for Meta, LinkedIn, and YouTube',
            badge: 'CAPI',
          },
          {
            id: 'programmatic-dsp',
            label: 'Account-Based Retargeting (ABM)',
            href: '/abm-retargeting/',
            description: 'Hyper-targeted account conquesting for enterprise sales pipelines',
          },
        ],
      },
      {
        id: 'conversion-engineering',
        title: 'Engineering & Conversion Systems',
        description: 'Scientific conversion rate optimization and technical audit pipelines',
        items: [
          {
            id: 'cro-experimentation',
            label: 'CRO & Revenue Experimentation',
            href: '/cro-revenue-experimentation/',
            description: 'Bayesian A/B testing, funnel instrumentation, velocity modeling',
          },
          {
            id: 'full-funnel-attribution',
            label: 'Multi-Touch Revenue Attribution',
            href: '/multi-touch-attribution/',
            description: 'First-touch to closed-won CRM synchronization and pipeline reporting',
          },
          {
            id: 'growth-audit',
            label: '360° Growth & Audit Blueprint',
            href: '/growth-audit-blueprint/',
            description: 'Deep-dive diagnostic of search, media, code, and revenue funnels',
            badge: 'Audit',
          },
        ],
      },
    ],
  },

  // 2. INDUSTRIES NAVIGATION (Vertical Playbooks)
  industries: {
    title: 'Industries',
    href: '/',
    featured: {
      title: 'Enterprise SaaS Growth Blueprint',
      description: 'How high-growth B2B software platforms capture 4.8x qualified demo pipeline through technical search and intent modeling.',
      href: '/saas/',
      badge: 'Featured Playbook',
    },
    groups: [
      {
        id: 'b2b-tech',
        title: 'Technology & Digital Scale',
        items: [
          {
            id: 'saas',
            label: 'Enterprise SaaS & Cloud',
            href: '/saas/',
            description: 'Product-led and sales-led search attribution systems',
            badge: '+310% ARR',
          },
          {
            id: 'fintech',
            label: 'Finance & FinTech',
            href: '/finance/',
            description: 'Compliant CAC optimization and high-trust acquisition',
          },
        ],
      },
      {
        id: 'high-ticket-commercial',
        title: 'High-Ticket & Physical Assets',
        items: [
          {
            id: 'real-estate',
            label: 'Real Estate & Properties',
            href: '/real-estate/',
            description: 'Ultra-luxury residential and commercial development lead engines',
            badge: '$140M Pipeline',
          },
          {
            id: 'luxury',
            label: 'Luxury Brands & High-AOV',
            href: '/luxury/',
            description: 'Prestigious brand equity and private client acquisition',
          },
        ],
      },
      {
        id: 'institutional-services',
        title: 'Institutional & Professional',
        items: [
          {
            id: 'healthcare',
            label: 'Healthcare & Life Sciences',
            href: '/healthcare/',
            description: 'HIPAA-compliant patient acquisition and clinical authority',
          },
          {
            id: 'education',
            label: 'Education & Universities',
            href: '/education/',
            description: 'Global student enrollment and high-value program yield',
          },
          {
            id: 'professional-services',
            label: 'Professional & Legal Services',
            href: '/professional-services/',
            description: 'Retainer client generation for top-tier law and advisory firms',
          },
        ],
      },
    ],
  },

  // 3. INSIGHTS NAVIGATION (Canonical Editorial Section)
  insights: {
    title: 'Blog',
    href: '/blog/',
    featured: {
      title: 'The 2025 Generative Engine Optimization Manifesto',
      description: 'A comprehensive technical breakdown of semantic search indexing, LLM citations, and AI crawler architectures.',
      href: '/how-ai-search-is-changing-digital-discovery/',
      readTime: '12 min read',
      category: 'Research Whitepaper',
    },
    categories: [
      {
        id: 'all-insights',
        label: 'All Research & Intel',
        href: '/blog/',
      },
      {
        id: 'geo-aeo-research',
        label: 'AEO & Generative Search',
        href: '/how-ai-search-is-changing-digital-discovery/',
        badge: 'Trending',
      },
      {
        id: 'technical-seo-deepdive',
        label: 'Technical Search Architecture',
        href: '/why-programmatic-seo-is-the-future-of-scaling-traffic/',
      },
      {
        id: 'performance-media-intel',
        label: 'Performance Attribution & CAPI',
        href: '/first-party-data-revolution-marketing-after-cookies/',
      },
      {
        id: 'cro-revenue-models',
        label: 'Conversion Engineering & CRO',
        href: '/the-cro-framework-that-doubled-our-enterprise-conversion-rates/',
      },
    ],
  },

  // 4. REGIONAL LOCATIONS & HUBS
  locations: {
    title: 'Locations',
    href: '/contact/',
    items: [
      {
        id: 'varanasi',
        label: 'Varanasi Office',
        href: '/contact/',
        description: "4, New St John's Colony, Bhullanpur, Varanasi",
        badge: 'NEW',
      },
      {
        id: 'bangalore',
        label: 'Bangalore Office',
        href: '/bangalore/',
        description: 'Tech Innovation Center, Bangalore, Karnataka',
      },
      {
        id: 'london',
        label: 'London EMEA Hub',
        href: '/london/',
        description: 'Canary Wharf — European Enterprise Operations',
      },
      {
        id: 'san-francisco',
        label: 'San Francisco Bay Hub',
        href: '/san-francisco/',
        description: 'SOMA Tech Corridor — US Growth Engineering',
      },
    ],
  },

  // 5. COMPANY & AGENCY
  company: {
    title: 'Agency',
    items: [
      {
        id: 'about',
        label: 'About',
        href: '/about/',
      },
      {
        id: 'work',
        label: 'Work',
        href: '/work/',
      },
      {
        id: 'case-studies',
        label: 'Case Studies',
        href: '/case-studies/',
      },
      {
        id: 'locations',
        label: 'Locations',
        href: '/locations/',
      },
      {
        id: 'blog',
        label: 'Blog',
        href: '/blog/',
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact/',
      },
    ],
  },

  // 6. PRIMARY DESKTOP BAR (Top-level crawlable items)
  primaryNav: [
    {
      id: 'services',
      label: 'Services',
      href: '/',
    },
    {
      id: 'industries',
      label: 'Industries',
      href: '/',
    },
    {
      id: 'case-studies',
      label: 'Work',
      href: '/case-studies/',
    },
    {
      id: 'company',
      label: 'Agency',
      href: '/about/',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact/',
    },
  ],

  // 7. FOOTER STRUCTURED COLUMNS
  footer: {
    solutions: [
      { id: 'f-tech-seo', label: 'Technical SEO Infrastructure', href: '/technical-seo/' },
      { id: 'f-aeo-geo', label: 'Generative Engine Optimization (GEO)', href: '/technical-seo/' },
      { id: 'f-knowledge-graphs', label: 'Semantic Knowledge Graphs', href: '/technical-seo/' },
      { id: 'f-paid-search', label: 'Enterprise Google & Bing Ads', href: '/technical-seo/' },
      { id: 'f-capi-social', label: 'Server-Side CAPI Paid Social', href: '/technical-seo/' },
      { id: 'f-cro-revenue', label: 'CRO & Revenue Experimentation', href: '/technical-seo/' },
      { id: 'f-all-services', label: 'View All Growth Services →', href: '/' },
    ],
    industries: [
      { id: 'f-saas', label: 'Enterprise SaaS & Cloud', href: '/saas/' },
      { id: 'f-real-estate', label: 'Real Estate & Properties', href: '/real-estate/' },
      { id: 'f-healthcare', label: 'Healthcare & Life Sciences', href: '/healthcare/' },
      { id: 'f-finance', label: 'Finance & FinTech', href: '/finance/' },
      { id: 'f-luxury', label: 'Luxury Brands & High-AOV', href: '/luxury/' },
      { id: 'f-education', label: 'Education & Universities', href: '/education/' },
      { id: 'f-all-industries', label: 'View All Industry Playbooks →', href: '/#industries-served-section' },
    ],
    insights: [
      { id: 'f-geo-whitepaper', label: 'The 2025 GEO Manifesto', href: '/how-ai-search-is-changing-digital-discovery/' },
      { id: 'f-programmatic-seo', label: 'Programmatic SEO at Scale', href: '/why-programmatic-seo-is-the-future-of-scaling-traffic/' },
      { id: 'f-first-party-data', label: 'First-Party CAPI Architecture', href: '/first-party-data-revolution-marketing-after-cookies/' },
      { id: 'f-cro-playbook', label: 'Enterprise CRO Experimentation', href: '/the-cro-framework-that-doubled-our-enterprise-conversion-rates/' },
      { id: 'f-all-insights', label: 'All Research & Whitepapers →', href: '/blog/' },
    ],
    hubs: [
      { id: 'f-all-locations', label: 'Global Operations Network →', href: '/contact/' },
    ],
    company: [
      { id: 'f-about', label: 'About MatricsMania', href: '/about/' },
      { id: 'f-work', label: 'Portfolio & Proof of Work', href: '/work/' },
      { id: 'f-case-studies', label: 'Case Studies & Teardowns', href: '/case-studies/' },
      { id: 'f-locations', label: 'Global Locations', href: '/locations/' },
      { id: 'f-blog', label: 'Insights & Blog', href: '/blog/' },
      { id: 'f-process', label: 'Operating Methodology', href: '/process/' },
      { id: 'f-contact', label: 'Contact Growth Engineers', href: '/contact/' },
    ],
    legal: [
      { id: 'f-privacy', label: 'Privacy Policy', href: '/privacy/' },
      { id: 'f-terms', label: 'Terms of Engagement', href: '/terms/' },
      { id: 'f-security', label: 'Enterprise Security & Compliance', href: '/contact/' },
      { id: 'f-sitemap', label: 'XML Sitemap Index', href: '/sitemap.xml' },
    ],
  },
};
