import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { X, Calendar, Clock, Bookmark, Share2, Sparkles, CheckCircle2, FileText, ArrowRight, Copy, Check, Quote, ListOrdered } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  onClose,
  onOpenBooking,
  onShowToast,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Link Copied!', 'Article link copied to clipboard.', 'info');
  };

  const handleBookmark = () => {
    onShowToast('Article Saved', 'Added to your reading list.', 'success');
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard?.writeText(code);
    setCopiedSnippetIndex(index);
    onShowToast('Code Copied!', 'JSON-LD Schema copied to clipboard.', 'success');
    setTimeout(() => setCopiedSnippetIndex(null), 3000);
  };

  // Find related articles in the same category or general
  const relatedPosts = BLOG_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl text-slate-900 dark:text-white overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
              {post.category}
            </span>
            {post.wordCount && (
              <span className="hidden sm:inline-flex text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {post.wordCount} words
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title="Bookmark article"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share article link"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 flex-1">
          {/* Article Header & Title */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
              "{post.excerpt}"
            </p>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{post.author.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 sm:h-80 md:h-96 w-full relative shadow-md">
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Executive Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Executive Strategy Takeaways</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents Quick Jump (if sections exist) */}
          {post.sections && post.sections.length > 0 && (
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <ListOrdered className="w-4 h-4 text-blue-500" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {post.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a href={`#sec-${sec.id}`} className="hover:underline flex items-center gap-2">
                      <span className="text-slate-400">0{idx + 1}.</span>
                      <span>{sec.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Core Overview */}
          <div className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {post.content}
          </div>

          {/* Render Deep Structured Sections */}
          {post.sections && post.sections.length > 0 && (
            <div className="space-y-10 pt-4">
              {post.sections.map((sec, idx) => (
                <div key={sec.id} id={`sec-${sec.id}`} className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                    {sec.title}
                  </h2>

                  <div className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </div>

                  {/* Optional Quote Box */}
                  {sec.quote && (
                    <div className="my-4 p-5 rounded-xl bg-slate-100 dark:bg-slate-800 border-l-4 border-purple-500 flex items-start gap-3 italic text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <Quote className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <div>"{sec.quote}"</div>
                    </div>
                  )}

                  {/* Optional Key Points Bullets */}
                  {sec.keyPoints && sec.keyPoints.length > 0 && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-200 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Key Implementation Rules:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {sec.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional Strategy Comparison Table */}
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

                  {/* Optional Code / Schema Snippet */}
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
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 self-center">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shrink-0"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Written By
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{post.author.name}</h4>
              <p className="text-xs text-blue-500 dark:text-blue-400 font-medium">{post.author.role}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                {post.author.bio || 'Growth Strategist and Performance Lead at Matricsmania.'}
              </p>
            </div>
          </div>

          {/* Bottom Article CTA */}
          <div className="p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white text-center space-y-4 shadow-xl">
            <h3 className="font-extrabold text-xl sm:text-2xl">Want these growth metrics for your business?</h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto">
              Our marketing leads can run a free, customized growth audit specifically tailored to your industry.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Request Free Custom Audit Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
