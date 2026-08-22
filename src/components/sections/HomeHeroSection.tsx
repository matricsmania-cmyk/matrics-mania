'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Terminal, Activity } from 'lucide-react';

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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const h1Y = useTransform(scrollYProgress, [0, 0.6], [0, -70]);
  const h1Opacity = useTransform(scrollYProgress, [0.05, 0.6], [1, 0]);
  const pY = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 0, -60]);
  const pOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8], [1, 1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-auto lg:min-h-[105vh] bg-[#070B14] flex flex-col justify-center border-b border-[#1E293B]"
    >
      <div className="relative lg:sticky lg:top-0 w-full py-12 sm:py-20 lg:py-24 overflow-hidden flex flex-col justify-center bg-[#070B14]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] lg:w-[700px] h-[250px] sm:h-[320px] lg:h-[380px] bg-[#2563EB]/12 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-semibold text-[#94A3B8] select-none mx-auto shadow-inner max-w-full overflow-hidden"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span className="text-[#CBD5E1] truncate">Full-Funnel Growth Engineering</span>
            <span className="text-[#64748B] hidden sm:inline">•</span>
            <span className="text-[#60A5FA] font-mono hidden sm:inline">AI Search &amp; Attribution</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              style={{ y: h1Y, opacity: h1Opacity }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12] text-white break-words"
            >
              Building Ambitious Brands with{' '}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#A855F7] bg-clip-text text-transparent">
                Mathematical Precision
              </span>{' '}
              &amp; Scalable Systems.
            </motion.h1>
          </motion.div>

          {/* Sub-headline / Positioning Statement */}
          <motion.p
            style={{ y: pY, opacity: pOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-[#94A3B8] leading-relaxed"
          >
            We replace subjective marketing opinions with structured engineering, algorithmic crawl optimization, high-yield paid acquisition, and revenue analytics.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto"
          >
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
          </motion.div>

          {/* Micro Telemetry Indicators */}
          <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-[#64748B] font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Fluff Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>100% First-Party Data Ownership</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Deterministic Engineering SLAs</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
