import React, { useState } from 'react';
import { PageType } from '../types';
import { SERVICES_DATA, FAQS_DATA } from '../data/mockData';
import { AuditSimulator } from '../components/AuditSimulator';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe,
  Layers,
  Cpu,
  BarChart3,
  FileCode,
  Zap,
  Sparkles,
  Link2,
  ChevronDown,
  LineChart,
} from 'lucide-react';

interface SearchPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('seo-faq-1');

  // Extract the Search Engine Optimization (SEO) service item
  const seoService = SERVICES_DATA.find((s) => s.id === 'seo-growth') || {
    id: 'seo-growth',
    title: 'Search Engine Optimization (SEO)',
    category: 'Organic Growth',
    iconName: 'Search',
    shortDesc:
      'Dominate Google search results with technical SEO, semantic content clusters, and high-authority link acquisition.',
    fullDesc:
      'MatricsMania SEO goes beyond simple keyword tracking. We engineer technical architecture, optimize schema structured data, construct topical authority pillars, and execute PR outreach to establish permanent industry dominance.',
    features: [
      'Technical SEO Audit & Core Web Vitals Optimization',
      'Topical Authority Keyword Mapping',
      'Programmatic Content Generation & Optimization',
      'High-DR Link Building & Digital PR',
      'Local & Global GEO-targeted SEO Strategy',
      'AI Overviews (SGE) & Generative Search Optimization',
    ],
    metrics: [
      { label: 'Avg Organic Lead Surge', value: '+280%' },
      { label: 'Top 3 Keyword Ranks', value: '14,000+' },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Deep Site Audit',
        description: 'Crawl 500+ site health signals and competitor gap metrics.',
      },
      {
        step: '02',
        title: 'Topical Architecture',
        description: 'Design content pillars and intent-based keyword structures.',
      },
      {
        step: '03',
        title: 'Execution & PR',
        description: 'Optimize code, publish high-converting content, and build high-tier links.',
      },
      {
        step: '04',
        title: 'Iterative Ranking',
        description: 'Weekly position tracking, schema adjustments, and ROI reporting.',
      },
    ],
    priceStarting: '',
    recommendedFor: 'B2B SaaS, E-Commerce, Scale-ups seeking predictable inbound pipeline.',
  };

  const seoPillars = [
    {
      icon: <FileCode className="w-6 h-6 text-[#60A5FA]" />,
      title: 'Technical SEO & Core Web Vitals',
      description:
        'Eliminate JavaScript crawl traps, fix indexation bloat, optimize Largest Contentful Paint (LCP), and structure XML sitemaps for instant Google bot indexing.',
      highlights: ['INP & CLS Speed Fixes', 'Dynamic SSR / Hydration Tuning', 'Canonical & Hreflang Hygiene'],
    },
    {
      icon: <Layers className="w-6 h-6 text-[#60A5FA]" />,
      title: 'Semantic Topical Authority',
      description:
        'We construct hierarchical entity graphs, cluster pillar pages, and answer comprehensive search queries to establish category-wide topical relevance.',
      highlights: ['Entity & Knowledge Graph Mapping', 'Search Intent Siloing', 'Internal PageRank Equity Modeling'],
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#60A5FA]" />,
      title: 'AI Search (SGE & GEO) Optimization',
      description:
        'Future-proof your brand for Google AI Overviews, Perplexity, ChatGPT, and Claude citations with structured JSON-LD schemas and authoritative citations.',
      highlights: ['Generative Engine Optimization (GEO)', 'JSON-LD Structured Data', 'Direct Answer Knowledge Citations'],
    },
    {
      icon: <Link2 className="w-6 h-6 text-[#60A5FA]" />,
      title: 'Digital PR & Editorial Authority',
      description:
        'Secure contextual backlinks from DR 70+ industry publications, Tier-1 news outlets, and thought-leadership placements that move organic rankings.',
      highlights: ['Editorial Media Outreach', 'Data-Driven PR Studies', 'White-Hat Natural Anchor Distributions'],
    },
  ];

  const seoFaqs = [
    {
      id: 'seo-faq-1',
      question: 'How quickly can we expect to see organic rank improvements?',
      answer:
        'Technical fixes and indexation cleanup typically produce measurable crawl and ranking movements within 14–30 days. Full competitive keyword category dominance and exponential revenue scaling typically materialize over 60–90 days as topical authority compounds.',
    },
    {
      id: 'seo-faq-2',
      question: 'How does MatricsMania adapt to Google Core Algorithm & AI Updates?',
      answer:
        'Because our methodology is anchored in deep topical authority, rigorous schema architecture, and real user engagement metrics rather than spammy shortcuts, our client domains consistently gain ranking visibility during major Google algorithm and AI Overviews rollouts.',
    },
    {
      id: 'seo-faq-3',
      question: 'Do you provide dedicated ROI and pipeline attribution tracking?',
      answer:
        'Yes. We build custom Looker Studio dashboards integrated with Google Analytics 4, Search Console, and your CRM (HubSpot, Salesforce, Shopify) to track exactly how many qualified leads, booked demos, and dollars in closed revenue originate from organic search.',
    },
    {
      id: 'seo-faq-4',
      question: 'What is included in the complimentary technical search audit?',
      answer:
        'Our diagnostic team performs an in-depth crawl of your domain assessing Core Web Vitals, server response latencies, schema validity, keyword cannibalization, backlink toxicities, and immediate quick-win opportunities.',
    },
  ];

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-12 md:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white max-w-5xl mx-auto tracking-tight leading-[1.1]">
            Engineered Organic Dominance For{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
              High-Intent Search
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            We combine forensic technical SEO, programmatic content clustering, and editorial PR to capture high-value search demand and turn non-branded queries into repeatable pipeline revenue.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenBooking({ services: ['Search Engine Optimization (SEO)'] })}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Request Custom SEO Proposal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#live-audit-tool"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white border border-[#1E293B] font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Run Free Domain Audit</span>
              <Zap className="w-4 h-4 text-[#60A5FA]" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> 100% White-Hat Editorial Links
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Core Web Vitals Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> AI Overviews &amp; SGE Ready
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. CORE SEO SERVICE MODULE (div#seo-growth) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          id="seo-growth"
          className="p-8 md:p-12 rounded-2xl bg-[#0D1424] border border-[#1E293B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm"
        >
          {/* Left Header info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#070B14] flex items-center justify-center border border-[#1E293B]">
                <Search className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider block">
                  {seoService.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  {seoService.title}
                </h2>
              </div>
            </div>

            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">
              {seoService.fullDesc}
            </p>

            {/* Metrics Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {seoService.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]"
                >
                  <div className="text-2xl font-extrabold text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#94A3B8] font-medium mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#070B14] rounded-xl border border-[#1E293B] space-y-1.5">
              <span className="text-[11px] font-bold text-[#60A5FA] uppercase">
                Recommended For:
              </span>
              <p className="text-xs font-medium text-white">
                {seoService.recommendedFor}
              </p>
            </div>

            <div>
              <button
                onClick={() => onOpenBooking({ services: ['Search Engine Optimization (SEO)'] })}
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <span>Book Technical SEO Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Features & Process */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                Core Service Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seoService.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-medium leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                Execution Process Workflow
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {seoService.processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs space-y-1.5"
                  >
                    <span className="text-[10px] font-bold text-[#60A5FA] block">
                      {step.step}
                    </span>
                    <p className="font-bold text-white leading-tight">
                      {step.title}
                    </p>
                    <p className="text-[10px] text-[#94A3B8] leading-snug">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FOUR CORE TECHNICAL SEO PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Full-Stack Organic Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            The Four Pillars of Modern Search Dominance
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base">
            Search ranking algorithms reward mathematically sound page speed, clear entity structures, authoritative PR signals, and comprehensive answers.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seoPillars.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.08}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#070B14] flex items-center justify-center border border-[#1E293B]">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {pillar.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                {pillar.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]"></span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. LIVE AUDIT SIMULATOR TOOL */}
      <section id="live-audit-tool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <AuditSimulator onOpenBooking={(data) => onOpenBooking(data)} />
        </ScrollReveal>
      </section>

      {/* 5. METHODOLOGY COMPARISON (Old Agency vs. MatricsMania) */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Engineering Precision
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Why Traditional SEO Agencies Fail (And How We Scale)
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal className="p-8 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-4 opacity-80">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                <span>✕</span>
                <span>Traditional SEO Agencies</span>
              </h3>
              <ul className="space-y-3 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Rank for zero-search-intent vanity keywords that yield zero pipeline revenue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Buy spammy PBN link packages that trigger algorithmic penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Produce generic 500-word blog posts with no entity schema or topical depth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Send vague PDF reports with vanity clicks and zero revenue attribution.</span>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="p-8 rounded-2xl bg-[#070B14] border-2 border-[#2563EB]/60 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>The MatricsMania Search Growth Engine</span>
              </h3>
              <ul className="space-y-3 text-xs text-white font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Target high-intent transactional search terms with validated customer lifetime value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>High-DR editorial placements, digital PR studies, and contextual authority signals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Comprehensive semantic content silos with schema markup and AI Overviews readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Live Looker Studio executive reporting connecting rankings directly to pipeline revenue.</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Questions &amp; Answers
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Frequently Asked Questions About Search
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {seoFaqs.map((faq, idx) => (
            <ScrollReveal
              key={faq.id}
              delay={idx * 0.05}
              className="rounded-xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:bg-[#131D33]/50 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${
                    openFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === faq.id && (
                <div className="px-5 pb-5 text-xs text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/50 pt-3">
                  {faq.answer}
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 md:p-12 rounded-3xl bg-[#0D1424] text-white border border-[#1E293B] text-center space-y-6 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
            Start Scaling Inbound Search
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold max-w-2xl mx-auto tracking-tight">
            Ready To Capture Category-Wide Organic Search Volume?
          </h2>
          <p className="text-sm md:text-base text-[#94A3B8] max-w-xl mx-auto">
            Book a 30-minute forensic strategy call with our search engineers. We will analyze your domain and present a 90-day organic growth roadmap.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking({ services: ['Search Engine Optimization (SEO)'] })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Strategic Search Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
