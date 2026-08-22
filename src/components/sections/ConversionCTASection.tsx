'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ArrowRight, ShieldCheck, Clock, Calendar } from 'lucide-react';

export interface ConversionCTASectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  buttonLabel?: string;
  onOpenBooking?: (prefill?: any) => void;
  prefill?: any;
  disclaimer?: string;
}

export const ConversionCTASection: React.FC<ConversionCTASectionProps> = ({
  title = 'Ready to Eliminate CAC Waste & Engineer Predictable Pipeline?',
  subtitle = 'Schedule a 30-minute diagnostic session with our Principal Growth Architects. We review your live crawl logs, paid media telemetry, and conversion friction.',
  badge = 'LIMITED ADVISORY SLOTS',
  buttonLabel = 'Launch Diagnostic Strategy Call',
  onOpenBooking,
  prefill,
  disclaimer = 'Strict NDA applied to all diagnostic data reviews. Zero sales pitches — purely architecture & telemetry analysis.',
}) => {
  return (
    <section className="py-20 bg-[#070B14] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#070B14] border border-[#2563EB]/40 p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono text-[#60A5FA]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>{badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
              {title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking?.(prefill)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{buttonLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="pt-6 border-t border-[#1E293B]/60 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B] font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                <span>NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3B82F6]" />
                <span>30-Min Diagnostic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{disclaimer}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
