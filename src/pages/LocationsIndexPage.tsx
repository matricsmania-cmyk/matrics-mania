import React, { useState } from 'react';
import { getAllLocations } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import {
  MapPin,
  Building2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Search,
  Sliders,
} from 'lucide-react';

interface LocationsIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const LocationsIndexPage: React.FC<LocationsIndexPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const locations = getAllLocations();
  const [calcCity, setCalcCity] = useState<'Bangalore' | 'Delhi NCR' | 'Mumbai' | 'Hyderabad' | 'Pune'>('Bangalore');
  const [calcMonthlyBudget, setCalcMonthlyBudget] = useState<number>(75000);

  const calculateEstimates = () => {
    let multiplier = 4.8;
    const projectedPipeline = Math.round(calcMonthlyBudget * multiplier);
    const estimatedLeads = Math.max(25, Math.round(calcMonthlyBudget / 420));
    return {
      projectedPipeline: '₹' + projectedPipeline.toLocaleString('en-IN'),
      estimatedLeads,
      multiplier: multiplier.toFixed(1) + 'x',
    };
  };

  const est = calculateEstimates();
  const canonicalUrl = 'https://matricsmania.com/locations/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Regional Growth Hubs & Local Offices',
    description: 'MatricsMania physical offices and regional growth engineering centers.',
    url: canonicalUrl,
    itemListElement: locations.map((loc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: loc.name,
      url: `https://matricsmania.com/locations/${loc.slug}/`,
    })),
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title="Regional Growth Hubs & Local Markets | MatricsMania"
        description="Explore our regional growth engineering hubs across major technology and business corridors."
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              // Regional Footprint
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Regional Growth Hubs & Local Dominance
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              We combine deep local market presence with global growth engineering standards across key technology and enterprise centers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* LOCATIONS LIST */}
      <section className="py-16 md:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6 hover:border-[#2563EB]/50 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#60A5FA] px-2.5 py-1 rounded bg-[#131D33] border border-[#1E293B]">
                    {loc.heroBadge}
                  </span>
                  <span className="text-xs font-mono text-[#10B981] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.name}, {loc.country}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {loc.h1}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{loc.overview}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                {loc.stats.map((st, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                    <div className="text-2xl font-bold text-[#60A5FA] font-mono">{st.value}</div>
                    <div className="text-xs font-bold text-white mt-1">{st.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/locations/${loc.slug}/`)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                >
                  Explore {loc.name} Hub & Case Studies →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
