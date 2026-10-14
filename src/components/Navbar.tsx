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
      href: `/${s.slug}/`,
      description: s.shortDescription || s.tagline || undefined,
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

type DesktopDropdown = 'services' | 'industries' | 'company' | null;

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '/',
  onNavigate,
  onOpenBooking,
}) => {
  const { services, industries } = useContent();

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
      href: `/${feat.slug}/`,
      badge: feat.category || 'FEATURED CAPABILITY',
    };
  }, [services]);

  // Live industries from CMS
  const liveIndustryItems = useMemo(() => {
    if (!industries || industries.length === 0) return [];
    return industries.map((ind) => ({
      id: ind.slug,
      label: ind.title,
      href: `/${ind.slug}/`,
      description: ind.tagline || ind.industryCode || 'Growth Playbook',
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
      href: `/${feat.slug}/`,
    };
  }, [industries]);

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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollY > 2);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const shouldFloat = isScrolled && !mobileMenuOpen;

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      role="banner"
    >
      {/* Main Navigation Bar */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto mx-auto transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shouldFloat
            ? 'mt-3.5 w-[94%] max-w-[1080px] rounded-xl bg-[#0D1424]/90 backdrop-blur-xl border border-[#334155]/80 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85)] px-4 sm:px-6'
            : 'mt-0 w-full rounded-none bg-[#070B14]/90 backdrop-blur-md border-b border-[#1E293B] shadow-none px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`w-full max-w-[1080px] mx-auto flex items-center justify-between gap-4 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            shouldFloat ? 'h-14' : 'h-16'
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2563EB] rounded py-1 transition-transform active:scale-95 duration-150"
              aria-label="MatricsMania Home"
            >
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            {/* 1. Services Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-default select-none ${
                  activeDropdown === 'services'
                    ? 'text-[#60A5FA] bg-[#131D33] ring-1 ring-[#60A5FA]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </button>

              {/* Services Mega Panel */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 w-[580px] pt-2 z-50"
                  >
                    <div className="bg-[#0D1424]/95 backdrop-blur-2xl border border-[#1E293B] rounded-2xl shadow-2xl shadow-black/80 p-6 ring-1 ring-white/10">
                      {/* Service Groups */}
                      <div className={serviceGroups.length > 1 ? 'grid grid-cols-2 gap-6' : 'space-y-6'}>
                        {serviceGroups.map((group) => (
                          <div key={group.id} className="space-y-3">
                            <div className="border-b border-[#1E293B] pb-2 flex items-center justify-between">
                              <h4 className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                                {group.title}
                              </h4>
                              <span className="text-[10px] font-mono text-[#64748B]">
                                {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item.id}>
                                  <a
                                    href={item.href}
                                    onClick={(e) => handleLinkClick(e, item.href)}
                                    className="group block p-2.5 rounded-xl hover:bg-[#131D33] transition-all duration-200 border border-transparent hover:border-[#1E293B] hover:translate-x-1"
                                  >
                                    <span className="text-xs font-semibold text-white group-hover:text-[#60A5FA] transition-colors flex items-center justify-between">
                                      <span>{item.label}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#60A5FA]" />
                                    </span>
                                    {item.description && (
                                      <p className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5 group-hover:text-[#CBD5E1] transition-colors">
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
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-default select-none ${
                  activeDropdown === 'industries'
                    ? 'text-[#60A5FA] bg-[#131D33] ring-1 ring-[#60A5FA]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeDropdown === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </button>

              {/* Industries Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 w-[540px] pt-2 z-50"
                  >
                    <div className="bg-[#0D1424]/95 backdrop-blur-2xl border border-[#1E293B] rounded-2xl shadow-2xl shadow-black/80 p-6 ring-1 ring-white/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                        <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                          Industry Growth Playbooks
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B]">
                          {liveIndustryItems.length} {liveIndustryItems.length === 1 ? 'playbook' : 'playbooks'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {liveIndustryItems.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="group p-2.5 rounded-xl hover:bg-[#131D33] border border-transparent hover:border-[#1E293B] transition-all duration-200 block hover:translate-x-1"
                          >
                            <span className="text-xs font-semibold text-white group-hover:text-[#60A5FA] transition-colors flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#60A5FA]" />
                            </span>
                            <span className="text-[10px] text-[#94A3B8] line-clamp-1 mt-0.5 group-hover:text-[#CBD5E1] transition-colors">
                              {item.description}
                            </span>
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
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                isLinkActive('/case-studies/')
                  ? 'text-[#60A5FA] bg-[#131D33] ring-1 ring-[#60A5FA]/20'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
              }`}
            >
              <span>Work</span>
            </a>

            {/* 4. Blog */}
            <a
              href="/blog/"
              onClick={(e) => handleLinkClick(e, '/blog/')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                isLinkActive('/blog/')
                  ? 'text-[#60A5FA] bg-[#131D33] ring-1 ring-[#60A5FA]/20'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
              }`}
            >
              <span>Blog</span>
            </a>

            {/* 4. Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="/about/"
                onClick={(e) => handleLinkClick(e, '/about/')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  isLinkActive('/about/') || isLinkActive('/work/') || isLinkActive('/case-studies/') || isLinkActive('/careers/') || isLinkActive('/faq/') || isLinkActive('/contact/') || activeDropdown === 'company'
                    ? 'text-[#60A5FA] bg-[#131D33] ring-1 ring-[#60A5FA]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
                }`}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                <span>Agency</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeDropdown === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                  }`}
                />
              </a>

              {/* Company Dropdown: 2 columns, 4 rows */}
              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 w-[360px] pt-2 z-50"
                  >
                    <div className="bg-[#0D1424]/95 backdrop-blur-2xl border border-[#1E293B] rounded-2xl shadow-2xl shadow-black/80 p-3 ring-1 ring-white/10">
                      <div className="grid grid-cols-2 grid-rows-4 gap-1">
                        {NAVIGATION_CONFIG.company.items.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#131D33] transition-all duration-200"
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action: Consultation Launcher & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/contact/');
                  } else {
                    window.location.href = '/contact/';
                  }
                }}
                iconTrailing={<ArrowRight className="w-3.5 h-3.5" />}
                className="hidden sm:inline-flex shadow-lg shadow-[#2563EB]/25"
              >
                Let&apos;s Talk
              </Button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#0D1424] border border-[#1E293B] text-[#94A3B8] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden fixed top-16 inset-x-0 bottom-0 bg-[#070B14]/98 backdrop-blur-2xl border-b border-[#1E293B] overflow-y-auto z-40 flex flex-col justify-between pointer-events-auto"
          >
            <div className="p-6 space-y-6">
              {/* Telemetry Indicator */}
              <div className="p-3 bg-[#0D1424] border border-[#1E293B] rounded-xl flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-2 text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  NODE: IN-BLR-01 (HQ)
                </span>
                <span>UPTIME: 99.98%</span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {/* 1. Services Section */}
                <div className="border border-[#1E293B] rounded-xl bg-[#0D1424] overflow-hidden transition-colors">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'services' ? null : 'services')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:bg-[#131D33] transition-colors"
                  >
                    <span>Services ({services.length})</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mobileSectionOpen === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSectionOpen === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                          {services.map((s) => (
                            <a
                              key={s.slug}
                              href={`/${s.slug}/`}
                              onClick={(e) => handleLinkClick(e, `/${s.slug}/`)}
                              className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded-lg hover:bg-[#131D33] transition-colors"
                            >
                              {s.title}
                            </a>
                          ))}
                          {services.length === 0 && (
                            <p className="text-xs text-[#94A3B8] p-2">No services published in CMS yet.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Industries Section */}
                <div className="border border-[#1E293B] rounded-xl bg-[#0D1424] overflow-hidden transition-colors">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'industries' ? null : 'industries')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:bg-[#131D33] transition-colors"
                  >
                    <span>Industries ({industries.length})</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mobileSectionOpen === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSectionOpen === 'industries' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                          {industries.map((ind) => (
                            <a
                              key={ind.slug}
                              href={`/${ind.slug}/`}
                              onClick={(e) => handleLinkClick(e, `/${ind.slug}/`)}
                              className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded-lg hover:bg-[#131D33] transition-colors"
                            >
                              {ind.title}
                            </a>
                          ))}
                          {industries.length === 0 && (
                            <p className="text-xs text-[#94A3B8] p-2">No industries published in CMS yet.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Work */}
                <a
                  href="/case-studies/"
                  onClick={(e) => handleLinkClick(e, '/case-studies/')}
                  className="p-4 border border-[#1E293B] rounded-xl bg-[#0D1424] flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:bg-[#131D33] transition-colors"
                >
                  <span>Work</span>
                </a>

                {/* 4. Blog */}
                <a
                  href="/blog/"
                  onClick={(e) => handleLinkClick(e, '/blog/')}
                  className="p-4 border border-[#1E293B] rounded-xl bg-[#0D1424] flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:bg-[#131D33] transition-colors"
                >
                  <span>Blog</span>
                </a>

                {/* 4. Company Hubs */}
                <div className="border border-[#1E293B] rounded-xl bg-[#0D1424] overflow-hidden transition-colors">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'company' ? null : 'company')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider hover:bg-[#131D33] transition-colors"
                  >
                    <span>Agency</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mobileSectionOpen === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileSectionOpen === 'company' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 grid grid-cols-2 gap-1 border-t border-[#1E293B] pt-3">
                          {NAVIGATION_CONFIG.company.items.map((item) => (
                            <a
                              key={item.id}
                              href={item.href}
                              onClick={(e) => handleLinkClick(e, item.href)}
                              className="flex items-center justify-between p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded-lg hover:bg-[#131D33] transition-colors"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  if (onNavigate) {
                    onNavigate('/contact/');
                  } else {
                    window.location.href = '/contact/';
                  }
                }}
                iconTrailing={<ArrowRight className="w-4 h-4" />}
              >
                Let&apos;s Talk
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
