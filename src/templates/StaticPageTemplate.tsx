'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeroSection } from '../components/sections/PageHeroSection';
import { ConversionCTASection } from '../components/sections/ConversionCTASection';
import { Page } from '../models';
import { useRouter } from 'next/navigation';

export interface StaticPageTemplateProps {
  page?: Page;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  children?: React.ReactNode;
}

export const StaticPageTemplate: React.FC<StaticPageTemplateProps> = ({
  page: propPage,
  slug,
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
  const isAboutPage =
    page.slug === 'about' ||
    page.slug === 'page-about' ||
    page.id === 'page-about' ||
    page.template === 'about' ||
    (typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/about');

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        seo={page.seo}
        entity={page}
        pageType={isAboutPage ? 'about' : page.slug === 'contact' ? 'contact' : 'static'}
      />

      {/* Hero */}
      <PageHeroSection
        eyebrow="Enterprise Growth Infrastructure"
        title={page.heroHeadline || page.title}
        subtitle={metaDescription}
        primaryCtaLabel="Schedule Diagnostic Strategy Session"
        onPrimaryCta={() => onOpenBooking({ page: page.title })}
        secondaryCtaLabel="View Engineering Services"
        onSecondaryCta={() => onNavigate('/services/')}
      />

      {/* Main Content Area */}
      {!isAboutPage && page.content && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* If custom children are provided, render them */}
          {children ? (
            children
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              <div
                className="prose prose-invert prose-blue max-w-none text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          )}
        </div>
      )}

      {/* Global Conversion CTA */}
      <ConversionCTASection
        onOpenBooking={onOpenBooking}
        prefill={{ interest: `Inquiry from ${page.title}` }}
      />
    </div>
  );
};
