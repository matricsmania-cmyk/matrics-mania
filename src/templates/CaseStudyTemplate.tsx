import React, { useState } from 'react';
import { getCaseStudyBySlug, getAllCaseStudies } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Building2,
  MapPin,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Search,
  Code2,
  ChevronRight,
  Database,
  Globe2,
  Share2,
  Check,
} from 'lucide-react';

interface CaseStudyTemplateProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  const caseStudy = getCaseStudyBySlug(slug) || getAllCaseStudies()[0];
  const allCaseStudies = getAllCaseStudies();
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleShare = () => {
    const url = `https://matricsmania.com/case-studies/${caseStudy.slug}/`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      if (onShowToast) {
        onShowToast('Link Copied!', 'Case study link copied to clipboard.', 'info');
      }
    }
  };

  const canonicalUrl = `https://matricsmania.com/case-studies/${caseStudy.slug}/`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.headline,
    description: caseStudy.subheadline,
    about: {
      '@type': 'Organization',
      name: caseStudy.clientName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MatricsMania',
      url: 'https://matricsmania.com/',
    },
    url: canonicalUrl,
  };

  return (
    <div className="bg-[#050811] text-[#E2E8F0] min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        title={caseStudy.meta.title}
        description={caseStudy.meta.description}
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* Sticky Breadcrumb Sub-Header */}
      <div className="sticky top-16 z-30 bg-[#070B14]/90 backdrop-blur-md border-b border-[#1E293B] py-3 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#94A3B8] truncate">
            <button
              onClick={() => onNavigate('/case-studies/')}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </button>
            <ChevronRight className="w-3 h-3 text-[#64748B]" />
            <span className="text-[#60A5FA] truncate">{caseStudy.clientName}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0D1424] border border-[#1E293B] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white transition-colors"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[#10B981]">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Case Study</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 01. HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <ScrollReveal className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
                {caseStudy.clientIndustry}
              </span>
              <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {caseStudy.location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {caseStudy.headline}
            </h1>

            <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed">
              {caseStudy.subheadline}
            </p>
          </ScrollReveal>

          {/* 02. HERO METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {caseStudy.heroMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2 shadow-xl"
              >
                <div className="text-3xl font-bold text-[#60A5FA] font-mono">{metric.value}</div>
                <div className="text-xs font-bold text-white">{metric.label}</div>
                <div className="text-[11px] text-[#94A3B8] font-mono">{metric.baseline}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. EXECUTIVE SNAPSHOT */}
      <section className="py-16 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <div className="text-xs font-mono text-rose-400 font-bold uppercase">// The Root Problem</div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {caseStudy.snapshot.problemStatement}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <div className="text-xs font-mono text-[#60A5FA] font-bold uppercase">// Strategic Solution</div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {caseStudy.snapshot.strategicSolution}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <div className="text-xs font-mono text-[#10B981] font-bold uppercase">// Commercial Outcome</div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {caseStudy.snapshot.commercialOutcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. EXECUTION PHASES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Sequential Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Phased Systems Implementation
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {caseStudy.executionPhases.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#60A5FA] px-2.5 py-1 rounded bg-[#131D33] border border-[#1E293B]">
                      PHASE {phase.phaseNumber}
                    </span>
                    <h3 className="text-lg font-bold text-white">{phase.phaseName}</h3>
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8]">{phase.duration}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#94A3B8] uppercase font-bold">Actions Taken:</div>
                    <ul className="space-y-2">
                      {phase.actions.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#10B981] uppercase font-bold">Key Deliverables:</div>
                    <div className="space-y-2">
                      {phase.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#E2E8F0] flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. TECHNICAL ARTIFACTS & FLOW */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Technical Proof & Code
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Architecture & System Blueprint
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
              <div className="text-xs font-mono text-[#60A5FA] font-bold">
                {caseStudy.technicalArtifacts.architectureDiagramTitle}
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {caseStudy.technicalArtifacts.architectureDiagramFlow.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#E2E8F0] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#64748B]">0{sIdx + 1}</span>
                      <span>{step}</span>
                    </div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
              <div className="text-xs font-mono text-[#10B981] font-bold">
                JSON-LD Knowledge Graph Entity Snippet
              </div>
              <pre className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#94A3B8] overflow-x-auto">
                <code>{caseStudy.technicalArtifacts.schemaSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 06. TESTIMONIAL & CTA */}
      <section className="py-20 text-center bg-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-left space-y-4">
            <p className="text-base sm:text-lg italic text-[#CBD5E1] leading-relaxed">
              "{caseStudy.clientTestimonial.quote}"
            </p>
            <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">
                  {caseStudy.clientTestimonial.authorName}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  {caseStudy.clientTestimonial.authorRole}, {caseStudy.clientTestimonial.company}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                VERIFIED OUTCOME
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to engineer predictable growth for your company?
            </h3>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/contact/')}
                className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
              >
                Schedule an Architecture Session
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
