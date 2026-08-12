import React from 'react';
import { PageType, BlogPost } from '../types';
import { SERVICES_DATA, CASE_STUDIES_DATA, TESTIMONIALS_DATA, CLIENT_LOGOS, AGENCY_METRICS, BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
import { AuditSimulator } from '../components/AuditSimulator';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, ShieldCheck, Search, Target, Code, Share2, FileText, BarChart3, Star, ChevronRight, Sun, Moon, MapPin } from 'lucide-react';

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
  const { theme, toggleTheme } = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-6 h-6 text-blue-500" />;
      case 'Target': return <Target className="w-6 h-6 text-purple-500" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-pink-500" />;
      case 'FileText': return <FileText className="w-6 h-6 text-emerald-500" />;
      case 'Code': return <Code className="w-6 h-6 text-cyan-500" />;
      default: return <BarChart3 className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge & Theme Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>Matricsmania Performance Marketing Agency</span>
            </div>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
              title="Toggle Dark/Light Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Switch to Dark Theme</span>
                </>
              )}
            </button>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1]">
            We Turn Clicks Into <br className="hidden sm:inline" />
            <span className="gradient-text-primary">Customers</span> With Strategy & Passion
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We engineer high-ROI Search Engine Optimization, scalable Paid Ads funnels, and real-time marketing attribution engines that scale your bottom line.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 font-bold text-sm transition-all cursor-pointer"
            >
              Explore Growth Services
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> No Vanity Metrics
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Revenue Attribution
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 96% Client Retention
            </span>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10">
            {AGENCY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white gradient-text-primary">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Our Core Competencies
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Full-Funnel Growth Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            We bring mathematical precision to every channel, turning search traffic and paid impressions into predictable sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.shortDesc}
                </p>

                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1 cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE AUDIT SIMULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AuditSimulator onOpenBooking={onOpenBooking} onShowToast={onShowToast} />
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Endorsed by CMOs & Founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-slate-500 dark:text-slate-400">{item.role}, {item.company}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {item.metricHighlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BLOG INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Growth Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Latest Articles & Strategy Playbooks
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center gap-2 self-start cursor-pointer"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS_DATA.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigateToBlogSlug(getSlugFromTitle(post.title))}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-blue-400">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{post.publishedAt}</span>
                <span className="font-semibold text-blue-500">{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR SERVICE AREAS: VARANASI & PRAYAGRAJ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Regional Growth Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Our Service Areas: Varanasi & Prayagraj
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We specialize in scaling businesses across Eastern Uttar Pradesh. Explore our dedicated location hubs for tailored Local SEO, Lead Generation, and Growth Strategies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Varanasi Button / Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/60 transition-all flex flex-col justify-between space-y-5 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/30">
                    Varanasi Hub
                  </span>
                  <span className="text-xs text-slate-400">Uttar Pradesh</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Digital Marketing Agency in Varanasi
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Local SEO, Meta & Google Ads, and E-commerce growth for Godowlia, Assi Ghat, Cantonment, Sigra, and Banaras enterprises.
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigateToLocation('digital-marketing-agency-in-varanasi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Digital Marketing Agency in Varanasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Prayagraj Button / Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/60 transition-all flex flex-col justify-between space-y-5 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/30">
                    Prayagraj Hub
                  </span>
                  <span className="text-xs text-slate-400">Uttar Pradesh</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Digital Marketing Agency in Prayagraj
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Student admission lead funnels, Local Map Pack SEO, and real estate marketing across Civil Lines, Katra, Naini, and Sangam area.
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigateToLocation('digital-marketing-agency-in-prayagraj');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Digital Marketing Agency in Prayagraj</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-IMPACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl border border-blue-500/30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-500/30">
            Ready to Dominate Your Industry?
          </span>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Let’s Engineer Your Agency Growth Blueprint
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Book a 30-minute growth consultation with our founder to receive a custom SEO breakdown, ad funnel audit, and ROI model.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-xl bg-white text-slate-950 font-extrabold text-sm hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
