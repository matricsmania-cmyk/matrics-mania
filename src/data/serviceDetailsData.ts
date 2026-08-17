import React from 'react';
import { PageType } from '../types';

export interface ServiceDetailData {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  heroMetrics: { label: string; value: string }[];
  deliverables: { title: string; desc: string; iconName?: string }[];
  methodology: { step: string; title: string; desc: string }[];
  techStack: string[];
  idealFor: string[];
  caseStudyPreview: {
    client: string;
    result: string;
    description: string;
  };
  faqs: { question: string; answer: string }[];
}

export const SERVICE_SLUGS = [
  'strategy-growth',
  'search',
  'search-ai-visibility',
  'performance-marketing',
  'social-influence',
  'content-creative',
  'brand-reputation',
  'web-digital-experience',
  'data-technology',
  'media-experiences',
] as const;

export type ServiceSlug = typeof SERVICE_SLUGS[number];

const SEARCH_AI_VISIBILITY_SERVICE_DATA: ServiceDetailData = {
  slug: 'search',
  title: 'Search & AI Visibility',
  category: 'SEO & Generative Engine Optimization',
  tagline: 'Dominate traditional Google search results, AI Overviews, Perplexity, and LLM search engines.',
  overview:
    'Search has evolved. We engineer technical SEO foundations, semantic entity graphs, and Generative Engine Optimization (GEO) strategies to ensure your brand is cited and ranked #1 across Google, Gemini, ChatGPT, and Perplexity.',
  heroMetrics: [
    { label: 'Organic Lead Surge', value: '+280%' },
    { label: 'AI Overviews Citations', value: '8,400+' },
    { label: 'Top 3 Keyword Ranks', value: '14,000+' },
  ],
  deliverables: [
    {
      title: 'Technical SEO & Core Web Vitals',
      desc: 'Sub-second load times, schema JSON-LD entity markup, and advanced crawl budget engineering.',
    },
    {
      title: 'Semantic Content Clusters & Topical Authority',
      desc: 'Hierarchical pillar-and-cluster content mapping structured for maximum vector similarity.',
    },
    {
      title: 'Generative Engine Optimization (GEO)',
      desc: 'Optimizing brand citations, entity schemas, and structured data for ChatGPT, Perplexity, and Gemini.',
    },
    {
      title: 'High-DR Digital PR & Link Acquisition',
      desc: 'Ethical, high-impact editorial backlinks from leading industry authorities and tier-1 publications.',
    },
  ],
  methodology: [
    { step: '01', title: 'Entity & Schema Audit', desc: 'Scan 500+ site health signals, knowledge graph connections, and indexation status.' },
    { step: '02', title: 'Topical Graph Design', desc: 'Map semantic keyword intent clusters and entity relationships.' },
    { step: '03', title: 'Technical & Content Execution', desc: 'Deploy clean code fixes, publish authoritative copy, and integrate schema.' },
    { step: '04', title: 'LLM Citation Tracking', desc: 'Monitor position shifts across both classic SERPs and AI answers weekly.' },
  ],
  techStack: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'Schema.org JSON-LD'],
  idealFor: ['Enterprises losing visibility to AI Overviews', 'B2B companies with complex high-ticket services', 'E-commerce catalogs'],
  caseStudyPreview: {
    client: 'Peak Financial Group',
    result: '#1 for 18 Core Keywords',
    description: 'Captured high-CPC search terms with zero-click schema snippets, generating 8,400+ high-net-worth consults.',
  },
  faqs: [
    {
      question: 'What is Generative Engine Optimization (GEO)?',
      answer: 'GEO optimizes your brand entity, schema markup, and authoritative citations so AI search tools like Google AI Overviews, Perplexity, and ChatGPT cite your website as the definitive source.',
    },
    {
      question: 'How quickly can we expect organic search results?',
      answer: 'Technical fixes and schema updates often show indexation gains within 3 to 6 weeks, while compounding topical authority typically matures into exponential organic pipeline growth by months 3 to 6.',
    },
  ],
};

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetailData> = {
  'strategy-growth': {
    slug: 'strategy-growth',
    title: 'Strategy & Growth',
    category: 'Strategic Advisory & Scaling',
    tagline: 'Precision market positioning, go-to-market architectures, and compounding revenue systems.',
    overview:
      'We architect holistic growth strategies that align branding, acquisition channels, pricing models, and retention loops. Through deep unit-economic auditing and predictive modeling, we turn chaotic marketing budgets into predictable, compounding revenue engines.',
    heroMetrics: [
      { label: 'Avg Inbound Pipeline Lift', value: '+320%' },
      { label: 'Customer LTV Expansion', value: '+68%' },
      { label: 'CAC Payback Acceleration', value: '2.4x' },
    ],
    deliverables: [
      {
        title: 'Full-Funnel Unit Economics Audit',
        desc: 'Comprehensive diagnostics across CAC, LTV, churn vectors, and revenue attribution channels.',
      },
      {
        title: 'Go-To-Market (GTM) Architecture',
        desc: 'Custom channel prioritization matrix, launch playbooks, and competitive moat mapping.',
      },
      {
        title: 'Audience Persona & ICP Blueprint',
        desc: 'High-intent behavioral segmentation, pain-point hierarchy, and decision-maker psychographics.',
      },
      {
        title: '90-Day Scaling Sprints',
        desc: 'Agile milestone tracking with executive weekly KPI models and board-ready growth reports.',
      },
    ],
    methodology: [
      { step: '01', title: 'Diagnostic Crawl', desc: 'Deconstruct existing funnels, churn points, and CAC inefficiencies.' },
      { step: '02', title: 'Positioning Moat', desc: 'Carve unique category leadership and craft irresistible value propositions.' },
      { step: '03', title: 'Channel Engine Setup', desc: 'Deploy high-velocity testing across organic, paid, and referral vectors.' },
      { step: '04', title: 'Attribution & Scale', desc: 'Double down on high-LTV channels while cutting underperforming ad spend.' },
    ],
    techStack: ['Looker Studio', 'GA4 Advanced', 'Mixpanel', 'HubSpot Enterprise', 'Metabase'],
    idealFor: ['High-growth B2B SaaS', 'D2C scale-ups seeking Series A/B', 'Established enterprises needing market repositioning'],
    caseStudyPreview: {
      client: 'Velociti Cloud',
      result: '₹1 Cr → ₹10 Cr ARR',
      description: 'Engineered a unified inbound strategy that lowered customer acquisition cost by 42% in 9 months.',
    },
    faqs: [
      {
        question: 'How does MatricsMania build a 90-day growth roadmap?',
        answer: 'We analyze your trailing 12-month data, identify leakages across the buyer journey, and prioritize high-impact quick wins alongside compounding long-term growth pillars.',
      },
      {
        question: 'What KPIs do we track weekly?',
        answer: 'We focus on blended Customer Acquisition Cost (CAC), Lifetime Value (LTV), Pipeline Velocity, Return on Ad Spend (ROAS), and Marketing Qualified Leads (MQLs).',
      },
    ],
  },
  'search': SEARCH_AI_VISIBILITY_SERVICE_DATA,
  'search-ai-visibility': SEARCH_AI_VISIBILITY_SERVICE_DATA,
  'performance-marketing': {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    category: 'Paid Acquisition & ROAS Engineering',
    tagline: 'High-efficiency media buying across Google Ads, Meta, LinkedIn, and TikTok with zero ad waste.',
    overview:
      'We manage multi-crore ad budgets with surgical precision. By fusing AI audience segmenting, automated bidding scripts, dynamic video hooks, and frictionless conversion funnels, we consistently turn paid media into profitable revenue pipelines.',
    heroMetrics: [
      { label: 'Average Blended ROAS', value: '4.8x' },
      { label: 'Managed Ad Spend', value: '₹180 Cr+' },
      { label: 'CPA Reduction Average', value: '-38%' },
    ],
    deliverables: [
      {
        title: 'Google Ads & Performance Max Scaling',
        desc: 'Search, Shopping, Display, and YouTube campaigns with custom negative lists and first-party audience signals.',
      },
      {
        title: 'Meta Direct-Response Studio',
        desc: 'Dynamic creative testing (DCO), UGC hooks, UGC mashups, and instant-checkout landing pages.',
      },
      {
        title: 'LinkedIn Account-Based Marketing (ABM)',
        desc: 'Laser-targeted B2B campaigns reaching validated C-suite decision-makers at tier-1 enterprise accounts.',
      },
      {
        title: 'Server-Side Tracking (CAPI) & Attribution',
        desc: 'First-party conversion tracking resilient against iOS privacy and ad-blocker drop-offs.',
      },
    ],
    methodology: [
      { step: '01', title: 'Offer & Hook Testing', desc: 'Test 20+ creative hook angles across micro-audiences in 14 days.' },
      { step: '02', title: 'Funnel Optimization', desc: 'Build matching dedicated landing pages for each ad angle.' },
      { step: '03', title: 'Automated Budget Scaling', desc: 'Deploy automated scale rules for winning campaigns while killing losers.' },
      { step: '04', title: 'Retargeting Engine', desc: 'Deploy multi-touch nurture ad sequences based on user engagement depth.' },
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'TikTok For Business', 'LinkedIn Campaign Manager', 'TripleWhale'],
    idealFor: ['D2C & E-Commerce brands wanting high ROAS', 'B2B companies seeking verified SQL pipelines', 'App install growth'],
    caseStudyPreview: {
      client: 'Nova Luxury Apparel',
      result: '5.2x Blended ROAS',
      description: 'Scaled festive season campaigns to ₹28 Crore in revenue with TikTok Spark Ads and Conversions API integration.',
    },
    faqs: [
      {
        question: 'How do you handle privacy tracking changes like iOS 14+?',
        answer: 'We deploy robust server-side Conversions API (CAPI) and GA4 Measurement Protocol tracking to guarantee 99%+ attribution accuracy without relying solely on client cookies.',
      },
      {
        question: 'What is your minimum monthly ad budget recommendation?',
        answer: 'We work with growth-stage brands and enterprises typically investing ₹2,00,000+ monthly in media spend to provide adequate statistical significance for creative testing.',
      },
    ],
  },
  'social-influence': {
    slug: 'social-influence',
    title: 'Social & Influence',
    category: 'Community & Creator Partnerships',
    tagline: 'Turn passive social scrollers into obsessed brand evangelists and high-converting referral loops.',
    overview:
      'Social media is no longer about generic broadcasting. We build scroll-stopping short-form video content, executive thought leadership on LinkedIn & X, and authentic creator partnerships that drive virality and brand trust.',
    heroMetrics: [
      { label: 'Organic Impressions', value: '45M+' },
      { label: 'Engagement Rate Surge', value: '+340%' },
      { label: 'Creator Network Size', value: '1,200+' },
    ],
    deliverables: [
      {
        title: 'Short-Form Video Production & Reels',
        desc: 'High-retention vertical video scripts, fast-paced editing, viral audio pairing, and custom captions.',
      },
      {
        title: 'Executive Ghostwriting (LinkedIn & X)',
        desc: 'Position founders and CEOs as undisputed industry authorities through daily high-signal insights.',
      },
      {
        title: 'Vetted Creator & Influencer Campaigns',
        desc: 'End-to-end influencer matchmaking, contract negotiation, FTC compliance, and performance tracking.',
      },
      {
        title: 'Community Management & Social Listening',
        desc: 'Real-time trend hijacking, comment engagement, and active community moderation.',
      },
    ],
    methodology: [
      { step: '01', title: 'Voice & Tone Matrix', desc: 'Define your distinct visual aesthetic, controversial opinions, and content pillars.' },
      { step: '02', title: 'Batch Content Studio', desc: 'Produce studio-grade reels, carousels, and narrative threads weekly.' },
      { step: '03', title: 'Creator Synergies', desc: 'Seed product samples to top-tier creators with trackable affiliate links.' },
      { step: '04', title: 'Viral Amplification', desc: 'Boost top-performing organic reels into paid dark-post ads.' },
    ],
    techStack: ['Sprout Social', 'Brand24', 'CapCut Studio', 'Notion Content OS', 'Grin Influencer CRM'],
    idealFor: ['Brands wanting viral organic reach', 'Tech founders seeking personal brand authority', 'Consumer lifestyle brands'],
    caseStudyPreview: {
      client: 'Aura Health Tech',
      result: '18M+ Organic Impressions',
      description: 'Grew organic follower base by 420% in 6 months using short-form wellness breakdowns and founder stories.',
    },
    faqs: [
      {
        question: 'Do you manage content production in-house?',
        answer: 'Yes, our creative team handles scriptwriting, graphic design, motion editing, and posting schedules with zero overhead for your team.',
      },
      {
        question: 'How do you measure social media ROI?',
        answer: 'We track UTM-tagged website traffic, coupon redemptions, follower-to-lead conversion rates, and executive inbound partnership inquiries.',
      },
    ],
  },
  'content-creative': {
    slug: 'content-creative',
    title: 'Content & Creative',
    category: 'Brand Storytelling & Asset Studio',
    tagline: 'High-converting editorial copy, lead magnet engines, interactive visual assets, and brand design.',
    overview:
      'We combine journalistic depth with conversion psychology. From in-depth technical whitepapers and interactive tools to high-CTR graphic templates, our creative assets position your company as the market leader and capture high-intent leads.',
    heroMetrics: [
      { label: 'Lead Magnet Downloads', value: '85,000+' },
      { label: 'MQL Conversion Surge', value: '+195%' },
      { label: 'Editorial Read Completion', value: '78%' },
    ],
    deliverables: [
      {
        title: 'Long-Form Thought Leadership & eBooks',
        desc: 'Deep-dive industry reports, benchmark whitepapers, and customer acquisition lead magnets.',
      },
      {
        title: 'Interactive Calculators & Tools',
        desc: 'Custom web widgets, ROI estimators, and interactive diagnostic quizzes that capture high-intent emails.',
      },
      {
        title: 'Conversion Copywriting & Landing Pages',
        desc: 'Pristine messaging frameworks that eliminate friction and compel visitors to book calls.',
      },
      {
        title: 'Email Marketing & Nurture Sequences',
        desc: 'Automated welcome drips, weekly value newsletters, and abandoned-cart recovery sequences.',
      },
    ],
    methodology: [
      { step: '01', title: 'Content Gap Audit', desc: 'Identify topics your competitors neglect and map high-converting angles.' },
      { step: '02', title: 'Subject Matter Extraction', desc: 'Interview internal product experts to distill unique, non-generic insights.' },
      { step: '03', title: 'Design & Visual Packaging', desc: 'Format content with crisp typography, charts, and downloadable PDFs.' },
      { step: '04', title: 'Multi-Channel Distribution', desc: 'Repurpose whitepapers into Twitter threads, LinkedIn carousels, and newsletters.' },
    ],
    techStack: ['Figma', 'Adobe Creative Cloud', 'Klaviyo', 'Substack', 'ActiveCampaign'],
    idealFor: ['B2B enterprises with complex buyer journeys', 'Companies needing high-converting lead magnets', 'Fintech & SaaS'],
    caseStudyPreview: {
      client: 'Krypton Pay',
      result: '42,000+ Downloads',
      description: 'Engineered a State of Cross-Border Payments report that directly produced 350+ enterprise sales meetings.',
    },
    faqs: [
      {
        question: 'How do you ensure content isn’t generic AI slop?',
        answer: 'We conduct real subject-matter interviews, integrate proprietary company data, and write with rigorous editorial stylebooks crafted for human nuance and technical depth.',
      },
      {
        question: 'Can you work with our existing brand guidelines?',
        answer: 'Absolutely. We seamlessly integrate with your Figma design system, brand voice documentation, and legal compliance workflows.',
      },
    ],
  },
  'brand-reputation': {
    slug: 'brand-reputation',
    title: 'Brand & Reputation',
    category: 'Identity, PR & Crisis Protection',
    tagline: 'Fortify brand credibility, secure tier-1 media placements, and manage executive reputation online.',
    overview:
      'In a noisy digital landscape, trust is the ultimate conversion multiplier. We build bulletproof brand positioning, secure authoritative media features, and actively protect your brand sentiment across review platforms, forums, and Google search.',
    heroMetrics: [
      { label: 'Tier-1 PR Placements', value: '450+' },
      { label: 'Positive Sentiment Score', value: '98.6%' },
      { label: 'SERP Brand Defense', value: '100%' },
    ],
    deliverables: [
      {
        title: 'Digital PR & Tier-1 Press Outreach',
        desc: 'Earned media placements in Forbes, TechCrunch, Economic Times, Bloomberg, and top trade journals.',
      },
      {
        title: 'Brand Identity Blueprint & Positioning',
        desc: 'Comprehensive brand books, messaging frameworks, visual style guides, and design tokens.',
      },
      {
        title: 'Executive SERP & Wikipedia Management',
        desc: 'Own page 1 of Google for executive and brand keywords with positive, verified digital assets.',
      },
      {
        title: 'Review Ecosystem & Crisis Mitigation',
        desc: 'Proactive review generation on Trustpilot, G2, Google My Business, and rapid crisis response plans.',
      },
    ],
    methodology: [
      { step: '01', title: 'Brand Sentiment Scan', desc: 'Audit brand mentions, negative search results, and review profiles.' },
      { step: '02', title: 'PR Story Angles', desc: 'Craft newsworthy data stories, funding announcements, and founder narratives.' },
      { step: '03', title: 'Media Pitching Sprints', desc: 'Connect directly with journalists and high-authority editors.' },
      { step: '04', title: '24/7 Brand Monitoring', desc: 'Set up real-time sentiment alerts and review escalation protocols.' },
    ],
    techStack: ['Muck Rack', 'Cision', 'Google Alerts', 'Trustpilot Enterprise', 'G2 Crowd'],
    idealFor: ['Companies planning IPO/funding rounds', 'Brands overcoming negative PR/reviews', 'Luxury and fintech firms'],
    caseStudyPreview: {
      client: 'OmniCloud Systems',
      result: '98% Positive Sentiment',
      description: 'Secured 32 tier-1 press features and cleared defamatory forum links from Google page 1 in 90 days.',
    },
    faqs: [
      {
        question: 'How do you handle negative online search results?',
        answer: 'We employ ethical suppression strategies by publishing and ranking high-authority digital assets (interviews, press releases, company wikis) to push negative links down to page 3+.',
      },
      {
        question: 'Do you guarantee media press placements?',
        answer: 'We work with real journalists and editorial standards, creating genuinely newsworthy hooks that achieve predictable placements without paying for spammy sponsored directories.',
      },
    ],
  },
  'web-digital-experience': {
    slug: 'web-digital-experience',
    title: 'Web & Digital Experience',
    category: 'Full-Stack Web Engineering & CRO',
    tagline: 'Sub-second web performance, custom UI/UX design, and conversion-optimized interactive applications.',
    overview:
      'Your website is your best 24/7 salesperson. We design and build ultra-fast, visually polished web applications and landing pages engineered to captivate visitors, eliminate user friction, and turn clicks into high-value sales.',
    heroMetrics: [
      { label: 'Page Load Speed', value: '< 0.8s' },
      { label: 'Avg Conversion Lift', value: '+84%' },
      { label: 'Lighthouse Performance', value: '99/100' },
    ],
    deliverables: [
      {
        title: 'Custom React, Next.js & Vite Engineering',
        desc: 'Clean, type-safe, and accessible codebase built with modern Tailwind CSS and Motion animations.',
      },
      {
        title: 'Figma UI/UX Design System',
        desc: 'Interactive wireframes, high-fidelity prototypes, and mathematically scaled typographic hierarchies.',
      },
      {
        title: 'A/B Testing & Heatmap Optimization',
        desc: 'Continuous split testing on value propositions, button CTAs, navigation flows, and pricing tiers.',
      },
      {
        title: 'CRM & API Infrastructure Integrations',
        desc: 'Seamless connections to HubSpot, Salesforce, Stripe, WhatsApp API, and automated email webhooks.',
      },
    ],
    methodology: [
      { step: '01', title: 'UX Friction Audit', desc: 'Review session replays, bounce rates, and mobile navigation obstacles.' },
      { step: '02', title: 'Interactive Prototype', desc: 'Design pixel-perfect Figma screens with dark/light theme logic.' },
      { step: '03', title: 'Modern Full-Stack Code', desc: 'Develop responsive, SEO-ready web pages with 99+ Core Web Vitals.' },
      { step: '04', title: 'Multivariate Testing', desc: 'Deploy iterative A/B experiments to maximize lead-to-booking conversions.' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Figma', 'PostHog'],
    idealFor: ['Businesses with slow, dated websites', 'Companies launching new SaaS products', 'E-commerce storefronts'],
    caseStudyPreview: {
      client: 'Nova Luxury E-Commerce',
      result: '+62% Mobile Checkout Rate',
      description: 'Redesigned mobile checkout flow and dropped load times under 700ms, scaling conversion rates immediately.',
    },
    faqs: [
      {
        question: 'Do you build custom websites or use generic templates?',
        answer: 'We build 100% custom web architectures tailored to your specific conversion funnel, ensuring unmatched speed, security, and unique brand presence.',
      },
      {
        question: 'Will our team be able to edit content easily?',
        answer: 'Yes! We configure intuitive headless CMS integrations (Sanity, Strapi, or WordPress API) so your marketing team can publish blogs and landing pages effortlessly.',
      },
    ],
  },
  'data-technology': {
    slug: 'data-technology',
    title: 'Data & Technology',
    category: 'Analytics, AI & Attribution Infrastructure',
    tagline: 'Unified marketing data pipelines, real-time executive dashboards, and predictive AI revenue models.',
    overview:
      'Stop making multi-crore marketing decisions in the dark. We unify your CRM, ad platforms, payment gateways, and web analytics into single-source-of-truth Looker dashboards and predictive attribution models.',
    heroMetrics: [
      { label: 'Attribution Accuracy', value: '99.4%' },
      { label: 'Reporting Hours Saved', value: '40+ hrs/mo' },
      { label: 'Data Latency', value: '< 60 sec' },
    ],
    deliverables: [
      {
        title: 'Server-Side GA4 & GTM Event Architecture',
        desc: 'First-party measurement protocol setup tracking every micro-conversion and revenue event accurately.',
      },
      {
        title: 'Multi-Touch Revenue Attribution Modeling',
        desc: 'W-shaped, linear, and algorithmic attribution models that credit every touchpoint accurately.',
      },
      {
        title: 'Live Executive Looker Studio & PowerBI Dashboards',
        desc: 'Automated, interactive C-suite panels displaying real-time ROAS, CAC, LTV, and net profit.',
      },
      {
        title: 'Predictive AI Customer Lifetime Value (pLTV)',
        desc: 'Machine learning algorithms that predict customer churn and identify high-value buyer cohorts early.',
      },
    ],
    methodology: [
      { step: '01', title: 'Data Audit & Cleansing', desc: 'Identify broken pixel triggers, duplicate events, and attribution discrepancies.' },
      { step: '02', title: 'Data Pipeline Setup', desc: 'Connect ad platforms, Stripe, and CRM into Google BigQuery / PostgreSQL.' },
      { step: '03', title: 'Dashboard Modeling', desc: 'Build clear, role-specific dashboards for CMOs, media buyers, and CEOs.' },
      { step: '04', title: 'Automated Anomaly Alerts', desc: 'Configure Slack/email triggers for sudden CAC spikes or tracking failures.' },
    ],
    techStack: ['Google BigQuery', 'Looker Studio', 'GA4 Advanced', 'Segment', 'dbt', 'Python'],
    idealFor: ['Companies spending ₹10L+ monthly across multiple ad channels', 'Enterprises with siloed CRM/ad data', 'Fintech & SaaS'],
    caseStudyPreview: {
      client: 'Peak Financial Group',
      result: '3.8x LTV to CAC Ratio',
      description: 'Unified multi-channel tracking and eliminated ₹45 Lakhs in wasted ad spend through multi-touch attribution.',
    },
    faqs: [
      {
        question: 'Why do we need server-side tracking over standard browser pixels?',
        answer: 'Browser ad-blockers and privacy restrictions drop up to 30% of standard pixel data. Server-side tracking sends events directly from your server to Meta/Google, restoring full tracking fidelity.',
      },
      {
        question: 'Can you integrate our custom internal CRM?',
        answer: 'Yes, we build custom REST/GraphQL webhook connectors and ETL pipelines into BigQuery/Looker for virtually any modern database or CRM.',
      },
    ],
  },
  'media-experiences': {
    slug: 'media-experiences',
    title: 'Media & Experiences',
    category: 'Immersive Media, Video & Events',
    tagline: 'High-production brand documentaries, 3D interactive experiences, and experiential event marketing.',
    overview:
      'Create unforgettable cultural moments that transcend traditional digital advertising. We produce studio-grade brand films, podcast networks, 3D interactive web experiences, and immersive hybrid event activations.',
    heroMetrics: [
      { label: 'Video Views Generated', value: '60M+' },
      { label: 'Avg Video Retention Rate', value: '64%' },
      { label: 'Experiential Event Attendees', value: '25,000+' },
    ],
    deliverables: [
      {
        title: 'High-Production Brand Documentaries & Commercials',
        desc: 'Cinema-grade storytelling, 4K camera production, color grading, and custom audio scoring.',
      },
      {
        title: 'Podcast Studio Production & Syndication',
        desc: 'End-to-end podcast launch: studio recording, audio mastering, YouTube video editing, and distribution.',
      },
      {
        title: '3D WebGL & Interactive Web Showcases',
        desc: 'Three.js and WebGL interactive product visualizers that let customers explore features in 3D.',
      },
      {
        title: 'Keynote & Hybrid Event Production',
        desc: 'Live broadcast streaming, interactive attendee polling, and post-event highlight reels.',
      },
    ],
    methodology: [
      { step: '01', title: 'Creative Treatment', desc: 'Develop narrative concepts, storyboards, 3D mood boards, and script drafts.' },
      { step: '02', title: 'Production Execution', desc: 'Deploy cinema cameras, studio lighting, voice actors, and 3D modeling artists.' },
      { step: '03', title: 'Post-Production Polish', desc: 'Precision color grading, sound design, visual effects, and subtitles.' },
      { step: '04', title: 'Omnichannel Premiere', desc: 'Launch multi-platform distribution campaigns with tailored cutdowns.' },
    ],
    techStack: ['DaVinci Resolve Studio', 'Blender 3D', 'Three.js', 'Adobe Premiere Pro', 'Blackmagic Cinema'],
    idealFor: ['Brands launching flagship products', 'Companies hosting major customer summits', 'Luxury & consumer tech'],
    caseStudyPreview: {
      client: 'Velociti Cloud Summit',
      result: '12,000+ Live Attendees',
      description: 'Produced a virtual keynote with 3D product demos that generated 450+ enterprise demo requests in 48 hours.',
    },
    faqs: [
      {
        question: 'Do you provide location shooting and on-site event coverage?',
        answer: 'Yes! Our camera crews travel globally for on-site client documentaries, executive interviews, and major event productions.',
      },
      {
        question: 'How do you repurpose long-form video content?',
        answer: 'A single 30-minute documentary or keynote is sliced into 15+ vertical Reels, quote carousels, blog posts, and soundbite clips for ongoing social distribution.',
      },
    ],
  },
};
