'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { Service, ServicePillar, ServiceDiagnosisSymptom } from '../models';
import { NotFoundState } from '../components/ErrorStates';
import { InternalLinkingGraph } from '../components/InternalLinkingGraph';
import { GrowthCalculator } from '../components/GrowthCalculator';
import { getServiceContextualLinks } from '../utils/internalLinking';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  BookOpen,
  Code2,
  FileCheck,
  ShieldCheck,
  ArrowUpRight,
  Database,
  ExternalLink,
  Clock,
  Terminal,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface ServiceTemplateProps {
  service?: Service;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  service: propService,
  slug,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();

  // Resolve service object dynamically
  const service = useMemo(() => {
    if (propService) return propService;
    if (slug) {
      return provider.getServiceBySlug(slug) || null;
    }
    const all = provider.getAllServices();
    return all[0] || null;
  }, [propService, slug, provider]);

  const [activePillarTab, setActivePillarTab] = useState<number>(0);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('all');

  if (!service) {
    return (
      <NotFoundState
        attemptedPath={slug ? `/services/${slug}/` : '/services/'}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const canonicalUrl = service.seo?.canonicalUrl || `https://matricsmania.com/services/${service.slug}/`;
  const serviceTitle = service.title;
  const metaDescription = service.seo?.metaDescription || service.shortDescription || service.excerpt;

  // Four Pillars if explicitly provided in CMS / ACF data
  const fourPillars: ServicePillar[] = useMemo(() => {
    return service.fourPillars || [];
  }, [service.fourPillars]);

  // Diagnosis Symptoms if explicitly provided in CMS / ACF data
  const diagnosisSymptoms: ServiceDiagnosisSymptom[] = useMemo(() => {
    return service.diagnosis?.symptoms || [];
  }, [service.diagnosis]);

  // Unique tool categories
  const toolCategories = useMemo(() => {
    const set = new Set<string>();
    service.toolchain?.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [service.toolchain]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    if (!service.toolchain) return [];
    if (selectedToolCategory === 'all') return service.toolchain;
    return service.toolchain.filter((t) => t.category === selectedToolCategory);
  }, [service.toolchain, selectedToolCategory]);

  // Contextual Interconnected Relationships (Industries, Insights, Case Studies, Related Services)
  const contextualLinks = useMemo(
    () => getServiceContextualLinks(service, provider),
    [service, provider]
  );

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={service.seo}
        entity={service}
        pageType="service"
        faqs={service.faqs}
      />

      {/* =========================================================================
          1. BREADCRUMB
         ========================================================================= */}
      <div className="border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#64748B] flex-wrap">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('/services/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <span>/</span>
            <span className="text-[#94A3B8] truncate">{service.category}</span>
            <span>/</span>
            <span className="text-[#60A5FA] font-semibold truncate">{serviceTitle}</span>
          </nav>
        </div>
      </div>

      {/* =========================================================================
          2. HERO
         ========================================================================= */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0B1120] to-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/12 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <ScrollReveal className="max-w-4xl space-y-5">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-bold text-[#60A5FA] tracking-wider uppercase">
                {service.serviceCode || 'SRV-ARCH'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono text-[#94A3B8]">
                // {service.category}
              </span>
              {service.priceStartingMonthly && (
                <span className="px-2.5 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono text-[#CBD5E1]">
                  Starting at {service.priceStartingMonthly}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {serviceTitle}
            </h1>

            {/* Tagline & Subtitle */}
            {service.tagline && (
              <p className="text-base sm:text-xl font-mono text-[#60A5FA] font-medium">
                {service.tagline}
              </p>
            )}

            <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              {service.shortDescription || service.excerpt}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onOpenBooking({ service: serviceTitle, serviceCode: service.serviceCode })}
                className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Diagnostic Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('deliverables-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-xs sm:text-sm font-semibold text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
              >
                Explore Scope &amp; Deliverables
              </button>
            </div>
          </ScrollReveal>

          {/* Metric Benchmark Chips in Hero */}
          {service.metrics && service.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-[#1E293B]/70">
              {service.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0D1424]/80 border border-[#1E293B] space-y-1"
                >
                  <div className="text-xs font-mono text-[#64748B] flex items-center justify-between">
                    <span>BENCHMARK 0{idx + 1}</span>
                    {m.timeframe && <span className="text-[10px] text-[#60A5FA]">{m.timeframe}</span>}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#94A3B8] truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          2. EDITORIAL CONTENT (Live WordPress Payload)
         ========================================================================= */}
      {service.content && service.content.trim().length > 0 && (
        <section className="py-12 md:py-16 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                Editorial Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {serviceTitle} Overview
              </h2>
            </ScrollReveal>
            <div
              className="prose prose-invert max-w-4xl text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>
        </section>
      )}

      {/* =========================================================================
          3. SERVICE POSITIONING
         ========================================================================= */}
      {(service.positioningStatement ||
        service.whyTraditionalFails ||
        service.idealClientProfile ||
        service.slaCommitment ||
        (service.recommendedFor && service.recommendedFor.length > 0)) && (
        <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                Strategic Positioning &amp; Engineering Paradigm
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Strategic Service Positioning
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                {service.positioningStatement && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#3B82F6]" />
                      The Architectural Paradigm
                    </h3>
                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {service.positioningStatement}
                    </p>
                  </div>
                )}

                {/* Why Traditional Execution Fails */}
                {service.whyTraditionalFails && (
                  <div className="p-5 rounded-2xl bg-[#0A0F1D] border border-rose-900/30 space-y-2">
                    <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                      Why Traditional Execution Fails
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {service.whyTraditionalFails}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-4">
                {(service.idealClientProfile || (service.recommendedFor && service.recommendedFor.length > 0)) && (
                  <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                      Ideal Client Profile (ICP)
                    </div>
                    {service.idealClientProfile && (
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {service.idealClientProfile}
                      </p>
                    )}

                    {service.recommendedFor && service.recommendedFor.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                        <div className="text-[11px] font-mono text-[#64748B] uppercase">Recommended For:</div>
                        <ul className="space-y-1.5">
                          {service.recommendedFor.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-[#E2E8F0]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {service.slaCommitment && (
                  <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                    <div className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
                      SLA &amp; Governance Commitment
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {service.slaCommitment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          4. DIAGNOSIS / PROBLEM DEFINITION
         ========================================================================= */}
      {service.diagnosis && (diagnosisSymptoms.length > 0 || service.diagnosis.headline || service.diagnosis.summary) && (
        <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Diagnostics &amp; System Failure Modes
              </div>
              {service.diagnosis.headline && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {service.diagnosis.headline}
                </h2>
              )}
              {service.diagnosis.summary && (
                <p className="text-sm sm:text-base text-[#94A3B8]">
                  {service.diagnosis.summary}
                </p>
              )}
            </ScrollReveal>

            {diagnosisSymptoms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diagnosisSymptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {symptom.code || `BOTTLENECK 0${idx + 1}`}
                        </span>
                        {symptom.impact && (
                          <span className="text-[11px] font-mono text-rose-400">
                            {symptom.impact}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {symptom.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {symptom.description}
                      </p>
                    </div>

                    {symptom.remediation && (
                      <div className="pt-3 border-t border-[#1E293B] space-y-1">
                        <div className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-wider">
                          Architectural Remediation
                        </div>
                        <p className="text-xs text-[#CBD5E1] font-mono">
                          {symptom.remediation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          5. METHODOLOGY
         ========================================================================= */}
      {service.processPhases && service.processPhases.length > 0 && (
        <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                Phased Execution Protocol
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Engineered Deployment Cadence
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                How we transition your architecture from initial telemetry audit into autonomous growth velocity.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.processPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                        PHASE {phase.step || `0${idx + 1}`}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        {phase.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {phase.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {phase.keyOutputs && phase.keyOutputs.length > 0 && (
                    <div className="pt-4 border-t border-[#1E293B] space-y-2">
                      <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                        Key Deliverables
                      </div>
                      <ul className="space-y-1.5">
                        {phase.keyOutputs.map((out, oIdx) => (
                          <li key={oIdx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. FOUR-PILLAR FRAMEWORK
         ========================================================================= */}
      {fourPillars.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                Four-Pillar Framework
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                The Four Architectural Pillars of {serviceTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Each capability module is engineered to operate in synchrony, eliminating single points of failure across your acquisition stack.
              </p>
            </ScrollReveal>

            {/* Interactive 4-Pillar Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fourPillars.map((pillar, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePillarTab(idx)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                    activePillarTab === idx
                      ? 'bg-[#0D1424] border-[#2563EB] shadow-lg shadow-[#2563EB]/15'
                      : 'bg-[#0A0F1D] border-[#1E293B] text-[#94A3B8] hover:border-[#334155]'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-[#60A5FA]">
                    PILLAR {pillar.pillarNumber || `0${idx + 1}`}
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {pillar.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Pillar Deep Dive Card */}
            {fourPillars[activePillarTab] && (
              <div className="rounded-2xl bg-[#0D1424] border border-[#1E293B] p-6 sm:p-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
                  <div>
                    <div className="text-xs font-mono text-[#60A5FA] font-bold">
                      ARCHITECTURE MODULE {fourPillars[activePillarTab].pillarNumber}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                      {fourPillars[activePillarTab].title}
                    </h3>
                    {fourPillars[activePillarTab].subtitle && (
                      <p className="text-xs font-mono text-[#94A3B8] mt-1">
                        {fourPillars[activePillarTab].subtitle}
                      </p>
                    )}
                  </div>

                  {fourPillars[activePillarTab].outcome && (
                    <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] max-w-sm">
                      <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                        Target Outcome
                      </div>
                      <div className="text-xs text-[#CBD5E1] mt-0.5">
                        {fourPillars[activePillarTab].outcome}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  {fourPillars[activePillarTab].description}
                </p>

                {fourPillars[activePillarTab].capabilities && (
                  <div className="space-y-3 pt-4 border-t border-[#1E293B]">
                    <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
                      Core Technical Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {fourPillars[activePillarTab].capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center gap-3 text-xs text-[#E2E8F0]"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          7. DELIVERABLES
         ========================================================================= */}
      {((service.deliverableList && service.deliverableList.length > 0) ||
        (service.deliverablesSummary && service.deliverablesSummary.length > 0)) && (
        <section id="deliverables-section" className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                Verifiable Deliverables &amp; Code Specifications
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Tangible Scope Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Every deliverable is verified with production code pull requests, live data pipelines, and telemetry dashboards.
              </p>
            </ScrollReveal>

            {service.deliverableList && service.deliverableList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.deliverableList.map((del, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20 uppercase">
                          {del.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#64748B]">
                          {del.cadence}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {del.title}
                      </h3>
                    </div>

                    {del.specifications && del.specifications.length > 0 && (
                      <div className="pt-3 border-t border-[#1E293B] space-y-2">
                        <div className="text-[10px] font-mono text-[#64748B] uppercase">
                          Technical Specifications:
                        </div>
                        <ul className="space-y-1.5">
                          {del.specifications.map((spec, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverablesSummary.map((sum, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#CBD5E1]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{sum}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          8. MEASUREMENT / ECONOMICS
         ========================================================================= */}
      {service.economics &&
        (service.economics.modelTitle ||
          service.economics.description ||
          (service.economics.benchmarkMetrics && service.economics.benchmarkMetrics.length > 0) ||
          (service.economics.formulas && service.economics.formulas.length > 0)) && (
          <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Unit Economics &amp; Measurement Governance
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {service.economics?.modelTitle || `${serviceTitle} Economic &amp; CAC Impact Model`}
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8]">
                  {service.economics?.description ||
                    'Growth engineering shifts digital acquisition from variable expense into a compounding, capital-efficient enterprise asset.'}
                </p>
              </ScrollReveal>

              {/* Benchmark Metrics Strip */}
              {((service.economics?.benchmarkMetrics && service.economics.benchmarkMetrics.length > 0) ||
                (service.metrics && service.metrics.length > 0)) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(service.economics?.benchmarkMetrics || service.metrics || []).slice(0, 3).map((m, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                      <div className="text-xs font-mono text-[#64748B] flex items-center justify-between">
                        <span>METRIC 0{idx + 1}</span>
                        {m.timeframe && <span className="text-xs text-[#60A5FA] font-mono">{m.timeframe}</span>}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        {m.label}
                      </div>
                      {m.sourceBenchmark && (
                        <div className="text-[10px] font-mono text-[#64748B] pt-1">
                          Source: {m.sourceBenchmark}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Economic Formulas */}
              {service.economics?.formulas && service.economics.formulas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.economics.formulas.map((form, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                      <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase">
                        {form.name}
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>{form.formula}</code>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {form.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      {/* =========================================================================
          9. TOOLING
         ========================================================================= */}
      {service.toolchain && service.toolchain.length > 0 && (
        <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <ScrollReveal className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Telemetry &amp; Infrastructure Stack
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Integrated Software Toolchain
                </h2>
                <p className="text-sm text-[#94A3B8]">
                  Enterprise-grade instrumentation suites deployed to eliminate attribution ambiguity and latency.
                </p>
              </ScrollReveal>

              {/* Category Pills */}
              {toolCategories.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <button
                    onClick={() => setSelectedToolCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                      selectedToolCategory === 'all'
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                    }`}
                  >
                    All ({service.toolchain.length})
                  </button>
                  {toolCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedToolCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                        selectedToolCategory === cat
                          ? 'bg-[#2563EB] text-white font-bold'
                          : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20 uppercase">
                      {tool.category}
                    </span>
                    <Database className="w-3.5 h-3.5 text-[#64748B]" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {tool.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          10. CONTEXTUAL INTERCONNECTED RELATIONSHIPS
          (Related Industries, Related Insights, Relevant Case Studies, Related Services)
         ========================================================================= */}
      <InternalLinkingGraph
        title={`${serviceTitle} Knowledge Graph`}
        subtitle="Explore industry playbooks, technical research, verified case evidence, and adjacent engineering disciplines connected to this service."
        badge="Interconnected Systems"
        industries={contextualLinks.relatedIndustries}
        insights={contextualLinks.relatedInsights}
        caseStudies={contextualLinks.relevantCaseStudies}
        services={contextualLinks.relatedServices}
        onNavigate={onNavigate}
      />

      {/* =========================================================================
          11. INTERACTIVE SERVICE FINANCIAL MODELING & UNIT ECONOMICS
         ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GrowthCalculator
            title={`Simulate the Pipeline & Financial Impact of ${serviceTitle}`}
            subtitle={`Explore how optimizing organic indexation, qualified lead thresholds, and CAC efficiency via ${serviceTitle} shifts your annual pipeline velocity.`}
            onOpenBooking={onOpenBooking}
          />
        </div>
      </section>

      {/* =========================================================================
          13. FAQ
         ========================================================================= */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <ScrollReveal className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
                Technical FAQ
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Frequently Asked Technical Questions
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Precise operational guidelines, code ownership, and turnaround parameters for {serviceTitle}.
              </p>
            </ScrollReveal>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === (faq.id || String(idx));
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-[#0D1424] border-[#2563EB]/50'
                        : 'bg-[#0A0F1D] border-[#1E293B] hover:border-[#334155]'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : String(faq.id ?? idx))}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/60 pt-3">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          14. DIRECT CTA
         ========================================================================= */}
      <section className="py-20 bg-[#070B14] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#070B14] border border-[#1E293B] p-8 sm:p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded border border-[#2563EB]/20 uppercase">
                {service.serviceCode || 'GROWTH DEPLOYMENT'}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Deploy {serviceTitle} for Your Organization
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Schedule a diagnostic audit with our principal growth engineers. We will inspect your current telemetry, identify crawl bottlenecks, and formulate a verifiable phased execution roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={() =>
                  onOpenBooking({
                    service: serviceTitle,
                    serviceCode: service.serviceCode,
                  })
                }
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Technical Diagnostic Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/services/')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-sm font-semibold text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
              >
                Browse All Services
              </button>
            </div>

            <div className="pt-4 text-xs font-mono text-[#64748B] flex items-center justify-center gap-4 flex-wrap relative z-10">
              <span>✓ NDA Guaranteed</span>
              <span>✓ Direct Engineering Consultation</span>
              <span>✓ Initial Diagnostic Within 48 Hours</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
