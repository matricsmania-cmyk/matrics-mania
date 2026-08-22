'use client';

import React, { useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  BenchmarkMetricsSection,
  ChallengesGridSection,
  ComplianceBadgesSection,
  FAQAccordionSection,
  ConversionCTASection,
} from '../components/sections';
import { InternalLinkingGraph } from '../components/InternalLinkingGraph';
import { getIndustryContextualLinks } from '../utils/internalLinking';
import { Industry } from '../models';
import { NotFoundState } from '../components/ErrorStates';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface IndustryTemplateProps {
  industry?: Industry;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
  industry: propIndustry,
  slug,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const industry =
    propIndustry ||
    (slug ? provider.getIndustryBySlug(slug) : null) ||
    (!slug ? provider.getAllIndustries()[0] : null);

  const allIndustries = provider.getAllIndustries();

  if (!industry) {
    return (
      <NotFoundState
        attemptedPath={slug ? `/industries/${slug}/` : '/industries/'}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const canonicalUrl = industry.seo?.canonicalUrl || `https://matricsmania.com/industries/${industry.slug}/`;
  const industryTitle = industry.title;
  const metaDescription = industry.seo?.metaDescription || industry.marketSummary || industry.excerpt;

  const contextualLinks = useMemo(
    () => getIndustryContextualLinks(industry, provider),
    [industry, provider]
  );

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={industry.seo}
        entity={industry}
        pageType="industry"
        faqs={industry.faqs}
      />

      {/* 1. BREADCRUMBS */}
      <div className="border-b border-[#1E293B] bg-[#050811] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('/industries/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Industries
          </button>
          <span>/</span>
          <span className="text-[#60A5FA] truncate">{industryTitle}</span>
        </div>
      </div>

      {/* 2. HERO */}
      <PageHeroSection
        eyebrow={`// ${industry.industryCode || 'Industry Practice'}`}
        title={industryTitle}
        tagline={industry.tagline}
        subtitle={metaDescription}
        primaryCtaLabel="Book Industry Strategy Session"
        onPrimaryCta={() =>
          onOpenBooking({ industry: industryTitle, interest: `${industryTitle} Architecture` })
        }
        secondaryCtaLabel="Explore Acquisition Mechanics"
        onSecondaryCta={() => {
          const el = document.getElementById('acquisition-mechanics');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        metrics={industry.benchmarks?.map((m) => ({
          label: m.metric,
          value: m.matricsManiaEngineered,
          sourceBenchmark: `Avg: ${m.industryAverage} (${m.deltaPercent})`,
        }))}
      />

      {/* 3. COMPLIANCE & REVENUE ECONOMICS STRIP */}
      {industry.complianceStandards && industry.complianceStandards.length > 0 && (
        <ComplianceBadgesSection
          standards={industry.complianceStandards}
          salesCycle={industry.typicalSalesCycle || industry.salesCycleInfo?.typicalDuration}
          averageACV={industry.averageACV || industry.unitEconomicsData?.averageACV}
        />
      )}

      {/* 4. ACQUISITION MECHANICS */}
      {industry.acquisitionMechanics && (
        <section id="acquisition-mechanics" className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Target className="w-3.5 h-3.5 text-[#3B82F6]" />
                Acquisition Mechanics
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                How We Capture & Route Demand in {industryTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {industry.acquisitionMechanics.overview}
              </p>
            </ScrollReveal>

            {/* Channel Mix Breakdown */}
            {industry.acquisitionMechanics.channels && industry.acquisitionMechanics.channels.length > 0 && (
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Engineered Channel Allocation</h3>
                    <p className="text-xs text-[#94A3B8]">Target media mix and attribution calibration</p>
                  </div>
                  <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded-full border border-[#2563EB]/20 self-start sm:self-auto">
                    Multi-Touch Attribution
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {industry.acquisitionMechanics.channels.map((ch, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{ch.name}</span>
                        <span className="text-xs font-mono font-bold text-[#60A5FA]">{ch.shareOfMix}</span>
                      </div>
                      <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2563EB] h-full rounded-full"
                          style={{ width: ch.shareOfMix }}
                        />
                      </div>
                      <p className="text-xs text-[#94A3B8]">{ch.focus}</p>
                      {ch.metric && (
                        <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#64748B] uppercase">Target Metric</span>
                          <span className="text-xs font-mono text-emerald-400">{ch.metric}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Funnel Stages & Engineered Fixes */}
            {industry.acquisitionMechanics.funnelStages && industry.acquisitionMechanics.funnelStages.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Full-Funnel Stage Engineering</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {industry.acquisitionMechanics.funnelStages.map((stage, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.08}>
                      <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] h-full flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono font-semibold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20 uppercase">
                            STAGE 0{idx + 1}
                          </span>
                          <h4 className="text-base font-bold text-white">{stage.stage}</h4>
                          <p className="text-xs text-[#CBD5E1] leading-relaxed">{stage.action}</p>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-[#1E293B]">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-rose-400 uppercase flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-rose-400" /> Drop-Off Risk
                            </span>
                            <p className="text-[11px] text-[#94A3B8]">{stage.dropoffRisk}</p>
                          </div>
                          <div className="space-y-1 bg-[#070B14] p-2.5 rounded-xl border border-[#1E293B]">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Engineered Solution
                            </span>
                            <p className="text-[11px] text-[#E2E8F0]">{stage.engineeredFix}</p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. SALES-CYCLE CONSIDERATIONS & BUYING COMMITTEE */}
      {industry.salesCycleInfo && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                Sales-Cycle Dynamics
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Sales-Cycle Considerations & Velocity Catalysts
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                De-risking long evaluation periods and aligning marketing collateral with buying committee requirements.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Key Stats & Committee */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-[#1E293B] pb-3">
                    Evaluation Parameters
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B]">
                      <span className="text-xs text-[#94A3B8]">Typical Sales Duration</span>
                      <span className="text-sm font-mono font-bold text-[#60A5FA]">
                        {industry.salesCycleInfo.typicalDuration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B]">
                      <span className="text-xs text-[#94A3B8]">Buying Committee Size</span>
                      <span className="text-sm font-mono font-bold text-white">
                        {industry.salesCycleInfo.buyingCommitteeSize}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1.5">
                      <span className="text-[10px] font-mono text-rose-400 uppercase">Primary Hesitation</span>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {industry.salesCycleInfo.primaryHesitation}
                      </p>
                    </div>
                  </div>

                  {industry.salesCycleInfo.keyDecisionMakers && (
                    <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                      <span className="text-[11px] font-mono text-[#64748B] uppercase">Key Decision Makers</span>
                      <div className="space-y-1.5">
                        {industry.salesCycleInfo.keyDecisionMakers.map((dm, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                            <Users className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                            <span>{dm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Velocity Catalysts & Stage Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                {/* Velocity Catalysts */}
                {industry.salesCycleInfo.velocityCatalysts && (
                  <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-base font-bold text-white">Engineered Velocity Catalysts</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {industry.salesCycleInfo.velocityCatalysts.map((vc, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                          <span className="text-[10px] font-mono text-emerald-400">CATALYST 0{idx + 1}</span>
                          <p className="text-xs text-[#CBD5E1] leading-relaxed">{vc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage Breakdown */}
                {industry.salesCycleInfo.stageBreakdown && (
                  <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <h3 className="text-base font-bold text-white">Cycle Stage Breakdown</h3>
                    <div className="space-y-3">
                      {industry.salesCycleInfo.stageBreakdown.map((sb, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <span className="text-xs font-bold text-white">{sb.stage}</span>
                            <p className="text-xs text-[#94A3B8]">{sb.focus}</p>
                          </div>
                          <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded border border-[#2563EB]/20 self-start sm:self-auto shrink-0">
                            {sb.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. UNIT ECONOMICS & FINANCIAL ARCHITECTURE */}
      {industry.unitEconomicsData && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <DollarSign className="w-3.5 h-3.5 text-[#3B82F6]" />
                Unit Economics
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Revenue & Unit Economics Model
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {industry.unitEconomicsData.economicsNotes}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                <span className="text-xs font-mono text-[#64748B] uppercase">Average ACV / Deal</span>
                <div className="text-xl font-bold text-white font-mono">
                  {industry.unitEconomicsData.averageACV}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Target annual customer contract value</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                <span className="text-xs font-mono text-[#64748B] uppercase">Target CAC</span>
                <div className="text-xl font-bold text-[#60A5FA] font-mono">
                  {industry.unitEconomicsData.targetCAC}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Closed-won acquisition threshold</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                <span className="text-xs font-mono text-[#64748B] uppercase">Payback Horizon</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {industry.unitEconomicsData.paybackPeriod}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Full capital recovery timeline</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                <span className="text-xs font-mono text-[#64748B] uppercase">LTV:CAC Ratio</span>
                <div className="text-xl font-bold text-amber-400 font-mono">
                  {industry.unitEconomicsData.ltvToCacRatio}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Compounding return multiplier</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#60A5FA] uppercase">Primary Growth Lever</span>
                <p className="text-sm font-bold text-white">{industry.unitEconomicsData.keyLever}</p>
              </div>
              <button
                onClick={() =>
                  onOpenBooking({ industry: industryTitle, interest: 'Unit Economics Audit' })
                }
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                Audit Your Unit Economics →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 7. CUSTOMER CHARACTERISTICS / ICP PROFILING */}
      {industry.customerProfile && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
                Customer Profiling
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Ideal Customer Profile (ICP) & Buying Personas
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {industry.customerProfile.icpDefinition}
              </p>
            </ScrollReveal>

            {/* Triggers & Disqualifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Primary Inbound Triggers
                </h3>
                <ul className="space-y-2.5">
                  {industry.customerProfile.keyTriggers?.map((trigger, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <span className="text-[#60A5FA] font-mono mt-0.5">•</span>
                      <span>{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Disqualification Signals
                </h3>
                <ul className="space-y-2.5">
                  {industry.customerProfile.disqualificationSignals?.map((sig, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <span className="text-rose-400 font-mono mt-0.5">✕</span>
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buyer Personas */}
            {industry.customerProfile.buyerPersonas && industry.customerProfile.buyerPersonas.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Committee Persona Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {industry.customerProfile.buyerPersonas.map((persona, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                          {persona.role}
                        </span>
                        <div className="text-xs text-[#CBD5E1] pt-1">
                          <span className="text-[#64748B] uppercase font-mono block text-[10px]">Core Focus</span>
                          {persona.focus}
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#1E293B]">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-amber-400 uppercase">Core Objection</span>
                          <p className="text-[11px] text-[#94A3B8]">{persona.coreObjection}</p>
                        </div>
                        <div className="space-y-1 bg-[#070B14] p-2.5 rounded-xl border border-[#1E293B]">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase">Engineered Pitch</span>
                          <p className="text-[11px] text-[#E2E8F0]">{persona.valueProposition}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. SERVICE RECOMMENDATIONS */}
      {industry.serviceRecommendations && industry.serviceRecommendations.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                Recommended Services
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Prioritized Growth Services for {industryTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Strategic sequence of execution sprints engineered to maximize ROI velocity.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.serviceRecommendations.map((sr, idx) => (
                <a
                  key={idx}
                  href={`/services/${sr.serviceSlug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/services/${sr.serviceSlug}/`);
                  }}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB] transition-all cursor-pointer flex flex-col justify-between space-y-4 group no-underline"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20 uppercase">
                        {sr.priority}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">{sr.expectedTimeline}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors flex items-center justify-between">
                      <span>{sr.serviceTitle}</span>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{sr.rationale}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                    <span>View Service Architecture</span>
                    <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. QUANTITATIVE BENCHMARKS */}
      {industry.benchmarks && industry.benchmarks.length > 0 && (
        <BenchmarkMetricsSection
          title={`${industryTitle} Quantitative Benchmarks`}
          subtitle="Observed performance shifts and conversion lift across client vertical deployments."
          metrics={industry.benchmarks.map((b) => ({
            label: b.metric,
            value: b.matricsManiaEngineered,
            sourceBenchmark: `Industry Average: ${b.industryAverage}`,
          }))}
        />
      )}

      {/* 10. STRUCTURAL INDUSTRY CHALLENGES / BOTTLENECKS */}
      {industry.challenges && industry.challenges.length > 0 && (
        <ChallengesGridSection
          title={`${industryTitle} Bottlenecks & Pitfalls`}
          subtitle="Common failure modes in this vertical that waste marketing capital."
          challenges={industry.challenges}
        />
      )}

      {/* 11. STRATEGIC PILLARS */}
      {industry.playbookPillars && industry.playbookPillars.length > 0 && (
        <section id="strategic-pillars" className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Target className="w-3.5 h-3.5 text-[#3B82F6]" />
                Tailored Playbooks
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Engineered Solutions for {industryTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Vertical-specific architectures crafted around exact sales velocity and qualification rigor.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.playbookPillars.map((sol, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                        {sol.phase || `PILLAR 0${idx + 1}`}
                      </span>
                      <h3 className="text-lg font-bold text-white">{sol.title}</h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {sol.expectedImpact}
                      </p>
                    </div>

                    {sol.actionItems && sol.actionItems.length > 0 && (
                      <div className="border-t border-[#1E293B] pt-4 space-y-2">
                        <div className="text-[10px] font-mono uppercase text-[#64748B] tracking-wider">
                          Key Operational Tactics
                        </div>
                        <ul className="space-y-1.5">
                          {sol.actionItems.map((tac, tIdx) => (
                            <li
                              key={tIdx}
                              className="flex items-center gap-2 text-xs text-[#CBD5E1]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{tac}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. RELATIONAL KNOWLEDGE GRAPH (SERVICES, CASE STUDIES, INSIGHTS) */}
      <InternalLinkingGraph
        title={`${industryTitle} Knowledge Graph`}
        subtitle="Explore prioritized growth services, empirical case studies, and technical research interconnected with this vertical."
        badge="Contextual Architecture"
        services={contextualLinks.relevantServices}
        caseStudies={contextualLinks.relevantCaseStudies}
        insights={contextualLinks.relevantInsights}
        onNavigate={onNavigate}
      />

      {/* 13. FAQS */}
      {industry.faqs && industry.faqs.length > 0 && (
        <FAQAccordionSection
          title={`${industryTitle} Growth FAQs`}
          subtitle="Specific answers on technical implementation, compliance handling, and attribution."
          faqs={industry.faqs}
        />
      )}

      {/* 14. INDUSTRY SWITCHER STRIP */}
      {allIndustries.length > 1 && (
        <section className="py-12 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                Explore Other Industry Verticals
              </span>
              <a
                href="/industries/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/industries/');
                }}
                className="text-xs text-[#60A5FA] hover:underline cursor-pointer"
              >
                All Industries →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {allIndustries.map((ind) => (
                <a
                  key={ind.id}
                  href={`/industries/${ind.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/industries/${ind.slug}/`);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer block no-underline ${
                    ind.slug === industry.slug
                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white'
                      : 'bg-[#0D1424] border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#334155]'
                  }`}
                >
                  <div className="font-bold text-sm truncate">{ind.title}</div>
                  <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                    {ind.industryCode}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 15. CONVERSION CTA */}
      <ConversionCTASection
        title={`Scale Your ${industryTitle} Pipeline With Confidence`}
        subtitle="Book a 30-minute diagnostic session with our sector leads to audit your acquisition economics and search share."
        onOpenBooking={onOpenBooking}
        prefill={{ industry: industryTitle }}
      />
    </div>
  );
};

