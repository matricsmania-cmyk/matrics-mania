'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeroSection } from '../components/sections/PageHeroSection';
import { ConversionCTASection } from '../components/sections/ConversionCTASection';
import { OptimizedImage } from '../components/OptimizedImage';
import { Page } from '../models';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Layers,
  Globe2,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface StaticPageTemplateProps {
  page?: Page;
  slug?: string;
  hideHero?: boolean;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  children?: React.ReactNode;
}

export const StaticPageTemplate: React.FC<StaticPageTemplateProps> = ({
  page: propPage,
  slug,
  hideHero,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  children,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const page = propPage || (slug ? provider.getPageBySlug(slug) : null) || {
    id: 'static-page',
    slug: slug || 'page',
    title: 'Engineered Growth Protocols',
    heroHeadline: 'Deterministic Systems for Modern Enterprises',
    excerpt: 'Explore MatricsMania enterprise growth architecture, technical standards, and full-funnel systems.',
    content: '',
    seo: {
      seoTitle: 'MatricsMania | Growth Engineering',
      metaDescription: 'Explore MatricsMania enterprise growth architecture, technical standards, and full-funnel systems.',
      canonicalUrl: `https://matricsmania.com/${slug || ''}/`,
      robotsIndex: true,
      robotsFollow: true,
    },
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-01',
    status: 'publish' as const,
    template: 'default' as const,
    relationships: {},
  };

  const canonicalUrl = page.seo?.canonicalUrl || `https://matricsmania.com/${page.slug}/`;
  const metaDescription = page.seo?.metaDescription || page.excerpt || 'MatricsMania Growth Engineering';
  const metaTitle = page.seo?.seoTitle || `${page.title} | MatricsMania`;
  const shouldHideHero = hideHero ?? (page.slug === 'about' || slug === 'about');

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        seo={page.seo}
        entity={page}
        pageType={page.slug === 'about' ? 'about' : page.slug === 'contact' ? 'contact' : 'static'}
      />

      {/* Hero (omitted on about page when shouldHideHero is true) */}
      {!shouldHideHero && (
        <PageHeroSection
          eyebrow="Enterprise Growth Infrastructure"
          title={page.heroHeadline || page.title}
          subtitle={metaDescription}
          primaryCtaLabel="Schedule Diagnostic Strategy Session"
          onPrimaryCta={() => onOpenBooking({ page: page.title })}
          secondaryCtaLabel="View Engineering Services"
          onSecondaryCta={() => onNavigate('/services/')}
        />
      )}

      {/* Main Content Area */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${shouldHideHero ? 'pt-24 pb-16 md:pt-28 md:pb-20' : 'py-16 md:py-20'}`}>
        {/* If custom children are provided, render them */}
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Rich Text Content */}
            <div className="lg:col-span-8 space-y-8">
              {page.content ? (
                <div
                  className="prose prose-invert prose-blue max-w-none text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              ) : (
                <div className="space-y-8 text-[#CBD5E1] text-sm sm:text-base leading-relaxed">
                  <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Operational Philosophy &amp; Engineering Principles
                    </h2>
                    <p className="text-[#94A3B8] leading-relaxed">
                      At MatricsMania, we treat modern marketing as a software engineering discipline. Every touchpoint, organic crawl route, search entity vector, and conversion funnel is treated as an interconnected operational subsystem.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Zero Speculative Spend
                        </div>
                        <p className="text-xs text-[#94A3B8]">
                          Every capital deployment requires baseline telemetry, statistical control groups, and verified CAC targets.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Deterministic SLAs
                        </div>
                        <p className="text-xs text-[#94A3B8]">
                          Engineered code commits, crawl log audits, and real-time dashboard instrumentation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Transparency &amp; Verifiable Outcomes
                    </h2>
                    <p className="text-[#94A3B8] leading-relaxed">
                      We never lock clients into proprietary black boxes. All tag manager repositories, BigQuery data lakes, and custom Next.js/Vite conversion modules belong 100% to your organization from Day 1.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Navigation & Metadata */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#60A5FA] tracking-wider">
                    Quick Navigation
                  </span>
                  <h3 className="text-base font-bold text-white">Core Hubs</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Engineering Services', path: '/services/' },
                    { label: 'Industry Solutions', path: '/industries/' },
                    { label: 'Case Studies Repository', path: '/case-studies/' },
                    { label: 'Research Papers & Insights', path: '/insights/' },
                    { label: '5-Phase Engineering Protocol', path: '/process/' },
                    { label: 'Bangalore Engineering Lab', path: '/locations/bangalore/' },
                    { label: 'Contact Diagnostic Team', path: '/contact/' },
                  ].map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate(link.path)}
                      className="w-full text-left p-2.5 rounded-lg bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] text-xs text-[#CBD5E1] hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#60A5FA] transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#1E293B] pt-4 space-y-3">
                  <div className="text-xs font-mono text-[#94A3B8]">
                    Have a specific question?
                  </div>
                  <button
                    onClick={() => onOpenBooking({ interest: `Inquiry from ${page.title}` })}
                    className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    <span>Schedule Diagnostic Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Conversion CTA */}
      <ConversionCTASection
        onOpenBooking={onOpenBooking}
        prefill={{ interest: `Inquiry from ${page.title}` }}
      />
    </div>
  );
};
