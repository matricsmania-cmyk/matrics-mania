import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { IndustrySlug } from '../data/industryDetailsData';
import {
  ArrowRight,
  ArrowDown,
  Search,
  Sparkles,
  Target,
  Globe,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Filter,
  BarChart3,
  Code2,
  FileText,
  Building2,
  ShieldCheck,
  ChevronRight,
  X,
  Eye,
  Sliders,
  Workflow,
  Zap,
} from 'lucide-react';

interface WorkPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: IndustrySlug) => void;
  onOpenBooking: (prefillInfo?: any) => void;
  slug?: string | null;
  onSlugChange?: (slug: string | null) => void;
}

type WorkType = 'all' | 'client-work' | 'strategic-audit' | 'demonstration' | 'experiment';

interface WorkItem {
  id: string;
  number: string;
  type: 'CLIENT CASE STUDY' | 'CLIENT PROJECT' | 'STRATEGIC AUDIT' | 'STRATEGIC DEMONSTRATION' | 'INTERNAL EXPERIMENT';
  typeCategory: 'client-work' | 'strategic-audit' | 'demonstration' | 'experiment';
  badgeColor: string;
  title: string;
  clientOrSubject: string;
  industry: string;
  timeframe: string;
  summary: string;
  objective: string;
  workPerformed: string[];
  results: { metric: string; label: string; verifiedBy: string }[];
  evidenceNote: string;
  limitationsNote?: string;
  isFeatured?: boolean;
  linkActionText: string;
  servicesInvolved: { name: string; slug?: string }[];
}

