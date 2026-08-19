import React, { useState } from 'react';
import { PageType } from '../types';
import { SERVICES_PAGE_DATA, ServicePageData } from '../data/serviceTemplateData';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  Layers,
  FileCheck,
  Zap,
  HelpCircle,
  TrendingUp,
  Code,
  Globe,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onNavigateToServiceSlug,
  onOpenBooking,
}) => {
  const service: ServicePageData =
    SERVICES_PAGE_DATA[slug] || SERVICES_PAGE_DATA['technical-seo'];

  const [expandedWhatWeDo, setExpandedWhatWeDo] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleWhatWeDo = (idx: number) => {
    setExpandedWhatWeDo(expandedWhatWeDo === idx ? null : idx);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                {service.eyebrow}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                {service.h1}
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking({ service: service.name })}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2 active:scale-[0.98]"
                >
                  <span>Request a Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('snapshot');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 text-[#94A3B8] hover:text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  Explore Overview
                </button>
              </div>
            </ScrollReveal>

            {/* Right Visual Diagram */}
            <ScrollReveal delay={0.15} className="lg:col-span-5">
              <div className="relative bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
                {/* Header tag */}
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#60A5FA] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      {service.heroDiagram.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">CORE PIPELINE</span>
                </div>

                {/* Flow steps */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {service.heroDiagram.flow.map((step, idx) => (
                      <div
                        key={step}
                        className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-center"
                      >
                        <div className="text-[10px] font-mono text-[#64748B] mb-0.5">
                          0{idx + 1}
                        </div>
                        <div className="text-xs font-bold text-[#E2E8F0]">{step}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA]">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#2563EB]/15 to-[#8B5CF6]/15 border border-[#2563EB]/40 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#60A5FA] mb-0.5">
                      Target Outcome
                    </div>
                    <div className="text-base font-extrabold text-white">
                      {service.heroDiagram.outcome}
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#64748B] font-mono flex items-center justify-between border-t border-[#1E293B]">
                  <span>Status: Deterministic</span>
                  <span>Impact: Compounding</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SERVICE SNAPSHOT */}
      <section id="snapshot" className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="space-y-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            SERVICE SNAPSHOT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* What it solves */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#94A3B8]">
                What it solves
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {service.snapshot.whatItSolves}
              </p>
            </div>

            {/* What we improve */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#94A3B8]">
                What we improve
              </div>
              <div className="flex flex-wrap gap-2">
                {service.snapshot.whatWeImprove.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#070B14] border border-[#1E293B] text-xs font-medium text-[#CBD5E1]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Best suited for */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#94A3B8]">
                Best suited for
              </div>
              <div className="flex flex-wrap gap-2">
                {service.snapshot.bestSuitedFor.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#070B14] border border-[#1E293B] text-xs font-medium text-[#60A5FA]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            THE PROBLEM
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {service.problem.headline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.problem.items.map((item, idx) => (
            <ScrollReveal
              key={item.number}
              delay={idx * 0.05}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-3 hover:border-[#2563EB]/40 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#60A5FA]">{item.number}</div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            WHAT WE DO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Service Architecture
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Modular, engineering-driven execution structured across core technical disciplines.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.whatWeDo.items.map((pillar, idx) => {
            const isExpanded = expandedWhatWeDo === idx;
            return (
              <ScrollReveal
                key={pillar.number}
                delay={idx * 0.04}
                className={`bg-[#0D1424] border rounded-2xl p-6 transition-all ${
                  isExpanded
                    ? 'border-[#2563EB]/70 shadow-lg shadow-blue-500/5'
                    : 'border-[#1E293B] hover:border-[#1E293B]/80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#60A5FA]">
                      {pillar.number}
                    </span>
                    <button
                      onClick={() => toggleWhatWeDo(idx)}
                      className="p-1 rounded text-[#94A3B8] hover:text-white cursor-pointer"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#60A5FA]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3
                    onClick={() => toggleWhatWeDo(idx)}
                    className="text-base font-bold text-white tracking-wide cursor-pointer hover:text-[#60A5FA] transition-colors"
                  >
                    {pillar.title}
                  </h3>

                  {pillar.description && (
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {pillar.description}
                    </p>
                  )}

                  {/* Expandable bullet points */}
                  <div className="pt-2 border-t border-[#1E293B] space-y-2">
                    <ul className="space-y-1.5">
                      {pillar.points.map((pt) => (
                        <li
                          key={pt}
                          className="text-xs font-medium text-[#CBD5E1] flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            HOW WE WORK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Systematic Delivery Process
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#60A5FA] bg-[#0D1424] border border-[#1E293B] px-4 py-2 rounded-xl inline-block">
            {service.howWeWork.summaryFlow}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {service.howWeWork.steps.map((step, idx) => (
            <ScrollReveal
              key={step.number}
              delay={idx * 0.05}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#60A5FA]">{step.number}</div>
                <h3 className="text-sm font-bold text-white tracking-wide">{step.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{step.description}</p>
              </div>
              {idx < service.howWeWork.steps.length - 1 && (
                <div className="hidden lg:flex justify-end pt-2 text-[#64748B]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            WHAT YOU GET
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Tangible Deliverables & Engineering Artifacts
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Clear, unambiguous deliverables so your team and leadership know exactly what is delivered.
          </p>
        </ScrollReveal>

        {/* Engagement steps flow */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
            YOUR ENGAGEMENT MAY INCLUDE
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {service.whatYouGet.engagementSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-3 py-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-medium text-white">
                  {step}
                </span>
                {idx < service.whatYouGet.engagementSteps.length - 1 && (
                  <span className="text-[#64748B] text-xs font-mono">↓</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>

        {/* Compact Deliverables Table */}
        <ScrollReveal className="overflow-x-auto rounded-2xl border border-[#1E293B] bg-[#0D1424]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#070B14] text-[11px] font-mono uppercase text-[#94A3B8]">
                <th className="py-4 px-6 font-bold w-1/4">Area</th>
                <th className="py-4 px-6 font-bold w-1/3">Example Deliverable</th>
                <th className="py-4 px-6 font-bold">Scope & Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/70">
              {service.whatYouGet.deliverables.map((item) => (
                <tr key={item.area} className="hover:bg-[#131D33]/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#60A5FA] font-mono text-xs">
                    {item.area}
                  </td>
                  <td className="py-4 px-6 font-semibold text-white">
                    {item.deliverable}
                  </td>
                  <td className="py-4 px-6 text-[#94A3B8] text-xs leading-relaxed">
                    {item.details || 'Technical diagnostic and engineering documentation.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            WHY THIS MATTERS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Causal Growth Mechanism
          </h2>
          <p className="text-sm text-[#94A3B8]">
            We do not sell vanity hype. Here is the causal chain from technical remediation to business revenue:
          </p>
        </ScrollReveal>

        {/* Chain steps */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
            TECHNICAL TO COMMERCIAL CAUSALITY
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {service.whyThisMatters.chainSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <div
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    idx === 0
                      ? 'bg-[#2563EB] text-white'
                      : idx === service.whyThisMatters.chainSteps.length - 1
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white font-bold'
                      : 'bg-[#070B14] border border-[#1E293B] text-[#CBD5E1]'
                  }`}
                >
                  {step}
                </div>
                {idx < service.whyThisMatters.chainSteps.length - 1 && (
                  <span className="text-[#64748B] font-mono text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed pt-2 border-t border-[#1E293B]">
            {service.whyThisMatters.explanation}
          </p>
        </ScrollReveal>
      </section>

      {/* PROOF / EVIDENCE */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            PROOF / EVIDENCE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {service.proof.badge}: {service.proof.headline}
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {service.proof.description}
          </p>
        </ScrollReveal>

        <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Key metrics if available */}
          {service.proof.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.proof.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] text-center"
                >
                  <div className="text-2xl font-extrabold text-[#60A5FA]">{m.value}</div>
                  <div className="text-xs text-[#94A3B8] mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {service.proof.deliverableHighlights && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold text-[#CBD5E1] uppercase">
                Verifiable Implementation Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.proof.deliverableHighlights.map((hl) => (
                  <div
                    key={hl}
                    className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs text-[#CBD5E1] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Link */}
          <div className="pt-4 flex items-center justify-between border-t border-[#1E293B]">
            <span className="text-xs text-[#94A3B8]">
              Want to see our raw audit templates and verification protocols?
            </span>
            <button
              onClick={() => onNavigate('case-studies')}
              className="text-xs font-bold text-[#60A5FA] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            RELATED SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            You May Also Need
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.relatedServices.map((rel, idx) => (
            <ScrollReveal
              key={rel.slug}
              delay={idx * 0.04}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-3 hover:border-[#2563EB]/40 transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{rel.description}</p>
              </div>

              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-bold text-[#60A5FA]">
                <button
                  onClick={() => {
                    if (onNavigateToServiceSlug && SERVICES_PAGE_DATA[rel.slug]) {
                      onNavigateToServiceSlug(rel.slug);
                    } else {
                      onOpenBooking({ service: rel.title });
                    }
                  }}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
        Have questions about our implementation process, team bandwidth, or technical deliverables? Review the answers below to understand how we deploy, measure, and scale our high-impact growth frameworks for your business.
      </p>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Detailed answers regarding our {service.name} methodology and deliverables.
          </p>
        </ScrollReveal>

        <div className="space-y-3 max-w-4xl">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="bg-[#0D1424] border border-[#1E293B] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#60A5FA] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#60A5FA]' : 'text-[#94A3B8]'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {service.finalCta.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {service.finalCta.subheadline}
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onOpenBooking({ service: service.name })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-2.5 active:scale-[0.98]"
            >
              <span>{service.finalCta.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
