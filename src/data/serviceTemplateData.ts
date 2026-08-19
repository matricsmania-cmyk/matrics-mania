export interface ServiceProblemItem {
  number: string;
  title: string;
  description: string;
}

export interface ServiceWhatWeDoItem {
  number: string;
  title: string;
  description?: string;
  points: string[];
}

export interface ServiceWorkStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceDeliverableItem {
  area: string;
  deliverable: string;
  details?: string;
}

export interface ServiceRelatedItem {
  title: string;
  description: string;
  slug: string;
  badge?: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceProofData {
  badge: string;
  headline: string;
  description: string;
  caseStudySlug?: string;
  caseStudyTitle?: string;
  metrics?: { label: string; value: string }[];
  deliverableHighlights?: string[];
}

export interface ServicePageData {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  heroDescription: string;
  heroDiagram: {
    title: string;
    flow: string[];
    outcome: string;
  };
  snapshot: {
    whatItSolves: string;
    whatWeImprove: string[];
    bestSuitedFor: string[];
  };
  problem: {
    headline: string;
    items: ServiceProblemItem[];
  };
  whatWeDo: {
    items: ServiceWhatWeDoItem[];
  };
  howWeWork: {
    summaryFlow: string;
    steps: ServiceWorkStep[];
  };
  whatYouGet: {
    engagementSteps: string[];
    deliverables: ServiceDeliverableItem[];
  };
  whyThisMatters: {
    chainSteps: string[];
    explanation: string;
  };
  proof: ServiceProofData;
  relatedServices: ServiceRelatedItem[];
  faqs: ServiceFaqItem[];
  finalCta: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
}

export const SERVICES_PAGE_DATA: Record<string, ServicePageData> = {
  'technical-seo': {
    slug: 'technical-seo',
    name: 'Technical SEO',
    eyebrow: 'TECHNICAL SEO',
    h1: 'Build a website search engines can actually understand.',
    heroDescription:
      'Fix the technical barriers preventing your website from being crawled, indexed and understood properly.',
    heroDiagram: {
      title: 'Technical SEO Pipeline',
      flow: ['Crawl', 'Index', 'Understand'],
      outcome: 'Visibility',
    },
    snapshot: {
      whatItSolves:
        "Search engines can't efficiently crawl, understand or index important parts of your website.",
      whatWeImprove: [
        'Architecture',
        'Crawlability',
        'Indexation',
        'Performance',
        'Structured Data',
        'Internal Linking',
      ],
      bestSuitedFor: [
        'Growing websites',
        'Ecommerce',
        'SaaS',
        'Enterprise',
        'Websites undergoing redesign or migration',
      ],
    },
    problem: {
      headline: 'Your website can look perfect and still be difficult to discover.',
      items: [
        {
          number: '01',
          title: 'Crawl problems',
          description:
            'Search engines waste resources trying to understand unnecessary URLs and crawl dead ends.',
        },
        {
          number: '02',
          title: 'Indexation problems',
          description:
            'Important commercial and content pages aren’t being properly included in the search index.',
        },
        {
          number: '03',
          title: 'Architecture problems',
          description:
            'Your site structure fails to clearly communicate contextual page hierarchies and entity relationships.',
        },
        {
          number: '04',
          title: 'Performance problems',
          description:
            'Technical rendering bottlenecks and latency create friction for both users and search engines.',
        },
      ],
    },
    whatWeDo: {
      items: [
        {
          number: '01',
          title: 'CRAWLABILITY',
          description: 'Ensure search engine bots easily access your most valuable URLs without hitting roadblocks.',
          points: ['Robots.txt configuration', 'XML sitemaps optimization', 'Crawl paths cleanup', 'Crawl budget allocation'],
        },
        {
          number: '02',
          title: 'INDEXATION',
          description: 'Control precisely which pages enter the search index and eliminate duplicate content confusion.',
          points: ['Canonical tag mapping', 'Noindex directives', 'Duplicate URL consolidation', 'Index coverage validation'],
        },
        {
          number: '03',
          title: 'SITE ARCHITECTURE',
          description: 'Build a structured taxonomy that distributes PageRank and establishes topical depth.',
          points: ['Information architecture', 'Clean URL structures', 'Contextual internal linking', 'Page hierarchy modeling'],
        },
        {
          number: '04',
          title: 'PERFORMANCE',
          description: 'Optimize Core Web Vitals, JavaScript execution, and server response speeds.',
          points: ['Core Web Vitals tuning', 'JavaScript execution & hydration', 'SSR / SSG rendering pipelines', 'Server response (TTFB) & asset payload'],
        },
        {
          number: '05',
          title: 'STRUCTURED DATA',
          description: 'Deploy rich Schema markup so search engines and LLMs comprehend entities and relationships.',
          points: ['Schema markup implementation', 'Entity graph relationships', 'Rich-result eligibility', 'JSON-LD syntax validation'],
        },
        {
          number: '06',
          title: 'MIGRATION',
          description: 'Protect organic rankings and traffic equity during redesigns, domain moves, or platform switches.',
          points: ['1:1 URL mapping', '301 redirect management', 'Canonical alignment', 'Post-migration health monitoring'],
        },
      ],
    },
    howWeWork: {
      summaryFlow:
        'Crawl the website → identify technical barriers → prioritize by business impact → implement fixes → monitor indexation.',
      steps: [
        {
          number: '01',
          title: 'DISCOVER',
          description: 'Understand the business, technical stack, website architecture, and primary growth objectives.',
        },
        {
          number: '02',
          title: 'AUDIT',
          description: 'Deep crawl and code analysis to uncover critical crawl barriers, indexing defects, and performance bottlenecks.',
        },
        {
          number: '03',
          title: 'STRATEGIZE',
          description: 'Create an engineering-ready implementation roadmap prioritized by commercial impact and development effort.',
        },
        {
          number: '04',
          title: 'IMPLEMENT',
          description: 'Execute fixes directly or provide step-by-step guidance, code snippets, and QA support for your engineering team.',
        },
        {
          number: '05',
          title: 'MEASURE',
          description: 'Track log file crawl frequency, index saturation, Core Web Vitals, and organic impression shifts.',
        },
        {
          number: '06',
          title: 'OPTIMIZE',
          description: 'Continuously maintain technical hygiene as new pages, features, and code releases roll out.',
        },
      ],
    },
    whatYouGet: {
      engagementSteps: [
        'Technical SEO Audit',
        'Prioritized Issue Register',
        'Implementation Roadmap',
        'Technical Recommendations',
        'Developer Guidance',
        'Implementation Support',
        'Monitoring & Reporting',
      ],
      deliverables: [
        {
          area: 'Crawlability',
          deliverable: 'Crawl analysis & bot log inspection',
          details: 'Identification of crawl traps, orphan URLs, redirect loops, and server response errors.',
        },
        {
          area: 'Indexation',
          deliverable: 'Indexation diagnostics & coverage audit',
          details: 'Analysis of indexed vs. non-indexed URLs, canonical tags, noindex tags, and parameter handling.',
        },
        {
          area: 'Architecture',
          deliverable: 'Site structure & internal linking blueprint',
          details: 'Information hierarchy re-structuring, depth analysis, and contextual PageRank distribution paths.',
        },
        {
          area: 'Performance',
          deliverable: 'Core Web Vitals & rendering analysis',
          details: 'Audit of LCP, INP, CLS, JavaScript execution time, and client-side vs. server-side rendering issues.',
        },
        {
          area: 'Structured data',
          deliverable: 'Schema implementation roadmap',
          details: 'Custom JSON-LD schema models for Organization, Product, Article, FAQ, Breadcrumbs, and Custom Entities.',
        },
        {
          area: 'Migration',
          deliverable: 'Redirect mapping & migration QA protocol',
          details: 'Complete legacy-to-new URL mapping matrices, staging environment checks, and launch-day monitoring.',
        },
        {
          area: 'Monitoring',
          deliverable: 'Technical health monitoring & alerting',
          details: 'Automated monitoring of critical URLs, sitemaps, robots.txt changes, and Google Search Console anomalies.',
        },
      ],
    },
    whyThisMatters: {
      chainSteps: [
        'TECHNICAL CHANGE',
        'Better crawlability',
        'Better discovery',
        'Better indexation',
        'More eligible pages',
        'Greater search opportunity',
        'Potentially more qualified demand',
      ],
      explanation:
        'Search engines cannot rank what they cannot discover, and cannot recommend what they cannot understand. By resolving foundational technical friction, you remove the ceiling that limits the organic reach of your content, products, and landing pages.',
    },
    proof: {
      badge: 'REAL WORK',
      headline: 'Actual implementation. Firsthand technical evidence.',
      description:
        'We believe in verifiable technical execution. Review real architectural diagnostics, schema schemas, and crawl recovery frameworks deployed in actual live production environments.',
      caseStudySlug: 'real-estate-seo-growth',
      caseStudyTitle: 'Case Study: Technical Restructure & Search Growth',
      deliverableHighlights: [
        'Eliminated 14,000+ duplicate facet indexation traps across dynamic parameters.',
        'Improved server response time from 1.4s to 320ms via edge caching & asset streaming.',
        'Implemented nested JSON-LD entity graph covering 100% of core landing pages.',
        'Zero organic traffic loss during multi-domain platform migration.',
      ],
      metrics: [
        { label: 'Crawl Efficiency', value: '+340%' },
        { label: 'Indexation Rate', value: '99.4%' },
        { label: 'Core Web Vitals', value: '100% Pass' },
      ],
    },
    relatedServices: [
      {
        title: 'On-Page SEO',
        description: 'Improve relevance, entity signals, and on-page content alignment.',
        slug: 'on-page-seo',
      },
      {
        title: 'Programmatic SEO',
        description: 'Build scalable search landing pages generated from structured data.',
        slug: 'programmatic-seo',
      },
      {
        title: 'International SEO',
        description: 'Structure websites for multiple markets with hreflang and localized architecture.',
        slug: 'international-seo',
      },
      {
        title: 'SEO Migration',
        description: 'Protect search visibility, rankings, and equity during platform redesigns.',
        slug: 'seo-migration',
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        description: 'Turn existing organic traffic into qualified inbound enquiries and revenue.',
        slug: 'cro',
      },
    ],
    faqs: [
      {
        question: 'What is technical SEO?',
        answer:
          'Technical SEO refers to the optimization of website infrastructure—such as crawl paths, server configurations, canonicalization, page speed, structured data, and rendering—to ensure search engines can discover, crawl, index, and understand your content without friction.',
      },
      {
        question: 'What does a technical SEO audit include?',
        answer:
          'A comprehensive technical audit inspects robots.txt, XML sitemaps, server status codes, redirect chains, canonical tags, duplicate content parameters, internal link architecture, Core Web Vitals, JavaScript execution, mobile rendering, and JSON-LD structured data.',
      },
      {
        question: 'How do you identify indexing problems?',
        answer:
          'We utilize server log file analysis, Google Search Console Index Coverage diagnostics, custom headless browser crawls (e.g. Screaming Frog with JS rendering), and URL inspection APIs to pinpoint orphan pages, noindex conflicts, and canonical misconfigurations.',
      },
      {
        question: 'Can you work with our developers?',
        answer:
          'Yes. Our recommendations are delivered as engineering-ready tickets (with exact code snippets, CSS/JS diffs, JSON-LD payloads, and step-by-step QA verification criteria) formatted for Jira, GitHub, or your sprint management system.',
      },
      {
        question: 'Do you fix technical SEO issues or only provide recommendations?',
        answer:
          'We offer both models. We can either collaborate closely with your engineering team providing code-level guidance and staging verification, or execute changes directly inside your CMS / codebase if access is granted.',
      },
      {
        question: 'How long does a technical SEO project take?',
        answer:
          'A comprehensive technical audit and prioritization roadmap typically takes 2 to 3 weeks. Full implementation cycles generally span 4 to 8 weeks depending on engineering resources, followed by 30 to 60 days of post-deployment index monitoring.',
      },
      {
        question: 'Can technical SEO help a website migration?',
        answer:
          'Absolutely. Technical SEO is the single most critical safeguard during a migration. We build 1:1 URL redirect matrices, audit staging servers prior to DNS cutover, verify canonical consistency, and monitor server logs on launch day to prevent traffic loss.',
      },
      {
        question: 'How do you measure technical SEO performance?',
        answer:
          'We measure technical performance through log file crawl frequency, indexation velocity of newly published URLs, elimination of Google Search Console errors, Core Web Vitals compliance scores, and downstream growth in total impressions and organic search visibility.',
      },
    ],
    finalCta: {
      headline: "Find what's preventing your website from being discovered.",
      subheadline:
        "We'll identify the highest-impact technical opportunities before recommending what to do next.",
      buttonText: 'Request a Technical SEO Assessment',
    },
  },
};
