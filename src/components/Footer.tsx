import React, { useState } from 'react';
import { PageType } from '../types';
import { Mail, Send, CheckCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    onShowToast('Subscribed!', 'You will receive our weekly growth insights.', 'success');
  };

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'blog', label: 'Marketing Blog' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size={42} textColor="text-white" />
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Matricsmania is a performance-driven digital marketing agency. We engineering data-backed SEO architectures, scalable ad funnels, and real-time revenue attribution.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Google Premier Partner & Meta Business Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> Matricsmania Growth Weekly
            </h4>
            <p className="text-xs text-slate-400">
              Get our exclusive algorithm updates, SEO teardowns, and high-ROAS creative templates delivered every Tuesday.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You’re subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter business email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Matricsmania Digital Marketing Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
