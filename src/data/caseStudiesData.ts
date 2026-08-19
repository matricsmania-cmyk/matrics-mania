export interface CaseStudyArtifact {
  title: string;
  type: string;
  codeSnippet?: string;
  codeLanguage?: string;
  explanation: string;
  highlights: string[];
}

export interface CaseStudyPhase {
  phaseNumber: string;
  phaseName: string;
  duration: string;
  actions: string[];
  deliverables: string[];
}

export interface CaseStudyDetailData {
  slug: string;
  clientName: string;
  clientIndustry: string;
  location: string;
  businessModel: string;
  primaryConstraint: string;
  headline: string;
  subheadline: string;
  heroMetrics: { label: string; value: string; baseline: string }[];
  snapshot: {
    problemStatement: string;
    strategicSolution: string;
    commercialOutcome: string;
    engagementDuration: string;
  };
  contextAndBaseline: {
    marketContext: string;
    trafficComposition: { organic: string; paid: string; referral: string; direct: string };
    coreBlockers: string[];
  };
  theDiagnosis: {
    technicalAuditFindings: string[];
    conversionFriction: string[];
    channelInefficiency: string[];
  };
  executionPhases: CaseStudyPhase[];
  technicalArtifacts: {
    architectureDiagramTitle: string;
    architectureDiagramFlow: string[];
    schemaSnippet: string;
    crmIntegrationDetails: string[];
  };
  commercialResults: {
    headline: string;
    summary: string;
    metricsGrid: { label: string; value: string; period: string }[];
  };
  clientTestimonial: {
    quote: string;
    authorName: string;
    authorRole: string;
    company: string;
  };
  relatedServices: { slug: string; name: string }[];
  relatedIndustrySlug: string;
  relatedIndustryName: string;
  meta: {
    title: string;
    description: string;
  };
}

