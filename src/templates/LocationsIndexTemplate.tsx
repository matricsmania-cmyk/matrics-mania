'use client';

import React from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { Location } from '../models';
import {
  ArrowRight,
  Globe2,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface LocationsIndexTemplateProps {
  locations?: Location[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

export const LocationsIndexTemplate: React.FC<LocationsIndexTemplateProps> = ({
  locations: propLocations,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allLocations = propLocations !== undefined ? propLocations : provider.getAllLocations();

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        pageType="location"
        canonicalUrl="https://matricsmania.com/locations/"
        title="Global Operating Hubs & Engineering Labs | MatricsMania"
        description="Explore MatricsMania regional nodes and engineering offices across Bangalore HQ, London, and San Francisco."
      />

      {/* HERO SECTION */}
      <section className="relative border-b border-[#1E293B] pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              Global Telemetry & Operations
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Global Operating Hubs
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Distributed growth engineering and telemetry labs delivering 24/7 algorithmic monitoring and campaign execution.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* LOCATIONS GRID */}
      <section className="py-16 md:py-24 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allLocations.map((loc) => (
                <div
                  key={loc.slug}
                  className="p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {loc.city}, {loc.country}
                      </span>
                      {loc.hubType && loc.hubType.includes('Headquarters') && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30">
                          GLOBAL HQ
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {loc.title}
                    </h2>

                    <p className="text-sm text-[#94A3B8] line-clamp-3">
                      {loc.officeNode?.role || loc.excerpt || 'Growth engineering and technical search operations hub.'}
                    </p>

                    {loc.officeNode?.address && (
                      <div className="pt-2 border-t border-[#1E293B]/60 text-xs font-mono text-[#64748B] space-y-1">
                        <div>{loc.officeNode.address.line1}</div>
                        <div>{loc.officeNode.address.city}, {loc.officeNode.address.state} {loc.officeNode.address.postalCode}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1E293B]">
                    <a
                      href={`/locations/${loc.slug}/`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] hover:text-white transition-colors"
                    >
                      <span>View Hub Telemetry</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-4">
              <p className="text-base text-[#94A3B8]">
                No regional hubs published in CMS yet.
              </p>
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] font-bold"
              >
                Contact Global Headquarters →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
