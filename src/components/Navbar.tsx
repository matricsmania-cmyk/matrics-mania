import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';
import { ServiceSlug } from '../data/serviceDetailsData';
import { IndustrySlug } from '../data/industryDetailsData';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Search,
  Target,
  Users,
  Sparkles,
  ShieldCheck,
  Globe,
  Database,
  Video,
  ChevronRight,
  Building2,
  HeartPulse,
  GraduationCap,
  Landmark,
  Cpu,
  Scale,
  Utensils,
  Crown,
  Briefcase,
  FolderKanban,
  BookOpen,
  Newspaper,
  Award,
  Info,
  Mail,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  currentPage: PageType | 'service-detail' | 'industry-detail' | 'blog-detail' | string;
  onNavigate: (page: PageType) => void;
  onNavigateToServiceSlug?: (slug: ServiceSlug) => void;
  onNavigateToIndustrySlug?: (slug: IndustrySlug) => void;
  onOpenBooking: () => void;
}

interface ServiceDropdownOption {
  title: string;
  slug: ServiceSlug;
  icon: React.ElementType;
}

interface IndustryDropdownOption {
  title: string;
  slug: IndustrySlug;
  icon: React.ElementType;
}

interface DropdownOption {
  title: string;
  icon: React.ElementType;
  page?: PageType;
}

export const SERVICES_DROPDOWN_OPTIONS: ServiceDropdownOption[] = [
  { title: 'Strategy & Growth', slug: 'strategy-growth', icon: TrendingUp },
  { title: 'Search & AI Visibility', slug: 'search', icon: Search },
  { title: 'Performance Marketing', slug: 'performance-marketing', icon: Target },
  { title: 'Social & Influence', slug: 'social-influence', icon: Users },
  { title: 'Content & Creative', slug: 'content-creative', icon: Sparkles },
  { title: 'Brand & Reputation', slug: 'brand-reputation', icon: ShieldCheck },
  { title: 'Web & Digital Experience', slug: 'web-digital-experience', icon: Globe },
  { title: 'Data & Technology', slug: 'data-technology', icon: Database },
  { title: 'Media & Experiences', slug: 'media-experiences', icon: Video },
];

export const INDUSTRIES_DROPDOWN_OPTIONS: IndustryDropdownOption[] = [
  { title: 'Real Estate', slug: 'real-estate', icon: Building2 },
  { title: 'Healthcare', slug: 'healthcare', icon: HeartPulse },
  { title: 'Education', slug: 'education', icon: GraduationCap },
  { title: 'Finance', slug: 'finance', icon: Landmark },
  { title: 'SaaS', slug: 'saas', icon: Cpu },
  { title: 'Legal', slug: 'legal', icon: Scale },
  { title: 'Hospitality', slug: 'hospitality', icon: Utensils },
  { title: 'Luxury', slug: 'luxury', icon: Crown },
  { title: 'Professional Services', slug: 'professional-services', icon: Briefcase },
];

