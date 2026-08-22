'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Cpu, Terminal } from 'lucide-react';
import { ServiceToolchainItem } from '../../models';

export interface ToolchainSectionProps {
  title?: string;
  subtitle?: string;
  tools: ServiceToolchainItem[];
}

export const ToolchainSection: React.FC<ToolchainSectionProps> = ({
  title = 'Integrated Technical Toolchain',
  subtitle = 'Enterprise telemetry, crawl diagnostic, and attribution infrastructure integrated directly into our delivery pipelines.',
  tools,
}) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
            Infrastructure Stack
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all flex items-start gap-4 h-full">
                <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-[#60A5FA] shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{tool.name}</h3>
                    {tool.category && (
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">
                        {tool.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {tool.purpose}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
