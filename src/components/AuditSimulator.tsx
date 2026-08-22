'use client';

import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { AuditResult } from '../types';

interface AuditSimulatorProps {
  onOpenBooking: (prefillInfo?: { domain: string; auditScore: number }) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AuditSimulator: React.FC<AuditSimulatorProps> = ({ onOpenBooking, onShowToast }) => {
  const [domain, setDomain] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleaned = domain.trim().toLowerCase();
    if (!cleaned) {
      onShowToast('Please enter a domain', 'e.g. mycompany.com', 'error');
      return;
    }
    cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '');

    setIsScanning(true);
    setResult(null);

    const steps = [
      'Connecting to Google PageSpeed API & Core Web Vitals...',
      'Analyzing semantic schema & meta tag hierarchy...',
      'Auditing mobile viewport responsiveness & layout shifts...',
      'Evaluating ad conversion tracking pixels & server endpoints...',
      'Generating MatricsMania 5-Point Performance Report...',
    ];

    let currentStep = 0;
    setScanStep(steps[0]);

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < steps.length) {
        setScanStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        generateMockAudit(cleaned);
      }
    }, 800);
  };

  const generateMockAudit = (targetDomain: string) => {
    // Deterministic scores based on domain string length or random
    const hash = targetDomain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const overallScore = 62 + (hash % 24);
    const seoScore = 65 + (hash % 25);
    const performanceScore = 58 + (hash % 30);
    const securityScore = 90 + (hash % 10);
    const conversionScore = 54 + (hash % 28);

    const auditData: AuditResult = {
      domain: targetDomain,
      overallScore,
      seoScore,
      performanceScore,
      securityScore,
      conversionScore,
      estimatedTrafficBoost: `+${(120 + (hash % 180))}%`,
      issues: [
        {
          type: 'critical',
          title: 'Missing Server-Side Conversions API (CAPI)',
          description: 'Ad pixels are losing up to 28% of user conversions due to browser privacy restrictions.',
        },
        {
          type: 'critical',
          title: 'Slow Largest Contentful Paint (LCP: 3.4s)',
          description: 'Mobile page load delay causes ~35% user drop-off before page renders.',
        },
        {
          type: 'warning',
          title: 'Incomplete OpenGraph & Schema Markup',
          description: 'Lacks Organization & Product schema required for Google AI Overview features.',
        },
        {
          type: 'pass',
          title: 'SSL/TLS Security Encryption Active',
          description: '256-bit encryption and HTTPS redirect configured properly.',
        },
      ],
    };

    setResult(auditData);
    onShowToast('Audit Completed!', `Analyzed ${targetDomain} successfully.`, 'success');
  };

  return (
    <div className="w-full bg-[#0D1424] border border-[#1E293B] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold bg-[#131D33] text-[#60A5FA] px-3.5 py-1 rounded-full border border-[#1E293B]">
          <Search className="w-3.5 h-3.5" /> Free Instant Audit Tool
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Scan Your Website’s SEO &amp; Conversion Health
        </h3>
        <p className="text-[#94A3B8] text-sm max-w-xl mx-auto">
          Enter your website URL to instantly check page load speed, ad tracking integrity, and organic search ranking vulnerabilities.
        </p>

        {/* Input Form */}
        <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-2">
          <div className="relative flex-1">
            <label htmlFor="audit-domain-input" className="sr-only">
              Website Domain for Audit
            </label>
            <input
              id="audit-domain-input"
              type="text"
              aria-label="Website Domain for Audit"
              placeholder="Enter domain (e.g. mycompany.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isScanning}
              className="w-full px-4 py-3.5 pl-11 rounded-xl bg-[#070B14] border border-[#1E293B] text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:opacity-50"
            />
            <Search className="w-4 h-4 text-[#60A5FA] absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] active:scale-[0.98]"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <span>Run Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Progress View */}
      {isScanning && (
        <div className="max-w-md mx-auto my-6 p-6 bg-[#070B14] rounded-xl border border-[#1E293B] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#131D33] text-[#60A5FA] flex items-center justify-center mx-auto border border-[#1E293B] animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm font-medium text-white">{scanStep}</p>
          <div className="w-full bg-[#131D33] h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] h-full w-3/4 animate-pulse rounded-full" />
          </div>
        </div>
      )}

      {/* Audit Result View */}
      {result && !isScanning && (
        <div className="space-y-6 pt-4 animate-fade-in">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 bg-[#070B14] p-5 rounded-2xl border border-[#1E293B] flex flex-col justify-center items-center text-center">
              <span className="text-xs uppercase font-bold text-[#94A3B8] mb-1">Overall Health Score</span>
              <div
                className={`text-5xl font-black ${
                  result.overallScore >= 80
                    ? 'text-[#10B981]'
                    : result.overallScore >= 60
                    ? 'text-[#60A5FA]'
                    : 'text-[#F87171]'
                }`}
              >
                {result.overallScore}
                <span className="text-xl text-[#94A3B8] font-normal">/100</span>
              </div>
              <span className="text-xs text-[#10B981] font-semibold mt-2">
                Potential Traffic Surge: {result.estimatedTrafficBoost}
              </span>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 gap-3">
              <div className="bg-[#070B14] p-4 rounded-xl border border-[#1E293B]">
                <span className="text-[11px] font-semibold text-[#94A3B8]">SEO Architecture</span>
                <div className="text-xl font-bold text-[#60A5FA] mt-1">{result.seoScore}/100</div>
              </div>
              <div className="bg-[#070B14] p-4 rounded-xl border border-[#1E293B]">
                <span className="text-[11px] font-semibold text-[#94A3B8]">Core Web Vitals</span>
                <div className="text-xl font-bold text-[#8B5CF6] mt-1">{result.performanceScore}/100</div>
              </div>
              <div className="bg-[#070B14] p-4 rounded-xl border border-[#1E293B]">
                <span className="text-[11px] font-semibold text-[#94A3B8]">Ad Pixel Integrity</span>
                <div className="text-xl font-bold text-[#60A5FA] mt-1">{result.conversionScore}/100</div>
              </div>
              <div className="bg-[#070B14] p-4 rounded-xl border border-[#1E293B]">
                <span className="text-[11px] font-semibold text-[#94A3B8]">Security &amp; HTTPS</span>
                <div className="text-xl font-bold text-[#10B981] mt-1">{result.securityScore}/100</div>
              </div>
            </div>
          </div>

          {/* Key Audit Findings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8]">
              Audit Findings &amp; Action Plan for <span className="text-white">{result.domain}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    issue.type === 'critical'
                      ? 'bg-[#EF4444]/10 border-[#EF4444]/30'
                      : issue.type === 'warning'
                      ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30'
                      : 'bg-[#10B981]/10 border-[#10B981]/30'
                  }`}
                >
                  {issue.type === 'critical' && <ShieldAlert className="w-5 h-5 text-[#F87171] shrink-0 mt-0.5" />}
                  {issue.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />}
                  {issue.type === 'pass' && <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />}

                  <div className="text-xs">
                    <p className="font-bold text-white text-sm">{issue.title}</p>
                    <p className="text-[#94A3B8] mt-1">{issue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-5 bg-[#070B14] text-white rounded-2xl border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Want Our Senior Engineers To Fix These Issues?</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Book a 1-on-1 growth consultation to receive a full 15-page technical roadmap.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking({ domain: result.domain, auditScore: result.overallScore })}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shrink-0 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              Get Full Fix Strategy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
