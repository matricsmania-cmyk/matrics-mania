'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConversionCTASection } from '../components/sections';
import { FAQ } from '../models';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface FAQTemplateProps {
  faqs?: FAQ[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const FAQTemplate: React.FC<FAQTemplateProps> = ({
  faqs: propFaqs,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allFaqs = propFaqs || provider.getAllFaqs();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<string | null>('faq-0');

  const categories = useMemo(() => {
    const set = new Set<string>();
    allFaqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [allFaqs]);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchCat =
        selectedCategory === 'All' || faq.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="static"
        canonicalUrl="https://matricsmania.com/faq/"
        title="Technical & Engagement FAQs | MatricsMania"
        description="Comprehensive answers to technical implementation, attribution frameworks, SLAs, and commercial engagement terms."
        faqs={filteredFaqs}
      />

      {/* Hero */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase mx-auto">
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            Knowledge Repository
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Frequently Asked Engineering Questions
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our growth engineering methodologies, SLA guarantees, data sovereignty, and commercial contracts.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search technical questions, SLAs, pricing, analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] transition-colors shadow-lg"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Grid */}
      <section className="py-16 md:py-20 bg-[#050811] border-b border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-lg text-[#94A3B8]">
                No matching answers found for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const itemKey = String(faq.id ?? idx);
              const isOpen = openIndex === itemKey;
              return (
                <div
                  key={itemKey}
                  className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(itemKey)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#111A30] transition-colors"
                  >
                    <div className="space-y-1">
                      {faq.category && (
                        <span className="text-[10px] font-mono uppercase text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20">
                          {faq.category}
                        </span>
                      )}
                      <div className="text-base sm:text-lg font-bold text-white mt-1">
                        {faq.question}
                      </div>
                    </div>
                    <div
                      className={`p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/60 space-y-3">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA */}
      <ConversionCTASection
        title="Still Have an Unanswered Question?"
        subtitle="Schedule a 30-minute diagnostic session with our Principal Growth Architects for direct technical clarity."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'FAQ Follow-up Inquiry' }}
      />
    </div>
  );
};
