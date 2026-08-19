import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory, BlogContentType, PageType } from '../types';
import { INSIGHTS_POSTS_DATA, INSIGHT_TOPIC_PILLARS, INSIGHT_CONTENT_TYPES, STRATEGIC_PILLAR_GUIDES } from '../data/insightsData';
import { getSlugFromTitle } from '../utils/slug';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Compass,
  Building2,
  FileText,
  BarChart3,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Target,
  Code,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface BlogPageProps {
  onNavigate?: (page: PageType) => void;
  onNavigateToBlogSlug: (slug: string) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: any) => void;
  onOpenBooking: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  onNavigateToBlogSlug,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return INSIGHTS_POSTS_DATA.filter((post) => {
      const matchesPillar = selectedPillar === 'All' || post.category === selectedPillar;
      const matchesType = selectedType === 'All' || post.contentType === selectedType;
      const matchesQuery =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.standfirst && post.standfirst.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesPillar && matchesType && matchesQuery;
    });
  }, [selectedPillar, selectedType, searchQuery]);

  const featuredPost = INSIGHTS_POSTS_DATA[0];

  const gridPosts = useMemo(() => {
    if (selectedPillar === 'All' && selectedType === 'All' && !searchQuery && featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedPillar, selectedType, searchQuery, featuredPost]);

  const handleScrollToGrid = () => {
    const el = document.getElementById('explore-insights-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#070B14] text-white space-y-24 pb-28">
      {/* 01. HERO SECTION */}
      <section className="pt-14 md:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
            <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>MATRICSMANIA INSIGHTS · KNOWLEDGE SYSTEM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Ideas, analysis and practical thinking for{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#8B5CF6] bg-clip-text text-transparent">
              modern digital growth.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Research, frameworks and field-tested perspectives across search, AI visibility, performance marketing, digital experience and growth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleScrollToGrid}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              <span>Explore Insights ↓</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl bg-[#0D1424] hover:bg-[#131D33] text-white text-xs font-semibold border border-[#1E293B] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Request Strategic Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#60A5FA]" />
            </button>
          </div>

          {/* Metadata Taxonomy Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-[#64748B]">
            <span>Industry Intelligence</span>
            <span>·</span>
            <span>Research</span>
            <span>·</span>
            <span>Frameworks</span>
            <span>·</span>
            <span>Case Studies</span>
          </div>
        </ScrollReveal>
      </section>

      {/* 02. EDITORIAL FEATURED ARTICLE */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
                // Featured Insight
              </span>
              <span className="text-xs text-[#64748B] font-mono">Editor’s Selection · 12 min read</span>
            </div>

            <div
              id="featured-insight-card"
              onClick={() => onNavigateToBlogSlug(featuredPost.slug)}
              className="rounded-3xl bg-[#0D1424] border border-[#1E293B] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-pointer group hover:border-[#2563EB]/50 transition-all duration-300 shadow-2xl"
            >
              {/* Editorial Visual Column */}
              <div className="lg:col-span-6 h-64 sm:h-80 lg:h-auto min-h-[320px] relative overflow-hidden bg-[#070B14]">
                <OptimizedImage
                  src={featuredPost.featuredImageUrl}
                  alt={featuredPost.title}
                  widthParam={1000}
                  priority={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
                    {featuredPost.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#070B14]/80 backdrop-blur-sm text-[#94A3B8] border border-white/10 text-[11px] font-mono">
                    {featuredPost.contentType}
                  </span>
                </div>
              </div>

              {/* Editorial Content Column */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    {featuredPost.standfirst || featuredPost.excerpt}
                  </p>

                  {/* Key Takeaway preview */}
                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider block">
                      Core Strategic Principle
                    </span>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed italic">
                      "{featuredPost.keyTakeaways[0]}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#2563EB]/40"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-[#64748B]">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] group-hover:translate-x-1 transition-transform">
                    <span>Read Insight</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 03. EXPLORE TOPICS & FILTER BAR */}
      <section id="explore-insights-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase block mb-1">
                // Knowledge Taxonomy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Explore Strategic Insights
              </h2>
            </div>

            {/* Live Search Input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search frameworks, SEO, CAC, GEO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1424] border border-[#1E293B] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#2563EB]"
              />
              <Search className="w-4 h-4 text-[#60A5FA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Primary Content Pillar Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider pr-2 whitespace-nowrap">
                Pillar:
              </span>
              <button
                onClick={() => setSelectedPillar('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                  selectedPillar === 'All'
                    ? 'bg-[#2563EB] text-white border-transparent'
                    : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                }`}
              >
                All Pillars ({INSIGHTS_POSTS_DATA.length})
              </button>
              {INSIGHT_TOPIC_PILLARS.map((pillar) => {
                const count = INSIGHTS_POSTS_DATA.filter((p) => p.category === pillar).length;
                return (
                  <button
                    key={pillar}
                    onClick={() => setSelectedPillar(pillar)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                      selectedPillar === pillar
                        ? 'bg-[#2563EB] text-white border-transparent'
                        : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                    }`}
                  >
                    {pillar} ({count})
                  </button>
                );
              })}
            </div>

            {/* Secondary Content Type Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider pr-2 whitespace-nowrap">
                Format:
              </span>
              {INSIGHT_CONTENT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer border ${
                    selectedType === type
                      ? 'bg-[#1E293B] text-[#60A5FA] border-[#2563EB]/40 font-bold'
                      : 'bg-transparent text-[#64748B] border-transparent hover:text-[#94A3B8]'
                  }`}
                >
                  {type === 'All' ? 'All Formats' : type}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 04. LATEST INSIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {gridPosts.map((post) => (
            <ScrollReveal key={post.id}>
              <div
                id={`insight-card-${post.slug}`}
                onClick={() => onNavigateToBlogSlug(post.slug)}
                className="h-full rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-48 relative overflow-hidden bg-[#070B14]">
                    <OptimizedImage
                      src={post.featuredImageUrl}
                      alt={post.title}
                      widthParam={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#070B14]/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-[#60A5FA] font-bold">
                        {post.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#2563EB]/90 text-white text-[10px] font-mono font-medium">
                        {post.contentType}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-mono">
                      <span>{post.publishedAt}</span>
                      <span>·</span>
                      <span className="text-[#94A3B8]">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                      {post.standfirst || post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#1E293B]"
                    />
                    <span className="text-xs text-[#CBD5E1] font-medium">{post.author.name}</span>
                  </div>

                  <span className="text-xs font-bold text-[#60A5FA] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {gridPosts.length === 0 && (
          <div className="py-16 text-center rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
            <BookOpen className="w-8 h-8 text-[#64748B] mx-auto" />
            <p className="text-sm text-[#94A3B8]">No insights match your active filter criteria.</p>
            <button
              onClick={() => {
                setSelectedPillar('All');
                setSelectedType('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#2563EB] text-xs font-bold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 05. STRATEGIC PILLAR GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="space-y-8">
          <div className="border-t border-[#1E293B] pt-12">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase block mb-1">
              // Foundational Knowledge Architecture
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Strategic Pillar Guides
                </h2>
                <p className="text-sm text-[#94A3B8] max-w-2xl mt-1">
                  Comprehensive topic hubs engineered to connect technical fundamentals directly to commercial outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRATEGIC_PILLAR_GUIDES.map((pillar, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToBlogSlug(pillar.slug)}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all duration-300 space-y-4 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-[#1E293B] text-[#60A5FA] font-mono text-[10px] font-bold">
                      {pillar.category}
                    </span>
                    <span className="text-[#64748B] font-mono text-[11px]">{pillar.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E293B]/60 flex items-center justify-between text-xs font-bold text-[#60A5FA]">
                  <span>Explore Pillar Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 06. ORIGINAL EMPIRICAL RESEARCH SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D1424] to-[#070B14] border border-[#1E293B] space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-xs font-mono text-[#60A5FA]">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>ORIGINAL EMPIRICAL RESEARCH STUDY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  The 2026 Bangalore SaaS Search Visibility Benchmark
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  We analyzed 100 B2B technology companies across Core Web Vitals, Schema Knowledge Graphs, and AI Overview citation frequencies.
                </p>
              </div>

              <button
                onClick={() => onNavigateToBlogSlug('2026-bangalore-saas-search-visibility-study')}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 whitespace-nowrap self-start lg:self-auto"
              >
                <span>Read Full Research Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Research Stats Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#1E293B]">
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA]">100</p>
                <p className="text-xs font-bold text-white mt-1">SaaS Websites Audited</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Series A to Public Enterprises</p>
              </div>
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">68%</p>
                <p className="text-xs font-bold text-white mt-1">Fail Core Web Vitals</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Mobile LCP &gt; 3.8 seconds</p>
              </div>
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.8x</p>
                <p className="text-xs font-bold text-white mt-1">Inbound Lead Multiple</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">For sub-second Edge architectures</p>
              </div>
              <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B]">
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">14%</p>
                <p className="text-xs font-bold text-white mt-1">AI Citation Readiness</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Topical schema &amp; table density</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 07. INDUSTRY INTELLIGENCE PATHWAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="space-y-6">
          <div className="border-t border-[#1E293B] pt-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase block mb-1">
                // Industry Verticals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Industry-Specific Inbound Intelligence
              </h2>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('industries')}
                className="text-xs font-bold text-[#60A5FA] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Industries</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => onNavigateToIndustrySlug && onNavigateToIndustrySlug('real-estate')}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-3"
            >
              <Building2 className="w-6 h-6 text-[#60A5FA]" />
              <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                Real Estate &amp; Luxury Housing
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Reclaim buyer ownership from portal aggregators using micro-market search silos and direct WhatsApp routing.
              </p>
              <span className="text-xs font-bold text-[#60A5FA] inline-flex items-center gap-1 pt-2">
                <span>Explore Real Estate Systems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigateToIndustrySlug && onNavigateToIndustrySlug('saas')}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-3"
            >
              <Cpu className="w-6 h-6 text-[#60A5FA]" />
              <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                B2B Enterprise SaaS
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Turn high-intent comparison and software category searches into predictable pipeline demos.
              </p>
              <span className="text-xs font-bold text-[#60A5FA] inline-flex items-center gap-1 pt-2">
                <span>Explore SaaS Systems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigateToIndustrySlug && onNavigateToIndustrySlug('luxury')}
              className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-all cursor-pointer group space-y-3"
            >
              <Sparkles className="w-6 h-6 text-[#60A5FA]" />
              <h3 className="text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                High-Ticket &amp; Luxury Brands
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Mathematical multi-touch attribution and value-based bidding for ultra-high-ticket acquisitions.
              </p>
              <span className="text-xs font-bold text-[#60A5FA] inline-flex items-center gap-1 pt-2">
                <span>Explore Luxury Systems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 08. CONTEXTUAL INBOUND CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1424] border border-[#1E293B] text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>TRANSPARENT TECHNICAL PARTNERSHIP</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to engineer an owned digital acquisition system?
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              We audit your domain's organic search entity graph, Core Web Vitals performance, and paid attribution pipelines.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                id="blog-request-audit-btn"
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Schedule Technical Growth Assessment
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('case-studies')}
                  className="px-6 py-3.5 rounded-xl bg-[#070B14] hover:bg-[#131D33] text-white text-xs font-semibold border border-[#1E293B] transition-all cursor-pointer"
                >
                  Inspect Case Studies →
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
