import React, { useState } from 'react';
import { getIndustryBySlug, getAllIndustries } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Target,
  BarChart3,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface IndustryTemplateProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const industry = getIndustryBySlug(slug) || getIndustryBySlug('real-estate')!;
  const allIndustries = getAllIndustries();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const canonicalUrl = `https://matricsmania.com/industries/${industry.slug}/`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.name} Growth Solutions`,
    serviceType: industry.categoryBadge,
    provider: {
      '@type': 'Organization',
      name: 'MatricsMania',
      url: 'https://matricsmania.com/',
    },
    description: industry.overview,
    url: canonicalUrl,
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title={`${industry.name} Digital Marketing & Growth | MatricsMania`}
        description={industry.overview}
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <ScrollReveal className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              {industry.categoryBadge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {industry.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#E2E8F0] leading-relaxed">
              {industry.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {industry.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking({ industry: industry.name })}
                className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                Schedule Industry Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/case-studies/')}
                className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-[#94A3B8] hover:text-white font-medium text-sm transition-all"
              >
                View Case Studies
              </button>
            </div>
          </ScrollReveal>

          {/* HERO METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {industry.heroMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#60A5FA] font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-[#94A3B8]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01. SPECIFIC INDUSTRY CHALLENGES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Root Industry Frictions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Generic Marketing Fails in {industry.name}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.challenges.map((ch, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4"
              >
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-rose-400 font-bold">THE PROBLEM</div>
                  <p className="text-sm font-medium text-white">{ch.problem}</p>
                </div>
                <div className="space-y-1.5 border-t border-[#1E293B] pt-4">
                  <div className="text-xs font-mono text-[#10B981] font-bold">MATRICSMANIA SOLUTION</div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{ch.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. STRATEGIC PLAYBOOKS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Execution Blueprints
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Specialized Acquisition Systems
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.playbooks.map((pb, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA] text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white">{pb.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pl-11">
                  {pb.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. CASE STUDY PREVIEW */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Validated Client Results
            </div>
            <h3 className="text-2xl font-bold text-white">{industry.caseStudyPreview.client}</h3>
            <div className="text-lg font-bold text-[#10B981] font-mono">
              {industry.caseStudyPreview.result}
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {industry.caseStudyPreview.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/case-studies/')}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
              >
                Explore Full Case Studies →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 04. FAQS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Sector Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {industry.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748B] transition-transform ${
                        isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. FINAL CTA */}
      <section className="py-20 text-center bg-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Ready to scale acquisition in {industry.name}?
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Let’s discuss your current CAC, sales velocity, and unit economics.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact/')}
              className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
            >
              Start an Enquiry
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
