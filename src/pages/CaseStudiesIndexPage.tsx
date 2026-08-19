import React from 'react';
import { getAllCaseStudies } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

interface CaseStudiesIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const CaseStudiesIndexPage: React.FC<CaseStudiesIndexPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const caseStudies = getAllCaseStudies();

  const canonicalUrl = 'https://matricsmania.com/case-studies/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Validated Case Studies & Commercial Proof',
    description: 'Engineering-grade case studies detailing search architecture, conversion funnels, and revenue outcomes.',
    url: canonicalUrl,
    itemListElement: caseStudies.map((cs, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: cs.headline,
      url: `https://matricsmania.com/case-studies/${cs.slug}/`,
    })),
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title="Case Studies & Growth Engineering Proof | MatricsMania"
        description="Detailed breakdowns of how MatricsMania engineers inbound moats, sub-second web platforms, and down-funnel acquisition engines."
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#10B981] uppercase">
              // Mathematical Proof
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Evidence-Based Case Studies
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              We document real architectural audits, baseline constraints, phased sprints, and audited commercial results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="py-16 md:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.slug}
              className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6 hover:border-[#2563EB]/50 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#60A5FA] px-2.5 py-1 rounded bg-[#131D33] border border-[#1E293B]">
                    {cs.clientIndustry}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {cs.location}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#10B981]">{cs.snapshot.engagementDuration}</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {cs.headline}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{cs.subheadline}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                {cs.heroMetrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                    <div className="text-2xl font-bold text-[#60A5FA] font-mono">{m.value}</div>
                    <div className="text-xs font-bold text-white mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/case-studies/${cs.slug}/`)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                >
                  Read in-depth technical case study →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
