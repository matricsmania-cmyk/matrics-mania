import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import {
  MapPin,
  CheckCircle2,
  TrendingUp,
  Search,
  Star,
  Users,
  Award,
  ArrowRight,
  PhoneCall,
  Calendar,
  ChevronDown,
  Sparkles,
  Building2,
  GraduationCap,
  Hospital,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Target
} from 'lucide-react';
import { AuditSimulator } from '../components/AuditSimulator';

export interface LocationData {
  slug: string;
  cityName: string;
  h1: string;
  pageTitle: string;
  metaDesc: string;
  heroBadge: string;
  heroDesc: string;
  keyLocalities: string[];
  localStats: { metric: string; label: string }[];
  services: {
    title: string;
    description: string;
    icon: string;
    benefits: string[];
  }[];
  caseStudies: {
    title: string;
    result: string;
    detail: string;
    tag: string;
  }[];
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

export const LOCATION_DATA_MAP: Record<'varanasi' | 'prayagraj', LocationData> = {
  varanasi: {
    slug: 'digital-marketing-agency-in-varanasi',
    cityName: 'Varanasi',
    h1: 'Digital Marketing Agency in Varanasi',
    pageTitle: 'Best Digital Marketing Agency in Varanasi | Local SEO & Growth Marketing',
    metaDesc: 'Scale your Varanasi business with data-driven Local SEO, Google Ads, Meta PPC, Web Development & E-commerce growth strategies. Dominate Godowlia, Assi Ghat & Cantonment.',
    heroBadge: '#1 Digital Marketing & Growth Agency in Varanasi',
    heroDesc: 'Transform local online searches into high-paying customers, foot traffic, and global export sales. We empower Varanasi brands—from Banarasi Silk manufacturers and luxury hotels to educational hubs, healthcare, and real estate—with proven ROI marketing.',
    keyLocalities: [
      'Godowlia',
      'Assi Ghat',
      'Cantonment',
      'Lahurabir',
      'Lanka & Sigra',
      'Mahmoorganj',
      'Chetganj',
      'Bhelupur',
      'Ramnagar',
      'Gadtoli & Pandeypur'
    ],
    localStats: [
      { metric: '3.8x+', label: 'Avg ROAS for Varanasi Clients' },
      { metric: '250+', label: 'Top-3 Google Keywords Ranked' },
      { metric: '85+', label: 'Local Campaigns Scaled in Varanasi' },
      { metric: '99.2%', label: 'Client Retention Rate' }
    ],
    services: [
      {
        title: 'Varanasi Local SEO & Google Maps Marketing',
        description: 'Dominate the Google 3-Pack when local customers and tourists search for "best silk shop in Varanasi", "hotels near Assi Ghat", or "top doctor in Varanasi".',
        icon: 'Search',
        benefits: ['Google Business Profile Optimization', 'Geo-tagged Local Citations', '5-Star Review Generation Strategy', 'Local Organic Keyword Ranking']
      },
      {
        title: 'High-ROAS Meta & Google Paid Ads (PPC)',
        description: 'Drive immediate foot traffic, WhatsApp leads, and online bookings with hyper-targeted geo-fenced ads across Varanasi and surrounding districts.',
        icon: 'Target',
        benefits: ['Hyper-Local Geo Targeting', 'WhatsApp Lead Ads Automation', 'Google Search & Shopping PPC', 'Conversion Rate Optimization (CRO)']
      },
      {
        title: 'E-Commerce & Silk/Handicraft Export Scaling',
        description: 'Take Banarasi Silk sarees, handloom, and traditional handicrafts from Varanasi stores to national and international markets on Shopify & Amazon.',
        icon: 'ShoppingBag',
        benefits: ['Global E-Commerce Funnel Architecture', 'Shopify & WooCommerce SEO', 'Pan-India Performance Marketing', 'High-LTV Customer Retargeting']
      },
      {
        title: 'Custom Website & Mobile App Development',
        description: 'Build ultra-fast, mobile-responsive, conversion-focused websites engineered to convert Varanasi site visitors into booked calls and inquiries.',
        icon: 'Building2',
        benefits: ['Sub-Second Page Load Speed', 'Mobile-First Responsive UI', 'Instant Click-to-WhatsApp Buttons', 'Custom Lead Management Integration']
      }
    ],
    caseStudies: [
      {
        title: 'Banarasi Silk Heritage D2C Brand',
        result: '+340% E-Commerce Revenue in 6 Months',
        detail: 'Scaled online D2C sales nationally with Meta Conversions API (CAPI), Google Shopping Ads, and schema-rich Shopify SEO.',
        tag: 'E-Commerce & Retail'
      },
      {
        title: 'Luxury Assi Ghat Hotel & Retreat',
        result: '82% Increase in Direct Website Bookings',
        detail: 'Eliminated heavy OTA commission dependencies by dominating local Google Hotel Search Ads & Google Business Profile SEO.',
        tag: 'Hospitality & Tourism'
      },
      {
        title: 'Varanasi Competitive Exam Coaching',
        result: '1,200+ Qualified Student Enquiries',
        detail: 'Executed hyper-local Instagram & WhatsApp lead generation ads targeting students across Sigra, Lanka, and Cantonment.',
        tag: 'Education & Coaching'
      }
    ],
    localFaqs: [
      {
        question: 'Why should my Varanasi business hire a local digital marketing agency?',
        answer: 'Varanasi is experiencing unprecedented economic growth driven by infrastructure upgrades, booming tourism, and digital consumer adoption. A specialized agency understands Varanasi buyer psychology, local search behavior, and regional competitors to deliver maximum ROI.'
      },
      {
        question: 'How quickly can my business rank on Google Maps in Varanasi?',
        answer: 'With our localized Google Business Profile optimization and geo-tagged citation strategy, most Varanasi clients see a significant boost in Google 3-Pack rankings within 30 to 60 days.'
      },
      {
        question: 'Do you serve traditional businesses in Varanasi like Silk & Handicrafts?',
        answer: 'Yes! We specialize in digitizing traditional Banarasi silk manufacturers, handicraft exporters, local retail chains, diagnostic centers, and educational institutes, turning offline reputations into online revenue machines.'
      },
      {
        question: 'What is the pricing for digital marketing services in Varanasi?',
        answer: 'We offer flexible, ROI-driven packages tailored to your budget and growth goals, ranging from targeted local SEO plans to full-service performance marketing retainers.'
      }
    ]
  },
  prayagraj: {
    slug: 'digital-marketing-agency-in-prayagraj',
    cityName: 'Prayagraj',
    h1: 'Digital Marketing Agency in Prayagraj',
    pageTitle: 'Best Digital Marketing Agency in Prayagraj | Local SEO & Growth Marketing',
    metaDesc: 'Scale your Prayagraj business with expert Local SEO, Google PPC, Meta Lead Generation, Web Development & Social Media. Serving Civil Lines, Katra, Naini & Sangam area.',
    heroBadge: '#1 Digital Marketing & Lead Generation Agency in Prayagraj',
    heroDesc: 'Drive predictable student admissions, real estate leads, patient appointments, and retail growth in Prayagraj. We empower Civil Lines retailers, coaching centers, real estate developers, and healthcare providers with high-converting digital strategy.',
    keyLocalities: [
      'Civil Lines',
      'Katra',
      'Naini',
      'George Town',
      'Ashok Nagar',
      'Tagoretown',
      'Jhalwa',
      'Sangam Area',
      'Teliyarganj',
      'Mumfordganj'
    ],
    localStats: [
      { metric: '4.2x+', label: 'Avg ROAS for Prayagraj Clients' },
      { metric: '180+', label: 'Keywords Ranked #1 in Prayagraj' },
      { metric: '60+', label: 'Prayagraj Enterprises Scaled' },
      { metric: '24/7', label: 'Transparent Campaign ROI Tracking' }
    ],
    services: [
      {
        title: 'Prayagraj Local SEO & Map Pack Domination',
        description: 'Win top spot on Google for searches like "best coaching in Civil Lines", "top builder in Prayagraj", "hospital near me in Katra".',
        icon: 'Search',
        benefits: ['Google Maps #1 Ranking Strategy', 'Localized Keyword Optimization', 'On-Page & Off-Page SEO', 'GMB Review & Reputation Management']
      },
      {
        title: 'Student Admission & Lead Gen Funnels',
        description: 'High-converting Meta & Google Search ad campaigns for Prayagraj NEET/JEE coaching centers, schools, and higher education institutes.',
        icon: 'GraduationCap',
        benefits: ['Targeted Parent & Student Ads', 'Instant Lead-to-Call System', 'High-Converting Landing Pages', 'Ad Spend Optimization']
      },
      {
        title: 'Real Estate & High-Ticket Lead Generation',
        description: 'Generate verified buyer leads for residential plots, apartments, and commercial real estate projects across Civil Lines, Naini & Jhalwa.',
        icon: 'Building2',
        benefits: ['Pre-screened Buyer Leads', 'Interactive Virtual Tour Landing Pages', 'WhatsApp Automation Integration', 'Geo-Fenced Social Campaigns']
      },
      {
        title: 'Custom Website & Brand Identity Development',
        description: 'Build lightning-fast, modern websites optimized for mobile users and structured to turn Prayagraj web traffic into phone calls.',
        icon: 'Target',
        benefits: ['Ultra-Fast Page Speed', 'Clean Modern UI/UX', 'SEO-Optimized Codebase', 'Seamless CRM & Lead Sync']
      }
    ],
    caseStudies: [
      {
        title: 'Premier Civil Lines IIT-JEE Coaching Institute',
        result: '+220% Student Admissions Year-over-Year',
        detail: 'Implemented targeted search ads, WhatsApp automation funnels, and landing page conversion optimization.',
        tag: 'Education & Coaching'
      },
      {
        title: 'Prayagraj Residential Real Estate Developer',
        result: '45+ Plot & Flat Bookings in 90 Days',
        detail: 'Ran hyper-targeted Facebook & Instagram lead ads paired with CRM instant callback integration.',
        tag: 'Real Estate'
      },
      {
        title: 'Multi-Specialty Clinic in George Town',
        result: '+180 Monthly Patient Appointments',
        detail: 'Optimized local Google Maps citations, patient reviews strategy, and localized healthcare SEO.',
        tag: 'Healthcare'
      }
    ],
    localFaqs: [
      {
        question: 'Why is digital marketing essential for businesses in Prayagraj?',
        answer: 'Prayagraj is a major educational, legal, and commercial hub in Uttar Pradesh. Over 85% of consumers search online before selecting a college, doctor, real estate property, or store. Digital marketing puts your brand directly in front of active buyers.'
      },
      {
        question: 'How do you help education and coaching institutes in Prayagraj?',
        answer: 'We design dedicated admission enrollment funnels combining Meta lead ads, Google Search ads, SMS/WhatsApp automation, and landing page CRO to maximize seat fill rates at low cost-per-lead.'
      },
      {
        question: 'Can you manage campaigns for major events like Mahakumbh in Prayagraj?',
        answer: 'Absolute yes! We engineer high-velocity seasonal and event-based marketing strategies to capture tourist traffic, hotel bookings, transportation, and regional commerce during major regional gatherings.'
      },
      {
        question: 'How can I get started with Matricsmania in Prayagraj?',
        answer: 'Book a free 30-minute growth strategy session with our lead marketing strategist to receive a complimentary digital audit of your Prayagraj business website and competitor analysis.'
      }
    ]
  }
};

interface LocationPageProps {
  locationKey: 'varanasi' | 'prayagraj';
  onNavigate: (page: PageType) => void;
  onNavigateToLocation: (slug: string) => void;
  onOpenBooking: (prefill?: any) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  locationKey,
  onNavigate,
  onNavigateToLocation,
  onOpenBooking,
  onShowToast,
}) => {
  const data = LOCATION_DATA_MAP[locationKey];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Set document title
  useEffect(() => {
    document.title = data.pageTitle;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [locationKey, data.pageTitle]);

  const otherKey = locationKey === 'varanasi' ? 'prayagraj' : 'varanasi';
  const otherData = LOCATION_DATA_MAP[otherKey];

  return (
    <div className="min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 animate-fade-in pb-20">
      {/* Top Location Breadcrumb Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Service Area: {data.cityName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              Serving {data.cityName} & Uttar Pradesh Region
            </span>

            {/* Switch Location Link */}
            <button
              onClick={() => onNavigateToLocation(otherData.slug)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              <span>Switch to {otherData.cityName} Agency</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-16 pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-950 dark:via-[#090d16] dark:to-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{data.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {data.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {data.heroDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenBooking({ city: data.cityName })}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free {data.cityName} Audit Call</span>
              </button>
            </div>
          </div>

          {/* Key Localities Served Pills */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Key Localities & Commercial Hubs We Cover in {data.cityName}:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keyLocalities.map((loc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs"
                >
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.localStats.map((st, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-sm"
              >
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                  {st.metric}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAILORED SERVICES FOR THE LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Localized Growth Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Digital Marketing Services Tailored for {data.cityName} Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We build localized search, ad, and website strategies designed specifically for {data.cityName}'s competitive market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {srv.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {srv.description}
              </p>

              <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Key Deliverables:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {srv.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL CASE STUDIES */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Proven Local Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Recent Success Stories in {data.cityName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    {cs.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cs.title}
                  </h3>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {cs.result}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cs.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
                  <span>Verified {data.cityName} Campaign</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIT SIMULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <AuditSimulator onOpenBooking={() => onOpenBooking({ city: data.cityName })} />
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Digital Marketing FAQs for {data.cityName}
          </h2>
        </div>

        <div className="space-y-3">
          {data.localFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-500 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dedicated Growth Partner in {data.cityName}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Ready to Dominate Search & Social Media in {data.cityName}?
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Get a 100% free digital marketing audit and customized ROI roadmap for your business in {data.cityName}.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking({ city: data.cityName })}
              className="px-8 py-3.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free {data.cityName} Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Link to other city */}
            <button
              onClick={() => onNavigateToLocation(otherData.slug)}
              className="px-6 py-3.5 rounded-xl bg-blue-950/80 text-white font-bold text-xs sm:text-sm border border-blue-400/30 hover:bg-blue-900 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore {otherData.cityName} Digital Agency</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
