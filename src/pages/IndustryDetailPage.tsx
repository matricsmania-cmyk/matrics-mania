import React, { useState } from 'react';
import { PageType } from '../types';
import { IndustrySlug, INDUSTRY_DETAILS } from '../data/industryDetailsData';
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
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Target,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface IndustryDetailPageProps {
  slug: IndustrySlug;
  onNavigate: (page: PageType) => void;
  onNavigateToIndustrySlug: (slug: IndustrySlug) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  slug,
  onNavigate,
  onNavigateToIndustrySlug,
  onOpenBooking,
}) => {
  const industry = INDUSTRY_DETAILS[slug] || INDUSTRY_DETAILS['real-estate'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getIndustryIcon = (iconSlug: string) => {
    switch (iconSlug) {
      case 'real-estate':
        return <Building2 className="w-8 h-8 text-[#60A5FA]" />;
      case 'healthcare':
        return <HeartPulse className="w-8 h-8 text-[#60A5FA]" />;
      case 'education':
        return <GraduationCap className="w-8 h-8 text-[#60A5FA]" />;
      case 'finance':
        return <Landmark className="w-8 h-8 text-[#60A5FA]" />;
      case 'saas':
        return <Cpu className="w-8 h-8 text-[#60A5FA]" />;
      case 'legal':
        return <Scale className="w-8 h-8 text-[#60A5FA]" />;
      case 'hospitality':
        return <Utensils className="w-8 h-8 text-[#60A5FA]" />;
      case 'luxury':
        return <Crown className="w-8 h-8 text-[#60A5FA]" />;
      case 'professional-services':
        return <Briefcase className="w-8 h-8 text-[#60A5FA]" />;
      default:
        return <Building2 className="w-8 h-8 text-[#60A5FA]" />;
    }
  };

  const otherIndustries = Object.values(INDUSTRY_DETAILS).filter((item) => item.slug !== slug);

  return (
    <div className="bg-[#070B14] text-white min-h-screen">
      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
          <button
            onClick={() => onNavigate('industries')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Industries</span>
          </button>
          <span>/</span>
          <span className="text-[#60A5FA]">{industry.name}</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            {industry.name}
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed">
            {industry.tagline}
          </p>

          <p className="text-base text-white leading-relaxed max-w-3xl">
            {industry.overview}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBooking({ industry: industry.name })}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2.5 active:scale-[0.98]"
            >
              <span>Schedule Industry Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Request Growth Audit</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. HERO VERIFIED METRICS */}
      <section className="border-y border-[#1E293B] bg-[#0D1424] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.heroMetrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#60A5FA] tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRY-SPECIFIC CHALLENGES & SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
        <ScrollReveal className="space-y-4 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
            Solving Sector Bottlenecks
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            The Key Obstacles We Eliminate
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Generic marketing playbooks fail in {industry.name}. We tackle the exact compliance, attribution, and conversion hurdles unique to your vertical.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industry.challenges.map((chal, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.08}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] shadow-sm space-y-4"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                  <span>Obstacle {idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {chal.problem}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#1E293B] space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MatricsMania Solution</span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {chal.solution}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. PROVEN VERTICAL PLAYBOOKS */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Execution Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Strategic Playbooks for {industry.name}
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Precision systems engineered specifically for customer acquisition and pipeline acceleration in your field.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.playbooks.map((pb, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#60A5FA] mb-2">0{idx + 1}</div>
                  <h3 className="font-bold text-base text-white mb-2">{pb.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{pb.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY CHANNELS & FEATURED CASE STUDY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Key Channels */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
                Optimized Acquisition Channels
              </span>
              <h3 className="text-2xl font-bold text-white">
                High-Impact Media & Channel Mix
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {industry.keyChannels.map((ch, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-bold text-white shadow-xs"
                >
                  {ch}
                </span>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                We calibrate ad spend, organic content velocity, and attribution models to match the specific buyer decision timeline of {industry.name}.
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Case Study Card */}
          <ScrollReveal className="lg:col-span-6" delay={0.1}>
            <div className="p-8 rounded-2xl md:rounded-3xl bg-[#0D1424] border border-[#1E293B] shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40 font-bold text-[11px] uppercase tracking-wider">
                  Verified Outcome
                </span>
                <span className="text-xs font-bold text-[#94A3B8]">
                  {industry.caseStudyPreview.client}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA]">
                  {industry.caseStudyPreview.result}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {industry.caseStudyPreview.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate('work')}
                className="w-full py-3.5 rounded-xl bg-[#070B14] hover:bg-[#131D33] border border-[#1E293B] text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View All Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. INDUSTRY FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <ScrollReveal className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
            Questions &amp; Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked About {industry.name}
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {industry.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white cursor-pointer hover:text-[#60A5FA] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#60A5FA]' : 'text-[#94A3B8]'}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-[#94A3B8] leading-relaxed border-t border-[#1E293B]">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. EXPLORE OTHER INDUSTRIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1E293B]">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">
            Explore Other Industry Sectors
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherIndustries.slice(0, 8).map((other) => (
              <button
                key={other.slug}
                onClick={() => {
                  onNavigateToIndustrySlug(other.slug as IndustrySlug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 text-left rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 text-xs font-semibold text-white transition-colors cursor-pointer truncate"
              >
                {other.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="bg-[#070B14] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Ready to Dominate Your Industry Sector?
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Let’s review your industry acquisition benchmarks, customer LTV, and 90-day growth targets on a 1-on-1 strategy call.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking({ industry: industry.name })}
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
