import React, { useState } from 'react';
import { getLocationBySlug, getAllLocations } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import {
  ArrowRight,
  ChevronDown,
  Search,
  Zap,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  MapPin,
  Compass,
} from 'lucide-react';

interface LocationTemplateProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const LocationTemplate: React.FC<LocationTemplateProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const location = getLocationBySlug(slug) || getLocationBySlug('bangalore')!;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const canonicalUrl = `https://matricsmania.com/locations/${location.slug}/`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `MatricsMania — ${location.name} Growth Agency`,
    description: location.overview,
    url: canonicalUrl,
    telephone: location.address.phone,
    email: location.address.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.locality,
      addressRegion: location.address.state,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.address.geo.lat,
      longitude: location.address.geo.lng,
    },
    openingHours: location.address.hours,
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title={location.meta.title}
        description={location.meta.description}
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* 01. HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <ScrollReveal className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              {location.heroBadge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {location.h1}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#E2E8F0] leading-relaxed">
              {location.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {location.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking({ location: location.name })}
                className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                Book {location.name} Strategy Briefing
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/case-studies/')}
                className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-[#94A3B8] hover:text-white font-medium text-sm transition-all"
              >
                View Regional Proof
              </button>
            </div>
          </ScrollReveal>

          {/* 04 - STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {location.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1.5"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#60A5FA] font-mono">
                  {st.value}
                </div>
                <div className="text-xs font-bold text-white">{st.label}</div>
                <div className="text-[11px] text-[#94A3B8] font-mono">{st.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. KEY SECTORS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Local Market Dynamics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sectors We Power in {location.name}
            </h2>
            <p className="text-sm text-[#94A3B8]">{location.marketDescription}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {location.sectors.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2 hover:border-[#2563EB]/40 transition-colors"
              >
                <h3 className="text-base font-bold text-white">{sec.name}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. CORE SERVICES */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Specialized Systems
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Growth Engineering Disciplines
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {location.services.map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-[#60A5FA] font-bold">{srv.number} // SERVICE</div>
                </div>
                <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                <div className="space-y-2">
                  {srv.capabilities.map((cap, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#E2E8F0] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      {cap}
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate(`/services/${srv.slug}/`)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
                  >
                    View technical architecture →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CORRIDORS / REGIONAL MAP */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Regional Reach
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Key Technology Corridors in {location.name}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {location.techCorridors.map((hub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2"
              >
                <div className="text-xs font-mono text-[#60A5FA]">{hub.hubType}</div>
                <h3 className="text-base font-bold text-white">{hub.name}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{hub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. PHYSICAL PRESENCE & ADDRESS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] uppercase">
              <MapPin className="w-4 h-4" />
              Official Presence
            </div>
            <h3 className="text-2xl font-bold text-white">{location.address.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-[#94A3B8]">
              <div className="space-y-1">
                <div className="text-white font-bold text-sm">Physical Office</div>
                <div>{location.address.street}</div>
                <div>{location.address.locality}</div>
                <div>
                  {location.address.city}, {location.address.state} {location.address.postalCode}
                </div>
                <div>{location.address.country}</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-bold text-sm">Direct Contact</div>
                <div>Phone: {location.address.phone}</div>
                <div>Email: {location.address.email}</div>
                <div>Hours: {location.address.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. FAQS */}
      <section className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center space-y-3 mb-12">
            <div className="text-xs font-mono text-[#60A5FA] tracking-wider uppercase">
              // Location Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {location.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0D1424] border border-[#1E293B] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-white hover:text-[#60A5FA] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748B] transition-transform ${
                        isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07. FINAL CTA */}
      <section className="py-20 text-center bg-[#090E1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Looking for a digital growth partner in {location.name}?
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Tell us about your acquisition hurdles and commercial goals.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact/')}
              className="px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
