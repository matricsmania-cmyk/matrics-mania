'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from '../ScrollReveal';
import { Layers, Search, BookOpen, Target, Zap, BarChart3, ArrowRight, Check } from 'lucide-react';

export interface FivePillarsSectionProps {
  onNavigate?: (path: string) => void;
}

export const FivePillarsSection: React.FC<FivePillarsSectionProps> = ({ onNavigate }) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'pillar-seo',
      code: 'PILLAR 01',
      title: 'Search & Organic Architecture',
      slug: 'seo-growth',
      icon: Search,
      headline: 'Algorithmic Crawl Budget & Entity Retrieval',
      description:
        'We construct programmatic page generation, log-file crawl optimization, and Schema.org entity graphs to ensure deterministic search engine indexation.',
      keyCapabilities: [
        'Log-file crawl budget reclamation',
        'Entity JSON-LD semantic architecture',
        'Sub-second Core Web Vitals optimization',
        'High-intent comparison & BOFU capture',
      ],
      outputMetric: 'Zero crawl debt & 90%+ target indexation',
    },
    {
      id: 'pillar-content',
      code: 'PILLAR 02',
      title: 'Content Authority Systems',
      slug: 'content-authority',
      icon: BookOpen,
      headline: 'Original BOFU Research & AI Search Synthesis',
      description:
        'We publish verified data studies and bottom-of-funnel decision frameworks structured to be cited by Perplexity, SearchGPT, and technical buyers.',
      keyCapabilities: [
        'Original survey & benchmark publications',
        'Zero-click AI answer engine optimization',
        'Technical comparison & alternative matrix',
        'Author credentialing & schema markup',
      ],
      outputMetric: 'Direct citations across LLM search engines',
    },
    {
      id: 'pillar-paid',
      code: 'PILLAR 03',
      title: 'Performance Marketing',
      slug: 'performance-marketing',
      icon: Target,
      headline: 'Algorithmic Multi-Touch Paid Acquisition',
      description:
        'We engineer automated bidding scripts, server-side Conversion APIs (CAPI), and strict negative-intent keyword lists to eliminate ad-spend leakage.',
      keyCapabilities: [
        'Server-side CAPI webhook pipelines',
        'High-intent Search & LinkedIn ABM systems',
        'Automated CAC variance circuit breakers',
        'Landing page dynamic query parameter matching',
      ],
      outputMetric: 'Sub-30-day pipeline payback velocity',
    },
    {
      id: 'pillar-cro',
      code: 'PILLAR 04',
      title: 'Web CRO Engineering',
      slug: 'web-cro-engineering',
      icon: Zap,
      headline: 'Sub-Second Edge Rendering & Conversion Loops',
      description:
        'We engineer high-speed landing experiences on Cloudflare Edge Workers with Bayesian split-testing to remove friction from the checkout or lead flow.',
      keyCapabilities: [
        'Edge worker personalization without layout shift',
        'Micro-friction diagnostic & form velocity tuning',
        'Bayesian statistical hypothesis testing',
        'Zero-latency static asset hydration',
      ],
      outputMetric: '+25% to +45% verified conversion lift',
    },
    {
      id: 'pillar-intel',
      code: 'PILLAR 05',
      title: 'Growth Intelligence',
      slug: 'growth-intelligence',
      icon: BarChart3,
      headline: 'First-Party Telemetry & Attribution Graphs',
      description:
        'We pipe raw, unsampled user interactions into BigQuery and Snowflake, applying econometric Media Mix Modeling (MMM) to prove real revenue causation.',
      keyCapabilities: [
        'Raw BigQuery event stream pipelines',
        'Bayesian Marketing Mix Modeling (MMM)',
        'Server-side identity stitching',
        'Executive real-time revenue dashboards',
      ],
      outputMetric: '100% deterministic attribution accuracy',
    },
  ];

  const current = pillars[activePillar];

  return (
    <section id="five-pillars-section" className="py-20 sm:py-28 bg-[#050811] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
            Full-Funnel Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            The Five-Pillar Growth System
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Every pillar operates as an interconnected feedback loop. Organic search feeds high-intent audience data into paid acquisition, while CRO and telemetry maximize customer yield.
          </p>
        </ScrollReveal>

        {/* Pillar Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = activePillar === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-[#2563EB]/15 border-[#2563EB] text-white shadow-lg shadow-blue-500/10'
                    : 'bg-[#0D1424] border-[#1E293B] text-[#94A3B8] hover:border-[#2563EB]/40 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-[#60A5FA]">{p.code}</span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#60A5FA]' : 'text-[#64748B]'}`} />
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-2">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card Breakdown */}
        <ScrollReveal key={current.id}>
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1424] border border-[#1E293B] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
                    {current.code}
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">•</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{current.outputMetric}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {current.headline}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.keyCapabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs text-[#E2E8F0] font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleNav(`/services/${current.slug}/`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Explore {current.title} Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Architecture Code / Graph Spec Box */}
              <div className="lg:col-span-5 bg-[#070B14] rounded-2xl border border-[#1E293B] p-5 font-mono text-xs text-[#94A3B8] space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 text-[10px] text-[#64748B]">
                  <span className="text-[#60A5FA]">spec_{current.slug}.json</span>
                  <span className="text-emerald-400">ENGINEERING SLA</span>
                </div>
                <div className="space-y-1.5 text-[11px] leading-relaxed">
                  <div className="text-purple-400">"pillar_code": <span className="text-emerald-300">"{current.code}"</span>,</div>
                  <div className="text-purple-400">"target_discipline": <span className="text-emerald-300">"{current.title}"</span>,</div>
                  <div className="text-purple-400">"deployment_model": <span className="text-blue-300">"Continuous Edge Sync"</span>,</div>
                  <div className="text-purple-400">"data_pipelines": [</div>
                  <div className="pl-4 text-[#CBD5E1]">"BigQuery Raw Ingest", "Cloudflare Edge", "Schema.org Graph"</div>
                  <div className="text-purple-400">],</div>
                  <div className="text-purple-400">"verification": <span className="text-emerald-400">"Validated Audit Pull Request"</span></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
