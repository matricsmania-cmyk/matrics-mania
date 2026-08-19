import { BlogPost, ServiceItem, CaseStudy, WorkProject, TeamMember, Testimonial, FAQItem } from '../types';

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

import { INSIGHTS_POSTS_DATA } from './insightsData';

export const BLOG_POSTS_DATA: BlogPost[] = INSIGHTS_POSTS_DATA;

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

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Marcus Vance',
    role: 'Principal Growth Architect & Founder',
    bio: 'Former growth engineering lead specializing in search indexing systems, algorithmic bidding, and multi-touch revenue attribution.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    specialties: ['Technical SEO', 'GEO Systems', 'Conversion Engineering'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'marcus@matricsmania.com',
    },
  },
  {
    id: 'team-2',
    name: 'Aarav Mehta',
    role: 'Head of Search & LLM Retrieval',
    bio: 'Pioneered semantic knowledge graph architecture and Generative Engine Optimization frameworks across enterprise B2B SaaS.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    specialties: ['Knowledge Graphs', 'Core Web Vitals', 'Search Indexing'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'aarav@matricsmania.com',
    },
  },
  {
    id: 'team-3',
    name: 'Elena Rostova',
    role: 'Director of Performance Media',
    bio: 'Over $40M managed in paid acquisition budgets with automated algorithmic bidding and server-side conversion API architectures.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialties: ['Meta & Google Ads', 'CAPI Integration', 'Attribution Modeling'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'elena@matricsmania.com',
    },
  },
];

