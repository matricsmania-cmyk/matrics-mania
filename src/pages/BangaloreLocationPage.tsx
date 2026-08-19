import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  TrendingUp,
  Cpu,
  Globe2,
  CheckCircle2,
  Share2,
  ShieldCheck,
  BarChart3,
  Layers,
  Sparkles,
  Target,
  ArrowDown,
  Compass,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface BangaloreLocationPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToLocation?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: string) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onOpenBooking: (prefill?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const BangaloreLocationPage: React.FC<BangaloreLocationPageProps> = ({
  onNavigate,
  onNavigateToLocation,
  onNavigateToIndustrySlug,
  onNavigateToServiceSlug,
  onOpenBooking,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Digital Marketing Agency Bangalore | Search, AI, Paid Media & CRO | MatricsMania';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // 02 - Local Market Categories
  const bangaloreSectors = [
    { name: 'Technology', desc: 'Enterprise software, cloud platforms & IT consulting' },
    { name: 'Startups', desc: 'High-velocity early-stage & venture-funded innovators' },
    { name: 'SaaS', desc: 'B2B subscription products scaling international pipeline' },
    { name: 'Enterprise', desc: 'Established corporations modernizing digital acquisition' },
    { name: 'Professional Services', desc: 'Legal, financial advisory, architecture & consulting' },
    { name: 'Real Estate', desc: 'Premium commercial developments & luxury residential' },
    { name: 'Healthcare', desc: 'Specialized healthtech, hospital networks & clinics' },
    { name: 'Education', desc: 'Edtech platforms, universities & executive institutes' },
    { name: 'Ecommerce', desc: 'High-growth D2C brands & omnichannel retail networks' },
  ];

  // 03 - Services For This Market
  const marketServices = [
    {
      number: '01',
      title: 'Search & AI Visibility',
      capabilities: ['SEO', 'Technical SEO', 'AEO (Answer Engine Opt.)', 'GEO (Generative Engine Opt.)', 'AI Search Citations'],
      icon: Search,
      slug: 'technical-seo',
    },
    {
      number: '02',
      title: 'Performance Marketing',
      capabilities: ['Google Ads (Search & PMax)', 'Meta Ads (Facebook & IG)', 'LinkedIn B2B Ads', 'Paid Search Architecture'],
      icon: Target,
      slug: 'performance-marketing',
    },
    {
      number: '03',
      title: 'Digital Experience',
      capabilities: ['Website Design & Dev', 'Conversion Rate Optimization (CRO)', 'High-Converting Landing Pages', 'Speed Optimization'],
      icon: Cpu,
      slug: 'conversion-rate-optimization',
    },
    {
      number: '04',
      title: 'Content & Authority',
      capabilities: ['Content Strategy & Topic Maps', 'Founder Thought Leadership', 'Digital PR & Entity Building', 'Semantic Cluster Models'],
      icon: Layers,
      slug: 'technical-seo',
    },
    {
      number: '05',
      title: 'Automation',
      capabilities: ['CRM Architecture & Sync', 'Multi-Stage Lead Nurturing', 'Marketing Automation Flows', 'Pipeline Attribution'],
      icon: Zap,
      slug: 'analytics-attribution',
    },
  ];

  // 04 - Local Business Challenges
  const localChallenges = [
    {
      number: '01',
      title: 'HIGH DIGITAL COMPETITION',
      description: 'Technology and digitally mature businesses compete aggressively for search visibility and organic ranking dominance.',
    },
    {
      number: '02',
      title: 'EXPENSIVE ACQUISITION',
      description: 'Paid channels become increasingly expensive when multiple venture-funded companies bid on the same high-intent audience keywords.',
    },
    {
      number: '03',
      title: 'SHORTER DECISION CYCLES',
      description: 'Discerning B2B buyers and consumers compare multiple providers across digital touchpoints before starting a conversation.',
    },
    {
      number: '04',
      title: 'MULTI-CHANNEL DISCOVERY',
      description: 'Customers discover companies across non-linear paths: Google Search, LinkedIn feeds, YouTube reviews, AI search overviews, and peer referrals.',
    },
  ];

  // 05 - How We Work
  const deliverySteps = [
    {
      step: '01',
      name: 'DISCOVER',
      description: 'Understand your business economics, local competitive dynamics, and growth objectives through deep technical analysis.',
    },
    {
      step: '02',
      name: 'PLAN',
      description: 'Build a location- and business-specific growth roadmap designed for sustainable pipeline expansion.',
    },
    {
      step: '03',
      name: 'EXECUTE',
      description: 'Work seamlessly with your internal marketing team or manage the entire technical execution end-to-end.',
    },
    {
      step: '04',
      name: 'MEASURE',
      description: 'Track real acquisition, organic keyword footprint, AI search citations, and bottom-line revenue conversion.',
    },
    {
      step: '05',
      name: 'OPTIMIZE',
      description: 'Continuously iterate and scale performance based on rigorous empirical evidence and user feedback.',
    },
  ];

  // 06 - Industries
  const industriesList = [
    { name: 'SaaS & Technology', slug: 'saas', desc: 'B2B subscription platforms scaling US, EU & Pan-India ARR' },
    { name: 'Startups', slug: 'saas', desc: 'Venture-backed innovators demanding rapid CAC-to-LTV payback' },
    { name: 'Professional Services', slug: 'professional-services', desc: 'Consulting, legal & accounting firms seeking qualified inbound' },
    { name: 'Real Estate', slug: 'real-estate', desc: 'Commercial developments and ultra-luxury residential properties' },
    { name: 'Healthcare', slug: 'healthcare', desc: 'Digital health providers, clinic networks & medical innovators' },
    { name: 'Education', slug: 'b2b', desc: 'Edtech platforms and higher learning institutions' },
    { name: 'Ecommerce', slug: 'ecommerce', desc: 'Omnichannel D2C brands optimizing repeat purchase and margins' },
    { name: 'B2B Companies', slug: 'b2b', desc: 'Industrial, logistics, and enterprise service providers' },
  ];

  // 07 - Local Market Intelligence
  const intelligenceFunnel = [
    {
      stage: 'SEARCH',
      role: 'High-Intent Demand',
      description: 'Captures buyers actively looking for exact solutions with commercial search queries.',
    },
    {
      stage: 'CONTENT',
      role: 'Answer Real Questions',
      description: 'Addresses specific technical and operational questions that prospective clients actually ask.',
    },
    {
      stage: 'AI',
      role: 'Entity & Brand Visibility',
      description: 'Ensures your company is cited and recommended inside ChatGPT, Perplexity, and Google AI Overviews.',
    },
    {
      stage: 'PAID',
      role: 'Immediate Demand Capture',
      description: 'Targets precise decision-maker personas on Google and LinkedIn to accelerate pipeline velocity.',
    },
    {
      stage: 'WEBSITE',
      role: 'Convert The Demand',
      description: 'Removes user friction through fast page speeds, clear positioning, and high-trust conversion funnels.',
    },
  ];

  // 09 - Global Execution Reach
  const reachNodes = [
    {
      region: 'BANGALORE',
      role: 'Our operating base',
      desc: 'Local headquarters anchoring strategy, engineering, and direct client consultation.',
      badge: 'Primary HQ',
    },
    {
      region: 'INDIA',
      role: 'Tier-one national markets',
      desc: 'Serving high-growth businesses across Mumbai, Delhi NCR, Hyderabad, and Pune.',
      badge: 'National Coverage',
    },
    {
      region: 'US',
      role: 'International growth market',
      desc: 'Scaling B2B SaaS demand and cross-border commercial customer acquisition.',
      badge: 'North America',
    },
    {
      region: 'UK',
      role: 'International growth market',
      desc: 'Targeted European expansion programs adhering to local digital standards.',
      badge: 'Europe & UK',
    },
    {
      region: 'CANADA',
      role: 'International growth market',
      desc: 'Multi-regional search visibility and paid media performance engines.',
      badge: 'Cross-Border',
    },
  ];

  // 10 - Related Services
  const relatedServices = [
    {
      title: 'Technical SEO',
      desc: 'Architectural crawlability, schema engineering, and core performance optimization.',
      slug: 'technical-seo',
    },
    {
      title: 'Google Ads',
      desc: 'High-intent search, Performance Max, and conversion-focused paid infrastructure.',
      slug: 'performance-marketing',
    },
    {
      title: 'LinkedIn Ads',
      desc: 'Targeted B2B decision-maker acquisition and account-based marketing.',
      slug: 'b2b-abm',
    },
    {
      title: 'AI Search Optimization',
      desc: 'Generative Engine Optimization (GEO/AEO) for ChatGPT, Claude, and Perplexity.',
      slug: 'technical-seo',
    },
    {
      title: 'Conversion Rate Optimization',
      desc: 'Scientific friction elimination and revenue-focused landing page testing.',
      slug: 'conversion-rate-optimization',
    },
    {
      title: 'Web Design & Engineering',
      desc: 'High-performance, responsive websites engineered for buyer conversion velocity.',
      slug: 'conversion-rate-optimization',
    },
  ];

  // 11 - FAQ items directly matching user specification
  const faqs = [
    {
      question: 'Do you work with businesses in Bangalore?',
      answer:
        'Yes. We work closely with startups, growth-stage tech companies, and established enterprises across Bangalore—including Indiranagar, Koramangala, HSR Layout, Whitefield, Bellandur, and Electronic City.',
    },
    {
      question: 'Are you based in Bangalore?',
      answer:
        'Yes. Bangalore is our primary operational headquarters. Having our base here gives us immediate proximity to India’s most dynamic tech, venture capital, and digital commerce ecosystem.',
    },
    {
      question: 'What digital marketing services do you provide in Bangalore?',
      answer:
        'We engineer integrated growth systems: Search & AI Visibility (SEO, Technical SEO, AEO/GEO), Performance Marketing (Google Ads, Meta Ads, LinkedIn ABM), Digital Experience (Web Design, CRO), Content Strategy, and Marketing Automation.',
    },
    {
      question: 'Do you work with Bangalore startups and SaaS companies?',
      answer:
        'Extensively. We build tailored go-to-market architectures and demand generation pipelines designed around the rapid iteration cycles, unit economics, and pipeline goals of venture-backed SaaS and tech startups.',
    },
    {
      question: 'Can you work with our internal marketing team?',
      answer:
        'Yes. We operate flexibly either as your complete end-to-end growth team or as an embedded specialized unit collaborating directly with your in-house marketing leaders, designers, and software engineers.',
    },
    {
      question: 'Do you serve businesses outside Bangalore?',
      answer:
        'Yes. While anchored in Bangalore, we actively serve tier-one commercial markets across India including Mumbai, Delhi NCR, Hyderabad, Chennai, and Pune through a streamlined remote operating model.',
    },
    {
      question: 'Do you work with international clients?',
      answer:
        'Yes. A significant portion of our client programs support international expansion—specifically helping companies acquire enterprise customers across the United States, United Kingdom, Canada, and global markets.',
    },
    {
      question: 'How does your engagement process work?',
      answer:
        'Our engagements follow a transparent 5-step framework: Discover (deep audit & objectives), Plan (custom growth roadmap), Execute (channel implementation), Measure (multi-touch attribution), and Optimize (evidence-based scaling).',
    },
  ];

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* 01 — HERO */}
      <section className="relative border-b border-[#1E293B] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
                <span>DIGITAL MARKETING AGENCY — BANGALORE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Digital marketing built for ambitious businesses in Bangalore.
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                MatricsMania helps businesses build visibility, generate qualified demand and improve digital acquisition across search, AI discovery, paid media and conversion.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() =>
                    onOpenBooking({
                      serviceInterest: 'Bangalore Digital Marketing Consultation',
                      sourceLocation: 'Bangalore Location Page',
                    })
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#2563EB]/25 cursor-pointer"
                >
                  <span>Discuss Your Growth</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 flex items-center gap-2 text-xs font-medium text-[#64748B]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Based in Bangalore · Serving India &amp; international markets</span>
              </div>
            </ScrollReveal>

            {/* Right Abstract Visual (Data / Geographic Flow Node Graph - No Tourism Imagery) */}
            <ScrollReveal delay={0.15} className="lg:col-span-5">
              <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                {/* Header tag */}
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#CBD5E1]">
                      DEMAND ARCHITECTURE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">HUB: BANGALORE</span>
                </div>

                {/* Abstract Node Flow Visualization */}
                <div className="relative py-4 flex flex-col items-center space-y-6">
                  {/* Top: BANGALORE HUB */}
                  <div className="flex flex-col items-center">
                    <div className="px-5 py-2.5 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/50 text-white font-mono text-xs font-bold tracking-widest uppercase shadow-md shadow-[#2563EB]/20 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping" />
                      <span>BANGALORE</span>
                    </div>
                    <div className="w-px h-6 bg-gradient-to-b from-[#2563EB] to-[#1E293B]" />
                  </div>

                  {/* Connecting Branches */}
                  <div className="w-full grid grid-cols-3 gap-3 relative">
                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#070B14] border border-[#1E293B]/80 hover:border-[#60A5FA]/40 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6] mb-1.5" />
                      <span className="text-xs font-bold text-white">Search</span>
                      <span className="text-[10px] text-[#64748B]">Organic / SEO</span>
                    </div>

                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#070B14] border border-[#1E293B]/80 hover:border-[#60A5FA]/40 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mb-1.5" />
                      <span className="text-xs font-bold text-white">AI</span>
                      <span className="text-[10px] text-[#64748B]">GEO / LLMs</span>
                    </div>

                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#070B14] border border-[#1E293B]/80 hover:border-[#60A5FA]/40 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mb-1.5" />
                      <span className="text-xs font-bold text-white">Paid</span>
                      <span className="text-[10px] text-[#64748B]">Google / B2B</span>
                    </div>
                  </div>

                  {/* Downward Funnel Stream */}
                  <div className="flex flex-col items-center w-full">
                    <div className="w-full flex justify-center items-center gap-1 my-1">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1E293B] to-transparent" />
                      <ArrowDown className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1E293B] to-transparent" />
                    </div>

                    {/* Bottom Terminal: QUALIFIED DEMAND */}
                    <div className="w-full mt-2 p-3.5 rounded-xl bg-gradient-to-r from-[#2563EB]/15 via-[#1E293B] to-[#2563EB]/15 border border-[#2563EB]/40 text-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#60A5FA] uppercase block font-semibold">
                        System Outcome
                      </span>
                      <span className="text-sm font-extrabold text-white tracking-wide">
                        QUALIFIED DEMAND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                  <span>Engineered for conversion</span>
                  <span>Zero Tourist Cliché</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 02 — LOCAL POSITIONING */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            LOCAL POSITIONING
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Marketing in Bangalore is different.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Bangalore’s market combines high-density technological innovation with aggressive multi-channel market competition:
          </p>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bangaloreSectors.map((sector, idx) => (
            <ScrollReveal
              key={sector.name}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-xl p-5 hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                <h3 className="text-sm font-bold text-white tracking-wide">{sector.name}</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{sector.desc}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Implication & Solution Cards */}
        <ScrollReveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#0D1424] border border-[#EF4444]/30 rounded-2xl p-6 sm:p-8 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F87171]">
              THE MARKET IMPLICATION
            </span>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Businesses competing in these categories often face high digital competition, expensive acquisition channels and increasingly fragmented customer journeys.
            </p>
          </div>

          <div className="bg-[#0D1424] border border-[#2563EB]/40 rounded-2xl p-6 sm:p-8 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
              THE UNIFIED SYSTEM
            </span>
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
              MatricsMania connects search visibility, paid acquisition, content, website experience and measurement into one integrated growth system.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 03 — SERVICES FOR THIS MARKET */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            WHAT WE DO IN BANGALORE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Targeted Services for the Bangalore Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            We deploy specialized engineering disciplines matched to the acquisition realities of Bangalore’s commercial ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketServices.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <ScrollReveal
                key={svc.number}
                delay={idx * 0.04}
                className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 hover:border-[#60A5FA]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#60A5FA]">
                      {svc.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#60A5FA]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {svc.title}
                  </h3>

                  <ul className="space-y-2 pt-2 border-t border-[#1E293B]">
                    {svc.capabilities.map((cap) => (
                      <li key={cap} className="text-xs font-medium text-[#CBD5E1] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => {
                      if (onNavigateToServiceSlug && svc.slug) {
                        onNavigateToServiceSlug(svc.slug);
                      } else {
                        onOpenBooking({ serviceInterest: svc.title });
                      }
                    }}
                    className="text-xs font-bold text-[#60A5FA] hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Explore Capability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => {
              if (onNavigateToServiceSlug) {
                onNavigateToServiceSlug('technical-seo');
              } else {
                onNavigate('home');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D1424] border border-[#1E293B] text-white font-bold text-xs hover:border-[#60A5FA] transition-colors cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
          </button>
        </div>
      </section>

      {/* 04 — LOCAL BUSINESS CHALLENGES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            LOCAL BUSINESS CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            What businesses in Bangalore are competing for
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Strategic growth requires diagnosing the exact friction points inherent to competing in Bangalore’s digital ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localChallenges.map((ch, idx) => (
            <ScrollReveal
              key={ch.number}
              delay={idx * 0.04}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 space-y-4 hover:border-[#60A5FA]/40 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-[#60A5FA] block">
                {ch.number}
              </span>
              <h3 className="text-sm font-extrabold text-white tracking-wider">
                {ch.title}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {ch.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="p-6 rounded-2xl bg-[#0D1424] border border-[#2563EB]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#CBD5E1]">
            Our approach is built around this exact commercial reality.
          </p>
          <button
            onClick={() => onOpenBooking({ serviceInterest: 'Bangalore Strategy Discussion' })}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Discuss Your Growth
          </button>
        </ScrollReveal>
      </section>

      {/* 05 — HOW WE WORK WITH BUSINESSES HERE */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            HOW WE WORK
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Work With Businesses in Bangalore
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            A remote-first operating model backed by direct local presence—delivering systematic execution without bureaucratic overhead.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {deliverySteps.map((step, idx) => (
            <ScrollReveal
              key={step.step}
              delay={idx * 0.04}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-5 space-y-3 relative group hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#60A5FA]">
                {step.step}
              </div>
              <h3 className="text-sm font-extrabold text-white tracking-wider">
                {step.name}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="p-6 rounded-2xl bg-gradient-to-r from-[#0D1424] via-[#131D33] to-[#0D1424] border border-[#1E293B] text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] uppercase">
            <Compass className="w-4 h-4" />
            <span>OPERATING MANDATE</span>
          </div>
          <p className="text-sm sm:text-base text-white font-medium max-w-2xl mx-auto">
            MatricsMania is based in Bangalore and works with businesses across India and international markets.
          </p>
        </ScrollReveal>
      </section>

      {/* 06 — INDUSTRIES / BUSINESS TYPES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            INDUSTRIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Businesses We Can Help
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Targeted growth playbooks engineered for high-value categories driving the Bangalore commercial landscape.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesList.map((ind, idx) => (
            <ScrollReveal
              key={ind.name}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#1E293B]">
                <button
                  onClick={() => {
                    if (ind.slug === 'real-estate' && onNavigateToIndustrySlug) {
                      onNavigateToIndustrySlug('real-estate');
                    } else {
                      onOpenBooking({ serviceInterest: `${ind.name} Growth Strategy Consultation` });
                    }
                  }}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 07 — LOCAL MARKET INTELLIGENCE */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            LOCAL MARKET INTELLIGENCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Where opportunity exists
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            How modern digital touchpoints compound into sustainable acquisition in high-density competitive environments:
          </p>
        </ScrollReveal>

        {/* Step-by-Step Flow Architecture */}
        <div className="space-y-4">
          {intelligenceFunnel.map((item, idx) => (
            <ScrollReveal
              key={item.stage}
              delay={idx * 0.04}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center font-mono font-bold text-xs text-[#60A5FA]">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#60A5FA] block">
                    {item.stage}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {item.role}
                  </h3>
                </div>
              </div>

              <div className="md:max-w-md text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2">
          <h3 className="text-sm font-bold text-white">How this applies to Bangalore businesses:</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            In a market where decision-makers bounce between search queries, AI assistants, and peer reviews, isolated marketing channels bleed budget. Aligning all 5 tiers creates an unassailable commercial moat.
          </p>
        </ScrollReveal>
      </section>

      {/* 08 — LOCAL PROOF & SELECTED WORK */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            SELECTED WORK
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real work
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            We work from evidence, not inflated client counts.
          </p>
        </ScrollReveal>

        {/* Concrete Case Study Container */}
        <ScrollReveal className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] block">
                CASE STUDY
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Enterprise Cloud &amp; B2B SaaS Infrastructure
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#CBD5E1]">
              Location: Bangalore HQ · US/EU Expansion
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F87171] uppercase tracking-wider">
                CHALLENGE
              </span>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Stagnant pipeline, rising CAC on search ads, and zero citation visibility in emerging AI generative answer engines.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                APPROACH &amp; EXECUTION
              </span>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Overhauled 420+ pages with valid JSON-LD schemas, engineered 18 bottom-funnel comparison engines, and deployed server-side conversion tracking.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                RESULT
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                +312% Organic Qualified Pipeline in 6 months, -42% Blended CAC, and #1 citation footprint in AI search.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-[#CBD5E1]">
              <div>
                <span className="text-lg font-bold text-white block">+312%</span>
                <span className="text-[#64748B]">Pipeline Growth</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">-42%</span>
                <span className="text-[#64748B]">Blended CAC</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">#1</span>
                <span className="text-[#64748B]">AI Citations</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking({ serviceInterest: 'Case Study Architecture Review' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Discuss Similar Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 09 — LOCAL BASE. INTERNATIONAL EXECUTION. */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            LOCAL BASE. INTERNATIONAL EXECUTION.
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Based in Bangalore. Built for businesses beyond Bangalore.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            We operate at global digital standards with the speed, technical acumen, and efficiency native to Bangalore.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {reachNodes.map((node, idx) => (
            <ScrollReveal
              key={node.region}
              delay={idx * 0.04}
              className={`bg-[#0D1424] border rounded-2xl p-5 space-y-3 flex flex-col justify-between ${
                node.region === 'BANGALORE'
                  ? 'border-[#2563EB]/60 bg-[#2563EB]/10'
                  : 'border-[#1E293B] hover:border-[#60A5FA]/40'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                  {node.badge}
                </span>
                <h3 className="text-base font-extrabold text-white tracking-wide">
                  {node.region}
                </h3>
                <p className="text-xs font-medium text-[#CBD5E1]">
                  {node.role}
                </p>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed pt-2 border-t border-[#1E293B]/60">
                {node.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 10 — RELATED SERVICES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            RELATED SERVICES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Relevant capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Explore individual service components designed to integrate directly into your existing acquisition framework.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((rel, idx) => (
            <ScrollReveal
              key={rel.title}
              delay={idx * 0.03}
              className="bg-[#0D1424] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between hover:border-[#60A5FA]/40 transition-colors"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {rel.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#1E293B]">
                <button
                  onClick={() => {
                    if (onNavigateToServiceSlug && rel.slug) {
                      onNavigateToServiceSlug(rel.slug);
                    } else {
                      onOpenBooking({ serviceInterest: rel.title });
                    }
                  }}
                  className="text-xs font-semibold text-[#60A5FA] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Paragraph directly on background above FAQ (without div wrapper) */}
      <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
        Have questions about working with our Bangalore-based team, service scopes, or technical delivery? Review our verified answers below to understand how we support local and global expansion.
      </p>

      {/* 11 — FAQ */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            FAQ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Clear, transparent answers about our location capabilities, engagement models, and execution workflows.
          </p>
        </ScrollReveal>

        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <ScrollReveal
                key={faq.question}
                delay={idx * 0.02}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#0D1424] border-[#60A5FA]/40 shadow-lg shadow-[#2563EB]/5'
                    : 'bg-[#070B14] border-[#1E293B] hover:border-[#334155]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#0D1424] text-[#94A3B8]'
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]/60">
                    {faq.answer}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 12 — FINAL CTA */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA]">
            <span>LOCATION-SPECIFIC GROWTH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Building a business in Bangalore?
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
            Let’s identify the channels, opportunities and constraints that matter most to your growth.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                onOpenBooking({
                  serviceInterest: 'Bangalore Business Growth Discussion',
                  sourceLocation: 'Bangalore Page CTA',
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#2563EB]/30 cursor-pointer"
            >
              <span>Discuss Your Growth</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#64748B] pt-2 font-mono">
            Bangalore · India · International
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
};
