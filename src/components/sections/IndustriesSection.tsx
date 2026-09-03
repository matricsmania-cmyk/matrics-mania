'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from '../ScrollReveal';
import { Building2, ArrowRight, ArrowUpRight, ShieldCheck, Check } from 'lucide-react';
import { Industry } from '../../models';

export interface IndustriesSectionProps {
  industries: Industry[];
  title?: string;
  subtitle?: string;
  onNavigate?: (path: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industries,
  title = 'Specialized Industry Verticals',
  subtitle = 'Tailored growth architecture engineered around vertical compliance, sales cycles, and unit economics.',
  onNavigate,
}) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };

  if (!industries || industries.length === 0) {
    return null;
  }

  return (
    <section id="industries-served-section" className="py-20 sm:py-28 bg-[#050811] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <Building2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Domain Specialization
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              {subtitle}
            </p>
          </div>

          <button
            id="view-all-industries-btn"
            onClick={() => handleNav('/industries/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors group cursor-pointer"
          >
            <span>View All Verticals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
            <ScrollReveal key={ind.id} delay={idx * 0.08}>
              <div
                id={`industry-card-${ind.slug}`}
                onClick={() => handleNav(`/industries/${ind.slug}/`)}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                      {ind.industryCode || 'VERTICAL'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {ind.tagline || ind.excerpt || ind.marketSummary}
                  </p>

                  {ind.challenges && ind.challenges.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#1E293B]/60">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase">Primary Friction:</div>
                      <div className="text-[11px] text-[#CBD5E1] font-medium flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{ind.challenges[0].title}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#1E293B] pt-4 mt-6 flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span>{ind.benchmarks?.[0]?.deltaPercent ? `${ind.benchmarks[0].deltaPercent} Delta` : 'Custom Playbook'}</span>
                  <span className="text-[#60A5FA] group-hover:underline">Explore Vertical →</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
