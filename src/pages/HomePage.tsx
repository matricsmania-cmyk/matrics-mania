import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PageType } from '../types';
import { CASE_STUDIES_DATA, TESTIMONIALS_DATA, AGENCY_METRICS, BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
import { AuditSimulator } from '../components/AuditSimulator';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { ArrowRight, CheckCircle2, ShieldCheck, Search, Target, Code, Share2, FileText, BarChart3, Star, ChevronRight, MapPin, Zap, ArrowUpRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillInfo?: any) => void;
  onNavigateToBlogSlug: (slug: string) => void;
  onNavigateToLocation: (slug: string) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onNavigateToBlogSlug,
  onNavigateToLocation,
  onShowToast,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Staggered 30% overlap scroll choreography for h1 and paragraph:
  // 1. h1 moves first: range [0.00 -> 0.52]
  const h1Y = useTransform(scrollYProgress, [0, 0.52], [0, -120]);
  const h1Opacity = useTransform(scrollYProgress, [0.04, 0.52], [1, 0]);

  // 2. paragraph starts when h1 is at 30% (~0.15): range [0.15 -> 0.88]
  const pY = useTransform(scrollYProgress, [0, 0.15, 0.88], [0, 0, -110]);
  const pOpacity = useTransform(scrollYProgress, [0, 0.19, 0.88], [1, 1, 0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-[#60A5FA]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#60A5FA]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#60A5FA]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#60A5FA]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#60A5FA]" />;
      default: return <BarChart3 className="w-5 h-5 text-[#60A5FA]" />;
    }
  };

  return (
    <div className="bg-[#070B14] text-white">
      {/* 1. HERO SECTION WITH CHOREOGRAPHED SCROLL ANIMATION */}
      <section ref={heroRef} className="relative h-[115vh] sm:h-[120vh] bg-[#070B14]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#070B14]">
          {/* Subtle Ambient Radial Glow (Dark navy/blue, no pink/harsh glare) */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2563EB]/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 py-8">
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-semibold text-[#94A3B8] select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Full-Funnel Growth Engineering &amp; AI Search</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h1
                style={{ y: h1Y, opacity: h1Opacity }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] text-white"
              >
                <span className="block">
                  Building Ambitious Brands with
                </span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
                    Mathematical Precision
                  </span>{" "}
                  &amp; Scalable{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
                    Growth
                  </span>
                  .
                </span>
              </motion.h1>
            </motion.div>

            {/* Sub-headline Paragraph with staggered delay */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{ y: pY, opacity: pOpacity }}
              className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
            >
              We replace subjective agency guesswork with predictive statistical modeling, full-funnel search architectures, and verifiable revenue attribution.
            </motion.p>

            {/* Hero Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Schedule Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onNavigate('case-studies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1E293B] text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Case Studies</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. REAL NUMBERS & VERIFIED IMPACT (Immediately below hero) */}
      <section className="bg-[#0D1424] border-y border-[#1E293B] py-14 relative z-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {AGENCY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] transition-all hover:border-[#2563EB]/40 shadow-xs"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-[#94A3B8] mt-2">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. HOW WE WORK / 4-STAGE METHODOLOGY */}
      <section className="bg-[#070B14] py-20 border-b border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Our Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Systematic Execution for Compounding{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
                Growth
              </span>
            </h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              A 4-stage scientific framework engineered to eliminate guesswork and scale enterprise pipeline revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Data & Technical Audit',
                desc: 'We analyze your website architecture, ad tracking pixel fidelity, server latency, and organic search gaps.',
              },
              {
                step: '02',
                title: 'Growth Architecture',
                desc: 'We map out a mathematical funnel model, identifying high-intent keyword clusters and scalable ad angles.',
              },
              {
                step: '03',
                title: 'Rapid Deployment',
                desc: 'Our senior engineers deploy technical fixes, spin up landing pages, and launch targeted algorithmic ad campaigns.',
              },
              {
                step: '04',
                title: 'Attribution & Scale',
                desc: 'You receive live Looker Studio reporting tracking exact cost per acquisition (CPA), blended ROAS, and enterprise profit.',
              },
            ].map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="text-2xl font-black bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent tracking-tight">
                  {phase.step}
                </div>
                <h3 className="font-bold text-base text-white">
                  {phase.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. REAL CASE STUDIES & CLIENT RETURNS */}
      <section className="bg-[#0D1424] py-20 border-b border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                Proven Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Recent Case Studies &amp; Verifiable Returns
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 self-start">
              <button
                onClick={() => {
                  onNavigate('case-studies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>All Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onNavigate('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-bold text-white hover:bg-[#131D33] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Work Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES_DATA.slice(0, 3).map((study) => (
              <div
                key={study.id}
                className="rounded-2xl bg-[#070B14] border border-[#1E293B] overflow-hidden flex flex-col justify-between hover:border-[#2563EB]/40 transition-colors shadow-sm"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#60A5FA] uppercase tracking-wider bg-[#131D33] px-2.5 py-1 rounded-md border border-[#1E293B]">
                      {study.industry}
                    </span>
                    <span className="text-xs font-bold text-[#10B981]">
                      {study.results?.[0] ? `${study.results[0].metric} ${study.results[0].label}` : ''}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {study.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="p-6 pt-4 border-t border-[#1E293B] bg-[#0D1424]/80 flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">{study.clientName}</span>
                  <button
                    onClick={() => onOpenBooking({ caseStudy: study.title })}
                    className="text-xs font-bold text-white hover:text-[#60A5FA] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Request Model</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#60A5FA]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. WHY MATRICSMANIA / DIFFERENTIATOR */}
      <section className="bg-[#070B14] py-20 border-b border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#60A5FA] bg-[#0D1424] px-3.5 py-1 rounded-full border border-[#1E293B]">
              Why MatricsMania
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              The Agency Built For Founders Who Demand Real Returns
            </h2>
            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">
              Traditional agencies celebrate vanity impressions. We calibrate every marketing dollar directly to pipeline conversions, customer lifetime value, and net enterprise ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Mathematical Rigor',
                desc: 'We do not run campaigns on hunches. Every dollar spent is modeled with predictive statistical attribution and continuous multivariate testing.',
              },
              {
                title: 'Direct Senior Access',
                desc: 'You work directly with seasoned growth strategists and technical engineers—not junior account managers learning on your budget.',
              },
              {
                title: 'Zero Long-Term Lock-in',
                desc: 'We earn our partnership month-to-month through verifiable revenue returns, transparent Looker Studio dashboards, and complete data ownership.',
              },
            ].map((diff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3 hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#131D33] text-[#60A5FA] flex items-center justify-center border border-[#1E293B]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {diff.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. TESTIMONIALS & TRUST */}
      <section className="bg-[#0D1424] py-20 border-b border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Testimonials &amp; Trust
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Endorsed by CMOs &amp; Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-4 flex flex-col justify-between hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#60A5FA]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#60A5FA]" />
                    ))}
                  </div>
                  <p className="text-white text-sm italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <OptimizedImage
                      src={item.avatar}
                      alt={item.name}
                      widthParam={100}
                      className="w-10 h-10 rounded-full object-cover border border-[#1E293B]"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-[#94A3B8]">{item.role}, {item.company}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#34D399] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
                    {item.metricHighlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 7. REGIONAL HUBS (Bangalore & Pan-India Desks) */}
      <section className="bg-[#070B14] py-16 border-b border-[#1E293B]">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Growth Hub: Bangalore
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Tailored AI SEO, High-ROAS Performance Media, and Full-Funnel Growth Engineering for Tech Startups, D2C, and Enterprise Brands:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bangalore Flagship Hub */}
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-[#131D33] px-3 py-1 rounded-full border border-[#1E293B]">
                    Bangalore Hub
                  </span>
                  <span className="text-xs text-[#94A3B8]">Karnataka</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Digital Marketing Agency in Bangalore
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  B2B SaaS demand generation, Shopify D2C scale, and local search dominance for Indiranagar, Koramangala, HSR Layout, and Whitefield enterprises.
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigateToLocation('locations/bangalore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Bangalore Hub (/locations/bangalore)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* National Locations Directory */}
            <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-[#131D33] px-3 py-1 rounded-full border border-[#1E293B]">
                    Pan-India Network
                  </span>
                  <span className="text-xs text-[#94A3B8]">National Coverage</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Regional Desks &amp; Expansion Network
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Active strategy desks and media buying pods covering Delhi NCR, Mumbai, Hyderabad, Pune, and major commercial hubs.
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigate('locations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-5 rounded-xl bg-[#070B14] hover:bg-[#131D33] border border-[#1E293B] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All Locations &amp; ROI Calculator</span>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. FINAL HIGH-IMPACT CTA */}
      <section className="bg-[#0D1424] py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#60A5FA] bg-[#131D33] px-4 py-1.5 rounded-full border border-[#1E293B]">
            Ready to Scale Your Pipeline?
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
            Let’s Engineer Your Custom{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
              Growth
            </span>{" "}
            Blueprint
          </h2>

          <p className="text-[#94A3B8] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Book a 30-minute growth consultation with our leadership team to receive a custom SEO audit, paid ad breakdown, and forecast model.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-sm transition-all shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

