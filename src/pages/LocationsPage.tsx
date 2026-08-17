import React, { useState } from 'react';
import { PageType } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  MapPin,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Search,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Award,
  Globe,
  Sliders,
  Calendar,
  Zap,
} from 'lucide-react';

interface LocationsPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToLocation?: (slug: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onNavigate,
  onNavigateToLocation,
  onOpenBooking,
}) => {
  // Interactive Local ROI Calculator State
  const [calcCity, setCalcCity] = useState<'Bangalore' | 'Delhi NCR' | 'Mumbai' | 'Hyderabad' | 'Pune'>('Bangalore');
  const [calcMonthlyBudget, setCalcMonthlyBudget] = useState<number>(75000);
  const [calcSector, setCalcSector] = useState<'B2B SaaS' | 'D2C E-Commerce' | 'Real Estate' | 'Healthcare' | 'Enterprise'>('B2B SaaS');

  const calculateEstimates = () => {
    let multiplier = 4.6;
    if (calcCity === 'Bangalore') multiplier = 4.8;
    if (calcCity === 'Delhi NCR') multiplier = 4.2;
    if (calcCity === 'Mumbai') multiplier = 4.4;
    if (calcCity === 'Hyderabad') multiplier = 4.5;
    if (calcCity === 'Pune') multiplier = 4.1;

    const projectedPipeline = Math.round(calcMonthlyBudget * multiplier);
    const estimatedLeads = Math.max(25, Math.round(calcMonthlyBudget / 420));
    const estimatedImpressions = Math.round(calcMonthlyBudget * 22);
    const googleMapPackDays = '25-40 days';

    return {
      projectedPipeline: '₹' + projectedPipeline.toLocaleString('en-IN'),
      estimatedLeads,
      estimatedImpressions: estimatedImpressions.toLocaleString('en-IN'),
      googleMapPackDays,
      multiplier: multiplier.toFixed(1) + 'x',
    };
  };

  const calcResults = calculateEstimates();

  const primaryHub = {
    city: 'Bangalore',
    state: 'Karnataka',
    slug: 'locations/bangalore',
    badge: 'Flagship Tech & Growth Hub',
    headline: 'Digital Marketing & Growth Agency in Bangalore',
    description:
      'Scale your high-growth tech startup, D2C brand, luxury real estate project, or healthcare enterprise with precision AI-driven SEO, Meta/Google performance marketing, and full-funnel CRO across Indiranagar, Koramangala, HSR Layout, Whitefield, and Outer Ring Road.',
    localities: [
      'Indiranagar',
      'Koramangala',
      'HSR Layout',
      'Whitefield',
      'Bellandur & ORR',
      'Electronic City',
      'Jayanagar & JP Nagar',
      'MG Road & Lavelle Rd',
    ],
    stats: [
      { value: '4.6x+', label: 'Avg Client ROAS' },
      { value: '380+', label: 'Top-3 Keywords' },
      { value: '120+', label: 'Brands Scaled' },
      { value: '99.4%', label: 'Retention Rate' },
    ],
    specialties: [
      'B2B SaaS Demand Generation & Account-Based Marketing (ABM)',
      'High-ROAS D2C E-Commerce Shopify & Omnichannel Funnels',
      'Ultra-Luxury Real Estate & Villa Buyer Lead Engines',
      'AI Search Visibility (ChatGPT & Perplexity LLM Citations)',
    ],
    address: 'Indiranagar 100ft Road / HSR Sector 1 Tech Corridor, Bengaluru 560038',
    tag: 'India’s Silicon Valley Growth Capital',
  };

  const expansionNodes = [
    {
      city: 'Delhi NCR',
      region: 'National Capital Region',
      role: 'Enterprise & Media Desk',
      tagline: 'High-velocity D2C brands, venture-backed startups, and enterprise brand building.',
      status: 'Strategic Media Desk',
      corridors: ['Cyber City Gurugram', 'Noida Sec 62', 'Connaught Place', 'South Delhi'],
      focus: 'Multi-million rupee programmatic media buying, generative AI SEO, and corporate positioning.',
    },
    {
      city: 'Mumbai',
      region: 'Maharashtra & West Coast',
      role: 'Commercial & Luxury Desk',
      tagline: 'Luxury real estate developers, hospitality chains, and corporate finance.',
      status: 'Media & Production Desk',
      corridors: ['BKC Bandra', 'Lower Parel', 'Andheri West', 'Nariman Point'],
      focus: 'High-production creative campaigns, ultra-luxury buyer targeting, and financial services acquisition.',
    },
    {
      city: 'Hyderabad',
      region: 'Telangana & South Central',
      role: 'Pharma, Tech & Commercial Hub',
      tagline: 'HITEC City tech enterprises, healthcare networks, and residential developments.',
      status: 'Growth Partner Unit',
      corridors: ['HITEC City', 'Gachibowli', 'Madhapur', 'Jubilee Hills', 'Banjara Hills'],
      focus: 'High-intent B2B search acquisition, multi-specialty healthcare patient funnels, and real estate PPC.',
    },
    {
      city: 'Pune',
      region: 'Western Tech Corridor',
      role: 'Manufacturing & SaaS Node',
      tagline: 'Automotive suppliers, IT consultancies, and emerging consumer brands.',
      status: 'Regional Delivery Desk',
      corridors: ['Hinjewadi IT Park', 'Kalyani Nagar', 'Viman Nagar', 'Baner'],
      focus: 'B2B export SEO, LinkedIn decision-maker targeting, and localized conversion rate optimization.',
    },
  ];

  const handleGoToBangalore = () => {
    if (onNavigateToLocation) {
      onNavigateToLocation('locations/bangalore');
    } else {
      window.history.pushState({}, '', '/locations/bangalore');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#070B14] text-white space-y-20 pb-24 transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Dedicated Agency Locations Engineered for <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Market Dominance</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mx-auto">
            Generic agencies apply one-size-fits-all playbooks. We deploy on-ground market intelligence, localized search domination, geo-fenced high-ROAS ads, and conversion architectures tuned directly to your market.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleGoToBangalore}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-[#0D1424] text-white border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#60A5FA]" />
              <span>Explore Bangalore Hub (/locations/bangalore)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenBooking({ serviceInterest: 'Regional Growth Consultation' })}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white hover:from-[#1D4ED8] hover:to-[#7C3AED] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2 shadow-blue-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Growth Audit</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. PRIMARY FLAGSHIP HUB - BANGALORE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Featured Agency Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bangalore Innovation & Growth Center
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] max-w-md">
            Click to view our specialized tech, D2C, and enterprise growth playbook for Bengaluru.
          </p>
        </div>

        <ScrollReveal
          className="p-8 md:p-12 rounded-3xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all space-y-8 shadow-sm hover:shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#131D33] flex items-center justify-center text-[#60A5FA] border border-[#1E293B]">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {primaryHub.city} Flagship Hub
                    </h3>
                    <span className="text-xs text-[#60A5FA] font-bold uppercase tracking-wider">
                      {primaryHub.tag}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#131D33] text-[#60A5FA] border border-[#1E293B]">
                  {primaryHub.badge}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white leading-snug">
                  {primaryHub.headline}
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {primaryHub.description}
                </p>
              </div>

              {/* Key Local Metric Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {primaryHub.stats.map((st, sidx) => (
                  <div
                    key={sidx}
                    className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-center"
                  >
                    <span className="text-lg font-extrabold text-[#60A5FA] block">
                      {st.value}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-semibold block leading-tight">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Localities */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white block">
                  High-Priority Bangalore Business Corridors:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {primaryHub.localities.map((loc) => (
                    <span
                      key={loc}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-[#131D33] text-[#60A5FA] border border-[#1E293B] flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-[#60A5FA]" />
                      <span>{loc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specialties & CTA Column */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] block">
                  Core Practice Areas
                </span>
                <ul className="space-y-2.5">
                  {primaryHub.specialties.map((spec, specIdx) => (
                    <li key={specIdx} className="flex items-start gap-2 text-xs text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1E293B]">
                <button
                  onClick={handleGoToBangalore}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-sm shadow-blue-500/20"
                >
                  <span>Open Bangalore Hub Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenBooking({ location: 'Bangalore', serviceInterest: 'Bangalore Growth Audit' })}
                  className="w-full py-3 px-4 rounded-xl border border-[#1E293B] hover:border-[#2563EB]/40 text-xs font-bold text-[#60A5FA] transition-colors cursor-pointer text-center"
                >
                  Schedule Bangalore Audit Call
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. NATIONAL NETWORK NODES */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              National Strategy & Media Desks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Strategic Regional Desks Across Key Commercial Corridors
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Our distributed strategy, media production, and engineering pods power high-scale campaigns across India’s core business hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expansionNodes.map((node) => (
              <div
                key={node.city}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-4 flex flex-col justify-between hover:border-[#2563EB]/40 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#60A5FA] uppercase tracking-wider">
                      {node.role}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {node.city}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#60A5FA] block">
                    {node.region}
                  </span>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {node.tagline}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white block mb-1.5">
                      Key Corridors:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {node.corridors.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#131D33] text-white border border-[#1E293B]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E293B]">
                  <button
                    onClick={() => onOpenBooking({ location: node.city, serviceInterest: `${node.city} Regional Strategy` })}
                    className="text-xs font-bold text-[#60A5FA] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request {node.city} Deck</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. INTERACTIVE CITY ROI & LOCAL GROWTH SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-8 md:p-12 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Growth Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Simulate Your Target City ROI Potential
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Configure your market parameters to project lead velocity, Google 3-Pack rank progression, and target return on ad spend.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white block">
                  1. Select Target Regional Hub / Market
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['Bangalore', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Pune'] as const).map((city) => (
                    <button
                      key={city}
                      onClick={() => setCalcCity(city)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                        calcCity === city
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-xs'
                          : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#2563EB]/40'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Sector Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white block">
                  2. Select Industry Sector
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['B2B SaaS', 'D2C E-Commerce', 'Real Estate', 'Healthcare', 'Enterprise'] as const).map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setCalcSector(sec)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                        calcSector === sec
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent shadow-xs'
                          : 'bg-[#070B14] border-[#1E293B] text-[#94A3B8] hover:border-[#2563EB]/40'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Ad Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white">3. Monthly Marketing & Media Budget</span>
                  <span className="text-[#60A5FA] font-extrabold text-sm">
                    ₹{calcMonthlyBudget.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="1000000"
                  step="25000"
                  value={calcMonthlyBudget}
                  onChange={(e) => setCalcMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#94A3B8]">
                  <span>₹30K (Starter Pod)</span>
                  <span>₹5L (Growth Scale)</span>
                  <span>₹10L+ (Market Leader)</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
                  {calcCity} • {calcSector}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#2563EB]/20 text-[#60A5FA] font-bold border border-[#2563EB]/40">
                  {calcResults.multiplier} Target ROAS
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-[#94A3B8] block uppercase font-medium">
                    Estimated Monthly Inbound Pipeline Leads
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {calcResults.estimatedLeads}+ Qualified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B]">
                    <span className="text-[10px] text-[#94A3B8] block">Projected Revenue Pipeline</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#60A5FA]">
                      {calcResults.projectedPipeline}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B]">
                    <span className="text-[10px] text-[#94A3B8] block">Search 3-Pack Ramp</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      {calcResults.googleMapPackDays}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() =>
                    onOpenBooking({
                      location: calcCity,
                      industry: calcSector,
                      budget: `₹${calcMonthlyBudget.toLocaleString('en-IN')}/mo`,
                    })
                  }
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Claim Custom {calcCity} Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="bg-[#070B14] text-white py-20 border-t border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Ready to Outscale Your Competitors?
          </h2>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Schedule a 1-on-1 strategy call with our growth team to review your market landscape, search ranking gaps, and 90-day execution roadmap.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking({ serviceInterest: 'Location Strategy Consultation' })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs md:text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleGoToBangalore}
              className="px-6 py-4 rounded-xl border border-[#1E293B] hover:border-[#2563EB]/40 text-white font-bold text-xs md:text-sm transition-all cursor-pointer"
            >
              Explore Bangalore Hub
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
