'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  ProcessPhasesSection,
  DeliverablesSection,
  FAQAccordionSection,
  ConversionCTASection,
} from '../components/sections';
import { ProcessPhase } from '../models';
import {
  Layers,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface ProcessTemplateProps {
  phases?: ProcessPhase[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const ProcessTemplate: React.FC<ProcessTemplateProps> = ({
  phases: propPhases,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const service = provider.getServiceBySlug('technical-seo');
  const phases = propPhases || service?.processPhases || [
    {
      step: '01',
      title: 'Telemetry Diagnostic & Crawl Forensics',
      duration: 'Week 1–2',
      description:
        'Deep-packet inspection of raw server logs, Google Search Console API datasets, and ad platform attribution pipelines.',
      keyOutputs: ['Server Log Analysis Report', 'Crawl Budget Forensic Audit', 'Attribution Gap Matrix'],
    },
    {
      step: '02',
      title: 'Information Architecture & Entity Mapping',
      duration: 'Week 3–4',
      description:
        'Schema.org graph structuring, topical entity vector clustering, and high-intent keyword intent mapping.',
      keyOutputs: ['Schema Entity Graph Architecture', 'Topical Cluster Roadmap', 'URL Taxonomy Map'],
    },
    {
      step: '03',
      title: 'Production Engineering & Implementation',
      duration: 'Week 5–8',
      description:
        'Direct Next.js / Vite code pull requests, Core Web Vitals optimization, and server-side tracking container deployment.',
      keyOutputs: ['GitHub Pull Requests', 'Sub-second LCP Assets', 'Server-side GTM Container'],
    },
    {
      step: '04',
      title: 'Algorithmic Retrieval & Answer Optimization',
      duration: 'Ongoing',
      description:
        'Perplexity citation optimization, zero-click LLM snippet engineering, and technical authority expansion.',
      keyOutputs: ['Answer Engine Visibility Tracker', 'Citation Graph Expansion', 'Weekly Telemetry Dashboards'],
    },
  ];

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="static"
        canonicalUrl="https://matricsmania.com/process/"
        title="5-Phase Engineering Protocol & Methodology | MatricsMania"
        description="The deterministic methodology for engineering scalable organic retrieval, conversion acceleration, and paid efficiency."
      />

      {/* Hero */}
      <PageHeroSection
        eyebrow="The MatricsMania Operating System"
        title="Deterministic 5-Phase Growth Protocol"
        subtitle="We replace random marketing guesswork with a disciplined, milestone-driven engineering methodology tested across complex tech architectures."
        primaryCtaLabel="Schedule Diagnostic Kickoff Call"
        onPrimaryCta={() => onOpenBooking({ interest: 'Engineering Protocol Consultation' })}
        secondaryCtaLabel="View Sample Deliverables"
        onSecondaryCta={() => {
          const el = document.getElementById('process-phases');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Phased Steps */}
      <div id="process-phases">
        <ProcessPhasesSection
          title="The 5-Phase Execution Architecture"
          subtitle="A battle-tested cadence with explicit deliverables, verifiable code pull requests, and deterministic milestones."
          phases={phases}
        />
      </div>

      {/* SLAs and Operational Guarantees */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              Operational Discipline
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Our 4 Engineering Standards
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Direct Code Commits',
                desc: 'We submit tested GitHub pull requests rather than sending 80-page slide decks of recommendations.',
              },
              {
                title: 'Data Sovereignty',
                desc: 'You own 100% of BigQuery databases, analytics containers, ad accounts, and creative assets.',
              },
              {
                title: 'Zero Vanity Metrics',
                desc: 'We measure pipeline velocity, qualified revenue opportunities, and marginal customer acquisition costs.',
              },
              {
                title: 'Weekly Sprint Demos',
                desc: 'Structured 30-minute weekly sprint checkpoints reviewing deployed code and attribution deltas.',
              },
            ].map((std, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#60A5FA]">STANDARD 0{idx + 1}</div>
                <h3 className="text-base font-bold text-white">{std.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordionSection
        title="Protocol & Engagement FAQs"
        subtitle="Common questions about kickoff timeframes, technical access, and team bandwidth requirements."
        faqs={[
          {
            question: 'How much developer time is required from our internal engineering team?',
            answer:
              'Minimal. Our team operates directly inside your staging and production environments via PR reviews, requiring only standard code-review approval from your technical lead.',
          },
          {
            question: 'What happens during Phase 01 Diagnostic?',
            answer:
              'We connect to your GSC, Google Analytics, ad platforms, and server logs to construct a complete baseline attribution matrix before any changes are deployed.',
          },
          {
            question: 'Can this protocol be customized for our release cycle?',
            answer:
              'Yes. Our sprints synchronize with your bi-weekly or monthly release cycles, whether you deploy on Vercel, AWS, or custom Kubernetes clusters.',
          },
        ]}
      />

      {/* CTA */}
      <ConversionCTASection
        title="Initiate Your Growth Engineering Roadmap"
        subtitle="Schedule a 30-minute diagnostic session to assess your current marketing infrastructure and roadmap feasibility."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'Phase 1 Diagnostic Inquiry' }}
      />
    </div>
  );
};
