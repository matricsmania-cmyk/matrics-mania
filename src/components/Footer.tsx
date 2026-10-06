'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from '../design-system/primitives/Container';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  showIntelBanner?: boolean;
}

interface QuickLinkItem {
  id: string;
  label: string;
  href: string;
  targetId?: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  { id: 'service-section', label: 'Service section', href: '/services/', targetId: 'core-services-section' },
  { id: 'case-studies-section', label: 'Case studies section', href: '/case-studies/', targetId: 'case-study-evidence-section' },
  { id: 'industries-section', label: 'Industries', href: '/industries/', targetId: 'industries-served-section' },
  { id: 'locations-section', label: 'Locations', href: '/locations/' },
  { id: 'privacy-policy', label: 'Privacy policy', href: '/privacy/' },
  { id: 'about-section', label: 'About section', href: '/about/' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '' || !pathname;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: QuickLinkItem) => {
    e.preventDefault();
    if (isHome && item.targetId) {
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (onNavigate) {
      onNavigate(item.href);
    } else if (typeof window !== 'undefined') {
      window.location.href = item.href;
    }
  };

  return (
    <footer
      className="bg-[#05080F] border-t border-[#1E293B] text-white py-12 sm:py-16"
      role="contentinfo"
    >
      <Container maxWidth="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#1E293B]">
          {/* Brand & Agency Mission */}
          <div className="lg:col-span-6 space-y-4">
            <Logo />
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Your digital marketing partner for smarter strategies and bigger growth. Helping businesses grow with SEO, PPC, social media, content, and data-driven strategies.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Mail className="w-4 h-4 text-[#60A5FA]" />
              <span>Contact:</span>
              <a
                href="mailto:info@matricsmania.com"
                className="text-white hover:text-[#60A5FA] underline decoration-[#1E293B] hover:decoration-[#60A5FA] transition-colors"
              >
                info@matricsmania.com
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-6">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
              Quick Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {QUICK_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl bg-[#0D1424] hover:bg-[#1E293B]/70 border border-[#1E293B] text-sm text-[#CBD5E1] hover:text-white transition-all shadow-sm"
                >
                  <span className="font-medium">{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#60A5FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <p>© {new Date().getFullYear()} Matrics Mania. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@matricsmania.com"
              className="text-[#94A3B8] hover:text-white transition-colors"
            >
              info@matricsmania.com
            </a>
            <span>•</span>
            <a
              href="/privacy/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/privacy/');
                else if (typeof window !== 'undefined') window.location.href = '/privacy/';
              }}
              className="text-[#94A3B8] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
