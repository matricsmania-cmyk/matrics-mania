'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

export interface MetricPoint {
  label: string;
  value: string;
  sublabel?: string;
  timeframe?: string;
  sourceBenchmark?: string;
}

export interface BenchmarkMetricsSectionProps {
  title?: string;
  subtitle?: string;
  metrics: MetricPoint[];
  columns?: 2 | 3 | 4;
  disclaimerText?: string;
}

export const BenchmarkMetricsSection: React.FC<BenchmarkMetricsSectionProps> = ({
  title = 'Engineered Performance Benchmarks',
  subtitle = 'Quantitative outcomes calibrated across enterprise client deployments and simulation testing environments.',
  metrics,
  columns = 3,
  disclaimerText = 'Disclaimer: Benchmark metrics represent observed engineering simulations and controlled experimental deployments. They demonstrate dynamic model binding and do not guarantee identical results across differing domain environments.',
}) => {
  if (!metrics || metrics.length === 0) return null;

  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
            Quantitative Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className={`grid ${colClasses} gap-6`}>
          {metrics.map((metric, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all space-y-4 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B] mb-2">
                    <span>NODE {String(idx + 1).padStart(2, '0')}</span>
                    {metric.timeframe && (
                      <span className="text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20">
                        {metric.timeframe}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#60A5FA] transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-[#E2E8F0] mt-2">
                    {metric.label}
                  </div>
                  {metric.sublabel && (
                    <div className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                      {metric.sublabel}
                    </div>
                  )}
                </div>

                <div className="border-t border-[#1E293B] pt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#64748B]">
                  <ShieldCheck className="w-3 h-3 text-[#3B82F6]" />
                  <span>{metric.sourceBenchmark || 'Model Placeholder Benchmark'}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {disclaimerText && (
          <div className="mt-8 p-4 rounded-xl bg-[#0D1424]/60 border border-[#1E293B] flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
            <p className="text-xs text-[#64748B] leading-relaxed">
              {disclaimerText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
