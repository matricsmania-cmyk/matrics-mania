export interface LocationDetailData {
  slug: string;
  name: string;
  state: string;
  country: string;
  heroBadge: string;
  h1: string;
  tagline: string;
  overview: string;
  marketDescription: string;
  stats: { label: string; value: string; note: string }[];
  sectors: { name: string; desc: string }[];
  services: {
    number: string;
    title: string;
    capabilities: string[];
    slug: string;
  }[];
  techCorridors: {
    name: string;
    hubType: string;
    description: string;
  }[];
  whyLocationMatters: {
    title: string;
    desc: string;
  }[];
  address: {
    title: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    hours: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  faqs: {
    q: string;
    a: string;
  }[];
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
}

export const LOCATIONS_DATA: Record<string, LocationDetailData> = {
  bangalore: {
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    heroBadge: 'BANGALORE REGIONAL HEADQUARTERS',
    h1: 'Digital Marketing & Growth Engineering in Bangalore',
    tagline: 'We build digital systems that help Bangalore businesses grow predictably.',
    overview:
      'From Indiranagar to Whitefield, Outer Ring Road, and Electronic City — MatricsMania delivers precision search architecture, AI visibility, pipeline-weighted performance media, and sub-second web engineering for technology companies, SaaS platforms, real estate developers, and high-growth enterprises across Bengaluru.',
    marketDescription:
      'Bangalore is India’s high-velocity technology and enterprise capital. Competing here requires engineering-grade digital infrastructure, not generic marketing templates.',
    stats: [
      { label: 'Technology Corridors Covered', value: '100%', note: 'ORR, Whitefield, Indiranagar, HSR, Koramangala' },
      { label: 'Enterprise Pipeline Influenced', value: '₹420+ Cr', note: 'Measurable pipeline revenue across client systems' },
      { label: 'Average Organic CAC Reduction', value: '-38%', note: 'Through programmatic and technical search moats' },
      { label: 'Average Core Web Vitals LCP', value: '0.78s', note: 'Sub-second performance engineering standards' },
    ],
    sectors: [
      { name: 'Enterprise SaaS & Cloud', desc: 'B2B subscription platforms scaling US, European, and domestic pipeline.' },
      { name: 'Growth-Stage Startups', desc: 'Venture-backed technology innovators scaling qualified demo velocity.' },
      { name: 'Commercial & Luxury Real Estate', desc: 'High-ticket developers selling Grade-A offices and luxury residential inventory.' },
      { name: 'Healthcare & Life Sciences', desc: 'Specialized hospital networks, healthtech platforms, and diagnostic centers.' },
      { name: 'Professional & Legal Services', desc: 'High-intent consulting firms, intellectual property practices, and corporate advisors.' },
      { name: 'High-Ticket D2C & Ecommerce', desc: 'Premium brands scaling high-AOV customer acquisition with sustainable ROAS.' },
    ],
    services: [
      {
        number: '01',
        title: 'Search & AI Visibility (GEO / AEO)',
        capabilities: ['Technical SEO & Crawl Budget Optimization', 'Generative Engine Optimization (GEO)', 'JSON-LD Entity Graph Architecture', 'Answer Engine Citations (ChatGPT / Perplexity)'],
        slug: 'technical-seo',
      },
      {
        number: '02',
        title: 'Algorithmic Performance Media',
        capabilities: ['Google Search & Performance Max', 'LinkedIn Account-Based (ABM) B2B Ads', 'Meta Direct Response & High-AOV Funnels', 'Down-Funnel SQL Pipeline Bidding'],
        slug: 'performance-marketing',
      },
      {
        number: '03',
        title: 'Web Systems & CRO Engineering',
        capabilities: ['Sub-Second React & Edge Web Architecture', 'Multi-Step Progressive Lead Qualification Funnels', 'Real-Time CRM & Webhook Pipeline Sync', 'Frictionless Mobile Conversion Optimization'],
        slug: 'web-cro-engineering',
      },
      {
        number: '04',
        title: 'Topical Authority & Content Systems',
        capabilities: ['Semantic Entity & Topic Cluster Mapping', 'Original Research Benchmark Studies', 'Executive B2B Thought Leadership', 'Commercial ICP Search Intent Guides'],
        slug: 'content-authority',
      },
    ],
    techCorridors: [
      {
        name: 'Outer Ring Road (ORR) & Bellandur',
        hubType: 'Global Technology Parks & SaaS HQs',
        description: 'Delivering international pipeline and enterprise SEO for large-scale SaaS firms and global capability centers.',
      },
      {
        name: 'Whitefield & ITPL Corridor',
        hubType: 'Tech Campuses & Manufacturing Tech',
        description: 'Engineering high-intent B2B search moats and ABM LinkedIn lead generation funnels.',
      },
      {
        name: 'Indiranagar & CBD (MG Road / Lavelle)',
        hubType: 'Executive Agencies & Real Estate Developers',
        description: 'Strategic growth consulting, high-ticket real estate sales funnels, and luxury D2C brand scaling.',
      },
      {
        name: 'HSR Layout & Koramangala',
        hubType: 'Startup Hubs & Venture Innovators',
        description: 'High-velocity CAC reduction, organic search expansion, and conversion optimization.',
      },
    ],
    whyLocationMatters: [
      {
        title: 'Asynchronous Speed with Local Grounded Context',
        desc: 'We combine local market fluency with modern async sprint execution. No endless status meetings — only weekly milestone outputs and real-time dashboard visibility.',
      },
      {
        title: 'Engineered for International & Domestic Markets',
        desc: 'Most Bangalore tech companies sell to North America and Europe while operating locally. We design campaigns configured for multi-timezone B2B sales cycles.',
      },
      {
        title: 'Direct Strategic Access to Principals',
        desc: 'You work directly with principal growth architects and technical leads who write code and analyze data, not junior account managers.',
      },
    ],
    address: {
      title: 'MatricsMania Digital Systems — Bengaluru Office',
      street: 'Indiranagar 100ft Road, 4th Block',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'IN',
      phone: '+91 (80) 4567-8900',
      email: 'hello@matricsmania.com',
      hours: 'Mon – Fri: 9:00 AM – 7:00 PM IST',
      geo: {
        lat: 12.9716,
        lng: 77.6412,
      },
    },
    faqs: [
      {
        q: 'Do we need to meet physically in Bangalore or can we work remotely?',
        a: 'We operate on a digital-first, sprint-based model that works seamlessly for distributed and local teams. We are also available for physical architectural kickoffs at our Indiranagar office.',
      },
      {
        q: 'How does MatricsMania differ from traditional Bangalore digital agencies?',
        a: 'Traditional agencies sell generic retainer packages with vanity metrics (clicks, impressions). We operate as growth engineers — building technical search moats, sub-second web experiences, and down-funnel CRM pipeline attribution.',
      },
      {
        q: 'Can you help Bangalore SaaS companies expand to the US and Europe?',
        a: 'Yes. Over 60% of our tech clients are Bangalore-headquartered firms acquiring customers across North America, the UK, and the GCC with optimized multi-currency and regional funnels.',
      },
      {
        q: 'What is your typical engagement timeline?',
        a: 'We offer fixed-scope 6-week architecture sprints (e.g. Technical SEO overhaul, CRO funnel build) as well as continuous multi-quarter growth retainers focused on recurring pipeline expansion.',
      },
    ],
    meta: {
      title: 'Digital Marketing Agency Bangalore | Search, AI, Paid Media & CRO | MatricsMania',
      description: 'MatricsMania is Bangalore’s premier digital growth and performance engineering agency. We build technical SEO systems, AI search visibility, and high-ROAS acquisition engines.',
      canonical: 'https://matricsmania.com/locations/bangalore/',
    },
  },
};
