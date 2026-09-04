'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import {
  HomeHeroSection,
  PositioningPromiseSection,
  CredibilityEvidenceSection,
  CoreServicesSection,
  IndustriesSection,
  MethodologySection,
  CaseStudyEvidenceSection,
  InsightsSection,
  ConversionCTASection,
} from '../components/sections';
import { useRouter } from 'next/navigation';
import { Page, Service, Industry, CaseStudy, Insight } from '../models';

export interface HomeTemplateProps {
  page?: Page;
  services?: Service[];
  industries?: Industry[];
  caseStudies?: CaseStudy[];
  insights?: Insight[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onNavigateToBlogSlug?: (slug: string) => void;
  onNavigateToLocation?: (slug: string) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  page: propPage,
  services: propServices,
  industries: propIndustries,
  caseStudies: propCaseStudies,
  insights: propInsights,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  onNavigateToBlogSlug,
  onShowToast,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const page = propPage || provider.getPageBySlug('home');

  const services = propServices && propServices.length > 0 ? propServices : provider.getAllServices();
  const industries = propIndustries && propIndustries.length > 0 ? propIndustries : provider.getAllIndustries();
  const caseStudies = propCaseStudies && propCaseStudies.length > 0 ? propCaseStudies : provider.getAllCaseStudies();
  const insights = propInsights && propInsights.length > 0 ? propInsights : provider.getAllInsights();
  const canonicalUrl = page?.seo?.canonicalUrl || 'https://matricsmania.com/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MatricsMania',
    url: canonicalUrl,
    description:
      page?.seo?.metaDescription ||
      'Full-Funnel Growth Engineering & AI Search Optimization for ambitious tech and enterprise brands.',
    publisher: {
      '@type': 'Organization',
      name: 'MatricsMania',
      url: 'https://matricsmania.com/',
      logo: 'https://matricsmania.com/logo.png',
      sameAs: [
        'https://linkedin.com/company/matricsmania',
        'https://twitter.com/matricsmania',
        'https://github.com/matricsmania',
      ],
    },
  };

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={page?.seo}
        entity={page}
        pageType="home"
      />

      {/* 1. HERO: Positioning & Core Promise within Seconds */}
      <HomeHeroSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
      />

      {/* 2. POSITIONING / CORE PROMISE: Engineering vs. Traditional Agency */}
      <PositioningPromiseSection
        onNavigate={onNavigate}
      />

      {/* 3. EVIDENCE / CREDIBILITY: Verified Technical Standards & Disclosures */}
      <CredibilityEvidenceSection />

      {/* 4. CORE SERVICES: Modular Grid of 5 Active Disciplines */}
      <CoreServicesSection
        services={services}
        onNavigate={onNavigate}
      />

      {/* 6. INDUSTRIES SERVED: Domain Specialization & Compliance */}
      <IndustriesSection
        industries={industries}
        onNavigate={onNavigate}
      />

      {/* 7. METHODOLOGY: The 5-Phase Growth Execution Protocol */}
      <MethodologySection
        onNavigate={onNavigate}
      />

      {/* 8. SELECTED WORK / CASE-STUDY EVIDENCE: Verified Technical Outcomes */}
      <CaseStudyEvidenceSection
        caseStudies={caseStudies}
        onNavigate={onNavigate}
      />

      {/* 9. INSIGHTS / THOUGHT LEADERSHIP: Research Papers & Protocols */}
      <InsightsSection
        insights={insights}
        onNavigate={onNavigate}
        onNavigateToBlogSlug={onNavigateToBlogSlug}
      />

      {/* 10. HIGH-INTENT CTA: Advisory Diagnostic Booking */}
      <ConversionCTASection
        title="Ready to Eliminate CAC Waste & Engineer Predictable Pipeline?"
        subtitle="Schedule a 30-minute diagnostic session with our Principal Growth Architects. We review your live crawl logs, paid media telemetry, and conversion friction."
        badge="LIMITED ADVISORY SLOTS"
        buttonLabel="Launch Diagnostic Strategy Call"
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'Homepage Diagnostic Inquiry', service: 'Growth Architecture Diagnostic' }}
        disclaimer="Strict NDA applied to all diagnostic data reviews. Zero sales pitches — purely architecture & telemetry analysis."
      />
    </div>
  );
};
