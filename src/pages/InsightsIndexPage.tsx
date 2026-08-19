import React, { useState, useMemo } from 'react';
import { getAllInsights } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';

interface InsightsIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const InsightsIndexPage: React.FC<InsightsIndexPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const posts = getAllInsights();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  const canonicalUrl = 'https://matricsmania.com/insights/';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MatricsMania Insights & Research',
    description: 'Engineering-grade analysis on Search Architecture, Generative AI Discovery (GEO), Paid Media, and B2B Conversion Systems.',
    url: canonicalUrl,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://matricsmania.com/insights/${p.slug}/`,
      datePublished: p.publishedAt,
    })),
  };

  return (
    <div className="bg-[#070B14] text-white min-h-screen selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <SEOHead
        title="Insights & Research | Growth Engineering | MatricsMania"
        description="Original research, technical guides, and frameworks on AI Search (GEO), Technical SEO, Algorithmic Media, and Conversion Engineering."
        canonicalUrl={canonicalUrl}
        schema={schemaData}
      />

      {/* HERO */}
      <section className="relative border-b border-[#1E293B] pt-12 pb-16 md:py-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <ScrollReveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              // Editorial Research & Frameworks
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Growth Intelligence & Systems Analysis
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              No generic listicles. Rigorous frameworks, code architectures, and empirical playbooks for high-growth operators.
            </p>
          </ScrollReveal>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, keywords, technical frameworks..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1424] border border-[#1E293B] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white font-bold'
                      : 'bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED POST (if not searching/filtering) */}
      {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
        <section className="py-12 border-b border-[#1E293B] bg-[#050811]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              onClick={() => onNavigate(`/insights/${featuredPost.slug}/`)}
              className="group cursor-pointer rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all"
            >
              <div className="lg:col-span-6 p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-[#131D33] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
                    FEATURED RESEARCH
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {featuredPost.standfirst || featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                  Read full research paper <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="lg:col-span-6 h-full min-h-[280px] relative">
                {featuredPost.featuredImageUrl && (
                  <OptimizedImage
                    src={featuredPost.featuredImageUrl}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES GRID */}
      <section className="py-16 md:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'All' && searchQuery === '' ? remainingPosts : filteredPosts).map(
              (post) => (
                <div
                  key={post.slug}
                  onClick={() => onNavigate(`/insights/${post.slug}/`)}
                  className="group cursor-pointer rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 p-6 space-y-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#60A5FA]">{post.category}</span>
                      <span className="text-[#64748B]">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                      {post.excerpt || post.standfirst}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{post.publishedAt}</span>
                    <span className="text-[#60A5FA] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