const COMPANY_DROPDOWN_OPTIONS: DropdownOption[] = [
  { title: 'Case Studies', page: 'case-studies', icon: FolderKanban },
  { title: 'Locations', page: 'locations', icon: MapPin },
  { title: 'Insights', page: 'insights', icon: BookOpen },
  { title: 'Blog', page: 'blog', icon: Newspaper },
  { title: 'Career', page: 'careers', icon: Award },
  { title: 'About', page: 'about', icon: Info },
  { title: 'Contact', page: 'contact', icon: Mail },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onNavigateToServiceSlug,
  onNavigateToIndustrySlug,
  onOpenBooking,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  type DesktopDropdown = 'services' | 'industries' | 'company' | null;
  const [activeDropdown, setActiveDropdown] = useState<DesktopDropdown>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openDropdown = (type: DesktopDropdown) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(type);
  };

  const closeDropdownWithDelay = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  };

  const closeDropdownImmediately = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  const navItems: { id: PageType; label: string; hasDropdown?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'industries', label: 'Industries', hasDropdown: true },
    { id: 'work', label: 'Work' },
    { id: 'company', label: 'Agency', hasDropdown: true },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    closeDropdownImmediately();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceOptionClick = (slug: ServiceSlug) => {
    if (onNavigateToServiceSlug) {
      onNavigateToServiceSlug(slug);
    } else {
      onNavigate('services');
    }
    setMobileMenuOpen(false);
    closeDropdownImmediately();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIndustryOptionClick = (slug: IndustrySlug) => {
    if (onNavigateToIndustrySlug) {
      onNavigateToIndustrySlug(slug);
    } else {
      onNavigate('industries');
    }
    setMobileMenuOpen(false);
    closeDropdownImmediately();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyOptionClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    closeDropdownImmediately();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 w-full pt-[15px] z-50 bg-transparent border-0 shadow-none pointer-events-none flex flex-col items-center">
      <div className="w-[1080px] max-w-[calc(100%-24px)] mx-auto px-4 sm:px-5 h-[65px] flex items-center justify-between gap-3 shrink-0 rounded-[8px] backdrop-blur-xl backdrop-saturate-150 bg-[#0D1424]/90 border border-[#1E293B] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_32px_0_rgba(0,0,0,0.55)] pointer-events-auto transition-all duration-300 relative">
        {/* Brand Logo (Emblem only) */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none cursor-pointer"
            aria-label="MatricsMania Home"
          >
            <Logo size={35} showText={false} />
          </button>
        </div>

        {/* Desktop Centered Navigation Bar */}
        <nav
          ref={navRef}
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden lg:flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl"
        >
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'services' && currentPage === 'service-detail') ||
              (item.id === 'company' && currentPage === 'about') ||
              (item.id === 'work' && currentPage === 'case-studies') ||
              (item.id === 'insights' && (currentPage as string) === 'blog-detail');

            const isHovered = hoveredNav === item.id;

            if (item.id === 'services') {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setHoveredNav('services');
                    openDropdown('services');
                  }}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeDropdown !== 'services') {
                        openDropdown('services');
                      } else {
                        handleNavClick('services');
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredNav('services');
                      openDropdown('services');
                    }}
                    onFocus={() => {
                      setHoveredNav('services');
                      openDropdown('services');
                    }}
                    className={`relative z-10 px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer whitespace-nowrap antialiased flex items-center gap-1.5 rounded-lg select-none hover:scale-[1.02] active:scale-[0.98] ${
                      isActive || activeDropdown === 'services'
                        ? 'text-white font-semibold'
                        : 'text-[#94A3B8] font-medium hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 opacity-80 stroke-[2.5] transition-transform duration-200 ${
                        activeDropdown === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {/* Services Hover Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: 0.08, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[660px] sm:w-[720px] max-w-[calc(100vw-32px)] z-50 origin-top before:absolute before:-top-3 before:inset-x-0 before:h-4 before:content-['']"
                        onMouseEnter={() => openDropdown('services')}
                        onMouseLeave={closeDropdownWithDelay}
                      >
                        <div className="relative bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-4 backdrop-blur-xl overflow-hidden">
                          {/* Top Accent Gradient */}
                          <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB]/70 to-transparent rounded-full" />

                          {/* Services Heading at Top */}
                          <div className="px-2 pt-0.5 flex items-center justify-between">
                            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                              Services
                            </span>
                            <button
                              onClick={() => handleNavClick('services')}
                              className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8] hover:text-white transition-colors duration-150 cursor-pointer"
                            >
                              View all
                            </button>
                          </div>

                          {/* 9 Services Grid */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {SERVICES_DROPDOWN_OPTIONS.map((opt) => (
                              <button
                                key={opt.slug}
                                onClick={() => handleServiceOptionClick(opt.slug)}
                                className="group/opt flex items-center py-2 px-1 rounded-lg bg-transparent transition-all duration-150 text-left cursor-pointer w-full select-none"
                              >
                                <span className="text-[13.5px] font-medium text-[#CBD5E1] group-hover/opt:text-[#60A5FA] transition-colors duration-150 leading-snug truncate">
                                  {opt.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.id === 'industries') {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setHoveredNav('industries');
                    openDropdown('industries');
                  }}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeDropdown !== 'industries') {
                        openDropdown('industries');
                      } else {
                        handleNavClick('industries');
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredNav('industries');
                      openDropdown('industries');
                    }}
                    onFocus={() => {
                      setHoveredNav('industries');
                      openDropdown('industries');
                    }}
                    className={`relative z-10 px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer whitespace-nowrap antialiased flex items-center gap-1.5 rounded-lg select-none hover:scale-[1.02] active:scale-[0.98] ${
                      isActive || activeDropdown === 'industries'
                        ? 'text-white font-semibold'
                        : 'text-[#94A3B8] font-medium hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 opacity-80 stroke-[2.5] transition-transform duration-200 ${
                        activeDropdown === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {/* Industries Hover Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === 'industries' && (
                      <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: 0.08, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[560px] sm:w-[620px] max-w-[calc(100vw-32px)] z-50 origin-top before:absolute before:-top-3 before:inset-x-0 before:h-4 before:content-['']"
                        onMouseEnter={() => openDropdown('industries')}
                        onMouseLeave={closeDropdownWithDelay}
                      >
                        <div className="relative bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-6 space-y-4 backdrop-blur-xl overflow-hidden">
                          {/* Top Accent Gradient */}
                          <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB]/70 to-transparent rounded-full" />

                          {/* Heading */}
                          <div className="px-2 pt-0.5 flex items-center justify-between">
                            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                              Industries
                            </span>
                            <button
                              onClick={() => handleNavClick('industries')}
                              className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8] hover:text-white transition-colors duration-150 cursor-pointer"
                            >
                              View all
                            </button>
                          </div>

                          {/* Grid */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {INDUSTRIES_DROPDOWN_OPTIONS.map((opt) => (
                              <button
                                key={opt.slug}
                                onClick={() => handleIndustryOptionClick(opt.slug)}
                                className="group/opt flex items-center py-2 px-1 rounded-lg bg-transparent transition-all duration-150 text-left cursor-pointer w-full select-none"
                              >
                                <span className="text-[13.5px] font-medium text-[#CBD5E1] group-hover/opt:text-[#60A5FA] transition-colors duration-150 leading-snug truncate">
                                  {opt.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.id === 'company') {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setHoveredNav('company');
                    openDropdown('company');
                  }}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeDropdown !== 'company') {
                        openDropdown('company');
                      } else {
                        handleNavClick('about');
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredNav('company');
                      openDropdown('company');
                    }}
                    onFocus={() => {
                      setHoveredNav('company');
                      openDropdown('company');
                    }}
                    className={`relative z-10 px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer whitespace-nowrap antialiased flex items-center gap-1.5 rounded-lg select-none hover:scale-[1.02] active:scale-[0.98] ${
                      isActive || activeDropdown === 'company'
                        ? 'text-white font-semibold'
                        : 'text-[#94A3B8] font-medium hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 opacity-80 stroke-[2.5] transition-transform duration-200 ${
                        activeDropdown === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>

                  {/* Company Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === 'company' && (
                      <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: 0.08, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[420px] sm:w-[460px] max-w-[calc(100vw-32px)] z-50 origin-top before:absolute before:-top-3 before:inset-x-0 before:h-4 before:content-['']"
                        onMouseEnter={() => openDropdown('company')}
                        onMouseLeave={closeDropdownWithDelay}
                      >
                        <div className="relative bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-5 space-y-3 backdrop-blur-xl overflow-hidden">
                          {/* Top Accent Gradient */}
                          <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB]/70 to-transparent rounded-full" />

                          {/* Heading */}
                          <div className="px-2 pt-0.5 flex items-center justify-between">
                            <span className="text-[13px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                              Agency
                            </span>
                            <button
                              onClick={() => handleNavClick('about')}
                              className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8] hover:text-white transition-colors duration-150 cursor-pointer"
                            >
                              View all
                            </button>
                          </div>

                          {/* Grid */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {COMPANY_DROPDOWN_OPTIONS.map((opt) => (
                              <button
                                key={opt.title}
                                onClick={() => handleCompanyOptionClick(opt.page || 'about')}
                                className="group/opt flex items-center py-2 px-1 rounded-lg bg-transparent transition-all duration-150 text-left cursor-pointer w-full select-none"
                              >
                                <span className="text-[13.5px] font-medium text-[#CBD5E1] group-hover/opt:text-[#60A5FA] transition-colors duration-150 leading-snug truncate">
                                  {opt.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => {
                    setHoveredNav(item.id);
                    closeDropdownImmediately();
                  }}
                  onFocus={() => {
                    setHoveredNav(item.id);
                    closeDropdownImmediately();
                  }}
                  className={`relative z-10 px-3 py-1.5 text-sm transition-all duration-200 cursor-pointer whitespace-nowrap antialiased flex items-center gap-1.5 rounded-lg select-none hover:scale-[1.02] active:scale-[0.98] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#94A3B8] font-medium hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-full z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-80 stroke-[2.5]" />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right CTA & Theme Toggle Controls */}
        <div className="hidden lg:flex items-center justify-end gap-3 shrink-0">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 bg-transparent border-0 shadow-none text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 stroke-[2] text-[#94A3B8] hover:text-white" />
            ) : (
              <Moon className="w-4 h-4 stroke-[2] text-[#94A3B8] hover:text-white" />
            )}
          </button>

          {/* Let's Talk Button */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-[11px] rounded-[6px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-semibold text-[14.5px] leading-tight tracking-tight transition-all duration-300 flex items-center gap-2.5 cursor-pointer group whitespace-nowrap antialiased shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 active:scale-[0.98]"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile & Tablet Menu & Dark Mode Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 bg-transparent border-0 shadow-none text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 stroke-[2.2] text-[#94A3B8]" />
            ) : (
              <Moon className="w-4 h-4 stroke-[2.2] text-[#94A3B8]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg text-white hover:bg-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="w-[1200px] max-w-[calc(100%-24px)] mx-auto mt-2 rounded-2xl border border-[#1E293B] bg-[#0D1424] px-4 pt-3 pb-6 space-y-3 shadow-2xl backdrop-blur-xl pointer-events-auto animate-fade-in max-h-[calc(100vh-100px)] overflow-y-auto lg:hidden">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              if (item.id === 'services') {
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors text-left antialiased bg-[#131D33]">
                      <button
                        onClick={() => handleNavClick('services')}
                        className="font-bold text-white flex-1 text-left cursor-pointer"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-1 text-[#94A3B8] hover:text-white cursor-pointer"
                        aria-label="Toggle services options"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 border-l-2 border-[#2563EB]/50 ml-3">
                        {SERVICES_DROPDOWN_OPTIONS.map((opt) => (
                          <button
                            key={opt.slug}
                            onClick={() => handleServiceOptionClick(opt.slug)}
                            className="w-full px-2 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-[#60A5FA] text-left cursor-pointer flex items-center transition-all duration-300"
                          >
                            <span className="truncate">{opt.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.id === 'industries') {
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-300 text-left antialiased">
                      <button
                        onClick={() => handleNavClick('industries')}
                        className="font-bold text-white hover:text-[#60A5FA] transition-all duration-300 flex-1 text-left cursor-pointer"
                      >
                        Industries
                      </button>
                      <button
                        onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                        className="p-1 text-[#94A3B8] hover:text-[#60A5FA] transition-all duration-300 cursor-pointer"
                        aria-label="Toggle industries options"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {mobileIndustriesOpen && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 border-l-2 border-[#2563EB]/50 ml-3">
                        {INDUSTRIES_DROPDOWN_OPTIONS.map((opt) => (
                          <button
                            key={opt.slug}
                            onClick={() => handleIndustryOptionClick(opt.slug)}
                            className="w-full px-2 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-[#60A5FA] text-left cursor-pointer flex items-center transition-all duration-300"
                          >
                            <span className="truncate">{opt.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.id === 'company') {
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-300 text-left antialiased">
                      <button
                        onClick={() => handleNavClick('about')}
                        className="font-bold text-white hover:text-[#60A5FA] transition-all duration-300 flex-1 text-left cursor-pointer"
                      >
                        Agency
                      </button>
                      <button
                        onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                        className="p-1 text-[#94A3B8] hover:text-[#60A5FA] transition-all duration-300 cursor-pointer"
                        aria-label="Toggle agency options"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {mobileCompanyOpen && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 border-l-2 border-[#2563EB]/50 ml-3">
                        {COMPANY_DROPDOWN_OPTIONS.map((opt) => (
                          <button
                            key={opt.title}
                            onClick={() => handleCompanyOptionClick(opt.page || 'about')}
                            className="w-full px-2 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-[#60A5FA] text-left cursor-pointer flex items-center transition-all duration-300"
                          >
                            <span className="truncate">{opt.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-4 py-2.5 font-bold text-sm text-white hover:text-[#60A5FA] text-left transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#1E293B]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
