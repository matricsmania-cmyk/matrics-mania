import React, { useState } from 'react';
import { PageType } from '../types';
import { ServiceDetailData, SERVICE_DETAILS, ServiceSlug } from '../data/serviceDetailsData';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  TrendingUp,
  Search,
  Target,
  Users,
  Sparkles,
  ShieldCheck,
  Globe,
  Database,
  Video,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ArrowLeft,
  Zap,
  BarChart3,
  Layers,
  Award,
  Sparkle,
  Compass,
} from 'lucide-react';

const SEO_SUB_SERVICES = [
  { title: 'Technical SEO', desc: 'Sitemap architecture, Robots.txt, canonical cleanups, crawl budget optimization, and core web vitals speed.' },
  { title: 'On-Page SEO', desc: 'Semantic tag targeting, rich media styling, semantic content tuning, and metadata crafting.' },
  { title: 'Off-Page SEO', desc: 'Unlinked brand mention reclamation, authoritative contextual referrals, and entity building.' },
  { title: 'Enterprise SEO', desc: 'Scaling search strategy across 10,000+ pages with template testing and advanced indexing controls.' },
  { title: 'Local SEO', desc: 'Localized JSON-LD schema, consistent citation syndication, and maps optimization.' },
  { title: 'International SEO', desc: 'Hreflang language tagging, ccTLD setups, and multi-regional translation indexing.' },
  { title: 'Ecommerce SEO', desc: 'Faceted navigation management, canonical setups for product variations, and custom CTR snippets.' },
  { title: 'B2B SEO', desc: 'Capturing complex buying intent, custom lead magnets, and targeted industry search terms.' },
  { title: 'WordPress SEO', desc: 'Core speed tweaking, heavy script lightweights, and caching setups.' },
  { title: 'Programmatic SEO', desc: 'Safely generating landing page grids at scale to match long-tail intent search queries.' },
  { title: 'Video SEO', desc: 'Custom video schemas, schema JSON-LD injection, and transcripts crawling.' },
  { title: 'SEO Audit', desc: 'Crawl analysis detecting indexation blockers, speed leaks, and link issues.' },
  { title: 'SEO Migration', desc: 'Flawless staging server dry-runs and bulletproof 301 redirection maps.' },
  { title: 'Link Building', desc: 'Ethical, powerful, and contextual backlinks from high-DR authoritative media.' },
  { title: 'Digital PR', desc: 'Press features, guest contributions, and citations in authoritative trade journals.' },
  { title: 'Entity SEO', desc: 'Mapping brand properties against Wikipedia, Wikidata, and Google Knowledge Graph.' }
];

const AI_SEARCH_SUB_SERVICES = [
  { title: 'Answer Engine Optimization', desc: 'Structuring semantic embeddings to maximize response pick rates inside Perplexity and ChatGPT.' },
  { title: 'Generative Engine Optimization', desc: 'Injecting dynamic schemas, citation sources, and entity structures for Google AI Overviews.' },
  { title: 'AI Search Optimization', desc: 'Targeting conversational engines with clean, indexable facts and definitions.' },
  { title: 'AI SEO', desc: 'Integrating traditional keywords with conversational AI search engines.' },
  { title: 'Google AI Overviews Optimization', desc: 'Positioning your content as the primary reference inside Google Overviews boxes.' },
  { title: 'LLM Optimization', desc: 'Tuning structural data to ensure language models digest your brand correctly during training.' },
  { title: 'AI Citation Optimization', desc: 'Contextual brand and product styling that guarantees citations across Perplexity and Claude.' },
  { title: 'AI Visibility Audit', desc: 'Calculating your share of voice on major conversational search engines.' },
  { title: 'AI Brand Monitoring', desc: 'Automated scraping and tracking of brand sentiment inside LLM queries.' },
  { title: 'LLM Brand Monitoring', desc: 'Tracking and correcting how language models summarize your product pricing and benefits.' },
  { title: 'AI Search Tracking', desc: 'Creating telemetry pipelines that attribute lead source from generative search engines.' },
  { title: 'Schema / Structured Data', desc: 'Advanced JSON-LD schema configurations modeling real-world entities for semantic indexing.' }
];

