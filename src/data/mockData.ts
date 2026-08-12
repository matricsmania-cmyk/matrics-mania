import { BlogPost, ServiceItem, CaseStudy, TeamMember, Testimonial, FAQItem } from '../types';

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
  },
  {
    id: 'nova-ecommerce',
    clientName: 'Nova Luxury Apparel',
    industry: 'D2C E-Commerce',
    logo: '🚀 NovaShop',
    title: 'Achieving a 5.2x ROAS & ₹28 Crore Festive Season Revenue',
    challenge: 'Rising iOS privacy updates crippled Nova’s Facebook ad efficiency, scaling CAC above their product profit margin.',
    solution: 'We introduced TikTok & Instagram Reels Spark Ads, deployed server-side Meta conversions API, and redesigned their mobile product landing pages for speed.',
    results: [
      { metric: '5.2x', label: 'Blended Ad ROAS' },
      { metric: '₹28 Cr', label: 'Festive Revenue Generated' },
      { metric: '+62%', label: 'Mobile Conversion Rate' }
    ],
    testimonialQuote: 'The team at Matricsmania feels like an extension of our internal team. They don’t just run ads; they overhaul the entire conversion experience.',
    clientAuthor: 'Elena Rostova',
    clientRole: 'Founder & CEO, Nova Apparel',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'peak-fintech',
    clientName: 'Peak Financial Group',
    industry: 'FinTech & Capital',
    logo: '📈 PeakFin',
    title: 'Dominating Competitive High-CPC Keywords in Financial Advisory',
    challenge: 'Competing against trillion-dollar institutional banks for top Google search spots where CPCs exceeded ₹7,500 per click.',
    solution: 'Implemented zero-click SEO snippets, authority whitepaper lead engines, and high-converting interactive retirement calculators.',
    results: [
      { metric: '#1', label: 'Rank for 18 Core Keywords' },
      { metric: '8,400+', label: 'High-Net-Worth Consultations' },
      { metric: '3.8x', label: 'LTV to CAC Ratio' }
    ],
    testimonialQuote: 'In finance, trust is everything. Matricsmania helped us dominate Google organically while building immense brand authority.',
    clientAuthor: 'David Sterling',
    clientRole: 'Managing Director, Peak Financial',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'The 2026 SEO Blueprint: How Semantic Search & AI Overview Are Changing Rankings',
    slug: '2026-seo-blueprint-ai-overviews',
    excerpt: 'Traditional keyword stuffing is dead. Discover how vector embeddings, entity relationships, and GEO (Generative Engine Optimization) dictate search visibility in 2026.',
    content: `
Search Engine Optimization has experienced a monumental paradigm shift. With Google AI Overviews and conversational LLM search assistants taking up top screen real estate, securing organic traffic requires a fundamental pivot in content strategy.

### 1. Shift from Keywords to Entity Mapping
Search engines no longer analyze words in isolation. They evaluate subject matter entities and their relationships. To rank high, your content must satisfy topical completeness across full customer intent graphs.

### 2. Generative Engine Optimization (GEO)
When AI models summarize information for users, they cite sources that contain:
- Verified numerical data and unique research metrics
- Direct expert quotes with structured schema markup
- Clear concise answers formatted in structured bullet points and tables

### 3. Core Web Vitals & Instant Mobile Render
Page speed is no longer just a minor ranking signal; it is a hard barrier. Sites loading above 1.2 seconds lose up to 48% of search engine crawlers and users alike.

### Key Takeaway for Growth Leads
Focus on building comprehensive, original, data-driven content hubs that answer complex user queries with unmatched clarity.
    `,
    category: 'SEO & Growth',
    author: {
      name: 'Alex Vance',
      role: 'Head of SEO Strategy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'August 8, 2026',
    readTime: '6 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80',
    tags: ['SEO', 'AI Search', 'Core Web Vitals', 'Generative Engine'],
    keyTakeaways: [
      'Transition content from basic keyword targeting to semantic entity maps.',
      'Optimize for Generative AI summaries by including data-rich tables and direct answers.',
      'Ensure page load times stay strictly under 1.0 second for maximum indexation rate.'
    ]
  },
  {
    id: 'b2',
    title: 'Maxing Out Meta & TikTok Ads: How to Maintain 4x+ ROAS in a Privacy-First Era',
    slug: 'meta-tiktok-ads-roas-playbook',
    excerpt: 'Third-party cookies are gone. Here is how modern performance marketing agencies leverage server-side tracking and high-velocity ad creatives to scale paid media profitably.',
    content: `
Performance marketing in 2026 requires balancing data privacy with precision targeting. Relying on basic pixel tracking leads to missing attribution and inflated CAC.

### 1. Server-Side Conversions API (CAPI)
By transmitting conversion events directly from your server to Meta and TikTok endpoints, you bypass browser ad-blockers and cookie restrictions, restoring up to 30% of lost conversion data.

### 2. Creative Velocity is the New Targeting
Algorithms optimize ads based on creative hooks rather than manually specified demographic filters. Deploying 5-10 creative variations weekly allows ad platforms to automatically match ads to high-intent buyer segments.

### 3. First-Party Data Capture & Offer Quality
The highest-converting campaigns capture email and phone numbers early via interactive quizzes, custom calculators, and instant value lead magnets.
    `,
    category: 'Paid Media',
    author: {
      name: 'Sarah Chen',
      role: 'VP of Paid Media',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'July 28, 2026',
    readTime: '5 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1000&q=80',
    tags: ['PPC', 'Meta Ads', 'TikTok Ads', 'CAPI', 'Attribution'],
    keyTakeaways: [
      'Implement Server-Side Conversions API to eliminate lost pixel data.',
      'Test a minimum of 5 creative variations weekly to allow platform AI optimization.',
      'Leverage first-party data capture tools to build high-converting retargeting pools.'
    ]
  },
  {
    id: 'b3',
    title: 'Building a High-Converting B2B SaaS Funnel: From Cold Click to Booked Demo',
    slug: 'b2b-saas-funnel-conversion-rate',
    excerpt: 'Why 92% of SaaS website visitors never request a demo, and the 5 specific landing page friction points you must fix to double your pipeline.',
    content: `
B2B software buyers don't want vague sales jargon or hidden pricing. They demand transparent value, instant interactive product tours, and friction-free scheduling.

### 1. The 3-Second Above-the-Fold Test
Your hero section must answer three questions instantly: What do you do? Who is it for? What is the immediate result?

### 2. Interactive Product Sandbox
Static screenshots no longer convert high-tier buyers. Adding an interactive product preview or quick live calculator increases demo booking conversion by an average of 42%.

### 3. Multi-Step Micro-Forms
Long forms with 10 required fields destroy conversion rates. Replacing traditional forms with interactive 2-step micro-questions keeps user engagement high.
    `,
    category: 'Analytics',
    author: {
      name: 'Michael Ross',
      role: 'Growth & CRO Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'July 15, 2026',
    readTime: '7 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['CRO', 'B2B SaaS', 'Landing Pages', 'Sales Funnel'],
    keyTakeaways: [
      'Position your core value statement clearly in the first 3 seconds of page load.',
      'Replace static screenshots with interactive product previews.',
      'Use multi-step micro-forms to reduce friction and improve lead quality.'
    ]
  },
  {
    id: 'b4',
    title: 'Leveraging AI Automation in Content Marketing Without Losing Brand Soul',
    slug: 'ai-automation-content-marketing-strategy',
    excerpt: 'How leading agencies use LLMs for outline research, topic ideation, and distribution while maintaining human editorial polish and brand voice.',
    content: `
Generic AI-generated articles are flooding the web, resulting in reader fatigue and Google helpful content penalties. Here is how Matricsmania uses AI as an assistant rather than a replacement.

### 1. AI for Research & Structure
Use AI to process customer support transcripts, Reddit discussions, and competitor content to find real user pain points.

### 2. Human Thought Leadership & Primary Source Data
Incorporate real founder stories, internal campaign metrics, and expert interviews that AI could never simulate.

### 3. Automated Content Multi-Channel Distribution
Once a high-value core article is written, leverage automated scripts to reformat it into LinkedIn carousels, X threads, and newsletter summaries.
    `,
    category: 'AI Marketing',
    author: {
      name: 'Jessica Taylor',
      role: 'Content Strategy Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'July 02, 2026',
    readTime: '4 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['AI Marketing', 'Content Strategy', 'Brand Authority', 'Automation'],
    keyTakeaways: [
      'Use AI for research and structural outlines, not unedited final publishing.',
      'Inject primary data and real customer stories into every piece.',
      'Repurpose high-performing articles across multiple social channels automatically.'
    ]
  },
  {
    id: 'b5',
    title: 'The Master Guide to Marketing Attribution: Multi-Touch vs First-Touch Models',
    slug: 'master-guide-marketing-attribution-models',
    excerpt: 'Unpack the differences between Linear, Time-Decay, W-Shaped, and Algorithmic attribution models to properly evaluate customer acquisition metrics.',
    content: `
If you rely solely on Google Analytics last-click attribution, you are likely underfunding your top-of-funnel brand campaigns and overpaying for retargeting ads.

### 1. Why Last-Click Attribution is Misleading
Last-click gives 100% of the credit to the final search or retargeting ad that the user clicked right before purchasing. It ignores the blog post, YouTube review, and social ad that originally discovered the brand.

### 2. Choosing W-Shaped Attribution for B2B
W-Shaped attribution assigns 30% credit to First Touch, 30% to Lead Creation, 30% to Opportunity Creation, and 10% distributed among touchpoints in between.

### 3. Server-Side Unified Data Pipelines
Connecting ad platform APIs, web analytics, and your sales CRM in Looker Studio gives C-level executives a real-time view of true payback periods.
    `,
    category: 'Brand Strategy',
    author: {
      name: 'David Sterling',
      role: 'Chief Data Officer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'June 20, 2026',
    readTime: '8 min read',
    featuredImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    tags: ['Analytics', 'Attribution', 'GA4', 'Data Science', 'ROI'],
    keyTakeaways: [
      'Move away from last-click models to prevent underfunding top-of-funnel campaigns.',
      'Utilize W-shaped attribution for B2B buyer journeys with long sales cycles.',
      'Centralize CRM and ad spend metrics into unified real-time dashboards.'
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
