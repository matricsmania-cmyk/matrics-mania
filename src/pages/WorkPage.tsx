import React, { useState, useEffect } from 'react';
import { PageType, WorkProject } from '../types';
import { WORK_PROJECTS_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Filter,
  Calendar,
  X,
  Code2,
  BarChart3,
  Cpu,
  ShoppingBag,
  Target,
  Search,
  BookOpen,
} from 'lucide-react';

interface WorkPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillInfo?: any) => void;
  slug?: string | null;
  onSlugChange?: (slug: string | null) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate, onOpenBooking, slug, onSlugChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<WorkProject | null>(null);

  useEffect(() => {
    document.title = 'Our Work & Growth Deliverables Portfolio | MatricsMania';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (slug) {
      const found = WORK_PROJECTS_DATA.find((p) => p.id === slug);
      if (found) {
        setActiveProjectModal(found);
      }
    } else {
      setActiveProjectModal(null);
    }
  }, [slug]);

  const categories = [
    'all',
    'Paid Creative & Ads',
    'Web & CRO',
    'SEO & Content Systems',
    'Brand & Motion',
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? WORK_PROJECTS_DATA
      : WORK_PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const stats = [
    { value: '180+', label: 'Shipped Campaigns & Storefronts' },
    { value: '4.8x', label: 'Average Blended Portfolio ROAS' },
    { value: '<0.8s', label: 'Average Core Web Vitals LCP' },
    { value: '100%', label: 'Attributed Revenue Tracking' },
  ];

  const matchedProject = slug ? WORK_PROJECTS_DATA.find((p) => p.id === slug) : null;

  if (matchedProject) {
    return (
      <div className="bg-[#070B14] text-white min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back Navigation */}
          <button
            onClick={() => {
              if (onSlugChange) onSlugChange(null);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to All Portfolio Work</span>
          </button>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0D1424] text-[#60A5FA] border border-[#1E293B]">
                {matchedProject.category}
              </span>
              <span className="text-xs font-semibold text-[#94A3B8]">
                Client: {matchedProject.client}
              </span>
              <span className="text-xs text-[#94A3B8]">•</span>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {matchedProject.industry}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {matchedProject.title}
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-3xl">
              {matchedProject.summary}
            </p>
          </div>

          {/* Visual Hero Banner */}
          <div className="rounded-3xl overflow-hidden h-64 sm:h-96 border border-[#1E293B] shadow-md bg-[#0D1424]">
            <OptimizedImage
              src={matchedProject.thumbnail}
              alt={matchedProject.title}
              widthParam={1200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Impact Metric Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] block">
                Primary Deliverable Impact
              </span>
              <p className="text-sm text-[#94A3B8] mt-1">
                Attributed conversion uplift and growth metrics verified post-launch.
              </p>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {matchedProject.keyMetric.value} <span className="text-[#60A5FA] text-lg sm:text-xl font-bold">{matchedProject.keyMetric.label}</span>
            </div>
          </div>

          {/* Before & After Comparison */}
          {matchedProject.beforeAfter && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-rose-500/20 space-y-2">
                <span className="font-bold text-rose-400 block uppercase text-xs tracking-wider">
                  Before Implementation:
                </span>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {matchedProject.beforeAfter.before}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-emerald-500/20 space-y-2">
                <span className="font-bold text-emerald-400 block uppercase text-xs tracking-wider">
                  After MatricsMania Architecture:
                </span>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-semibold">
                  {matchedProject.beforeAfter.after}
                </p>
              </div>
            </div>
          )}

          {/* Detailed Scope Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Delivered Scope & Key Implementation Milestones
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Full breakdown of execution pipelines, custom tooling, and architectural strategies delivered.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedProject.scope.map((item, sidx) => (
                <li
                  key={sidx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Editorial Engineering Insights Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-8">
            <div className="space-y-2 border-b border-[#1E293B] pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
                Tactical Deep Dive
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Engineering the Modern Inbound Demand Engine
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                How we solved high customer acquisition costs (CAC) and lead drop-offs by eliminating manual scheduling bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center font-black text-xs">
                  01
                </div>
                <h3 className="font-bold text-white text-sm">
                  Dynamic LinkedIn ABM Targeting
                </h3>
                <p>
                  Instead of standard wide-spectrum demographic profiling, we engineered dynamic list synchronization using client CRM data. High-intent target accounts were dynamically matched against custom-designed LinkedIn video and carousels, guaranteeing 100% decision-maker visibility.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center font-black text-xs">
                  02
                </div>
                <h3 className="font-bold text-white text-sm">
                  Interactive Sandbox Demo Funnel
                </h3>
                <p>
                  We replaced static PDFs and lengthy demo screens with an instant, interactive product sandbox on a specialized Next.js micro-site. Prospects walked through key value streams inside an elegant mockup UI, reaching "Aha!" moments in under 30 seconds.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center font-black text-xs">
                  03
                </div>
                <h3 className="font-bold text-white text-sm">
                  Automated Qualification & Routing
                </h3>
                <p>
                  Built direct server-side integrations connecting user engagement telemetry to HubSpot pipelines. Qualified accounts instantly unlocked calendar bookings with matching account executives, while colder traffic entered customized nurture sequences automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack & Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              Engineered Tech Stack & Marketing Tooling
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedProject.tools.map((t, tidx) => (
                <span
                  key={tidx}
                  className="text-xs px-4 py-1.5 rounded-xl bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                onOpenBooking({ projectInterest: matchedProject.title });
              }}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer text-center"
            >
              Request Custom Proposal for this Scope
            </button>
            {matchedProject.caseStudyId && (
              <button
                onClick={() => {
                  onNavigate('case-studies');
                }}
                className="py-4 px-6 rounded-2xl bg-[#0D1424] text-white hover:bg-[#070B14] font-black text-xs sm:text-sm transition-all cursor-pointer text-center border border-[#1E293B]"
              >
                View Analytical Case Study Report
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070B14] text-white space-y-16 pb-24">
      {/* 1. HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-tight">
            Our Work: Deliverables <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Engineered to Convert</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of high-converting storefronts, paid ad creative suites, AI search content silos, and performance funnels built for ambitious brands.
          </p>

          {/* Quick Hub Navigation Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('case-studies')}
              className="px-5 py-2.5 rounded-xl bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B] text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Looking for Data Deep Dives? View Case Studies (/case-studies) →</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-md shadow-blue-500/20'
                    : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white hover:border-[#60A5FA]/40'
                }`}
              >
                {cat === 'all' ? 'All Portfolio Work' : cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Deliverable Metrics */}
        <ScrollReveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA]">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-[#94A3B8] mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* 2. PROJECT SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              delay={idx * 0.06}
              className="rounded-3xl bg-[#0D1424] border border-[#1E293B] hover:border-[#60A5FA]/40 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md group"
            >
              {/* Image Preview */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-[#070B14]">
                <OptimizedImage
                  src={project.thumbnail}
                  alt={project.title}
                  widthParam={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/80 text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="text-xs font-black px-3 py-1 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white shadow-md">
                    {project.keyMetric.value} {project.keyMetric.label}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#60A5FA] font-semibold">
                    <span>{project.client}</span>
                    <span className="text-[#94A3B8]">{project.industry}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#60A5FA] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Tools Tags */}
                <div className="space-y-4 pt-4 border-t border-[#1E293B]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((tool, tidx) => (
                      <span
                        key={tidx}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#070B14] text-[#94A3B8] border border-[#1E293B] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#070B14] text-[#60A5FA] border border-[#1E293B] font-semibold">
                        +{project.tools.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        setActiveProjectModal(project);
                        if (onSlugChange) onSlugChange(project.id);
                      }}
                      className="text-xs font-bold text-[#60A5FA] hover:text-[#8B5CF6] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Deliverable Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.caseStudyId && (
                      <button
                        onClick={() => onNavigate('case-studies')}
                        className="text-[11px] font-semibold text-[#94A3B8] hover:underline cursor-pointer"
                      >
                        Full Case Study →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. CASE STUDIES DIRECTORY PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 md:p-12 rounded-3xl bg-[#0D1424] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Looking for Analytical Case Studies?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore Complete Business Growth Breakdowns
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Read step-by-step transformation reports featuring client challenges, full architecture blueprints, verified client quotes, and hard financial attribution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('case-studies')}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View All Case Studies (/case-studies)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenBooking({ serviceInterest: 'Portfolio Strategy Review' })}
              className="px-6 py-4 rounded-xl border border-[#1E293B] hover:border-[#60A5FA]/40 text-xs font-bold text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-center"
            >
              Book Deliverables Review
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. DELIVERABLE DETAILS MODAL */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D1424] border border-[#1E293B] p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            {/* Close Button */}
            <button
              onClick={() => {
                setActiveProjectModal(null);
                if (onSlugChange) onSlugChange(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#070B14] hover:bg-[#1E293B] text-white border border-[#1E293B] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                  {activeProjectModal.category}
                </span>
                <span className="text-xs font-semibold text-[#94A3B8]">
                  {activeProjectModal.client}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {activeProjectModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                {activeProjectModal.summary}
              </p>
            </div>

            {/* Visual Thumbnail */}
            <div className="rounded-2xl overflow-hidden h-48 border border-[#1E293B]">
              <OptimizedImage
                src={activeProjectModal.thumbnail}
                alt={activeProjectModal.title}
                widthParam={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Metric Highlight */}
            <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8]">
                Primary Deliverable Impact
              </span>
              <span className="text-lg font-black text-[#60A5FA]">
                {activeProjectModal.keyMetric.value} {activeProjectModal.keyMetric.label}
              </span>
            </div>

            {/* Before vs After */}
            {activeProjectModal.beforeAfter && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#070B14] border border-rose-500/20 space-y-1">
                  <span className="font-bold text-rose-400 block uppercase text-[10px]">
                    Before Implementation:
                  </span>
                  <p className="text-[#94A3B8] leading-relaxed">
                    {activeProjectModal.beforeAfter.before}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#070B14] border border-emerald-500/20 space-y-1">
                  <span className="font-bold text-emerald-400 block uppercase text-[10px]">
                    After MatricsMania Architecture:
                  </span>
                  <p className="text-white leading-relaxed font-medium">
                    {activeProjectModal.beforeAfter.after}
                  </p>
                </div>
              </div>
            )}

            {/* Scope of Work */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Delivered Scope & Implementation:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProjectModal.scope.map((item, sidx) => (
                  <li
                     key={sidx}
                     className="flex items-start gap-2 text-xs text-[#94A3B8]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="space-y-2 pt-2 border-t border-[#1E293B]">
              <span className="text-[11px] font-bold text-[#94A3B8] block uppercase">
                Tools & Tech Stack Used:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProjectModal.tools.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="text-xs px-3 py-1 rounded-lg bg-[#070B14] border border-[#1E293B] text-white font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1E293B]">
              <button
                onClick={() => {
                  const title = activeProjectModal.title;
                  setActiveProjectModal(null);
                  if (onSlugChange) onSlugChange(null);
                  onOpenBooking({ projectInterest: title });
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer text-center"
              >
                Request Custom Proposal for this Scope
              </button>
              {activeProjectModal.caseStudyId && (
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    if (onSlugChange) onSlugChange(null);
                    onNavigate('case-studies');
                  }}
                  className="py-3 px-5 rounded-xl bg-transparent hover:bg-[#070B14] border border-[#1E293B] text-white font-bold text-xs transition-all cursor-pointer text-center"
                >
                  View Case Study Report →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
