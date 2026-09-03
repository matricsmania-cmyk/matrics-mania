'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { NAVIGATION_CONFIG } from '../data/navigationConfig';
import { Container } from '../design-system/primitives/Container';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !href.startsWith('http')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }
  };

  // Curated lists of key links for a clean, minimal footer
  const serviceLinks = NAVIGATION_CONFIG.footer.solutions.slice(0, 5);
  const industryLinks = NAVIGATION_CONFIG.footer.industries.slice(0, 5);
  const companyLinks = NAVIGATION_CONFIG.footer.company.slice(0, 5);
  const resourceLinks = [
    { id: 'res-insights', label: 'Research & Insights', href: '/insights/' },
    { id: 'res-faq', label: 'FAQ', href: '/faq/' },
    { id: 'res-privacy', label: 'Privacy Policy', href: '/faq/' },
    { id: 'res-terms', label: 'Terms of Service', href: '/faq/' },
  ];

  return (
    <footer
      id="site-footer"
      className="bg-[#05080F] border-t border-[#1E293B] text-slate-400 py-12 lg:py-16 text-sm"
      role="contentinfo"
    >
      <Container maxWidth="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#1E293B]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              id="footer-brand-link"
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-block transition-opacity hover:opacity-85"
            >
              <Logo size={32} showText={true} />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Engineering-led growth marketing, algorithmic search infrastructure, and predictive revenue systems.
            </p>
            <div className="pt-2 flex flex-col gap-2.5 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-400">All systems operational</span>
              </div>
              <a
                id="footer-email-contact"
                href="mailto:growth@matricsmania.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                growth@matricsmania.com
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Services */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      id={`footer-service-${link.id}`}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Industries
              </h4>
              <ul className="space-y-2.5">
                {industryLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      id={`footer-industry-${link.id}`}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      id={`footer-company-${link.id}`}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Legal */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      id={`footer-resource-${link.id}`}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} MatricsMania. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              id="footer-bottom-privacy"
              href="/faq/"
              onClick={(e) => handleLinkClick(e, '/faq/')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy
            </a>
            <a
              id="footer-bottom-terms"
              href="/faq/"
              onClick={(e) => handleLinkClick(e, '/faq/')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms
            </a>
            {onOpenBooking ? (
              <button
                id="footer-book-audit-btn"
                type="button"
                onClick={() => onOpenBooking({ intent: 'Footer Quick Book' })}
                className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors flex items-center gap-1 font-sans"
              >
                <span>Book an Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                id="footer-book-audit-link"
                href="/contact/"
                onClick={(e) => handleLinkClick(e, '/contact/')}
                className="text-[#60A5FA] hover:text-[#93C5FD] transition-colors flex items-center gap-1 font-sans"
              >
                <span>Book an Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
