import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Search,
  Sparkles,
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
  Newspaper,
  Award,
  Info,
  Mail,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (prefillInfo?: any) => void;
}

export const SEO_SERVICES = [
  { title: 'Technical SEO', slug: 'technical-seo' },
  { title: 'Search Engine Optimization', slug: 'technical-seo' },
  { title: 'On-Page Architecture', slug: 'technical-seo' },
  { title: 'Local SEO Systems', slug: 'technical-seo' },
  { title: 'B2B SEO Strategy', slug: 'technical-seo' },
  { title: 'SEO Infrastructure Audit', slug: 'technical-seo' },
];

export const AI_SEARCH_SERVICES = [
  { title: 'Answer Engine Optimization (AEO)', slug: 'technical-seo' },
  { title: 'Generative Engine Optimization (GEO)', slug: 'technical-seo' },
  { title: 'AI Knowledge Graph Citations', slug: 'technical-seo' },
  { title: 'Google AI Overviews Optimization', slug: 'technical-seo' },
];

export const INDUSTRIES_OPTIONS = [
  { title: 'Real Estate & Properties', slug: 'real-estate' },
  { title: 'Enterprise SaaS & Cloud', slug: 'saas' },
  { title: 'Healthcare & Life Sciences', slug: 'healthcare' },
  { title: 'Education & Universities', slug: 'education' },
  { title: 'Finance & FinTech', slug: 'finance' },
  { title: 'Luxury Brands & High-AOV', slug: 'luxury' },
  { title: 'Professional & Legal Services', slug: 'professional-services' },
];

