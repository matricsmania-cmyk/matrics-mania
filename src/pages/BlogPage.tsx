import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
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

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Growth & Marketing Insights
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white max-w-4xl mx-auto tracking-tight leading-tight">
          The Matricsmania <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Growth Intelligence Blog</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED POST BANNER */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => onNavigateToBlogSlug(getSlugFromTitle(featuredPost.title))}
            className="rounded-3xl bg-slate-900 text-white border border-slate-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="lg:col-span-6 h-64 lg:h-full relative overflow-hidden">
              <img
                src={featuredPost.featuredImageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-6 p-6 md:p-10 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold group-hover:text-blue-400 transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700"
                />
                <div className="text-xs">
                  <p className="font-bold text-white">{featuredPost.author.name}</p>
                  <p className="text-slate-400 text-[10px]">{featuredPost.publishedAt} • {featuredPost.readTime}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-500" />
            <span>Showing {filteredPosts.length} Articles</span>
          </h3>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No articles matched your search query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-blue-500 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
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
                    <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span className="font-semibold text-blue-500">{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BLOG NEWSLETTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-4 border border-slate-800 shadow-xl">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-extrabold">Never Miss an Algorithm Update</h3>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
            Get our latest SEO teardowns and PPC campaign experiments delivered directly to your inbox every Tuesday.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <span>Subscribe or Request Strategy Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
