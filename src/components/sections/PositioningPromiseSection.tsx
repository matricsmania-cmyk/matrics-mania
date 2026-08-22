'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ShieldX, ShieldCheck, Cpu, Code2, LineChart, Layers, ArrowRight } from 'lucide-react';

export interface PositioningPromiseSectionProps {
  onNavigate?: (path: string) => void;
}

export const PositioningPromiseSection: React.FC<PositioningPromiseSectionProps> = ({
  onNavigate,
}) => {
  const comparisons = [
    {
      dimension: 'Operating Model',
      traditional: 'Subjective marketing opinions & vanity slide decks',
      engineering: 'Deterministic pull requests, schemas, & server-side telemetry',
    },
    {
      dimension: 'Data & Attribution',
      traditional: 'Sampled browser pixels & opaque platform reporting',
      engineering: 'First-party BigQuery event streams & econometric MMM modeling',
    },
    {
      dimension: 'SEO & Organic',
      traditional: 'Keyword stuffing & manual blog volume without technical audit',
      engineering: 'Server log crawl budgeting, programmatic entity graphs, & sub-second CWV',
    },
    {
      dimension: 'Conversion & UX',
      traditional: 'Cosmetic redesigns without statistical power or velocity tests',
      engineering: 'Bayesian multi-variant experimentation & Edge worker rendering',
    },
    {
      dimension: 'Accountability',
      traditional: 'Vague retainers & vanity impressions metrics',
      engineering: 'Code SLAs, raw data pipeline ownership, & measurable pipeline velocity',
    },
  ];

  return (
    <section id="positioning-promise-section" className="py-20 sm:py-28 bg-[#050811] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
            The Growth Engineering Paradigm
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Why Modern High-Growth Brands Outgrow Traditional Agencies
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Legacy agencies treat marketing as creative guesswork. MatricsMania treats customer acquisition as a distributed software engineering problem.
          </p>
        </ScrollReveal>

        {/* Contrast Table / Grid */}
        <ScrollReveal>
          <div className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#1E293B] bg-[#070B14]/80 p-4 text-xs font-mono text-[#64748B] uppercase tracking-wider">
              <div className="md:col-span-3 hidden md:block">Discipline Dimension</div>
              <div className="md:col-span-4 flex items-center gap-1.5 text-rose-400">
                <ShieldX className="w-4 h-4" />
                <span>Traditional Agency Model</span>
              </div>
              <div className="md:col-span-5 flex items-center gap-1.5 text-[#60A5FA]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>MatricsMania Engineering Lab</span>
              </div>
            </div>

            <div className="divide-y divide-[#1E293B]">
              {comparisons.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-4 hover:bg-[#0A101D] transition-colors items-center text-sm"
                >
                  <div className="md:col-span-3 font-semibold text-white font-mono text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    {item.dimension}
                  </div>
                  <div className="md:col-span-4 text-[#94A3B8] flex items-start gap-2 text-xs sm:text-sm">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{item.traditional}</span>
                  </div>
                  <div className="md:col-span-5 text-white font-medium flex items-start gap-2 text-xs sm:text-sm bg-[#070B14] md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 border-[#1E293B]">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-[#E2E8F0]">{item.engineering}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Supporting Pillars Summary Banner */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8 p-6 rounded-2xl bg-[#0D1424]/60 border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#60A5FA]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Full Infrastructure Transparency</h3>
                <p className="text-xs text-[#94A3B8]">You own every line of code, schema deployment, and BigQuery data pipeline.</p>
              </div>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/process/')}
                className="text-xs font-mono text-[#60A5FA] hover:text-white flex items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <span>Read Engineering Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
