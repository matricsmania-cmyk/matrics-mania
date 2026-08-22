'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { IndustryChallenge } from '../../models';

export interface ChallengesGridSectionProps {
  title?: string;
  subtitle?: string;
  challenges: IndustryChallenge[];
}

export const ChallengesGridSection: React.FC<ChallengesGridSectionProps> = ({
  title = 'Structural Industry Bottlenecks & Pitfalls',
  subtitle = 'Why traditional agency models fail in this vertical and where growth capital is routinely wasted.',
  challenges,
}) => {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-rose-400 uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            Structural Vulnerabilities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-rose-500/30 transition-all flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase font-semibold">
                      {challenge.impactLevel || 'Critical'} Impact
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      PITFALL {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {challenge.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {challenge.typicalCACWaste && (
                  <div className="border-t border-[#1E293B] pt-3 flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                      Typical Capital Waste:
                    </span>
                    <span className="font-mono text-rose-300 font-semibold">
                      {challenge.typicalCACWaste}
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
