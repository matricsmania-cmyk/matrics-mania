'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Cpu,
  Layers,
  BarChart3,
  Globe2,
  Building2,
  BookOpen,
  PhoneCall,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from './Logo';
import { NAVIGATION_CONFIG, NavItem } from '../data/navigationConfig';
import { Container } from '../design-system/primitives/Container';
import { Button } from '../design-system/primitives/Button';
import { Badge } from '../design-system/primitives/Badge';
import { Eyebrow } from '../design-system/primitives/Eyebrow';
import { useContent } from '../providers/ContentContext';
import { Service } from '../models';

export interface DynamicNavGroup {
  id: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    label: string;
    href: string;
    description?: string;
    badge?: string;
  }>;
}

function groupServicesForNavigation(services: Service[]): DynamicNavGroup[] {
  if (!services || services.length === 0) return [];

  const buckets: {
    id: string;
    title: string;
    description: string;
    matches: (s: Service) => boolean;
    items: DynamicNavGroup['items'];
  }[] = [
    {
      id: 'search-systems',
      title: 'Search & LLM Discovery',
      description: 'Algorithmic organic indexing and AI answer engine dominance',
      matches: (s) => {
        const cat = (s.category || '').toLowerCase();
        const slug = (s.slug || '').toLowerCase();
        const code = (s.serviceCode || '').toLowerCase();
        return (
          cat.includes('search') ||
          cat.includes('seo') ||
          cat.includes('organic') ||
          cat.includes('llm') ||
          cat.includes('discovery') ||
          cat.includes('aeo') ||
          cat.includes('geo') ||
          slug.includes('seo') ||
          slug.includes('search') ||
          code.includes('seo')
        );
      },
      items: [],
    },
    {
      id: 'paid-media',
      title: 'Paid Acquisition & Media',
      description: 'High-intent programmatic bidding and multi-platform media systems',
      matches: (s) => {
        const cat = (s.category || '').toLowerCase();
        const slug = (s.slug || '').toLowerCase();
        const code = (s.serviceCode || '').toLowerCase();
        return (
          cat.includes('paid') ||
          cat.includes('media') ||
          cat.includes('ppc') ||
          cat.includes('ad') ||
          cat.includes('acquisition') ||
          cat.includes('social') ||
          slug.includes('paid') ||
          slug.includes('ppc') ||
          slug.includes('ads') ||
          code.includes('paid') ||
          code.includes('ppc')
        );
      },
      items: [],
    },
    {
      id: 'conversion-systems',
      title: 'Engineering & Conversion Systems',
      description: 'Revenue infrastructure, CRO experimentation, and attribution models',
      matches: (s) => {
        const cat = (s.category || '').toLowerCase();
        const slug = (s.slug || '').toLowerCase();
        const code = (s.serviceCode || '').toLowerCase();
        return (
          cat.includes('engineering') ||
          cat.includes('conversion') ||
          cat.includes('cro') ||
          cat.includes('attribution') ||
          cat.includes('audit') ||
          cat.includes('platform') ||
          slug.includes('cro') ||
          slug.includes('attribution') ||
          slug.includes('experimentation') ||
          code.includes('cro') ||
          code.includes('eng')
        );
      },
      items: [],
    },
  ];

  const otherGroupsMap = new Map<string, DynamicNavGroup>();

  for (const s of services) {
    const item = {
      id: s.slug,
      label: s.title,
      href: `/services/${s.slug}/`,
      description: s.shortDescription || s.tagline || undefined,
      badge: s.serviceCode || undefined,
    };

    let matched = false;
    for (const b of buckets) {
      if (b.matches(s)) {
        b.items.push(item);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const catName = s.category || 'Specialized Growth Systems';
      const catId = `group-${s.categorySlug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      if (!otherGroupsMap.has(catId)) {
        otherGroupsMap.set(catId, {
          id: catId,
          title: catName.toUpperCase(),
          items: [],
        });
      }
      otherGroupsMap.get(catId)!.items.push(item);
    }
  }

  const activeBuckets = buckets.filter((b) => b.items.length > 0);
  return [...activeBuckets, ...Array.from(otherGroupsMap.values())];
}

export interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
}

type DesktopDropdown = 'services' | 'industries' | 'insights' | 'company' | null;

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '/',
  onNavigate,
  onOpenBooking,
}) => {
  const { services, industries, locations, insights } = useContent();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<DesktopDropdown>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Group live services from CMS dynamically
  const serviceGroups = useMemo(() => groupServicesForNavigation(services), [services]);

  // Featured callout service from live CMS
  const featuredService = useMemo(() => {
    if (!services || services.length === 0) return null;
    const feat = services.find((s: any) => s.featured) || services[0];
    return {
      title: feat.title,
      description: feat.shortDescription || feat.tagline || 'Pioneering organic and algorithmic search architectures.',
      href: `/services/${feat.slug}/`,
      badge: feat.serviceCode || 'CMS VERIFIED',
    };
  }, [services]);

  // Live industries from CMS
  const liveIndustryItems = useMemo(() => {
    if (!industries || industries.length === 0) return [];
    return industries.map((ind) => ({
      id: ind.slug,
      label: ind.title,
      href: `/industries/${ind.slug}/`,
      description: ind.tagline || ind.industryCode || 'Growth Playbook',
      badge: ind.industryCode || undefined,
    }));
  }, [industries]);

  // Featured industry from live CMS
  const featuredIndustry = useMemo(() => {
    if (!industries || industries.length === 0) return null;
    const feat = industries[0];
    return {
      badge: feat.industryCode || 'CMS PLAYBOOK',
      title: feat.title,
      description: feat.tagline || feat.marketSummary || 'Enterprise growth architecture and performance marketing.',
      href: `/industries/${feat.slug}/`,
    };
  }, [industries]);

  // Live insights from CMS
  const liveInsightItems = useMemo(() => {
    if (!insights || insights.length === 0) return [];
    return insights.slice(0, 6).map((ins) => ({
      id: ins.slug,
      label: ins.title,
      href: `/insights/${ins.slug}/`,
      badge: ins.category || 'Research',
    }));
  }, [insights]);

  // Featured insight from live CMS
  const featuredInsight = useMemo(() => {
    if (!insights || insights.length === 0) return null;
    const feat = insights[0];
    return {
      category: feat.category || 'Research',
      readTime: feat.readingTimeMinutes ? `${feat.readingTimeMinutes} min read` : '5 min read',
      title: feat.title,
      description: feat.excerpt || 'Algorithmic growth systems and attribution research.',
      href: `/insights/${feat.slug}/`,
    };
  }, [insights]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleDropdownEnter = (menu: DesktopDropdown) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If not modified click (ctrl/cmd/shift), intercept for client-side transition
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !href.startsWith('http')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else if (typeof window !== 'undefined') {
        window.location.href = href;
      }
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/95 backdrop-blur-md border-b border-[#1E293B]"
      role="banner"
    >
      {/* Main Navigation Bar */}
      <Container maxWidth="xl">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2563EB] rounded py-1"
              aria-label="MatricsMania Home"
            >
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {/* 1. Services Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href={NAVIGATION_CONFIG.services.href}
                onClick={(e) => handleLinkClick(e, NAVIGATION_CONFIG.services.href)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isLinkActive('/services/')
                    ? 'text-[#60A5FA] bg-[#131D33]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </a>

              {/* Services Mega Panel */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[580px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 z-50"
                  >
                    {/* Service Groups */}
                    <div className={serviceGroups.length > 1 ? 'grid grid-cols-2 gap-6' : 'space-y-6'}>
                      {serviceGroups.map((group) => (
                        <div key={group.id} className="space-y-3">
                          <div className="border-b border-[#1E293B] pb-1.5 flex items-center justify-between">
                            <h4 className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                              {group.title}
                            </h4>
                            <span className="text-[10px] font-mono text-[#64748B]">
                              {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {group.items.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={item.href}
                                  onClick={(e) => handleLinkClick(e, item.href)}
                                  className="group block p-2 rounded-lg hover:bg-[#131D33] transition-colors border border-transparent hover:border-[#1E293B]"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                                      {item.label}
                                    </span>
                                    {item.badge && (
                                      <Badge variant="mono" size="sm">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5">
                                      {item.description}
                                    </p>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {serviceGroups.length === 0 && (
                        <div className="py-8 text-center text-xs text-[#94A3B8]">
                          No services published in CMS yet.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Industries Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('industries')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href={NAVIGATION_CONFIG.industries.href}
                onClick={(e) => handleLinkClick(e, NAVIGATION_CONFIG.industries.href)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isLinkActive('/industries/')
                    ? 'text-[#60A5FA] bg-[#131D33]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </a>

              {/* Industries Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[540px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 z-50"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                        <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                          Industry Growth Playbooks
                        </span>
                        <a
                          href="/industries/"
                          onClick={(e) => handleLinkClick(e, '/industries/')}
                          className="text-[11px] font-mono text-[#94A3B8] hover:text-white"
                        >
                          View All Industries ({liveIndustryItems.length}) →
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {liveIndustryItems.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="group p-2.5 rounded-lg hover:bg-[#131D33] border border-transparent hover:border-[#1E293B] transition-colors flex items-start justify-between gap-2"
                          >
                            <div>
                              <span className="text-xs font-semibold text-white group-hover:text-[#60A5FA] transition-colors block">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-[#94A3B8] line-clamp-1">
                                {item.description}
                              </span>
                            </div>
                            {item.badge && (
                              <Badge variant="metric" size="sm">
                                {item.badge}
                              </Badge>
                            )}
                          </a>
                        ))}
                        {liveIndustryItems.length === 0 && (
                          <div className="col-span-2 py-4 text-xs text-[#94A3B8]">
                            No industries published in CMS yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Case Studies (Direct Link with Badge) */}
            <a
              href="/case-studies/"
              onClick={(e) => handleLinkClick(e, '/case-studies/')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                isLinkActive('/case-studies/')
                  ? 'text-[#60A5FA] bg-[#131D33]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
              }`}
            >
              <span>Case Studies</span>
              <Badge variant="success" size="sm">
                Proof
              </Badge>
            </a>

            {/* 4. Insights (Canonical Editorial Hub) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('insights')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href={NAVIGATION_CONFIG.insights.href}
                onClick={(e) => handleLinkClick(e, NAVIGATION_CONFIG.insights.href)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isLinkActive('/insights/')
                    ? 'text-[#60A5FA] bg-[#131D33]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'insights'}
                aria-haspopup="true"
              >
                <span>Insights</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'insights' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </a>

              {/* Insights Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'insights' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[420px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 z-50"
                  >
                    <div className="space-y-3">
                      <div className="border-b border-[#1E293B] pb-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                          Research & Publications
                        </span>
                        <a
                          href="/insights/"
                          onClick={(e) => handleLinkClick(e, '/insights/')}
                          className="text-[10px] font-mono text-[#60A5FA] hover:underline"
                        >
                          All Articles →
                        </a>
                      </div>
                      <ul className="space-y-2">
                        {liveInsightItems.map((cat) => (
                          <li key={cat.id}>
                            <a
                              href={cat.href}
                              onClick={(e) => handleLinkClick(e, cat.href)}
                              className="group flex items-center justify-between p-2 rounded hover:bg-[#131D33] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-colors"
                            >
                              <span className="line-clamp-1">{cat.label}</span>
                              {cat.badge && (
                                <Badge variant="accent" size="sm">
                                  {cat.badge}
                                </Badge>
                              )}
                            </a>
                          </li>
                        ))}
                        {liveInsightItems.length === 0 && (
                          <li className="p-3 text-xs text-[#94A3B8]">
                            No research papers published yet.
                          </li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="/about/"
                onClick={(e) => handleLinkClick(e, '/about/')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isLinkActive('/about/') || isLinkActive('/work/') || isLinkActive('/case-studies/') || isLinkActive('/process/') || isLinkActive('/careers/') || isLinkActive('/faq/') || isLinkActive('/contact/')
                    ? 'text-[#60A5FA] bg-[#131D33]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </a>

              {/* Company Dropdown: 2 columns, 4 rows */}
              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 w-[360px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-3 z-50"
                  >
                    <div className="grid grid-cols-2 grid-rows-4 gap-1">
                      {NAVIGATION_CONFIG.company.items.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#131D33] transition-colors"
                        >
                          <span className="text-xs font-medium text-slate-200 group-hover:text-[#60A5FA] transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge variant="mono" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action: Consultation Launcher & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenBooking({ intent: 'Header CTA' })}
              iconTrailing={<ArrowRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Book Growth Audit
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed top-16 inset-x-0 bg-[#070B14] border-b border-[#1E293B] overflow-y-auto z-40 flex flex-col justify-between"
          >
            <div className="p-6 space-y-6">
              {/* Telemetry Indicator */}
              <div className="p-3 bg-[#0D1424] border border-[#1E293B] rounded-lg flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-2 text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  NODE: IN-BLR-01 (HQ)
                </span>
                <span>UPTIME: 99.98%</span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {/* 1. Services Section */}
                <div className="border border-[#1E293B] rounded-lg bg-[#0D1424] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'services' ? null : 'services')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                  >
                    <span>Services ({services.length})</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'services' && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                      {services.map((s) => (
                        <a
                          key={s.slug}
                          href={`/services/${s.slug}/`}
                          onClick={(e) => handleLinkClick(e, `/services/${s.slug}/`)}
                          className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          {s.title}
                        </a>
                      ))}
                      {services.length === 0 && (
                        <p className="text-xs text-[#94A3B8] p-2">No services published in CMS yet.</p>
                      )}
                      <div className="pt-2 border-t border-[#1E293B]">
                        <a
                          href="/services/"
                          onClick={(e) => handleLinkClick(e, '/services/')}
                          className="text-xs font-mono text-[#60A5FA] font-bold block p-2"
                        >
                          View All Services Overview →
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Industries Section */}
                <div className="border border-[#1E293B] rounded-lg bg-[#0D1424] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'industries' ? null : 'industries')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                  >
                    <span>Industries ({industries.length})</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'industries' && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                      {industries.map((ind) => (
                        <a
                          key={ind.slug}
                          href={`/industries/${ind.slug}/`}
                          onClick={(e) => handleLinkClick(e, `/industries/${ind.slug}/`)}
                          className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          {ind.title}
                        </a>
                      ))}
                      {industries.length === 0 && (
                        <p className="text-xs text-[#94A3B8] p-2">No industries published in CMS yet.</p>
                      )}
                      <div className="pt-2 border-t border-[#1E293B]">
                        <a
                          href="/industries/"
                          onClick={(e) => handleLinkClick(e, '/industries/')}
                          className="text-xs font-mono text-[#60A5FA] font-bold block p-2"
                        >
                          View All Industry Playbooks →
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Case Studies */}
                <a
                  href="/case-studies/"
                  onClick={(e) => handleLinkClick(e, '/case-studies/')}
                  className="p-4 border border-[#1E293B] rounded-lg bg-[#0D1424] flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                >
                  <span>Case Studies & Proof</span>
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                </a>

                {/* 4. Insights */}
                <a
                  href="/insights/"
                  onClick={(e) => handleLinkClick(e, '/insights/')}
                  className="p-4 border border-[#1E293B] rounded-lg bg-[#0D1424] flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                >
                  <span>Insights & Research</span>
                  <Badge variant="mono" size="sm">
                    2025
                  </Badge>
                </a>

                {/* 5. Company Hubs */}
                <div className="border border-[#1E293B] rounded-lg bg-[#0D1424] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'company' ? null : 'company')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                  >
                    <span>Company</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'company' && (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-1 border-t border-[#1E293B] pt-3">
                      {NAVIGATION_CONFIG.company.items.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="flex items-center justify-between p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="mono" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Bottom CTA Strip */}
            <div className="p-6 bg-[#0D1424] border-t border-[#1E293B] space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking?.({ intent: 'Mobile Menu' });
                }}
                iconTrailing={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Growth Audit
              </Button>
              <p className="text-center text-[11px] font-mono text-[#64748B]">
                Direct consultation with Principal Growth Engineers
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
