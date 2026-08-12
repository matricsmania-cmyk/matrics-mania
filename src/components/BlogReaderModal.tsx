import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, Bookmark, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

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
  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Link Copied!', 'Article URL copied to your clipboard.', 'info');
  };

  const handleBookmark = () => {
    onShowToast('Article Saved', 'Added to your bookmarked reading list.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Nav Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-900/90">
          <span className="text-xs font-bold bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">
            {post.category}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title="Bookmark article"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share article link"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Header & Title */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h2>

            {/* Author info & Metadata */}
            <div className="flex items-center gap-3 pt-2 border-b border-slate-800 pb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div className="text-xs">
                <p className="font-bold text-white">{post.author.name}</p>
                <p className="text-slate-400">{post.author.role}</p>
              </div>
              <div className="ml-auto text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden border border-slate-800 h-64 md:h-80 w-full relative">
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Highlight Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-5 bg-gradient-to-r from-blue-950/50 to-indigo-950/50 rounded-xl border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Key Executive Takeaways
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Article CTA */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-3">
            <h4 className="font-bold text-base text-white">Ready to apply these metrics to your brand?</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our marketing leads can build a customized growth blueprint specifically tailored to your industry.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Book Growth Audit Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
