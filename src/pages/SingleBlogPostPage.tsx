import React, { useState, useEffect } from 'react';
import { BlogPost, PageType } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { getSlugFromTitle } from '../utils/slug';
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
  ChevronRight,
  User
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

  // Scroll to top whenever the post changes
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

  // Find related articles (excluding current article)
  const relatedPosts = BLOG_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 pb-24 animate-fade-in">
      {/* Top Header Navigation & Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </button>

            <button
              onClick={handleBookmark}
              title="Bookmark Article"
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share Link"
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
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
            <span className="text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3.5 py-1 rounded-full border border-blue-500/20">
              {post.category}
            </span>
            {post.wordCount && (
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {post.wordCount} words
              </span>
            )}
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              {post.readTime}
            </span>
          </div>

          {/* Main Article H1 Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Sub-headline / Excerpt */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
            "{post.excerpt}"
          </p>

          {/* Author info bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{post.author.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                Published {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 sm:h-96 md:h-[450px] w-full relative shadow-xl">
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="py-4 space-y-3 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 animate-pulse text-blue-500" />
              <span>Executive Strategy Summary</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {post.sections && post.sections.length > 0 && (
          <div className="py-4 space-y-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <ListOrdered className="w-4 h-4 text-blue-500" />
              <span>Table of Contents</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold">
              {post.sections.map((sec, idx) => (
                <li key={idx}>
                  <a href={`#sec-${sec.id}`} className="hover:underline flex items-center gap-2">
                    <span className="text-slate-400 font-normal">0{idx + 1}.</span>
                    <span>{sec.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core Introductory Text */}
        <div className="space-y-4 text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Render Deep Structured Sections */}
        {post.sections && post.sections.length > 0 && (
          <div className="space-y-12">
            {post.sections.map((sec, idx) => (
              <section
                key={sec.id}
                id={`sec-${sec.id}`}
                className="space-y-5 scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {sec.title}
                </h2>

                <div className="text-slate-800 dark:text-slate-200 text-base leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {/* Optional Quote Box */}
                {sec.quote && (
                  <div className="my-4 p-5 rounded-xl bg-purple-500/10 border-l-4 border-purple-500 flex items-start gap-3 italic text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <Quote className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <div>"{sec.quote}"</div>
                  </div>
                )}

                {/* Key Points */}
                {sec.keyPoints && sec.keyPoints.length > 0 && (
                  <div className="p-5 rounded-xl space-y-3 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Key Execution Principles:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {sec.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Table Comparison */}
                {sec.table && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {sec.table.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
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
                  <div className="relative rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        JSON-LD Schema Snippet
                      </span>
                      <button
                        onClick={() => handleCopyCode(sec.codeSnippet!, idx)}
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-white cursor-pointer"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Schema</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-emerald-400 text-xs leading-relaxed">{sec.codeSnippet}</pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Article Topics:</span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Detailed Card */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shrink-0 shadow-md"
          />
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Written By Lead Author
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{post.author.name}</h4>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{post.author.role}</p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
              {post.author.bio || 'Growth Strategist and Performance Lead at Matricsmania.'}
            </p>
          </div>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              More Growth Intelligence Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => {
                const relSlug = getSlugFromTitle(rel.title);
                return (
                  <div
                    key={rel.id}
                    onClick={() => onNavigateToBlogSlug(relSlug)}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={rel.featuredImageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                          {rel.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
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
        <div className="p-8 md:p-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white text-center space-y-5 shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3.5 py-1 rounded-full inline-block">
            Take Action On These Metrics
          </span>
          <h3 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
            Want these growth metrics engineered for your business?
          </h3>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Our marketing leads will analyze your current search and paid channels and build a 100% custom growth roadmap for your team.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-white text-blue-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
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
