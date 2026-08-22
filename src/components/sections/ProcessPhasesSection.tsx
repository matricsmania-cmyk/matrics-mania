'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Layers, Clock, CheckCircle2 } from 'lucide-react';
import { ProcessPhase } from '../../models';

export interface ProcessPhasesSectionProps {
  title?: string;
  subtitle?: string;
  phases: ProcessPhase[];
}

export const ProcessPhasesSection: React.FC<ProcessPhasesSectionProps> = ({
  title = 'Engineering Protocol & Phased Roadmap',
  subtitle = 'A structured, deterministic operational cadence designed to eliminate random tactics and build repeatable growth infrastructure.',
  phases,
}) => {
  if (!phases || phases.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
            Deployment Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="rounded-2xl bg-[#0D1424] border border-[#1E293B] p-6 hover:border-[#2563EB]/40 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded-lg border border-[#2563EB]/20">
                      {phase.step || String(idx + 1).padStart(2, '0')}
                    </span>
                    {phase.duration && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] bg-[#070B14] px-2.5 py-1 rounded border border-[#1E293B]">
                        <Clock className="w-3 h-3 text-[#3B82F6]" />
                        <span>{phase.duration}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {phase.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {phase.keyOutputs && phase.keyOutputs.length > 0 && (
                  <div className="border-t border-[#1E293B] pt-4 mt-6 space-y-2">
                    <div className="text-[10px] font-mono uppercase text-[#64748B] tracking-wider">
                      Key Outputs & Artifacts
                    </div>
                    <ul className="space-y-1.5">
                      {phase.keyOutputs.map((output, oIdx) => (
                        <li
                          key={oIdx}
                          className="flex items-center gap-2 text-xs text-[#CBD5E1]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{output}</span>
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
  );
};
