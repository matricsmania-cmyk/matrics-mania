import React, { useState, useEffect } from 'react';
import { BlogPost, PageType } from '../types';
import { INSIGHTS_POSTS_DATA } from '../data/insightsData';
import { OptimizedImage } from '../components/OptimizedImage';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Quote,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  Cpu,
  BarChart3,
  Sparkles,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

interface SingleBlogPostPageProps {
  post: BlogPost;
  onNavigate: (page: PageType) => void;
  onNavigateToBlogSlug: (slug: string) => void;
  onNavigateToServiceSlug?: (slug: string) => void;
  onNavigateToIndustrySlug?: (slug: any) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SingleBlogPostPage: React.FC<SingleBlogPostPageProps> = ({
  post,
  onNavigate,
  onNavigateToBlogSlug,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking,
  onShowToast,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.id, post.slug]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      onShowToast('Link Copied!', 'Article URL copied to your clipboard.', 'info');
    }
  };

  const handleBookmark = () => {
    onShowToast('Article Saved', 'Added to your bookmarked reading list.', 'success');
  };

  const handleCopyCode = (code: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedSnippetIndex(index);
      onShowToast('Code Copied!', 'Schema snippet copied to clipboard.', 'success');
      setTimeout(() => setCopiedSnippetIndex(null), 3000);
    }
  };

  // Find related posts in the same pillar or fallback to other insights
  const relatedPosts = INSIGHTS_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070B14] text-white pb-28">
      {/* 01. TOP STICKY BREADCRUMB NAVIGATION */}
      <div className="bg-[#0D1424] border-b border-[#1E293B] sticky top-[80px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] truncate">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#070B14] border border-[#1E293B] text-white text-xs font-bold hover:bg-[#131D33] transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Insights</span>
            </button>
            <span className="hidden sm:inline text-[#475569]">/</span>
            <span className="hidden sm:inline text-[#60A5FA] font-mono text-[11px]">{post.category}</span>
            <span className="hidden md:inline text-[#475569]">/</span>
            <span className="hidden md:inline text-[#CBD5E1] truncate max-w-xs">{post.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title="Bookmark Article"
              className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#070B14] border border-transparent hover:border-[#1E293B] transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share Link"
              className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#070B14] border border-transparent hover:border-[#1E293B] transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 02. MAIN ARTICLE CONTAINER */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 space-y-12">
        {/* Header Block */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-bold bg-[#2563EB] text-white px-3 py-1 rounded-md">
              {post.category}
            </span>
            <span className="text-xs font-mono bg-[#0D1424] text-[#60A5FA] px-3 py-1 rounded-md border border-[#1E293B]">
              {post.contentType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {post.standfirst && (
            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed font-normal border-l-2 border-[#2563EB] pl-4">
              {post.standfirst}
            </p>
          )}

          {/* Authorship & Dates Meta */}
          <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#2563EB]/50 shadow-md"
              />
              <div>
                <p className="font-bold text-white text-sm">{post.author.name}</p>
                <p className="text-xs text-[#94A3B8]">{post.author.role}</p>
              </div>
            </div>

            {post.reviewer && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D1424] border border-[#1E293B] text-[11px] text-[#94A3B8]">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Reviewed by <strong className="text-white">{post.reviewer.name}</strong> ({post.reviewer.role})
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 text-[#94A3B8] font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
                {post.publishedAt}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* 03. HERO VISUAL */}
        <div className="rounded-2xl overflow-hidden border border-[#1E293B] bg-[#0D1424] max-h-[460px] shadow-2xl">
          <OptimizedImage
            src={post.featuredImageUrl}
            alt={post.title}
            widthParam={1200}
            priority={true}
            className="w-full h-full object-cover max-h-[460px]"
          />
        </div>

        {/* 04. KEY TAKEAWAYS BOX (EXECUTIVE SUMMARY) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0D1424] to-[#070B14] border border-[#2563EB]/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                KEY TAKEAWAYS FOR EXECUTIVES
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">Core Strategic Summary</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {post.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#1E293B] text-[#60A5FA] text-xs font-mono font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 05. ARTICLE INTRODUCTORY BODY */}
        <div className="prose prose-invert max-w-none text-base text-[#CBD5E1] leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* EMPIRICAL STUDY DATA SECTION (IF PRESENT) */}
        {post.originalStudyData && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#2563EB]" />
                EMPIRICAL STUDY DATASET
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">{post.originalStudyData.timeframe}</span>
            </div>

            <div className="space-y-2 text-xs text-[#94A3B8]">
              <p><strong className="text-white">Sample Size:</strong> {post.originalStudyData.sampleSize}</p>
              <p><strong className="text-white">Methodology:</strong> {post.originalStudyData.methodology}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {post.originalStudyData.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1">
                  <span className="text-2xl font-extrabold text-[#60A5FA] font-mono">{stat.value}</span>
                  <p className="text-xs font-bold text-white">{stat.label}</p>
                  <p className="text-[11px] text-[#64748B]">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 06. STRUCTURED ARTICLE SECTIONS */}
        {post.sections && post.sections.length > 0 && (
          <div className="space-y-12 pt-4">
            {post.sections.map((section, sIdx) => (
              <section key={section.id || sIdx} className="space-y-6 border-t border-[#1E293B] pt-8">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs font-mono text-[#60A5FA]">{section.subtitle}</p>
                  )}
                </div>

                <div className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {/* Key Points Bullet List */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="p-5 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-2.5">
                    <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider block mb-1">
                      Key Takeaway Points:
                    </span>
                    {section.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quote Callout */}
                {section.quote && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0D1424] to-[#070B14] border-l-4 border-[#2563EB] border border-[#1E293B] space-y-2">
                    <Quote className="w-5 h-5 text-[#2563EB]" />
                    <p className="text-sm sm:text-base text-white font-medium italic leading-relaxed">
                      "{section.quote}"
                    </p>
                  </div>
                )}

                {/* Structured Data Table */}
                {section.table && (
                  <div className="overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0D1424]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#070B14] border-b border-[#1E293B] text-[#60A5FA] font-mono uppercase text-[11px]">
                          {section.table.headers.map((header, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B] text-[#CBD5E1]">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#131D33] transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`py-3 px-4 ${cIdx === 0 ? 'font-medium text-white' : ''}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Step / Diagram Visualizer */}
                {section.diagram && (
                  <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                    <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider block">
                      {section.diagram.title}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.diagram.items.map((item, dIdx) => (
                        <div key={dIdx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{item.label}</span>
                            {item.tag && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#60A5FA]">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-[#1E293B] bg-[#070B14] space-y-0">
                    <div className="bg-[#0D1424] px-4 py-2 flex items-center justify-between border-b border-[#1E293B]">
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        Structured Schema · {section.codeLanguage || 'json'}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!, sIdx)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#60A5FA] hover:text-white font-mono cursor-pointer"
                      >
                        {copiedSnippetIndex === sIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Schema</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-[#93C5FD] overflow-x-auto leading-relaxed bg-[#070B14]">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* 07. CONTEXTUAL COMMERCIAL LINKAGE (SERVICE / INDUSTRY / CASE STUDY) */}
        <div className="pt-8 border-t border-[#1E293B] space-y-6">
          <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase block">
            // Contextual Knowledge & Capability Graph
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Related Service Card */}
            {post.relatedServiceSlug && (
              <div
                onClick={() => onNavigateToServiceSlug && onNavigateToServiceSlug(post.relatedServiceSlug!)}
                className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#60A5FA] font-bold">
                    Connected Service
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {post.relatedServiceName || 'Technical Growth Strategy'}
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    Explore engineering implementation details &amp; deliverables.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#60A5FA] inline-flex items-center gap-1 pt-2">
                  <span>View Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            )}

            {/* Related Industry Card */}
            {post.relatedIndustrySlug && (
              <div
                onClick={() => onNavigateToIndustrySlug && onNavigateToIndustrySlug(post.relatedIndustrySlug!)}
                className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    Connected Industry
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {post.relatedIndustryName || 'Industry Inbound Architecture'}
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    Sector-specific benchmarks, compliance rules, and funnels.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1 pt-2">
                  <span>View Industry</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            )}

            {/* Related Case Study Card */}
            <div
              onClick={() => onNavigate('case-studies')}
              className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                  Verified Case Study
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  Bangalore Real Estate Growth System
                </h4>
                <p className="text-xs text-[#94A3B8]">
                  +142% organic inquiries &amp; -38% customer acquisition cost.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-400 inline-flex items-center gap-1 pt-2">
                <span>Read Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* 08. AUTHOR PROFILE BIO CARD */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-2xl object-cover border border-[#2563EB]/40 shadow-lg shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{post.author.name}</h3>
              <span className="text-xs text-[#60A5FA] font-mono">Verified Author</span>
            </div>
            <p className="text-xs font-mono text-[#94A3B8]">{post.author.role}</p>
            <p className="text-xs text-[#CBD5E1] leading-relaxed pt-1">
              {post.author.bio ||
                'Senior growth and search architect at MatricsMania, specializing in technical SEO, high-ROAS paid media systems, and knowledge graph engineering.'}
            </p>
          </div>
        </div>

        {/* 09. CONTEXTUAL COMMERCIAL CTA (TAILORED TO TOPIC) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0D1424] via-[#0D1424] to-[#070B14] border border-[#2563EB]/50 text-center space-y-5 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#60A5FA]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CONTEXTUAL ASSESSMENT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {post.ctaContext?.headline || 'Need your growth architecture evaluated?'}
          </h3>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            {post.ctaContext?.subheadline ||
              'Schedule a technical consultation with our engineering team to review your domain and acquisition pipelines.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              {post.ctaContext?.buttonText || 'Schedule Strategic Consultation'}
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="px-6 py-3.5 rounded-xl bg-[#070B14] hover:bg-[#131D33] text-white text-xs font-semibold border border-[#1E293B] transition-all cursor-pointer"
            >
              Explore More Insights →
            </button>
          </div>
        </div>

        {/* 10. RELATED INSIGHTS CLUSTER */}
        <div className="pt-12 border-t border-[#1E293B] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60A5FA] uppercase">
              // Related Strategic Insights
            </span>
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs font-bold text-[#60A5FA] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onNavigateToBlogSlug(related.slug)}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all duration-300 space-y-3 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-[#1E293B] text-[#60A5FA] text-[10px] font-mono font-bold">
                      {related.category}
                    </span>
                    <span className="text-[#64748B] font-mono text-[11px]">{related.readTime}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug line-clamp-2">
                    {related.title}
                  </h4>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {related.standfirst || related.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-xs font-bold text-[#60A5FA]">
                  <span>Read Insight</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
