'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from '../ScrollReveal';
import { BarChart3, ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import { CaseStudy } from '../../models';

export interface CaseStudyEvidenceSectionProps {
  caseStudies: CaseStudy[];
  title?: string;
  subtitle?: string;
  onNavigate?: (path: string) => void;
}

export const CaseStudyEvidenceSection: React.FC<CaseStudyEvidenceSectionProps> = ({
  caseStudies,
  title = 'Empirical Proof & Architecture Teardowns',
  subtitle = 'Technical breakdowns of enterprise challenges, deployed code solutions, and verified pipeline outcomes.',
  onNavigate,
}) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section id="case-study-evidence-section" className="py-20 sm:py-28 bg-[#050811] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <BarChart3 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Engineering Evidence
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              {subtitle}
            </p>
          </div>

          <button
            id="view-all-case-studies-btn"
            onClick={() => handleNav('/case-studies/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors group cursor-pointer"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.slice(0, 2).map((cs, idx) => (
            <ScrollReveal key={cs.id} delay={idx * 0.1}>
              <div
                id={`case-study-card-${cs.slug}`}
                onClick={() => handleNav(`/case-studies/${cs.slug}/`)}
                className="p-8 sm:p-10 rounded-3xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group shadow-2xl hover:shadow-blue-500/5"
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

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {cs.clientName}: {cs.heroHeadline || cs.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                    {cs.executiveSummary || cs.excerpt}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {cs.results?.slice(0, 3).map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B]"
                      >
                        <div className="text-lg font-mono font-bold text-[#60A5FA]">
                          {r.metric}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1E293B] pt-5 mt-6 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span className="flex items-center gap-1 text-[11px] text-[#64748B]">
                    <Lock className="w-3 h-3 text-[#3B82F6]" />
                    <span>Verified Audit Teardown</span>
                  </span>
                  <span className="text-[#60A5FA] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>Read Architecture Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
