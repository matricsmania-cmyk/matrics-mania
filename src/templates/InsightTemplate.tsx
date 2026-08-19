import React, { useState } from 'react';
import { getInsightBySlug, getAllInsights } from '../data/contentStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEOHead } from '../components/SEOHead';
import { OptimizedImage } from '../components/OptimizedImage';
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
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

interface InsightTemplateProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const InsightTemplate: React.FC<InsightTemplateProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  const post = getInsightBySlug(slug) || getAllInsights()[0];
  const allPosts = getAllInsights();
  const [copiedUrl, setCopiedUrl] = useState(false);

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

  const canonicalUrl = `https://matricsmania.com/insights/${post.slug}/`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt || post.standfirst,
    image: post.featuredImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MatricsMania',
      url: 'https://matricsmania.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://matricsmania.com/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="bg-[#050811] text-[#E2E8F0] min-h-screen selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <SEOHead
        title={`${post.title} | MatricsMania Insights`}
        description={post.excerpt || post.standfirst}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={post.featuredImageUrl}
        schema={schemaData}
      />

      {/* Sticky Breadcrumb Bar */}
      <div className="sticky top-16 z-30 bg-[#070B14]/90 backdrop-blur-md border-b border-[#1E293B] py-3 text-xs font-mono">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#94A3B8] truncate">
            <button
              onClick={() => onNavigate('/insights/')}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Insights
            </button>
            <ChevronRight className="w-3 h-3 text-[#64748B]" />
            <span className="text-[#60A5FA] truncate">{post.category}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0D1424] border border-[#1E293B] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white transition-colors"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[#10B981]">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <header className="pt-12 pb-10 border-b border-[#1E293B] bg-[#070B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#0D1424] border border-[#1E293B] text-[11px] font-mono font-semibold text-[#60A5FA] uppercase">
              {post.category}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#1E293B]/60 text-[11px] font-mono text-[#94A3B8]">
              {post.contentType}
            </span>
            <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed">
            {post.standfirst}
          </p>

          {/* Author Block */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#1E293B]">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-[#1E293B]"
            />
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {post.author.name}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                  VERIFIED AUTHOR
                </span>
              </div>
              <div className="text-xs text-[#94A3B8]">{post.author.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY & SECTIONS */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="rounded-2xl overflow-hidden border border-[#1E293B]">
            <OptimizedImage
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full max-h-[440px] object-cover"
            />
          </div>
        )}

        {/* Executive Summary / Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
              Executive Summary & Key Takeaways
            </div>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#E2E8F0] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Primary Intro Content */}
        <div className="prose prose-invert max-w-none text-base sm:text-lg leading-relaxed text-[#CBD5E1] space-y-6">
          {post.content.split('\n\n').map((para, pIdx) => {
            if (!para.trim()) return null;
            return <p key={pIdx}>{para.trim()}</p>;
          })}
        </div>

        {/* Detailed Sections */}
        {post.sections && post.sections.map((sec, idx) => (
          <section key={idx} id={sec.id} className="pt-8 border-t border-[#1E293B] space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {sec.title}
              </h2>
              {sec.subtitle && (
                <p className="text-sm font-mono text-[#60A5FA]">{sec.subtitle}</p>
              )}
            </div>

            <div className="prose prose-invert max-w-none text-base leading-relaxed text-[#CBD5E1] space-y-4">
              {sec.content.split('\n\n').map((p, pIdx) => {
                if (!p.trim()) return null;
                return <p key={pIdx}>{p.trim()}</p>;
              })}
            </div>

            {/* Section Quote */}
            {sec.quote && (
              <div className="p-6 rounded-xl bg-[#0D1424] border-l-4 border-[#2563EB] text-[#E2E8F0] italic text-base sm:text-lg">
                "{sec.quote}"
              </div>
            )}

            {/* Section Key Points */}
            {sec.keyPoints && sec.keyPoints.length > 0 && (
              <div className="p-5 rounded-xl bg-[#0D1424] border border-[#1E293B] space-y-3">
                <div className="text-xs font-mono text-[#94A3B8] uppercase font-bold">Key Observations:</div>
                <div className="space-y-2">
                  {sec.keyPoints.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E2E8F0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section Table */}
            {sec.table && (
              <div className="overflow-x-auto rounded-xl border border-[#1E293B]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0D1424] text-[#60A5FA] border-b border-[#1E293B]">
                    <tr>
                      {sec.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B] bg-[#070B14]">
                    {sec.table.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#0D1424]/50">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-[#94A3B8]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* Dynamic In-Context CTA Block */}
        {post.ctaContext && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0D1424] to-[#131D33] border border-[#2563EB]/40 space-y-4 my-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {post.ctaContext.headline}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {post.ctaContext.subheadline}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate(`/services/${post.ctaContext?.serviceSlug || 'technical-seo'}/`)}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs font-mono transition-all shadow-lg inline-flex items-center gap-2"
              >
                {post.ctaContext.buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-[#1E293B] space-y-6">
            <h3 className="text-xl font-bold text-white">Further Research & Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  onClick={() => onNavigate(`/insights/${rPost.slug}/`)}
                  className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#60A5FA]/40 cursor-pointer space-y-3 transition-colors"
                >
                  <div className="text-xs font-mono text-[#60A5FA]">{rPost.category}</div>
                  <h4 className="text-base font-bold text-white">{rPost.title}</h4>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{rPost.standfirst}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
