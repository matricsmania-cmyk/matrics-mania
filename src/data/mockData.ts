import { BlogPost, InsightItem, ServiceItem, CaseStudy, WorkProject, TeamMember, Testimonial, FAQItem } from '../types';

export const AGENCY_METRICS = [
  { label: 'Client Revenue Growth', value: '60%' },
  { label: 'Average ROAS Delivered', value: '4.6x' },
  { label: 'Organic Traffic Grown', value: '2K' },
  { label: 'Client Retention Rate', value: '96%' },
];

export const CLIENT_LOGOS = [
  { name: 'Velociti SaaS', logo: '⚡ Velociti' },
  { name: 'Aura Health', logo: '🌿 Aura' },
  { name: 'Krypton Pay', logo: '💎 Krypton' },
  { name: 'Nova Ecommerce', logo: '🚀 NovaShop' },
  { name: 'OmniCloud', logo: '☁️ OmniCloud' },
  { name: 'Peak Financial', logo: '📈 PeakFin' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seo-growth',
    title: 'Search Engine Optimization (SEO)',
    category: 'Organic Growth',
    iconName: 'Search',
    shortDesc: 'Dominate Google search results with technical SEO, semantic content clusters, and high-authority link acquisition.',
    fullDesc: 'Matricsmania SEO goes beyond simple keyword tracking. We engineer technical architecture, optimize schema structured data, construct topical authority pillars, and execute PR outreach to establish permanent industry dominance.',
    features: [
      'Technical SEO Audit & Core Web Vitals Optimization',
      'Topical Authority Keyword Mapping',
      'Programmatic Content Generation & Optimization',
      'High-DR Link Building & Digital PR',
      'Local & Global GEO-targeted SEO Strategy'
    ],
    metrics: [
      { label: 'Avg Organic Lead Surge', value: '+280%' },
      { label: 'Top 3 Keyword Ranks', value: '14,000+' }
    ],
    processSteps: [
      { step: '01', title: 'Deep Site Audit', description: 'Crawl 500+ site health signals and competitor gap metrics.' },
      { step: '02', title: 'Topical Architecture', description: 'Design content pillars and intent-based keyword structures.' },
      { step: '03', title: 'Execution & PR', description: 'Optimize code, publish high-converting content, and build high-tier links.' },
      { step: '04', title: 'Iterative Ranking', description: 'Weekly position tracking, schema adjustments, and ROI reporting.' }
    ],
    priceStarting: '',
    recommendedFor: 'B2B SaaS, E-Commerce, Scale-ups seeking predictable inbound pipeline.'
  },
  {
    id: 'ppc-advertising',
    title: 'Pay-Per-Click Advertising (PPC)',
    category: 'Paid Acquisition',
    iconName: 'Target',
    shortDesc: 'Scale revenue aggressively across Google Ads, Meta Ads, LinkedIn, and TikTok with high-ROAS creative funnels.',
    fullDesc: 'We maximize every ad rupee spent. By combining AI audience segmentation, dynamic creative variations, and custom landing page funnels, we consistently deliver scalable customer acquisition with zero ad waste.',
    features: [
      'Google Search, Shopping & Performance Max Campaigns',
      'Meta (Facebook & Instagram) Direct Response Ads',
      'LinkedIn Account-Based Marketing (ABM) for B2B',
      'TikTok & YouTube Video Ad Campaigns',
      'Automated Bid Management & Conversion Rate Optimization'
    ],
    metrics: [
      { label: 'Average ROAS Multiplier', value: '4.8x' },
      { label: 'Ad Spend Managed', value: '₹180 Cr+' }
    ],
    processSteps: [
      { step: '01', title: 'Audience & Offer Audit', description: 'Uncover audience micro-segments and craft high-converting offers.' },
      { step: '02', title: 'Creative Studio Production', description: 'Design high-CTR video hooks, stat carousels, and landing pages.' },
      { step: '03', title: 'Multi-Channel Launch', description: 'Deploy campaign structures with tight match types and target CAC.' },
      { step: '04', title: 'Scale & Retarget', description: 'Double down on winning creatives and optimize full-funnel retargeting.' }
    ],
    priceStarting: '',
    recommendedFor: 'E-commerce, D2C brands, and growth stage B2B companies seeking high ROAS.'
  },
  {
    id: 'social-media-growth',
    title: 'Social Media & Brand Growth',
    category: 'Brand Strategy',
    iconName: 'Share2',
    shortDesc: 'Build an obsessed community and viral brand presence across LinkedIn, X, Instagram, and YouTube.',
    fullDesc: 'Transform static corporate profiles into organic growth engines. We craft scroll-stopping visual content, executive thought leadership, and interactive community campaigns that drive organic virality.',
    features: [
      'Full-Funnel Content Calendar Strategy & Production',
      'Executive Thought Leadership ghostwriting (X & LinkedIn)',
      'Short-Form Video Reels & Shorts Editing',
      'Community Management & Influencer Collaborations',
      'Social Listening & Trend Hijacking'
    ],
    metrics: [
      { label: 'Organic Impressions Generated', value: '45M+' },
      { label: 'Avg Engagement Rate Growth', value: '+340%' }
    ],
    processSteps: [
      { step: '01', title: 'Brand Identity Blueprint', description: 'Define tone of voice, visual direction, and pillar narratives.' },
      { step: '02', title: 'Batch Content Production', description: 'Produce studio-grade graphics, video scripts, and carousels.' },
      { step: '03', title: 'Active Distribution', description: 'Publish at optimal frequency across target platforms.' },
      { step: '04', title: 'Community Acceleration', description: 'Engage industry creators and foster high-intent conversations.' }
    ],
    priceStarting: '',
    recommendedFor: 'Brands looking to lead industry voice and generate organic referral loops.'
  },
  {
    id: 'content-marketing',
    title: 'Content & Inbound Strategy',
    category: 'Organic Growth',
    iconName: 'FileText',
    shortDesc: 'High-converting eBooks, whitepapers, thought leadership articles, and lead magnet engines.',
    fullDesc: 'Turn readers into paying customers with high-intent editorial content. We combine journalistic precision with conversion copywriting to position your brand as the undisputed market authority.',
    features: [
      'Long-form Thought Leadership Articles',
      'Interactive Lead Magnets & Whitepapers',
      'Email Marketing Automation & Nurture Sequences',
      'Case Study & Customer Success Story Production',
      'Content Distribution & Syndication Networks'
    ],
    metrics: [
      { label: 'MQL Conversion Surge', value: '+195%' },
      { label: 'Whitepaper Downloads', value: '85k+' }
    ],
    processSteps: [
      { step: '01', title: 'Content Audit & Matrix', description: 'Identify buyer journey gaps and high-converting topic angles.' },
      { step: '02', title: 'Subject Matter Interviews', description: 'Extract unique insights from founders and tech leads.' },
      { step: '03', title: 'Drafting & Design', description: 'Write polished copies and format with custom graphics.' },
      { step: '04', title: 'Nurture & Distribution', description: 'Setup automated email drip triggers to convert leads.' }
    ],
    priceStarting: '',
    recommendedFor: 'Companies with long sales cycles requiring trust and education.'
  },
  {
    id: 'cro-web-engineering',
    title: 'Conversion Rate Optimization & Web Dev',
    category: 'Conversion Tech',
    iconName: 'Code',
    shortDesc: 'Ultra-fast, responsive web experiences designed to turn visitor traffic into booked calls and sales.',
    fullDesc: 'A great campaign fails if your website leaks traffic. We build lightning-fast web applications and high-converting landing pages backed by heatmaps, A/B testing, and friction-free user journeys.',
    features: [
      'Custom React/Next.js/Vite High-Speed Web Development',
      'Figma UI/UX Design & Interactive Prototypes',
      'A/B Split Testing & Heatmap Behavioral Analytics',
      'Landing Page Conversion Engineering',
      'Seamless CRM & Marketing Automation Integrations'
    ],
    metrics: [
      { label: 'Average Conversion Lift', value: '+84%' },
      { label: 'Page Load Speed', value: '< 0.8s' }
    ],
    processSteps: [
      { step: '01', title: 'UX Friction Audit', description: 'Identify drop-off points with session recordings and heatmaps.' },
      { step: '02', title: 'High-Converting Wireframes', description: 'Design landing pages centered on clear value props and CTAs.' },
      { step: '03', title: 'Clean Full-Stack Code', description: 'Develop pixel-perfect, accessible, and ultra-fast web pages.' },
      { step: '04', title: 'Continuous A/B Tests', description: 'Run multivariate tests on headlines, buttons, and forms.' }
    ],
    priceStarting: '',
    recommendedFor: 'Businesses wanting to double their current conversion rate without paying for more traffic.'
  },
  {
    id: 'analytics-marketing-ai',
    title: 'Marketing Analytics & AI Intelligence',
    category: 'Data & Tech',
    iconName: 'BarChart3',
    shortDesc: 'Real-time custom Looker dashboards, multi-touch attribution, and predictive AI growth modeling.',
    fullDesc: 'Eliminate marketing guesswork. We build single-source-of-truth executive dashboards that tie every ad rupee directly to customer lifetime value (LTV) and net profit.',
    features: [
      'GA4 Advanced Server-Side Event Tracking',
      'Multi-Touch Revenue Attribution Modeling',
      'Custom Live Looker Studio & PowerBI Dashboards',
      'Predictive Customer LTV & Churn AI Analytics',
      'Automated Weekly KPI Alerts & Insights Reports'
    ],
    metrics: [
      { label: 'Attribution Accuracy', value: '99.4%' },
      { label: 'Hours Saved Monthly', value: '40+ hrs' }
    ],
    processSteps: [
      { step: '01', title: 'Data Architecture Setup', description: 'Fix broken pixel triggers and implement server-side GA4.' },
      { step: '02', title: 'Attribution Modeling', description: 'Connect CRM, ad accounts, and Stripe to unified pipeline.' },
      { step: '03', title: 'Dashboard Customization', description: 'Build live C-suite executive performance panels.' },
      { step: '04', title: 'Predictive Insights', description: 'Deliver actionable AI growth recommendations weekly.' }
    ],
    priceStarting: '',
    recommendedFor: 'CMOs and CEOs who need transparent ROI metrics across multi-channel spending.'
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'velociti-saas',
    clientName: 'Velociti Cloud',
    industry: 'B2B Enterprise SaaS',
    logo: '⚡ Velociti',
    title: 'Scaling Inbound Pipeline from ₹1 Crore to ₹10 Crore ARR in 9 Months',
    challenge: 'Velociti relied heavily on expensive outbound sales with a 14% demo conversion rate and non-existent organic search traffic.',
    solution: 'Matricsmania rebuilt their technical SEO foundation, engineered 20 semantic search silos, and launched hyper-targeted LinkedIn ABM campaigns.',
    results: [
      { metric: '+410%', label: 'Organic Inbound Leads' },
      { metric: '₹10 Cr', label: 'New ARR Added' },
      { metric: '-42%', label: 'Cost Per Acquisition' }
    ],
    testimonialQuote: 'Matricsmania transformed our growth trajectory. Their mathematical approach to SEO and paid ads delivered predictable sales calls month after month.',
    clientAuthor: 'Marcus Vance',
    clientRole: 'VP of Marketing, Velociti',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const WORK_PROJECTS_DATA: WorkProject[] = [
  {
    id: 'scaling-inbound-pipeline',
    title: 'Enterprise SaaS Demand Engine & LinkedIn ABM',
    client: 'Velociti SaaS Systems',
    category: 'Paid Creative & Ads',
    industry: 'B2B Enterprise SaaS',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    summary: 'Designed multi-touch Account-Based Marketing ad creatives and high-converting interactive software product demo funnels.',
    scope: [
      'LinkedIn ABM Ad Creatives & Motion Hooks',
      'Interactive Product Tour Landing Page',
      'Meta CAPI Server-Side Lead Attribution',
      'HubSpot CRM Pipeline Qualification Routing'
    ],
    tools: ['Figma', 'LinkedIn Ads Manager', 'HubSpot', 'Next.js', 'Google Tag Manager'],
    keyMetric: {
      value: '+410%',
      label: 'Qualified Inbound Pipeline Leads'
    },
    beforeAfter: {
      before: '14% demo conversion rate via slow email outreach',
      after: '42% interactive demo completion with instant calendar booking'
    },
    caseStudyId: 'velociti-saas'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'The 2026 SEO Blueprint: How Semantic Search & AI Overviews Are Changing Organic Rankings',
    slug: 'the-2026-seo-blueprint',
    excerpt: 'Traditional keyword stuffing is dead. Discover how vector embeddings, entity relationships, structured schema, and GEO (Generative Engine Optimization) dictate top Google search visibility in 2026.',
    wordCount: 1840,
    category: 'SEO & Growth',
    publishedAt: 'August 8, 2026',
    readTime: '9 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    tags: ['SEO', 'AI Search', 'Core Web Vitals', 'Generative Engine', 'Vector Search'],
    keyTakeaways: [
      'Transition content from basic keyword targeting to multidimensional semantic entity maps.',
      'Optimize for Generative AI summaries by including data-dense tables, verified metrics, and direct answers.',
      'Maintain sub-second server response times and zero Cumulative Layout Shift (CLS) for maximal crawling depth.',
      'Implement custom JSON-LD Schema markup for every entity, product, review, and author credential.'
    ],
    author: {
      name: 'Alex Vance',
      role: 'Head of Technical SEO & Data Architecture',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Alex has spearheaded organic search strategy for multi-million ARR SaaS platforms and global e-commerce powerhouses, generating over 45M organic pageviews.'
    },
    content: `
Search Engine Optimization in 2026 has undergone its most dramatic evolution since RankBrain. The arrival of Google AI Overviews, conversational search assistants, and vector-based semantic retrieval engines means that traditional keyword density strategies no longer produce sustainable organic growth.

Modern search engines do not read web pages as strings of text; they parse them as multidimensional knowledge graphs composed of interconnected entities, claims, and verified facts. If your content lacks structural density, primary research data, and explicit schema architecture, it will be ignored by both classical indexing bots and generative AI summaries.

In this deep dive, we outline the exact 4-pillar technical SEO framework Matricsmania uses to secure tier-1 rankings for enterprise SaaS platforms, financial institutions, and fast-scaling D2C brands.
    `,
    sections: [
      {
        id: 'entity-mapping',
        title: '1. The Evolution from Keywords to Semantic Entity Maps',
        content: `
Historically, SEO agencies targeted individual search queries (e.g., "best CRM for SaaS"). In 2026, search algorithms map queries to underlying *Entities*—distinct concepts, objects, or brands stored in knowledge vaults.

When a user searches for a solution, Google evaluates your domain's **Topical Authority Score (TAS)** across the entire entity graph. If your website only publishes fragmented 500-word articles without depth, search crawlers mark your domain as low-authority.

To build semantic completeness:
• Map out core industry entities, parent attributes, and child concepts.
• Answer primary, secondary, and tertiary intent variations within unified topic silos.
• Interlink pages using descriptive entity anchor text rather than generic 'click here' links.
        `,
        keyPoints: [
          'Knowledge Graphs evaluate entity relationships rather than simple keyword frequencies.',
          'Topical authority requires covering parent, child, and lateral sub-topics thoroughly.',
          'Anchor text must reinforce semantic context across internal linking silos.'
        ],
        quote: 'In 2026, Google does not rank pages; it ranks trusted authority nodes within specific knowledge domains.'
      },
      {
        id: 'geo-framework',
        title: '2. Generative Engine Optimization (GEO): Winning AI Overview Citations',
        content: `
Over 65% of commercial search queries now generate an inline AI Overview. To be featured as a cited source inside AI summaries, your content must satisfy Generative Engine Optimization (GEO) standards.

AI summarization models favor content that contains:
1. **Verified Numerical Data**: Specific percentages, revenue figures, and case study outcomes.
2. **Direct Answer Block**: A concise 40–60 word paragraph at the top of each sub-section directly defining the topic.
3. **Structured HTML Tables**: AI crawlers pull table rows directly into user response windows.
        `,
        table: {
          headers: ['Optimization Dimension', 'Traditional SEO Strategy', '2026 GEO Framework'],
          rows: [
            ['Targeting Unit', 'Individual Keyword Strings', 'Multidimensional Entity Graphs'],
            ['Content Format', 'Fluffy 2,000 word blog posts', 'Data-dense structured modules & tables'],
            ['Credibility Signal', 'Backlink count alone', 'Primary research + Author Schema + Citation Graph'],
            ['User Experience', 'Ad-heavy scroll traps', 'Sub-second render with zero layout shifts']
          ]
        }
      },
      {
        id: 'technical-schema',
        title: '3. Technical Schema Architecture & JSON-LD Entity Injection',
        content: `
Search engines require unambiguous JSON-LD schema markup to classify your site. Below is the precise schema snippet Matricsmania embeds on client article hubs to feed knowledge graphs:
        `,
        codeSnippet: `{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "The 2026 Technical SEO Blueprint",
  "author": {
    "@type": "Person",
    "name": "Alex Vance",
    "jobTitle": "Head of Technical SEO",
    "sameAs": ["https://linkedin.com/in/alexvance-seo"]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Matricsmania",
    "logo": "https://matricsmania.com/logo.png"
  },
  "about": [
    { "@type": "Thing", "name": "Semantic Search" },
    { "@type": "Thing", "name": "Generative Engine Optimization" }
  ]
}`
      },
      {
        id: 'core-web-vitals',
        title: '4. Performance Engineering & Core Web Vitals Optimization',
        content: `
Page speed is no longer just a minor ranking tie-breaker; it is an absolute requirement for indexation. Google’s 2026 crawling infrastructure penalizes slow, JavaScript-heavy sites that consume excessive server execution time.

Key performance benchmarks required for top 3 rankings:
• **Interaction to Next Paint (INP)**: Less than 120 milliseconds.
• **Largest Contentful Paint (LCP)**: Less than 0.8 seconds.
• **Cumulative Layout Shift (CLS)**: Exactly 0.00.

By implementing server-side HTML streaming, next-gen image compression, and edge caching via Cloudflare, Matricsmania clients consistently achieve 98+ PageSpeed scores on mobile devices.
        `,
        keyPoints: [
          'Sub-second LCP ensures max indexing efficiency by search engine bots.',
          'Zero CLS prevents user frustration and improves conversion rates.',
          'Edge caching and pre-rendered static shells eliminate server response latency.'
        ]
      }
    ]
  }
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: 'm1',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    bio: 'Former Tech Lead & Growth Strategist with 12+ years of experience scaling tech startups from zero to multi-million ARR.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: '#', twitter: '#', email: 'marcus@matricsmania.com' },
    specialties: ['Growth Architecture', 'Enterprise Marketing', 'PPC Strategy']
  },
  {
    id: 'm2',
    name: 'Sarah Chen',
    role: 'VP of Paid Media',
    bio: 'Managed over $35M in global media spend across Meta, Google, TikTok, and LinkedIn with an average 4.8x ROAS across accounts.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: '#', twitter: '#', email: 'sarah@matricsmania.com' },
    specialties: ['Omnichannel Ads', 'Algorithmic Bidding', 'Conversion Funnels']
  },
  {
    id: 'm3',
    name: 'Alex Vance',
    role: 'Head of Technical SEO',
    bio: 'Organic search specialist behind top 3 search rankings for enterprise software, e-commerce, and financial institutions.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: '#', twitter: '#', email: 'alex@matricsmania.com' },
    specialties: ['Semantic Search', 'Programmatic SEO', 'Core Web Vitals']
  },
  {
    id: 'm4',
    name: 'Michael Ross',
    role: 'Lead CRO & Web Engineer',
    bio: 'Passionate about lightning-fast UI performance and conversion engineering. Created high-converting web apps for top YC founders.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: '#', twitter: '#', email: 'michael@matricsmania.com' },
    specialties: ['Full-Stack Dev', 'UX Heatmap Testing', 'Behavioral Science']
  },
  {
    id: 'm5',
    name: 'Jessica Taylor',
    role: 'Director of Brand Content',
    bio: 'Award-winning copywriter and editorial director skilled in transforming corporate messaging into irresistible storytelling.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    socials: { linkedin: '#', twitter: '#', email: 'jessica@matricsmania.com' },
    specialties: ['Executive Ghostwriting', 'Lead Magnets', 'Brand Identity']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: 'Matricsmania is the single best investment our company made this year. They took our organic search traffic from 5k to over 140k monthly visitors in under 8 months.',
    name: 'David Sterling',
    role: 'CMO',
    company: 'Peak Financial Group',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    metricHighlight: '+2,700% Organic Growth'
  },
  {
    id: 't2',
    quote: 'Their data-driven ad strategy enabled us to double our monthly ad budget while actually INCREASING our overall ROAS from 2.9x to 5.1x.',
    name: 'Elena Rostova',
    role: 'Founder',
    company: 'Nova Luxury Apparel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    metricHighlight: '5.1x Blended ROAS'
  },
  {
    id: 't3',
    quote: 'Unlike traditional agencies that send useless PDF reports, Matricsmania built us a live Looker dashboard connected directly to Stripe revenue.',
    name: 'Brandon Kim',
    role: 'Head of Growth',
    company: 'Krypton Pay',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    metricHighlight: '100% Attribution Transparency'
  },
  {
    id: 't4',
    quote: 'The website redesign and CRO sprint they executed boosted our demo request form conversion rate from 1.8% to 4.4% overnight.',
    name: 'Sophia Martinez',
    role: 'VP of Product',
    company: 'Aura Health',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    metricHighlight: '2.4x Demo Conversion Rate'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What makes Matricsmania different from standard marketing agencies?',
    answer: 'Matricsmania focuses on mathematical rigor, data transparency, and revenue attribution. We do not report vanity metrics like impressions or clicks without tying them directly to sales, pipeline value, and customer acquisition costs (CAC).'
  },
  {
    id: 'faq-2',
    category: 'Onboarding',
    question: 'How fast can we start after signing the agreement?',
    answer: 'Our standard onboarding sequence takes 3 to 5 business days. During this time, we complete full technical pixel setup, ad account audits, buyer persona mapping, and present your 90-day growth roadmap.'
  },
  {
    id: 'faq-3',
    category: 'Pricing',
    question: 'Do you work on monthly retainers or performance milestones?',
    answer: 'We offer flexible retainer structures tailored to your growth goals as well as performance-based hybrid models for qualified scale-ups.'
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'Will I have a dedicated account strategist?',
    answer: 'Yes! Every client is assigned a Senior Growth Strategist who serves as your single point of contact alongside specialized leads in SEO, Paid Media, and CRO.'
  },
  {
    id: 'faq-5',
    category: 'Services',
    question: 'Can you work alongside our in-house marketing team?',
    answer: 'Absolutely. Over 60% of our clients have internal marketing teams. We act as an expert force multiplier handling technical execution, paid media scaling, or specialized SEO research.'
  },
  {
    id: 'faq-6',
    category: 'Pricing',
    question: 'Is there a long-term contract lock-in?',
    answer: 'No long-term handcuffs. Our initial commitment is a 90-day initial growth validation sprint, after which services continue on a flexible month-to-month basis with 30 days notice.'
  }
];

export const MILESTONES_DATA = [
  { year: '2021', title: 'Agency Foundation', description: 'Matricsmania launched in Bengaluru as a specialized data analytics & SEO consultancy.' },
  { year: '2023', title: 'Multi-Channel Scaling', description: 'Expanded into full-funnel performance ads (Meta, Google, YouTube) & CRO web engineering.' },
  { year: '2024', title: 'AI Intelligence Suite Launch', description: 'Integrated predictive customer lifetime value models & server-side attribution engines.' },
  { year: '2026', title: 'Global Impact & Regional Presence', description: 'Now managing growth portfolios across India, APAC, Europe, and North America.' }
];

export const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 'ins-1',
    title: 'The 2026 State of B2B SaaS Growth & Pipeline Benchmarks Report',
    slug: 'state-of-b2b-saas-growth-2026',
    category: 'Benchmark Report',
    type: 'Research Report',
    excerpt: 'An empirical research study evaluating CAC, LTV, demo conversion rates, and multi-channel attribution across 180+ growth-stage SaaS companies.',
    publishedAt: 'August 12, 2026',
    readTime: '12 min read',
    downloadablePdf: '/docs/State_of_B2B_SaaS_Growth_2026.pdf',
    keyMetrics: [
      { label: 'Avg Outbound CAC Surge', value: '+34%' },
      { label: 'Top Inbound ROAS', value: '4.8x' },
      { label: 'Demo Conversion Rate', value: '3.8%' },
      { label: 'Attribution Drift Rate', value: '-28%' }
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Marcus Vance',
      role: 'Chief Executive Officer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      bio: 'Marcus analyzes macro marketing trends and pipeline dynamics across B2B software and digital enterprises.'
    },
    summaryPoints: [
      'Outbound sales efficiency decreased by 34% due to email spam filters and lower SDR response rates.',
      'Inbound semantic SEO and LinkedIn ABM delivered a 4.8x higher ROI compared to traditional cold outreach.',
      'Companies implementing server-side CAPI and multi-touch attribution reduced customer acquisition cost by 28%.'
    ],
    fullReportContent: `
This benchmark report aggregates real performance metrics from over 180 B2B SaaS companies generating between $1M and $25M ARR. Our data science team analyzed ad spend, organic search rankings, conversion funnels, and CRM pipeline progressions to identify key factors separating market leaders from trailing startups.

Key Finding 1: Outbound SDR effectiveness has dropped to historic lows. SDRs now require 3.4x more activities to book a single qualified demo compared to 2023.

Key Finding 2: High-intent organic search and LinkedIn Account-Based Marketing (ABM) are driving 72% of closed-won pipeline ARR.
    `,
    sections: [
      {
        id: 'cac-trends',
        title: '1. CAC Inflation & Channel Efficiency Shifting',
        content: `
Customer Acquisition Cost (CAC) across B2B SaaS increased by an average of 34% year-over-year for outbound channels, while inbound semantic SEO and interactive sandbox demos reduced blended CAC by 28%.
        `,
        dataPoints: [
          { label: 'Outbound Cold Email CAC', value: '₹1,45,000 / demo' },
          { label: 'Inbound Semantic Search CAC', value: '₹42,000 / demo' },
          { label: 'LinkedIn ABM Qualified CAC', value: '₹68,000 / demo' }
        ],
        table: {
          headers: ['Acquisition Channel', 'Avg Cost Per Demo', 'Closing Win Rate', 'Payback Period'],
          rows: [
            ['Inbound Organic Search (SEO)', '₹42,000', '28.4%', '4.2 Months'],
            ['LinkedIn Account-Based Ads', '₹68,000', '22.1%', '6.1 Months'],
            ['Google Search Ads', '₹85,000', '18.6%', '7.8 Months'],
            ['Outbound Cold Calling & SDRs', '₹1,45,000', '11.2%', '14.5 Months']
          ]
        }
      },
      {
        id: 'attribution-gap',
        title: '2. Multi-Touch Attribution & First-Party Data Architecture',
        content: `
Over 82% of SaaS executives surveyed admitted that last-click Google Analytics reports misattributed major enterprise deals. Adopting first-party server-side tracking (CAPI + CRM integration) restored pipeline visibility and allowed marketing leads to reallocate budget effectively.
        `
      }
    ]
  },
  {
    id: 'ins-2',
    title: 'Generative AI & LLM Search Visibility Index 2026',
    slug: 'ai-search-visibility-benchmark-2026',
    category: 'Industry Study',
    type: 'Data Benchmark',
    excerpt: 'How 500 leading enterprise software brands are cited across ChatGPT, Perplexity AI, Google AI Overviews, and Claude.',
    publishedAt: 'August 04, 2026',
    readTime: '10 min read',
    downloadablePdf: '/docs/AI_Search_Visibility_Index_2026.pdf',
    keyMetrics: [
      { label: 'Avg AI Overview Citation Share', value: '41%' },
      { label: 'Top Ranking Factor', value: 'Entity Schema' },
      { label: 'Vector Similarity Threshold', value: '0.84' }
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Alex Vance',
      role: 'Head of Technical SEO & Data Architecture',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Alex researches generative search engines, vector retrieval architectures, and schema optimization.'
    },
    summaryPoints: [
      'Over 60% of technical B2B buyer queries now yield an AI Overview before traditional organic web links.',
      'Websites with rich JSON-LD TechArticle and FAQ schema receive 3.2x more AI citations.',
      'First-party research data and verified statistics increase Perplexity and Claude recommendation odds by 88%.'
    ],
    fullReportContent: `
The Generative AI Search Visibility Index evaluates how modern large language models index, retrieve, and cite web pages when answering commercial buyer prompts. Our study analyzed 12,000 industry queries across ChatGPT, Perplexity, Google AI Overviews, and Claude.

Key Finding: LLM search engines prioritize structured data tables and unambiguous entity definitions over backlink quantity.
    `
  },
  {
    id: 'ins-3',
    title: 'Q4 Festive Season D2C E-Commerce Paid Media ROI Audit',
    slug: 'd2c-ecommerce-festive-media-roi-2026',
    category: 'ROI Audit',
    type: 'Market Teardown',
    excerpt: 'An exhaustive analysis of ₹250 Crore+ in festive ad spend across Meta, TikTok, Google Ads, and Instagram Reels.',
    publishedAt: 'July 20, 2026',
    readTime: '9 min read',
    downloadablePdf: '/docs/D2C_Festive_Media_ROI_Audit_2026.pdf',
    keyMetrics: [
      { label: 'Managed Ad Spend Analyzed', value: '₹250 Cr+' },
      { label: 'Blended ROAS Average', value: '4.6x' },
      { label: 'Conversion Lift with Reels', value: '+54%' }
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Sarah Chen',
      role: 'VP of Paid Media',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Sarah leads multi-channel media buying and conversion optimization strategies.'
    },
    summaryPoints: [
      'Short-form video creatives (Reels and TikTok Spark Ads) delivered 54% higher conversion rates than static banners.',
      'Server-side CAPI integration protected ad accounts against 35% pixel signal loss during high-traffic shopping sprees.',
      '1-click checkout optimizations boosted mobile conversion rates from 2.1% to 4.8%.'
    ],
    fullReportContent: `
During peak Q4 festive shopping periods, ad auctions experience intense CPM spikes. This audit provides direct data-backed rules for budget scaling, creative variation cycling, and retention triggers.
    `
  },
  {
    id: 'ins-4',
    title: 'The Executive Guide to First-Party Data & Multi-Touch Attribution Architecture',
    slug: 'cmo-guide-multi-touch-attribution',
    category: 'Executive Whitepaper',
    type: 'Whitepaper',
    excerpt: 'A comprehensive playbook for CMOs and C-suite leaders transitioning from third-party cookie tracking to unified server-side analytics.',
    publishedAt: 'June 28, 2026',
    readTime: '11 min read',
    downloadablePdf: '/docs/CMO_Multi_Touch_Attribution_Guide.pdf',
    keyMetrics: [
      { label: 'Attribution Accuracy Level', value: '99.4%' },
      { label: 'Ad Budget Wastage Saved', value: '32%' },
      { label: 'Executive Reporting Hours', value: '-85%' }
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'David Sterling',
      role: 'Chief Data Officer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'David specializes in data warehousing, server-side tracking, and executive BI dashboards.'
    },
    summaryPoints: [
      'Third-party cookie deprecation blinds legacy analytics platforms; server-side tracking is no longer optional.',
      'Multi-touch W-shaped attribution reveals hidden top-of-funnel ROI that single-click models erase.',
      'Automated Looker dashboards save 40+ manual reporting hours monthly while delivering live C-suite transparency.'
    ],
    fullReportContent: `
This whitepaper outlines the step-by-step engineering roadmap required to unify GA4, Meta CAPI, Google Ads, and Stripe CRM data into a single source of truth.
    `
  }
];
