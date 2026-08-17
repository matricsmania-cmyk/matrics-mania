import React, { useState, useEffect } from 'react';
import { BlogPost, PageType } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  Sparkles,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Quote,
  ListOrdered,
  ChevronRight
} from 'lucide-react';

interface SingleBlogPostPageProps {
  post: BlogPost;
  onNavigate: (page: PageType) => void;
  onNavigateToBlogSlug: (slug: string) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SingleBlogPostPage: React.FC<SingleBlogPostPageProps> = ({
  post,
  onNavigate,
  onNavigateToBlogSlug,
  onOpenBooking,
  onShowToast,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.id]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    onShowToast('Link Copied!', 'Article URL copied to your clipboard.', 'info');
  };

  const handleBookmark = () => {
    onShowToast('Article Saved', 'Added to your bookmarked reading list.', 'success');
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard?.writeText(code);
    setCopiedSnippetIndex(index);
    onShowToast('Code Copied!', 'JSON-LD Schema copied to clipboard.', 'success');
    setTimeout(() => setCopiedSnippetIndex(null), 3000);
  };

  const relatedPosts = BLOG_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070B14] text-white pb-24">
      {/* Top Header Navigation & Breadcrumbs */}
      <div className="bg-[#0D1424] border-b border-[#1E293B] sticky top-[80px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-[#60A5FA] font-semibold cursor-pointer text-[#94A3B8]"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-medium text-white truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-white text-xs font-bold hover:bg-[#131D33] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </button>

            <button
              onClick={handleBookmark}
              title="Bookmark Article"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#070B14] cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share Link"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:bg-[#070B14] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 space-y-10">
        {/* Category & Meta Banner */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-xs font-bold bg-[#0D1424] text-[#60A5FA] px-3.5 py-1 rounded-full border border-[#1E293B]">
              {post.category}
            </span>
            {post.wordCount && (
              <span className="text-[11px] font-semibold text-[#94A3B8] bg-[#0D1424] border border-[#1E293B] px-2.5 py-0.5 rounded-full">
                {post.wordCount} words
              </span>
            )}
            <span className="text-[11px] font-semibold text-[#94A3B8] bg-[#0D1424] border border-[#1E293B] px-2.5 py-0.5 rounded-full">
              {post.readTime}
            </span>
          </div>

          {/* Main Article H1 Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Sub-headline / Excerpt */}
          <p className="text-base sm:text-lg text-[#94A3B8] font-medium leading-relaxed italic border-l-4 border-[#2563EB] pl-4 py-1">
            "{post.excerpt}"
          </p>

          {/* Author info bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-[#1E293B] py-4 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-3">
              <OptimizedImage
                src={post.author.avatar}
                alt={post.author.name}
                widthParam={120}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#1E293B]"
              />
              <div>
                <p className="font-bold text-white text-sm">{post.author.name}</p>
                <p className="text-xs text-[#94A3B8]">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#94A3B8] font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#60A5FA]" />
                Published {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#60A5FA]" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-[#1E293B] h-64 sm:h-96 md:h-[450px] w-full relative">
          <OptimizedImage
            src={post.featuredImageUrl}
            alt={post.title}
            widthParam={1100}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
            <div className="flex items-center gap-2 text-[#60A5FA] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
              <span>Executive Strategy Summary</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-white">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {post.sections && post.sections.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <ListOrdered className="w-4 h-4 text-[#60A5FA]" />
              <span>Table of Contents</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#60A5FA] font-semibold">
              {post.sections.map((sec, idx) => (
                <li key={idx}>
                  <a href={`#sec-${sec.id}`} className="hover:underline flex items-center gap-2 text-[#94A3B8] hover:text-[#60A5FA]">
                    <span className="text-[#94A3B8] font-normal">0{idx + 1}.</span>
                    <span>{sec.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core Introductory Text */}
        <div className="space-y-4 text-white text-base md:text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Render Deep Structured Sections */}
        {post.sections && post.sections.length > 0 && (
          <div className="space-y-12">
            {post.sections.map((sec, idx) => (
              <section
                key={sec.id}
                id={`sec-${sec.id}`}
                className="space-y-5 scroll-mt-24 pt-8 border-t border-[#1E293B]"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {sec.title}
                </h2>

                <div className="text-[#94A3B8] text-base leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {/* Optional Quote Box */}
                {sec.quote && (
                  <div className="my-4 p-5 rounded-xl bg-[#0D1424] border-l-4 border-[#2563EB] flex items-start gap-3 italic text-xs sm:text-sm text-white">
                    <Quote className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>"{sec.quote}"</div>
                  </div>
                )}

                {/* Key Points */}
                {sec.keyPoints && sec.keyPoints.length > 0 && (
                  <div className="p-5 rounded-xl bg-[#0D1424] space-y-3 border border-[#1E293B]">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Key Execution Principles:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                      {sec.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#60A5FA] shrink-0 mt-2" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Table Comparison */}
                {sec.table && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-[#1E293B]">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#070B14] text-white font-bold border-b border-[#1E293B]">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B] text-[#94A3B8]">
                        {sec.table.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#0D1424]">
                            {r.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 px-4">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Code / Schema Snippet */}
                {sec.codeSnippet && (
                  <div className="relative rounded-xl bg-[#070B14] text-white p-4 font-mono text-xs overflow-x-auto border border-[#1E293B] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#60A5FA]" />
                        JSON-LD Schema Snippet
                      </span>
                      <button
                        onClick={() => handleCopyCode(sec.codeSnippet!, idx)}
                        className="flex items-center gap-1 text-xs text-[#60A5FA] hover:text-white cursor-pointer"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                            <span className="text-[#4ADE80]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Schema</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-[#60A5FA] text-xs leading-relaxed">{sec.codeSnippet}</pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#1E293B]">
          <span className="text-xs font-bold text-[#94A3B8]">Article Topics:</span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 rounded-full bg-[#0D1424] text-white text-xs border border-[#1E293B] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Detailed Card */}
        <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <OptimizedImage
            src={post.author.avatar}
            alt={post.author.name}
            widthParam={160}
            className="w-16 h-16 rounded-full object-cover border border-[#1E293B] shrink-0"
          />
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-[#60A5FA] uppercase tracking-widest">
              Written By Lead Author
            </span>
            <h4 className="text-lg font-bold text-white">{post.author.name}</h4>
            <p className="text-xs font-semibold text-[#94A3B8]">{post.author.role}</p>
            <p className="text-xs sm:text-sm text-[#94A3B8] pt-1 leading-relaxed">
              {post.author.bio || 'Growth Strategist and Performance Lead at MatricsMania.'}
            </p>
          </div>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#1E293B]">
            <h3 className="text-xl font-extrabold text-white">
              More Growth Intelligence Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => {
                const relSlug = getSlugFromTitle(rel.title);
                return (
                  <div
                    key={rel.id}
                    onClick={() => onNavigateToBlogSlug(relSlug)}
                    className="rounded-2xl bg-[#0D1424] border border-[#1E293B] overflow-hidden hover:border-[#2563EB]/40 transition-colors cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-40 overflow-hidden relative">
                        <OptimizedImage
                          src={rel.featuredImageUrl}
                          alt={rel.title}
                          widthParam={500}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#070B14]/80 text-white font-bold text-[10px] px-2.5 py-1 rounded-full z-10">
                          {rel.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#60A5FA] transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between text-xs font-semibold text-[#60A5FA]">
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 md:p-12 bg-[#0D1424] rounded-2xl text-white text-center space-y-5 border border-[#1E293B]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA] inline-block">
            Take Action On These Metrics
          </span>
          <h3 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight text-white">
            Want these growth metrics engineered for your business?
          </h3>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Our marketing leads will analyze your current search and paid channels and build a 100% custom growth roadmap for your team.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free Custom Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