export const CASE_STUDIES_STORE: Record<string, CaseStudyDetailData> = {
  'velociti-cloud': {
    slug: 'velociti-cloud',
    clientName: 'Velociti Cloud',
    clientIndustry: 'B2B Enterprise SaaS & Cloud Infrastructure',
    location: 'Bangalore & San Francisco',
    businessModel: 'Enterprise Subscription ($24,000 Average Contract Value)',
    primaryConstraint: 'Heavy reliance on paid search with ₹8,200 Cost-Per-Lead and low SQL conversion rates',
    headline: 'Scaling Enterprise Inbound Pipeline by 410% & Growing ARR from ₹1 Cr to ₹10 Cr',
    subheadline:
      'How MatricsMania engineered an organic search moat, sub-second React landing infrastructure, and algorithmic LinkedIn ABM funnels for a high-growth cloud infrastructure platform.',
    heroMetrics: [
      { label: 'Inbound Sales Pipeline', value: '+410%', baseline: 'From ₹1.8 Cr to ₹9.2 Cr quarterly' },
      { label: 'Cost-Per-Qualified-SQL', value: '-62%', baseline: 'Reduced from ₹18,500 to ₹7,030' },
      { label: 'Organic High-Intent Traffic', value: '8.4x', baseline: 'Top-3 rankings on 140+ commercial keywords' },
      { label: 'Annual Recurring Revenue (ARR)', value: '₹10 Cr', baseline: 'Achieved in 14 months of engagement' },
    ],
    snapshot: {
      problemStatement:
        'Velociti Cloud had built a market-leading multi-cloud compliance tool, but was burning ₹18L/month on Google Ads with diminishing returns. Organic search was stagnant due to client-side rendered Single Page Application indexing failures.',
      strategicSolution:
        'We migrated Velociti to an Edge-rendered Next.js/React technical architecture, deployed 48 commercial comparison and integration pages, structured a deep JSON-LD SoftwareApplication entity graph, and recalibrated Google Ads toward down-funnel Salesforce SQL milestones.',
      commercialOutcome:
        'Scaled organic inbound demos to 180+ qualified enterprise meetings per month, reduced blended CAC by 54%, and contributed directly to their ₹10 Cr ARR milestone.',
      engagementDuration: '14-Month Retainer & Systems Build',
    },
    contextAndBaseline: {
      marketContext:
        'Enterprise DevOps and security buyers do not convert on fluffy marketing claims. They search for deep technical documentation, architectural comparisons (e.g., "Velociti vs HashiCorp Vault"), and SOC2/HIPAA compliance validations.',
      trafficComposition: {
        organic: '18%',
        paid: '65%',
        referral: '9%',
        direct: '8%',
      },
      coreBlockers: [
        'Single Page Application (SPA) hid technical content behind JavaScript, preventing complete search engine rendering.',
        'Paid campaigns targeted high-volume broad keywords instead of down-funnel enterprise decision-maker queries.',
        'Demo booking form required 11 form fields on mobile, resulting in an 82% abandonment rate.',
      ],
    },
    theDiagnosis: {
      technicalAuditFindings: [
        'Googlebot was timing out on heavy client JS bundles, leaving 74% of API documentation unindexed.',
        'Zero schema markup implemented — missed Google Knowledge Graph and Generative AI citation opportunities.',
        'Core Web Vitals Largest Contentful Paint (LCP) was 4.2 seconds on mobile.',
      ],
      conversionFriction: [
        'Demo forms lacked calendar sync; sales reps took 28 hours to follow up on leads, resulting in 40% meeting no-shows.',
        'Pricing was obscured behind "Contact Sales" without clear feature tier comparisons.',
      ],
      channelInefficiency: [
        'Google Ads was bidding on non-converting consumer queries like "free cloud storage".',
        'LinkedIn Ads lacked CRM offline conversion tracking to train algorithms on closed-won enterprise accounts.',
      ],
    },
    executionPhases: [
      {
        phaseNumber: '01',
        phaseName: 'Technical Architecture & Edge Rendering Overhaul',
        duration: 'Month 1 – 2',
        actions: [
          'Rebuilt public web layer on Edge-rendered framework achieving 0.68s LCP and 99 PageSpeed score.',
          'Deployed JSON-LD SoftwareApplication, FAQPage, and Organization entity graphs.',
          'Structured automated XML sitemaps for 500+ documentation nodes.',
        ],
        deliverables: ['Sub-second web platform', 'Validated schema graph', '100% crawl indexation'],
      },
      {
        phaseNumber: '02',
        phaseName: 'Topical Authority & ICP Comparison Content Matrix',
        duration: 'Month 3 – 6',
        actions: [
          'Engineered 36 high-intent product comparison pages and 12 technical compliance whitepapers.',
          'Created interactive multi-cloud ROI and compliance savings calculator.',
          'Earned 45 tier-1 authoritative editorial citations from DevOps publications.',
        ],
        deliverables: ['36 Commercial comparison pages', 'Interactive ROI engine', 'Top 3 rankings on 140+ terms'],
      },
      {
        phaseNumber: '03',
        phaseName: 'Down-Funnel Paid Media & Algorithmic ABM',
        duration: 'Month 6 – 14',
        actions: [
          'Connected Salesforce CRM offline conversion events to Google Ads & LinkedIn API.',
          'Restructured campaigns to bid strictly on Stage-2 Sales Qualified Opportunities.',
          'Implemented instant two-step Calendly scheduling with automated WhatsApp reminders.',
        ],
        deliverables: ['Offline CRM bidding pipeline', 'Instant booking flow', '62% Cost-per-SQL reduction'],
      },
    ],
    technicalArtifacts: {
      architectureDiagramTitle: 'Velociti Growth System Flow',
      architectureDiagramFlow: [
        'Edge-Rendered Technical Architecture (0.68s LCP)',
        'Topical Entity Graph & Schema Citation Feeds',
        'Progressive 2-Step Demo Qualification & Calendar Sync',
        'Salesforce CRM Webhook & Offline API Pipeline Bidding',
      ],
      schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Velociti Cloud Compliance Engine",
  "applicationCategory": "SecuritySoftware",
  "operatingSystem": "All Cloud Platforms (AWS, Azure, GCP)",
  "offers": {
    "@type": "Offer",
    "price": "2000",
    "priceCurrency": "USD"
  }
}`,
      crmIntegrationDetails: [
        'LeadSquared / Salesforce REST API Webhook integration triggering within 300ms.',
        'Google Enhanced Conversions passing hashed email and SQL deal value for algorithmic smart bidding.',
        'Automated calendar invites with personalized 1-pager pre-meeting deck.',
      ],
    },
    commercialResults: {
      headline: 'Transforming Inbound Pipeline from an Expense to a Predictable Engine',
      summary:
        'Within 14 months, Velociti Cloud transitioned from high-CAC paid dependency into an industry-leading inbound brand, scaling from ₹1 Cr to ₹10 Cr ARR.',
      metricsGrid: [
        { label: 'Organic Search Share of Voice', value: '68%', period: 'Category Leader' },
        { label: 'Quarterly Inbound Pipeline', value: '₹9.2 Cr', period: 'From ₹1.8 Cr baseline' },
        { label: 'Sales Demo Attendance Rate', value: '94%', period: 'Up from 58%' },
        { label: 'Payback Period on CAC', value: '3.2 Months', period: 'Industry standard: 12mo' },
      ],
    },
    clientTestimonial: {
      quote:
        'MatricsMania completely fundamentally reshaped our acquisition economics. Instead of generic agency presentations, they built engineering-grade search architecture and wired our paid media directly into Salesforce pipeline value. The ₹10 Cr ARR milestone was directly accelerated by their work.',
      authorName: 'Siddharth Menon',
      authorRole: 'Chief Technology Officer & Co-Founder',
      company: 'Velociti Cloud Infrastructure',
    },
    relatedServices: [
      { slug: 'technical-seo', name: 'Technical SEO & Search Architecture' },
      { slug: 'performance-marketing', name: 'Algorithmic Performance Marketing' },
      { slug: 'web-cro-engineering', name: 'Web Systems & CRO Engineering' },
    ],
    relatedIndustrySlug: 'saas',
    relatedIndustryName: 'Enterprise SaaS & Technology',
    meta: {
      title: 'Velociti Cloud Case Study | 410% Pipeline & ₹10 Cr ARR | MatricsMania',
      description: 'See how MatricsMania engineered an organic search moat, sub-second web platform, and algorithmic ABM ads scaling Velociti Cloud from ₹1 Cr to ₹10 Cr ARR.',
    },
  },
  'apex-grandeur': {
    slug: 'apex-grandeur',
    clientName: 'Apex Grandeur Luxury Residences',
    clientIndustry: 'Luxury Real Estate & High-Ticket Housing',
    location: 'Bengaluru (Indiranagar & Whitefield)',
    businessModel: 'Luxury High-Ticket Residential Villas (₹3.5 Cr – ₹8.5 Cr per unit)',
    primaryConstraint: 'Low-quality real estate portal leads and high cost per physical site visit',
    headline: '120 Luxury Units Sold Out in 4 Months with ₹185 Cr Booked Inventory',
    subheadline:
      'Deploying hyperlocal geo-fencing, 3D interactive unit selectors, and automated WhatsApp qualification workflows for a ₹450 Cr luxury residential development.',
    heroMetrics: [
      { label: 'Inventory Sold Value', value: '₹185 Cr', baseline: '120 Ultra-luxury units' },
      { label: 'Verified HNI Inquiries', value: '3,840', baseline: 'Strictly ₹3.5 Cr+ budget qualified' },
      { label: 'Cost Per Verified Site Visit', value: '-46%', baseline: 'Reduced from ₹4,800 to ₹2,590' },
      { label: 'Blended ROAS', value: '8.2x', baseline: 'Directly attributed to digital funnel' },
    ],
    snapshot: {
      problemStatement:
        'Apex Grandeur launched an ultra-luxury residential enclave but struggled with third-party real estate portal leads that consisted primarily of unqualified brokers and low-budget inquiries.',
      strategicSolution:
        'We created a private, high-prestige standalone digital portal with 3D floorplan exploration, hyper-targeted Google Search radius bidding around high-income pin codes, GCC/US NRI campaigns, and an instant OTP-verified site visit booking engine.',
      commercialOutcome:
        'Generated 3,840 verified high-intent inquiries, hosted 410 qualified physical site visits, and sold out Phase 1 (120 units) in under 120 days.',
      engagementDuration: '6-Month Launch Sprint',
    },
    contextAndBaseline: {
      marketContext:
        'Luxury property buyers require trust, transparency, and architectural elegance. Generic portal banners damage brand prestige.',
      trafficComposition: {
        organic: '24%',
        paid: '58%',
        referral: '12%',
        direct: '6%',
      },
      coreBlockers: [
        'Generic aggregators passed stale and duplicated leads.',
        'High no-show rate for weekend site visits due to lack of immediate digital nurture.',
      ],
    },
    theDiagnosis: {
      technicalAuditFindings: [
        'Website was slow to load 4K drone footage, causing 60% mobile bounce rate.',
        'No localized schema for neighborhood landmarks or physical sales office.',
      ],
      conversionFriction: ['No interactive unit floorplan or virtual sunlight simulator.'],
      channelInefficiency: ['Broad Facebook ads targeting general audiences rather than verified HNI demographics.'],
    },
    executionPhases: [
      {
        phaseNumber: '01',
        phaseName: 'High-Prestige Sub-Second Digital Showcase',
        duration: 'Month 1',
        actions: ['Engineered interactive 3D floorplan explorer with sub-800ms loading speeds.'],
        deliverables: ['Custom luxury landing portal', 'Interactive unit selector'],
      },
      {
        phaseNumber: '02',
        phaseName: 'Hyperlocal GEO & NRI Precision Bidding',
        duration: 'Month 2 – 4',
        actions: ['Launched geo-fenced Google Search and Meta video ads across Dubai, Singapore, and Bangalore tech corridors.'],
        deliverables: ['GCC NRI acquisition funnel', 'Bangalore tech corridor campaign'],
      },
    ],
    technicalArtifacts: {
      architectureDiagramTitle: 'Luxury Real Estate High-Ticket Pipeline',
      architectureDiagramFlow: [
        'Hyperlocal & NRI Precision Search Ads',
        'Interactive 3D Virtual Unit Experience',
        'OTP-Verified Budget Qualification Gate',
        'Automated WhatsApp Concierge & CRM Booking',
      ],
      schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Apex Grandeur Luxury Enclave",
  "price": "35000000",
  "priceCurrency": "INR"
}`,
      crmIntegrationDetails: ['LeadSquared and Sell.Do real-time routing with instant SMS/WhatsApp manager notifications.'],
    },
    commercialResults: {
      headline: 'Record-Breaking Phase 1 Sellout in Bengaluru Luxury Sector',
      summary: 'Delivered ₹185 Cr in validated property sales with an unprecedented 8.2x return on digital media spend.',
      metricsGrid: [
        { label: 'Units Sold in Phase 1', value: '120 / 120', period: '100% Sold Out' },
        { label: 'Total Booked Value', value: '₹185 Cr', period: '4 Months' },
        { label: 'Weekend Site Visit Rate', value: '62%', period: 'From verified leads' },
        { label: 'Blended Digital ROAS', value: '8.2x', period: 'Full campaign duration' },
      ],
    },
    clientTestimonial: {
      quote:
        'MatricsMania replaced our reliance on real estate portals with a high-end private acquisition engine. The quality of verified HNI buyers attending weekend site visits was unprecedented.',
      authorName: 'Vikramaditya Roy',
      authorRole: 'Managing Director',
      company: 'Apex Developers Group',
    },
    relatedServices: [
      { slug: 'performance-marketing', name: 'Algorithmic Performance Marketing' },
      { slug: 'web-cro-engineering', name: 'Web Systems & CRO Engineering' },
    ],
    relatedIndustrySlug: 'real-estate',
    relatedIndustryName: 'Real Estate & Property Developers',
    meta: {
      title: 'Apex Grandeur Case Study | ₹185 Cr Sold Out in 4 Months | MatricsMania',
      description: 'How MatricsMania engineered a high-ticket luxury real estate acquisition system selling out 120 units in Bengaluru.',
    },
  },
};
