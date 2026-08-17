import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageType } from './types';
import { BLOG_POSTS_DATA, INSIGHTS_DATA, WORK_PROJECTS_DATA, CASE_STUDIES_DATA } from './data/mockData';
import { SERVICE_SLUGS, ServiceSlug } from './data/serviceDetailsData';
import { INDUSTRY_SLUGS, IndustrySlug } from './data/industryDetailsData';
import { getSlugFromTitle } from './utils/slug';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { CustomCursor } from './components/CustomCursor';
import { FocusBlurVignette } from './components/FocusBlurVignette';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SearchPage } from './pages/SearchPage';
import { BlogPage } from './pages/BlogPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { SingleBlogPostPage } from './pages/SingleBlogPostPage';
import { SingleInsightPage } from './pages/SingleInsightPage';
import { BangaloreLocationPage } from './pages/BangaloreLocationPage';
import { LocationsPage } from './pages/LocationsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { CareersPage } from './pages/CareersPage';
import { FAQPage } from './pages/FAQPage';

type AppRoutePage =
  | PageType
  | 'service-detail'
  | 'industry-detail'
  | 'blog-detail'
  | 'insight-detail'
  | 'location-bangalore';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppRoutePage>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [currentInsightSlug, setCurrentInsightSlug] = useState<string | null>(null);
  const [currentServiceSlug, setCurrentServiceSlug] = useState<ServiceSlug>('strategy-growth');
  const [currentServiceSubSlug, setCurrentServiceSubSlug] = useState<string | null>(null);
  const [currentIndustrySlug, setCurrentIndustrySlug] = useState<IndustrySlug>('real-estate');
  const [currentWorkSlug, setCurrentWorkSlug] = useState<string | null>(null);
  const [currentCaseStudySlug, setCurrentCaseStudySlug] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>(null);

  // Parse location and sync routing
  const parseCurrentRoute = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    const rawPath = window.location.pathname.replace(/^\//, '').trim();

    const target = rawHash || rawPath;
    const normalizedTarget = target.replace(/\/+$/, '').trim();

    // Check industry slugs: e.g. "industries/real-estate" or "real-estate"
    const cleanedIndustryTarget = normalizedTarget.replace(/^industries\//, '').trim();
    if (INDUSTRY_SLUGS.includes(cleanedIndustryTarget as IndustrySlug)) {
      return {
        page: 'industry-detail' as const,
        serviceSlug: null,
        industrySlug: cleanedIndustryTarget as IndustrySlug,
        slug: null,
      };
    }

    // Check if target is explicitly /services/search/seo or /services/search/ai-search
    if (
      normalizedTarget === 'services/search/seo' ||
      normalizedTarget === 'services/search/seo/' ||
      normalizedTarget === 'search/seo'
    ) {
      return {
        page: 'service-detail' as const,
        serviceSlug: 'search' as ServiceSlug,
        industrySlug: null,
        slug: 'seo',
      };
    }

    if (
      normalizedTarget === 'services/search/ai-search' ||
      normalizedTarget === 'services/search/ai-search/' ||
      normalizedTarget === 'search/ai-search'
    ) {
      return {
        page: 'service-detail' as const,
        serviceSlug: 'search' as ServiceSlug,
        industrySlug: null,
        slug: 'ai-search',
      };
    }

    // Check if target is explicitly /services/search or /services/search-ai-visibility or other services
    if (
      normalizedTarget === 'services/search' ||
      normalizedTarget === 'services/search-ai-visibility' ||
      normalizedTarget === 'search-ai-visibility'
    ) {
      return {
        page: 'service-detail' as const,
        serviceSlug: 'search' as ServiceSlug,
        industrySlug: null,
        slug: null,
      };
    }

    // Check service slugs directly: e.g. "strategy-growth", "search", "services/strategy-growth", etc.
    const cleanedServiceTarget = normalizedTarget.replace(/^services\//, '').trim();
    if (SERVICE_SLUGS.includes(cleanedServiceTarget as ServiceSlug)) {
      const resolvedSlug = (cleanedServiceTarget === 'search-ai-visibility' ? 'search' : cleanedServiceTarget) as ServiceSlug;
      return {
        page: 'service-detail' as const,
        serviceSlug: resolvedSlug,
        industrySlug: null,
        slug: null,
      };
    }

    if (
      normalizedTarget === 'locations/bangalore' ||
      normalizedTarget === 'location/bangalore' ||
      normalizedTarget === 'bangalore' ||
      normalizedTarget === 'digital-marketing-agency-in-bangalore'
    ) {
      return { page: 'location-bangalore' as const, serviceSlug: null, industrySlug: null, slug: null };
    }
    if (normalizedTarget === 'locations' || normalizedTarget === 'location') {
      return { page: 'locations' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (normalizedTarget.startsWith('work/')) {
      const slug = normalizedTarget.replace(/^work\//, '').trim();
      return { page: 'work' as PageType, serviceSlug: null, industrySlug: null, slug };
    }

    if (normalizedTarget.startsWith('insights/')) {
      const slug = normalizedTarget.replace(/^insights\//, '').trim();
      return { page: 'insight-detail' as const, serviceSlug: null, industrySlug: null, slug };
    }

    if (normalizedTarget.startsWith('blog/')) {
      const slug = normalizedTarget.replace(/^blog\//, '').trim();
      return { page: 'blog-detail' as const, serviceSlug: null, industrySlug: null, slug };
    }

    if (normalizedTarget.startsWith('case-studies/')) {
      const slug = normalizedTarget.replace(/^case-studies\//, '').trim();
      return { page: 'case-studies' as PageType, serviceSlug: null, industrySlug: null, slug };
    }

    if (normalizedTarget === 'case-studies') {
      return { page: 'case-studies' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (normalizedTarget === 'faqs') {
      return { page: 'faq' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (normalizedTarget === 'career') {
      return { page: 'careers' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (normalizedTarget === 'about') {
      return { page: 'company' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (normalizedTarget.toLowerCase() === 'search' || normalizedTarget.toLowerCase() === 'seo') {
      return { page: 'search' as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    if (
      [
        'home',
        'services',
        'search',
        'industries',
        'locations',
        'work',
        'case-studies',
        'process',
        'careers',
        'faq',
        'blog',
        'insights',
        'company',
        'about',
        'contact',
      ].includes(normalizedTarget)
    ) {
      return { page: normalizedTarget as PageType, serviceSlug: null, industrySlug: null, slug: null };
    }

    // Check if target matches any work project directly
    const matchedWork = WORK_PROJECTS_DATA.find((w) => w.id === normalizedTarget);
    if (matchedWork) {
      return {
        page: 'work' as PageType,
        serviceSlug: null,
        industrySlug: null,
        slug: matchedWork.id,
      };
    }

    // Check if target matches any case study directly
    const matchedCaseStudy = CASE_STUDIES_DATA.find((c) => c.id === normalizedTarget);
    if (matchedCaseStudy) {
      return {
        page: 'case-studies' as PageType,
        serviceSlug: null,
        industrySlug: null,
        slug: matchedCaseStudy.id,
      };
    }

    // Check if target matches any insight report slug directly
    const matchedInsight = INSIGHTS_DATA.find((i) => i.slug === normalizedTarget);
    if (matchedInsight) {
      return {
        page: 'insight-detail' as const,
        serviceSlug: null,
        industrySlug: null,
        slug: matchedInsight.slug,
      };
    }

    // Check if target matches any blog post slug directly
    const matchedBlog = BLOG_POSTS_DATA.find(
      (p) => p.slug === normalizedTarget || getSlugFromTitle(p.title) === normalizedTarget
    );
    if (matchedBlog) {
      return {
        page: 'blog-detail' as const,
        serviceSlug: null,
        industrySlug: null,
        slug: getSlugFromTitle(matchedBlog.title),
      };
    }

    return { page: 'home' as const, serviceSlug: null, industrySlug: null, slug: null };
  };

  useEffect(() => {
    const handleUrlSync = () => {
      const route = parseCurrentRoute();
      setCurrentPage(route.page);
      if (route.page === 'service-detail' && route.serviceSlug) {
        setCurrentServiceSlug(route.serviceSlug);
        setCurrentServiceSubSlug(route.slug);
        setCurrentBlogSlug(null);
        setCurrentInsightSlug(null);
        setCurrentWorkSlug(null);
        setCurrentCaseStudySlug(null);
      } else if (route.page === 'industry-detail' && route.industrySlug) {
        setCurrentIndustrySlug(route.industrySlug);
        setCurrentBlogSlug(null);
        setCurrentInsightSlug(null);
        setCurrentWorkSlug(null);
        setCurrentCaseStudySlug(null);
      } else if (route.page === 'blog-detail') {
        setCurrentBlogSlug(route.slug);
        setCurrentInsightSlug(null);
        setCurrentWorkSlug(null);
        setCurrentCaseStudySlug(null);
      } else if (route.page === 'insight-detail') {
        setCurrentInsightSlug(route.slug);
        setCurrentBlogSlug(null);
        setCurrentWorkSlug(null);
        setCurrentCaseStudySlug(null);
      } else if (route.page === 'work') {
        setCurrentWorkSlug(route.slug);
        setCurrentBlogSlug(null);
        setCurrentInsightSlug(null);
        setCurrentCaseStudySlug(null);
      } else if (route.page === 'case-studies') {
        setCurrentCaseStudySlug(route.slug);
        setCurrentBlogSlug(null);
        setCurrentInsightSlug(null);
        setCurrentWorkSlug(null);
      } else {
        setCurrentBlogSlug(null);
        setCurrentInsightSlug(null);
        setCurrentWorkSlug(null);
        setCurrentCaseStudySlug(null);
        setCurrentServiceSubSlug(null);
      }
    };

    handleUrlSync();
    window.addEventListener('hashchange', handleUrlSync);
    window.addEventListener('popstate', handleUrlSync);
    return () => {
      window.removeEventListener('hashchange', handleUrlSync);
      window.removeEventListener('popstate', handleUrlSync);
    };
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    setCurrentWorkSlug(null);
    setCurrentCaseStudySlug(null);
    try {
      const path = page === 'home' ? '/' : page === 'search' ? '/search' : `/${page}`;
      window.history.pushState({ page }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    // Clean hash if present
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWorkSlug = (slug: string) => {
    setCurrentPage('work');
    setCurrentWorkSlug(slug);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    setCurrentCaseStudySlug(null);
    try {
      const path = `/work/${slug}`;
      window.history.pushState({ page: 'work', slug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCaseStudySlug = (slug: string) => {
    setCurrentPage('case-studies');
    setCurrentCaseStudySlug(slug);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    setCurrentWorkSlug(null);
    try {
      const path = `/case-studies/${slug}`;
      window.history.pushState({ page: 'case-studies', slug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServiceSlug = (slug: ServiceSlug) => {
    const resolvedSlug = slug === 'search-ai-visibility' ? 'search' : slug;
    setCurrentPage('service-detail');
    setCurrentServiceSlug(resolvedSlug);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    try {
      const path = `/services/${resolvedSlug}/`;
      window.history.pushState({ page: 'service-detail', serviceSlug: resolvedSlug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToServiceSubSlug = (serviceSlug: ServiceSlug, subSlug: string | null) => {
    const resolvedSlug = serviceSlug === 'search-ai-visibility' ? 'search' : serviceSlug;
    setCurrentPage('service-detail');
    setCurrentServiceSlug(resolvedSlug);
    setCurrentServiceSubSlug(subSlug);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    setCurrentWorkSlug(null);
    setCurrentCaseStudySlug(null);
    try {
      const path = subSlug 
        ? `/services/${resolvedSlug}/${subSlug}/` 
        : `/services/${resolvedSlug}/`;
      window.history.pushState({ page: 'service-detail', serviceSlug: resolvedSlug, slug: subSlug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToIndustrySlug = (slug: IndustrySlug) => {
    setCurrentPage('industry-detail');
    setCurrentIndustrySlug(slug);
    setCurrentBlogSlug(null);
    setCurrentInsightSlug(null);
    try {
      const path = `/industries/${slug}`;
      window.history.pushState({ page: 'industry-detail', industrySlug: slug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogSlug = (slug: string) => {
    setCurrentPage('blog-detail');
    setCurrentBlogSlug(slug);
    setCurrentInsightSlug(null);
    try {
      const path = `/blog/${slug}`;
      window.history.pushState({ page: 'blog-detail', slug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToInsightSlug = (slug: string) => {
    setCurrentPage('insight-detail');
    setCurrentInsightSlug(slug);
    setCurrentBlogSlug(null);
    try {
      const path = `/insights/${slug}`;
      window.history.pushState({ page: 'insight-detail', slug }, '', path);
    } catch (e) {
      // Sandbox fallback
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLocation = (locationSlug: string) => {
    if (
      locationSlug === 'locations/bangalore' ||
      locationSlug === 'bangalore' ||
      locationSlug === 'location/bangalore' ||
      locationSlug === 'digital-marketing-agency-in-bangalore'
    ) {
      setCurrentPage('location-bangalore');
      setCurrentBlogSlug(null);
      setCurrentInsightSlug(null);
      try {
        window.history.pushState({ page: 'location-bangalore' }, '', '/locations/bangalore');
      } catch (e) {}
    } else {
      setCurrentPage('locations');
      setCurrentBlogSlug(null);
      setCurrentInsightSlug(null);
      try {
        window.history.pushState({ page: 'locations' }, '', '/locations');
      } catch (e) {}
    }
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowToast = (
    title: string,
    description?: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const newToast: ToastMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenBooking = (prefillInfo?: any) => {
    if (prefillInfo) {
      setBookingPrefill(prefillInfo);
    } else {
      setBookingPrefill(null);
    }
    setIsBookingOpen(true);
  };

  // Find active blog post
  const activeBlogPost =
    currentPage === 'blog-detail' && currentBlogSlug
      ? BLOG_POSTS_DATA.find(
          (p) => p.slug === currentBlogSlug || getSlugFromTitle(p.title) === currentBlogSlug
        ) || BLOG_POSTS_DATA[0]
      : null;

  // Find active insight report
  const activeInsight =
    currentPage === 'insight-detail' && currentInsightSlug
      ? INSIGHTS_DATA.find((i) => i.slug === currentInsightSlug) || INSIGHTS_DATA[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-white selection:bg-[#2563EB]/40 selection:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onNavigateToServiceSlug={navigateToServiceSlug}
        onNavigateToIndustrySlug={navigateToIndustrySlug}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page View Renderer with Smooth Transition */}
      <main className="flex-1 pt-[85px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={
              currentPage +
              (currentBlogSlug || '') +
              (currentInsightSlug || '') +
              (currentPage === 'service-detail' ? currentServiceSlug : '') +
              (currentPage === 'industry-detail' ? currentIndustrySlug : '')
            }
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                onOpenBooking={handleOpenBooking}
                onNavigateToBlogSlug={navigateToBlogSlug}
                onNavigateToLocation={navigateToLocation}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'services' && (
              <ServicesPage
                onNavigate={navigateTo}
                onNavigateToServiceSlug={navigateToServiceSlug}
                onOpenBooking={handleOpenBooking}
              />
            )}
            {currentPage === 'service-detail' && (
              <ServiceDetailPage
                slug={currentServiceSlug}
                subSlug={currentServiceSubSlug}
                onSubSlugChange={(sub) => {
                  navigateToServiceSubSlug(currentServiceSlug, sub);
                }}
                onNavigate={navigateTo}
                onNavigateToServiceSlug={navigateToServiceSlug}
                onOpenBooking={handleOpenBooking}
              />
            )}
            {currentPage === 'industries' && (
              <IndustriesPage
                onNavigate={navigateTo}
                onNavigateToIndustrySlug={navigateToIndustrySlug}
                onOpenBooking={handleOpenBooking}
              />
            )}
            {currentPage === 'industry-detail' && (
              <IndustryDetailPage
                slug={currentIndustrySlug}
                onNavigate={navigateTo}
                onNavigateToIndustrySlug={navigateToIndustrySlug}
                onOpenBooking={handleOpenBooking}
              />
            )}
            {currentPage === 'locations' && (
              <LocationsPage
                onNavigate={navigateTo}
                onNavigateToLocation={navigateToLocation}
                onOpenBooking={handleOpenBooking}
              />
            )}
            {currentPage === 'search' && (
              <SearchPage
                onNavigate={navigateTo}
                onOpenBooking={handleOpenBooking}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'work' && (
              <WorkPage
                onNavigate={navigateTo}
                onOpenBooking={handleOpenBooking}
                slug={currentWorkSlug}
                onSlugChange={(slug) => {
                  if (slug) {
                    navigateToWorkSlug(slug);
                  } else {
                    navigateTo('work');
                  }
                }}
              />
            )}
            {currentPage === 'case-studies' && (
              <CaseStudiesPage
                onNavigate={navigateTo}
                onOpenBooking={handleOpenBooking}
                slug={currentCaseStudySlug}
                onSlugChange={(slug) => {
                  if (slug) {
                    navigateToCaseStudySlug(slug);
                  } else {
                    navigateTo('case-studies');
                  }
                }}
                onNavigateToWork={navigateToWorkSlug}
              />
            )}
            {currentPage === 'process' && (
              <ProcessPage
                onNavigate={navigateTo}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}
            {currentPage === 'careers' && (
              <CareersPage
                onNavigate={navigateTo}
                onOpenBooking={() => handleOpenBooking()}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'faq' && (
              <FAQPage
                onNavigate={navigateTo}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}
            {currentPage === 'blog' && (
              <BlogPage
                onNavigateToBlogSlug={navigateToBlogSlug}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}
            {currentPage === 'insights' && (
              <InsightsPage
                onNavigateToInsightSlug={navigateToInsightSlug}
                onOpenBooking={() => handleOpenBooking()}
                onShowToast={handleShowToast}
              />
            )}
            {(currentPage === 'company' || currentPage === 'about') && (
              <AboutPage
                onNavigate={navigateTo}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}
            {currentPage === 'blog-detail' && activeBlogPost && (
              <SingleBlogPostPage
                post={activeBlogPost}
                onNavigate={navigateTo}
                onNavigateToBlogSlug={navigateToBlogSlug}
                onOpenBooking={() => handleOpenBooking()}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'insight-detail' && activeInsight && (
              <SingleInsightPage
                insight={activeInsight}
                onNavigate={navigateTo}
                onNavigateToInsightSlug={navigateToInsightSlug}
                onOpenBooking={() => handleOpenBooking()}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={navigateTo}
                onOpenBooking={() => handleOpenBooking()}
                onShowToast={handleShowToast}
              />
            )}
            {currentPage === 'location-bangalore' && (
              <BangaloreLocationPage
                onNavigate={navigateTo}
                onNavigateToLocation={navigateToLocation}
                onOpenBooking={handleOpenBooking}
                onShowToast={handleShowToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onNavigateToLocation={navigateToLocation}
      />

      {/* Global Interactive Booking / Proposal Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillData={bookingPrefill}
        onSuccess={() => {
          handleShowToast(
            'Strategy Session Requested',
            'Our senior marketing director will review your metrics and reach out within 2 hours.',
            'success'
          );
        }}
      />

      {/* Interactive Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Ambient Focus Vignette Overlay */}
      <FocusBlurVignette />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
export default App;
