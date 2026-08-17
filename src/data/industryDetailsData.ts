import React from 'react';

export interface IndustryDetailData {
  slug: string;
  name: string;
  categoryBadge: string;
  tagline: string;
  overview: string;
  heroMetrics: { label: string; value: string }[];
  challenges: { problem: string; solution: string }[];
  playbooks: { title: string; desc: string }[];
  caseStudyPreview: {
    client: string;
    result: string;
    description: string;
  };
  keyChannels: string[];
  faqs: { question: string; answer: string }[];
}

export const INDUSTRY_SLUGS = [
  'real-estate',
  'healthcare',
  'education',
  'finance',
  'saas',
  'legal',
  'hospitality',
  'luxury',
  'professional-services',
] as const;

export type IndustrySlug = typeof INDUSTRY_SLUGS[number];

export const INDUSTRY_DETAILS: Record<IndustrySlug, IndustryDetailData> = {
  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate & Property Developers',
    categoryBadge: 'High-Ticket Lead Generation & Site Visits',
    tagline: 'Scale verified high-net-worth buyer inquiries, weekend site visits, and rapid unit sales.',
    overview:
      'We engineer high-converting digital pipelines for luxury residential developments, commercial towers, gated communities, and real estate developers. From hyper-targeted Google Search ads targeting high-budget and NRI investors to immersive 3D interactive floorplans and automated CRM lead scoring.',
    heroMetrics: [
      { label: 'Cost Per Verified Site Visit', value: '-42%' },
      { label: 'Verified HNI Inquiries', value: '45,000+' },
      { label: 'Inventory Sold Value', value: '₹420+ Cr' },
    ],
    challenges: [
      {
        problem: 'High volume of unqualified, fake, or low-budget portal leads wasting sales teams’ time.',
        solution: 'Multi-step qualification funnels filtering by budget threshold, location preference, and purchase timeline before passing to CRM.',
      },
      {
        problem: 'Long sales cycles and high drop-offs between ad click and physical site visit.',
        solution: 'Instant automated WhatsApp booking bots, calendar syncing, and personalized 3D virtual site tour confirmations.',
      },
    ],
    playbooks: [
      {
        title: 'Hyperlocal GEO & NRI Target Strategy',
        desc: 'Custom-built radius bidding targeting tech corridors, corporate hubs, and high-income postal codes alongside GCC/US NRI buyer segments.',
      },
      {
        title: 'High-Converting Floorplan & VR Landing Pages',
        desc: 'Sub-second loading mobile landing pages featuring interactive 360° drone captures, unit configurations, and pricing calculators.',
      },
      {
        title: 'Google Map Pack & Neighborhood Dominance SEO',
        desc: 'Dominating local search rankings for "luxury apartments in [Location]" and project-specific name queries.',
      },
      {
        title: 'Automated WhatsApp & CRM Fast-Response Triggers',
        desc: 'Immediate two-way WhatsApp nurturing delivering brochures, location maps, and instant site visit scheduling.',
      },
    ],
    caseStudyPreview: {
      client: 'Apex Grandeur Luxury Residences',
      result: '120 Units Sold Out in 4 Months',
      description: 'Engineered a hyper-targeted paid search and Meta VR campaign generating ₹185 Cr in booked inventory with 6.4x ROAS.',
    },
    keyChannels: ['Google Search & PMax', 'Meta Direct Response', 'WhatsApp API Automation', 'Local SEO & Schema', 'YouTube Video Tours'],
    faqs: [
      {
        question: 'How do you guarantee lead quality over quantity in real estate?',
        answer: 'We deploy multi-tier form filters with OTP verification, minimum budget qualifying questions, and negative keyword lists that exclude rental or low-budget inquiries.',
      },
      {
        question: 'Can you integrate leads into our existing real estate CRM?',
        answer: 'Yes, we seamlessly integrate webhook triggers into Salesforce, LeadSquared, HubSpot, Sell.Do, and Zoho CRM in real-time.',
      },
    ],
  },
  'healthcare': {
    slug: 'healthcare',
    name: 'Healthcare, Hospitals & Clinics',
    categoryBadge: 'HIPAA & NABH Compliant Patient Acquisition',
    tagline: 'Drive super-speciality OPD consultations, elective surgery bookings, and local patient trust.',
    overview:
      'Empower multi-speciality hospitals, IVF clinics, diagnostic centers, cosmetic surgery institutes, and dental chains with ethical, trust-first digital marketing. We build medical authority through medical schema SEO, doctor video education, and verified reputation systems.',
    heroMetrics: [
      { label: 'OPD Bookings Surge', value: '+310%' },
      { label: 'Cost Per Consult Reduction', value: '-45%' },
      { label: 'Verified Google Review Score', value: '4.9 / 5' },
    ],
    challenges: [
      {
        problem: 'Strict advertising compliance guidelines (HIPAA/NABH) and user privacy restrictions on patient health queries.',
        solution: 'Ethical condition-based educational funnels, zero-PII server-side tracking, and approved medical disclaimer protocols.',
      },
      {
        problem: 'Low trust from generic ad copy for critical elective and high-ticket surgeries.',
        solution: 'Doctor-led video case studies, treatment explainers, and patient recovery documentary stories.',
      },
    ],
    playbooks: [
      {
        title: 'Medical Condition & Treatment SEO Silos',
        desc: 'Ranking for high-intent symptom, specialist, and treatment queries with doctor-authored, medically verified content schema.',
      },
      {
        title: 'Google Maps Local 3-Pack Supremacy',
        desc: 'Securing top ranking for "best cardiologist near me", "emergency clinic [City]", and departmental hospital locations.',
      },
      {
        title: 'Doctor Authority & Video Syndication',
        desc: 'Short-form myth-busting Reels and YouTube podcasts establishing senior surgeons as the definitive experts.',
      },
      {
        title: 'Frictionless Appointment & Tele-Consult Funnels',
        desc: 'Instant slot booking web tools synced directly with hospital HMS schedules for OPD and tele-consults.',
      },
    ],
    caseStudyPreview: {
      client: 'Aura Advanced Fertility & IVF Centre',
      result: '340% Growth in IVF Consultations',
      description: 'Captured high-intent search traffic and deployed compassionate video patient journeys, cutting cost per consultation by 42%.',
    },
    keyChannels: ['Google Local 3-Pack', 'Medical Schema SEO', 'Doctor YouTube Series', 'Meta Educational Ads', 'Practo & GMB Management'],
    faqs: [
      {
        question: 'Are your healthcare marketing campaigns compliant with medical regulations?',
        answer: 'Yes, all creative copy and ad structures strictly adhere to medical ethics boards, avoiding sensational claims and protecting patient anonymity.',
      },
      {
        question: 'How do you track hospital conversions accurately?',
        answer: 'We use HIPAA-compliant call tracking, automated slot booking confirmation webhooks, and reception check-in reconciliation.',
      },
    ],
  },
  'education': {
    slug: 'education',
    name: 'Education, Universities & EdTech',
    categoryBadge: 'Seasonal & Year-Round Student Admissions',
    tagline: 'Maximize qualified student applications, campus tours, and online course enrollments.',
    overview:
      'Transform seasonal recruitment for universities, premier coaching institutes, international K-12 schools, and EdTech platforms into predictable, compounding admission pipelines with data-driven full-funnel marketing.',
    heroMetrics: [
      { label: 'Verified Admission Inquiries', value: '18,500+' },
      { label: 'Application-to-Enrollment Rate', value: '28.4%' },
      { label: 'Student CAC Reduction', value: '-52%' },
    ],
    challenges: [
      {
        problem: 'Extreme seasonality with high cost-per-lead spikes during admission months.',
        solution: 'Year-round brand affinity campaigns and automated early-bird scholarship diagnostic webinars that warm prospects months ahead.',
      },
      {
        problem: 'Parents and students require multiple touchpoints before deciding on high-tuition programs.',
        solution: 'Omnichannel multi-touch nurture tracks combining WhatsApp brochures, campus virtual tours, and alumni success stories.',
      },
    ],
    playbooks: [
      {
        title: 'Course-Specific High-Intent Search Ads',
        desc: 'Laser-targeted Google Search targeting degrees, MBA programs, competitive exam batches, and career transition keywords.',
      },
      {
        title: 'Interactive Entrance Mock Tests & Scholarship Engines',
        desc: 'Interactive quiz funnels and aptitude assessments that capture student emails and phone numbers with high intent.',
      },
      {
        title: 'Campus Tour & Counseling Booking Funnels',
        desc: 'Streamlined appointment scheduling for one-on-one admission counselor sessions and open house days.',
      },
      {
        title: 'Alumni Placement Proof Syndication',
        desc: 'Authentic video spotlights detailing student packages, career transitions, and international placements.',
      },
    ],
    caseStudyPreview: {
      client: 'Meridian Global Institute of Technology',
      result: '100% Seats Filled 3 Weeks Early',
      description: 'Generated 4,200+ verified engineering and management entrance applications with a 52% reduction in ad spend CAC.',
    },
    keyChannels: ['Google Search & YouTube', 'Meta Student Micro-Targeting', 'LinkedIn Career Campaigns', 'Automated Email Drips', 'WhatsApp Counselor Bots'],
    faqs: [
      {
        question: 'How do you target both students and fee-paying parents?',
        answer: 'We deploy split audience architectures: engaging lifestyle and campus life creative on Instagram/YouTube for students, and ROI/placement statistics on Facebook/LinkedIn for parents.',
      },
      {
        question: 'Can you scale enrollments for online certification courses?',
        answer: 'Yes, we specialize in automated webinar funnels, free mini-course lead magnets, and retargeting loops that drive high-ticket online enrollments.',
      },
    ],
  },
  'finance': {
    slug: 'finance',
    name: 'Finance, FinTech & Wealth Management',
    categoryBadge: 'High-Security & Regulatory Compliant FinTech Growth',
    tagline: 'Scale verified high-net-worth investors, loan applications, and institutional advisory clients.',
    overview:
      'We engineer compliant, high-trust acquisition engines for wealth management firms, NBFCs, private equity, FinTech apps, and chartered accountancy practices. Precision targeting connects you with affluent investors and commercial borrowers.',
    heroMetrics: [
      { label: 'HNW Inbound Inquiries', value: '12,400+' },
      { label: 'Avg AUM Generated', value: '₹340+ Cr' },
      { label: 'Customer Payback Period', value: '1.8 Months' },
    ],
    challenges: [
      {
        problem: 'Strict financial regulations and high CPC competition on core financial search terms.',
        solution: 'Entity-based financial schema SEO, long-tail tax/investment calculators, and compliant ad copy approved for financial networks.',
      },
      {
        problem: 'High customer skepticism regarding financial risk and asset security.',
        solution: 'Transparent case proof, founder credentials, regulatory certifications, and white-glove educational research reports.',
      },
    ],
    playbooks: [
      {
        title: 'High-Intent Financial Search & PMax Ads',
        desc: 'Capturing users searching for portfolio management, corporate debt financing, and private wealth advisory.',
      },
      {
        title: 'Interactive Retirement & SIP ROI Calculators',
        desc: 'Interactive web tools that calculate tax savings and projected returns, capturing high-intent financial leads.',
      },
      {
        title: 'LinkedIn Account-Based Marketing for CFOs',
        desc: 'Reaching decision-makers at mid-market and enterprise firms for corporate finance and liquidity solutions.',
      },
      {
        title: 'Executive Financial Insights & Research Whitepapers',
        desc: 'Quarterly macroeconomic outlook reports positioning your leadership team as market visionaries.',
      },
    ],
    caseStudyPreview: {
      client: 'Vanguard Wealth Partners',
      result: '₹140 Cr New AUM in 90 Days',
      description: 'Captured high-net-worth individuals through targeted market research downloads and high-converting private consult funnels.',
    },
    keyChannels: ['Google Financial Ads', 'LinkedIn ABM', 'Looker Attribution', 'Interactive Web Tools', 'Financial PR & Newsletters'],
    faqs: [
      {
        question: 'How do you navigate financial compliance and ad restrictions?',
        answer: 'We ensure all creative collateral includes mandated disclaimers, complies with Google Financial Services verification, and maintains bank-grade data security.',
      },
      {
        question: 'Do you work with early-stage FinTech applications?',
        answer: 'Yes, we optimize app install campaigns, user onboarding funnels, and activation loops to drive low-cost app adoption.',
      },
    ],
  },
  'saas': {
    slug: 'saas',
    name: 'SaaS & Enterprise B2B Tech',
    categoryBadge: 'Product-Led & Sales-Assisted Pipeline Growth',
    tagline: 'Compound demo bookings, free trial activations, and ARR with predictable B2B funnels.',
    overview:
      'We scale ARR for high-growth B2B SaaS companies. By aligning product-led growth onboarding loops, high-intent Google Search, programmatic SEO, and LinkedIn ABM, we fill your sales pipeline with verified decision-maker SQLs.',
    heroMetrics: [
      { label: 'Demo-to-Opportunity Rate', value: '42%' },
      { label: 'Inbound Pipeline Value', value: '₹95+ Cr' },
      { label: 'Blended CAC Payback', value: '< 5 Months' },
    ],
    challenges: [
      {
        problem: 'Long sales cycles with multiple stakeholders causing pipeline stalls.',
        solution: 'Multi-threaded retargeting educating both end-users and procurement/C-suite buyers on security and ROI.',
      },
      {
        problem: 'High churn and poor trial-to-paid conversion rates.',
        solution: 'Product telemetry onboarding tracking, automated email activation triggers, and interactive product tours.',
      },
    ],
    playbooks: [
      {
        title: 'High-Intent Alternative & Competitor SEO Silos',
        desc: 'Capturing ready-to-buy software buyers searching for "[Competitor] Alternatives" and "Best [Category] Software".',
      },
      {
        title: 'LinkedIn Account-Based Marketing (ABM)',
        desc: 'Hyper-focused campaigns targeting specific enterprise target account lists with customized value propositions.',
      },
      {
        title: 'Interactive Interactive Demo Environments',
        desc: 'Self-guided interactive product sandboxes that allow prospects to experience software value in under 60 seconds.',
      },
      {
        title: 'Full-Funnel HubSpot & Salesforce Attribution',
        desc: 'Closed-loop revenue tracking tying every dollar of ad spend directly to closed-won enterprise software contracts.',
      },
    ],
    caseStudyPreview: {
      client: 'Velociti Cloud Platform',
      result: '₹1 Cr → ₹10 Cr ARR Growth',
      description: 'Lowered B2B customer acquisition cost by 42% and scaled inbound sales pipeline by 320% across 9 months.',
    },
    keyChannels: ['Programmatic SEO', 'LinkedIn ABM', 'Google Search Ads', 'HubSpot RevOps', 'Interactive Product Tours'],
    faqs: [
      {
        question: 'Do you focus on PLG (Product-Led) or SLG (Sales-Led) SaaS models?',
        answer: 'We support both: optimizing self-serve signups for PLG tools, and generating qualified enterprise sales demo requests for SLG models.',
      },
      {
        question: 'How do you track software attribution accurately?',
        answer: 'We integrate server-side GA4, Segment, and CRM webhooks to trace every converted customer from their first ad click to renewals.',
      },
    ],
  },
  'legal': {
    slug: 'legal',
    name: 'Legal, Law Firms & Corporate Attorneys',
    categoryBadge: 'High-Value Client & Case Acquisition',
    tagline: 'Secure high-retainer corporate legal clients, commercial litigation, and specialized cases.',
    overview:
      'Law firms require a sophisticated, authoritative approach that conveys integrity and winning track records. We build dominant search presence and corporate reputation systems that attract high-retainer clients for corporate law, M&A, intellectual property, and civil disputes.',
    heroMetrics: [
      { label: 'High-Ticket Inbound Retainers', value: '450+' },
      { label: 'Search Page 1 Domination', value: '94%' },
      { label: 'Average Client LTV Lift', value: '+75%' },
    ],
    challenges: [
      {
        problem: 'Extremely high CPCs on legal search terms and stringent bar council advertising limitations.',
        solution: 'Authoritative topical organic SEO clusters, case law commentary, and organic thought leadership on LinkedIn.',
      },
      {
        problem: 'Converting skeptical clients dealing with urgent or confidential legal matters.',
        solution: 'Frictionless, confidential consultation intake forms with secure client portal integrations.',
      },
    ],
    playbooks: [
      {
        title: 'Practice-Area Specific Topical Search SEO',
        desc: 'Dominating rankings for high-stakes corporate governance, IP litigation, and arbitration queries.',
      },
      {
        title: 'Partner Thought Leadership & Law Reviews',
        desc: 'Publishing landmark judgment analysis and regulatory updates that establish managing partners as leading counsel.',
      },
      {
        title: 'Confidential Client Intake & Calendar Sync',
        desc: 'Instant, secure consultation scheduling that filters prospective cases by jurisdiction and merit.',
      },
      {
        title: 'High-Authority Legal PR & Media Citations',
        desc: 'Securing quotes and legal commentary features across top business newspapers and legal journals.',
      },
    ],
    caseStudyPreview: {
      client: 'Sterling & Associates Law Chambers',
      result: '38 New Corporate Retainers',
      description: 'Ranked #1 for 24 high-value corporate law and IP dispute keywords, securing multi-crore annual retainer clients.',
    },
    keyChannels: ['Legal Schema SEO', 'Executive LinkedIn Ghostwriting', 'Legal PR & Media', 'Confidential Booking CRM'],
    faqs: [
      {
        question: 'How do you handle bar council advertising restrictions?',
        answer: 'All marketing frameworks comply strictly with professional conduct rules, focusing on authoritative legal education and organic reputation rather than promotional solicitation.',
      },
      {
        question: 'Can you help our partners build executive personal brands?',
        answer: 'Yes, our legal ghostwriting team helps senior partners publish high-signal case analyses and legal commentary on LinkedIn.',
      },
    ],
  },
  'hospitality': {
    slug: 'hospitality',
    name: 'Hospitality, Luxury Hotels & Resorts',
    categoryBadge: 'Direct Booking Engine & OTA Commission Saver',
    tagline: 'Bypass hefty OTA fees, fill rooms with direct bookings, and maximize banquet revenue.',
    overview:
      'Help luxury heritage hotels, 5-star resorts, boutique stays, and high-end restaurant chains capture guests directly. We blend cinematic visual storytelling, Google Hotel Ads, influencer retreats, and automated guest CRM loyalty flows to maximize REVPAR.',
    heroMetrics: [
      { label: 'Direct Booking Share', value: '58%' },
      { label: 'OTA Commission Saved', value: '₹1.8 Cr' },
      { label: 'Peak Weekend Occupancy', value: '96%' },
    ],
    challenges: [
      {
        problem: 'Paying 18-25% commissions to OTAs like Booking.com, Agoda, and MakeMyTrip.',
        solution: 'Metasearch Google Hotel Ads offering direct booking perks, best-rate guarantees, and frictionless reservation funnels.',
      },
      {
        problem: 'Off-season occupancy dips and underutilized banquet halls.',
        solution: 'Destination wedding and corporate retreat campaigns targeting event planners and affluent couples.',
      },
    ],
    playbooks: [
      {
        title: 'Google Hotel Ads & Direct Metasearch Setup',
        desc: 'Bidding directly on Google Maps and Search reservation modules to capture guests at the point of booking.',
      },
      {
        title: 'Visual Storytelling & Luxury Instagram Campaigns',
        desc: 'Cinematic drone reels, culinary showcases, and experience-first creative that inspire wanderlust.',
      },
      {
        title: 'Destination Wedding & MICE Banquet Lead Engines',
        desc: 'High-converting dedicated landing pages and virtual walkthroughs for luxury weddings and corporate summits.',
      },
      {
        title: 'Guest Lifecycle Email & WhatsApp Remarketing',
        desc: 'Automated pre-arrival guides, room upgrade offers, and anniversary re-booking discount sequences.',
      },
    ],
    caseStudyPreview: {
      client: 'The Regal Palace Resort & Spa',
      result: '58% Direct Booking Share',
      description: 'Shifted majority of reservations away from OTAs to direct website bookings, saving ₹1.8 Cr in commissions with 5.8x ROAS.',
    },
    keyChannels: ['Google Hotel Ads', 'Instagram Cinematic Reels', 'Metasearch API', 'Destination Wedding Funnels', 'Guest CRM Drips'],
    faqs: [
      {
        question: 'How do you compete with large OTA advertising budgets?',
        answer: 'We leverage Google Hotel Ads direct price feeds, local SEO dominance, and exclusive direct-booking perks (e.g., complimentary breakfast/spa) that OTAs cannot match.',
      },
      {
        question: 'Can you generate inquiries for weddings and corporate events?',
        answer: 'Yes, our dedicated banquet and event lead funnels capture high-budget wedding planners and corporate HR teams with comprehensive package decks.',
      },
    ],
  },
  'luxury': {
    slug: 'luxury',
    name: 'Luxury, Fine Jewelry & Premium Brands',
    categoryBadge: 'Ultra-High-Net-Worth Brand Exclusivity',
    tagline: 'Cultivate brand desire, VIP client loyalty, and high-ticket sales without discounting.',
    overview:
      'Luxury requires restraint, flawless aesthetic taste, and hyper-curated storytelling. We craft digital experiences for haute horlogerie, fine diamond jewelry, luxury apparel, and bespoke artisan brands that command premium price points and attract UHNW buyers.',
    heroMetrics: [
      { label: 'Average Order Value Lift', value: '+65%' },
      { label: 'VIP In-Store Appointments', value: '6,200+' },
      { label: 'Return on Ad Spend (ROAS)', value: '7.2x' },
    ],
    challenges: [
      {
        problem: 'Maintaining brand prestige while running digital performance ad campaigns.',
        solution: 'Ultra-aesthetic editorial visuals, invitation-only private previews, and zero-discount conversion strategies.',
      },
      {
        problem: 'Reaching genuine Ultra-High-Net-Worth (UHNW) buyers online without ad budget waste.',
        solution: 'First-party affluent audience targeting, private banking partnerships, and luxury lifestyle lookalikes.',
      },
    ],
    playbooks: [
      {
        title: 'Editorial Visual Studio & Heritage Documentaries',
        desc: 'Cinema-grade craft storytelling highlighting craftsmanship, rare materials, and generational legacy.',
      },
      {
        title: 'VIP Private Salon & Concierge Booking Systems',
        desc: 'Exclusive white-glove appointment booking for boutique viewings and bespoke custom commissions.',
      },
      {
        title: 'Sub-Second Luxury Web & Mobile Experience',
        desc: 'Minimalist typography, silky motion interactions, and high-resolution zooming micro-interactions.',
      },
      {
        title: 'Curated Influencer & Patron Tastemaker Campaigns',
        desc: 'Organic placement with verified culture icons, art collectors, and authentic luxury tastemakers.',
      },
    ],
    caseStudyPreview: {
      client: 'Aethel Fine Horology & Jewelry',
      result: '7.2x ROAS & 6,200+ VIP Bookings',
      description: 'Launched an exclusive private concierge reservation engine driving ₹32 Cr in bespoke timepiece orders in 6 months.',
    },
    keyChannels: ['Editorial Instagram Ads', 'Private Concierge Funnels', 'Heritage Video Series', 'VIP Email Salons', 'UHNW Audience Modeling'],
    faqs: [
      {
        question: 'How do you prevent luxury brands from looking like generic e-commerce?',
        answer: 'We reject generic discounting templates, using bespoke typography, subtle Motion animations, and storytelling centered on craft and provenance.',
      },
      {
        question: 'Do you manage appointment bookings for physical luxury boutiques?',
        answer: 'Yes, we specialize in driving high-intent, qualified private viewing bookings to flagship physical boutiques and private showrooms.',
      },
    ],
  },
  'professional-services': {
    slug: 'professional-services',
    name: 'Professional Services & Management Consulting',
    categoryBadge: 'B2B Enterprise Authority & Inbound Retainers',
    tagline: 'Position your firm as the undisputed industry authority and attract high-value client engagements.',
    overview:
      'We empower management consultancies, auditing firms, architectural practices, HR advisories, and engineering firms to win multi-year corporate contracts. Strategic positioning and thought leadership convert corporate decision-makers into inbound clients.',
    heroMetrics: [
      { label: 'Avg Inbound Proposal Value', value: '₹45L+' },
      { label: 'Enterprise SQL Growth', value: '+240%' },
      { label: 'Proposal Win Rate', value: '64%' },
    ],
    challenges: [
      {
        problem: 'Heavy reliance on traditional word-of-mouth leading to inconsistent revenue quarters.',
        solution: 'Predictable inbound thought leadership engines capturing C-suite executives actively seeking advisory solutions.',
      },
      {
        problem: 'Difficulty demonstrating complex intangible expertise to non-technical corporate buyers.',
        solution: 'Data-rich benchmark reports, proprietary diagnostic frameworks, and client transformation case studies.',
      },
    ],
    playbooks: [
      {
        title: 'Benchmark Industry Whitepapers & Lead Engines',
        desc: 'Authoritative annual trend reports that capture C-level emails and spark executive boardroom discussions.',
      },
      {
        title: 'C-Suite Account-Based Retargeting',
        desc: 'Re-engaging website visitors across LinkedIn and premium business news sites with tailored case studies.',
      },
      {
        title: 'Partner Podcast & Keynote Syndication',
        desc: 'Distributing video soundbites from industry summits and podcast appearances across corporate networks.',
      },
      {
        title: 'Conversion-Optimized Proposal Request Flows',
        desc: 'Clear RFP intake funnels that capture project scope, budget allocation, and delivery timelines.',
      },
    ],
    caseStudyPreview: {
      client: 'Kalyan Management Advisory',
      result: '240% Inbound Growth',
      description: 'Positioned partners across top financial media and deployed benchmark reports that directly generated 14 new annual enterprise retainers.',
    },
    keyChannels: ['LinkedIn ABM', 'Industry Whitepapers', 'Executive Podcasts', 'Thought Leadership SEO', 'High-Trust RFP Funnels'],
    faqs: [
      {
        question: 'How do you attract large enterprise contracts versus small low-budget leads?',
        answer: 'We filter using minimum employee/revenue qualification thresholds, ABM list targeting on LinkedIn, and sophisticated case-study gated assets.',
      },
      {
        question: 'Can you help ghostwrite articles for our consulting partners?',
        answer: 'Yes, our business editorial team extracts partner insights via 20-minute interviews and crafts executive-level articles for Forbes, LinkedIn, and trade journals.',
      },
    ],
  },
};
