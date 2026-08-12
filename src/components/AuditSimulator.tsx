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
      'Generating Matricsmania 5-Point Performance Report...',
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
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
          <Search className="w-3.5 h-3.5" /> Free Instant Audit Tool
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Scan Your Website’s SEO & Conversion Health
        </h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Enter your website URL to instantly check page load speed, ad tracking integrity, and organic search ranking vulnerabilities.
        </p>

        {/* Input Form */}
        <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter domain (e.g. mycompany.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isScanning}
              className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
        <div className="max-w-md mx-auto my-6 p-6 bg-slate-800/90 rounded-xl border border-slate-700 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30 animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-200">{scanStep}</p>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-3/4 animate-pulse rounded-full" />
          </div>
        </div>
      )}

      {/* Audit Result View */}
      {result && !isScanning && (
        <div className="space-y-6 pt-4 animate-fade-in">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 bg-slate-800/90 p-5 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
              <span className="text-xs uppercase font-bold text-slate-400 mb-1">Overall Health Score</span>
              <div
                className={`text-5xl font-black ${
                  result.overallScore >= 80
                    ? 'text-emerald-400'
                    : result.overallScore >= 60
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {result.overallScore}
                <span className="text-xl text-slate-500 font-normal">/100</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold mt-2">
                Potential Traffic Surge: {result.estimatedTrafficBoost}
              </span>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 gap-3">
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400">SEO Architecture</span>
                <div className="text-xl font-bold text-blue-400 mt-1">{result.seoScore}/100</div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400">Core Web Vitals</span>
                <div className="text-xl font-bold text-amber-400 mt-1">{result.performanceScore}/100</div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400">Ad Pixel Integrity</span>
                <div className="text-xl font-bold text-purple-400 mt-1">{result.conversionScore}/100</div>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400">Security & HTTPS</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">{result.securityScore}/100</div>
              </div>
            </div>
          </div>

          {/* Key Audit Findings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Audit Findings & Action Plan for <span className="text-white">{result.domain}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    issue.type === 'critical'
                      ? 'bg-rose-950/30 border-rose-800/40'
                      : issue.type === 'warning'
                      ? 'bg-amber-950/30 border-amber-800/40'
                      : 'bg-emerald-950/30 border-emerald-800/40'
                  }`}
                >
                  {issue.type === 'critical' && <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                  {issue.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                  {issue.type === 'pass' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}

                  <div className="text-xs">
                    <p className="font-bold text-white text-sm">{issue.title}</p>
                    <p className="text-slate-300 mt-1">{issue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-5 bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Want Our Senior Engineers To Fix These Issues?</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Book a 1-on-1 growth consultation to receive a full 15-page PDF roadmap.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking({ domain: result.domain, auditScore: result.overallScore })}
              className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shrink-0 cursor-pointer shadow-md"
            >
              Get Full Fix Strategy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
