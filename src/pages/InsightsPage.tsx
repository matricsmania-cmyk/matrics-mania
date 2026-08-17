import React, { useState, useMemo } from 'react';
import { InsightItem } from '../types';
import { INSIGHTS_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { Search, ArrowRight, Sparkles, Filter, FileText, Download, BarChart2, TrendingUp, ShieldCheck } from 'lucide-react';

interface InsightsPageProps {
  onNavigateToInsightSlug: (slug: string) => void;
  onOpenBooking: () => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  onNavigateToInsightSlug,
  onOpenBooking,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Benchmark Report',
    'Industry Study',
    'ROI Audit',
    'Executive Whitepaper',
  ];

  const filteredInsights = useMemo(() => {
    return INSIGHTS_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summaryPoints.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredInsight = INSIGHTS_DATA[0];

  return (
    <div className="bg-[#F7F5F0] dark:bg-[#171717] text-[#171717] dark:text-[#F7F5F0] space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#171717] dark:text-[#F7F5F0] max-w-4xl mx-auto tracking-tight leading-tight">
            Market Intelligence & <span className="underline decoration-[#B39A6B] decoration-4 underline-offset-8">Growth Benchmark Reports</span>
          </h1>
          <p className="text-base sm:text-lg text-[#68645D] dark:text-[#BDB7AA] max-w-2xl mx-auto leading-relaxed">
            Data-driven research studies, channel performance benchmarks, and executive whitepapers published by our performance data team.
          </p>

          {/* Search & Category Filter */}
          <div className="max-w-2xl mx-auto space-y-4 pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search market intelligence (e.g. SaaS CAC, AI Search, Festive ROAS, Attribution)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FCFBF8] dark:bg-[#21201D] border border-[#D9D4CA] dark:border-[#38352F] text-[#171717] dark:text-[#F7F5F0] text-sm focus:outline-none focus:border-[#B39A6B]"
              />
              <Search className="w-4 h-4 text-[#8C7343] dark:text-[#B39A6B] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#171717] text-[#F7F5F0] border-[#171717] dark:bg-[#B39A6B] dark:text-[#171717] dark:border-[#B39A6B]'
                      : 'bg-[#FCFBF8] dark:bg-[#21201D] text-[#68645D] dark:text-[#BDB7AA] border-[#D9D4CA] dark:border-[#38352F] hover:bg-[#E9E5DC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED INSIGHT BANNER */}
      {selectedCategory === 'All' && !searchQuery && featuredInsight && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div
              onClick={() => onNavigateToInsightSlug(featuredInsight.slug)}
              className="rounded-2xl bg-[#171717] text-[#F7F5F0] border border-[#38352F] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group hover:border-[#B39A6B] transition-colors duration-300 p-6 md:p-8"
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-[#B39A6B] text-[#171717] font-bold text-xs px-3 py-1 rounded-full">
                    {featuredInsight.category}
                  </span>
                  <span className="text-xs font-medium text-[#BDB7AA]">
                    {featuredInsight.type} • {featuredInsight.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold group-hover:text-[#B39A6B] transition-colors leading-tight text-[#F7F5F0]">
                  {featuredInsight.title}
                </h2>

                <p className="text-xs md:text-sm text-[#BDB7AA] line-clamp-3 leading-relaxed">
                  {featuredInsight.excerpt}
                </p>

                {/* Key Metrics Grid Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {featuredInsight.keyMetrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#21201D] border border-[#38352F] text-center"
                    >
                      <p className="text-lg font-bold text-[#B39A6B]">{m.value}</p>
                      <p className="text-[10px] text-[#BDB7AA] truncate">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <OptimizedImage
                      src={featuredInsight.author.avatar}
                      alt={featuredInsight.author.name}
                      widthParam={100}
                      className="w-8 h-8 rounded-full object-cover border border-[#38352F]"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-[#F7F5F0]">{featuredInsight.author.name}</p>
                      <p className="text-[#8C7343] text-[10px]">{featuredInsight.publishedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#B39A6B] group-hover:translate-x-1 transition-transform">
                    <span>Access Benchmark Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 h-64 lg:h-full relative rounded-xl overflow-hidden min-h-[260px]">
                <OptimizedImage
                  src={featuredInsight.featuredImageUrl}
                  alt={featuredInsight.title}
                  widthParam={900}
                  priority={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* INSIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F7F5F0] flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#B39A6B]" />
            <span>Showing {filteredInsights.length} Intelligence Reports</span>
          </h3>
        </ScrollReveal>

        {filteredInsights.length === 0 ? (
          <ScrollReveal className="text-center py-12 p-8 bg-[#FCFBF8] dark:bg-[#21201D] rounded-2xl border border-[#D9D4CA] dark:border-[#38352F] space-y-3">
            <p className="text-sm font-semibold text-[#68645D] dark:text-[#BDB7AA]">
              No research reports found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#B39A6B] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInsights.map((item, idx) => (
              <ScrollReveal
                key={item.id}
                delay={idx * 0.05}
                className="rounded-2xl bg-[#FCFBF8] dark:bg-[#21201D] border border-[#D9D4CA] dark:border-[#38352F] overflow-hidden hover:border-[#B39A6B] transition-colors cursor-pointer group flex flex-col justify-between p-6 space-y-4"
              >
                <div
                  onClick={() => onNavigateToInsightSlug(item.slug)}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7343] dark:text-[#B39A6B] bg-[#E9E5DC] dark:bg-[#2B2925] px-2.5 py-1 rounded-full border border-[#D9D4CA] dark:border-[#38352F]">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-[#68645D] dark:text-[#BDB7AA] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#B39A6B]" />
                      {item.readTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg text-[#171717] dark:text-[#F7F5F0] group-hover:text-[#8C7343] dark:group-hover:text-[#C7B082] transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#68645D] dark:text-[#BDB7AA] line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {item.keyMetrics.slice(0, 3).map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#F7F5F0] dark:bg-[#171717] border border-[#D9D4CA] dark:border-[#38352F] text-center">
                        <p className="text-sm font-extrabold text-[#8C7343] dark:text-[#B39A6B]">{m.value}</p>
                        <p className="text-[10px] text-[#68645D] dark:text-[#BDB7AA] truncate">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  onClick={() => onNavigateToInsightSlug(item.slug)}
                  className="pt-4 border-t border-[#D9D4CA] dark:border-[#38352F] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <OptimizedImage
                      src={item.author.avatar}
                      alt={item.author.name}
                      widthParam={80}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[#171717] dark:text-[#F7F5F0] font-medium">{item.author.name}</span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-[#8C7343] dark:text-[#B39A6B] group-hover:translate-x-1 transition-transform">
                    <span>Read Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* EXECUTIVE REQUEST BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-[#171717] text-[#F7F5F0] rounded-2xl p-8 md:p-12 text-center space-y-4 border border-[#38352F]">
          <BarChart2 className="w-8 h-8 text-[#B39A6B] mx-auto" />
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#F7F5F0]">
            Need a Customized Growth Benchmark Audit?
          </h3>
          <p className="text-[#BDB7AA] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Our analytics team will audit your domain, run competitive ad coverage teardowns, and model custom CAC/LTV benchmarks.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-[#B39A6B] hover:bg-[#9E8557] text-[#171717] font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Request Custom Enterprise Benchmark Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
