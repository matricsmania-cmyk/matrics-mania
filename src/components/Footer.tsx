import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking?: (prefillInfo?: any) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const navLinks: { path: string; label: string }[] = [
    { path: '/services/', label: 'Services' },
    { path: '/industries/', label: 'Industries' },
    { path: '/locations/', label: 'Locations' },
    { path: '/locations/bangalore/', label: 'Bangalore Hub' },
    { path: '/work/', label: 'Work' },
    { path: '/insights/', label: 'Insights & Research' },
    { path: '/contact/', label: 'Contact' },
  ];

  const resourceLinks: { path: string; label: string }[] = [
    { path: '/about/', label: 'About Us' },
    { path: '/case-studies/', label: 'Case Studies' },
    { path: '/process/', label: 'Our Process' },
    { path: '/careers/', label: 'Careers' },
    { path: '/faq/', label: 'FAQ' },
  ];

  return (
    <footer className="bg-[#070B14] text-white border-t border-[#1E293B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size={35} />
            </button>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              MatricsMania is a digital growth engineering agency. We design search architectures, scalable paid acquisition systems, and sub-second web platforms engineered for measurable revenue.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Acquisition & Hubs</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
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
          <p>© {new Date().getFullYear()} MatricsMania Digital Growth Agency. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[11px]">
            <span>Canonical Domain: matricsmania.com</span>
            <span>SSR & Headless REST Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
