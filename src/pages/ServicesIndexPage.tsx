import React from 'react';
import { getAllServices } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, CheckCircle2, Search, Target, Layout, Database } from 'lucide-react';

interface ServicesIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const services = getAllServices();

  const canonicalUrl = 'https://matricsmania.com/services/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Growth Services & Disciplines',
    description: 'Specialized digital marketing, technical search, and acquisition engineering services.',
    url: canonicalUrl,
    itemListElement: services.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.name,
      url: `https://matricsmania.com/services/${s.slug}/`,
    })),
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title="Digital Growth Services & Disciplines | MatricsMania"
        description="Explore our specialized digital growth disciplines: Technical SEO, Generative AI Search (GEO), Paid Performance Media, and Conversion Engineering."
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              // Core Capabilities
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Specialized Growth Engineering Disciplines
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              We do not sell generic agency retainers. We design, build, and optimize modular acquisition systems engineered for measurable unit economics.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.slug}
                className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6 hover:border-[#2563EB]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#60A5FA] font-bold">
                      0{idx + 1} // {service.eyebrow}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">SYSTEM ARCHITECTURE</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {service.name}
                  </h2>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {service.heroDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                    <div className="text-xs font-mono text-[#64748B] uppercase">Solves For:</div>
                    <p className="text-xs text-[#CBD5E1] font-mono">{service.snapshot.whatItSolves}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}/`)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                  >
                    Explore service architecture →
                  </button>
                  <button
                    onClick={() => onOpenBooking({ service: service.name })}
                    className="text-xs font-mono text-[#94A3B8] hover:text-[#60A5FA]"
                  >
                    Book Audit
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
