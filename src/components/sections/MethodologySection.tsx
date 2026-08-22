'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { GitCommit, ArrowRight, CheckCircle2, Terminal, Code2, Database, Zap, LineChart } from 'lucide-react';

export interface MethodologySectionProps {
  onNavigate?: (path: string) => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onNavigate }) => {
  const phases = [
    {
      step: '01',
      title: 'Diagnostic Telemetry & Server Crawl',
      duration: 'Weeks 1–2',
      icon: Terminal,
      description: 'Ingesting raw server access logs, verifying GSC query exports in BigQuery, and isolating crawl waste.',
      outputs: ['Server Log Analysis Report', 'First-Party CAPI Audit', 'Zero-Click Entity Diagnostic'],
    },
    {
      step: '02',
      title: 'Architectural Blueprint & Schema Graph',
      duration: 'Weeks 3–4',
      icon: Code2,
      description: 'Engineering semantic JSON-LD entity structures, programmatic taxonomy routes, and bidding models.',
      outputs: ['Schema Entity Graph', 'Programmatic Template Specs', 'Paid ABM Targeting Matrix'],
    },
    {
      step: '03',
      title: 'Edge Deployment & Code Integration',
      duration: 'Weeks 5–8',
      icon: Zap,
      description: 'Deploying sub-second Cloudflare Edge workers, fixing Core Web Vitals, and rolling out BOFU technical assets.',
      outputs: ['Edge Caching Pipelines', 'LCP < 1.2s Milestone', 'High-Intent BOFU Articles'],
    },
    {
      step: '04',
      title: 'Algorithmic Scaling & Bid Automation',
      duration: 'Weeks 9–12',
      icon: LineChart,
      description: 'Activating server-side CAPI event streams, automated CAC circuit breakers, and expansion keyword clusters.',
      outputs: ['Automated Bidding Scripts', 'CAC Variance Circuit Breakers', 'Perplexity Citation Lift'],
    },
    {
      step: '05',
      title: 'Attribution Governance & Telemetry',
      duration: 'Ongoing Sprints',
      icon: Database,
      description: 'Continuous econometric MMM modeling, monthly log audits, and deterministic pipeline attribution reports.',
      outputs: ['BigQuery Telemetry Sync', 'Monthly Code Pull Requests', 'Econometric CAC Attribution'],
    },
  ];

  return (
    <section id="methodology-section" className="py-20 sm:py-28 bg-[#070B14] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <GitCommit className="w-3.5 h-3.5 text-[#3B82F6]" />
              Engineering Protocol
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              The 5-Phase Growth Execution Protocol
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              A standardized, deterministic roadmap replacing chaotic marketing campaigns with structured release sprints.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('/process/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors group cursor-pointer"
            >
              <span>Explore Detailed Process</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </ScrollReveal>

        {/* 5-Phase Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all flex flex-col justify-between h-full space-y-4 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                        PHASE {phase.step}
                      </span>
                      <Icon className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] transition-colors" />
                    </div>

                    <div className="text-[11px] font-mono text-emerald-400 font-medium">
                      {phase.duration}
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {phase.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1E293B] space-y-1.5">
                    <div className="text-[10px] font-mono text-[#64748B] uppercase">Key Deliverables:</div>
                    {phase.outputs.map((out, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
                        <CheckCircle2 className="w-3 h-3 text-[#3B82F6] shrink-0" />
                        <span className="truncate">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
