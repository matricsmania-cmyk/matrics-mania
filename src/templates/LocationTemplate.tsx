'use client';

import React, { useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  BenchmarkMetricsSection,
  FAQAccordionSection,
  ConversionCTASection,
} from '../components/sections';
import { InternalLinkingGraph } from '../components/InternalLinkingGraph';
import { getLocationContextualLinks } from '../utils/internalLinking';
import { Location } from '../models';
import { NotFoundState } from '../components/ErrorStates';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Compass,
  Building2,
  CheckCircle2,
  Globe2,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Navigation,
  Key,
  Laptop,
  Briefcase,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface LocationTemplateProps {
  location?: Location;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const LocationTemplate: React.FC<LocationTemplateProps> = ({
  location: propLocation,
  slug,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const location =
    propLocation ||
    (slug ? provider.getLocationBySlug(slug) : null) ||
    (!slug ? provider.getAllLocations()[0] : null);

  const allLocations = provider.getAllLocations();

  if (!location) {
    if (!slug) {
      return (
        <div className="bg-[#070B14] text-white min-h-screen py-24 px-4 flex items-center justify-center">
          <SEOHead
            title="Global Delivery Hubs & Regional Engineering Centers | MatricsMania"
            description="MatricsMania operational delivery hubs and regional growth engineering centers."
            canonicalUrl="https://matricsmania.com/locations/"
          />
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
              Regional Delivery Hubs
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Global Engineering Hubs
            </h1>
            <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Our growth architects and engineering teams operate across key international tech corridors, coordinating synchronous crawl telemetry, paid attribution, and conversion engineering.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => onOpenBooking?.({ interest: 'Regional Engineering Workshop' })}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Architecture Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <NotFoundState
        attemptedPath={slug ? `/locations/${slug}/` : '/locations/'}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const canonicalUrl = location.seo?.canonicalUrl || `https://matricsmania.com/locations/${location.slug}/`;
  const locationName = location.city || location.title;
  const metaDescription = location.seo?.metaDescription || location.localMarketSummary || location.excerpt;

  const contextualLinks = useMemo(
    () => getLocationContextualLinks(location, provider),
    [location, provider]
  );

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={location.seo}
        entity={location}
        pageType="location"
      />

      {/* 1. BREADCRUMBS */}
      <div className="border-b border-[#1E293B] bg-[#050811] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('/locations/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Locations
          </button>
          <span>/</span>
          <span className="text-[#60A5FA] truncate">{locationName}</span>
        </div>
      </div>

      {/* 2. HERO */}
      <PageHeroSection
        eyebrow={`// ${location.hubType || 'Regional Engineering Hub'}`}
        title={location.title || `${locationName} Digital Growth Lab`}
        subtitle={metaDescription}
        primaryCtaLabel={`Schedule ${locationName} Strategy Session`}
        onPrimaryCta={() =>
          onOpenBooking({
            location: locationName,
            interest: `${locationName} Regional Consultation`,
          })
        }
        secondaryCtaLabel="View Operating Logistics"
        onSecondaryCta={() => {
          const el = document.getElementById('office-logistics');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        metrics={location.marketDrivers?.map((s) => ({
          label: s.title,
          value: s.metric,
        }))}
      />

      {/* 3. LOCATION OVERVIEW & METRICS BAR */}
      <section className="py-12 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Node Status</span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Engineering Node
              </div>
              <p className="text-[11px] text-[#94A3B8]">{location.locationCode || 'LOC-ACTIVE'}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Local Timezone</span>
              <div className="text-sm font-bold text-white font-mono">{location.localTimeZone || 'Local Shift'}</div>
              <p className="text-[11px] text-[#94A3B8]">Synchronized sprint reviews</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Primary Focus Verticals</span>
              <div className="text-sm font-bold text-white truncate">
                {location.targetSectors ? location.targetSectors.slice(0, 2).join(', ') : 'Enterprise Tech'}
              </div>
              <p className="text-[11px] text-[#94A3B8]">High-velocity regional demand</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Languages Supported</span>
              <div className="text-sm font-bold text-white">
                {location.supportedLanguages?.join(', ') || 'English, Local'}
              </div>
              <p className="text-[11px] text-[#94A3B8]">Multilingual search capability</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEOGRAPHIC RELEVANCE */}
      {location.geographicRelevance && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <Globe2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                Geographic Relevance
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Why {locationName} Is a Strategic Growth Epicenter
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Strategic connectivity, talent concentration, and market dynamics driving the {locationName} commercial ecosystem.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#60A5FA]" />
                  <h3 className="text-base font-bold text-white">Ecosystem Density</h3>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {location.geographicRelevance.ecosystemDensity}
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Talent & Architecture Pool</h3>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {location.geographicRelevance.talentPool}
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Time Zone Overlap</h3>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {location.geographicRelevance.timeZoneOverlap}
                </p>
              </div>
            </div>

            {/* Strategic Advantages Checklist */}
            {location.geographicRelevance.strategicAdvantages && (
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                <h3 className="text-base font-bold text-white">Strategic Operating Advantages in {locationName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location.geographicRelevance.strategicAdvantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] p-3 rounded-xl bg-[#070B14] border border-[#1E293B]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. SERVICES & INDUSTRIES SERVED IN THIS LOCATION */}
      <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services Available */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#60A5FA] uppercase tracking-wider">
                  Specialized Solutions
                </span>
                <h3 className="text-xl font-bold text-white">Services Deployed From {locationName}</h3>
              </div>

              <div className="space-y-3">
                {location.relationships?.services && location.relationships.services.length > 0 ? (
                  location.relationships.services.map((srv, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate(srv.url || `/services/${srv.slug}/`)}
                      className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-[#60A5FA]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          {srv.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))
                ) : (
                  provider.getAllServices().slice(0, 4).map((srv, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate(`/services/${srv.slug}/`)}
                      className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-[#60A5FA]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          {srv.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Industries Served */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#60A5FA] uppercase tracking-wider">
                  Market Specializations
                </span>
                <h3 className="text-xl font-bold text-white">Target Sectors in {locationName}</h3>
              </div>

              <div className="space-y-3">
                {location.relationships?.industries && location.relationships.industries.length > 0 ? (
                  location.relationships.industries.map((ind, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate(ind.url || `/industries/${ind.slug}/`)}
                      className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-[#60A5FA]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          {ind.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))
                ) : (
                  provider.getAllIndustries().slice(0, 4).map((ind, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate(`/industries/${ind.slug}/`)}
                      className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-[#60A5FA]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                          {ind.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHYSICAL OFFICE & OPERATING LOGISTICS */}
      <section id="office-logistics" className="py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#3B82F6]" />
              Local Operating Logistics
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {locationName} Engineering Headquarters & Facilities
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Meet our growth architects in person for dedicated full-day sprints, pipeline audits, and quarterly growth reviews.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Address & Direct Routing Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[#60A5FA] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">Office Address</div>
                      <div className="text-base font-bold text-white mt-1">
                        {location.officeNode?.address?.line1 || location.title}
                      </div>
                      <div className="text-sm text-[#94A3B8]">
                        {location.officeNode?.address?.city || location.city}, {location.officeNode?.address?.state || location.stateOrRegion}{' '}
                        {location.officeNode?.address?.postalCode}, {location.officeNode?.address?.country || location.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-[#1E293B] pt-4">
                    <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[#60A5FA] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">Direct Line</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {location.officeNode?.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-[#1E293B] pt-4">
                    <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[#60A5FA] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">Regional Routing</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {location.officeNode?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-[#1E293B] pt-4">
                    <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-[#60A5FA] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#64748B] uppercase">Operating Hours</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {location.officeNode?.businessHours}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E293B]">
                  <button
                    onClick={() =>
                      onOpenBooking({ location: locationName, interest: 'In-person Office Visit' })
                    }
                    className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    <span>Request In-Person Office Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Logistics Details Card */}
            <div className="lg:col-span-6 space-y-6">
              {location.operatingLogistics ? (
                <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-[#1E293B] pb-3">
                    Facility Access & Guidelines
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase flex items-center gap-1.5">
                        <Navigation className="w-3 h-3 text-[#60A5FA]" /> Directions & Arrival
                      </span>
                      <p className="text-xs text-[#CBD5E1]">{location.operatingLogistics.directions}</p>
                    </div>

                    <div className="space-y-1 border-t border-[#1E293B] pt-3">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#60A5FA]" /> Transit & Parking
                      </span>
                      <p className="text-xs text-[#CBD5E1]">{location.operatingLogistics.transportInfo}</p>
                    </div>

                    <div className="space-y-1 border-t border-[#1E293B] pt-3">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase flex items-center gap-1.5">
                        <Key className="w-3 h-3 text-amber-400" /> Security & Check-in
                      </span>
                      <p className="text-xs text-[#CBD5E1]">{location.operatingLogistics.securityProtocol}</p>
                    </div>

                    <div className="space-y-1 border-t border-[#1E293B] pt-3">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-emerald-400" /> Strategy Boardroom Capacity
                      </span>
                      <p className="text-xs text-[#CBD5E1]">{location.operatingLogistics.discoveryWorkshopCapacity}</p>
                    </div>
                  </div>

                  {location.operatingLogistics.keyOnSiteCapabilities && (
                    <div className="border-t border-[#1E293B] pt-4 space-y-2">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">On-Site Infrastructure</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {location.operatingLogistics.keyOnSiteCapabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1] p-2 rounded-lg bg-[#070B14] border border-[#1E293B]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback market drivers if no custom operatingLogistics */
                location.marketDrivers && (
                  <div className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <h3 className="text-lg font-bold text-white">{locationName} Growth Catalysts</h3>
                    <div className="space-y-3">
                      {location.marketDrivers.map((md, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{md.title}</span>
                            <span className="text-xs font-mono text-emerald-400">{md.metric}</span>
                          </div>
                          <p className="text-xs text-[#94A3B8]">{md.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. RELEVANT WORK & REGIONAL CLIENTS */}
      {location.regionalClients && location.regionalClients.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
                Regional Case Evidence
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Selected Work & Verified Results in {locationName}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Empirical evidence of search dominance and CAC reduction engineered for regional market leaders.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {location.regionalClients.map((client, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#64748B]">{client.industry}</span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {client.resultMetric}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{client.clientName}</h3>
                    <p className="text-xs text-[#94A3B8]">Deploying full-funnel search and telemetry in {client.locationArea}</p>
                  </div>

                  <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                    <a
                      href="/case-studies/"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/case-studies/');
                      }}
                      className="text-xs font-mono text-[#60A5FA] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 no-underline"
                    >
                      <span>Explore Case Studies</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CONTEXTUAL KNOWLEDGE GRAPH (SERVICES, INDUSTRIES, INSIGHTS, RELEVANT WORK) */}
      <InternalLinkingGraph
        title={`${locationName} Knowledge Graph`}
        subtitle="Explore engineering services, vertical playbooks, technical research, and verified case studies deployed across this regional hub."
        badge="Regional Ecosystem"
        services={contextualLinks.services}
        industries={contextualLinks.industries}
        insights={contextualLinks.insights}
        caseStudies={contextualLinks.relevantWork}
        onNavigate={onNavigate}
      />

      {/* 9. LOCAL FAQS */}
      {location.faqs && location.faqs.length > 0 && (
        <FAQAccordionSection
          title={`${locationName} Growth FAQs`}
          subtitle="Information on team timezone coverage, engagement frameworks, and site audits."
          faqs={location.faqs}
        />
      )}

      {/* 10. LOCATION SWITCHER STRIP */}
      {allLocations.length > 1 && (
        <section className="py-12 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                Explore Other Regional Engineering Labs
              </span>
              <a
                href="/locations/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/locations/');
                }}
                className="text-xs text-[#60A5FA] hover:underline cursor-pointer"
              >
                All Regional Hubs →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {allLocations.map((loc) => (
                <a
                  key={loc.id}
                  href={`/locations/${loc.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/locations/${loc.slug}/`);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer block no-underline ${
                    loc.slug === location.slug
                      ? 'bg-[#2563EB]/15 border-[#2563EB] text-white'
                      : 'bg-[#0D1424] border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#334155]'
                  }`}
                >
                  <div className="font-bold text-sm truncate">{loc.city || loc.title}</div>
                  <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                    {loc.officeNode?.city}, {loc.officeNode?.country}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. CONVERSION CTA */}
      <ConversionCTASection
        title={`Partner With Our ${locationName} Team`}
        subtitle="Book a diagnostic growth session directly with our senior technical leads."
        onOpenBooking={onOpenBooking}
        prefill={{ location: locationName }}
      />
    </div>
  );
};

