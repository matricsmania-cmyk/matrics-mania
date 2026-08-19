import React from 'react';
import { getAllIndustries } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, Building2 } from 'lucide-react';

interface IndustriesIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const IndustriesIndexPage: React.FC<IndustriesIndexPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const industries = getAllIndustries();

  const canonicalUrl = 'https://matricsmania.com/industries/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industry Specializations',
    description: 'Specialized digital growth systems for high-value B2B and consumer verticals.',
    url: canonicalUrl,
    itemListElement: industries.map((ind, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: ind.name,
      url: `https://matricsmania.com/industries/${ind.slug}/`,
    })),
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title="Industry Verticals & Specialized Acquisition | MatricsMania"
        description="Explore our vertical-specific acquisition systems for Real Estate, Enterprise SaaS, Healthcare, Education, and Professional Services."
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              // Industry Verticals
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Vertical-Specific Growth Systems
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Every market has distinct sales velocity, qualification hurdles, and customer acquisition costs. We build customized funnels tailored to your exact industry unit economics.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-16 md:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <div
                key={ind.slug}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-5 hover:border-[#2563EB]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-[#60A5FA] uppercase tracking-wider">
                    {ind.categoryBadge}
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{ind.name}</h2>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">{ind.overview}</p>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/industries/${ind.slug}/`)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                  >
                    View sector playbook →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
