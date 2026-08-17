import React from 'react';
import { InsightItem, PageType } from '../types';
import { INSIGHTS_DATA } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';
import { OptimizedImage } from '../components/OptimizedImage';
import { ArrowLeft, ArrowRight, Download, Calendar, Clock, FileText, CheckCircle2, Share2, ShieldCheck, BarChart3, Building2 } from 'lucide-react';

interface SingleInsightPageProps {
  insight: InsightItem;
  onNavigate: (page: PageType) => void;
  onNavigateToInsightSlug: (slug: string) => void;
  onOpenBooking: () => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SingleInsightPage: React.FC<SingleInsightPageProps> = ({
  insight,
  onNavigate,
  onNavigateToInsightSlug,
  onOpenBooking,
  onShowToast,
}) => {
  const relatedInsights = INSIGHTS_DATA.filter((i) => i.id !== insight.id).slice(0, 2);

  const handleDownloadReport = () => {
    if (onShowToast) {
      onShowToast(
        'Downloading Research Whitepaper',
        `Preparing PDF export for "${insight.title}"...`,
        'success'
      );
    }
  };

  const handleShareReport = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) {
        onShowToast('Report Link Copied', 'URL copied to clipboard.', 'info');
      }
    }
  };

  return (
    <div className="bg-[#070B14] text-white pb-20 space-y-12">
      {/* HEADER & BREADCRUMBS */}
      <section className="pt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:underline cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('insights')}
            className="hover:underline cursor-pointer font-medium"
          >
            Insights
          </button>
          <span>/</span>
          <span className="text-white truncate max-w-[200px] sm:max-w-none">
            {insight.slug}
          </span>
        </div>

        <button
          onClick={() => onNavigate('insights')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#60A5FA] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights Directory (/insights)</span>
        </button>

        <ScrollReveal className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-[#0D1424] px-3 py-1 rounded-full border border-[#1E293B]">
              {insight.category}
            </span>
            <span className="text-xs text-[#94A3B8] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
              {insight.publishedAt}
            </span>
            <span className="text-xs text-[#94A3B8] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
              {insight.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {insight.title}
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            {insight.excerpt}
          </p>

          {/* Author info & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-[#1E293B] py-4">
            <div className="flex items-center gap-3">
              <OptimizedImage
                src={insight.author.avatar}
                alt={insight.author.name}
                widthParam={120}
                className="w-10 h-10 rounded-full object-cover border border-[#1E293B]"
              />
              <div>
                <p className="font-bold text-sm text-white">{insight.author.name}</p>
                <p className="text-xs text-[#94A3B8]">{insight.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShareReport}
                className="p-2.5 rounded-xl bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                title="Share Report"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Whitepaper</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* KEY METRICS GRID */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span>Key Benchmark Highlights</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {insight.keyMetrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] text-center">
                <p className="text-2xl font-extrabold text-[#60A5FA]">{m.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* EXECUTIVE SUMMARY BOX */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="p-6 md:p-8 rounded-2xl bg-[#0D1424] text-white border border-[#1E293B] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
            <span>Executive Summary & Research Takeaways</span>
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-[#94A3B8]">
            {insight.summaryPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* FEATURED IMAGE & DETAILED CONTENT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="rounded-2xl overflow-hidden h-72 sm:h-96 w-full border border-[#1E293B]">
          <OptimizedImage
            src={insight.featuredImageUrl}
            alt={insight.title}
            widthParam={1100}
            priority={true}
            className="w-full h-full object-cover"
          />
        </ScrollReveal>

        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-white leading-relaxed">
          <div className="whitespace-pre-line bg-[#0D1424] p-6 rounded-2xl border border-[#1E293B]">
            {insight.fullReportContent}
          </div>

          {insight.sections?.map((sec) => (
            <ScrollReveal key={sec.id} className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-white">
                {sec.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>

              {sec.dataPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  {sec.dataPoints.map((dp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B]">
                      <p className="text-xs text-[#94A3B8]">{dp.label}</p>
                      <p className="text-base font-extrabold text-[#60A5FA] mt-1">{dp.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {sec.table && (
                <div className="overflow-x-auto my-4 rounded-xl border border-[#1E293B]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#070B14] text-white font-bold">
                      <tr>
                        {sec.table.headers.map((h, i) => (
                          <th key={i} className="p-3 border-b border-[#1E293B]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {sec.table.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#070B14]">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-[#94A3B8]">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* RELATED INSIGHTS */}
      {relatedInsights.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8 border-t border-[#1E293B]">
          <h3 className="text-lg font-bold text-white">
            Related Market Intelligence Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedInsights.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateToInsightSlug(item.slug)}
                className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/40 transition-colors cursor-pointer space-y-3 group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#60A5FA] bg-[#070B14] px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <h4 className="font-bold text-base text-white group-hover:text-[#60A5FA]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#60A5FA]">
                  <span>Explore Insight (/insights/{item.slug})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#0D1424] text-white border border-[#1E293B] text-center space-y-4">
          <h3 className="text-2xl font-bold">Apply These Benchmarks to Your Brand Strategy</h3>
          <p className="text-xs text-[#94A3B8] max-w-lg mx-auto">
            Book a 30-minute growth session with our analytics directors to receive a custom performance audit.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book Growth Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