export const COMPANY_OPTIONS = [
  { title: 'About MatricsMania', path: '/about/' },
  { title: 'Case Studies & Proof', path: '/case-studies/' },
  { title: 'Locations & Regional Hubs', path: '/locations/' },
  { title: 'Bangalore Headquarters', path: '/locations/bangalore/' },
  { title: 'Insights & Research', path: '/insights/' },
  { title: 'Operating Process', path: '/process/' },
  { title: 'Careers', path: '/careers/' },
  { title: 'FAQ', path: '/faq/' },
  { title: 'Contact', path: '/contact/' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
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
    }, 300);
  };

  const closeDropdownImmediately = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    closeDropdownImmediately();
  };

  return (
    <header className="fixed top-0 inset-x-0 w-full pt-[15px] z-50 bg-transparent border-0 shadow-none pointer-events-none flex flex-col items-center">
      <div className="w-[1080px] max-w-[calc(100%-24px)] mx-auto px-4 sm:px-5 h-[65px] flex items-center justify-between gap-3 shrink-0 rounded-[8px] backdrop-blur-xl backdrop-saturate-150 bg-[#0D1424]/90 border border-[#1E293B] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_32px_0_rgba(0,0,0,0.55)] pointer-events-auto transition-all duration-300 relative">
        {/* Brand Logo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('/')}
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
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg ${
              currentPath === '/' ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Home
          </button>

          {/* 2. Services Dropdown */}
          <div
            onMouseEnter={() => {
              setHoveredNav('services');
              openDropdown('services');
            }}
            onMouseLeave={closeDropdownWithDelay}
            className="relative"
          >
            <button
              onClick={() => handleNavClick('/services/')}
              className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 rounded-lg ${
                currentPath.startsWith('/services') || activeDropdown === 'services'
                  ? 'text-white font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  activeDropdown === 'services' ? 'rotate-180 text-[#60A5FA]' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[680px] z-50"
                  onMouseEnter={() => openDropdown('services')}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1E293B] mb-4">
                      <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase">
                        Growth Disciplines
                      </span>
                      <button
                        onClick={() => handleNavClick('/services/')}
                        className="text-xs font-mono text-[#94A3B8] hover:text-white"
                      >
                        View All Services →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-[#64748B] uppercase font-bold">
                          Technical SEO & Systems
                        </div>
                        {SEO_SERVICES.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick(`/services/${s.slug}/`)}
                            className="block w-full text-left py-1 text-xs text-[#CBD5E1] hover:text-[#60A5FA] transition-colors"
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-[#C084FC] uppercase font-bold">
                          AI & Generative Search (GEO)
                        </div>
                        {AI_SEARCH_SERVICES.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick(`/services/${s.slug}/`)}
                            className="block w-full text-left py-1 text-xs text-[#CBD5E1] hover:text-[#C084FC] transition-colors"
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Industries Dropdown */}
          <div
            onMouseEnter={() => {
              setHoveredNav('industries');
              openDropdown('industries');
            }}
            onMouseLeave={closeDropdownWithDelay}
            className="relative"
          >
            <button
              onClick={() => handleNavClick('/industries/')}
              className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 rounded-lg ${
                currentPath.startsWith('/industries') || activeDropdown === 'industries'
                  ? 'text-white font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  activeDropdown === 'industries' ? 'rotate-180 text-[#60A5FA]' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === 'industries' && (
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[520px] z-50"
                  onMouseEnter={() => openDropdown('industries')}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-6 backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                      <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase">
                        Industry Verticals
                      </span>
                      <button
                        onClick={() => handleNavClick('/industries/')}
                        className="text-xs font-mono text-[#94A3B8] hover:text-white"
                      >
                        View All Industries →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {INDUSTRIES_OPTIONS.map((ind) => (
                        <button
                          key={ind.slug}
                          onClick={() => handleNavClick(`/industries/${ind.slug}/`)}
                          className="text-left p-2 rounded-lg hover:bg-[#131D33] text-xs font-medium text-[#CBD5E1] hover:text-[#60A5FA] transition-colors"
                        >
                          {ind.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Work & Case Studies */}
          <button
            onClick={() => handleNavClick('/work/')}
            className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg ${
              currentPath.startsWith('/work') || currentPath.startsWith('/case-studies')
                ? 'text-white font-semibold'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Work
          </button>

          {/* 5. Company / Agency Dropdown */}
          <div
            onMouseEnter={() => {
              setHoveredNav('company');
              openDropdown('company');
            }}
            onMouseLeave={closeDropdownWithDelay}
            className="relative"
          >
            <button
              onClick={() => handleNavClick('/about/')}
              className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 rounded-lg ${
                activeDropdown === 'company' ||
                currentPath.startsWith('/about') ||
                currentPath.startsWith('/locations') ||
                currentPath.startsWith('/insights') ||
                currentPath.startsWith('/process') ||
                currentPath.startsWith('/careers') ||
                currentPath.startsWith('/faq')
                  ? 'text-white font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <span>Agency</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  activeDropdown === 'company' ? 'rotate-180 text-[#60A5FA]' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[460px] z-50"
                  onMouseEnter={() => openDropdown('company')}
                  onMouseLeave={closeDropdownWithDelay}
                >
                  <div className="bg-[#0D1424] border border-[#1E293B] rounded-2xl shadow-2xl p-6 backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                      <span className="text-xs font-mono text-[#60A5FA] font-bold uppercase">
                        MatricsMania Agency
                      </span>
                      <button
                        onClick={() => handleNavClick('/about/')}
                        className="text-xs font-mono text-[#94A3B8] hover:text-white"
                      >
                        About Us →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {COMPANY_OPTIONS.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className="text-left p-2 rounded-lg hover:bg-[#131D33] text-xs font-medium text-[#CBD5E1] hover:text-[#60A5FA] transition-colors"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden w-[calc(100%-24px)] mx-auto mt-2 p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] shadow-2xl backdrop-blur-2xl pointer-events-auto space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-2 text-sm font-medium">
              <button
                onClick={() => handleNavClick('/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('/about/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('/services/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('/industries/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Industries
              </button>
              <button
                onClick={() => handleNavClick('/locations/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Locations
              </button>
              <button
                onClick={() => handleNavClick('/locations/bangalore/')}
                className="block w-full text-left py-1 text-xs text-[#60A5FA] pl-4"
              >
                ↳ Bangalore Hub
              </button>
              <button
                onClick={() => handleNavClick('/work/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Work
              </button>
              <button
                onClick={() => handleNavClick('/case-studies/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Case Studies
              </button>
              <button
                onClick={() => handleNavClick('/insights/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Insights & Research
              </button>
              <button
                onClick={() => handleNavClick('/process/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Process
              </button>
              <button
                onClick={() => handleNavClick('/careers/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Careers
              </button>
              <button
                onClick={() => handleNavClick('/faq/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('/contact/')}
                className="block w-full text-left py-2 text-white hover:text-[#60A5FA]"
              >
                Contact
              </button>
            </div>

            <div className="pt-4 border-t border-[#1E293B]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-xs text-center"
              >
                Book Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
