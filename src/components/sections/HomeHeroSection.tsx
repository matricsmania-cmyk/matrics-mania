'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

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
      className="relative min-h-[calc(100vh-4rem)] bg-[#070B14] flex flex-col justify-center border-b border-[#1E293B] pt-16 sm:pt-20 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 35%, rgba(37, 99, 235, 0.12) 0%, rgba(7, 11, 20, 1) 100%)',
      }}
    >
      <div className="relative w-full py-8 sm:py-10 lg:py-12 flex flex-col justify-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          {/* Main Headline */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12] text-white break-words">
              Matrics Mania your digital marketing partner for{' '}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#A855F7] bg-clip-text text-transparent">
                smarter strategies
              </span>{' '}
              and bigger growth
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
          </div>
        </div>
      </div>
    </section>
  );
};

