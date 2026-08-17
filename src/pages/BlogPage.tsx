import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { Search, Calendar, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface BlogPageProps {
  onNavigateToBlogSlug: (slug: string) => void;
  onOpenBooking: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateToBlogSlug, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'SEO & Growth', 'Paid Media', 'AI Marketing', 'Analytics', 'Brand Strategy'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS_DATA[0];

  const gridPosts = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery && featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  return (
    <div className="bg-[#070B14] text-white space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal className="space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl mx-auto tracking-tight leading-[1.15]">
            The MatricsMania <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Growth Intelligence Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            In-depth technical SEO breakdowns, high-ROAS creative playbooks, and algorithmic conversion engineering guides published weekly.
          </p>

          {/* Search Bar & Category Filter */}
          <div className="max-w-2xl mx-auto space-y-4 pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by keyword or tag (e.g. SEO, CAPI, ROAS, CRO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0D1424] border border-[#1E293B] text-white text-sm focus:outline-none focus:border-[#2563EB]"
              />
              <Search className="w-4 h-4 text-[#60A5FA] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white border-transparent'
                      : 'bg-[#0D1424] text-[#94A3B8] border-[#1E293B] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED POST BANNER */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div
              onClick={() => onNavigateToBlogSlug(getSlugFromTitle(featuredPost.title))}
              className="rounded-2xl bg-[#0D1424] text-white border border-[#1E293B] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group hover:border-[#2563EB]/40 transition-colors duration-300"
            >
              <div className="lg:col-span-6 h-64 lg:h-full relative overflow-hidden">
                <OptimizedImage
                  src={featuredPost.featuredImageUrl}
                  alt={featuredPost.title}
                  widthParam={900}
                  priority={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-[#2563EB] text-white font-bold text-xs px-3 py-1 rounded-full z-10">
                  Featured Article
                </span>
              </div>

              <div className="lg:col-span-6 p-6 md:p-10 space-y-4">
                <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold group-hover:text-[#60A5FA] transition-colors leading-tight text-white">
                  {featuredPost.title}
                </h2>
                <p className="text-xs md:text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <OptimizedImage
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    widthParam={100}
                    className="w-8 h-8 rounded-full object-cover border border-[#1E293B]"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-white">{featuredPost.author.name}</p>
                    <p className="text-[#94A3B8] text-[10px]">{featuredPost.publishedAt} • {featuredPost.readTime}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#60A5FA] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ARTICLES GRID */}
      {(gridPosts.length > 0 || filteredPosts.length === 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#60A5FA]" />
              <span>Showing {gridPosts.length > 0 ? gridPosts.length : filteredPosts.length} Articles</span>
            </h3>
          </ScrollReveal>

          {filteredPosts.length === 0 ? (
            <ScrollReveal className="text-center py-12 p-8 bg-[#0D1424] rounded-2xl border border-[#1E293B] space-y-3">
              <p className="text-sm font-semibold text-[#94A3B8]">
                No articles matched your category or search query "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-[#60A5FA] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post, idx) => (
              <ScrollReveal
                key={post.id}
                delay={idx * 0.05}
                className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden hover:border-[#2563EB]/40 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div onClick={() => onNavigateToBlogSlug(getSlugFromTitle(post.title))}>
                  <div className="h-48 overflow-hidden relative">
                    <OptimizedImage
                      src={post.featuredImageUrl}
                      alt={post.title}
                      widthParam={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#070B14]/80 text-white px-3 py-1 rounded-full text-[11px] font-bold z-10 border border-[#1E293B]">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="font-bold text-base text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium text-[#60A5FA] bg-[#131D33] px-2 py-0.5 rounded border border-[#1E293B]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#94A3B8] mt-4">
                  <div className="flex items-center gap-2">
                    <OptimizedImage
                      src={post.author.avatar}
                      alt={post.author.name}
                      widthParam={80}
                      className="w-6 h-6 rounded-full object-cover border border-[#1E293B]"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span className="font-semibold text-[#60A5FA]">{post.readTime}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
      )}

      {/* BLOG NEWSLETTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-[#0D1424] text-white rounded-2xl p-8 md:p-12 text-center space-y-4 border border-[#1E293B]">
          <Sparkles className="w-6 h-6 text-[#60A5FA] mx-auto" />
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Never Miss an Algorithm Update</h3>
          <p className="text-[#94A3B8] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Get our latest SEO teardowns and PPC campaign experiments delivered directly to your inbox every Tuesday.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Subscribe or Request Strategy Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
