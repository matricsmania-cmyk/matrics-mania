import React, { useState } from 'react';
import { PageType } from '../types';
import { ServiceSlug } from '../data/serviceDetailsData';
import { SERVICES_DATA, FAQS_DATA } from '../data/mockData';
import { PackageBuilder } from '../components/PackageBuilder';
import { ScrollReveal } from '../components/ScrollReveal';
import { Search, Target, Share2, FileText, Code, BarChart3, CheckCircle2, ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug?: (slug: ServiceSlug) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

// Map service item id to its respective slug
const SERVICE_ID_TO_SLUG: Record<string, ServiceSlug> = {
  'seo-growth': 'search',
  'ppc-advertising': 'performance-marketing',
  'social-media-growth': 'social-influence',
  'content-marketing': 'content-creative',
  'cro-web-engineering': 'web-digital-experience',
  'analytics-marketing-ai': 'data-technology',
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onNavigateToServiceSlug,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-[#60A5FA]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#60A5FA]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#60A5FA]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#60A5FA]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#60A5FA]" />;
      default: return <BarChart3 className="w-5 h-5 text-[#60A5FA]" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Growth Disciplines' },
    { id: 'Organic Growth', label: 'SEO & Inbound' },
    { id: 'Paid Acquisition', label: 'Paid Media & ROAS' },
    { id: 'Brand Strategy', label: 'Brand & Social' },
    { id: 'Conversion Tech', label: 'CRO & Web' },
    { id: 'Data & Tech', label: 'Analytics & AI' },
  ];

  const filteredServices = activeTab === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <div className="bg-[#070B14] text-white min-h-screen space-y-20 pb-24">
      {/* SERVICES HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 space-y-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            High-Performance Digital <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Growth Solutions</span>
          </h1>
          <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
            Every service is engineered for measurable pipeline impact. We eliminate guesswork with verifiable attribution, algorithmic precision, and conversion-centered execution.
          </p>
        </ScrollReveal>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-sm'
                  : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>


      </section>

      {/* SERVICES OVERVIEW GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        <ScrollReveal className="space-y-4 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Growth Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Full-Funnel Growth Engineering Directory
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Explore our specialized capabilities. Use the category filters above to sort by pillar, or select a card below to inspect full specifications or launch its dedicated hub.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const serviceSlug = SERVICE_ID_TO_SLUG[service.id];
            return (
              <ScrollReveal
                key={`card-${service.id}`}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col justify-between hover:border-[#2563EB]/40 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#070B14] flex items-center justify-center border border-[#1E293B]">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-[#60A5FA] uppercase tracking-wider block">
                    {service.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#1E293B]">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1E293B] flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#94A3B8] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Specs</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {serviceSlug && onNavigateToServiceSlug && (
                    <button
                      onClick={() => onNavigateToServiceSlug(serviceSlug)}
                      className="text-xs font-black text-[#60A5FA] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Launch Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* SERVICES LIST DETAILED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredServices.map((service, idx) => {
          const serviceSlug = SERVICE_ID_TO_SLUG[service.id];
          return (
            <ScrollReveal
              key={service.id}
              id={service.id}
              delay={Math.min(idx * 0.05, 0.2)}
              className="p-8 md:p-10 rounded-2xl bg-[#0D1424] border border-[#1E293B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm"
            >
              {/* Left Header info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#070B14] flex items-center justify-center border border-[#1E293B]">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider block">
                  {service.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="p-4 bg-[#070B14] rounded-xl border border-[#1E293B] space-y-2">
                  <span className="text-[11px] font-bold text-[#60A5FA] uppercase">Recommended For:</span>
                  <p className="text-xs font-medium text-white">{service.recommendedFor}</p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  {serviceSlug && onNavigateToServiceSlug && (
                    <button
                      onClick={() => onNavigateToServiceSlug(serviceSlug)}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Explore Service Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenBooking({ services: [service.title] })}
                    className="px-5 py-3 rounded-xl bg-[#070B14] hover:bg-[#131D33] border border-[#1E293B] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Custom Consultation</span>
                  </button>
                </div>
              </div>

              {/* Right Features & Process */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                    Core Service Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, fidx) => (
                      <div
                        key={fidx}
                        className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-xs text-white font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                    Execution Process Workflow
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {service.processSteps.map((step, sidx) => (
                      <div
                        key={sidx}
                        className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs space-y-1"
                      >
                        <span className="text-[10px] font-bold text-[#60A5FA] block">{step.step}</span>
                        <p className="font-bold text-white leading-tight">{step.title}</p>
                        <p className="text-[10px] text-[#94A3B8] line-clamp-2">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* INTERACTIVE CUSTOM PACKAGE BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <PackageBuilder
            onOpenBookingWithQuote={(quote) =>
              onOpenBooking({
                services: quote.services,
                spend: quote.monthlyBudget,
                totalMonthlyEstimate: quote.totalMonthlyEstimate,
              })
            }
          />
        </ScrollReveal>
      </section>

      {/* PROCESS / METHODOLOGY SECTION */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              How We Execute
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              The MatricsMania 4-Step Growth Sprint
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
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-3 relative"
              >
                <div className="text-3xl font-black text-[#60A5FA]">{proc.num}</div>
                <h3 className="font-bold text-base text-white">{proc.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ SECTION ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
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
        </ScrollReveal>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#0D1424] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Ready to Scale Your Marketing Metrics?</h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Let's discuss your current CAC, organic search rankings, and unit economics on a free 30-minute growth consultation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free Strategy Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
