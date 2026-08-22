'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface PageHeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  badge?: string;
  statusBadge?: string;
  primaryCtaLabel?: string;
  onPrimaryCta?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCta?: () => void;
  metrics?: Array<{
    label: string;
    value: string;
    sublabel?: string;
    timeframe?: string;
  }>;
  showMetricDisclaimer?: boolean;
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

export const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  tagline,
  badge,
  statusBadge,
  primaryCtaLabel = 'Schedule Strategy Call',
  onPrimaryCta,
  secondaryCtaLabel,
  onSecondaryCta,
  metrics,
  showMetricDisclaimer = true,
  align = 'left',
  children,
}) => {
  const isCentered = align === 'center';

  return (
    <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`grid grid-cols-1 ${
            metrics && metrics.length > 0 && !isCentered
              ? 'lg:grid-cols-12 gap-12 lg:gap-8 items-center'
              : 'max-w-4xl'
          } ${isCentered ? 'mx-auto text-center' : ''}`}
        >
          {/* Main Copy */}
          <ScrollReveal
            className={`space-y-6 ${
              metrics && metrics.length > 0 && !isCentered ? 'lg:col-span-7' : 'w-full'
            }`}
          >
            {/* Eyebrow / Badges */}
            <div
              className={`flex flex-wrap items-center gap-2.5 ${
                isCentered ? 'justify-center' : ''
              }`}
            >
              {eyebrow && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  {eyebrow}
                </div>
              )}
              {badge && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1E293B]/70 text-[#94A3B8] border border-[#334155]">
                  {badge}
                </span>
              )}
              {statusBadge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {statusBadge}
                </span>
              )}
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {title}
            </h1>

            {/* Optional Tagline */}
            {tagline && (
              <p className="text-lg sm:text-xl font-medium text-[#E2E8F0] leading-snug">
                {tagline}
              </p>
            )}

            {/* Subtitle / Description */}
            {subtitle && (
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            {(onPrimaryCta || onSecondaryCta || children) && (
              <div
                className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 ${
                  isCentered ? 'justify-center sm:items-center' : ''
                }`}
              >
                {onPrimaryCta && (
                  <button
                    type="button"
                    onClick={onPrimaryCta}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    {primaryCtaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {onSecondaryCta && secondaryCtaLabel && (
                  <button
                    type="button"
                    onClick={onSecondaryCta}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white font-medium text-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-center"
                  >
                    {secondaryCtaLabel}
                  </button>
                )}
                {children}
              </div>
            )}
          </ScrollReveal>

          {/* Right Metrics Panel (If Provided) */}
          {metrics && metrics.length > 0 && !isCentered && (
            <ScrollReveal delay={0.2} className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0D1424]/90 border border-[#1E293B] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                  <span className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-wider">
                    Performance Telemetry
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/30">
                    SIMULATED BENCHMARK
                  </span>
                </div>

                <div className="space-y-4">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between"
                    >
                      <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-xs text-[#94A3B8] mt-0.5">{m.label}</div>
                      </div>
                      {m.timeframe && (
                        <div className="text-right">
                          <span className="text-[11px] font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2 py-1 rounded border border-[#2563EB]/20">
                            {m.timeframe}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {showMetricDisclaimer && (
                  <p className="text-[11px] text-[#64748B] leading-relaxed italic border-t border-[#1E293B] pt-4">
                    * Metrics are calibrated pedagogical benchmarks and simulation models. Client outcomes vary based on baseline domain health, budget, and engineering implementation velocity.
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};