interface ServiceDetailPageProps {
  slug: ServiceSlug;
  subSlug?: string | null;
  onSubSlugChange?: (sub: string | null) => void;
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug: (slug: ServiceSlug) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  subSlug,
  onSubSlugChange,
  onNavigate,
  onNavigateToServiceSlug,
  onOpenBooking,
}) => {
  const service = SERVICE_DETAILS[slug] || SERVICE_DETAILS['strategy-growth'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getServiceIcon = (iconSlug: string) => {
    switch (iconSlug) {
      case 'strategy-growth':
        return <TrendingUp className="w-8 h-8 text-[#60A5FA]" />;
      case 'search':
      case 'search-ai-visibility':
        return <Search className="w-8 h-8 text-[#60A5FA]" />;
      case 'performance-marketing':
        return <Target className="w-8 h-8 text-[#60A5FA]" />;
      case 'social-influence':
        return <Users className="w-8 h-8 text-[#60A5FA]" />;
      case 'content-creative':
        return <Sparkles className="w-8 h-8 text-[#60A5FA]" />;
      case 'brand-reputation':
        return <ShieldCheck className="w-8 h-8 text-[#60A5FA]" />;
      case 'web-digital-experience':
        return <Globe className="w-8 h-8 text-[#60A5FA]" />;
      case 'data-technology':
        return <Database className="w-8 h-8 text-[#60A5FA]" />;
      case 'media-experiences':
        return <Video className="w-8 h-8 text-[#60A5FA]" />;
      default:
        return <BarChart3 className="w-8 h-8 text-[#60A5FA]" />;
    }
  };

  const normalizedCurrentSlug = slug === 'search-ai-visibility' ? 'search' : slug;
  // Deduplicate other services by title/slug
  const otherServices = Object.values(SERVICE_DETAILS).filter(
    (s, index, self) =>
      s.slug !== normalizedCurrentSlug &&
      self.findIndex((other) => other.title === s.title) === index
  );

  if (normalizedCurrentSlug === 'search' && (subSlug === 'seo' || subSlug === 'ai-search')) {
    const isSeo = subSlug === 'seo';
    const activeSubTitle = isSeo ? 'Search Engine Optimization (SEO)' : 'AI Search & GEO';
    const activeSubTagline = isSeo 
      ? 'Compounding organic pipelines with sub-second infrastructure, topical authority clusters, and digital PR campaigns.'
      : 'Earn authoritative citations, trusted entity spots, and high-frequency mentions across LLM answer engines.';
    const activeSubOverview = isSeo
      ? 'From sub-second site performance and custom schema graphs to programmatic content clusters and global localization, we engineer enterprise-grade search strategies that consistently win competitive high-CPC terms.'
      : 'As search patterns transition to conversational queries in Google AI Overviews, Perplexity, and ChatGPT, we optimize entity schemas, semantic similarity vectors, and authority graphs to place your brand as the primary reference.';
    const activeList = isSeo ? SEO_SUB_SERVICES : AI_SEARCH_SUB_SERVICES;

    return (
      <div className="bg-[#070B14] text-white min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
            <button
              onClick={() => {
                if (onSubSlugChange) onSubSlugChange(null);
              }}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Search &amp; AI Visibility</span>
            </button>
            <span>/</span>
            <span className="text-[#60A5FA]">{activeSubTitle}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ScrollReveal className="max-w-4xl space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#60A5FA]">
              Specialized Discipline Suite
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {activeSubTitle}
            </h1>
            <p className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed">
              {activeSubTagline}
            </p>
            <p className="text-base text-white leading-relaxed max-w-3xl">
              {activeSubOverview}
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking({ services: [activeSubTitle] })}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer flex items-center gap-2.5"
              >
                <span>Request Custom {isSeo ? 'SEO' : 'AI Search'} Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* Detailed Service Capabilities Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
              Operational Matrix
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Custom Capabilities &amp; Work Streams
            </h2>
            <p className="text-sm text-[#94A3B8]">
              A complete breakdown of our specialized execution models delivered directly by our core marketing engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeList.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.04}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0D1424] text-white py-16 border-t border-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Unlock Absolute Organic Visibility
            </h2>
            <p className="text-[#94A3B8] text-xs max-w-lg mx-auto leading-relaxed">
              We engineer secure pipelines that drive high-intent, converting traffic.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking({ services: [activeSubTitle] })}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer"
              >
                Book Custom Architecture Call
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#070B14] text-white min-h-screen">
      {/* 1. BREADCRUMB & BACK NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
          <button
            onClick={() => onNavigate('services')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </button>
          <span>/</span>
          <span className="text-[#60A5FA]">{service.title}</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed">
            {service.tagline}
          </p>

          <p className="text-base text-white leading-relaxed max-w-3xl">
            {service.overview}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBooking({ services: [service.title] })}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer flex items-center gap-2.5"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Request Custom Proposal</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. HERO VERIFIED METRICS ROW */}
      <section className="border-y border-[#1E293B] bg-[#0D1424] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.heroMetrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#60A5FA] tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE DELIVERABLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
        <ScrollReveal className="space-y-4 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
            What You Get
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Core Service Deliverables
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Every engagement is engineered for measurable commercial impact and maximum speed of execution.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.deliverables.map((del, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.06}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] shadow-sm hover:border-[#2563EB]/40 transition-colors space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/15 flex items-center justify-center text-[#60A5FA] font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{del.title}</h3>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed pl-11">
                {del.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4.5 SPECIALIZED TREE AND LINKS FOR SEARCH SERVICE ONLY */}
      {normalizedCurrentSlug === 'search' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1E293B] space-y-12">
          <ScrollReveal className="space-y-4 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
              Specialized Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Explore Our Search &amp; AI Visibility Matrix
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Dive into our dedicated, specialized suites for traditional Search Engine Optimization and Conversational Generative Engine Optimization.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SEO COLUMN */}
            <ScrollReveal className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#1E293B] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Search Engine Optimization (SEO)</h3>
                    <p className="text-xs text-[#94A3B8]">16 Enterprise-grade search capabilities</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] font-medium">
                  {SEO_SUB_SERVICES.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSubSlugChange) onSubSlugChange('seo');
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-black text-xs sm:text-sm transition-all shadow-md text-center cursor-pointer flex items-center justify-center gap-2 shadow-blue-500/20"
              >
                <span>Explore SEO Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </ScrollReveal>

            {/* AI SEARCH COLUMN */}
            <ScrollReveal className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#1E293B] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Search &amp; GEO</h3>
                    <p className="text-xs text-[#94A3B8]">12 Generative optimization capabilities</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] font-medium">
                  {AI_SEARCH_SUB_SERVICES.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSubSlugChange) onSubSlugChange('ai-search');
                }}
                className="w-full py-4 rounded-xl bg-[#070B14] hover:bg-[#131D33] text-white font-black text-xs sm:text-sm transition-all border border-[#1E293B] shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore AI Search Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 5. METHODOLOGY & EXECUTION SPRINT */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Step-by-Step Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 4-Stage Operational Sprint
            </h2>
            <p className="text-sm text-[#94A3B8]">
              How we take your project from initial audit to compounding market dominance.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.methodology.map((m, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#60A5FA] mb-2">{m.step}</div>
                  <h3 className="font-bold text-base text-white mb-2">{m.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK & IDEAL CLIENT PROFILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Tech Stack */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
                Tools &amp; Infrastructure
              </span>
              <h3 className="text-2xl font-bold text-white">
                Enterprise Technology Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-bold text-white shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-6 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
                Who This Is Ideal For
              </span>
              <div className="space-y-2">
                {service.idealFor.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#94A3B8] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Featured Case Study Card */}
          <ScrollReveal className="lg:col-span-6" delay={0.1}>
            <div className="p-8 rounded-2xl md:rounded-3xl bg-[#0D1424] border border-[#1E293B] shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#60A5FA] font-bold text-[11px] uppercase tracking-wider border border-[#1E293B]">
                  Featured Case Study
                </span>
                <span className="text-xs font-bold text-[#94A3B8]">{service.caseStudyPreview.client}</span>
              </div>

              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {service.caseStudyPreview.result}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {service.caseStudyPreview.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate('work')}
                className="w-full py-3.5 rounded-xl bg-[#070B14] hover:bg-[#131D33] border border-[#1E293B] text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View All Agency Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. SERVICE SPECIFIC FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <ScrollReveal className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
            Questions &amp; Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked About {service.title}
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white cursor-pointer hover:text-[#60A5FA] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#60A5FA]' : 'text-[#94A3B8]'}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-[#94A3B8] leading-relaxed border-t border-[#1E293B]">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. EXPLORE OTHER SERVICES NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1E293B]">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">
            Explore Other Growth Disciplines
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherServices.slice(0, 8).map((other) => (
              <button
                key={other.slug}
                onClick={() => {
                  onNavigateToServiceSlug(other.slug as ServiceSlug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 text-left rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#60A5FA] text-xs font-semibold text-white transition-colors cursor-pointer truncate"
              >
                {other.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM IMPACT CTA */}
      <section className="bg-[#0D1424] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Ready to Scale Your {service.title}?
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Let’s discuss your current benchmarks, unit economics, and 90-day growth targets on a 1-on-1 strategy call.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking({ services: [service.title] })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free Strategy Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
