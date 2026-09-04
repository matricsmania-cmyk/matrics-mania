'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { Service, ServiceCategory } from '../models';
import {
  ArrowRight,
  Search,
  CheckCircle2,
  Layers,
  Zap,
  TrendingUp,
  BarChart3,
  Cpu,
  BookOpen,
  Filter,
  Code2,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface ServicesIndexTemplateProps {
  services?: Service[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const ServicesIndexTemplate: React.FC<ServicesIndexTemplateProps> = ({
  services: propServices,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allServices = propServices !== undefined ? propServices : provider.getAllServices();

  const getServiceIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'search':
        return <Search className="w-5 h-5 text-[#3B82F6]" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'bookopen':
        return <BookOpen className="w-5 h-5 text-purple-400" />;
      case 'barchart3':
        return <BarChart3 className="w-5 h-5 text-sky-400" />;
      default:
        return <Layers className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        pageType="service"
        canonicalUrl="https://matricsmania.com/services/"
        title="Growth Engineering Services & Disciplines | MatricsMania"
        description="Explore our complete suite of growth engineering disciplines: Technical Search Architecture, Algorithmic Paid Media, Web CRO Engineering, Content Authority Systems, and Growth Intelligence."
      />

      {/* 1. HERO */}
      <section className="relative border-b border-[#1E293B] pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Modular Growth Architecture
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Engineered Acquisition Systems
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              We do not sell generic agency retainers or subjective campaign decks. We design, deploy, and govern deterministic growth infrastructure engineered for verified enterprise pipeline.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onOpenBooking({ interest: 'Full Funnel Architecture Audit' })}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Growth Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('services-list');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white transition-all cursor-pointer"
              >
                Browse All Disciplines ({allServices.length})
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SERVICES DIRECTORY GRID */}
      <section id="services-list" className="py-16 md:py-24 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, idx) => (
              <ScrollReveal key={service.id || service.slug}>
                  <div className="h-full rounded-2xl bg-[#0D1424] border border-[#1E293B] p-6 sm:p-8 space-y-6 hover:border-[#2563EB]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-5">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] group-hover:border-[#2563EB]/30 transition-colors">
                            {getServiceIcon(service.iconName)}
                          </div>
                          <div>
                            <span className="text-[11px] font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20">
                              {service.serviceCode || `SRV-0${idx + 1}`}
                            </span>
                            <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mt-1">
                              {service.category}
                            </div>
                          </div>
                        </div>

                        {service.priceStartingMonthly && (
                          <span className="text-xs font-mono text-[#CBD5E1] bg-[#070B14] border border-[#1E293B] px-2.5 py-1 rounded-md">
                            {service.priceStartingMonthly}
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#60A5FA] transition-colors">
                          {service.title}
                        </h2>
                        {service.tagline && (
                          <p className="text-xs font-mono text-[#60A5FA] mt-1">
                            {service.tagline}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {service.shortDescription || service.excerpt}
                      </p>

                      {/* Deliverables Summary */}
                      {service.deliverablesSummary && service.deliverablesSummary.length > 0 && (
                        <div className="space-y-2 pt-3 border-t border-[#1E293B]">
                          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                            Core Deliverable Scope
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {service.deliverablesSummary.slice(0, 4).map((del, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="truncate">{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Benchmark Metrics Snapshot */}
                      {service.metrics && service.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-[#1E293B]">
                          {service.metrics.slice(0, 3).map((m, mIdx) => (
                            <div key={mIdx} className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B]/70">
                              <div className="text-xs sm:text-sm font-mono font-bold text-white">
                                {m.value}
                              </div>
                              <div className="text-[10px] font-mono text-[#64748B] truncate">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-5 border-t border-[#1E293B] flex items-center justify-between gap-4">
                      <button
                        onClick={() => onNavigate(`/services/${service.slug}/`)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Full Service Specification</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenBooking({ service: service.title })}
                        className="px-3.5 py-1.5 rounded-lg bg-[#2563EB]/10 hover:bg-[#2563EB]/20 border border-[#2563EB]/30 text-xs font-mono text-[#60A5FA] transition-all cursor-pointer"
                      >
                        Book Diagnostic
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
        </div>
      </section>

      {/* 3. BOTTOM CONVERSION CTA */}
      <section className="py-20 bg-[#070B14] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#070B14] border border-[#1E293B] p-8 sm:p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/10 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/10 px-3 py-1 rounded border border-[#2563EB]/20">
                INITIATE DIAGNOSTIC
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Unsure Which Discipline to Deploy First?
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Schedule an architectural discovery session. Our principal growth engineers will inspect your crawl logs, paid media telemetry, and conversion friction to recommend an optimal phased sequence.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button
                onClick={() => onOpenBooking({ interest: 'Multi-Discipline Growth Audit' })}
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

export const ServicesIndex = ServicesIndexTemplate;
