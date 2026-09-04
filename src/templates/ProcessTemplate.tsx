'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  ProcessPhasesSection,
  DeliverablesSection,
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
