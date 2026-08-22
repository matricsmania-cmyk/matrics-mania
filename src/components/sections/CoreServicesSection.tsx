'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from '../ScrollReveal';
import { Layers, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Service } from '../../models';

export interface CoreServicesSectionProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  onNavigate?: (path: string) => void;
}

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({
  services,
  title = 'Core Growth Disciplines',
  subtitle = 'Modular systems designed to solve enterprise attribution, search retrieval, and conversion friction.',
  onNavigate,
}) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };
  return (
    <section id="core-services-section" className="py-20 sm:py-28 bg-[#070B14] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
              Engineered Capabilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              {subtitle}
            </p>
          </div>

          <button
            id="view-all-services-btn"
            onClick={() => handleNav('/services/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors group cursor-pointer"
          >
            <span>View All 5 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.07}>
              <div
                id={`service-card-${service.slug}`}
                onClick={() => handleNav(`/services/${service.slug}/`)}
                className="p-6 sm:p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                      {service.serviceCode || 'SERVICE'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                    {service.shortDescription || service.excerpt}
                  </p>

                  {service.deliverablesSummary && service.deliverablesSummary.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#1E293B]/60">
                      {service.deliverablesSummary.slice(0, 2).map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-[#1E293B] pt-4 mt-6 flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span className="text-[#94A3B8]">{service.metrics?.[0]?.value || 'Engineering SLA'}</span>
                  <span className="text-[#60A5FA] group-hover:underline">Explore Architecture →</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
