import React, { useState } from 'react';
import { PageType, ServiceItem } from '../types';
import { SERVICES_DATA, FAQS_DATA } from '../data/mockData';
import { PackageBuilder } from '../components/PackageBuilder';
import { Search, Target, Share2, FileText, Code, BarChart3, CheckCircle2, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-6 h-6 text-blue-500" />;
      case 'Target': return <Target className="w-6 h-6 text-purple-500" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-pink-500" />;
      case 'FileText': return <FileText className="w-6 h-6 text-emerald-500" />;
      case 'Code': return <Code className="w-6 h-6 text-cyan-500" />;
      default: return <BarChart3 className="w-6 h-6 text-amber-500" />;
    }
  };

  const categories = ['all', 'Organic Growth', 'Paid Acquisition', 'Brand Strategy', 'Conversion Tech', 'Data & Tech'];

  const filteredServices = activeTab === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Services & Growth Solutions
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white max-w-4xl mx-auto tracking-tight">
          Data-Driven Digital Marketing Built For <span className="gradient-text-primary">Measurable Scalability</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          From technical SEO audits to ₹50 Lakh/mo ad scaling and server-side tracking, Matricsmania covers the entire digital growth spectrum.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES LIST DETAILED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Header info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {getIcon(service.iconName)}
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                {service.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Recommended For:</span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{service.recommendedFor}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking({ services: [service.title] })}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Custom Consultation</span>
                </button>
              </div>
            </div>

            {/* Right Features & Process */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Service Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Execution Process Workflow
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {service.processSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                    >
                      <span className="text-[10px] font-black text-blue-500 block">{step.step}</span>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">{step.title}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* INTERACTIVE CUSTOM PACKAGE BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PackageBuilder
          onOpenBookingWithQuote={(quote) =>
            onOpenBooking({
              services: quote.services,
              spend: quote.monthlyBudget,
              totalMonthlyEstimate: quote.totalMonthlyEstimate,
            })
          }
        />
      </section>

      {/* PROCESS / METHODOLOGY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            How We Execute
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            The Matricsmania 4-Step Growth Sprint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Crawl & Pixel Audit',
              desc: 'We perform a deep 360° check of site load speed, keyword gaps, pixel triggers, and conversion roadblocks.',
            },
            {
              num: '02',
              title: '90-Day Strategy Roadmap',
              desc: 'We build tailored keyword silo structures, audience ad testing plans, and target CAC milestones.',
            },
            {
              num: '03',
              title: 'High-Velocity Execution',
              desc: 'We deploy code optimizations, publish semantic search content, and launch multi-channel ad campaigns.',
            },
            {
              num: '04',
              title: 'Iterative Attribution',
              desc: 'Weekly performance updates with real-time Looker Studio revenue reports and algorithmic refinements.',
            },
          ].map((proc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative shadow-md"
            >
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 opacity-30">{proc.num}</div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{proc.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white cursor-pointer hover:text-blue-500 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 border border-slate-800 shadow-xl">
          <h2 className="text-2xl md:text-4xl font-extrabold">Ready to Scale Your Marketing Metrics?</h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
            Book a 1-on-1 strategy call with our Senior Growth Architects to receive a custom proposal and audit report.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Get Started with Matricsmania</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
