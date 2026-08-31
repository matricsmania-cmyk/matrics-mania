'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<DesktopDropdown>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

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
      {/* Top Telemetry Strip */}
      <div className="hidden lg:block border-b border-[#1E293B]/60 bg-[#05080F] text-[11px] font-mono text-[#64748B] py-1">
        <Container maxWidth="xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#10B981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                SYSTEM STATUS: OPERATIONAL
              </span>
              <span className="text-[#334155]">|</span>
              <span>INDEX LATENCY: 42ms</span>
              <span className="text-[#334155]">|</span>
              <span>NODE: IN-BLR-01 (HQ)</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/case-studies/"
                onClick={(e) => handleLinkClick(e, '/case-studies/')}
                className="hover:text-[#60A5FA] transition-colors"
              >
                Q3 2025 Growth Attribution Benchmark Report →
              </a>
              <span className="text-[#334155]">|</span>
              <a
                href="mailto:growth@matricsmania.com"
                className="hover:text-white transition-colors"
              >
                growth@matricsmania.com
              </a>
            </div>
          </div>
        </Container>
      </div>

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
                    className="absolute top-full left-0 w-[840px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 grid grid-cols-12 gap-6 z-50"
                  >
                    {/* Left Columns: Service Groups */}
                    <div className="col-span-8 grid grid-cols-2 gap-6">
                      {NAVIGATION_CONFIG.services.groups.map((group) => (
                        <div key={group.id} className="space-y-3">
                          <div className="border-b border-[#1E293B] pb-1.5">
                            <h4 className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                              {group.title}
                            </h4>
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
                    </div>

                    {/* Right Column: Featured Callout */}
                    <div className="col-span-4 bg-[#131D33] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <Eyebrow variant="mono" dot dotColor="blue">
                          {NAVIGATION_CONFIG.services.featured?.badge}
                        </Eyebrow>
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {NAVIGATION_CONFIG.services.featured?.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {NAVIGATION_CONFIG.services.featured?.description}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#1E293B]">
                        <a
                          href={NAVIGATION_CONFIG.services.featured?.href}
                          onClick={(e) =>
                            handleLinkClick(e, NAVIGATION_CONFIG.services.featured?.href || '/services/')
                          }
                          className="text-xs font-mono font-bold text-[#60A5FA] hover:text-white flex items-center gap-1.5 group"
                        >
                          Explore GEO Architecture{' '}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
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
                    className="absolute top-full left-0 w-[720px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 grid grid-cols-12 gap-6 z-50"
                  >
                    <div className="col-span-8 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                        <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                          Industry Growth Playbooks
                        </span>
                        <a
                          href="/industries/"
                          onClick={(e) => handleLinkClick(e, '/industries/')}
                          className="text-[11px] font-mono text-[#94A3B8] hover:text-white"
                        >
                          View All Industries →
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {NAVIGATION_CONFIG.industries.groups.flatMap((g) => g.items).map((item) => (
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
                      </div>
                    </div>

                    <div className="col-span-4 bg-[#131D33] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <Eyebrow variant="mono" dot dotColor="green">
                          {NAVIGATION_CONFIG.industries.featured?.badge}
                        </Eyebrow>
                        <h4 className="text-xs font-bold text-white">
                          {NAVIGATION_CONFIG.industries.featured?.title}
                        </h4>
                        <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                          {NAVIGATION_CONFIG.industries.featured?.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#1E293B]">
                        <a
                          href={NAVIGATION_CONFIG.industries.featured?.href}
                          onClick={(e) =>
                            handleLinkClick(
                              e,
                              NAVIGATION_CONFIG.industries.featured?.href || '/industries/'
                            )
                          }
                          className="text-xs font-mono font-bold text-[#60A5FA] hover:text-white flex items-center gap-1 group"
                        >
                          View SaaS Teardown →
                        </a>
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
                    className="absolute top-full left-0 w-[640px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-6 grid grid-cols-12 gap-6 z-50"
                  >
                    <div className="col-span-6 space-y-3">
                      <div className="border-b border-[#1E293B] pb-2">
                        <span className="text-[11px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                          Research & Publications
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {NAVIGATION_CONFIG.insights.categories.map((cat) => (
                          <li key={cat.id}>
                            <a
                              href={cat.href}
                              onClick={(e) => handleLinkClick(e, cat.href)}
                              className="group flex items-center justify-between p-2 rounded hover:bg-[#131D33] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-colors"
                            >
                              <span>{cat.label}</span>
                              {cat.badge && (
                                <Badge variant="accent" size="sm">
                                  {cat.badge}
                                </Badge>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-span-6 bg-[#131D33] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase text-[#10B981] font-bold">
                          {NAVIGATION_CONFIG.insights.featured.category} •{' '}
                          {NAVIGATION_CONFIG.insights.featured.readTime}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-snug">
                          {NAVIGATION_CONFIG.insights.featured.title}
                        </h4>
                        <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-3">
                          {NAVIGATION_CONFIG.insights.featured.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#1E293B]">
                        <a
                          href={NAVIGATION_CONFIG.insights.featured.href}
                          onClick={(e) =>
                            handleLinkClick(e, NAVIGATION_CONFIG.insights.featured.href)
                          }
                          className="text-xs font-mono font-bold text-[#60A5FA] hover:text-white flex items-center gap-1 group"
                        >
                          Read Whitepaper →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Process */}
            <a
              href="/process/"
              onClick={(e) => handleLinkClick(e, '/process/')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                isLinkActive('/process/')
                  ? 'text-[#60A5FA] bg-[#131D33]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#0D1424]'
              }`}
            >
              Process
            </a>

            {/* 6. Company Dropdown (About, Locations, Careers, FAQ) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="/about/"
                onClick={(e) => handleLinkClick(e, '/about/')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isLinkActive('/about/') || isLinkActive('/locations/') || isLinkActive('/careers/') || isLinkActive('/faq/')
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

              {/* Company Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 w-[380px] mt-1 bg-[#0D1424] border border-[#1E293B] rounded-xl shadow-xl shadow-black/60 p-4 space-y-1 z-50"
                  >
                    {NAVIGATION_CONFIG.company.items.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-[#131D33] border border-transparent hover:border-[#1E293B] transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-[10px] text-[#94A3B8] line-clamp-1 mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.badge && (
                          <Badge variant="mono" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    ))}
                    <div className="pt-2 mt-2 border-t border-[#1E293B]">
                      <a
                        href="/locations/bangalore/"
                        onClick={(e) => handleLinkClick(e, '/locations/bangalore/')}
                        className="flex items-center justify-between p-2 rounded hover:bg-[#131D33] text-xs font-mono text-[#60A5FA]"
                      >
                        <span>Bangalore HQ & Labs</span>
                        <span className="text-[10px] text-[#94A3B8]">Indiranagar</span>
                      </a>
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
                    <span>Services</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'services' && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                      {NAVIGATION_CONFIG.services.groups.flatMap((g) => g.items).map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          {item.label}
                        </a>
                      ))}
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
                    <span>Industries</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'industries' && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                      {NAVIGATION_CONFIG.industries.groups.flatMap((g) => g.items).map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          {item.label}
                        </a>
                      ))}
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

                {/* 5. Process */}
                <a
                  href="/process/"
                  onClick={(e) => handleLinkClick(e, '/process/')}
                  className="p-4 border border-[#1E293B] rounded-lg bg-[#0D1424] flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                >
                  <span>Operating Methodology</span>
                </a>

                {/* 6. Company Hubs */}
                <div className="border border-[#1E293B] rounded-lg bg-[#0D1424] overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSectionOpen(mobileSectionOpen === 'company' ? null : 'company')
                    }
                    className="w-full p-4 flex items-center justify-between text-sm font-bold text-white uppercase tracking-wider"
                  >
                    <span>Company & Hubs</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileSectionOpen === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {mobileSectionOpen === 'company' && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#1E293B] pt-3">
                      {NAVIGATION_CONFIG.company.items.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="block p-2 text-xs font-medium text-[#CBD5E1] hover:text-white rounded hover:bg-[#131D33]"
                        >
                          {item.label}
                        </a>
                      ))}
                      <a
                        href="/locations/bangalore/"
                        onClick={(e) => handleLinkClick(e, '/locations/bangalore/')}
                        className="block p-2 text-xs font-mono text-[#60A5FA] font-bold"
                      >
                        Bangalore HQ (Indiranagar) →
                      </a>
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
