'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScrollReveal } from '../ScrollReveal';
import { Sparkles, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import { Insight } from '../../models';

export interface InsightsSectionProps {
  insights: Insight[];
  title?: string;
  subtitle?: string;
  onNavigate?: (path: string) => void;
  onNavigateToBlogSlug?: (slug: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  insights,
  title = 'Research Papers & Engineering Protocols',
  subtitle = 'In-depth publications on LLM answer engine optimization, zero-click search retrieval, and conversion velocity.',
  onNavigate,
  onNavigateToBlogSlug,
}) => {
  const router = useRouter();
  const handleNav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };
  if (!insights || insights.length === 0) return null;

  return (
    <section id="insights-section" className="py-20 sm:py-28 bg-[#050811] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold tracking-wider text-[#60A5FA] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              Research &amp; Intelligence
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              {subtitle}
            </p>
          </div>

          <button
            id="view-all-insights-btn"
            onClick={() => handleNav('/insights/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors group cursor-pointer"
          >
            <span>Explore Insights Repository</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.slice(0, 3).map((post, idx) => {
            const imgUrl = typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url;
            return (
              <ScrollReveal key={post.id} delay={idx * 0.08}>
                <div
                  id={`insight-card-${post.slug}`}
                  onClick={() => {
                    if (onNavigateToBlogSlug) onNavigateToBlogSlug(post.slug);
                    else handleNav(`/insights/${post.slug}/`);
                  }}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="space-y-4">
                    {imgUrl && (
                      <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-[#1E293B]">
                        <OptimizedImage
                          src={imgUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded bg-[#070B14]/85 backdrop-blur-md text-white border border-white/10">
                          {post.category}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '6 min read'}</span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                      {post.excerpt || post.standfirst}
                    </p>
                  </div>

                  <div className="border-t border-[#1E293B] pt-4 mt-6 flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
