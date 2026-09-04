'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  BenchmarkMetricsSection,
  ConversionCTASection,
} from '../components/sections';
import { InternalLinkingGraph } from '../components/InternalLinkingGraph';
import { GrowthCalculator } from '../components/GrowthCalculator';
import { getCaseStudyContextualLinks } from '../utils/internalLinking';
import { CaseStudy } from '../models';
import { NotFoundState } from '../components/ErrorStates';
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
  Share2,
  Check,
  Quote,
  Clock,
  Layers,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface CaseStudyTemplateProps {
  caseStudy?: CaseStudy;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({
  caseStudy: propCaseStudy,
  slug,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  onShowToast,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const caseStudy =
    propCaseStudy ||
    (slug ? provider.getCaseStudyBySlug(slug) : null);

  const allCaseStudies = provider.getAllCaseStudies();
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!caseStudy) {
    return (
      <NotFoundState
        attemptedPath={slug ? `/case-studies/${slug}/` : '/case-studies/'}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

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

  const canonicalUrl = caseStudy.seo?.canonicalUrl || `https://matricsmania.com/case-studies/${caseStudy.slug}/`;
  const headline = caseStudy.heroHeadline || caseStudy.title;
  const subheadline = caseStudy.executiveSummary || caseStudy.excerpt;

  const contextualLinks = useMemo(
    () => getCaseStudyContextualLinks(caseStudy, provider),
    [caseStudy, provider]
  );

  const otherCaseStudies = contextualLinks.relatedCaseStudies.length > 0
    ? contextualLinks.relatedCaseStudies.slice(0, 2)
    : allCaseStudies.filter((cs) => cs.slug !== caseStudy.slug).slice(0, 2).map((cs) => ({
        id: cs.id,
        slug: cs.slug,
        title: `${cs.clientName}: ${cs.heroHeadline || cs.title}`,
        url: `/case-studies/${cs.slug}/`,
        excerpt: cs.executiveSummary || cs.excerpt,
        category: cs.clientIndustry || cs.industry,
      }));

  const clientAuthorName =
    typeof caseStudy.clientAuthor === 'string'
      ? caseStudy.clientAuthor
      : caseStudy.clientAuthor?.name || 'Executive Stakeholder';

  const clientAuthorRole =
    typeof caseStudy.clientAuthor === 'string'
      ? 'Executive'
      : caseStudy.clientAuthor?.role || 'Leadership';

  const clientAuthorAvatar =
    typeof caseStudy.clientAuthor === 'string'
      ? undefined
      : typeof caseStudy.clientAuthor?.avatar === 'string'
      ? caseStudy.clientAuthor.avatar
      : caseStudy.clientAuthor?.avatar?.url;

  return (
    <div className="bg-[#050811] text-[#E2E8F0] min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={caseStudy.seo}
        entity={caseStudy}
        pageType="case-study"
      />

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#1E293B] bg-[#070B14]/80 backdrop-blur-md sticky top-16 z-20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/case-studies/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies Hub</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 text-xs font-mono text-[#CBD5E1] transition-all cursor-pointer"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Share Case Study</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30 uppercase font-semibold">
                {caseStudy.clientIndustry || caseStudy.industry}
              </span>
              <span className="text-xs font-mono text-[#94A3B8] bg-[#0D1424] px-3 py-1 rounded-full border border-[#1E293B]">
                ID: {caseStudy.caseStudyCode || 'CS-ENG'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#64748B] uppercase">
                Client: {caseStudy.clientName}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              {subheadline}
            </p>
          </div>

          {/* Core Results Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {caseStudy.results?.map((res, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#60A5FA]">
                  {res.metric}
                </div>
                <div className="text-xs font-semibold text-white">{res.label}</div>
                {res.timeframe && (
                  <div className="text-[11px] text-[#64748B]">Timeframe: {res.timeframe}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative Breakdown */}
      <section className="py-16 md:py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  01. The Challenge &amp; Initial State
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Baseline Vulnerabilities
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {caseStudy.challengeSummary || caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  02. Engineered Architecture &amp; Solution
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Technical Implementation
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {caseStudy.solutionArchitecture || caseStudy.solution}
                </p>
              </div>

              {/* Milestones / Phased Rollout */}
              {caseStudy.milestones && caseStudy.milestones.length > 0 && (
                <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    03. Phased Execution Roadmap
                  </div>
                  <div className="space-y-4 pt-2">
                    {caseStudy.milestones.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{m.phase}: {m.title}</span>
                          <span className="font-mono text-[#60A5FA]">{m.timeline}</span>
                        </div>
                        <p className="text-xs text-[#94A3B8]">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Quote / Testimonial */}
              {caseStudy.testimonialQuote && (
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D1424] to-[#0A1020] border border-[#2563EB]/40 space-y-6 relative overflow-hidden">
                  <Quote className="w-12 h-12 text-[#2563EB]/20 absolute top-4 right-4 pointer-events-none" />
                  <p className="text-base sm:text-lg text-[#E2E8F0] leading-relaxed italic">
                    "{caseStudy.testimonialQuote}"
                  </p>
                  <div className="border-t border-[#1E293B] pt-4 flex items-center gap-4">
                    {clientAuthorAvatar && (
                      <OptimizedImage
                        src={clientAuthorAvatar}
                        alt={clientAuthorName}
                        className="w-12 h-12 rounded-full object-cover border border-[#2563EB]/40"
                      />
                    )}
                    <div>
                      <div className="text-sm font-bold text-white">
                        {clientAuthorName}
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        {clientAuthorRole}, {caseStudy.clientName}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-wider">
                    Deployment Metadata
                  </span>
                  <h3 className="text-base font-bold text-white">Project Specifications</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#1E293B]">
                    <span className="text-[#64748B]">Client:</span>
                    <span className="font-semibold text-white">{caseStudy.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#1E293B]">
                    <span className="text-[#64748B]">Vertical:</span>
                    <span className="font-semibold text-[#60A5FA]">{caseStudy.clientIndustry || caseStudy.industry}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#1E293B]">
                    <span className="text-[#64748B]">Engagement Code:</span>
                    <span className="font-semibold text-white font-mono">{caseStudy.caseStudyCode}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                {caseStudy.techStackDeployed && caseStudy.techStackDeployed.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                    <div className="text-[10px] font-mono text-[#64748B] uppercase">
                      Technology Stack Deployed
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.techStackDeployed.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#070B14] border border-[#1E293B] text-[11px] font-mono text-[#94A3B8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    onOpenBooking({
                      caseStudy: caseStudy.clientName,
                      interest: `Inquiry on ${headline}`,
                    })
                  }
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 mt-4"
                >
                  <span>Inquire for Similar Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Knowledge Graph (Services, Industries, Related Insights) */}
      <InternalLinkingGraph
        title={`${caseStudy.clientName} Knowledge Taxonomy`}
        subtitle="Explore core engineering services, vertical architectures, and technical insights associated with this implementation."
        badge="Engagement Taxonomy"
        services={contextualLinks.services}
        industries={contextualLinks.industries}
        insights={contextualLinks.relatedInsights}
        caseStudies={contextualLinks.relatedCaseStudies}
        onNavigate={onNavigate}
      />

      {/* Related Other Case Studies */}
      {otherCaseStudies.length > 0 && (
        <section className="py-16 bg-[#070B14] border-b border-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Other Case Studies
              </h2>
              <a
                href="/case-studies/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/case-studies/');
                }}
                className="text-xs font-mono text-[#60A5FA] hover:underline cursor-pointer"
              >
                View All Case Studies →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherCaseStudies.map((cs) => (
                <a
                  key={cs.id}
                  href={`/case-studies/${cs.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/case-studies/${cs.slug}/`);
                  }}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer flex flex-col justify-between h-full group no-underline block"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#60A5FA] uppercase">{cs.category}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2">{cs.excerpt}</p>
                  </div>
                  <div className="border-t border-[#1E293B] pt-3 mt-4 flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                    <span>Read Tear-down</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Growth Modeling based on Case Study Evidence */}
      <section className="py-16 md:py-24 bg-[#070B14] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GrowthCalculator
            title={`Model Your Pipeline Economics (${caseStudy.clientName} Benchmark)`}
            subtitle="Explore how applying similar conversion rate engineering, Core Web Vitals optimization, and attribution modeling scales your qualified revenue."
            onOpenBooking={onOpenBooking}
          />
        </div>
      </section>

      {/* CTA */}
      <ConversionCTASection
        title={`Achieve Similar Results for Your Brand`}
        subtitle="Book a 30-minute diagnostic session to audit your acquisition economics and search share."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: `Case Study follow up: ${caseStudy.clientName}` }}
      />
    </div>
  );
};
