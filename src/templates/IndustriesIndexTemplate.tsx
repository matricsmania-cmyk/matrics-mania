'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { Industry } from '../models';
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface IndustriesIndexTemplateProps {
  industries?: Industry[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const IndustriesIndexTemplate: React.FC<IndustriesIndexTemplateProps> = ({
  industries: propIndustries,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allIndustries = propIndustries !== undefined ? propIndustries : provider.getAllIndustries();

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        pageType="industry"
        canonicalUrl="https://matricsmania.com/industries/"
        title="Industry Growth Playbooks & Vertical Architecture | MatricsMania"
        description="Sector-specific growth engineering playbooks, CAC benchmarks, and conversion architectures for enterprise SaaS, Healthcare, and institutional markets."
      />

      {/* HERO SECTION */}
      <section className="relative border-b border-[#1E293B] pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Sector-Specific Execution
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Industry Growth Playbooks
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Tailored acquisition mechanics, regulatory compliance frameworks, and benchmark unit economics engineered for your specific market dynamics.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-16 md:py-24 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allIndustries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allIndustries.map((ind) => (
                <div
                  key={ind.slug}
                  className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                        {ind.industryCode || 'PLAYBOOK'}
                      </span>
                      {ind.complianceStandards && ind.complianceStandards.length > 0 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131D33] text-[#94A3B8] border border-[#1E293B]">
                          {ind.complianceStandards[0]}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {ind.title}
                    </h2>

                    <p className="text-sm text-[#94A3B8] line-clamp-3">
                      {ind.tagline || ind.marketSummary || ind.excerpt || 'Enterprise growth architecture and verified acquisition mechanics.'}
                    </p>

                    {ind.benchmarks && ind.benchmarks.length > 0 && (
                      <div className="pt-2 border-t border-[#1E293B]/60 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#64748B]">Benchmark Target</div>
                        <div className="text-xs font-mono text-emerald-400 font-semibold">
                          {ind.benchmarks[0].metric}: {ind.benchmarks[0].matricsManiaEngineered} ({ind.benchmarks[0].deltaPercent})
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1E293B]">
                    <a
                      href={`/industries/${ind.slug}/`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] hover:text-white transition-colors"
                    >
                      <span>Explore Industry Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-4">
              <p className="text-base text-[#94A3B8]">
                No industry playbooks published in CMS yet.
              </p>
              <a
                href="/services/"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] font-bold"
              >
                Explore Growth Services →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
