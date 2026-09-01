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
  ShieldCheck,
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
  const allServices = propServices && propServices.length > 0 ? propServices : provider.getAllServices();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    allServices.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [allServices]);

  // Filter services by category and query
  const filteredServices = useMemo(() => {
    return allServices.filter((s) => {
      const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.serviceCode.toLowerCase().includes(q) ||
        s.deliverablesSummary.some((d) => d.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [allServices, selectedCategory, searchQuery]);

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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-[#60A5FA]">Services</span>
          </nav>

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
                  const el = document.getElementById('services-grid');
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

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section id="services-grid" className="py-8 border-b border-[#1E293B] bg-[#0A0F1D]/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/30'
                    : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                All Disciplines ({allServices.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/30'
                      : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities, deliverables..."
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES DIRECTORY GRID */}
      <section className="py-16 md:py-24 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
              <p className="text-[#94A3B8] text-sm">No services matched your query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[#2563EB] text-xs font-bold text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredServices.map((service, idx) => (
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
          )}
        </div>
      </section>

      {/* 4. SLA & GOVERNANCE COMMITMENTS */}
      <section className="py-16 md:py-20 border-t border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              Engineering Standard of Practice
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Deterministic Operating Principles
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Every growth service is governed by strict technical SLAs, verifiable code deliverables, and absolute client data ownership.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 01</span>
              <h3 className="text-lg font-bold text-white">Production Code PRs</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We deliver deployable code pull requests, JSON-LD schemas, and edge worker scripts directly to your GitHub/GitLab repositories. No non-actionable PDF decks.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 02</span>
              <h3 className="text-lg font-bold text-white">First-Party Telemetry</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We build direct server-side CAPI pipelines and centralized BigQuery warehouses so attribution is transparent, verifiable, and free of platform bias.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA]">PRINCIPLE 03</span>
              <h3 className="text-lg font-bold text-white">100% Asset Ownership</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                All tracking containers, data pipelines, ad accounts, and custom code modules remain in your company's full legal ownership at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CONVERSION CTA */}
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
