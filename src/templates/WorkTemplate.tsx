'use client';

import React, { useState, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConversionCTASection } from '../components/sections';
import { WorkProject } from '../models';
import {
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface WorkTemplateProps {
  projects?: WorkProject[];
  onNavigate?: (path: string) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const WorkTemplate: React.FC<WorkTemplateProps> = ({
  projects: propProjects,
  onNavigate: propNavigate,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allProjects = propProjects || provider.getAllWorkProjects();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return allProjects;
    return allProjects.filter((p) => p.category === selectedCategory);
  }, [allProjects, selectedCategory]);

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="static"
        canonicalUrl="https://matricsmania.com/work/"
        title="Client Work & Growth Evidence | MatricsMania Portfolio"
        description="Explore verified growth engineering outcomes, SEO organic traffic scale, and multi-million dollar revenue transformations delivered by MatricsMania."
      />

      {/* Hero */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase mx-auto">
            <Briefcase className="w-3.5 h-3.5 text-[#3B82F6]" />
            Systems Portfolio
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Engineered Work &amp; Deployed Architectures
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            A comprehensive catalog of enterprise search architectures, paid media attribution engines, and headless conversion systems.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4" role="toolbar" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
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
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20 bg-[#050811] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.08}>
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all flex flex-col justify-between h-full group space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                        {project.category}
                      </span>
                      {project.industry && (
                        <span className="text-xs font-mono text-[#64748B]">{project.industry}</span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">
                        {project.client}
                      </div>
                      <h2 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug mt-1">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Metric Outcome Badge */}
                    {project.keyMetric && (
                      <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                        <span className="text-xs text-[#94A3B8]">{project.keyMetric.label}:</span>
                        <span className="text-sm font-mono font-bold text-[#60A5FA]">
                          {project.keyMetric.value}
                        </span>
                      </div>
                    )}

                    {/* Stack Chips */}
                    {project.tools && project.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tools.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-[#070B14] border border-[#1E293B] text-[10px] font-mono text-[#94A3B8]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#1E293B] pt-4 flex items-center justify-between">
                    {project.caseStudyId ? (
                      <button
                        onClick={() => onNavigate(`/case-studies/${project.caseStudyId}/`)}
                        className="text-xs font-mono text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onOpenBooking({ interest: `Project inquiry: ${project.title}` })
                        }
                        className="text-xs font-mono text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire About This Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ConversionCTASection
        title="Have a Specific Systems Project in Mind?"
        subtitle="Schedule a technical scope review with our engineering leads to discuss requirements, architecture, and timeline."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'Custom Work & Systems Inquiry' }}
      />
    </div>
  );
};
