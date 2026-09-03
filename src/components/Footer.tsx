'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Terminal,
  Mail,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';
import { NAVIGATION_CONFIG } from '../data/navigationConfig';
import { Container } from '../design-system/primitives/Container';
import { Button } from '../design-system/primitives/Button';
import { Badge } from '../design-system/primitives/Badge';
import { Eyebrow } from '../design-system/primitives/Eyebrow';
import { Heading } from '../design-system/primitives/Heading';
import { Divider } from '../design-system/primitives/Divider';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  const [intelEmail, setIntelEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleIntelSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intelEmail || !intelEmail.includes('@')) {
      onShowToast?.('Invalid Email', 'Please provide a valid corporate email address.', 'error');
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      onShowToast?.(
        'Intel Dispatch Confirmed',
        'You have been subscribed to MatricsMania Algorithm & Growth Research dispatches.',
        'success'
      );
    }, 600);
  };

  return (
    <footer
      className="bg-[#05080F] border-t border-[#1E293B] text-white pt-16 pb-12"
      role="contentinfo"
    >
      <Container maxWidth="xl">
        {/* Top Section: Intel Dispatch & Consultation Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0D1424] border border-[#1E293B] mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <Eyebrow variant="mono" dot dotColor="blue">
              // TECHNICAL INTEL DISPATCH
            </Eyebrow>
            <Heading level={3} size="h3" className="leading-tight">
              Bi-weekly engineering briefs on algorithm shifts & attribution models.
            </Heading>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Zero marketing fluff. Only verified technical SEO audit breakdowns, GEO vector indexing updates, and first-party attribution data.
            </p>
          </div>

          <div className="lg:col-span-5">
            {!isSubscribed ? (
              <form onSubmit={handleIntelSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="footer-intel-email" className="sr-only">
                    Work Email for Algorithm Dispatch
                  </label>
                  <input
                    id="footer-intel-email"
                    type="email"
                    aria-label="Work Email for Algorithm Dispatch"
                    value={intelEmail}
                    onChange={(e) => setIntelEmail(e.target.value)}
                    placeholder="architect@company.com"
                    required
                    className="flex-grow px-4 py-3 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] focus:outline-none rounded-lg text-xs font-mono text-white placeholder-[#64748B]"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubscribing}
                    iconTrailing={<ArrowRight className="w-4 h-4" />}
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-[11px] font-mono text-[#64748B]">
                  Strict no-spam SLA. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg flex items-center gap-3 text-xs font-mono text-[#34D399]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed to MatricsMania Algorithm Intel. Check inbox for verification.</span>
              </div>
            )}
          </div>
        </div>

        {/* Middle Navigation Grid (Crawlable Schema-Ready Architecture) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-16 border-b border-[#1E293B]">
          {/* Col 1: Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Growth Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.solutions.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Industries */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Industry Verticals
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.industries.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Research & Insights */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Research & Intel
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.insights.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Regional Hubs */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Regional Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.hubs.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Agency & Team
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.company.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 6: Legal & Compliance */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              Governance & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_CONFIG.footer.legal.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Coordinates & Physical Node */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono text-[#94A3B8] border-b border-[#1E293B]">
          <div className="space-y-1">
            <span className="text-white font-bold block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" /> Bangalore HQ (Main Node)
            </span>
            <p className="text-[11px] text-[#64748B]">
              Indiranagar 100ft Road, Stage 2<br />
              Bangalore, Karnataka 560038, India
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-white font-bold block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA]" /> Direct Consultation Line
            </span>
            <p className="text-[11px] text-[#64748B]">
              growth@matricsmania.com<br />
              +91 80 4920 8800 (Mon–Fri 09:00–19:00 IST)
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-white font-bold block flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" /> Telemetry & Security
            </span>
            <p className="text-[11px] text-[#64748B]">
              TLS 1.3 / HSTS Enforced<br />
              SOC2 Type II & GDPR Compliant
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-3">
            <Logo />
            <span>© {new Date().getFullYear()} MatricsMania Growth Systems. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              UPTIME: 99.98%
            </span>
            <span>DOMAIN: matricsmania.com</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenBooking({ intent: 'Footer Quick Book' })}
            >
              Book Audit
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
