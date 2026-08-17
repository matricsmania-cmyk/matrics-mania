import React, { useState } from 'react';
import { PageType } from '../types';
import { FAQS_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { Search, ChevronDown, HelpCircle, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const extendedFaqs = [
    ...FAQS_DATA,
    {
      id: 'faq-7',
      category: 'Attribution',
      question: 'How do you handle iOS 14.5+ privacy and cookie tracking loss?',
      answer: 'We deploy robust First-Party Server-Side Tracking (Meta Conversions API via AWS/GCP, Google Tag Manager Server Container, and GA4 measurement protocol). This recovers up to 35% of lost conversion data and feeds deterministic signals directly into ad bidding algorithms.',
    },
    {
      id: 'faq-8',
      category: 'Organic Growth',
      question: 'How long before we see measurable SEO revenue and traffic gains?',
      answer: 'Technical fixes and indexing improvements typically yield initial ranking momentum within 3 to 6 weeks. Significant organic pipeline growth and top-3 keyword clusters generally mature between months 3 and 6 as topical authority accumulates.',
    },
    {
      id: 'faq-9',
      category: 'Paid Acquisition',
      question: 'What monthly ad budget is recommended to partner with MatricsMania?',
      answer: 'We typically partner with brands investing ₹2.5L+ per month across Google or Meta ads to ensure statistically significant sample sizes for continuous creative iteration and machine learning optimization.',
    },
    {
      id: 'faq-10',
      category: 'General',
      question: 'Do we own all the ad accounts, creative assets, and analytics data?',
      answer: '100% yes. You maintain root administrative ownership of all Google Ads, Meta Ads Manager, GA4, Looker Studio dashboards, and creative source files at all times. We never hold your assets hostage.',
    },
  ];

  const categories = ['All', 'General', 'Onboarding', 'Pricing', 'Services', 'Attribution', 'Organic Growth', 'Paid Acquisition'];

  const filteredFaqs = extendedFaqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            Everything You Need to Know About Our <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Growth Partnerships</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Clear answers on our mathematical modeling, onboarding timeline, pricing models, attribution pipelines, and client data ownership.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative pt-4">
            <Search className="absolute left-4 top-7 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search questions (e.g. ROAS, contracts, SEO timeline, attribution)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-sm text-white placeholder-[#94A3B8]/60 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-sm'
                    : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ACCORDION FAQ LIST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <ScrollReveal className="text-center py-12 p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
            <HelpCircle className="w-8 h-8 text-[#94A3B8] mx-auto" />
            <h3 className="font-bold text-base text-white">No matching questions found</h3>
            <p className="text-xs text-[#94A3B8]">
              Try searching with different terms or reach out directly to our growth team.
            </p>
          </ScrollReveal>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <ScrollReveal
                key={faq.id}
                delay={idx * 0.04}
                className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden transition-all hover:border-[#2563EB]/40 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#60A5FA] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#1E293B]/50 text-sm text-[#94A3B8] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </ScrollReveal>
            );
          })
        )}
      </section>

      {/* CTA CARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 sm:p-10 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-[#60A5FA] mx-auto" />
          <h2 className="text-2xl font-bold text-white">
            Have a question specific to your industry or ad budget?
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
            Our founder and senior strategists are available for a 30-minute growth diagnostic to audit your current funnels.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Book Growth Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
