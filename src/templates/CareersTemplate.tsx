'use client';

import React, { useState } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  PageHeroSection,
  ConversionCTASection,
} from '../components/sections';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Code2,
  TrendingUp,
} from 'lucide-react';

export interface OpenRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryRange?: string;
  description: string;
  requirements: string[];
}

import { useRouter } from 'next/navigation';

export interface CareersTemplateProps {
  roles?: OpenRole[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CareersTemplate: React.FC<CareersTemplateProps> = ({
  roles: propRoles,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  onShowToast,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [activeRoleModal, setActiveRoleModal] = useState<OpenRole | null>(null);

  const defaultRoles: OpenRole[] = [
    {
      id: 'role-1',
      title: 'Principal Technical SEO Architect',
      department: 'Engineering',
      location: 'Bangalore (Hybrid) / Remote (India)',
      type: 'Full-time',
      experience: '5+ years',
      salaryRange: '₹28L - ₹42L + Equity',
      description:
        'Lead large-scale crawl budget audits, reverse-engineer LLM search citation models, and author production Next.js/Vite SEO optimizations.',
      requirements: [
        'Deep expertise in server-side rendering, edge caching, and DOM hydration mechanics.',
        'Fluency in Python/TypeScript for log parsing and automated GSC API analysis.',
        'Track record of growing enterprise web properties from 100k to 5M+ monthly organic visits.',
      ],
    },
    {
      id: 'role-2',
      title: 'Performance Marketing Lead (B2B SaaS)',
      department: 'Paid Acquisition',
      location: 'Bangalore (Hybrid)',
      type: 'Full-time',
      experience: '4+ years',
      salaryRange: '₹24L - ₹36L + Performance Bonus',
      description:
        'Architect high-yield Google Ads, LinkedIn Ads, and ABM pipelines for enterprise software companies with ACVs > $50,000.',
      requirements: [
        'Mastery of offline conversion tracking, BigQuery audience segmentation, and HubSpot/Salesforce lifecycle integration.',
        'Analytical rigor in testing creative variants and landing page friction points.',
        'Experience managing budgets exceeding $100k/month with strict payback targets.',
      ],
    },
    {
      id: 'role-3',
      title: 'Full-Stack CRO Engineer',
      department: 'Engineering',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      experience: '3+ years',
      salaryRange: '₹20L - ₹32L',
      description:
        'Develop Bayesian A/B test experiments, sub-second landing page templates, and headless interactive calculators.',
      requirements: [
        'Advanced React, TypeScript, and Tailwind CSS capability.',
        'Statistical knowledge in hypothesis testing, sample size calculation, and variance reduction.',
        'Experience with post-hog, Mixpanel, and server-side experiment flags.',
      ],
    },
  ];

  const roles = propRoles || defaultRoles;

  const departments = ['All', 'Engineering', 'Paid Acquisition', 'Data & Analytics'];

  const filteredRoles = roles.filter(
    (r) => selectedDepartment === 'All' || r.department === selectedDepartment
  );

  const handleApply = (role: OpenRole) => {
    if (onShowToast) {
      onShowToast(
        'Application Submitted',
        `Thank you for applying to ${role.title}. Our talent team will review your credentials within 48 hours.`,
        'success'
      );
    }
    setActiveRoleModal(null);
  };

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="static"
        canonicalUrl="https://matricsmania.com/careers/"
        title="Careers & Engineering Fellowships | MatricsMania"
        description="Join our team of technical SEO architects, growth engineers, and data scientists in Bangalore and remote."
      />

      {/* Hero */}
      <PageHeroSection
        eyebrow="Join The Engineering Team"
        title="Build The Future of Growth Engineering"
        subtitle="We are assembling elite systems engineers, performance marketers, and search scientists to solve the most challenging distribution problems for ambitious brands."
        primaryCtaLabel="Explore Open Positions"
        onPrimaryCta={() => {
          const el = document.getElementById('open-roles');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        secondaryCtaLabel="About Our Culture & Standards"
        onSecondaryCta={() => {
          const el = document.getElementById('culture-pillars');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Culture & Standards */}
      <section id="culture-pillars" className="py-16 md:py-20 border-b border-[#1E293B] bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              Engineering Ethos
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              How We Work at MatricsMania
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="w-6 h-6 text-[#60A5FA]" />,
                title: 'Code Over Slides',
                desc: 'We are builders. We write code, test hypotheses, build data pipelines, and deploy production assets rather than making endless decks.',
              },
              {
                icon: <Cpu className="w-6 h-6 text-[#60A5FA]" />,
                title: 'First-Principles Thinking',
                desc: 'We do not follow marketing fads. We dissect LLM search papers, crawl logs, and statistical variance to build enduring systems.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#60A5FA]" />,
                title: 'Radical Autonomy & Ownership',
                desc: 'Engineers own client outcomes end-to-end. We provide generous tooling budgets, compute power, and zero bureaucratic friction.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4 flex flex-col justify-between"
              >
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] w-fit">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-16 md:py-20 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Current Open Opportunities
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Find your next technical growth challenge.
              </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter positions by department">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  aria-pressed={selectedDepartment === dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                    selectedDepartment === dept
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#0D1424] text-[#94A3B8] border border-[#1E293B] hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-0.5 rounded border border-[#2563EB]/20">
                      {role.department}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {role.location}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {role.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {role.description}
                  </p>

                  {role.salaryRange && (
                    <div className="text-xs font-mono text-emerald-400 font-semibold">
                      Compensation: {role.salaryRange}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setActiveRoleModal(role)}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    <span>View Role &amp; Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Details / Application Modal */}
      {activeRoleModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-role-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[#0D1424] border border-[#1E293B] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#60A5FA] uppercase">
                  {activeRoleModal.department}
                </span>
                <h3 id="career-role-modal-title" className="text-xl font-bold text-white mt-1">
                  {activeRoleModal.title}
                </h3>
                <div className="text-xs text-[#94A3B8] mt-1">
                  {activeRoleModal.location} • {activeRoleModal.type} • {activeRoleModal.salaryRange}
                </div>
              </div>
              <button
                type="button"
                aria-label="Close role details modal"
                onClick={() => setActiveRoleModal(null)}
                className="text-xs font-mono text-[#94A3B8] hover:text-white px-2.5 py-1 rounded bg-[#070B14] border border-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#CBD5E1] border-t border-[#1E293B] pt-4">
              <p>{activeRoleModal.description}</p>

              <div className="space-y-2">
                <div className="font-bold text-white text-xs uppercase font-mono">
                  Role Requirements:
                </div>
                <ul className="space-y-2">
                  {activeRoleModal.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveRoleModal(null)}
                className="px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs text-[#94A3B8] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleApply(activeRoleModal)}
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <ConversionCTASection
        title="Don't See The Exact Role Listed?"
        subtitle="We are always looking for exceptional engineers, search retrieval researchers, and growth leads. Send us your GitHub or profile."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'General Career / Fellowship Inquiry' }}
      />
    </div>
  );
};
