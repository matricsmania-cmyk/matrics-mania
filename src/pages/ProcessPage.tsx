import React from 'react';
import { PageType } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, ArrowRight, Zap, Target, BarChart3, RefreshCw, CheckCircle2, Search, Cpu, Clock, Layers } from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate, onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      phase: 'Diagnostic & Forensic Audit',
      timeframe: 'Days 1 – 7',
      title: 'Full-Stack Data & Market Forensic Audit',
      description: 'We dismantle your existing marketing infrastructure to locate leakages, attribution discrepancies, and high-leverage growth opportunities.',
      deliverables: [
        '500+ Point Technical SEO & Core Web Vitals crawl',
        'Server-Side CAPI & GA4 attribution reconciliation audit',
        'Competitor market-gap and topical authority mapping',
        'Ad account structure & creative decay diagnostics',
      ],
      icon: <Search className="w-6 h-6 text-[#60A5FA]" />,
    },
    {
      number: '02',
      phase: 'Strategic Modeling',
      timeframe: 'Days 8 – 14',
      title: 'Mathematical Growth Blueprint & CAC Modeling',
      description: 'We construct predictive financial models connecting your target customer lifetime value (LTV), margin thresholds, and scalable acquisition channels.',
      deliverables: [
        '90-Day revenue roadmap with milestone KPI targets',
        'Customer persona clustering and high-intent keyword matrix',
        'Creative messaging matrix & landing page wireframes',
        'Live Looker Studio executive dashboard architecture',
      ],
      icon: <Layers className="w-6 h-6 text-[#60A5FA]" />,
    },
    {
      number: '03',
      phase: 'Agile Execution',
      timeframe: 'Days 15 – 60',
      title: 'High-Velocity Sprints & Multi-Channel Deployment',
      description: 'We deploy rapid multi-variant campaigns, semantic content clusters, and technical website optimizations in bi-weekly testing sprints.',
      deliverables: [
        'Semantic content publication & PR authority building',
        'High-ROAS Meta, Google & LinkedIn ad launches',
        'Continuous conversion rate optimization (CRO) A/B tests',
        'Weekly video walkthroughs & transparent sprint reviews',
      ],
      icon: <Zap className="w-6 h-6 text-[#60A5FA]" />,
    },
    {
      number: '04',
      phase: 'Algorithmic Scaling',
      timeframe: 'Day 60 & Beyond',
      title: 'Predictive Scaling & Category Dominance',
      description: 'Once unit economics are validated, we scale budget aggressively into winning cohorts while maintaining strict blended ROAS and CAC efficiency.',
      deliverables: [
        'Algorithmic bid scaling on top-performing creative assets',
        'Expansion into ancillary search queries & regional hubs',
        'Automated CRM nurturing & retargeting automation',
        'Continuous market dominance & LTV expansion modeling',
      ],
      icon: <Cpu className="w-6 h-6 text-[#60A5FA]" />,
    },
  ];

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            The 4-Stage Engine That Turns Marketing Into <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Predictable Math</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            We don’t rely on luck, guesswork, or generic templates. Here is the exact scientific framework we deploy to engineer category-defining growth for our partners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#60A5FA]" /> 90-Day Validation Sprints
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Data Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#60A5FA]" /> Real-Time Looker Dashboards
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              delay={index * 0.08}
              className="p-8 sm:p-10 rounded-2xl bg-[#0D1424] border border-[#1E293B] transition-all hover:border-[#2563EB]/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Step Marker */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-[#60A5FA] font-mono">
                      {step.number}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                        {step.phase}
                      </span>
                      <p className="text-xs text-[#94A3B8] font-mono">
                        {step.timeframe}
                      </p>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#131D33] flex items-center justify-center border border-[#1E293B]">
                    {step.icon}
                  </div>
                </div>

                {/* Content & Deliverables */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1E293B]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                      Key Deliverables & Milestones:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-white">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SLA & PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 sm:p-12 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Our Service Level Guarantee
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">
            Zero Handcuffs. Total Transparency. High-Touch Partnership.
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            We operate in weekly sprints with direct Slack/Teams access, async video recaps, and live dashboard reporting. If we do not hit agreed-upon validation milestones in the first 90 days, you can exit anytime.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <span>Schedule Process Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
