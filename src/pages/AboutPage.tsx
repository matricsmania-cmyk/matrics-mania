import React, { useEffect } from 'react';
import { PageType } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Layers,
  Search,
  Target,
  Cpu,
  BarChart3,
  Sparkles,
  Shield,
  Linkedin,
  Globe,
  Compass,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Organization structured data for SEO and entity trust
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://matricsmania.com/#organization',
          name: 'MatricsMania',
          url: 'https://matricsmania.com',
          logo: 'https://matricsmania.com/logo.png',
          email: 'hello@matricsmania.com',
          telephone: '+91-80-4567-8900',
          description:
            'MatricsMania builds digital systems designed to make growth measurable. Headquartered in Bangalore, serving clients across India, US, UK, and Canada.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Indiranagar 100ft Road, 4th Block',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560038',
            addressCountry: 'IN',
          },
          founder: {
            '@type': 'Person',
            name: 'Marcus Vance',
            jobTitle: 'Founder & Principal Growth Architect',
          },
          sameAs: [
            'https://linkedin.com/company/matricsmania',
            'https://twitter.com/matricsmania',
          ],
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://matricsmania.com/#localbusiness',
          name: 'MatricsMania Digital Systems',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          telephone: '+91-80-4567-8900',
          email: 'hello@matricsmania.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Indiranagar 100ft Road, 4th Block',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560038',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 12.9716,
            longitude: 77.6412,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
      ],
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schemaData);
    scriptTag.id = 'about-schema-data';
    document.head.appendChild(scriptTag);

    return () => {
      const existing = document.getElementById('about-schema-data');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  const philosophyBeliefs = [
    {
      num: '01',
      statement: 'Good marketing begins with a clear business problem.',
    },
    {
      num: '02',
      statement: 'Traffic without intent has limited commercial value.',
    },
    {
      num: '03',
      statement: 'More leads aren’t necessarily better leads.',
    },
    {
      num: '04',
      statement: 'A beautiful website that doesn’t convert is still a business problem.',
    },
    {
      num: '05',
      statement: 'Measurement should influence decisions—not merely report them.',
    },
    {
      num: '06',
      statement: 'Long-term authority is built through useful work and evidence.',
    },
  ];

  const thinkingPrinciples = [
    {
      num: '01',
      title: 'Business before channel',
      content:
        'We don’t begin with: "Should we run Google Ads?" We begin with: "Where is the commercial constraint?" Channel selection is a downstream tactic.',
      tags: ['Economics', 'Constraints', 'Positioning'],
    },
    {
      num: '02',
      title: 'Evidence before assumptions',
      content:
        'We replace executive intuition with empirical data: search entity data, server-side analytics, user heatmaps, competitor ontology gaps, and unit economics.',
      tags: ['Search Data', 'Analytics', 'Behavior', 'Unit Economics'],
    },
    {
      num: '03',
      title: 'Focus before complexity',
      content:
        'Don’t deploy ten fragmented channels simply because ten channels exist. We prioritize the 2-3 leverage points that can materially move revenue.',
      tags: ['High Leverage', 'Channel Discipline', 'Execution Speed'],
    },
    {
      num: '04',
      title: 'Measurement before scaling',
      content:
        'Never scale paid media or production volume across funnels that lack server-side attribution. Fix conversion instrumentation first, then allocate capital.',
      tags: ['Attribution', 'Clean Tracking', 'Capital Protection'],
    },
    {
      num: '05',
      title: 'Iteration over static plans',
      content:
        'Marketing is never "Plan → Execute → Done." It is a dynamic feedback loop: Diagnose → Hypothesis → Execute → Measure → Learn → Improve.',
      tags: ['Feedback Loops', 'Agile Sprints', 'Compounding Moats'],
    },
  ];

  const howWeWorkSteps = [
    {
      step: '01',
      name: 'UNDERSTAND',
      desc: 'Business economics, target market, customer buying journey, and gross margins.',
    },
    {
      step: '02',
      name: 'DIAGNOSE',
      desc: 'Find core constraints, technical bottlenecks, and untapped market opportunities.',
    },
    {
      step: '03',
      name: 'STRATEGIZE',
      desc: 'Determine leverage priorities, channel mix, sequencing, and measurement milestones.',
    },
    {
      step: '04',
      name: 'EXECUTE',
      desc: 'Build technical architecture, deploy campaigns, and engineer high-converting UX.',
    },
    {
      step: '05',
      name: 'MEASURE',
      desc: 'Track down-funnel pipeline, qualified SQLs, and actual revenue contribution.',
    },
    {
      step: '06',
      name: 'OPTIMIZE',
      desc: 'Systematically improve what the empirical evidence proves should be refined.',
    },
  ];

  const capabilitiesList = [
    {
      category: 'SEARCH & AI',
      skills: 'SEO · Technical SEO · AEO · GEO',
      icon: Search,
    },
    {
      category: 'PERFORMANCE',
      skills: 'Google Ads · Meta Ads · Paid Media',
      icon: Target,
    },
    {
      category: 'DIGITAL EXPERIENCE',
      skills: 'Web · Landing Pages · CRO',
      icon: Cpu,
    },
    {
      category: 'CONTENT',
      skills: 'Strategy · Content · Creative',
      icon: Layers,
    },
    {
      category: 'BRAND',
      skills: 'Reputation · Authority · Influence',
      icon: Sparkles,
    },
    {
      category: 'AUTOMATION',
      skills: 'CRM · Lead Management · Automation',
      icon: TrendingUp,
    },
    {
      category: 'DATA',
      skills: 'Analytics · Tracking · Attribution',
      icon: BarChart3,
    },
  ];

  const teamMembers = [
    {
      name: 'Marcus Vance',
      role: 'Founder / Strategy',
      bio: 'Former growth lead with 12+ years of experience engineering data-driven acquisition architectures for high-growth tech platforms and established enterprises.',
      focus: 'Strategy · SEO · Growth Architecture',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      email: 'marcus@matricsmania.com',
    },
    {
      name: 'Alex Vance',
      role: 'Head of Technical SEO',
      bio: 'Specialist in crawl budget engineering, JSON-LD knowledge graphs, Generative Engine Optimization (GEO), and modern search engine indexing.',
      focus: 'Search · Entity Graphs · AEO',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      email: 'alex@matricsmania.com',
    },
    {
      name: 'Sarah Chen',
      role: 'Paid Acquisition Lead',
      bio: 'Manages algorithmic bidding models, LinkedIn ABM frameworks, and pipeline-weighted paid acquisition across Google, Meta, and LinkedIn.',
      focus: 'Paid Acquisition · Funnel Math · B2B',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      email: 'sarah@matricsmania.com',
    },
    {
      name: 'Michael Ross',
      role: 'Design & Development Lead',
      bio: 'Engineers sub-second web experiences, progressive form funnels, and conversion rate optimization (CRO) systems that eliminate acquisition friction.',
      focus: 'Digital Experience · Web · CRO',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      email: 'michael@matricsmania.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      {/* 01. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1E293B] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              ABOUT MATRICSMANIA
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              We build digital systems designed to make growth{' '}
              <span className="text-[#60A5FA]">measurable</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              MatricsMania is a digital marketing agency based in Bangalore, working with ambitious businesses across India and selected international markets.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/20"
              >
                See Our Work
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] hover:border-[#334155] text-white font-medium text-sm transition-colors"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
              </button>
            </div>

            {/* Restrained System Diagrammatic Visual */}
            <div className="pt-10 max-w-xl mx-auto">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0B101E] border border-[#1E293B] font-mono text-xs sm:text-sm text-[#94A3B8] text-center shadow-2xl relative overflow-hidden">
                <div className="text-[#60A5FA] font-bold tracking-wider mb-3">// ARCHITECTURAL FLOW</div>
                
                {/* Visual Diagram */}
                <div className="py-2 space-y-3">
                  <div className="inline-block px-4 py-1.5 rounded-lg bg-[#131D33] border border-[#2563EB]/40 text-white font-bold">
                    MATRICSMANIA
                  </div>
                  
                  <div className="text-[#64748B]">STRATEGY</div>
                  <div className="text-[#64748B]">│</div>

                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-center">
                    <div className="p-2 rounded bg-[#0E1729] border border-[#1E293B] text-[#E2E8F0] font-medium">
                      SEARCH
                    </div>
                    <div className="p-2 rounded bg-[#0E1729] border border-[#1E293B] text-[#E2E8F0] font-medium">
                      MEDIA
                    </div>
                    <div className="p-2 rounded bg-[#0E1729] border border-[#1E293B] text-[#E2E8F0] font-medium">
                      WEB
                    </div>
                  </div>

                  <div className="text-[#64748B]">│</div>
                  <div className="inline-block px-3 py-1 rounded bg-[#0E1729] border border-[#1E293B] text-[#94A3B8]">
                    DATA
                  </div>
                  <div className="text-[#64748B]">↓</div>
                  <div className="inline-block px-4 py-1.5 rounded-lg bg-[#2563EB]/10 border border-[#2563EB] text-[#60A5FA] font-bold">
                    MEASURABLE GROWTH
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 02. WHAT MATRICSMANIA IS */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 02. Position
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              A growth partner, not a collection of disconnected services.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Businesses rarely have isolated "SEO problems" or "Google Ads problems." They have acquisition, positioning, visibility, conversion and measurement problems that interact with one another.
            </p>
          </ScrollReveal>

          {/* Interconnected System Chain */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-mono text-xs">
              {[
                { name: 'Strategy', desc: 'Market & Economics' },
                { name: 'Visibility', desc: 'Search & AI Engines' },
                { name: 'Acquisition', desc: 'High-Intent Demand' },
                { name: 'Experience', desc: 'UX & Performance' },
                { name: 'Conversion', desc: 'Frictionless Funnel' },
                { name: 'Measurement', desc: 'Revenue Attribution' },
                { name: 'Optimization', desc: 'Continuous Iteration' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors"
                >
                  <div className="text-[10px] text-[#60A5FA] font-bold mb-1">0{idx + 1}</div>
                  <div className="font-bold text-white text-sm mb-1">{item.name}</div>
                  <div className="text-[11px] text-[#64748B]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03. WHY WE EXIST */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 03. Origin
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Why We Exist
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              We built MatricsMania to eliminate the vendor fragmentation that drains marketing capital.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Problem We Saw */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-red-900/30 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
                THE PROBLEM WE SAW
              </div>
              <h3 className="text-lg font-bold text-white">Digital marketing is often fragmented:</h3>

              <div className="space-y-2 font-mono text-xs text-[#94A3B8]">
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span>Agency A</span>
                  <span className="text-red-400">→ SEO Silo</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span>Agency B</span>
                  <span className="text-red-400">→ Ads Silo</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span>Agency C</span>
                  <span className="text-red-400">→ Website Dev</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span>Agency D</span>
                  <span className="text-red-400">→ Social Agency</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E293B] text-xs text-[#94A3B8] space-y-1">
                <div className="text-red-400 font-bold">The client ends up with:</div>
                <div className="text-[#64748B] pl-2 font-mono">
                  Multiple vendors → Multiple dashboards → Disconnected decisions → Unclear commercial impact.
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#2563EB]/40 space-y-6 shadow-xl shadow-blue-500/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-[#60A5FA]">
                OUR INTEGRATED APPROACH
              </div>
              <h3 className="text-lg font-bold text-white">A single unified growth system:</h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span className="text-white font-medium">01. Business Objective</span>
                  <span className="text-[#60A5FA]">Commercial Targets</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span className="text-white font-medium">02. Integrated Strategy</span>
                  <span className="text-[#60A5FA]">Channel Prioritization</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span className="text-white font-medium">03. Full-Stack Execution</span>
                  <span className="text-[#60A5FA]">Search + Ads + Web</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B14] border border-[#1E293B] flex items-center justify-between">
                  <span className="text-white font-medium">04. Revenue Attribution</span>
                  <span className="text-[#60A5FA]">Continuous Iteration</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E293B] text-xs text-[#94A3B8] space-y-1">
                <div className="text-[#60A5FA] font-bold">The client achieves:</div>
                <div className="text-[#94A3B8] pl-2 font-mono">
                  Single accountability → Unified pipeline tracking → Clear commercial returns.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. HOW WE THINK */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 04. Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              How We Think
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              We start with the business problem, not the channel. Five principles guide every strategic decision.
            </p>
          </ScrollReveal>

          <div className="space-y-4 max-w-4xl mx-auto">
            {thinkingPrinciples.map((principle, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.06}
                className="p-6 sm:p-7 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="w-10 h-10 rounded-xl bg-[#131D33] border border-[#1E293B] flex items-center justify-center font-mono text-sm font-bold text-[#60A5FA] shrink-0">
                    {principle.num}
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-bold text-white">{principle.title}</h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {principle.content}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {principle.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded bg-[#070B14] border border-[#1E293B] text-[11px] font-mono text-[#64748B]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05. WHAT WE BELIEVE */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 05. Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              What We Believe
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Minimal, non-negotiable principles that govern how we build.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {philosophyBeliefs.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.05}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col justify-between space-y-4 hover:border-[#334155] transition-colors"
              >
                <div className="font-mono text-xs font-bold text-[#60A5FA]">{item.num}</div>
                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {item.statement}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06. HOW WE WORK */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 06. Operating Framework
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              How We Work
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              The MatricsMania signature growth framework executed across all client engagements.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howWeWorkSteps.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.06}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#60A5FA]">{item.step}</span>
                  <span className="text-[10px] font-mono text-[#64748B]">PHASE {idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{item.name}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07. CAPABILITIES */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 07. Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              What We Can Bring Into the System
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Integrated specializations deployed precisely where your business constraint requires it.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {capabilitiesList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2 hover:border-[#2563EB]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#131D33] border border-[#1E293B] flex items-center justify-center text-[#60A5FA]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#94A3B8] pl-11">{item.skills}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-10 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#131D33] hover:bg-[#1C2A4A] border border-[#1E293B] text-white font-medium text-xs transition-colors"
            >
              Explore Full Service Breakdown
              <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
            </button>
          </div>
        </div>
      </section>

      {/* 08. OPERATING MODEL */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 08. Geographic Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Based in Bangalore. Built for Distributed Growth.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Our team operates from Bangalore while working digitally with businesses across geographic markets.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto text-center">
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#2563EB]/40">
              <div className="font-bold text-white text-base">BANGALORE</div>
              <div className="text-xs font-mono text-[#60A5FA] mt-1">Operating Base</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
              <div className="font-bold text-white text-base">INDIA</div>
              <div className="text-xs font-mono text-[#94A3B8] mt-1">Primary Market</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
              <div className="font-bold text-white text-base">US</div>
              <div className="text-xs font-mono text-[#94A3B8] mt-1">International Market</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
              <div className="font-bold text-white text-base">UK</div>
              <div className="text-xs font-mono text-[#94A3B8] mt-1">International Market</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
              <div className="font-bold text-white text-base">CANADA</div>
              <div className="text-xs font-mono text-[#94A3B8] mt-1">International Market</div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. SELECTED WORK */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 09. Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              A small portfolio. Real work.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              We’re building MatricsMania deliberately. Our portfolio is currently small, so we focus on showing the work in depth rather than filling this page with inflated numbers.
            </p>
          </ScrollReveal>

          {/* Real Case Study Preview Card */}
          <div className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-colors space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-[#60A5FA]">
                  FEATURED CLIENT EVIDENCE
                </div>
                <span className="text-xs font-mono text-[#64748B]">B2B SaaS Systems</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Velociti Cloud: Scaling Inbound Pipeline from ₹1 Crore to ₹10 Crore ARR in 9 Months
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Rebuilt the technical search architecture, engineered 20 semantic search silos, and launched high-converting interactive product tour funnels.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1E293B] text-center font-mono">
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B]">
                  <div className="text-base sm:text-xl font-bold text-[#60A5FA]">+410%</div>
                  <div className="text-[10px] text-[#64748B]">Inbound Pipeline</div>
                </div>
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B]">
                  <div className="text-base sm:text-xl font-bold text-[#10B981]">₹10 Cr</div>
                  <div className="text-[10px] text-[#64748B]">New ARR Added</div>
                </div>
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B]">
                  <div className="text-base sm:text-xl font-bold text-white">-42%</div>
                  <div className="text-[10px] text-[#64748B]">CAC Reduction</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigate('work')}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] hover:text-[#93C5FD] transition-colors"
                >
                  View Full Case Study & Methodology →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE TEAM */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // 10. Authorship & Trust
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              The Team
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              The people directly responsible for the strategic thinking and execution.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4 hover:border-[#2563EB]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#1E293B]">
                    <OptimizedImage
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{member.name}</h3>
                    <div className="text-xs font-mono text-[#60A5FA]">{member.role}</div>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{member.bio}</p>
                </div>

                <div className="pt-3 border-t border-[#1E293B] space-y-2">
                  <div className="text-[11px] font-mono text-[#64748B]">
                    <span className="text-[#94A3B8] font-semibold">Focus:</span> {member.focus}
                  </div>
                  <div className="text-[11px] font-mono text-[#60A5FA]">{member.email}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. WHERE WE WORK / OFFICIAL BUSINESS DETAILS */}
      <section className="py-20 border-b border-[#1E293B] bg-[#090E1A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
                  // 11. Entity Identity
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Official Business Presence</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131D33] border border-[#1E293B] text-xs font-mono text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                HQ Bengaluru
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#94A3B8] font-mono">
              <div className="space-y-2">
                <div className="text-white font-bold">MatricsMania Digital Systems</div>
                <div>Indiranagar 100ft Road, 4th Block</div>
                <div>Bengaluru, Karnataka 560038, India</div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-white">Email:</span> hello@matricsmania.com
                </div>
                <div>
                  <span className="text-white">Phone:</span> +91 (80) 4567-8900
                </div>
                <div>
                  <span className="text-white">Operating Model:</span> Remote & Distributed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL ABOUT CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Have a growth problem worth solving?
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Tell us what you're trying to achieve, where you're currently stuck and what you've already tried.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/20"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
