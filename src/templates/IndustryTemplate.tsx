'use client';

import React, { useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  BenchmarkMetricsSection,
  ChallengesGridSection,
  ConversionCTASection,
} from '../components/sections';
import { Industry } from '../models';
import { NotFoundState } from '../components/ErrorStates';
import {
  CheckCircle2,
  Target,
  AlertTriangle,
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
    (slug ? provider.getIndustryBySlug(slug) : null);

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

  const industryTitle = industry.title;
  const metaDescription = industry.seo?.metaDescription || industry.marketSummary || industry.excerpt;

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={industry.seo}
        entity={industry}
        pageType="industry"
        faqs={industry.faqs}
      />

      {/* 1. HERO */}
      <PageHeroSection
        eyebrow={`// ${industry.industryCode || 'Industry Practice'}`}
        title={industryTitle}
        tagline={industry.tagline}
        subtitle={metaDescription}
        primaryCtaLabel="Book Industry Strategy Session"
        onPrimaryCta={() =>
          onOpenBooking?.({ industry: industryTitle, interest: `${industryTitle} Architecture` })
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

      {/* 2. ACQUISITION MECHANICS */}
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

            {/* Funnel Stages & Engineered Fixes */}
            {industry.acquisitionMechanics.funnelStages && industry.acquisitionMechanics.funnelStages.length > 0 && (
              <div className="space-y-6">
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

      {/* 3. QUANTITATIVE BENCHMARKS */}
      {industry.benchmarks && industry.benchmarks.length > 0 && (
        <BenchmarkMetricsSection
          title={`${industryTitle} Quantitative Benchmarks`}
          subtitle="Observed performance shifts and conversion lift across client vertical deployments."
          disclaimerText=""
          metrics={industry.benchmarks.map((b) => ({
            label: b.metric,
            value: b.matricsManiaEngineered,
            sourceBenchmark: `Industry Average: ${b.industryAverage}`,
          }))}
        />
      )}

      {/* 4. STRUCTURAL INDUSTRY CHALLENGES / BOTTLENECKS */}
      {industry.challenges && industry.challenges.length > 0 && (
        <ChallengesGridSection
          title={`${industryTitle} Bottlenecks & Pitfalls`}
          subtitle="Common failure modes in this vertical that waste marketing capital."
          challenges={industry.challenges}
        />
      )}

      {/* 5. STRATEGIC PILLARS */}
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

      {/* 6. INDUSTRY SWITCHER STRIP */}
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
                  onNavigate?.('/industries/');
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
                    onNavigate?.(`/industries/${ind.slug}/`);
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

      {/* 7. CONVERSION CTA */}
      <ConversionCTASection
        title={`Scale Your ${industryTitle} Pipeline With Confidence`}
        subtitle="Book a 30-minute diagnostic session with our sector leads to audit your acquisition economics and search share."
        onOpenBooking={onOpenBooking}
        prefill={{ industry: industryTitle }}
      />
    </div>
  );
};

