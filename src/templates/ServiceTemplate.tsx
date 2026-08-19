import React, { useState } from 'react';
import { getServiceBySlug, getAllServices } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  Layers,
  FileCheck,
  Zap,
  HelpCircle,
  TrendingUp,
  Code,
  Globe,
} from 'lucide-react';

interface ServiceTemplateProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const service = getServiceBySlug(slug) || getServiceBySlug('technical-seo')!;
  const allServices = getAllServices();

  const [expandedWhatWeDo, setExpandedWhatWeDo] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleWhatWeDo = (idx: number) => {
    setExpandedWhatWeDo(expandedWhatWeDo === idx ? null : idx);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const canonicalUrl = `https://matricsmania.com/services/${service.slug}/`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.eyebrow,
    provider: {
      '@type': 'Organization',
      name: 'MatricsMania',
      url: 'https://matricsmania.com/',
    },
    description: service.heroDescription,
    url: canonicalUrl,
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title={`${service.name} | Growth Systems | MatricsMania`}
        description={service.heroDescription}
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                {service.eyebrow}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {service.h1}
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking({ service: service.name })}
                  className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  Schedule Initial Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/work/')}
                  className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-[#94A3B8] hover:text-white font-medium text-sm transition-all"
                >
                  View Case Study Proof
                </button>
              </div>
            </ScrollReveal>

            {/* Right: Architectural System Diagram */}
            <ScrollReveal className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                  <div className="text-xs font-mono text-[#60A5FA] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    {service.heroDiagram.title}
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">SYSTEM LOGIC</span>
                </div>

                {/* Flow Chain */}
                <div className="space-y-2.5 font-mono text-xs">
                  {service.heroDiagram.flow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#E2E8F0] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#64748B]">0{idx + 1}</span>
                        <span>{step}</span>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    </div>
                  ))}

                  {/* Outcome */}
                  <div className="p-3.5 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/40 text-[#60A5FA] font-bold text-center mt-3">
                    → RESULT: {service.heroDiagram.outcome}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 01. THE PROBLEM */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // The Root Constraint
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {service.problem.headline}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.problem.items.map((item, idx) => (
              <ScrollReveal
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3"
              >
                <div className="text-xs font-mono text-[#64748B] font-bold">{item.number}</div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02. WHAT WE DO */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Method & Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Core Engineering Execution
            </h2>
          </ScrollReveal>

          <div className="space-y-4 max-w-4xl">
            {service.whatWeDo.items.map((item, idx) => {
              const isOpen = expandedWhatWeDo === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleWhatWeDo(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-[#64748B]">{item.number}</span>
                      <span>{item.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#60A5FA]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B]" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#1E293B] space-y-4">
                      {item.description && (
                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {item.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#E2E8F0] flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            {pt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. DELIVERABLES & ARTIFACTS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Concrete Outputs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What You Receive in the Engagement
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {service.whatYouGet.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA] shrink-0 text-xs font-mono">
                  0{idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#64748B] uppercase">{del.area}</div>
                  <div className="text-sm font-bold text-white">{del.deliverable}</div>
                  {del.details && <p className="text-xs text-[#94A3B8]">{del.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. PROOF / CASE STUDY LINK */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#131D33] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#10B981]">
              {service.proof.badge}
            </div>

            <h3 className="text-2xl font-bold text-white">{service.proof.headline}</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
              {service.proof.description}
            </p>

            {service.proof.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {service.proof.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-lg bg-[#070B14] border border-[#1E293B]">
                    <div className="text-xl font-bold text-[#60A5FA]">{m.value}</div>
                    <div className="text-[11px] font-mono text-[#64748B] mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/case-studies/velociti-cloud/')}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
              >
                Read full case study breakdown →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05. FAQS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Technical Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
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

      {/* 06. FINAL CTA */}
      <section className="py-20 text-center bg-[#090E1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            {service.finalCta.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            {service.finalCta.subheadline}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact/')}
              className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
            >
              {service.finalCta.buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
