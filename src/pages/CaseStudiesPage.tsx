import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { CASE_STUDIES_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { TrendingUp, ArrowUpRight, ShieldCheck, Award, Filter, ArrowRight, Quote, Sparkles, Layers } from 'lucide-react';

interface CaseStudiesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillInfo?: any) => void;
  slug?: string | null;
  onSlugChange?: (slug: string | null) => void;
  onNavigateToWork?: (slug: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigate,
  onOpenBooking,
  slug,
  onSlugChange,
  onNavigateToWork,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  useEffect(() => {
    document.title = 'Client Growth Case Studies & Revenue Attribution | MatricsMania';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!slug && CASE_STUDIES_DATA.length > 0) {
      if (onSlugChange) {
        onSlugChange(CASE_STUDIES_DATA[0].id);
      }
    }
  }, [slug, onSlugChange]);

  const industries = [
    'all',
    'B2B Enterprise SaaS',
    'D2C E-Commerce',
    'FinTech & Capital',
    'Healthcare & Clinical',
    'Real Estate & Infrastructure',
  ];

  const filtered = selectedIndustry === 'all'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((c) => c.industry === selectedIndustry);

  return (
    <div className="bg-[#070B14] text-white space-y-16 pb-24 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            Client Growth <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Case Studies</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            In-depth analytical breakdowns of client transformations. Discover how we engineered multi-crore organic pipelines, 5x+ blended ad ROAS, and category leadership.
          </p>

          {/* Quick Hub Navigation Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('work')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Looking for Creative & Storefront Deliverables? Explore Work Portfolio (/work) →</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedIndustry === ind
                    ? 'bg-[#2563EB] text-white border-transparent shadow-sm'
                    : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                }`}
              >
                {ind === 'all' ? 'All Case Studies' : ind}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Case Studies Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filtered.map((study, idx) => (
          <ScrollReveal
            key={study.id}
            delay={idx * 0.08}
            className="p-8 sm:p-12 rounded-3xl bg-[#0D1424] border border-[#1E293B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm hover:border-[#2563EB]/40 transition-all"
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#131D33] text-[#60A5FA] border border-[#1E293B]">
                  {study.industry}
                </span>
                <span className="text-xs font-semibold text-[#94A3B8]">
                  {study.clientName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {study.title}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-1">
                  <h4 className="font-bold text-white">The Challenge & Bottleneck:</h4>
                  <p>{study.challenge}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-1">
                  <h4 className="font-bold text-white">Engineered Solution & Architecture:</h4>
                  <p>{study.solution}</p>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="p-4 rounded-2xl bg-[#131D33] border border-[#1E293B] space-y-2">
                <p className="text-xs italic text-[#CBD5E1]">
                  "{study.testimonialQuote}"
                </p>
                <p className="text-[11px] font-bold text-white">
                  — {study.clientAuthor}, <span className="text-[#94A3B8] font-normal">{study.clientRole}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking({ caseStudy: study.title })}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
                >
                  <span>Request Similar Campaign Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (onNavigateToWork) {
                      onNavigateToWork('scaling-inbound-pipeline');
                    } else {
                      onNavigate('work');
                    }
                  }}
                  className="py-3 px-5 rounded-xl border border-[#1E293B] hover:border-[#2563EB]/40 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  View Creative Deliverables →
                </button>
              </div>
            </div>

            {/* Right Metrics & Image */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#1E293B] h-52 sm:h-60">
                <OptimizedImage
                  src={study.image}
                  alt={study.clientName}
                  widthParam={700}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {study.results.map((r, idxMetric) => (
                  <div
                    key={idxMetric}
                    className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] text-center"
                  >
                    <p className="text-xl font-black text-[#60A5FA]">{r.metric}</p>
                    <p className="text-[11px] text-[#94A3B8] font-semibold mt-1">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* Bottom Work Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] text-center space-y-4">
          <h3 className="text-xl font-bold text-white">
            Want to see our creative assets, UI/UX designs, and live campaign funnels?
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto">
            Browse our full creative deliverables portfolio including ad creative variations, custom Shopify storefronts, and SEO topic maps.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('work')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Explore The Work Page (/work)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

