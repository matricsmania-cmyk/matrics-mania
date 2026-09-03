'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import {
  HomeHeroSection,
  PositioningPromiseSection,
  CredibilityEvidenceSection,
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
  const faqs = provider.getAllFaqs('general');

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

  const homepageFaqs = faqs.length > 0 ? faqs : [
    {
      id: 'faq-hp-1',
      question: 'How does MatricsMania differ from a traditional digital marketing agency?',
      answer:
        'We operate as an engineering lab rather than a creative consultancy. We deliver production-grade code, server log crawl reclamation, Schema.org entity graphs, and first-party BigQuery telemetry instead of subjective opinions and vanity slide decks.',
      category: 'general',
      order: 1,
    },
    {
      id: 'faq-hp-2',
      question: 'How quickly does MatricsMania deploy technical recommendations?',
      answer:
        'Initial crawl fixes, Schema validation, and server-side log telemetry begin within 7 business days of repository and analytics access authorization.',
      category: 'general',
      order: 2,
    },
    {
      id: 'faq-hp-3',
      question: 'How do you optimize for AI Search (Perplexity, SearchGPT, Gemini)?',
      answer:
        'We optimize for entity embeddings, Perplexity citation graphs, and OpenAI SearchGPT schema standards, ensuring your brand is synthesized in direct answer prompts and comparison queries.',
      category: 'general',
      order: 3,
    },
    {
      id: 'faq-hp-4',
      question: 'Who owns the infrastructure and data pipelines created during the engagement?',
      answer:
        'You maintain 100% full ownership of all code pull requests, BigQuery data models, Cloudflare Edge worker configurations, and Schema JSON-LD graphs. Zero proprietary lock-in.',
      category: 'general',
      order: 4,
    },
    {
      id: 'faq-hp-5',
      question: 'What is the standard engagement structure and pricing model?',
      answer:
        'We offer transparent monthly engineering retainers starting at $4,500/month with defined sprint deliverables, as well as dedicated 60-day architectural sprint contracts.',
      category: 'general',
      order: 5,
    },
  ];

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={page?.seo}
        entity={page}
        pageType="home"
        faqs={homepageFaqs}
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

      {/* 7. METHODOLOGY: The 5-Phase Growth Execution Protocol */}
      <MethodologySection
        onNavigate={onNavigate}
      />

      {/* 8. SELECTED WORK / CASE-STUDY EVIDENCE: Verified Technical Outcomes */}
      <CaseStudyEvidenceSection
        caseStudies={caseStudies}
        onNavigate={onNavigate}
      />

      {/* 10. INSIGHTS / THOUGHT LEADERSHIP: Research Papers & Protocols */}
      <InsightsSection
        insights={insights}
        onNavigate={onNavigate}
        onNavigateToBlogSlug={onNavigateToBlogSlug}
      />

      {/* 12. HIGH-INTENT CTA: Advisory Diagnostic Booking */}
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
