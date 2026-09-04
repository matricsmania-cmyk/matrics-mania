'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useContentProvider } from '../providers/ContentContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  AuthorCardSection,
  ConversionCTASection,
} from '../components/sections';
import { InternalLinkingGraph } from '../components/InternalLinkingGraph';
import { getInsightContextualLinks } from '../utils/internalLinking';
import { Insight, InsightSection } from '../models';
import { NotFoundState } from '../components/ErrorStates';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  Quote,
  Layers,
  ChevronRight,
  Sparkles,
  BookOpen,
  FileText,
  BarChart3,
  Code2,
  Compass,
  Building2,
  MapPin,
  ExternalLink,
  Linkedin,
  Twitter,
  ChevronDown,
  CheckCheck,
  ListOrdered,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface InsightTemplateProps {
  insight?: Insight;
  slug?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const InsightTemplate: React.FC<InsightTemplateProps> = ({
  insight: propInsight,
  slug,
  onNavigate: propNavigate,
  onOpenBooking: propBooking,
  onShowToast,
}) => {
  const router = useRouter();
  const onNavigate = propNavigate;
  const onOpenBooking = propBooking;
  const provider = useContentProvider();
  const post =
    propInsight ||
    (slug ? provider.getInsightBySlug(slug) : null);

  const allPosts = provider.getAllInsights();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Calculate reading progress and active section tracker
  useEffect(() => {
    if (!post) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(Math.round(progress));
      }

      // Check sections on screen
      if (post?.sections && post.sections.length > 0) {
        for (let i = post.sections.length - 1; i >= 0; i--) {
          const sec = post.sections[i];
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSectionId(sec.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  if (!post) {
    return (
      <NotFoundState
        attemptedPath={slug ? `/insights/${slug}/` : '/insights/'}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const handleShare = () => {
    const url = `https://matricsmania.com/insights/${post.slug}/`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      if (onShowToast) {
        onShowToast('Link Copied!', 'Article URL copied to your clipboard.', 'info');
      }
    }
  };

  const handleCopyCode = (snippet: string, snippetId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopiedSnippetId(snippetId);
      setTimeout(() => setCopiedSnippetId(null), 2000);
      if (onShowToast) {
        onShowToast('Code Copied!', 'Snippet copied to your clipboard.', 'info');
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveSectionId(sectionId);
      setIsMobileTocOpen(false);
    }
  };

  const canonicalUrl = `https://matricsmania.com/insights/${post.slug}/`;
  const readingTime = post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '8 min read';
  const wordCountFormatted = post.wordCount ? `${post.wordCount.toLocaleString()} words` : '2,200 words';
  const imgUrl = typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url;
  const authorAvatar = typeof post.author?.avatar === 'string' ? post.author.avatar : post.author?.avatar?.url;

  const formattedPublishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedUpdateDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  // Contextual Interconnected Relationships
  const contextualLinks = useMemo(
    () => getInsightContextualLinks(post, provider),
    [post, provider]
  );

  // Find related posts for recommendations
  const relatedInsights = contextualLinks.relatedInsights.length > 0
    ? contextualLinks.relatedInsights.slice(0, 3)
    : allPosts.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        url: `/insights/${p.slug}/`,
        excerpt: p.excerpt || p.standfirst,
        category: p.category,
      }));

  return (
    <div className="bg-[#050811] text-[#E2E8F0] min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        seo={post.seo}
        entity={post}
        pageType="insight"
      />

      {/* Reading Progress Top Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#0D1424] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Top Sticky Header */}
      <div className="border-b border-[#1E293B] bg-[#070B14]/90 backdrop-blur-md sticky top-16 z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/insights/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Insights Hub</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 text-xs font-mono text-[#CBD5E1] transition-all cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span className="hidden sm:inline">Share Paper</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Main Editorial Column (8 Cols) */}
          <article className="lg:col-span-8 space-y-10">
            
            {/* Header / Meta Block */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30 uppercase font-semibold">
                  {post.category}
                </span>
                {post.contentType && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0D1424] text-[#94A3B8] border border-[#1E293B]">
                    {post.contentType}
                  </span>
                )}
                <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} ({wordCountFormatted})
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Standfirst / Executive Summary Callout */}
              {post.standfirst && (
                <div className="p-6 rounded-2xl bg-[#0D1424] border-l-4 border-[#2563EB] text-base sm:text-lg text-[#CBD5E1] font-medium leading-relaxed shadow-lg">
                  {post.standfirst}
                </div>
              )}

              {/* Author & Reviewer Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
                <div className="flex items-center gap-3">
                  {authorAvatar && (
                    <OptimizedImage
                      src={authorAvatar}
                      alt={post.author?.name || 'Author'}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#2563EB]/40"
                    />
                  )}
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{post.author?.name || 'Arjun V. Nair'}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                    </div>
                    <div className="text-xs font-mono text-[#60A5FA]">
                      {post.author?.role || 'Principal Growth Architect'}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#64748B] space-y-0.5 sm:text-right">
                  <div>Published: <span className="text-[#CBD5E1]">{formattedPublishDate}</span></div>
                  {formattedUpdateDate && (
                    <div>Updated: <span className="text-[#60A5FA]">{formattedUpdateDate}</span></div>
                  )}
                </div>
              </div>

              {/* Reviewer Note if available */}
              {post.reviewer && (
                <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] text-xs font-mono text-[#94A3B8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Peer-reviewed for technical accuracy by <strong className="text-white">{post.reviewer.name}</strong> ({post.reviewer.role})</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {imgUrl && (
              <div className="relative h-64 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-[#1E293B] shadow-2xl">
                <OptimizedImage
                  src={imgUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/40 to-transparent text-xs text-[#94A3B8] font-mono">
                  MatricsMania Research Intelligence • Empirical Telemetry Visualizer
                </div>
              </div>
            )}

            {/* Executive Key Takeaways Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                  Executive Research Takeaways
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#CBD5E1] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile Table of Contents Accordion */}
            {post.sections && post.sections.length > 0 && (
              <div className="lg:hidden p-4 rounded-2xl bg-[#0D1424] border border-[#1E293B]">
                <button
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="w-full flex items-center justify-between text-xs font-mono text-[#60A5FA] uppercase font-bold"
                >
                  <span className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-[#3B82F6]" />
                    Table of Contents ({post.sections.length} Sections)
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileTocOpen && (
                  <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2">
                    {post.sections.map((sec, sIdx) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left p-2 rounded-lg text-xs font-mono transition-colors ${
                          activeSectionId === sec.id
                            ? 'bg-[#2563EB] text-white font-bold'
                            : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                        }`}
                      >
                        {sec.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Article Primary Content Body */}
            {post.content && (
              <div className="prose prose-invert prose-blue max-w-none text-[#CBD5E1] text-sm sm:text-base leading-relaxed space-y-6">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            )}

            {/* Structured Empirical Sections (Decoupled Presentation Layer) */}
            {post.sections && post.sections.length > 0 && (
              <div className="space-y-12 pt-6">
                {post.sections.map((section, sIdx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="space-y-5 pt-6 border-t border-[#1E293B] scroll-mt-28"
                  >
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p className="text-sm font-mono text-[#60A5FA]">
                          {section.subtitle}
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {section.content}
                    </p>

                    {/* Section Key Points */}
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <div className="p-5 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-2.5">
                        <span className="text-xs font-mono text-[#60A5FA] uppercase font-bold">Key Architectural Directives:</span>
                        <ul className="space-y-2">
                          {section.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-2" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Section Quote / Callout */}
                    {section.quote && (
                      <div className="p-6 rounded-2xl bg-[#0D1424] border-l-4 border-[#3B82F6] text-sm sm:text-base italic text-[#E2E8F0] space-y-2">
                        <Quote className="w-5 h-5 text-[#3B82F6]" />
                        <p>"{section.quote}"</p>
                      </div>
                    )}

                    {/* Code Snippet with Copy Button */}
                    {section.codeSnippet && (
                      <div className="rounded-2xl bg-[#070B14] border border-[#1E293B] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1424] border-b border-[#1E293B] text-xs font-mono text-[#94A3B8]">
                          <span className="flex items-center gap-2">
                            <Code2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                            {section.codeLanguage || 'json'}
                          </span>
                          <button
                            onClick={() => handleCopyCode(section.codeSnippet!, section.id)}
                            className="flex items-center gap-1 text-xs text-[#60A5FA] hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedSnippetId === section.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-[#CBD5E1] overflow-x-auto leading-relaxed">
                          <code>{section.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Data Table */}
                    {section.table && (
                      <div className="overflow-x-auto rounded-2xl border border-[#1E293B] bg-[#0D1424]">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#070B14] text-[#60A5FA] font-mono border-b border-[#1E293B]">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3.5 sm:p-4 font-semibold">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1E293B] text-[#CBD5E1]">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#1E293B]/40 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3.5 sm:p-4 font-mono text-xs">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Architecture Diagram / Step Workflow */}
                    {section.diagram && (
                      <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
                        <div className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
                          {section.diagram.title}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {section.diagram.items.map((item, dIdx) => (
                            <div key={dIdx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                              <span className="text-xs font-mono font-bold text-white block">{item.label}</span>
                              <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            {/* Original Study Data Visualization Box */}
            {post.originalStudyData && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#60A5FA] uppercase font-bold flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
                      Empirical Study Telemetry
                    </span>
                    <h3 className="text-lg font-bold text-white">Dataset Verification &amp; Methodology</h3>
                  </div>
                  <div className="text-xs font-mono text-[#64748B]">
                    Timeframe: <span className="text-[#CBD5E1]">{post.originalStudyData.timeframe}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#94A3B8]">
                  <strong className="text-white">Sample Size:</strong> {post.originalStudyData.sampleSize} • <strong className="text-white">Methodology:</strong> {post.originalStudyData.methodology}
                </div>

                {post.originalStudyData.stats && post.originalStudyData.stats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {post.originalStudyData.stats.map((st, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-2xl bg-[#070B14] border border-[#1E293B] space-y-1.5">
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#60A5FA] font-mono">
                          {st.value}
                        </div>
                        <div className="text-xs font-bold text-white">{st.label}</div>
                        {st.note && <div className="text-[11px] text-[#64748B]">{st.note}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tags List */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-[#1E293B] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#64748B]">Document Taxonomy:</span>
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#94A3B8]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Comprehensive Author Profile Card */}
            {post.author && (
              <div className="pt-8 border-t border-[#1E293B]">
                <AuthorCardSection
                  author={post.author}
                  readingTime={readingTime}
                  publishedDate={formattedPublishDate}
                />
              </div>
            )}
          </article>

          {/* Right Column: Sticky Table of Contents & Quick Conversion Rail (4 Cols) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              
              {/* Interactive TOC Card */}
              {post.sections && post.sections.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-[#60A5FA] uppercase font-bold border-b border-[#1E293B] pb-3">
                    <span className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-[#3B82F6]" />
                      Table of Contents
                    </span>
                    <span>{readingProgress}% read</span>
                  </div>

                  <nav className="space-y-1.5">
                    {post.sections.map((sec, idx) => {
                      const isActive = activeSectionId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-start gap-2 cursor-pointer ${
                            isActive
                              ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-blue-500/20'
                              : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                          }`}
                        >
                          <span className="text-[10px] opacity-70 mt-0.5">0{idx + 1}</span>
                          <span className="line-clamp-1">{sec.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Direct Architect Consultation Card */}
              <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="text-xs font-mono text-[#60A5FA] uppercase font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Direct Consultation
                </div>
                <h3 className="text-sm font-bold text-white">
                  Apply These Findings to Your Web Architecture
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Book a 30-minute diagnostic session with our Principal Architects to audit your log files, schema graphs, and telemetry pipeline.
                </p>
                <button
                  onClick={() => onOpenBooking({ interest: `Diagnostic follow-up: ${post.title}` })}
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono font-bold text-white transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  Schedule Diagnostic Session
                </button>
              </div>

              {/* Related Services / Industries shortcuts */}
              {post.relationships?.services && post.relationships.services.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                  <div className="text-xs font-mono text-[#60A5FA] uppercase font-bold border-b border-[#1E293B] pb-2">
                    Relevant Disciplines
                  </div>
                  <div className="space-y-2">
                    {post.relationships.services.slice(0, 2).map((srv) => (
                      <a
                        key={srv.id}
                        href={srv.url || `/services/${srv.slug}/`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(srv.url || `/services/${srv.slug}/`);
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-[#070B14] hover:bg-[#1E293B] border border-[#1E293B] text-xs text-[#CBD5E1] hover:text-white flex items-center justify-between group cursor-pointer no-underline block"
                      >
                        <span className="line-clamp-1">{srv.title}</span>
                        <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:text-[#60A5FA] shrink-0 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Relational Knowledge Graph (Services, Industries, Locations, Case Studies, Related Insights) */}
      <InternalLinkingGraph
        title="Interconnected Growth Taxonomy"
        subtitle="Explore cross-domain engineering services, industry playbooks, regional operating hubs, and empirical case studies related to this research."
        badge="Contextual Architecture"
        services={contextualLinks.services}
        industries={contextualLinks.industries}
        locations={contextualLinks.locations}
        caseStudies={contextualLinks.caseStudies}
        insights={contextualLinks.relatedInsights}
        onNavigate={onNavigate}
      />

      {/* Recommended Further Reading */}
      {relatedInsights.length > 0 && (
        <section className="py-16 bg-[#070B14] border-t border-b border-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#60A5FA] uppercase tracking-wider">
                  Further Reading
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Related Research &amp; Protocols
                </h2>
              </div>
              <a
                href="/insights/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/insights/');
                }}
                className="text-xs font-mono text-[#60A5FA] hover:underline cursor-pointer"
              >
                View Repository →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInsights.map((other) => (
                <a
                  key={other.id}
                  href={`/insights/${other.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/insights/${other.slug}/`);
                  }}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 transition-all cursor-pointer flex flex-col justify-between h-full group no-underline block"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14] text-[#60A5FA] border border-[#1E293B]">
                      {other.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                      {other.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                  <div className="border-t border-[#1E293B] pt-3 mt-4 flex items-center justify-between text-xs font-mono text-[#60A5FA]">
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* High-Intent Conversion CTA */}
      <ConversionCTASection
        title="Ready to Implement These Findings in Your Architecture?"
        subtitle="Schedule a 30-minute diagnostic session with the author and principal architects to audit your crawl telemetry and search graph visibility."
        onOpenBooking={onOpenBooking}
        prefill={{ interest: `Research follow-up: ${post.title}` }}
      />
    </div>
  );
};
