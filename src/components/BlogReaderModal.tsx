'use client';

import React, { useState } from 'react';
import { BlogPost } from '../types';
import { OptimizedImage } from './OptimizedImage';
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

  const relatedPosts = BLOG_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#171717]/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#FCFBF8] dark:bg-[#21201D] border border-[#D9D4CA] dark:border-[#38352F] rounded-2xl shadow-2xl text-[#171717] dark:text-[#F7F5F0] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#D9D4CA] dark:border-[#38352F] bg-[#FCFBF8]/95 dark:bg-[#21201D]/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#E9E5DC] dark:bg-[#2B2925] text-[#8C7343] dark:text-[#C7B082] px-3 py-1 rounded-full border border-[#D9D4CA] dark:border-[#38352F]">
              {post.category}
            </span>
            {post.wordCount && (
              <span className="hidden sm:inline-flex text-[11px] font-semibold text-[#68645D] dark:text-[#BDB7AA] bg-[#F7F5F0] dark:bg-[#171717] border border-[#D9D4CA] dark:border-[#38352F] px-2.5 py-0.5 rounded-full">
                {post.wordCount} words
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title="Bookmark article"
              className="p-2 rounded-lg text-[#68645D] dark:text-[#BDB7AA] hover:text-[#171717] dark:hover:text-[#F7F5F0] hover:bg-[#E9E5DC] dark:hover:bg-[#2B2925] transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share article link"
              className="p-2 rounded-lg text-[#68645D] dark:text-[#BDB7AA] hover:text-[#171717] dark:hover:text-[#F7F5F0] hover:bg-[#E9E5DC] dark:hover:bg-[#2B2925] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#68645D] dark:text-[#BDB7AA] hover:text-[#171717] dark:hover:text-[#F7F5F0] hover:bg-[#E9E5DC] dark:hover:bg-[#2B2925] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 flex-1">
          {/* Article Header & Title */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] dark:text-[#F7F5F0] tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-sm md:text-base text-[#68645D] dark:text-[#BDB7AA] font-medium leading-relaxed italic border-l-4 border-[#B39A6B] pl-4 py-1">
              "{post.excerpt}"
            </p>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-[#D9D4CA] dark:border-[#38352F] pb-4 text-xs text-[#68645D] dark:text-[#BDB7AA]">
              <div className="flex items-center gap-3">
                <OptimizedImage
                  src={post.author.avatar}
                  alt={post.author.name}
                  widthParam={120}
                  className="w-11 h-11 rounded-full object-cover border border-[#D9D4CA] dark:border-[#38352F]"
                />
                <div>
                  <p className="font-bold text-[#171717] dark:text-[#F7F5F0] text-sm">{post.author.name}</p>
                  <p className="text-xs text-[#68645D] dark:text-[#BDB7AA]">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B39A6B]" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#B39A6B]" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-[#D9D4CA] dark:border-[#38352F] h-64 sm:h-80 md:h-96 w-full relative">
            <OptimizedImage
              src={post.featuredImageUrl}
              alt={post.title}
              widthParam={900}
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Executive Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-6 bg-[#F7F5F0] dark:bg-[#171717] rounded-2xl border border-[#D9D4CA] dark:border-[#38352F] space-y-4">
              <div className="flex items-center gap-2 text-[#8C7343] dark:text-[#C7B082] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#B39A6B]" />
                <span>Executive Strategy Takeaways</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#171717] dark:text-[#F7F5F0]">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents */}
          {post.sections && post.sections.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#F7F5F0] dark:bg-[#171717] border border-[#D9D4CA] dark:border-[#38352F] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#F7F5F0]">
                <ListOrdered className="w-4 h-4 text-[#B39A6B]" />
                <span>Article Table of Contents</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#8C7343] dark:text-[#C7B082] font-medium">
                {post.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a href={`#modal-sec-${sec.id}`} className="hover:underline flex items-center gap-2">
                      <span className="text-[#68645D] dark:text-[#BDB7AA] font-normal">0{idx + 1}.</span>
                      <span>{sec.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Content */}
          <div className="space-y-4 text-[#171717] dark:text-[#F7F5F0] text-sm md:text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* Structured Deep Sections */}
          {post.sections && post.sections.length > 0 && (
            <div className="space-y-10 pt-4">
              {post.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  id={`modal-sec-${sec.id}`}
                  className="space-y-4 scroll-mt-6 pt-6 border-t border-[#D9D4CA] dark:border-[#38352F]"
                >
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#171717] dark:text-[#F7F5F0]">
                    {sec.title}
                  </h3>

                  <div className="text-[#171717] dark:text-[#F7F5F0] text-sm leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </div>

                  {sec.quote && (
                    <div className="my-3 p-4 rounded-xl bg-[#E9E5DC] dark:bg-[#2B2925] border-l-4 border-[#B39A6B] flex items-start gap-3 italic text-xs sm:text-sm text-[#171717] dark:text-[#F7F5F0]">
                      <Quote className="w-5 h-5 text-[#B39A6B] shrink-0" />
                      <div>"{sec.quote}"</div>
                    </div>
                  )}

                  {sec.keyPoints && sec.keyPoints.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#171717] border border-[#D9D4CA] dark:border-[#38352F] space-y-2">
                      <p className="text-xs font-bold text-[#171717] dark:text-[#F7F5F0] uppercase tracking-wider">
                        Key Principles:
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#68645D] dark:text-[#BDB7AA]">
                        {sec.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B39A6B] shrink-0 mt-1.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sec.codeSnippet && (
                    <div className="relative rounded-xl bg-[#171717] text-[#F7F5F0] p-4 font-mono text-xs overflow-x-auto border border-[#38352F] space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#BDB7AA] pb-2 border-b border-[#38352F]">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#B39A6B]" />
                          Schema & Script
                        </span>
                        <button
                          onClick={() => handleCopyCode(sec.codeSnippet!, idx)}
                          className="flex items-center gap-1 text-xs text-[#B39A6B] hover:text-[#F7F5F0] cursor-pointer"
                        >
                          {copiedSnippetIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                              <span className="text-[#4ADE80]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[#B39A6B] text-xs leading-relaxed">{sec.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#D9D4CA] dark:border-[#38352F]">
            <span className="text-xs font-bold text-[#68645D] dark:text-[#BDB7AA]">Topics:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-[#E9E5DC] dark:bg-[#2B2925] text-[#171717] dark:text-[#F7F5F0] text-xs border border-[#D9D4CA] dark:border-[#38352F]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card */}
          <div className="p-5 rounded-2xl bg-[#F7F5F0] dark:bg-[#171717] border border-[#D9D4CA] dark:border-[#38352F] flex items-center gap-4">
            <OptimizedImage
              src={post.author.avatar}
              alt={post.author.name}
              widthParam={140}
              className="w-14 h-14 rounded-full object-cover border border-[#D9D4CA] dark:border-[#38352F]"
            />
            <div>
              <h4 className="font-bold text-sm text-[#171717] dark:text-[#F7F5F0]">{post.author.name}</h4>
              <p className="text-xs text-[#8C7343] dark:text-[#C7B082]">{post.author.role}</p>
              <p className="text-xs text-[#68645D] dark:text-[#BDB7AA] mt-1">{post.author.bio}</p>
            </div>
          </div>

          {/* Bottom Call to Action (#171717 Obsidian Impact Section) */}
          <div className="p-6 md:p-8 bg-[#171717] rounded-2xl text-[#F7F5F0] text-center space-y-4 border border-[#38352F]">
            <h3 className="font-extrabold text-xl md:text-2xl text-[#F7F5F0]">
              Want these metrics engineered for your brand?
            </h3>
            <p className="text-xs md:text-sm text-[#BDB7AA] max-w-lg mx-auto">
              Our marketing engineering team will analyze your funnel and build a 100% custom growth plan.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-3 rounded-xl bg-[#B39A6B] hover:bg-[#9E8557] text-[#171717] font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
