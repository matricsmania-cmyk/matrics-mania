'use client';

import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { ShieldCheck, CheckCircle2, Lock, Cpu, Server, FileCheck, Terminal, Award } from 'lucide-react';

export interface CredibilityEvidenceSectionProps {
  className?: string;
}

export const CredibilityEvidenceSection: React.FC<CredibilityEvidenceSectionProps> = ({
  className = '',
}) => {
  const standards = [
    {
      title: 'W3C & Schema.org Compliant',
      spec: 'Entity JSON-LD Graphs',
      description: 'Validated against Schema.org 24.0 specifications with zero semantic syntax errors.',
      status: 'VERIFIED STANDARD',
    },
    {
      title: 'Google Core Web Vitals',
      spec: 'LCP < 1.2s • INP < 50ms • CLS 0.00',
      description: 'Edge-rendered static HTML and minimal client-side hydration for maximum crawl efficiency.',
      status: 'VERIFIED STANDARD',
    },
    {
      title: 'Server-Side CAPI Protocol',
      spec: 'Zero Third-Party Pixel Loss',
      description: 'First-party webhook architecture bypassing ad-blocker drop-offs and iOS privacy limits.',
      status: 'VERIFIED STANDARD',
    },
    {
      title: 'Attribution & MMM Modeling',
      spec: 'Raw BigQuery Event Logs',
      description: 'Eliminates platform-biased reporting using Bayesian econometric incrementality models.',
      status: 'VERIFIED STANDARD',
    },
  ];

  const integrations = [
    { name: 'Google Cloud BigQuery', role: 'Raw Event Telemetry' },
    { name: 'Cloudflare Edge Workers', role: 'Sub-Second Dynamic Routing' },
    { name: 'Snowflake Data Cloud', role: 'Enterprise Data Lakes' },
    { name: 'Search Console API', role: 'Unsampled Query Ingestion' },
    { name: 'GA4 Measurement Protocol', role: 'Server-Side Event Ingestion' },
    { name: 'Segment / RudderStack', role: 'Customer Data Infrastructure' },
  ];

  return (
    <section id="credibility-evidence-section" className={`py-16 sm:py-20 bg-[#070B14] border-b border-[#1E293B] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Transparency Notice */}
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            Verified Technical Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Architecture-Level Reliability &amp; Compliance
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            We adhere strictly to open-source protocols, server-side data governance, and verifiable web standards.
          </p>
        </ScrollReveal>

        {/* 4 Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {standards.map((s, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.07}>
              <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-colors flex flex-col justify-between h-full space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#070B14] text-emerald-400 border border-emerald-500/20">
                      {s.status}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{s.title}</h3>
                  <div className="text-xs font-mono text-[#60A5FA]">{s.spec}</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{s.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Verified Toolchain Bar */}
        <ScrollReveal delay={0.15}>
          <div className="p-6 rounded-2xl bg-[#050811] border border-[#1E293B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-[#3B82F6]" />
                <span>Enterprise Data &amp; Infrastructure Ecosystem</span>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">Zero Vendor Lock-In</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B] text-center space-y-1"
                >
                  <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                  <div className="text-[10px] font-mono text-[#94A3B8] truncate">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Transparent Ethics / Placeholder Notice */}
        <ScrollReveal delay={0.2}>
          <div className="mt-6 px-4 py-3 rounded-xl bg-[#0D1424]/40 border border-[#1E293B]/60 flex items-center justify-center gap-2 text-[11px] font-mono text-[#64748B] text-center">
            <Lock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            <span>
              Evidence Protocol: All production data is protected by strict client NDAs. We do not display fabricated customer logos or simulated vanity awards.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
