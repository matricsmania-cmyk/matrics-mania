'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConversionCTASection } from '../components/sections';
import { CaseStudy } from '../models';
import {
  BarChart3,
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface CaseStudyIndexTemplateProps {
  caseStudies?: CaseStudy[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const CaseStudyIndexTemplate: React.FC<CaseStudyIndexTemplateProps> = ({
  caseStudies: propCaseStudies,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allCaseStudies = propCaseStudies || provider.getAllCaseStudies();

  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const industries = useMemo(() => {
    const set = new Set<string>();
    allCaseStudies.forEach((cs) => {
      if (cs.industry) set.add(cs.industry);
    });
    return ['All', ...Array.from(set)];
  }, [allCaseStudies]);

  const filteredCaseStudies = useMemo(() => {
    if (selectedIndustry === 'All') return allCaseStudies;
    return allCaseStudies.filter((cs) => cs.industry === selectedIndustry);
  }, [allCaseStudies, selectedIndustry]);

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="case-study"
        canonicalUrl="https://matricsmania.com/case-studies/"
        title="Enterprise Growth Case Studies | Verified Revenue Impact | MatricsMania"
        description="In-depth B2B SaaS, D2C, and enterprise growth case studies detailing attribution models, crawl telemetry, and high-ROAS customer acquisition."
      />

      {/* Hero */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase mx-auto">
            <BarChart3 className="w-3.5 h-3.5 text-[#3B82F6]" />
            Empirical Telemetry &amp; Proof
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Case Studies &amp; Performance Tear-downs
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Detailed architectures, crawl engineering overhauls, and quantitative revenue outcomes for enterprise SaaS, D2C, and real estate brands.
          </p>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4" role="toolbar" aria-label="Filter case studies by industry">
            {industries.map((ind) => (
              <button
                key={ind}
                type="button"
                aria-pressed={selectedIndustry === ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  selectedIndustry === ind
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Cards Grid */}
      <section className="py-16 md:py-20 bg-[#050811] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCaseStudies.map((cs, idx) => (
              <ScrollReveal key={cs.id} delay={idx * 0.1}>
                <a
                  href={`/case-studies/${cs.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/case-studies/${cs.slug}/`);
                  }}
                  className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all cursor-pointer flex flex-col justify-between h-full group block text-left"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#1E293B] text-[#94A3B8]">
                        {cs.clientIndustry || cs.industry}
                      </span>
                      <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                        {cs.caseStudyCode}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">
                        Client: {cs.clientName}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug mt-1">
                        {cs.heroHeadline || cs.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                      {cs.executiveSummary || cs.excerpt}
                    </p>

                    {/* Results Box */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {cs.results.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B]"
                        >
                          <div className="text-lg sm:text-xl font-mono font-extrabold text-[#60A5FA]">
                            {res.metric}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#1E293B] pt-4 mt-6 flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                    <span>Read Technical Tear-down</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ConversionCTASection
        title="Ready to Achieve Similar Quantitative Results?"
        subtitle="Book a technical discovery session with our Principal Growth Architects to audit your metrics and growth bottlenecks."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'Case Studies Inquiry' }}
      />
    </div>
  );
};
