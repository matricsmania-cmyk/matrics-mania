import React from 'react';
import { PageType } from '../types';
import { IndustrySlug, INDUSTRY_DETAILS, INDUSTRY_SLUGS } from '../data/industryDetailsData';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Building2,
  HeartPulse,
  GraduationCap,
  Landmark,
  Cpu,
  Scale,
  Utensils,
  Crown,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToIndustrySlug?: (slug: IndustrySlug) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  onNavigateToIndustrySlug,
  onOpenBooking,
}) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'real-estate':
        return <Building2 className="w-6 h-6 text-[#60A5FA]" />;
      case 'healthcare':
        return <HeartPulse className="w-6 h-6 text-[#60A5FA]" />;
      case 'education':
        return <GraduationCap className="w-6 h-6 text-[#60A5FA]" />;
      case 'finance':
        return <Landmark className="w-6 h-6 text-[#60A5FA]" />;
      case 'saas':
        return <Cpu className="w-6 h-6 text-[#60A5FA]" />;
      case 'legal':
        return <Scale className="w-6 h-6 text-[#60A5FA]" />;
      case 'hospitality':
        return <Utensils className="w-6 h-6 text-[#60A5FA]" />;
      case 'luxury':
        return <Crown className="w-6 h-6 text-[#60A5FA]" />;
      case 'professional-services':
        return <Briefcase className="w-6 h-6 text-[#60A5FA]" />;
      default:
        return <Building2 className="w-6 h-6 text-[#60A5FA]" />;
    }
  };

  const industriesList = Object.values(INDUSTRY_DETAILS);

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-24 transition-colors duration-300">
      {/* 1. HERO HEADER */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Specialized Digital Strategies Engineered for Your <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Industry Dynamics</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mx-auto">
            Generic marketing playbooks fail in specialized verticals. We deploy compliant, high-converting customer acquisition architectures tailored specifically for high-ticket real estate, healthcare clinics, EdTech, SaaS, corporate law, wealth management, and luxury hospitality.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {INDUSTRY_SLUGS.map((slug) => {
              const ind = INDUSTRY_DETAILS[slug];
              return (
                <button
                  key={slug}
                  onClick={() => {
                    if (onNavigateToIndustrySlug) {
                      onNavigateToIndustrySlug(slug);
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:border-[#2563EB]/40 hover:text-white transition-all cursor-pointer shadow-xs"
                >
                  {ind.name.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 2. INDUSTRIES 9-CARD SECTOR DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Dedicated Practice Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore All 9 Industry Vertical Solutions
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] max-w-md">
            Click any sector to review tailored acquisition funnels, compliance frameworks, verified benchmarks, and case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesList.map((ind, idx) => (
            <ScrollReveal
              key={ind.slug}
              delay={idx * 0.05}
              className="p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer flex flex-col justify-between space-y-6 group shadow-sm hover:shadow-md"
              onClick={() => {
                if (onNavigateToIndustrySlug) {
                  onNavigateToIndustrySlug(ind.slug as IndustrySlug);
                }
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#131D33] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    {getIcon(ind.slug)}
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#131D33] text-[#60A5FA] uppercase tracking-wider border border-[#1E293B]">
                    {ind.heroMetrics[0].value} {ind.heroMetrics[0].label}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {ind.tagline}
                  </p>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {ind.heroMetrics.slice(0, 2).map((m, midx) => (
                    <div
                      key={midx}
                      className="p-2.5 rounded-xl bg-[#070B14] border border-[#1E293B]"
                    >
                      <span className="text-sm font-extrabold text-[#60A5FA] block">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-semibold block truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <span className="text-xs font-bold text-[#94A3B8] group-hover:text-white group-hover:underline">
                  View Sector Playbook
                </span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. METHODOLOGY */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              The MatricsMania Vertical Advantage
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Why Industry Specialization Wins
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Every dollar spent is backed by sector-specific regulatory knowledge, pre-built negative keyword matrices, and verified conversion benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Strict Regulatory Compliance',
                desc: 'NABH/HIPAA medical ethics, financial disclaimers, bar council rules, and data privacy protocols built into every creative asset.',
              },
              {
                title: 'Pre-Tested Conversion Funnels',
                desc: 'We do not experiment at your expense; our landing page wireframes and booking engines are battle-tested across hundreds of sector campaigns.',
              },
              {
                title: 'Granular Audience Telemetry',
                desc: 'Direct integration with specialized CRMs (Salesforce, LeadSquared, Practo, HubSpot) to optimize ad spend on closed-won revenue, not superficial clicks.',
              },
            ].map((adv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3"
              >
                <div className="text-2xl font-black text-[#60A5FA]">0{idx + 1}</div>
                <h3 className="font-bold text-base text-white">{adv.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="bg-[#070B14] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Looking for a Vertical-Specific Growth Engine?
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Let’s review your industry acquisition benchmarks, customer LTV, and 90-day targets on a private 1-on-1 strategy call.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Schedule Free Industry Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
