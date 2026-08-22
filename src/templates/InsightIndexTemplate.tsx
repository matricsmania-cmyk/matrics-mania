'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { ConversionCTASection } from '../components/sections';
import { Insight } from '../models';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Layers,
  Building2,
  User,
  Filter,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface InsightIndexTemplateProps {
  insights?: Insight[];
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

type SortOption = 'newest' | 'oldest' | 'reading_time_asc' | 'reading_time_desc';

export const InsightIndexTemplate: React.FC<InsightIndexTemplateProps> = ({
  insights: propInsights,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const allInsights = propInsights || provider.getAllInsights();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedContentType, setSelectedContentType] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isLoadMoreMode, setIsLoadMoreMode] = useState(false);
  const [loadedCount, setLoadedCount] = useState(6);

  // Scroll to top on pagination change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const listElem = document.getElementById('insights-grid-container');
    if (listElem) {
      listElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Extract distinct categories with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allInsights.length };
    allInsights.forEach((item) => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [allInsights]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  // Extract distinct content types
  const contentTypes = useMemo(() => {
    const set = new Set<string>();
    allInsights.forEach((item) => {
      if (item.contentType) set.add(item.contentType);
    });
    return ['All', ...Array.from(set)];
  }, [allInsights]);

  // Filter and sort list
  const filteredAndSortedInsights = useMemo(() => {
    let result = allInsights.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchContentType =
        selectedContentType === 'All' || item.contentType === selectedContentType;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.standfirst && item.standfirst.toLowerCase().includes(q)) ||
        (item.author?.name && item.author.name.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

      return matchCategory && matchContentType && matchSearch;
    });

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortOption === 'oldest') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      }
      if (sortOption === 'reading_time_asc') {
        return (a.readingTimeMinutes || 5) - (b.readingTimeMinutes || 5);
      }
      if (sortOption === 'reading_time_desc') {
        return (b.readingTimeMinutes || 5) - (a.readingTimeMinutes || 5);
      }
      return 0;
    });

    return result;
  }, [allInsights, selectedCategory, selectedContentType, searchQuery, sortOption]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setLoadedCount(itemsPerPage);
  }, [selectedCategory, selectedContentType, searchQuery, sortOption, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedInsights.length / itemsPerPage);

  const paginatedInsights = useMemo(() => {
    if (isLoadMoreMode) {
      return filteredAndSortedInsights.slice(0, loadedCount);
    }
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedInsights.slice(start, start + itemsPerPage);
  }, [filteredAndSortedInsights, currentPage, itemsPerPage, isLoadMoreMode, loadedCount]);

  const featuredPost = allInsights[0];

  const quickFilterTags = [
    'Vector Retrieval',
    'Schema.org',
    'Server-Side CAPI',
    'Core Web Vitals',
    'Perplexity SEO',
    'Econometrics',
  ];

  const canonicalUrl = 'https://matricsmania.com/insights/';

  return (
    <div className="bg-[#070B14] text-white selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased min-h-screen">
      <SEOHead
        pageType="insight"
        canonicalUrl={canonicalUrl}
        title="Growth Engineering Research & Insights | MatricsMania"
        description="Technical papers, crawl engineering benchmarks, Perplexity citation analysis, and conversion protocols."
      />

      {/* Hero */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden bg-[#070B14]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#2563EB]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Breadcrumb indicator */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-mono text-[#64748B] mb-2">
            <button onClick={() => onNavigate('/')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-[#60A5FA]">Insights &amp; Research</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase mx-auto">
            <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
            Peer-Reviewed Growth Intelligence &amp; Empirical Frameworks
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Research, Protocols &amp; Growth Insights
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Proprietary research papers on AI search engine optimization, full-funnel attribution mathematics, log-file crawl telemetry, and deterministic conversion testing.
          </p>

          {/* Search Interface */}
          <div className="max-w-3xl mx-auto pt-4 space-y-4">
            <div className="relative">
              <label htmlFor="insight-search-input" className="sr-only">
                Search insights, research papers, and technical guides
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <input
                id="insight-search-input"
                type="text"
                aria-label="Search research papers and technical insights"
                placeholder="Search research papers, vector search, CAPI attribution, Core Web Vitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-20 py-3.5 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-sm text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search input"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#64748B] hover:text-white px-2 py-1 rounded bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1" role="toolbar" aria-label="Trending search topics">
              <span className="text-[11px] font-mono text-[#64748B]">Trending:</span>
              {quickFilterTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-md bg-[#0D1424] hover:bg-[#1E293B] border border-[#1E293B] text-[11px] font-mono text-[#94A3B8] hover:text-[#60A5FA] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Category Filter Tabs with Item Counts */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2" role="toolbar" aria-label="Filter insights by category">
              {categories.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25'
                        : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-[#64748B]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section id="insights-grid-container" className="py-16 md:py-20 bg-[#050811] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post (Visible when viewing All without an active text search) */}
          {selectedCategory === 'All' && selectedContentType === 'All' && !searchQuery && currentPage === 1 && featuredPost && (
            <ScrollReveal className="mb-16">
              <div
                onClick={() => onNavigate(`/insights/${featuredPost.slug}/`)}
                className="rounded-3xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/60 transition-all p-6 sm:p-8 lg:p-10 cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="lg:col-span-6 space-y-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#2563EB]/20 px-2.5 py-1 rounded border border-[#2563EB]/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                      FEATURED RESEARCH
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8] bg-[#070B14] px-2.5 py-1 rounded border border-[#1E293B]">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readingTimeMinutes ? `${featuredPost.readingTimeMinutes} min read` : '8 min read'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#60A5FA] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed line-clamp-3">
                    {featuredPost.standfirst || featuredPost.excerpt}
                  </p>

                  {/* Key takeaways teaser */}
                  {featuredPost.keyTakeaways && featuredPost.keyTakeaways.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#CBD5E1] bg-[#070B14]/60 p-3 rounded-xl border border-[#1E293B]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{featuredPost.keyTakeaways[0]}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      {featuredPost.author?.avatar && (
                        <OptimizedImage
                          src={typeof featuredPost.author.avatar === 'string' ? featuredPost.author.avatar : featuredPost.author.avatar.url}
                          alt={featuredPost.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#2563EB]/40"
                        />
                      )}
                      <div>
                        <div className="text-xs font-bold text-white">{featuredPost.author?.name || 'Arjun V. Nair'}</div>
                        <div className="text-[11px] font-mono text-[#60A5FA]">{featuredPost.author?.role || 'Principal Growth Architect'}</div>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-[#60A5FA] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/30 group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                      <span>Read Full Paper</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {featuredPost.featuredImage && (
                  <div className="lg:col-span-6 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden relative border border-[#1E293B]">
                    <OptimizedImage
                      src={typeof featuredPost.featuredImage === 'string' ? featuredPost.featuredImage : featuredPost.featuredImage.url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/80 via-transparent to-transparent" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Secondary Controls Bar: Content Type & Sort & View Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#1E293B] mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#64748B] flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Type:
              </span>
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedContentType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    selectedContentType === type
                      ? 'bg-[#1E293B] text-[#60A5FA] border border-[#2563EB]/50'
                      : 'text-[#94A3B8] hover:text-white bg-[#0D1424] border border-[#1E293B]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="reading_time_asc">Fastest Read</option>
                  <option value="reading_time_desc">Deepest Analysis</option>
                </select>
              </div>

              <div className="text-xs font-mono text-[#64748B]">
                Showing <span className="text-white font-bold">{filteredAndSortedInsights.length}</span> papers
              </div>
            </div>
          </div>

          {/* Grid of Results */}
          {filteredAndSortedInsights.length === 0 ? (
            <div className="text-center py-20 space-y-4 rounded-3xl bg-[#0D1424] border border-[#1E293B] p-8 max-w-xl mx-auto">
              <BookOpen className="w-10 h-10 text-[#64748B] mx-auto" />
              <h3 className="text-lg font-bold text-white">No Research Papers Found</h3>
              <p className="text-sm text-[#94A3B8]">
                No technical papers match the query "{searchQuery}". Try selecting another category or resetting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedContentType('All');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedInsights.map((post, idx) => {
                  const imgUrl = typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url;
                  const authorAvatar = typeof post.author?.avatar === 'string' ? post.author.avatar : post.author?.avatar?.url;
                  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <ScrollReveal key={post.id} delay={idx * 0.05}>
                      <div
                        onClick={() => onNavigate(`/insights/${post.slug}/`)}
                        className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-blue-500/5"
                      >
                        <div className="space-y-4">
                          {/* Image */}
                          {imgUrl && (
                            <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-[#1E293B]">
                              <OptimizedImage
                                src={imgUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#070B14]/85 backdrop-blur-md text-[#60A5FA] border border-[#2563EB]/30 font-semibold">
                                  {post.category}
                                </span>
                                {post.contentType && (
                                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#070B14]/80 backdrop-blur-md text-[#94A3B8] border border-white/10">
                                    {post.contentType}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Meta Row: Date & Reading Time */}
                          <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '6 min read'}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                            {post.excerpt || post.standfirst}
                          </p>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {post.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14] text-[#64748B] border border-[#1E293B]"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Author & Action Footer */}
                        <div className="border-t border-[#1E293B] pt-4 mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {authorAvatar && (
                              <OptimizedImage
                                src={authorAvatar}
                                alt={post.author?.name || 'Author'}
                                className="w-6 h-6 rounded-full object-cover border border-[#2563EB]/40"
                              />
                            )}
                            <span className="text-xs text-[#CBD5E1] font-medium line-clamp-1">
                              {post.author?.name || 'MatricsMania'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-mono text-[#60A5FA] group-hover:text-white transition-colors">
                            <span>Read Paper</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Pagination & Load-More Architecture */}
              {totalPages > 1 && (
                <div className="mt-14 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-[#64748B]">
                    Page <span className="text-white font-bold">{currentPage}</span> of{' '}
                    <span className="text-white font-bold">{totalPages}</span> (
                    {filteredAndSortedInsights.length} total items)
                  </div>

                  {/* Mode Selector / Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E293B] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Prev
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-blue-500/20'
                              : 'bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E293B] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <ConversionCTASection
        title="Have a Complex Growth Architecture Question?"
        subtitle="Schedule a 30-minute diagnostic session with our Principal Search Architects to discuss crawl log telemetry, AI answer engine citations, and attribution pipelines."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: 'Research & Insights Diagnostic' }}
      />
    </div>
  );
};
