import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { IndustrySlug, INDUSTRY_DETAILS } from '../data/industryDetailsData';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Building2,
  HeartPulse,
  GraduationCap,
  Landmark,
  Cpu,
  Scale,
  Utensils,
  Crown,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  TrendingUp,
  Target,
  Layers,
  ArrowDown,
  Compass,
  BarChart3,
  Users,
  ShieldCheck,
  MapPin,
  FileText,
  PhoneCall,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface IndustryDetailPageProps {
  slug: IndustrySlug;
  onNavigate: (page: PageType) => void;
  onNavigateToIndustrySlug?: (slug: IndustrySlug) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToLocation?: (slug: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  slug,
  onNavigate,
  onNavigateToIndustrySlug,
  onNavigateToServiceSlug,
  onNavigateToLocation,
  onOpenBooking,
}) => {
  const currentSlug: IndustrySlug = slug || 'real-estate';
  const industry = INDUSTRY_DETAILS[currentSlug] || INDUSTRY_DETAILS['real-estate'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = `${industry.name} Digital Marketing | Demand, Acquisition & Funnel Systems | MatricsMania`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlug, industry.name]);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // 04 — Real Estate Customer Journey Stages
  const customerJourney = [
    {
      step: '01',
      stage: 'DISCOVER',
      mindset: '"I am exploring properties."',
      channels: ['Google Search', 'Meta & Instagram Ads', 'YouTube Walkthroughs', 'AI Search Overviews', 'Topic Authority Content'],
    },
    {
      step: '02',
      stage: 'RESEARCH',
      mindset: '"Is this property worth considering?"',
      channels: ['Project Master Pages', 'Locality Analysis & Commute Times', 'Buyer Reviews & Credentials', 'Pricing & Floor Guides', 'Video Tours'],
    },
    {
      step: '03',
      stage: 'SHORTLIST',
      mindset: '"Should I contact them?"',
      channels: ['Unit Configurations', 'Interactive Floor Plans', 'Amenity Breakdowns', 'Competitor Comparisons', 'RERA & Trust Badges'],
    },
    {
      step: '04',
      stage: 'ENQUIRE',
      mindset: '"I want more information."',
      channels: ['Frictionless Lead Forms', 'WhatsApp Click-to-Chat', 'Direct Inbound Calls', 'Instant Brochure Download', 'Self-Serve Visit Booking'],
    },
    {
      step: '05',
      stage: 'QUALIFY',
      mindset: '"Is this prospect commercially relevant?"',
      channels: ['Budget Threshold Filtering', 'Locality & Size Preference', 'Property Typology Match', 'Purchase Timeline', 'Commercial Intent Scoring'],
    },
    {
      step: '06',
      stage: 'VISIT',
      mindset: '"I want to experience the property."',
      channels: ['Physical Site Visit Scheduling', 'Calendar Automation & Reminders', 'Interactive Virtual Tours', 'Dedicated Sales Rep Alignment'],
    },
    {
      step: '07',
      stage: 'DECIDE',
      mindset: '"Should I buy?"',
      channels: ['Hyper-Targeted Retargeting', 'WhatsApp Follow-Up Workflows', 'Financing & Loan Collateral', 'Social Proof & Milestones', 'Sales Enablement'],
    },
    {
      step: '08',
      stage: 'BOOK',
      mindset: 'Commercial Outcome.',
      channels: ['Token Deposit', 'Unit Selection & Agreement', 'RERA Documentation', 'Final Commercial Booking'],
    },
  ];

  // 05 — Where We Create Growth (Mapping Journey to Growth Engines)
  const growthMapping = [
    {
      journeyStage: 'Discovery',
      disciplines: ['SEO & Local Search', 'Content Architecture', 'Paid Search & Social Media', 'AI Search Optimization (GEO)'],
      description: 'Capture active high-intent property searchers and build broad awareness across high-net-worth target demographics.',
    },
    {
      journeyStage: 'Research',
      disciplines: ['Locality Guides', 'Project SEO Silos', 'High-Speed Web Experience', 'Video Production & Tours'],
      description: 'Answer the exact technical, legal, and lifestyle questions buyers ask before shortlisting a developer.',
    },
    {
      journeyStage: 'Shortlist',
      disciplines: ['Conversion Rate Optimization (CRO)', 'Dedicated Project Landing Pages', 'Reputation & Entity Authority'],
      description: 'Eliminate friction, highlight architectural differentiators, and establish undeniable development credibility.',
    },
    {
      journeyStage: 'Enquiry',
      disciplines: ['Google Ads (PMax & Search)', 'Meta Direct-Response Ads', 'Frictionless Mobile Capture Funnels'],
      description: 'Deploy precision ad bidding that drives high-intent form submissions, WhatsApp chats, and phone inquiries.',
    },
    {
      journeyStage: 'Qualification',
      disciplines: ['CRM Webhook Integration', 'Marketing Automation Flows', 'Dynamic Lead Scoring Models'],
      description: 'Automatically filter out low-budget or irrelevant submissions so sales reps focus exclusively on qualified buyers.',
    },
    {
      journeyStage: 'Site Visit',
      disciplines: ['Cross-Channel Retargeting', 'Multi-Stage SMS & WhatsApp Nurture', 'Automated Calendar Reminders'],
      description: 'Bridge the critical gap between digital form submission and physical presence on the project site.',
    },
    {
      journeyStage: 'Decision',
      disciplines: ['Remarketing Sequences', 'Proof & Construction Milestones', 'Sales Collateral Enablement'],
      description: 'Reinforce buyer confidence and assist sales negotiations during high-consideration deliberation periods.',
    },
  ];

  // 06 — Real Estate Specific Capabilities (6 Systems)
  const capabilitiesSystems = [
    {
      num: '01',
      title: 'Demand Generation',
      items: [
        'High-Intent Google Search Ads',
        'Performance Max Campaigns',
        'Meta & Instagram Acquisition',
        'Cross-Platform Retargeting',
        'High-Net-Worth & NRI Audience Targeting',
      ],
      icon: Target,
      slug: 'performance-marketing',
    },
    {
      num: '02',
      title: 'Property Search Visibility',
      items: [
        'Hyperlocal & Google Map Pack SEO',
        'Project-Specific SEO Architecture',
        'Technical & Core Web Vitals Optimization',
        'Neighborhood & Locality Content Hubs',
        'AI Search Visibility (ChatGPT, Perplexity, GEO)',
      ],
      icon: Search,
      slug: 'technical-seo',
    },
    {
      num: '03',
      title: 'Property Digital Experience',
      items: [
        'Dedicated Project Landing Pages',
        'High-Speed Property Web Portals',
        'Interactive Floor-Plan Presentations',
        'Location & Commute Time Modules',
        'Conversion Rate Optimization (CRO)',
      ],
      icon: Cpu,
      slug: 'conversion-rate-optimization',
    },
    {
      num: '04',
      title: 'Trust & Consideration',
      items: [
        'Buyer Education & Investment Guides',
        'Architect & Founder Video Strategy',
        'Verified Google Review Systems',
        'Digital PR & Publication Features',
        'RERA Transparency & Authority Building',
      ],
      icon: ShieldCheck,
      slug: 'technical-seo',
    },
    {
      num: '05',
      title: 'Lead Qualification & CRM',
      items: [
        'CRM Integration (Salesforce, LeadSquared, Sell.Do)',
        'Budget & Intent Lead Scoring',
        'Two-Way WhatsApp Automation',
        'Automated Site-Visit Booking Flows',
        'Drop-off Recovery Sequences',
      ],
      icon: Zap,
      slug: 'analytics-attribution',
    },
    {
      num: '06',
      title: 'Measurement & Attribution',
      items: [
        'First-Touch to Closed-Sale Attribution',
        'Full-Funnel Analytics Pipelines',
        'Cost Per Verified Site Visit (CPVSV)',
        'Server-Side Conversion Tracking',
        'Sales-Stage Pipeline Dashboards',
      ],
      icon: BarChart3,
      slug: 'analytics-attribution',
    },
  ];

  // 08 — What We Measure (From Marketing Metrics to Commercial Metrics)
  const measurementLayers = [
    {
      layer: 'Visibility',
      metrics: 'Search impressions, local map pack rankings, qualified demographic reach, AI engine citations',
      impact: 'Establishes top-of-mind project awareness among active buyers',
    },
    {
      layer: 'Acquisition',
      metrics: 'Cost Per Click (CPC), Cost Per Lead (CPL), Blended Customer Acquisition Cost (CAC)',
      impact: 'Ensures advertising capital is deployed with maximum media efficiency',
    },
    {
      layer: 'Lead Quality',
      metrics: 'Verified phone numbers, budget qualification rate, NRI ratio, intent score',
      impact: 'Stops sales teams from wasting time on low-budget or fake leads',
    },
    {
      layer: 'Engagement',
      metrics: 'Inbound phone calls, two-way WhatsApp dialogues, brochure downloads, floorplan views',
      impact: 'Measures active buyer interest and digital research depth',
    },
    {
      layer: 'Sales Readiness',
      metrics: 'Confirmed site visits, scheduled virtual tours, showroom walk-ins',
      impact: 'The primary leading indicator of property booking velocity',
    },
    {
      layer: 'Revenue',
      metrics: 'Total booked inventory value, average unit price, cost per confirmed booking',
      impact: 'Connects digital marketing directly to bottom-line sales outcomes',
    },
    {
      layer: 'Retention & Referral',
      metrics: 'Channel partner referrals, investor repeat transactions, word-of-mouth pipeline',
      impact: 'Compounds brand equity across subsequent development phases',
    },
  ];

  // 10 — Related Services
  const relatedServicesList = [
    { name: 'SEO & Search Strategy', slug: 'technical-seo', desc: 'Dominating organic search queries for luxury properties and regional developments.' },
    { name: 'Technical SEO', slug: 'technical-seo', desc: 'Schema architecture, instant load speeds, and multi-location structure.' },
    { name: 'Local SEO & Map Pack', slug: 'technical-seo', desc: 'Hyperlocal ranking for regional property and neighborhood search queries.' },
    { name: 'Google Ads & PMax', slug: 'performance-marketing', desc: 'Capturing active commercial intent with high-precision bidding strategies.' },
    { name: 'Meta & Instagram Ads', slug: 'performance-marketing', desc: 'Visual storytelling and immersive creative campaigns targeted to HNIs.' },
    { name: 'AI Search Optimization (GEO)', slug: 'technical-seo', desc: 'Ensuring your development is cited inside ChatGPT, Perplexity, and Gemini.' },
    { name: 'Conversion Rate Optimization', slug: 'conversion-rate-optimization', desc: 'Transforming website traffic into qualified brochure downloads and site visits.' },
    { name: 'Landing Page Engineering', slug: 'conversion-rate-optimization', desc: 'Sub-second mobile landing pages with interactive unit configuration modules.' },
    { name: 'Marketing Automation & CRM', slug: 'analytics-attribution', desc: 'Connecting digital ads to LeadSquared, Sell.Do, and Salesforce workflows.' },
    { name: 'Analytics & Attribution', slug: 'analytics-attribution', desc: 'Multi-touch attribution tracking from ad click to signed property deed.' },
  ];

  // 11 — Related Locations
  const relatedLocationsList = [
    { city: 'Bangalore', slug: 'locations/bangalore', desc: 'Tech corridors, luxury villa communities & Grade-A commercial developments.' },
    { city: 'Mumbai', slug: 'locations/mumbai', desc: 'Ultra-luxury high-rises, redevelopment projects & financial district commercial assets.' },
    { city: 'Delhi NCR', slug: 'locations/delhi', desc: 'Golf Course Road luxury towers, Noida IT corridors & Dwarka Expressway developments.' },
    { city: 'Hyderabad', slug: 'locations/hyderabad', desc: 'Financial District gated communities, HITEC City tech parks & Kokapet luxury.' },
    { city: 'Pune', slug: 'locations/pune', desc: 'IT corridor residences, premium townships & industrial commercial spaces.' },
    { city: 'Chennai', slug: 'locations/chennai', desc: 'OMR residential corridors, beachfront luxury & commercial logistics developments.' },
  ];

  // 12 — FAQs (10 Industry Specific Questions)
  const realEstateFaqs = [
    {
      question: 'What digital marketing services do you provide for real estate companies?',
      answer:
        'We build integrated acquisition architectures: high-intent Google Search and Meta advertising, Hyperlocal and Project SEO, AI search optimization (GEO), high-speed landing page engineering, automated CRM/WhatsApp qualification workflows, and multi-touch revenue attribution.',
    },
    {
      question: 'Can you work with real estate developers and builders?',
      answer:
        'Yes. We work directly with developers, builders, channel partners, and institutional property funds to market single residential projects, phased mega-townships, luxury villaments, and commercial office towers.',
    },
    {
      question: 'Can you help generate property enquiries through Google Ads?',
      answer:
        'Yes. We engineer hyper-targeted search campaigns that capture buyers searching for specific project names, luxury neighborhood keywords, and high-ticket investor queries. We pair this with strict negative keyword filters and OTP verification to ensure high commercial intent.',
    },
    {
      question: 'How do you improve real estate lead quality?',
      answer:
        'We replace generic one-click forms with multi-step qualifying funnels that filter by minimum budget, target timeline, preferred unit configuration, and purchase intention before syncing the lead to your CRM with a calculated readiness score.',
    },
    {
      question: 'Can you market individual projects?',
      answer:
        'Absolutely. We design dedicated, standalone project launch campaigns—including high-speed bespoke landing pages, interactive floor plans, localized search dominance, and event-driven site visit booking funnels.',
    },
    {
      question: 'Can you build SEO strategies for property and locality searches?',
      answer:
        'Yes. We build semantic topic clusters around locality overviews, commute times, infrastructure developments, and project comparisons, supported by JSON-LD RealEstateListing schema to dominate both Google Search and Google Maps.',
    },
    {
      question: 'How can real estate companies use AI search optimization?',
      answer:
        'We optimize your project specifications, press releases, and brand entities so that when buyers ask AI engines (ChatGPT, Perplexity, Google AI Overviews) for "best luxury 3BHK projects in [Location]", your properties are cited and recommended with authoritative source links.',
    },
    {
      question: 'Can you connect marketing campaigns with CRM and sales data?',
      answer:
        'Yes. We build bi-directional webhook integrations with LeadSquared, Sell.Do, Salesforce, HubSpot, and Zoho CRM. This allows us to track which specific campaign, keyword, or creative resulted in an actual physical site visit and closed booking.',
    },
    {
      question: 'How do you measure real estate marketing performance?',
      answer:
        'We measure commercial milestones rather than superficial clicks: Cost Per Verified Site Visit (CPVSV), budget qualification rate, sales velocity, and total booked inventory value.',
    },
    {
      question: 'Do you work with residential and commercial real estate?',
      answer:
        'Yes. We market luxury residential developments, gated villa communities, Grade-A office spaces, co-working facilities, and commercial retail corridors with distinct, tailored B2C and B2B buyer journeys.',
    },
  ];

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* 01 — HERO */}
      <section className="relative border-b border-[#1E293B] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
                <Building2 className="w-3.5 h-3.5" />
                <span>DIGITAL MARKETING FOR REAL ESTATE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Build a digital pipeline that moves buyers closer to the property.
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                MatricsMania builds digital acquisition systems for developers, brokers and real-estate businesses—from search discovery and paid acquisition to landing pages, lead qualification and conversion.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() =>
                    onOpenBooking({
                      serviceInterest: 'Real Estate Growth Strategy Call',
                      sourceLocation: 'Real Estate Industry Hero',
                    })
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#2563EB]/25 cursor-pointer"
                >
                  <span>Discuss Your Growth</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 flex items-center gap-2 text-xs font-mono font-semibold text-[#64748B]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>SEO · Paid Media · Content · CRO · Automation</span>
              </div>
            </ScrollReveal>

            {/* Right Abstract Visual (Funnel System Architecture - Zero Tourism / Stock Photo Imagery) */}
            <ScrollReveal delay={0.15} className="lg:col-span-5">
              <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#CBD5E1]">
                      ACQUISITION ARCHITECTURE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">FUNNEL MODEL</span>
                </div>

                {/* Minimalist System Diagram */}
                <div className="relative py-2 flex flex-col items-center space-y-4">
                  {/* Top Node */}
                  <div className="px-4 py-2 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/50 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>REAL ESTATE DEMAND</span>
                  </div>

                  {/* Channel Branches */}
                  <div className="w-full grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-[#070B14] border border-[#1E293B]">
                      <span className="text-[11px] font-bold text-white block">SEARCH</span>
                      <span className="text-[9px] text-[#64748B]">Google / SEO</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#070B14] border border-[#1E293B]">
                      <span className="text-[11px] font-bold text-white block">SOCIAL</span>
                      <span className="text-[9px] text-[#64748B]">Meta / IG</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#070B14] border border-[#1E293B]">
                      <span className="text-[11px] font-bold text-white block">VIDEO</span>
                      <span className="text-[9px] text-[#64748B]">YouTube Tours</span>
                    </div>
                  </div>

                  {/* Flow steps */}
                  <div className="w-full space-y-2 pt-1">
                    {[
                      { label: 'WEBSITE & LANDING PAGE', sub: 'Interactive unit plans & friction-free capture' },
                      { label: 'HIGH-INTENT ENQUIRY', sub: 'Verified phone & budget parameters' },
                      { label: 'LEAD QUALIFICATION', sub: 'Automated CRM scoring & WhatsApp filter' },
                      { label: 'VERIFIED SITE VISIT', sub: 'Calendar sync & showroom walk-in' },
                    ].map((st, i) => (
                      <div key={st.label} className="flex items-center gap-2 p-2 rounded-lg bg-[#070B14] border border-[#1E293B]/70">
                        <span className="w-5 h-5 rounded-md bg-[#2563EB]/20 text-[#60A5FA] font-mono text-[10px] flex items-center justify-center font-bold">
                          0{i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-white block truncate">{st.label}</span>
                          <span className="text-[10px] text-[#64748B] block truncate">{st.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outcome Terminal */}
                  <div className="w-full mt-1 p-3 rounded-xl bg-gradient-to-r from-[#2563EB]/20 via-[#1E293B] to-[#2563EB]/20 border border-[#2563EB]/50 text-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#60A5FA] uppercase block font-semibold">
                      COMMERCIAL ENDPOINT
                    </span>
                    <span className="text-sm font-extrabold text-white tracking-wide">
                      CONFIRMED PROPERTY BOOKING
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                  <span>Full-Funnel Alignment</span>
                  <span>Zero Stock Imagery</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 02 — INDUSTRY SNAPSHOT */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            EXECUTIVE SUMMARY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry Snapshot
          </h2>
        </ScrollReveal>

        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-10 divide-y divide-[#1E293B]">
          <div className="pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <span className="md:col-span-3 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
              WHO WE HELP
            </span>
            <div className="md:col-span-9 text-sm sm:text-base text-white font-medium">
              Developers · Builders · Brokers · Channel Partners · Commercial Property · Luxury Property · Residential Communities
            </div>
          </div>

          <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <span className="md:col-span-3 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
              WHAT WE SOLVE
            </span>
            <div className="md:col-span-9 text-sm sm:text-base text-[#CBD5E1]">
              Demand generation · Search &amp; AI visibility · Lead quality filtering · Conversion friction · Multi-stage follow-up · Full-funnel attribution
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <span className="md:col-span-3 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
              CORE OBJECTIVE
            </span>
            <div className="md:col-span-9 text-base sm:text-lg font-extrabold text-white">
              More qualified sales opportunities—not simply more low-intent enquiries.
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 03 — THE COMMERCIAL PROBLEM */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            THE COMMERCIAL PROBLEM
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real estate marketing has a lead problem—but it isn't simply a lead shortage.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            A property enquiry has very different commercial value depending on intent, budget, location, property fit and readiness to visit.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.05} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-3 hover:border-[#60A5FA]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">01</span>
              <h3 className="text-base font-extrabold text-white tracking-wide">
                Lead Volume ≠ Sales Opportunity
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              A campaign can easily produce hundreds of superficial form submissions without producing enough qualified conversations. Inflated lead counts drain sales capacity and disguise poor campaign economics.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-3 hover:border-[#60A5FA]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">02</span>
              <h3 className="text-base font-extrabold text-white tracking-wide">
                Buyers Don’t Follow a Straight Funnel
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Property purchases involve multiple family decision-makers and high capital outlays. Buyers research, compare, pause, return, consult peers, and re-evaluate across weeks before booking a visit.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-3 hover:border-[#60A5FA]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">03</span>
              <h3 className="text-base font-extrabold text-white tracking-wide">
                Discovery Happens Across Multiple Environments
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Search queries, social video walkthroughs, property portals, AI search assistants, and messaging apps all influence buyer perception. Treating these as disconnected silos loses high-intent prospects.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-3 hover:border-[#60A5FA]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">04</span>
              <h3 className="text-base font-extrabold text-white tracking-wide">
                Marketing and Sales Data Often Disconnect
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Marketing optimizes for cost-per-lead (CPL), while sales requires qualified prospects, scheduled site visits, negotiations, and closed bookings. Bridging that disconnect is where real commercial growth exists.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 04 — THE CUSTOMER JOURNEY */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            BUYER PSYCHOLOGY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Real Estate Customer Journey
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            An 8-stage framework modeling how real estate buyers actually explore, evaluate, and commit to property investments:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerJourney.map((step, idx) => (
            <ScrollReveal
              key={step.stage}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 space-y-3 hover:border-[#60A5FA]/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#60A5FA]">{step.step}</span>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[#070B14] text-[#CBD5E1] border border-[#1E293B]">
                    STAGE
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white tracking-wide">
                  {step.stage}
                </h3>
                <p className="text-xs italic text-[#60A5FA]">
                  {step.mindset}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E293B] space-y-1.5">
                {step.channels.map((ch) => (
                  <div key={ch} className="text-[11px] text-[#94A3B8] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#60A5FA]" />
                    <span className="truncate">{ch}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 05 — WHERE WE CREATE GROWTH */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            STRATEGIC INTERSECTION
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Where We Create Growth
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Aligning every phase of the customer journey with precision digital marketing and engineering capabilities:
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {growthMapping.map((item, idx) => (
            <ScrollReveal
              key={item.journeyStage}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="lg:w-1/4">
                <span className="text-xs font-mono text-[#64748B] uppercase block">JOURNEY STAGE</span>
                <h3 className="text-lg font-extrabold text-white">{item.journeyStage}</h3>
              </div>

              <div className="lg:w-2/5 flex flex-wrap gap-1.5">
                {item.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-1 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-medium text-[#CBD5E1]"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="lg:w-1/3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 06 — OUR INDUSTRY-SPECIFIC CAPABILITIES (6 SYSTEMS) */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            CAPABILITY SYSTEMS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Industry-Specific Capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Six integrated operational systems designed specifically for property developers and real-estate operators:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesSystems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <ScrollReveal
                key={sys.num}
                delay={idx * 0.04}
                className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between hover:border-[#60A5FA]/40 transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#60A5FA]">{sys.num}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#60A5FA]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-wide">{sys.title}</h3>

                  <ul className="space-y-2 pt-2 border-t border-[#1E293B]">
                    {sys.items.map((item) => (
                      <li key={item} className="text-xs text-[#CBD5E1] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onNavigateToServiceSlug && sys.slug) {
                        onNavigateToServiceSlug(sys.slug);
                      } else {
                        onOpenBooking({ serviceInterest: sys.title });
                      }
                    }}
                    className="text-xs font-bold text-[#60A5FA] hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Explore System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 07 — HOW THE SYSTEM WORKS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            INTEGRATED FLOW
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How The System Works
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            An end-to-end operational architecture connecting front-end demand to closed commercial sales:
          </p>
        </ScrollReveal>

        {/* Linear Step Bar */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { title: 'TRAFFIC', sub: 'Search & Paid' },
              { title: 'PROPERTY EXPERIENCE', sub: 'Interactive Web' },
              { title: 'ENQUIRY', sub: 'High-Intent Form' },
              { title: 'QUALIFICATION', sub: 'Automated Filter' },
              { title: 'NURTURE', sub: 'WhatsApp & Email' },
              { title: 'SITE VISIT', sub: 'Physical Walk-in' },
              { title: 'SALES', sub: 'Closed Booking' },
            ].map((step, idx) => (
              <div key={step.title} className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#60A5FA] font-bold block mb-1">0{idx + 1}</span>
                <span className="text-xs font-bold text-white block">{step.title}</span>
                <span className="text-[10px] text-[#64748B] block mt-1">{step.sub}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E293B] text-center max-w-3xl mx-auto space-y-3">
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
              We connect the acquisition channels, digital experience, lead handling and measurement layer so marketing can be evaluated against commercial outcomes rather than isolated campaign metrics.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 08 — WHAT WE MEASURE */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            METRICS THAT MATTER
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Marketing Metrics to Commercial Metrics
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            We evaluate every acquisition program against real commercial milestones that impact revenue:
          </p>
        </ScrollReveal>

        {/* Structured Table */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#070B14] border-b border-[#1E293B] text-xs font-mono text-[#60A5FA] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Layer</th>
                  <th className="px-6 py-4 font-bold">Tracked Metrics</th>
                  <th className="px-6 py-4 font-bold hidden md:table-cell">Commercial Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-[#CBD5E1]">
                {measurementLayers.map((row) => (
                  <tr key={row.layer} className="hover:bg-[#131D33]/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      {row.layer}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-[#94A3B8]">
                      {row.metrics}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#CBD5E1] hidden md:table-cell">
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>

      {/* 09 — SELECTED WORK & EVIDENCE */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            METHODOLOGY &amp; EVIDENCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Approach a Real-Estate Growth Problem
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            We operate with evidence-backed strategy blueprints rather than inflated or unverifiable claims.
          </p>
        </ScrollReveal>

        {/* Transparent Methodology Blueprint */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] block">
                STRATEGY BLUEPRINT
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Luxury Residential &amp; High-Ticket Property Development
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#CBD5E1]">
              Execution Blueprint
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F87171] uppercase tracking-wider">
                THE CHALLENGE
              </span>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Aggressive portal competition, unverified low-budget leads clogging sales reps, and long deliberation cycles causing drop-offs prior to scheduled site visits.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                THE SYSTEM APPROACH
              </span>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Deploy high-intent Google Search campaigns paired with custom unit landing pages, automated OTP budget verification, and two-way WhatsApp calendar integration.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                THE EXPECTED IMPACT
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                +40–60% higher qualification rates, significant reduction in cost per verified visit, and transparent CRM pipeline attribution for sales leadership.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#94A3B8]">
              Want to see our full acquisition framework applied to your specific development?
            </div>
            <button
              onClick={() => onOpenBooking({ serviceInterest: 'Real Estate Growth Architecture Review' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Schedule Strategic Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 10 — RELATED SERVICES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            INTERNAL CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Related Services
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Explore specific capability modules engineered to support our real estate acquisition architecture:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedServicesList.map((svc, idx) => (
            <ScrollReveal
              key={svc.name}
              delay={idx * 0.02}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white tracking-wide">{svc.name}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{svc.desc}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#1E293B]">
                <button
                  onClick={() => {
                    if (onNavigateToServiceSlug && svc.slug) {
                      onNavigateToServiceSlug(svc.slug);
                    } else {
                      onOpenBooking({ serviceInterest: svc.name });
                    }
                  }}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 11 — RELATED LOCATIONS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            REGIONAL HUBS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Estate Marketing Across Major Indian Markets
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Localized digital acquisition playbooks calibrated to the buyer demographics and micro-market dynamics of top metros:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedLocationsList.map((loc, idx) => (
            <ScrollReveal
              key={loc.city}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#60A5FA]" />
                  <h3 className="text-base font-bold text-white tracking-wide">{loc.city}</h3>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{loc.desc}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#1E293B]">
                <button
                  onClick={() => {
                    if (loc.city === 'Bangalore' && onNavigateToLocation) {
                      onNavigateToLocation(loc.slug);
                    } else {
                      onOpenBooking({ serviceInterest: `Real Estate Marketing in ${loc.city}` });
                    }
                  }}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{loc.city === 'Bangalore' ? 'Explore Location Hub' : 'Request City Playbook'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Paragraph directly on background above FAQ (without div wrapper) */}
      <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
        Have questions about deploying our real estate digital marketing systems, CRM qualification workflows, or project launch timelines? Review the verified answers below to understand our execution methodology.
      </p>

      {/* 12 — FAQ */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            REAL ESTATE FAQ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Detailed answers addressing commercial questions from developers, builders, and real estate marketing directors.
          </p>
        </ScrollReveal>

        <div className="space-y-4 max-w-4xl">
          {realEstateFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <ScrollReveal
                key={faq.question}
                delay={idx * 0.02}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#0D1424] border-[#60A5FA]/40 shadow-lg shadow-[#2563EB]/5'
                    : 'bg-[#070B14] border-[#1E293B] hover:border-[#334155]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#0D1424] text-[#94A3B8]'
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/60">
                    {faq.answer}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 13 — FINAL CTA */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            <Building2 className="w-3.5 h-3.5" />
            <span>REAL ESTATE ACQUISITION SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Build a stronger property acquisition system.
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
            Tell us about your market, property and current acquisition model. We'll identify where the biggest opportunities may exist.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                onOpenBooking({
                  serviceInterest: 'Real Estate Growth Strategy Consultation',
                  sourceLocation: 'Real Estate Page CTA',
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#2563EB]/30 cursor-pointer"
            >
              <span>Discuss Your Growth</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