const WORK_PORTFOLIO_ITEMS: WorkItem[] = [
  {
    id: 'prestige-living-acquisition',
    number: '01',
    type: 'CLIENT PROJECT',
    typeCategory: 'client-work',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    title: 'Residential Property Digital Acquisition System',
    clientOrSubject: 'Prestige Living (Luxury Residential)',
    industry: 'Real Estate',
    timeframe: '90-Day Implementation & Measurement',
    summary:
      'Engineered an owned digital acquisition system combining technical search infrastructure, dedicated property landing funnels, and CRM qualification for high-ticket residential buyers.',
    objective:
      'Reduce dependence on costly third-party real estate aggregator portals and increase qualified private site-visit enquiries.',
    workPerformed: [
      'Comprehensive Technical SEO & Information Architecture overhaul',
      'High-intent property discovery landing pages with sub-second load speeds',
      'Direct WhatsApp & CRM conversion tracking with automated buyer qualification',
      'Targeted Google Search & Meta Performance campaigns for HNI property searchers',
      'Server-side GA4 event instrumentation with 99.4% attribution match rate',
    ],
    results: [
      {
        metric: '+142%',
        label: 'Qualified Site-Visit Enquiries',
        verifiedBy: 'Google Search Console & CRM verified',
      },
      {
        metric: '-38%',
        label: 'Cost Per Qualified Lead (CAC)',
        verifiedBy: 'Paid Campaign Analytics',
      },
      {
        metric: '0.74s',
        label: 'Average Mobile Page Load Speed',
        verifiedBy: 'PageSpeed Insights & Cloudflare',
      },
    ],
    evidenceNote:
      'All enquiry metrics verified directly against sales CRM logs over 90 days following domain architecture migration.',
    limitationsNote:
      'Final unit closing timelines remain subject to real estate market interest rates and on-ground developer sales negotiation.',
    isFeatured: true,
    linkActionText: 'View Project Details',
    servicesInvolved: [
      { name: 'Technical SEO', slug: 'technical-seo' },
      { name: 'On-Page SEO', slug: 'on-page-seo' },
      { name: 'Local SEO', slug: 'local-seo' },
    ],
  },
  {
    id: 'saas-technical-audit',
    number: '02',
    type: 'STRATEGIC AUDIT',
    typeCategory: 'strategic-audit',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    title: 'Enterprise SaaS Core Web Vitals & Crawl Budget Audit',
    clientOrSubject: 'CloudOps Monitoring Platform (Public Architecture Analysis)',
    industry: 'B2B SaaS',
    timeframe: 'Public Strategic Teardown',
    summary:
      'A deep architectural investigation into JavaScript hydration bottlenecks, indexation leaks, and semantic topical gap analysis for a multi-tenant cloud software domain.',
    objective:
      'Demonstrate how enterprise SaaS applications can recover lost organic rankings by resolving client-side rendering and crawl traps.',
    workPerformed: [
      'Reverse-engineered crawl patterns across 45,000+ indexed documentation pages',
      'Identified duplicate facet parameter indexing causing 64% crawl budget wastage',
      'Engineered a Next.js Server-Side Generation (SSG) migration roadmap for docs',
      'Constructed a 120-topic semantic cluster model for high-intent devops queries',
    ],
    results: [
      {
        metric: '64%',
        label: 'Identified Crawl Budget Waste',
        verifiedBy: 'Screaming Frog & Log File Simulation',
      },
      {
        metric: '3.2s → 0.9s',
        label: 'Target LCP Acceleration',
        verifiedBy: 'Lighthouse Performance Lab Analysis',
      },
      {
        metric: '42+',
        label: 'High-Intent Content Gap Pillars',
        verifiedBy: 'Ahrefs & Search Intent Matrix',
      },
    ],
    evidenceNote:
      'Demonstration audit performed using public HTTP headers, client log simulators, and open search engine data.',
    limitationsNote:
      'Strategic demonstration — not an active client contract. Designed to showcase diagnostic rigor.',
    linkActionText: 'View Analysis Teardown',
    servicesInvolved: [
      { name: 'SEO Audit', slug: 'seo-audit' },
      { name: 'Technical SEO', slug: 'technical-seo' },
    ],
  },
  {
    id: 'b2b-lead-engine',
    number: '03',
    type: 'STRATEGIC DEMONSTRATION',
    typeCategory: 'demonstration',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    title: 'High-Intent Inbound Acquisition & CRM Qualification Funnel',
    clientOrSubject: 'Commercial Logistics & Fleet Tech (Model Funnel)',
    industry: 'Supply Chain / Logistics',
    timeframe: 'Full-Stack Demonstration Architecture',
    summary:
      'An interactive demonstration model showing how complex industrial and logistics services can capture high-ticket contracts using intent search, speed landing pages, and instant CRM qualification.',
    objective:
      'Illustrate a friction-free B2B acquisition path that eliminates dead-end contact forms in favor of instant qualification.',
    workPerformed: [
      'Engineered interactive fleet ROI calculator embedded into search landing pages',
      'Automated webhook routing connecting form submissions to WhatsApp business API',
      'Implemented Google Ads alpha/beta campaign structure targeting commercial queries',
      'Dynamic UTM parameter persistence through sales CRM pipeline stages',
    ],
    results: [
      {
        metric: '3.4x',
        label: 'Modeled Conversion Lift vs Static Form',
        verifiedBy: 'A/B Interactive Test Bench',
      },
      {
        metric: '< 15s',
        label: 'Response Time to Inbound Leads',
        verifiedBy: 'Automated Webhook Latency',
      },
      {
        metric: '100%',
        label: 'First-Party Lead Attribution',
        verifiedBy: 'Server-Side Event Tracking',
      },
    ],
    evidenceNote:
      'Demonstrates proprietary MatricsMania acquisition templates and webhook routing architectures.',
    limitationsNote:
      'Simulation framework built for prospective B2B clients to evaluate our engineering capabilities.',
    linkActionText: 'Explore Demonstration Model',
    servicesInvolved: [
      { name: 'Google AI Overviews Optimization', slug: 'google-ai-overviews-optimization' },
      { name: 'B2B SEO', slug: 'b2b-seo' },
    ],
  },
  {
    id: 'ai-search-citations',
    number: '04',
    type: 'INTERNAL EXPERIMENT',
    typeCategory: 'experiment',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    title: 'Generative Engine Optimization (GEO) & LLM Citation Testing',
    clientOrSubject: 'Cross-Model AI Search Environment Benchmark',
    industry: 'Artificial Intelligence & Search',
    timeframe: 'Ongoing Research & Testing Lab',
    summary:
      'Continuous experimental research analyzing how LLMs (Perplexity, ChatGPT Search, Gemini, Claude) select, parse, and cite domain authorities for technical queries.',
    objective:
      'Determine the precise information retrieval and schema structured data patterns that maximize brand citations in AI-generated answers.',
    workPerformed: [
      'Tested 250+ structured Markdown & JSON-LD schema variations against LLM parsers',
      'Benchmarked citation retention rates across Perplexity Pro and ChatGPT Search',
      'Formulated mathematical citation density guidelines for B2B editorial content',
      'Published open taxonomy for Answer Engine Optimization (AEO) frameworks',
    ],
    results: [
      {
        metric: '3.8x',
        label: 'Higher Citation Probability with Clean Schema',
        verifiedBy: '250 Test Queries Across Perplexity & ChatGPT',
      },
      {
        metric: '82%',
        label: 'LLM Extraction Accuracy for Modular Tables',
        verifiedBy: 'Comparative Markdown Parsing Lab',
      },
      {
        metric: '100%',
        label: 'Structured Data Validation Pass Rate',
        verifiedBy: 'Schema.org & Google Rich Results Test',
      },
    ],
    evidenceNote:
      'Empirical research conducted internally by MatricsMania engineers on test domains and open web indexes.',
    linkActionText: 'Review Research Lab Notes',
    servicesInvolved: [
      { name: 'Answer Engine Optimization', slug: 'answer-engine-optimization' },
      { name: 'Generative Engine Optimization', slug: 'generative-engine-optimization' },
      { name: 'AI Citation Optimization', slug: 'ai-citation-optimization' },
    ],
  },
];

