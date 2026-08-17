import React from 'react';
import { PageType } from '../types';
import { ShieldCheck, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onNavigateToLocation?: (slug: string) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateToLocation }) => {
  const navLinks: { id: PageType; label: string }[] = [
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'locations', label: 'Locations' },
    { id: 'work', label: 'Work' },
    { id: 'insights', label: 'Insights' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const resourceLinks: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'process', label: 'Our Process' },
    { id: 'careers', label: 'Careers' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <footer className="bg-[#070B14] text-white border-t border-[#1E293B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size={35} />
            </button>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              MatricsMania is a performance-driven digital marketing agency. We engineer data-backed SEO architectures, scalable ad funnels, and real-time revenue attribution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources (/case-studies/, /process/, /careers/, /faq/) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors group w-full text-left cursor-pointer"
                  >
                    <span className="group-hover:text-[#60A5FA] transition-colors">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} MatricsMania Digital Marketing Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#94A3B8] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
