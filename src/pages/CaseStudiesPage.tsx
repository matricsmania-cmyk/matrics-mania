import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Building2,
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Search,
  Code2,
  Cpu,
  Layers,
  ChevronRight,
  Database,
  Globe2,
  FileCode,
  Smartphone,
  ExternalLink,
  Target,
  LineChart,
  Lightbulb,
  Check,
  Calendar,
  Share2,
  Copy
} from 'lucide-react';
import { PageType } from '../types';

interface CaseStudiesPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: string) => void;
  onOpenBooking: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigate,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking,
}) => {
  const [activeArtifactTab, setActiveArtifactTab] = useState<'architecture' | 'schema' | 'crm' | 'performance'>('architecture');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-[#E2E8F0] selection:bg-[#2563EB]/30 selection:text-white font-sans">
      {/* Sticky Case Study Breadcrumb Sub-Header */}
      <div className="sticky top-16 z-30 bg-[#050811]/90 backdrop-blur-md border-b border-[#1E293B] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-white font-mono transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Work Index</span>
            </button>
            <span className="text-[#334155]">/</span>
            <span className="text-[#60A5FA] font-mono font-medium hidden sm:inline">Case Study: Bangalore Luxury Real Estate</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-[11px] font-mono text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? 'Copied' : 'Share Case Study'}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* =========================================================================
            01. HERO SECTION
           ========================================================================= */}
        <section id="case-study-hero" className="space-y-8 pt-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#60A5FA] text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CASE STUDY · SEO + WEB ENGINEERING + CRO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-4xl">
              Turning a fragmented digital presence into an owned inbound acquisition system.
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
              How we redesigned the search architecture, landing page conversion flow, and first-party attribution tracking for a premium residential developer in Bangalore—reducing aggregator reliance and cutting acquisition costs by 38%.
            </p>
          </div>

          {/* Meta Information Grid (02. CLIENT METADATA) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] grid grid-cols-2 md:grid-cols-5 gap-6 text-xs">
            <div>
              <span className="text-[#64748B] font-mono uppercase text-[10px] tracking-wider block mb-1">CLIENT</span>
              <span className="text-white font-bold text-sm block">Residential Developer</span>
              <span className="text-[#94A3B8] text-[11px]">Bangalore Luxury Projects</span>
            </div>

            <div>
              <span className="text-[#64748B] font-mono uppercase text-[10px] tracking-wider block mb-1">INDUSTRY</span>
              <span className="text-white font-bold text-sm block">Real Estate</span>
              <span className="text-[#94A3B8] text-[11px]">Premium Villas & Apartments</span>
            </div>

            <div>
              <span className="text-[#64748B] font-mono uppercase text-[10px] tracking-wider block mb-1">MARKET</span>
              <span className="text-white font-bold text-sm block">Bangalore East</span>
              <span className="text-[#94A3B8] text-[11px]">Whitefield / Sarjapur Corridor</span>
            </div>

            <div>
              <span className="text-[#64748B] font-mono uppercase text-[10px] tracking-wider block mb-1">SERVICES</span>
              <span className="text-white font-bold text-sm block">SEO · Web · CRO</span>
              <span className="text-[#94A3B8] text-[11px]">Full Funnel Engineering</span>
            </div>

            <div>
              <span className="text-[#64748B] font-mono uppercase text-[10px] tracking-wider block mb-1">TIMELINE</span>
              <span className="text-emerald-400 font-bold text-sm block font-mono">6 Months</span>
              <span className="text-[#94A3B8] text-[11px]">Feb 2026 – Aug 2026</span>
            </div>
          </div>

          {/* Large Hero Visual / System Interface Diagram */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-[#1E293B] shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-semibold">ACQUISITION ARCHITECTURE BLUEPRINT</span>
              </div>
              <span className="text-[#64748B]">ENGAGEMENT REF: MM-CS-2026-RE01</span>
            </div>

            {/* Architecture Flow Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pillar 1: High Intent Search Engine */}
              <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#60A5FA] font-bold">01 // INBOUND SEARCH</span>
                  <Search className="w-4 h-4 text-[#60A5FA]" />
                </div>
                <h4 className="text-white font-bold text-sm">Topical Entity Architecture</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  24 hyper-targeted micro-market property silos targeting high-intent buyer keywords with structured JSON-LD schema.
                </p>
                <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#64748B]">Organic Visibility</span>
                  <span className="text-emerald-400 font-bold">+142% Surge</span>
                </div>
              </div>

              {/* Pillar 2: Sub-Second Digital Experience */}
              <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-purple-400 font-bold">02 // DIGITAL EXPERIENCE</span>
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-white font-bold text-sm">High-Speed Headless Web</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Static pre-rendering with Edge CDN distribution, instant SVG floor plan inspectors, and 0.62s Largest Contentful Paint.
                </p>
                <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#64748B]">Mobile Speed</span>
                  <span className="text-purple-400 font-bold">0.62s (100/100 CWV)</span>
                </div>
              </div>

              {/* Pillar 3: Telemetry & CRM Qualification */}
              <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-bold">03 // CRM & ATTRIBUTION</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-white font-bold text-sm">Frictionless Qualification</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Direct WhatsApp business routing with 100% first-party UTM parameter logging into sales CRM webhook pipelines.
                </p>
                <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#64748B]">Attribution Match</span>
                  <span className="text-emerald-400 font-bold">99.4% Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02. CLIENT & 03. BUSINESS CONTEXT
           ========================================================================= */}
        <section id="business-context" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase tracking-widest block mb-1">
              02 // CLIENT PROFILE & 03 // BUSINESS CONTEXT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Reality of Bangalore’s Premium Property Market
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#94A3B8] leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#60A5FA]" />
                <span>The Client Profile</span>
              </h3>
              <p>
                The client is a premier real estate developer operating in Bangalore’s high-growth eastern IT corridor (Whitefield, Sarjapur, and Outer Ring Road). Their portfolio consists of luxury villa communities and gated high-rise developments with average ticket sizes between ₹1.8 Cr and ₹4.5 Cr.
              </p>
              <p>
                Target buyers include senior technology executives, NRI investors in North America and the Gulf, and venture-backed founders looking for long-term luxury residences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-purple-400" />
                <span>The Commercial Environment</span>
              </h3>
              <p>
                Over the past 5 years, third-party real estate portal aggregators (99acres, MagicBricks, Housing.com) captured complete dominance over search engine visibility. Developers were forced into aggressive bidding wars for ad placements on these portals.
              </p>
              <p>
                This created high customer acquisition costs (CAC) where developers paid hefty fees for leads that were simultaneously sold to 4 or 5 rival projects, degrading conversion rates and exhausting sales teams.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04. THE CHALLENGE
           ========================================================================= */}
        <section id="the-challenge" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest block mb-1">
              04 // THE CHALLENGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why the Existing Setup Was Failing
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Establishing root causes before prescribing solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-red-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-red-400 block">01 // WHAT WAS HAPPENING?</span>
              <h4 className="text-white font-bold text-sm">Aggregator Lock-in</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                88% of incoming inquiries originated from third-party broker portals. The developer had zero direct search equity for their own project names.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1424] border border-red-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-red-400 block">02 // WHY WAS IT A PROBLEM?</span>
              <h4 className="text-white font-bold text-sm">Escalating CAC & Low Lead Quality</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Portal lead costs rose 35% year-over-year. 60% of sales team hours were wasted qualifying shared, unmotivated leads with high churn.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1424] border border-red-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-red-400 block">03 // WHAT PREVENTED GROWTH?</span>
              <h4 className="text-white font-bold text-sm">Technical Debt & Speed Bottlenecks</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                The legacy website suffered 4.2-second mobile load speeds, broken canonical tags, and unindexed project PDFs that Google ignored.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1424] border border-red-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-red-400 block">04 // WHAT CONSTRAINTS EXISTED?</span>
              <h4 className="text-white font-bold text-sm">Regulatory & Brand Rules</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Strict Karnataka RERA compliance disclosures, fixed luxury branding guidelines, and an existing Salesforce CRM workflow that could not be interrupted.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05. OBJECTIVES
           ========================================================================= */}
        <section id="objectives" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase tracking-widest block mb-1">
              05 // OBJECTIVES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explicit, Quantifiable Goals for the Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#60A5FA] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="text-white font-bold text-base">Build an Owned Search Moat</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Achieve top 3 organic rankings for primary micro-market commercial queries in Bangalore East without ongoing per-click ad fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="text-white font-bold text-base">Sub-Second Mobile Experience</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Engineered a headless web architecture achieving 100/100 Core Web Vitals and under 0.8s mobile load times on 4G connections.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h4 className="text-white font-bold text-base">Direct Lead Pipeline & Attribution</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Reduce Cost Per Qualified Acquisition by &gt;30% and ensure 100% first-party tracking for calls and WhatsApp site inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06. THE DIAGNOSIS (WHAT WE FOUND)
           ========================================================================= */}
        <section id="the-diagnosis" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block mb-1">
              06 // THE DIAGNOSIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              What We Found: The 5-Point Technical Audit
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Only verified findings documented during the initial 14-day discovery sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>01 // VISIBILITY GAP</span>
              </div>
              <h4 className="text-white font-bold text-sm">Entity Isolation</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Google had not connected the developer's entity to local geographic coordinates or RERA registrations. Zero presence in localized Map Packs or generative answer nodes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>02 // TECHNICAL CONSTRAINT</span>
              </div>
              <h4 className="text-white font-bold text-sm">Crawl Budget Bleed</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                1,400+ auto-generated WordPress tag pages and faceted search parameter URLs were wasting Googlebot crawl budget, leaving core project pages unindexed for weeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>03 // CONVERSION FRICTION</span>
              </div>
              <h4 className="text-white font-bold text-sm">Intrusive 8-Field Lead Walls</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Visitors were forced to fill out an 8-field form before viewing floor plans. Mobile abandonment rate on the form exceeded 78%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>04 // CONTENT GAP</span>
              </div>
              <h4 className="text-white font-bold text-sm">No Location Neighborhood Intelligence</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Property pages lacked commute time tables to tech parks, school distance matrices, and construction timeline milestones—the exact intent criteria tech buyers look for.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-[#1E293B] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>05 // MEASUREMENT GAP</span>
              </div>
              <h4 className="text-white font-bold text-sm">Broken Telemetry & Offline Call Blindspots</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Over 65% of incoming calls and WhatsApp inquiries were untracked or recorded as "Direct / None" in the sales CRM, making marketing ROI calculations inaccurate.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07. STRATEGY (THE REASONING CHAIN)
           ========================================================================= */}
        <section id="strategy" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase tracking-widest block mb-1">
              07 // STRATEGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Strategic Reasoning Chain
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Demonstrating the logical progression from business goal to measurement.
            </p>
          </div>

          {/* Vertical Reasoning Hierarchy Flow */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0F1D] border border-[#1E293B] space-y-6">
            <div className="flex flex-col space-y-4">
              {/* Step 1: Business Objective */}
              <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] flex items-start gap-4">
                <div className="px-2.5 py-1 rounded bg-blue-500/20 text-[#60A5FA] font-mono text-xs font-bold shrink-0 mt-0.5">
                  GOAL
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">BUSINESS OBJECTIVE</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Generate 50+ qualified direct buyer inquiries per month for Bangalore East luxury villas at &lt; ₹4,000 CAC.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#2563EB]" />
              </div>

              {/* Step 2: Problem */}
              <div className="p-4 rounded-xl bg-[#0D1424] border border-red-500/20 flex items-start gap-4">
                <div className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  PROBLEM
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">IDENTIFIED BOTTLENECK</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Third-party portals monopolize search results while the developer's slow website bounces 78% of incoming mobile buyers.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#2563EB]" />
              </div>

              {/* Step 3: Insight */}
              <div className="p-4 rounded-xl bg-[#0D1424] border border-purple-500/20 flex items-start gap-4">
                <div className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  INSIGHT
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">BEHAVIORAL INSIGHT</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    High-net-worth buyers in tech corridors do not search generic terms; they search specific micro-locations (e.g. "4 BHK villas near Hope Farm junction") and prefer instant WhatsApp floor plan inspection over phone sales calls.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#2563EB]" />
              </div>

              {/* Step 4: Strategic Decision */}
              <div className="p-4 rounded-xl bg-[#0D1424] border border-emerald-500/20 flex items-start gap-4">
                <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  DECISION
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">STRATEGIC DECISION</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Deploy a static Next.js headless architecture targeting 24 hyper-local semantic silos with instant 1-click WhatsApp brochure dispatch and server-side GA4 telemetry.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-[#2563EB]" />
              </div>

              {/* Step 5: Execution & Measurement */}
              <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] flex items-start gap-4">
                <div className="px-2.5 py-1 rounded bg-[#2563EB]/20 text-[#60A5FA] font-mono text-xs font-bold shrink-0 mt-0.5">
                  RESULTS
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">EXECUTION & MEASUREMENT</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    100% automated UTM logging into CRM webhook pipeline. Direct organic inquiries grew +142%, outperforming paid portal channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08. EXECUTION (ACTUAL ARTIFACTS & CODE INSPECTORS)
           ========================================================================= */}
        <section id="execution" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
              08 // EXECUTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Actual Artifacts & Technical Deployments
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Deep documentation of the codebase, schema structures, and conversion funnels deployed during the engagement.
            </p>
          </div>

          {/* Interactive Artifacts Switcher */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0A0F1D] border border-[#1E293B] text-xs font-mono">
              <button
                onClick={() => setActiveArtifactTab('architecture')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeArtifactTab === 'architecture'
                    ? 'bg-[#2563EB] text-white shadow-lg'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                01 // Web & Cloudflare Stack
              </button>
              <button
                onClick={() => setActiveArtifactTab('schema')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeArtifactTab === 'schema'
                    ? 'bg-[#2563EB] text-white shadow-lg'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                02 // JSON-LD Entity Graph
              </button>
              <button
                onClick={() => setActiveArtifactTab('crm')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeArtifactTab === 'crm'
                    ? 'bg-[#2563EB] text-white shadow-lg'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                03 // WhatsApp & CRM Pipeline
              </button>
              <button
                onClick={() => setActiveArtifactTab('performance')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeArtifactTab === 'performance'
                    ? 'bg-[#2563EB] text-white shadow-lg'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                04 // Core Web Vitals Benchmark
              </button>
            </div>

            {/* Artifact Content Area */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-[#1E293B] min-h-[380px]">
              <AnimatePresence mode="wait">
                {activeArtifactTab === 'architecture' && (
                  <motion.div
                    key="tab-arch"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-3">
                      <span className="text-[#60A5FA] font-bold">ARTIFACT 01 // HEADLESS SYSTEM ARCHITECTURE</span>
                      <span className="text-[#64748B]">Next.js 15 + Cloudflare Edge Workers</span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Replaced the bloated WordPress monolithic installation with a decoupled headless frontend. Static Site Generation (SSG) pre-renders all 24 property landing pages at build time, deployed directly to Cloudflare global Edge nodes for instant 0.62s Time to First Byte (TTFB).
                    </p>

                    <div className="p-4 rounded-xl bg-[#050811] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] overflow-x-auto">
                      <pre className="text-[11px] leading-relaxed">
{`// Cloudflare Edge Route Handler - Instant Sub-Second Property Dispatch
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const microMarket = url.pathname.split('/')[2]; // e.g., 'whitefield-luxury-villas'
  
  // Fetch static edge cached HTML with stale-while-revalidate
  const cache = caches.default;
  let response = await cache.match(request);
  
  if (!response) {
    response = await fetch(\`https://origin-api.domain.com/properties/\${microMarket}\`, {
      headers: { 'x-edge-token': env.EDGE_SECRET, 'cache-control': 'public, max-age=86400' }
    });
    // Stream sub-second compressed response with zero layout shifts
  }
  return response;
}`}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {activeArtifactTab === 'schema' && (
                  <motion.div
                    key="tab-schema"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-3">
                      <span className="text-[#60A5FA] font-bold">ARTIFACT 02 // STRUCTURED REAL ESTATE JSON-LD SCHEMA</span>
                      <span className="text-[#64748B]">Schema.org / RealEstateListing + GeoCoordinates</span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Injected structured microdata directly linking each residential tower to latitude/longitude coordinates, Karnataka RERA project IDs, starting price ranges, and amenity graphs. This earned verified Google Knowledge Graph cards and Map Pack authority.
                    </p>

                    <div className="p-4 rounded-xl bg-[#050811] border border-[#1E293B] text-xs font-mono text-emerald-300 overflow-x-auto">
                      <pre className="text-[11px] leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "SingleFamilyResidence",
  "name": "The Grand Palms Luxury Villas",
  "description": "4 & 5 BHK Sustainable Luxury Villas in Whitefield Bangalore",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.9698",
    "longitude": "77.7499"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Whitefield, Bangalore East",
    "addressRegion": "Karnataka",
    "postalCode": "560066"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "28500000",
    "availability": "https://schema.org/InStock"
  }
}`}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {activeArtifactTab === 'crm' && (
                  <motion.div
                    key="tab-crm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-3">
                      <span className="text-[#60A5FA] font-bold">ARTIFACT 03 // WHATSAPP PIPELINE & ATTRIBUTION WEBHOOK</span>
                      <span className="text-[#64748B]">Server-Side GTM + Meta Cloud API Webhook</span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Replaced 8-field forms with a frictionless WhatsApp 1-Click Verification widget. When clicked, server-side tracking captures UTM source, search keyword, and landing page URL, forwarding it instantly into the sales CRM before the chat initiates.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                        <span className="text-[#60A5FA] font-bold block">1. VISITOR INTERACTION</span>
                        <p className="text-[#94A3B8] text-[11px]">
                          Buyer clicks "Download Pricing & Floor Plans via WhatsApp". Pre-populates verified project code.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                        <span className="text-emerald-400 font-bold block">2. INSTANT CRM WEBHOOK</span>
                        <p className="text-[#94A3B8] text-[11px]">
                          Sales agent receives lead in CRM in &lt; 3 seconds with exact organic keyword and Google click ID.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeArtifactTab === 'performance' && (
                  <motion.div
                    key="tab-perf"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-3">
                      <span className="text-[#60A5FA] font-bold">ARTIFACT 04 // CORE WEB VITALS AUDIT COMPARISON</span>
                      <span className="text-[#64748B]">Chrome User Experience Report (CrUX)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-red-500/30">
                        <span className="text-[10px] font-mono text-red-400 block mb-1">BEFORE LCP</span>
                        <span className="text-xl font-black text-red-400 font-mono">4.20s</span>
                        <span className="text-[10px] text-[#64748B] block mt-1">Poor (Mobile 4G)</span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-emerald-500/30">
                        <span className="text-[10px] font-mono text-emerald-400 block mb-1">AFTER LCP</span>
                        <span className="text-xl font-black text-emerald-400 font-mono">0.62s</span>
                        <span className="text-[10px] text-emerald-400 block mt-1">Good (Sub-Second)</span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-red-500/30">
                        <span className="text-[10px] font-mono text-red-400 block mb-1">BEFORE CLS</span>
                        <span className="text-xl font-black text-red-400 font-mono">0.38</span>
                        <span className="text-[10px] text-[#64748B] block mt-1">High Layout Shift</span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1424] border border-emerald-500/30">
                        <span className="text-[10px] font-mono text-emerald-400 block mb-1">AFTER CLS</span>
                        <span className="text-xl font-black text-emerald-400 font-mono">0.00</span>
                        <span className="text-[10px] text-emerald-400 block mt-1">Zero Shift</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09. RESULTS (DISCIPLINED FORMAT & CAUSAL ATTRIBUTION)
           ========================================================================= */}
        <section id="results" className="space-y-8">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
              09 // RESULTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Disciplined Outcomes & Verified Causal Factors
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Verified outcomes from Google Search Console, Google Analytics 4, and Sales CRM logs.
            </p>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono text-[#64748B] uppercase">METRIC 01</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">+142%</div>
              <h4 className="text-white font-bold text-sm">Organic Inquiries</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Direct monthly buyer inquiries grew from 28 to 68 per month without additional ad expenditure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono text-[#64748B] uppercase">METRIC 02</span>
              <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">0.62s</div>
              <h4 className="text-white font-bold text-sm">Mobile LCP Speed</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Cut page load time by 85%, eliminating mobile drop-offs during site visits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-blue-500/30 space-y-2">
              <span className="text-xs font-mono text-[#64748B] uppercase">METRIC 03</span>
              <div className="text-3xl sm:text-4xl font-black text-[#60A5FA] font-mono">-38%</div>
              <h4 className="text-white font-bold text-sm">Cost Per Acquisition</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Blended CAC dropped significantly as high-intent direct organic pipeline displaced paid portal leads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono text-[#64748B] uppercase">METRIC 04</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">99.4%</div>
              <h4 className="text-white font-bold text-sm">Attribution Match</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Eliminated offline call blindspots with server-side first-party UTM logging.
              </p>
            </div>
          </div>

          {/* Honest Causal Relationship Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>What Caused the Change? (Establishing Causal Attribution)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#94A3B8] leading-relaxed">
              <div className="space-y-2">
                <span className="text-white font-semibold block font-mono">1. Topical Indexing</span>
                <p>
                  Deploying 24 micro-market property pages with JSON-LD schema allowed Google to index specific locality keywords (e.g. "gated community villas Sarjapur road") directly into top 3 positions.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-white font-semibold block font-mono">2. Frictionless Conversion</span>
                <p>
                  Replacing the 8-field form wall with instant 1-click WhatsApp brochure access reduced bounce rates on mobile landing pages from 78% down to 29%.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-white font-semibold block font-mono">3. Sub-Second Speed</span>
                <p>
                  Eliminating render-blocking WordPress scripts improved mobile engagement duration by 3.2x, preventing users from bouncing back to search result pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. WHAT WE LEARNED
           ========================================================================= */}
        <section id="what-we-learned" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block mb-1">
              10 // WHAT WE LEARNED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Engineering Post-Mortem & Next Opportunities
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Honest reflections on what worked, what failed, and unresolved challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-emerald-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 block">01 // WHAT WORKED</span>
              <h4 className="text-white font-bold text-sm">Interactive SVG Floor Plans</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Pre-rendering interactive SVG floor plan selectors generated 4.1x higher dwell time than downloadable PDF brochures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-red-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-red-400 block">02 // WHAT DIDN'T</span>
              <h4 className="text-white font-bold text-sm">3D Virtual Tour Embeds</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Initial WebGL 3D tour embeds degraded mobile interaction metrics (INP). We refactored them to load on-demand only after user interaction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-blue-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA] block">03 // WHAT SURPRISED US</span>
              <h4 className="text-white font-bold text-sm">NRI Midnight Inbound Surge</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                34% of high-intent inquiries arrived between 11 PM and 4 AM IST from buyers in the US and Dubai, requiring automated timezone scheduling bots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-amber-500/20 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 block">04 // WHAT REMAINS UNRESOLVED</span>
              <h4 className="text-white font-bold text-sm">Dynamic Price Fluctuations</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Frequent real estate unit price updates require automated daily schema feeds to ensure Google AI search summaries display accurate rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-purple-500/20 space-y-3 md:col-span-2">
              <span className="text-xs font-mono font-bold text-purple-400 block">05 // NEXT OPPORTUNITY</span>
              <h4 className="text-white font-bold text-sm">Generative Engine Optimization (GEO)</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Expanding structured entity definitions into Google AI Overviews and ChatGPT Search so conversational engines cite the developer directly when users ask "Which luxury villas in Bangalore have the highest green cover?".
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. RELATED SERVICES
           ========================================================================= */}
        <section id="related-services" className="space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase tracking-widest block mb-1">
              11 // RELATED CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Services Deployed in This Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => onNavigateToServiceSlug?.('technical-seo')}
              className="p-6 rounded-2xl bg-[#0A0F1D] hover:bg-[#0E1528] border border-[#1E293B] transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#60A5FA] flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm group-hover:text-[#60A5FA] transition-colors flex items-center justify-between">
                <span>Technical SEO & Schema</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Entity optimization, crawl budget management, and JSON-LD schema injection for enterprise search visibility.
              </p>
            </div>

            <div
              onClick={() => onNavigateToServiceSlug?.('cro-conversion-engineering')}
              className="p-6 rounded-2xl bg-[#0A0F1D] hover:bg-[#0E1528] border border-[#1E293B] transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>CRO & Landing Page UX</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                High-speed conversion engineering, frictionless inquiry funnels, and sub-second mobile page delivery.
              </p>
            </div>

            <div
              onClick={() => onNavigateToServiceSlug?.('attribution-analytics-intelligence')}
              className="p-6 rounded-2xl bg-[#0A0F1D] hover:bg-[#0E1528] border border-[#1E293B] transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Attribution & CRM Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Server-side tracking, webhook automations, and multi-touch lead attribution for high-ticket sales pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            12. CTA
           ========================================================================= */}
        <section id="case-study-cta" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D1424] to-[#0A0F1D] border border-[#1E293B] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase tracking-widest block">
              12 // READY TO BUILD YOUR INBOUND MOAT?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Let's diagnose your acquisition bottlenecks.
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              We conduct deep technical audits of search visibility, site performance, and conversion leakages before recommending commercial engagements.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="case-study-book-audit-btn"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Technical Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('work')}
                className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white text-sm font-semibold border border-[#1E293B] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View All Work & Case Studies</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
