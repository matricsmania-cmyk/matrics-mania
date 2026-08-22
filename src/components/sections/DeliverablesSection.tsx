'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { FileCheck, CheckCircle2, Calendar } from 'lucide-react';
import { ServiceDeliverable } from '../../models';

export interface DeliverablesSectionProps {
  title?: string;
  subtitle?: string;
  deliverables: ServiceDeliverable[];
}

export const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({
  title = 'Engineered Scope & Concrete Deliverables',
  subtitle = 'Every engagement includes verified technical artifacts, code repositories, and operational dashboards.',
  deliverables,
}) => {
  if (!deliverables || deliverables.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <FileCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            Verifiable Outputs
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className="rounded-2xl bg-[#0D1424] border border-[#1E293B] p-6 hover:border-[#2563EB]/40 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
                      {item.category || 'Core Deliverable'}
                    </span>
                    {item.cadence && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20">
                        <Calendar className="w-3 h-3" />
                        {item.cadence}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {item.title}
                  </h3>

                  {item.specifications && item.specifications.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-[#1E293B]">
                      {item.specifications.map((spec, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-2 text-xs text-[#94A3B8]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