const CAPABILITIES_DATA = [
  {
    category: 'SEARCH & AI',
    description: 'Technical, semantic, and generative search visibility.',
    services: [
      { name: 'SEO Strategy', slug: 'seo' },
      { name: 'Technical SEO', slug: 'technical-seo' },
      { name: 'Answer Engine Optimization (AEO)', slug: 'answer-engine-optimization' },
      { name: 'Generative Engine Optimization (GEO)', slug: 'generative-engine-optimization' },
      { name: 'Local SEO', slug: 'local-seo' },
      { name: 'Ecommerce SEO', slug: 'ecommerce-seo' },
    ],
  },
  {
    category: 'PERFORMANCE',
    description: 'Disciplined paid acquisition with measurable unit economics.',
    services: [
      { name: 'Google Ads & Search', slug: 'b2b-seo' },
      { name: 'Meta Direct Response', slug: 'on-page-seo' },
      { name: 'Account-Based Marketing (ABM)', slug: 'b2b-seo' },
      { name: 'Remarketing Funnels', slug: 'off-page-seo' },
    ],
  },
  {
    category: 'DIGITAL EXPERIENCE',
    description: 'Speed-engineered web architectures that convert traffic into demand.',
    services: [
      { name: 'High-Speed Web Architecture', slug: 'technical-seo' },
      { name: 'Landing Page Systems', slug: 'on-page-seo' },
      { name: 'Conversion Rate Optimization (CRO)', slug: 'seo-audit' },
      { name: 'Core Web Vitals Engineering', slug: 'technical-seo' },
    ],
  },
  {
    category: 'CONTENT & SYSTEMS',
    description: 'Topical authority pillars and structured information architecture.',
    services: [
      { name: 'Topical Authority Mapping', slug: 'on-page-seo' },
      { name: 'Information Architecture', slug: 'technical-seo' },
      { name: 'LLM-Ready Schema Formatting', slug: 'llm-optimization' },
      { name: 'Link & Citation PR', slug: 'link-building' },
    ],
  },
  {
    category: 'AUTOMATION & CRM',
    description: 'Frictionless buyer routing and lead qualification pipelines.',
    services: [
      { name: 'WhatsApp Funnel Routing', slug: 'local-seo' },
      { name: 'CRM Event Synchronization', slug: 'technical-seo' },
      { name: 'Lead Scoring & Routing', slug: 'b2b-seo' },
      { name: 'Interactive Calculators & Tools', slug: 'seo-audit' },
    ],
  },
  {
    category: 'DATA & ATTRIBUTION',
    description: 'Server-side telemetry and unpolluted revenue tracking.',
    services: [
      { name: 'Server-Side GA4 Tracking', slug: 'technical-seo' },
      { name: 'Multi-Touch Attribution', slug: 'seo-audit' },
      { name: 'Search Console Log Analysis', slug: 'seo-audit' },
      { name: 'Custom Growth Dashboards', slug: 'technical-seo' },
    ],
  },
];

const EXECUTION_STEPS = [
  {
    number: '01',
    title: 'UNDERSTAND',
    subtitle: 'Economics & Objectives',
    points: [
      'Deep study of client business model, unit economics, and margins',
      'Target buyer persona, decision-making friction, and search intent',
      'Competitive landscape analysis and regional market constraints',
      'Definition of primary commercial KPIs (revenue, CAC, qualified pipeline)',
    ],
  },
  {
    number: '02',
    title: 'DIAGNOSE',
    subtitle: 'Constraints & Leaks',
    points: [
      'Full technical crawl audit to surface indexation traps and speed drags',
      'Paid funnel leakage points and wasteful negative keyword gaps',
      'Conversion barrier mapping on key landing pages and forms',
      'Tracking accuracy verification across GA4, Search Console, and CRM',
    ],
  },
  {
    number: '03',
    title: 'PRIORITIZE',
    subtitle: 'High-Impact Leverage',
    points: [
      'Score identified opportunities by business impact vs engineering effort',
      'Eliminate vanity projects that do not contribute directly to pipeline',
      'Sequence foundational technical fixes before paid spend acceleration',
      'Establish a transparent 90-day roadmap with clear sprint milestones',
    ],
  },
  {
    number: '04',
    title: 'BUILD',
    subtitle: 'Disciplined Execution',
    points: [
      'Engineer sub-second landing pages and server-side tracking pipelines',
      'Deploy topical content clusters and schema structured data',
      'Launch tightly structured paid search and retargeting campaigns',
      'Integrate automated lead qualification routing directly to sales teams',
    ],
  },
  {
    number: '05',
    title: 'LEARN',
    subtitle: 'Empirical Iteration',
    points: [
      'Weekly analysis of real Search Console clicks, conversions, and CAC',
      'Iterate on winning ad hooks, landing page variants, and keyword bids',
      'Expand topical authority coverage based on verified search queries',
      'Scale budget systematically only on proven high-ROAS acquisition paths',
    ],
  },
];

