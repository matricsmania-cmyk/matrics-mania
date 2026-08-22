'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from './ScrollReveal';
import {
  Layers,
  Building2,
  MapPin,
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { EntityRef } from '../models';

export interface InternalLinkingGraphProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  services?: EntityRef[];
  industries?: EntityRef[];
  locations?: EntityRef[];
  insights?: EntityRef[];
  caseStudies?: EntityRef[];
  onNavigate?: (path: string) => void;
  className?: string;
  variant?: 'section' | 'card-matrix' | 'compact';
}

interface GroupConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  items: EntityRef[];
  accentColor: string;
  badgeBg: string;
}

export const InternalLinkingGraph: React.FC<InternalLinkingGraphProps> = ({
  title = 'Contextual Knowledge Graph',
  subtitle = 'Explore verified cross-domain services, sector playbooks, regional operating nodes, and research papers connected to this system.',
  badge = 'Interconnected Architecture',
  services = [],
  industries = [],
  locations = [],
  insights = [],
  caseStudies = [],
  onNavigate,
  className = '',
  variant = 'section',
}) => {
  const router = useRouter();
  // Define groups and ONLY keep groups that have valid items (no artificial links)
  const groups: GroupConfig[] = [
    {
      key: 'services',
      label: 'Core Services & Capabilities',
      icon: Layers,
      items: services,
      accentColor: 'text-[#60A5FA] border-[#2563EB]/40 group-hover:border-[#2563EB]',
      badgeBg: 'bg-[#2563EB]/10 text-[#60A5FA] border-[#2563EB]/20',
    },
    {
      key: 'industries',
      label: 'Industry Playbooks & Practices',
      icon: Building2,
      items: industries,
      accentColor: 'text-indigo-400 border-indigo-500/40 group-hover:border-indigo-500',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      key: 'caseStudies',
      label: 'Verified Case Studies & Proof',
      icon: BarChart3,
      items: caseStudies,
      accentColor: 'text-emerald-400 border-emerald-500/40 group-hover:border-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      key: 'insights',
      label: 'Intelligence & Research Papers',
      icon: BookOpen,
      items: insights,
      accentColor: 'text-amber-400 border-amber-500/40 group-hover:border-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      key: 'locations',
      label: 'Regional Operating Nodes',
      icon: MapPin,
      items: locations,
      accentColor: 'text-cyan-400 border-cyan-500/40 group-hover:border-cyan-500',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
  ].filter((g) => g.items && g.items.length > 0);

  // If no contextual relationships exist in the data, strictly return null
  if (groups.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Allow normal browser new tab on cmd/ctrl click
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    } else {
      router.push(url);
    }
  };

  // Compact rail / inline variant
  if (variant === 'compact') {
    return (
      <div className={`space-y-6 ${className}`}>
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.key} className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] border-b border-[#1E293B] pb-2.5">
                <Icon className="w-4 h-4 text-[#3B82F6]" />
                <span>{group.label}</span>
              </div>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <a
                    key={item.id || item.slug}
                    href={item.url}
                    onClick={(e) => handleLinkClick(e, item.url)}
                    className="block p-3 rounded-xl bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#CBD5E1] group-hover:text-white line-clamp-1">
                        {item.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#60A5FA] transition-colors shrink-0" />
                    </div>
                    {item.excerpt && (
                      <p className="text-[11px] text-[#94A3B8] line-clamp-1 mt-1">
                        {item.excerpt}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Full section variant (Standard)
  return (
    <section className={`py-16 md:py-24 border-b border-[#1E293B] bg-[#070B14] relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            {badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        {/* Dynamic Multi-Column Taxonomy Grid */}
        <div className={`grid grid-cols-1 ${groups.length === 1 ? 'md:grid-cols-1' : groups.length === 2 ? 'md:grid-cols-2' : groups.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.key} className="space-y-4 flex flex-col justify-between">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#1E293B] pb-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <Icon className="w-4 h-4 text-[#60A5FA]" />
                      <span>{group.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#64748B] bg-[#0D1424] px-2 py-0.5 rounded border border-[#1E293B]">
                      {group.items.length} {group.items.length === 1 ? 'Link' : 'Links'}
                    </span>
                  </div>

                  {/* Links List */}
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <a
                        key={item.id || item.slug}
                        href={item.url}
                        onClick={(e) => handleLinkClick(e, item.url)}
                        className="p-4 rounded-2xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-md hover:shadow-[#2563EB]/10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] block"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0">
                            {item.category && (
                              <span className={`inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${group.badgeBg} uppercase tracking-wider truncate max-w-full`}>
                                {item.category}
                              </span>
                            )}
                            <h3 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                          </div>
                          <div className="p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#64748B] group-hover:text-[#60A5FA] group-hover:border-[#2563EB]/40 transition-colors shrink-0">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>

                        {item.excerpt && (
                          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                            {item.excerpt}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
