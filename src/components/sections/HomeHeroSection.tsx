'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Terminal } from 'lucide-react';

export interface HomeHeroSectionProps {
  onOpenBooking?: (prefillInfo?: any) => void;
  onNavigate?: (path: string) => void;
}

export const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-auto bg-[#070B14] flex flex-col justify-center border-b border-[#1E293B]"
    >
      <div className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden flex flex-col justify-center bg-[#070B14]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Eyebrow Pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-semibold text-[#94A3B8] select-none mx-auto shadow-inner max-w-full overflow-hidden"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span className="text-[#CBD5E1] truncate">Full-Funnel Growth Engineering</span>
            <span className="text-[#64748B] hidden sm:inline">•</span>
            <span className="text-[#60A5FA] font-mono hidden sm:inline">AI Search &amp; Attribution</span>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12] text-white break-words">
              Building Ambitious Brands with{' '}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#A855F7] bg-clip-text text-transparent">
                Mathematical Precision
              </span>{' '}
              &amp; Scalable Systems.
            </h1>
          </div>

          {/* Sub-headline / Positioning Statement */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-[#94A3B8] leading-relaxed">
            We replace subjective marketing opinions with structured engineering, algorithmic crawl optimization, high-yield paid acquisition, and revenue analytics.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <button
              id="hero-cta-diagnostic-btn"
              type="button"
              onClick={() => onOpenBooking?.({ service: 'Growth Engineering Consultation' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <span>Schedule Diagnostic Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-services-btn"
              type="button"
              onClick={() => handleNav('/services/')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <Terminal className="w-4 h-4 text-[#60A5FA]" />
              <span>Explore Systems Stack</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