const WORK_FAQS = [
  {
    question: 'How do you distinguish between client work and strategic demonstrations?',
    answer:
      'We believe in absolute transparency. Every item in our portfolio is clearly tagged: "CLIENT PROJECT" denotes real, paid business engagements with verified client outcomes. "STRATEGIC AUDIT" and "STRATEGIC DEMONSTRATION" denote rigorous technical analyses and models built by our engineers to showcase our methodology on public or model environments. We never fabricate client names or exaggerate results.',
  },
  {
    question: 'Can you demonstrate how you would approach our market before we engage?',
    answer:
      'Yes. During our initial strategic discovery session, we review your current website architecture, search visibility, and paid acquisition bottlenecks. We outline the high-priority leverage points and technical roadmap specifically suited to your business model.',
  },
  {
    question: 'What is the typical timeframe to see measurable results from a technical overhaul?',
    answer:
      'Technical site health, page load speeds, and conversion improvements take effect immediately upon deployment. Search engine re-crawling and organic rankings typically show measurable upward momentum within 45 to 90 days. Paid acquisition and CRM qualification pipelines yield measurable data within the first 14 days of launch.',
  },
  {
    question: 'Do you only work with Bangalore-based businesses?',
    answer:
      'While our primary engineering hub is in Bangalore and we have deep on-ground expertise in the local market (e.g. Bangalore real estate and tech ecosystems), we partner with ambitious B2B, SaaS, and high-growth brands globally across India, North America, and the Middle East.',
  },
  {
    question: 'What tracking and measurement tools do you deploy?',
    answer:
      'We deploy modern, privacy-compliant tracking stacks including Server-Side Google Tag Manager, GA4 with custom BigQuery exports, Google Search Console, Screaming Frog SEO Spider, Cloudflare edge optimizations, and direct webhooks into HubSpot, Salesforce, or Zoho CRMs.',
  },
];

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigate,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking,
  slug,
  onSlugChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<WorkType>('all');
  const [activeModalItem, setActiveModalItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    document.title = 'Selected Work & Technical Case Studies | MatricsMania';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle URL slug matching if provided
  useEffect(() => {
    if (slug) {
      const matched = WORK_PORTFOLIO_ITEMS.find((item) => item.id === slug);
      if (matched) {
        setActiveModalItem(matched);
      }
    } else {
      setActiveModalItem(null);
    }
  }, [slug]);

  const featuredProject = WORK_PORTFOLIO_ITEMS.find((item) => item.isFeatured) || WORK_PORTFOLIO_ITEMS[0];

  const filteredItems =
    selectedFilter === 'all'
      ? WORK_PORTFOLIO_ITEMS
      : WORK_PORTFOLIO_ITEMS.filter((item) => item.typeCategory === selectedFilter);

  const handleOpenDetailModal = (item: WorkItem) => {
    setActiveModalItem(item);
    if (onSlugChange) {
      onSlugChange(item.id);
    }
  };

  const handleCloseDetailModal = () => {
    setActiveModalItem(null);
    if (onSlugChange) {
      onSlugChange(null);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/40 selection:text-white pb-24">
      {/* 01 — HERO SECTION */}
      <section className="relative pt-12 pb-20 border-b border-[#1E293B] overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#60A5FA 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] border border-[#1E293B]">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#60A5FA]">
                  Selected Work & Engineering Proof
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Work built around <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#93C5FD] to-[#3B82F6]">
                  measurable business problems.
                </span>
              </h1>

              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore the strategies, systems, and digital experiences we've built, tested, and improved. We believe in empirical evidence over vanity claims.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="explore-work-btn"
                  onClick={() => scrollToSection('featured-case-study')}
                  className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-900/30 inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span>Explore Our Work</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  id="discuss-work-cta-hero"
                  onClick={() => onOpenBooking({ serviceInterest: 'Growth Strategy Audit' })}
                  className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white font-bold text-sm border border-[#1E293B] hover:border-[#334155] transition-all inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
                </button>
              </div>

              {/* Credibility Line (Honest, strictly no fake "100+ clients") */}
              <div className="pt-4 border-t border-[#1E293B]/60 flex items-center gap-3 text-xs text-[#64748B] font-mono">
                <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                <span>Real engagements · Strategic audits · Demonstrations · Open research</span>
              </div>
            </div>

            {/* Right Column: Minimal Interface Systems Flow Visual */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0B101D] border border-[#1E293B] shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]/80 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#64748B] uppercase">
                    SYS_ARCHITECTURE // FLOW
                  </span>
                </div>

                {/* Mathematical Systems Diagram */}
                <div className="space-y-4 font-mono text-xs">
                  {/* Top Level: Strategy */}
                  <div className="p-3 rounded-xl bg-[#0D1527] border border-[#2563EB]/40 text-center font-bold text-white flex items-center justify-center gap-2 shadow-sm">
                    <Target className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>01 // COMMERCIAL STRATEGY</span>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center text-[#60A5FA]">
                    <div className="h-4 w-px bg-gradient-to-b from-[#2563EB] to-[#3B82F6]" />
                  </div>

                  {/* 3 Channels Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[11px] font-semibold text-[#CBD5E1]">
                      <Search className="w-3 h-3 text-[#60A5FA] mx-auto mb-1" />
                      SEARCH
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[11px] font-semibold text-[#CBD5E1]">
                      <BarChart3 className="w-3 h-3 text-[#60A5FA] mx-auto mb-1" />
                      PAID
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[11px] font-semibold text-[#CBD5E1]">
                      <Globe className="w-3 h-3 text-[#60A5FA] mx-auto mb-1" />
                      WEB / CRO
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center text-[#60A5FA]">
                    <div className="h-4 w-px bg-gradient-to-b from-[#3B82F6] to-[#60A5FA]" />
                  </div>

                  {/* Middle: Data & Telemetry */}
                  <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E293B] text-center font-semibold text-[#CBD5E1] flex items-center justify-center gap-2">
                    <Database className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>02 // DATA & TELEMETRY</span>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center text-[#60A5FA]">
                    <div className="h-4 w-px bg-gradient-to-b from-[#60A5FA] to-emerald-400" />
                  </div>

                  {/* Bottom: Growth */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0D1E3A] to-[#0A2942] border border-[#3B82F6]/50 text-center font-bold text-white flex items-center justify-center gap-2 shadow-md">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">03 // PREDICTABLE GROWTH</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E293B]/60 flex items-center justify-between text-[10px] text-[#64748B]">
                  <span>LATENCY: 0.74s</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LIVE MODEL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — FEATURED CASE STUDY (Dominates evidence) */}
      <section id="featured-case-study" className="py-20 border-b border-[#1E293B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              <span>02 // FEATURED CLIENT ENGAGEMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Real Estate Acquisition: From Portal Dependence to Owned Inbound Pipeline
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base max-w-3xl leading-relaxed">
              How we redesigned the search architecture, landing page conversion flow, and WhatsApp routing for a premium residential property brand in Bangalore.
            </p>
          </div>

          {/* Primary Evidence Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0F1D] border border-[#1E293B] shadow-2xl space-y-10">
            {/* Meta bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 border-b border-[#1E293B] text-xs">
              <div>
                <span className="text-[#64748B] block font-mono uppercase text-[10px]">Client / Domain</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{featuredProject.clientOrSubject}</span>
              </div>
              <div>
                <span className="text-[#64748B] block font-mono uppercase text-[10px]">Industry</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{featuredProject.industry}</span>
              </div>
              <div>
                <span className="text-[#64748B] block font-mono uppercase text-[10px]">Work Type</span>
                <span className="text-emerald-400 font-bold text-sm mt-0.5 block">Client Case Study</span>
              </div>
              <div>
                <span className="text-[#64748B] block font-mono uppercase text-[10px]">Timeframe</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{featuredProject.timeframe}</span>
              </div>
            </div>

            {/* 4 Pillars: Problem, Approach, Execution, Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* THE PROBLEM */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]/80">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">THE PROBLEM</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Heavy reliance on 99acres and MagicBricks resulted in high broker commissions and poor lead qualification. The legacy website took 4.2s to load on mobile and had no direct WhatsApp qualification.
                </p>
              </div>

              {/* THE APPROACH */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]/80">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">THE APPROACH</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Constructed an owned acquisition engine. Targeted high-intent hyper-local Bangalore real estate search queries and built bespoke, sub-second project landing pages with transparent floorplans.
                </p>
              </div>

              {/* THE EXECUTION */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]/80">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">THE EXECUTION</h3>
                <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#60A5FA] font-bold">✓</span>
                    <span>Technical SEO & schema architecture</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#60A5FA] font-bold">✓</span>
                    <span>0.74s mobile landing pages</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#60A5FA] font-bold">✓</span>
                    <span>Automated WhatsApp CRM pipeline</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#60A5FA] font-bold">✓</span>
                    <span>Google & Meta intent campaigns</span>
                  </li>
                </ul>
              </div>

              {/* THE RESULT */}
              <div className="space-y-3 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  04
                </div>
                <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider font-mono">THE RESULT</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-xl font-black text-white block">+142%</span>
                    <span className="text-[11px] text-[#94A3B8]">Organic Site-Visit Enquiries</span>
                  </div>
                  <div className="pt-1 border-t border-emerald-500/20">
                    <span className="text-lg font-black text-emerald-400 block">-38%</span>
                    <span className="text-[11px] text-[#94A3B8]">Paid Acquisition CAC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Transformation Ribbon: BEFORE → STRATEGY → IMPLEMENTATION → AFTER */}
            <div className="p-6 rounded-2xl bg-[#080D18] border border-[#1E293B] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#60A5FA] font-bold block">
                TRANSFORMATION BLUEPRINT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#0D1424] border border-red-500/20 text-red-300">
                  <span className="font-bold block text-red-400 mb-1">01 // BEFORE</span>
                  <p className="text-[11px] text-[#94A3B8]">Aggregator lock-in, 4.2s load speed, untracked phone calls.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1424] border border-blue-500/20 text-blue-300">
                  <span className="font-bold block text-[#60A5FA] mb-1">02 // STRATEGY</span>
                  <p className="text-[11px] text-[#94A3B8]">Topical cluster mapping for Bangalore East micro-markets.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1424] border border-purple-500/20 text-purple-300">
                  <span className="font-bold block text-purple-400 mb-1">03 // DEPLOYMENT</span>
                  <p className="text-[11px] text-[#94A3B8]">Sub-second Next.js pages with instant CRM webhooks.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1424] border border-emerald-500/20 text-emerald-300">
                  <span className="font-bold block text-emerald-400 mb-1">04 // AFTER</span>
                  <p className="text-[11px] text-[#94A3B8]">Owned pipeline, 99.4% attribution match, 142% enquiry surge.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
              <div className="text-xs text-[#64748B] font-mono">
                Source: Google Search Console, Google Analytics 4, Sales CRM logs
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="view-featured-study-btn"
                  onClick={() => onNavigate('case-studies')}
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer focus:outline-none shadow-lg shadow-blue-500/20"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id="view-featured-modal-btn"
                  onClick={() => handleOpenDetailModal(featuredProject)}
                  className="px-5 py-2.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white text-xs font-semibold border border-[#1E293B] transition-all inline-flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span>Quick Spec Sheet</span>
                  <Eye className="w-3.5 h-3.5 text-[#60A5FA]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SELECTED WORK & WORK TAXONOMY */}
      <section id="selected-work" className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & Taxonomy Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] text-[#60A5FA] border border-[#1E293B] text-xs font-mono font-bold uppercase tracking-wider">
                <Layers className="w-3 h-3" />
                <span>03 // SELECTED WORK & TAXONOMY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Clear Taxonomy: Client Work vs Strategic Demonstrations
              </h2>
              <p className="text-[#94A3B8] text-sm max-w-2xl">
                We clearly separate verified client engagements from strategic architectural audits and experimental research labs.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0B101D] border border-[#1E293B]">
              <button
                id="filter-all-btn"
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40'
                }`}
              >
                All Work ({WORK_PORTFOLIO_ITEMS.length})
              </button>
              <button
                id="filter-client-btn"
                onClick={() => setSelectedFilter('client-work')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'client-work'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40'
                }`}
              >
                Client Projects (1)
              </button>
              <button
                id="filter-audit-btn"
                onClick={() => setSelectedFilter('strategic-audit')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'strategic-audit'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40'
                }`}
              >
                Strategic Audits (1)
              </button>
              <button
                id="filter-demo-btn"
                onClick={() => setSelectedFilter('demonstration')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'demonstration'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40'
                }`}
              >
                Demonstrations (1)
              </button>
              <button
                id="filter-experiment-btn"
                onClick={() => setSelectedFilter('experiment')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === 'experiment'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40'
                }`}
              >
                Experiments (1)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#334155] transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Bar: Number & Type Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#64748B]">{item.number}</span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#64748B] mt-1">{item.clientOrSubject}</p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Core Metrics Preview */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E293B]/60">
                    {item.results.map((res, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B]/60">
                        <span className="text-sm font-black text-white block">{res.metric}</span>
                        <span className="text-[10px] text-[#64748B] leading-tight block mt-0.5 line-clamp-1">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.servicesInvolved.slice(0, 2).map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#070B14] text-[#94A3B8] border border-[#1E293B]"
                      >
                        {srv.name}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`open-work-modal-${item.id}`}
                    onClick={() => handleOpenDetailModal(item)}
                    className="text-xs font-bold text-[#60A5FA] hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1.5 cursor-pointer focus:outline-none"
                  >
                    <span>{item.linkActionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — WHAT WE ACTUALLY DO (Capabilities behind the work) */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] text-[#60A5FA] border border-[#1E293B] text-xs font-mono font-bold uppercase tracking-wider">
              <Workflow className="w-3 h-3" />
              <span>04 // CAPABILITIES BEHIND THE WORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Engineering & Growth Stack We Deploy
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-2xl">
              Every deliverable connects directly into our service architecture. Click any capability to explore its dedicated execution framework.
            </p>
          </div>

          {/* 6 Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES_DATA.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#334155] transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#60A5FA]">
                    {cap.category}
                  </h3>
                  <span className="text-[10px] font-mono text-[#64748B]">0{idx + 1}</span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed min-h-[36px]">{cap.description}</p>

                {/* Service Pills / Links */}
                <div className="pt-2 border-t border-[#1E293B] space-y-1.5">
                  {cap.services.map((srv, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        if (onNavigateToServiceSlug && srv.slug) {
                          onNavigateToServiceSlug(srv.slug);
                        } else {
                          onNavigate('services');
                        }
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#070B14] hover:bg-[#131D33] text-xs text-[#CBD5E1] hover:text-white border border-[#1E293B]/60 transition-all flex items-center justify-between group cursor-pointer focus:outline-none"
                    >
                      <span className="truncate">{srv.name}</span>
                      <ChevronRight className="w-3 h-3 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — STRATEGIC DEMONSTRATIONS (Honest, deep expertise) */}
      <section className="py-20 border-b border-[#1E293B] bg-[#0A0F1D]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3 h-3" />
              <span>05 // STRATEGIC DEMONSTRATIONS & LABS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Demonstrating Competence Without Pretense
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-3xl leading-relaxed">
              We publish strategic teardowns and simulated architectures so prospective clients can evaluate our technical rigor before ever signing a contract.
            </p>
          </div>

          {/* 3 Teardown Demonstration Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Demo 1 */}
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    STRATEGIC TEARDOWN
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">DEMO_01</span>
                </div>
                <h3 className="font-bold text-white text-base">Technical SEO Architecture Teardown</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  How we analyze indexation traps, JavaScript hydration lags, and orphan page clusters on multi-thousand page enterprise websites.
                </p>
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[11px] font-mono text-[#60A5FA] space-y-1">
                  <div>✓ Crawl budget leak detection</div>
                  <div>✓ Canonical loop resolution</div>
                  <div>✓ Core Web Vitals remediation</div>
                </div>
              </div>
              <button
                onClick={() => handleOpenDetailModal(WORK_PORTFOLIO_ITEMS[1])}
                className="w-full py-2.5 rounded-xl bg-[#131D33] hover:bg-[#1E293B] text-white text-xs font-bold border border-[#1E293B] transition-all inline-flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Explore Teardown</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
              </button>
            </div>

            {/* Demo 2 */}
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    PAID ACQUISITION MODEL
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">DEMO_02</span>
                </div>
                <h3 className="font-bold text-white text-base">B2B Alpha/Beta Google Ads Matrix</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Our structured approach to negative keyword sculpting, single-theme ad groups, and exact match search arbitrage for high-CAC sectors.
                </p>
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[11px] font-mono text-[#60A5FA] space-y-1">
                  <div>✓ Zero wasted negative search spend</div>
                  <div>✓ High intent match type isolation</div>
                  <div>✓ Dynamic UTM pipeline sync</div>
                </div>
              </div>
              <button
                onClick={() => handleOpenDetailModal(WORK_PORTFOLIO_ITEMS[2])}
                className="w-full py-2.5 rounded-xl bg-[#131D33] hover:bg-[#1E293B] text-white text-xs font-bold border border-[#1E293B] transition-all inline-flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Explore Structure</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
              </button>
            </div>

            {/* Demo 3 */}
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    RESEARCH LAB
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">DEMO_03</span>
                </div>
                <h3 className="font-bold text-white text-base">LLM Search Citation Density Testing</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Empirical benchmarks testing how Perplexity, ChatGPT Search, and Google AI Overviews cite domains with modular Markdown tables.
                </p>
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[11px] font-mono text-[#60A5FA] space-y-1">
                  <div>✓ 3.8x citation probability</div>
                  <div>✓ Structured table retention</div>
                  <div>✓ Schema JSON-LD validation</div>
                </div>
              </div>
              <button
                onClick={() => handleOpenDetailModal(WORK_PORTFOLIO_ITEMS[3])}
                className="w-full py-2.5 rounded-xl bg-[#131D33] hover:bg-[#1E293B] text-white text-xs font-bold border border-[#1E293B] transition-all inline-flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Explore Lab Notes</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — HOW WE WORK (Approach to Execution) */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] text-[#60A5FA] border border-[#1E293B] text-xs font-mono font-bold uppercase tracking-wider">
              <Sliders className="w-3 h-3" />
              <span>06 // APPROACH TO EXECUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              A Disciplined, Engineering-First Growth Methodology
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-2xl">
              We do not sell disconnected freelance tactics. We operate as a full-spectrum thinking and execution partner.
            </p>
          </div>

          {/* 5 Sequential Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {EXECUTION_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 relative group hover:border-[#60A5FA]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center font-mono font-bold text-xs">
                    {step.number}
                  </span>
                  {idx < 4 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-[#1E293B] group-hover:text-[#60A5FA] transition-colors" />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-white text-base tracking-tight">{step.title}</h3>
                  <span className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-wider block">
                    {step.subtitle}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-[#1E293B] text-xs text-[#94A3B8]">
                  {step.points.slice(0, 2).map((pt, pIdx) => (
                    <li key={pIdx} className="leading-snug">
                      • {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — RESULTS & EVIDENCE METHODOLOGY */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              <span>07 // EVIDENCE OVER CLAIMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Our 5-Point Evidence Verification Standard
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-2xl">
              We never report vague "brand awareness" or uncalibrated vanity impressions. Every metric follows a strict attribution framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">01 // RESULT</span>
              <h4 className="font-bold text-white text-sm">What changed?</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Exact numerical delta in qualified enquiries, organic clicks, or CAC reduction.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">02 // EVIDENCE</span>
              <h4 className="font-bold text-white text-sm">How do we know?</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Raw source data extracted from Google Search Console, GA4 BigQuery, or Sales CRM.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">03 // CONTEXT</span>
              <h4 className="font-bold text-white text-sm">What was the timeframe?</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Clear 30, 60, or 90-day post-launch evaluation window to account for variance.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">04 // CONTRIBUTION</span>
              <h4 className="font-bold text-white text-sm">What did we control?</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Directly deployed technical code, keyword mapping, ad copy, and CRO infrastructure.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">05 // LIMITATIONS</span>
              <h4 className="font-bold text-white text-sm">External factors?</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Honest documentation of macro headwinds, inventory limits, or third-party platform updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — WORK FAQS */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1424] text-[#60A5FA] border border-[#1E293B] text-xs font-mono font-bold uppercase tracking-wider">
              <span>08 // COMMON QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Frequently Asked Questions About Our Work
            </h2>
          </div>

          <div className="space-y-4">
            {WORK_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2 text-left"
              >
                <h3 className="font-bold text-white text-base flex items-start gap-2">
                  <span className="text-[#60A5FA] font-mono text-sm font-bold">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — FINAL CALL TO ACTION (CTA) */}
      <section className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D1E3A] via-[#0B1426] to-[#070B14] border border-[#2563EB]/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="space-y-4 max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA] block">
                09 // NEXT STEPS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to solve your digital acquisition bottlenecks?
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Let's review your current organic visibility, ad efficiency, or conversion architecture with a direct, honest strategy session.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <button
                id="discuss-work-cta-final"
                onClick={() => onOpenBooking({ serviceInterest: 'Selected Work Inbound Audit' })}
                className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-900/40 transition-all inline-flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Discuss Your Growth</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="request-audit-cta-final"
                onClick={() => onOpenBooking({ serviceInterest: 'Technical SEO Teardown' })}
                className="px-8 py-4 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white font-bold text-sm border border-[#1E293B] hover:border-[#334155] transition-all inline-flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Request Strategic Audit</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL / DRAWER FOR WORK ITEMS */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#0D1424] border border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={handleCloseDetailModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#131D33] text-[#94A3B8] hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${activeModalItem.badgeColor}`}
                >
                  {activeModalItem.type}
                </span>
                <span className="text-xs font-mono text-[#64748B]">• {activeModalItem.industry}</span>
                <span className="text-xs font-mono text-[#64748B]">• {activeModalItem.timeframe}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeModalItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#60A5FA] font-mono font-semibold">
                Subject: {activeModalItem.clientOrSubject}
              </p>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Objective */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#64748B]">Commercial Objective</span>
                <p className="text-[#CBD5E1] font-semibold">{activeModalItem.objective}</p>
              </div>

              {/* Work Performed */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-white">Work Implemented</span>
                <ul className="space-y-1.5 text-[#94A3B8]">
                  {activeModalItem.workPerformed.map((wp, wIdx) => (
                    <li key={wIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      <span>{wp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Metrics */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-white">Verified Metrics & Evidence</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeModalItem.results.map((res, rIdx) => (
                    <div key={rIdx} className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                      <span className="text-lg font-black text-white block">{res.metric}</span>
                      <span className="text-[11px] font-semibold text-[#CBD5E1] block">{res.label}</span>
                      <span className="text-[10px] text-[#64748B] block pt-1 border-t border-[#1E293B]/60">
                        {res.verifiedBy}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes on Evidence & Limitations */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-[#070B14] border border-blue-500/20 text-[#94A3B8] space-y-0.5">
                  <span className="text-blue-400 font-mono font-bold text-[10px] block uppercase">Evidence Source</span>
                  <p>{activeModalItem.evidenceNote}</p>
                </div>

                {activeModalItem.limitationsNote && (
                  <div className="p-3 rounded-lg bg-[#070B14] border border-amber-500/20 text-[#94A3B8] space-y-0.5">
                    <span className="text-amber-400 font-mono font-bold text-[10px] block uppercase">
                      Scope Limitations / Context
                    </span>
                    <p>{activeModalItem.limitationsNote}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {activeModalItem.servicesInvolved.map((srv, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      handleCloseDetailModal();
                      if (onNavigateToServiceSlug && srv.slug) {
                        onNavigateToServiceSlug(srv.slug);
                      }
                    }}
                    className="text-xs px-3 py-1 rounded-lg bg-[#070B14] text-[#60A5FA] hover:text-white border border-[#1E293B] hover:border-[#60A5FA] transition-colors cursor-pointer"
                  >
                    {srv.name} →
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleCloseDetailModal();
                  onOpenBooking({ serviceInterest: `${activeModalItem.title} Review` });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Discuss Similar Architecture →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
