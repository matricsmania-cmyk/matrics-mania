'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { Industry } from '../models';
import {
  ArrowRight,
  Search,
  CheckCircle2,
  Building2,
  Briefcase,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Sparkles,
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
  const onNavigate = (path: string) => {
    if (propNavigate) {
      propNavigate(path);
    } else {
      router.push(path);
    }
  };

  const onOpenBooking = (info?: any) => {
    if (propBooking) {
      propBooking(info);
    }
  };

  const provider = useContentProvider();
  const allIndustries =
    propIndustries && propIndustries.length > 0
      ? propIndustries
      : provider.getAllIndustries();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIndustries = useMemo(() => {
    return allIndustries.filter((industry) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      const titleMatch = industry.title?.toLowerCase().includes(query);
      const descMatch = (industry.excerpt || industry.marketSummary || '')
        .toLowerCase()
        .includes(query);
      return titleMatch || descMatch;
    });
  }, [allIndustries, searchQuery]);

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        pageType="industry"
        canonicalUrl="https://matricsmania.com/industries/"
        title="Industry Playbooks & Vertical Growth Architecture | MatricsMania"
        description="Explore calibrated customer acquisition systems and growth architectures engineered for high-growth vertical markets: B2B SaaS, Luxury D2C, Real Estate, and HealthTech."
      />

      {/* 1. HERO */}
      <section className="relative border-b border-[#1E293B] pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Vertical Market Engineering
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Calibrated Industry Growth Systems
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              We do not apply generic agency playbooks to nuanced vertical markets. We design, deploy, and govern deterministic growth infrastructure calibrated to the unit economics, regulatory realities, and sales cycles of specific enterprise sectors.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() =>
                  onOpenBooking({ interest: 'Vertical Growth Diagnostic' })
                }
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Industry Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {allIndustries.length > 0 && (
                <button
                  onClick={() => {
                    const el = document.getElementById('industries-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white transition-all cursor-pointer"
                >
                  Browse Industry Playbooks ({allIndustries.length})
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. DIRECTORY GRID (Only rendered if industries are published) */}
      {allIndustries.length > 0 && (
        <section id="industries-grid" className="py-16 md:py-24 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Active Industry Playbooks</h2>
                <p className="text-sm text-[#94A3B8]">Engineered solutions for specific vertical economics</p>
              </div>
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search industries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndustries.map((ind) => (
                <div
                  key={ind.id}
                  onClick={() => onNavigate(`/industries/${ind.slug}/`)}
                  className="group p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all flex flex-col justify-between cursor-pointer space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#60A5FA]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">PLAYBOOK</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {ind.marketSummary || ind.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs font-semibold text-[#60A5FA]">
                    <span>Explore Architecture</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. SECTOR GOVERNANCE & ENGINEERING COMMITMENTS */}
      <section className="py-16 md:py-20 border-t border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              Sector Engineering Governance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Deterministic Sector Operating Principles
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Every vertical deployment is calibrated against strict compliance requirements, enterprise buyer friction, and audited pipeline returns.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 01</span>
              <h3 className="text-lg font-bold text-white">Regulatory Compliance First</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Whether adhering to HIPAA for healthcare networks, PCI-DSS for high-ticket D2C, or SOC2 for enterprise SaaS, all capture funnels and server-side tracking pipelines comply with statutory guardrails.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 02</span>
              <h3 className="text-lg font-bold text-white">Unit Economic Calibration</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Campaign algorithms and content velocity are mathematically tuned to match sector-specific payback horizons, average contract values (ACV), and net revenue retention (NRR) profiles.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 03</span>
              <h3 className="text-lg font-bold text-white">Domain Entity Authority</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We construct specialized semantic knowledge graphs and schema topologies that establish topical dominance for high-intent technical searches rather than shallow volume keywords.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CONVERSION CTA */}
      <section className="py-20 bg-[#070B14] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#070B14] border border-[#1E293B] p-8 sm:p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded border border-[#2563EB]/20">
                VERTICAL ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Require a Dedicated Vertical Playbook?
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Schedule an architectural discovery session. Our vertical growth engineers will inspect your market positioning, compliance envelope, and acquisition telemetry to build a customized roadmap.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button
                onClick={() =>
                  onOpenBooking({ interest: 'Custom Industry Growth System' })
                }
                className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Architectural Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const IndustriesIndex = IndustriesIndexTemplate;
