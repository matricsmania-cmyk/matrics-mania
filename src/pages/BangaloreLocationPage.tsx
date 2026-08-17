import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import {
  MapPin,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowRight,
  TrendingUp,
  Cpu,
  Building2,
  ShoppingBag,
  Zap,
  Award,
  Layers,
  Search,
} from 'lucide-react';
import { AuditSimulator } from '../components/AuditSimulator';
import { ScrollReveal } from '../components/ScrollReveal';

interface BangaloreLocationPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToLocation?: (slug: string) => void;
  onOpenBooking: (prefill?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const BangaloreLocationPage: React.FC<BangaloreLocationPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Best Digital Marketing Agency in Bangalore | Performance Marketing & SEO | MatricsMania';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const keyLocalities = [
    'Indiranagar',
    'Koramangala',
    'HSR Layout',
    'Whitefield',
    'Bellandur & ORR',
    'Electronic City',
    'Jayanagar & JP Nagar',
    'MG Road & Lavelle Rd',
    'Malleshwaram',
    'North Bangalore (Hebbal / Devanahalli)',
    'Sarjapur Road',
    'Bannerghatta Road',
  ];

  const localStats = [
    { metric: '4.6x+', label: 'Avg ROAS for Bangalore Brands' },
    { metric: '380+', label: 'Top-3 Google & LLM Keywords' },
    { metric: '120+', label: 'Bangalore Tech & D2C Brands Scaled' },
    { metric: '99.4%', label: 'Annual Client Retention' },
  ];

  const services = [
    {
      title: 'AI Search & Technical SEO Domination',
      description:
        'Engineer your brand for the new search reality: Google 3-Pack, traditional organic rankings, and AI Overview/Perplexity citations across high-intent queries.',
      icon: Search,
      benefits: [
        'LLM & Search Generative Experience (SGE) Optimization',
        'Bangalore Hyper-Local Citations & Map Pack #1 Rank',
        'Technical Core Web Vitals Optimization (<0.8s LCP)',
        'High-Authority Domain Authority & PR Backlink Funnels',
      ],
    },
    {
      title: 'High-ROAS Performance Media & B2B ABM',
      description:
        'Deploy data-driven Meta, Google Search/Shopping, and LinkedIn Account-Based Marketing (ABM) campaigns engineered for aggressive CAC-to-LTV ratios.',
      icon: Target,
      benefits: [
        'Meta CAPI (Conversions API) Server-Side Tracking',
        'LinkedIn Decision-Maker & Tech Founder Targeting',
        'Google High-Intent Search & Performance Max',
        'Continuous Creative Testing & High-CTR Ad Variations',
      ],
    },
    {
      title: 'D2C E-Commerce & Omnichannel Scaling',
      description:
        'Turn online shoppers in Indiranagar, Koramangala, and across Pan-India into loyal repeat buyers with optimized Shopify funnels and retention engines.',
      icon: ShoppingBag,
      benefits: [
        'Full-Funnel Shopify & Headless Commerce CRO',
        'Klaviyo Email & WhatsApp Lifecycle Flows',
        'Repeat Purchase & Cohort LTV Maximization',
        'Marketplace & Quick-Commerce Integration',
      ],
    },
    {
      title: 'High-Ticket Real Estate & Healthcare Acquisition',
      description:
        'Predictable pipeline generation for luxury residential villas, commercial developers, and super-specialty clinics in Whitefield, North Bangalore, and CBD.',
      icon: Building2,
      benefits: [
        'Verified Ultra-HNI Buyer Lead Qualification',
        'Instant WhatsApp CRM Lead Dispatch in <60 Seconds',
        'Interactive 3D Virtual Tour Landing Pages',
        'Geo-Fenced Tech Park & Premium Corridor Ads',
      ],
    },
  ];

  const caseStudies = [
    {
      title: 'Venture-Backed B2B SaaS Startup (HSR Layout)',
      result: '+310% Qualified Inbound Pipeline in 90 Days',
      detail:
        'Implemented precision LinkedIn Account-Based Marketing, bottom-of-funnel comparison SEO, and high-converting interactive product demo pages.',
      tag: 'B2B SaaS & Tech',
    },
    {
      title: 'Premium D2C Apparel Brand (Indiranagar)',
      result: 'Scaled from ₹18L/mo to ₹92L/mo at 4.4x ROAS',
      detail:
        'Rebuilt Shopify storefront with sub-second page loads, scaled Meta dynamic catalog ads with video creative hooks, and integrated Klaviyo retention flows.',
      tag: 'D2C E-Commerce',
    },
    {
      title: 'Luxury Villa Development (North Bangalore)',
      result: '₹54 Cr in Verified Property Closures in 60 Days',
      detail:
        'Targeted tech executives in Whitefield & Outer Ring Road with hyper-curated video ads and automated lead nurturing through instant WhatsApp booking.',
      tag: 'Luxury Real Estate',
    },
  ];

  const localFaqs = [
    {
      question: 'Why choose MatricsMania as your digital marketing agency in Bangalore?',
      answer:
        'Bangalore is India’s tech capital where generic marketing agencies simply fall flat. We combine mathematical attribution, deep engineering capability, AI search optimization (Perplexity/ChatGPT visibility), and revenue-backed performance media that treat CAC and LTV as hard engineering metrics.',
    },
    {
      question: 'How do you help B2B SaaS and venture-funded startups in Bangalore?',
      answer:
        'We engineer full-funnel demand generation: high-intent competitor alternative SEO, LinkedIn ABM targeting specific tech stacks and job titles, interactive product tour pages, and HubSpot/Salesforce lifecycle automation that drives closed-won ARR.',
    },
    {
      question: 'How fast can our campaigns launch in Bangalore?',
      answer:
        'Our onboarding process takes 3 to 5 business days. This includes complete analytics audit, server-side Meta CAPI setup, tracking validation, initial creative sprint, and competitive keyword landscape mapping.',
    },
    {
      question: 'Do you work with local Bangalore businesses as well as global tech brands?',
      answer:
        'Yes. We support local enterprises (premium clinics, luxury real estate developers, fine dining, architecture firms) across Indiranagar, Whitefield, Koramangala, and HSR Layout, as well as global SaaS and D2C brands selling across North America, Europe, and Pan-India.',
    },
  ];

  return (
    <div className="bg-[#070B14] text-white min-h-screen transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="space-y-6 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Digital Marketing Agency in Bangalore Engineered for <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">High-Velocity Growth</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mx-auto">
            We help Bangalore’s fastest-growing SaaS startups, D2C brands, luxury real estate developers, and enterprise clinics turn digital visibility into predictable revenue with AI-driven SEO, high-ROAS paid media, and conversion architecture.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking({ location: 'Bangalore', serviceInterest: 'Bangalore Growth Audit' })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Claim Free Bangalore Growth Audit</span>
            </button>
            <button
              onClick={() => onNavigate('locations')}
              className="px-6 py-4 rounded-xl bg-[#0D1424] border border-[#1E293B] text-white font-bold text-xs md:text-sm hover:border-[#2563EB]/40 transition-colors cursor-pointer"
            >
              All Agency Locations
            </button>
          </div>
        </ScrollReveal>

        {/* Local Metric Stats */}
        <ScrollReveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {localStats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA]">
                {item.metric}
              </div>
              <div className="text-xs font-semibold text-[#94A3B8] mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* 2. LOCAL CORRIDORS & COVERAGE */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Hyper-Local Corridor Targeting
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Active Campaigns Across Bangalore’s Key Business Districts
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {keyLocalities.map((loc) => (
              <span
                key={loc}
                className="px-3.5 py-1.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3 text-[#60A5FA]" />
                <span>{loc}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PRACTICE AREAS FOR BANGALORE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Full-Funnel Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Digital Marketing Solutions for Bangalore Enterprises
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Data-backed acquisition engines tailored to the high-competition, tech-savvy consumer and enterprise landscape of Bengaluru.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6 hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#131D33] flex items-center justify-center text-[#60A5FA]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {svc.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {svc.description}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-[#1E293B]">
                  {svc.benefits.map((b, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. VERIFIED BANGALORE CASE STUDIES */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Bangalore Growth Stories
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Real metric breakthroughs across Bangalore SaaS, D2C e-commerce, and high-ticket real estate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#070B14] border border-[#1E293B] flex flex-col justify-between space-y-6 hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#131D33] text-[#60A5FA] uppercase tracking-wider inline-block">
                    {cs.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {cs.title}
                  </h3>
                  <div className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B]">
                    <span className="text-sm font-extrabold text-[#10B981] block">
                      {cs.result}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {cs.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E293B]">
                  <button
                    onClick={() => onOpenBooking({ location: 'Bangalore', caseStudy: cs.title })}
                    className="text-xs font-bold text-[#60A5FA] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Case Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. INTERACTIVE AUDIT SIMULATOR */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
            Complimentary Diagnostic
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Run Instant Bangalore Competitor Audit
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Analyze your domain speed, Google Maps 3-Pack rank, and ad spend efficiency against key Bangalore competitors.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <AuditSimulator onComplete={() => onOpenBooking({ location: 'Bangalore Audit' })} />
        </div>
      </section>

      {/* 6. LOCAL FAQS */}
      <section className="py-16 bg-[#070B14] border-t border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bangalore Digital Marketing FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {localFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-white cursor-pointer gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#60A5FA] shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed border-t border-[#1E293B] pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="bg-[#0D1424] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Outpace Your Competition in Bangalore?
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 strategy call with our Bangalore growth team. We’ll analyze your CAC, organic search gaps, and build your 90-day execution roadmap.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking({ location: 'Bangalore', serviceInterest: 'Executive Strategy Call' })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Book Bangalore Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('locations')}
              className="px-6 py-4 rounded-xl bg-[#070B14] border border-[#1E293B] hover:border-[#2563EB]/40 text-white font-bold text-xs md:text-sm transition-all cursor-pointer"
            >
              View All Locations
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
