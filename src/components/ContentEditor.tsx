'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Database,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Globe,
  Sliders,
  AlertCircle,
  Clock,
  Zap,
  Eye,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';

interface EditorData {
  success: boolean;
  timestamp: string;
  latencyMs: number;
  pathname: string;
  resolution: {
    type: string;
    slug: string;
    endpoint: string;
    label: string;
  };
  source: 'wordpress_live' | 'fallback_cache' | 'mock_provider';
  httpStatus: number;
  errorMessage?: string | null;
  wpBaseUrl: string;
  metadata: {
    title: string;
    metaDescription: string;
    canonicalUrl: string;
    openGraph?: any;
    twitter?: any;
    schema?: any;
    slug: string;
    id?: number | string | null;
    status: string;
    dateModified: string;
  };
  bodyContent: {
    rawHtml: string;
    rawExcerpt: string;
    acfFields: Record<string, any>;
  };
  rawWpData?: any;
  normalizedEntity?: any;
}

export interface ContentEditorProps {
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ onShowToast }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'metadata' | 'body' | 'hardcoded' | 'json'>('metadata');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<EditorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [jsonFilter, setJsonFilter] = useState('');

  // Fetch page metadata and body content from API
  const fetchPageContent = useCallback(
    async (forceRefresh = false) => {
      setIsLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({
          path: pathname || '/',
          refresh: forceRefresh ? 'true' : 'false',
        });
        const res = await fetch(`/api/content/editor?${query.toString()}`);
        if (!res.ok) {
          throw new Error(`Editor API returned HTTP ${res.status}`);
        }
        const json: EditorData = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err?.message || 'Failed to inspect page');
      } finally {
        setIsLoading(false);
      }
    },
    [pathname]
  );

  // Fetch whenever route changes or panel opens
  useEffect(() => {
    fetchPageContent();
  }, [fetchPageContent]);

  // Global keyboard shortcut: Ctrl/Cmd + Shift + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      if (onShowToast) {
        onShowToast('Copied to Clipboard', key, 'success');
      }
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Hardcoded copy mapping based on the current pathname
  const getHardcodedCopyForRoute = () => {
    const clean = (pathname || '/').replace(/^\/+|\/+$/g, '');
    if (!clean || clean === '') {
      return [
        {
          section: 'Hero Section (HomeHeroSection.tsx)',
          items: [
            { field: 'Eyebrow Pill', value: 'Full-Funnel Growth Engineering • AI Search & Attribution' },
            {
              field: 'Main Headline (H1)',
              value: 'Building Ambitious Brands with Mathematical Precision & Scalable Systems.',
            },
            {
              field: 'Subheadline',
              value:
                'We replace subjective marketing opinions with structured engineering, algorithmic crawl optimization, high-yield paid acquisition, and revenue analytics.',
            },
            { field: 'Primary CTA Button', value: 'Schedule Diagnostic Session' },
            { field: 'Secondary CTA Button', value: 'Explore Systems Stack' },
            { field: 'Trust Guarantee 01', value: 'Zero Fluff Guarantee' },
            { field: 'Trust Guarantee 02', value: '100% First-Party Data Ownership' },
            { field: 'Trust Guarantee 03', value: 'Deterministic Engineering SLAs' },
          ],
        },
        {
          section: 'Core Services Section (CoreServicesSection.tsx)',
          items: [
            { field: 'Eyebrow', value: 'ENGINEERED CAPABILITIES' },
            { field: 'Section Title', value: 'Core Growth Disciplines' },
            {
              field: 'Section Subtitle',
              value: 'Modular systems designed to solve enterprise attribution, search retrieval, and conversion friction.',
            },
          ],
        },
        {
          section: 'Industries Section (IndustriesSection.tsx)',
          items: [
            { field: 'Eyebrow', value: 'DOMAIN SPECIALIZATION' },
            { field: 'Section Title', value: 'Specialized Industry Verticals' },
            {
              field: 'Section Subtitle',
              value: 'Tailored growth architecture engineered around vertical compliance, sales cycles, and unit economics.',
            },
          ],
        },
        {
          section: 'Conversion CTA (ConversionCTASection.tsx)',
          items: [
            { field: 'Badge', value: 'LIMITED ADVISORY SLOTS' },
            { field: 'Headline', value: 'Ready to Eliminate CAC Waste & Engineer Predictable Pipeline?' },
            {
              field: 'Description',
              value:
                'Schedule a 30-minute diagnostic session with our Principal Growth Architects. We review your live crawl logs, paid media telemetry, and conversion friction.',
            },
            { field: 'Button Label', value: 'Launch Diagnostic Strategy Call' },
            {
              field: 'Disclaimer',
              value: 'Strict NDA applied to all diagnostic data reviews. Zero sales pitches — purely architecture & telemetry analysis.',
            },
          ],
        },
      ];
    }

    if (clean.startsWith('services/')) {
      return [
        {
          section: 'Service Template Hardcoded Headers',
          items: [
            { field: 'Hero Tag', value: 'Capability Architecture' },
            { field: 'Primary Action', value: 'Schedule Technical Diagnostic Session' },
            { field: 'Secondary Action', value: 'View Verified Case Studies' },
            { field: 'SLA Guarantee', value: 'Deterministic SLA Guaranteed' },
            { field: 'Bottom CTA Headline', value: 'Ready to Deploy Enterprise Capability Architecture?' },
          ],
        },
      ];
    }

    if (clean === 'about') {
      return [
        {
          section: 'About Page Copy',
          items: [
            { field: 'Hero Headline', value: 'Engineering-First Growth for Category Leaders' },
            {
              field: 'Subtitle',
              value:
                'MatricsMania was founded to eliminate the disconnect between performance marketing agencies and systems software engineering.',
            },
            { field: 'Pillars', value: '01 Algorithmic Search, 02 Unit Economic Media, 03 Code-Level CRO, 04 Pipeline Attribution' },
          ],
        },
      ];
    }

    return [
      {
        section: 'Page Hardcoded Decorators',
        items: [
          { field: 'Footer Links', value: 'Managed centrally in NAVIGATION_CONFIG / Footer.tsx' },
          { field: 'Navbar Actions', value: 'Book Growth Audit -> / Contact' },
        ],
      },
    ];
  };

  return (
    <>
      {/* Docked Trigger Button on Right Screen Edge */}
      {!isOpen && (
        <button
          id="open-content-editor-btn"
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed top-24 right-0 z-40 bg-[#0D1424] hover:bg-[#1E293B] border-l border-y border-[#2563EB]/40 hover:border-[#2563EB] text-white py-2.5 px-3.5 rounded-l-xl shadow-2xl flex items-center gap-2 cursor-pointer transition-all group focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          title="Open CMS Content Editor (Ctrl+Shift+E)"
        >
          <div className="relative">
            <Database className="w-4 h-4 text-[#60A5FA] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#93C5FD]">CONTENT EDITOR</span>
            <span className="text-[9px] font-mono text-[#64748B]">WordPress CMS</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-0.5 transition-transform rotate-180" />
        </button>
      )}

      {/* Slide-Over Side Panel */}
      {isOpen && (
        <aside
          id="studio-content-editor-panel"
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg lg:max-w-xl bg-[#070B14] border-l border-[#1E293B] shadow-2xl flex flex-col overflow-hidden text-slate-200 transition-transform font-sans"
        >
          {/* 1. Header Bar */}
          <div className="px-5 py-4 border-b border-[#1E293B] bg-[#0A0F1D] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white tracking-tight">Studio Content Editor</h2>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1E293B] text-[#93C5FD] border border-[#334155]">
                    {data?.resolution.type || 'page'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] flex items-center gap-1.5 truncate max-w-[280px]">
                  <span>Path:</span>
                  <span className="text-slate-300 font-semibold">{pathname}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fetchPageContent(true)}
                disabled={isLoading}
                title="Fetch fresh data from WordPress"
                className="p-2 rounded-lg bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#60A5FA]' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close side panel"
                className="p-2 rounded-lg bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Connection Telemetry Bar */}
          <div className="px-5 py-2.5 bg-[#0D1424]/80 border-b border-[#1E293B] flex items-center justify-between text-[11px] font-mono shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    data?.source === 'wordpress_live'
                      ? 'bg-emerald-400'
                      : data?.source === 'fallback_cache'
                      ? 'bg-blue-400'
                      : 'bg-amber-400'
                  }`}
                />
                <span className="text-slate-300">
                  {data?.source === 'wordpress_live'
                    ? 'WordPress Live'
                    : data?.source === 'fallback_cache'
                    ? 'Local Cache'
                    : 'Provider Fallback'}
                </span>
              </div>
              <span className="text-[#475569]">|</span>
              <span className="text-[#64748B] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {data?.latencyMs ? `${data.latencyMs}ms` : 'Cached'}
              </span>
            </div>

            <div className="text-[#64748B] truncate max-w-[180px]" title={data?.wpBaseUrl}>
              {data?.wpBaseUrl?.replace(/^https?:\/\//, '') || 'cms.matricsmania.com'}
            </div>
          </div>

          {/* 3. Navigation Tabs */}
          <div className="px-5 pt-3 pb-0 border-b border-[#1E293B] bg-[#070B14] flex gap-2 shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('metadata')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'metadata'
                  ? 'border-[#2563EB] text-[#60A5FA]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Metadata &amp; SEO</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('body')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'body'
                  ? 'border-[#2563EB] text-[#60A5FA]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CMS Body &amp; ACF</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hardcoded')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'hardcoded'
                  ? 'border-[#2563EB] text-[#60A5FA]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Hardcoded Copy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'json'
                  ? 'border-[#2563EB] text-[#60A5FA]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>

          {/* 4. Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {isLoading && !data && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw className="w-7 h-7 text-[#60A5FA] animate-spin" />
                <p className="text-xs font-mono text-[#94A3B8]">Ingesting content from WordPress endpoint...</p>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-rose-200">Unable to reach WordPress API</div>
                  <div className="text-[11px] text-rose-300/80 mt-0.5">{error}</div>
                </div>
              </div>
            )}

            {data && (
              <>
                {/* ================= TAB 1: METADATA & SEO ================= */}
                {activeTab === 'metadata' && (
                  <div className="space-y-5">
                    {/* Page Title */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                        <span className="font-bold">PAGE TITLE (&lt;title&gt;)</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(data.metadata.title, 'meta_title')}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                        >
                          {copiedKey === 'meta_title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'meta_title' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-medium text-white leading-snug break-words">
                        {data.metadata.title}
                      </p>
                    </div>

                    {/* Meta Description */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                        <span className="font-bold">META DESCRIPTION</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(data.metadata.metaDescription, 'meta_desc')}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                        >
                          {copiedKey === 'meta_desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'meta_desc' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">
                        {data.metadata.metaDescription}
                      </p>
                    </div>

                    {/* Technical SEO Directives */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                      <div className="text-xs font-mono font-bold text-[#60A5FA]">INDEXING &amp; CANONICAL URL</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B]">
                          <span className="text-[10px] font-mono text-[#64748B] block">Canonical URL</span>
                          <span className="text-slate-300 font-mono text-[11px] truncate block" title={data.metadata.canonicalUrl}>
                            {data.metadata.canonicalUrl}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B]">
                          <span className="text-[10px] font-mono text-[#64748B] block">Robots Directives</span>
                          <span className="text-emerald-400 font-mono text-[11px] font-semibold block">
                            INDEX, FOLLOW
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Social Share Preview (OpenGraph) */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2.5">
                      <div className="text-xs font-mono font-bold text-[#60A5FA] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>OPENGRAPH &amp; SOCIAL SHARE CARD</span>
                      </div>
                      <div className="rounded-lg border border-[#1E293B] bg-[#070B14] overflow-hidden">
                        <div className="p-3.5 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-[#60A5FA]">matricsmania.com</span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{data.metadata.title}</h4>
                          <p className="text-[11px] text-[#94A3B8] line-clamp-2">{data.metadata.metaDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= TAB 2: CMS BODY & ACF ================= */}
                {activeTab === 'body' && (
                  <div className="space-y-5">
                    {/* Rendered HTML / Post Body */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                        <span className="font-bold">WORDPRESS BODY (post_content)</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(data.bodyContent.rawHtml, 'post_content')}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                        >
                          {copiedKey === 'post_content' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'post_content' ? 'Copied' : 'Copy HTML'}</span>
                        </button>
                      </div>
                      {data.bodyContent.rawHtml ? (
                        <div className="max-h-60 overflow-y-auto p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono text-slate-300 whitespace-pre-wrap break-words">
                          {data.bodyContent.rawHtml}
                        </div>
                      ) : (
                        <p className="text-xs text-[#64748B] italic">No post_content body returned from WordPress for this slug.</p>
                      )}
                    </div>

                    {/* ACF Custom Fields Meta Box */}
                    <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                        <span className="font-bold">ACF META BOX FIELDS</span>
                        <span className="text-[10px] text-[#64748B]">
                          {Object.keys(data.bodyContent.acfFields || {}).length} fields detected
                        </span>
                      </div>

                      {Object.keys(data.bodyContent.acfFields || {}).length > 0 ? (
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                          {Object.entries(data.bodyContent.acfFields).map(([key, val]) => (
                            <div key={key} className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-[#93C5FD] font-semibold">{key}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(typeof val === 'object' ? JSON.stringify(val) : String(val), `acf_${key}`)}
                                  className="text-[#64748B] hover:text-white transition-colors cursor-pointer"
                                >
                                  {copiedKey === `acf_${key}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                              <div className="text-xs text-slate-300 font-mono break-words">
                                {typeof val === 'object' ? (
                                  <pre className="text-[10px] text-slate-400 overflow-x-auto">{JSON.stringify(val, null, 2)}</pre>
                                ) : (
                                  String(val)
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-[#64748B] italic">No custom ACF fields found for this page in WordPress.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= TAB 3: HARDCODED STUDIO COPY ================= */}
                {activeTab === 'hardcoded' && (
                  <div className="space-y-5">
                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                      <strong>AI Studio Hardcoded vs CMS:</strong> These texts are defined directly in the frontend Next.js component files rather than in WordPress CMS meta boxes.
                    </div>

                    {getHardcodedCopyForRoute().map((sec) => (
                      <div key={sec.section} className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                        <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase">{sec.section}</div>
                        <div className="space-y-2.5">
                          {sec.items.map((item) => (
                            <div key={item.field} className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                                <span className="font-semibold text-[#93C5FD]">{item.field}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.value, item.field)}
                                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  {copiedKey === item.field ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedKey === item.field ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed font-sans">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ================= TAB 4: RAW WORDPRESS JSON ================= */}
                {activeTab === 'json' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        placeholder="Filter JSON keys..."
                        value={jsonFilter}
                        onChange={(e) => setJsonFilter(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(JSON.stringify(data.rawWpData || data.normalizedEntity, null, 2), 'raw_json')}
                        className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'raw_json' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy All</span>
                      </button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto p-3.5 rounded-xl bg-[#040711] border border-[#1E293B]">
                      <pre className="text-[11px] font-mono text-emerald-400/90 whitespace-pre-wrap break-all leading-tight">
                        {JSON.stringify(
                          jsonFilter
                            ? Object.fromEntries(
                                Object.entries(data.rawWpData || data.normalizedEntity || {}).filter(([k]) =>
                                  k.toLowerCase().includes(jsonFilter.toLowerCase())
                                )
                              )
                            : data.rawWpData || data.normalizedEntity || {},
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 5. Footer Bar */}
          <div className="px-5 py-3 border-t border-[#1E293B] bg-[#0A0F1D] flex items-center justify-between text-[11px] font-mono text-[#64748B] shrink-0">
            <span>Press Ctrl+Shift+E to toggle</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#60A5FA] hover:text-white transition-colors cursor-pointer font-semibold"
            >
              Hide Panel
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
