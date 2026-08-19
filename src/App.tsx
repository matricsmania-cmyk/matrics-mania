import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { CustomCursor } from './components/CustomCursor';
import { FocusBlurVignette } from './components/FocusBlurVignette';

import { resolveRoute, normalizePath, RouteMatch } from './routes/routes';

// Static & Hub Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudiesIndexPage } from './pages/CaseStudiesIndexPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { IndustriesIndexPage } from './pages/IndustriesIndexPage';
import { LocationsIndexPage } from './pages/LocationsIndexPage';
import { InsightsIndexPage } from './pages/InsightsIndexPage';
import { ProcessPage } from './pages/ProcessPage';
import { CareersPage } from './pages/CareersPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

// Dynamic Template Components
import { ServiceTemplate } from './templates/ServiceTemplate';
import { IndustryTemplate } from './templates/IndustryTemplate';
import { LocationTemplate } from './templates/LocationTemplate';
import { InsightTemplate } from './templates/InsightTemplate';
import { CaseStudyTemplate } from './templates/CaseStudyTemplate';

export function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<RouteMatch>(() => {
    const raw = typeof window !== 'undefined'
      ? (window.location.pathname && window.location.pathname !== '/' ? window.location.pathname : window.location.hash || '/')
      : '/';
    return resolveRoute(raw);
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>(null);

  // Sync route on popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const raw = window.location.pathname && window.location.pathname !== '/'
        ? window.location.pathname
        : window.location.hash || '/';
      const match = resolveRoute(raw);
      setCurrentRoute(match);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Universal navigation handler enforcing trailing slashes
  const navigate = useCallback((target: string) => {
    let path = target;

    // Handle legacy enum mappings if passed
    if (target === 'home') path = '/';
    else if (target === 'about') path = '/about/';
    else if (target === 'work') path = '/work/';
    else if (target === 'case-studies') path = '/case-studies/';
    else if (target === 'services') path = '/services/';
    else if (target === 'industries') path = '/industries/';
    else if (target === 'locations') path = '/locations/';
    else if (target === 'insights' || target === 'blog') path = '/insights/';
    else if (target === 'process') path = '/process/';
    else if (target === 'careers') path = '/careers/';
    else if (target === 'faq') path = '/faq/';
    else if (target === 'contact') path = '/contact/';

    const normalized = normalizePath(path);
    const match = resolveRoute(normalized);

    // Update browser history
    if (typeof window !== 'undefined' && window.history) {
      try {
        window.history.pushState({}, '', match.pathname);
      } catch {
        // Fallback for sandboxed iframes
        window.location.hash = match.pathname;
      }
    }

    setCurrentRoute(match);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenBooking = (prefill?: any) => {
    setBookingPrefill(prefill || null);
    setIsBookingOpen(true);
  };

  // Render the appropriate template or static page
  const renderCurrentView = () => {
    switch (currentRoute.routeId) {
      // 1. Home
      case 'home':
        return (
          <HomePage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
            onNavigateToBlogSlug={(slug) => navigate(`/insights/${slug}/`)}
            onNavigateToLocation={(slug) => navigate(`/locations/${slug}/`)}
            onShowToast={showToast}
          />
        );

      // 2. About
      case 'about':
        return (
          <AboutPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 3. Work Index
      case 'work':
        return (
          <WorkPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onNavigateToServiceSlug={(slug) => navigate(`/services/${slug}/`)}
            onNavigateToIndustrySlug={(slug) => navigate(`/industries/${slug}/`)}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 4. Case Studies Hub
      case 'case-studies-index':
        return (
          <CaseStudiesIndexPage
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Case Studies Inquiry' })}
          />
        );

      // 5. Dynamic Case Study Template: /case-studies/[slug]/
      case 'case-study-detail':
        return (
          <CaseStudyTemplate
            slug={currentRoute.params.slug || 'velociti-cloud'}
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ caseStudySlug: currentRoute.params.slug })}
            onShowToast={showToast}
          />
        );

      // 6. Services Hub
      case 'services-index':
        return (
          <ServicesIndexPage
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Services Overview' })}
          />
        );

      // 7. Dynamic Service Template: /services/[slug]/
      case 'service-detail':
        return (
          <ServiceTemplate
            slug={currentRoute.params.slug || 'technical-seo'}
            onNavigate={navigate}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 8. Industries Hub
      case 'industries-index':
        return (
          <IndustriesIndexPage
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Industry Consultation' })}
          />
        );

      // 9. Dynamic Industry Template: /industries/[slug]/
      case 'industry-detail':
        return (
          <IndustryTemplate
            slug={currentRoute.params.slug || 'real-estate'}
            onNavigate={navigate}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 10. Locations Hub
      case 'locations-index':
        return (
          <LocationsIndexPage
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Regional Hub' })}
          />
        );

      // 11. Dynamic Location Template: /locations/[slug]/ (e.g. /locations/bangalore/)
      case 'location-detail':
        return (
          <LocationTemplate
            slug={currentRoute.params.slug || 'bangalore'}
            onNavigate={navigate}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 12. Canonical Insights Hub: /insights/
      case 'insights-index':
        return (
          <InsightsIndexPage
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Research & Insights' })}
          />
        );

      // 13. Dynamic Insight Template: /insights/[slug]/
      case 'insight-detail':
        return (
          <InsightTemplate
            slug={currentRoute.params.slug || 'how-ai-search-is-changing-digital-discovery'}
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking({ interest: 'Insight Inquiry' })}
            onShowToast={showToast}
          />
        );

      // 14. Process
      case 'process':
        return (
          <ProcessPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 15. Careers
      case 'careers':
        return (
          <CareersPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 16. FAQ
      case 'faq':
        return (
          <FAQPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
          />
        );

      // 17. Contact
      case 'contact':
        return (
          <ContactPage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
            onShowToast={showToast}
          />
        );

      // Fallback
      default:
        return (
          <HomePage
            onNavigate={(page) => navigate(typeof page === 'string' ? page : '/')}
            onOpenBooking={handleOpenBooking}
            onNavigateToBlogSlug={(slug) => navigate(`/insights/${slug}/`)}
            onNavigateToLocation={(slug) => navigate(`/locations/${slug}/`)}
            onShowToast={showToast}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      <CustomCursor />
      <FocusBlurVignette />

      {/* Primary Sticky Header */}
      <Navbar
        currentPath={currentRoute.pathname}
        onNavigate={navigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area with Smooth Route Fade */}
      <main className="flex-grow pt-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute.pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={navigate}
        onOpenBooking={handleOpenBooking}
        onShowToast={showToast}
      />

      {/* Global Booking Modal & Toasts */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillInfo={bookingPrefill}
        onShowToast={showToast}
      />

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
