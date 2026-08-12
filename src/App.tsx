import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { BLOG_POSTS_DATA } from './data/mockData';
import { getSlugFromTitle } from './utils/slug';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BookingModal } from './components/BookingModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { SingleBlogPostPage } from './pages/SingleBlogPostPage';
import { LocationPage } from './pages/LocationPage';

type AppRoutePage =
  | PageType
  | 'blog-detail'
  | 'location-varanasi'
  | 'location-prayagraj';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppRoutePage>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>(null);

  // Parse location and sync routing
  const parseCurrentRoute = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    const rawPath = window.location.pathname.replace(/^\//, '').trim();

    const target = rawHash || rawPath;

    if (target === 'digital-marketing-agency-in-varanasi') {
      return { page: 'location-varanasi' as const, slug: null };
    }
    if (target === 'digital-marketing-agency-in-prayagraj') {
      return { page: 'location-prayagraj' as const, slug: null };
    }

    if (target.startsWith('blog/')) {
      const slug = target.replace(/^blog\//, '').trim();
      return { page: 'blog-detail' as const, slug };
    }

    if (['home', 'about', 'services', 'blog', 'contact'].includes(target)) {
      return { page: target as PageType, slug: null };
    }

    // Check if target matches any blog post slug directly
    const matched = BLOG_POSTS_DATA.find(
      (p) => p.slug === target || getSlugFromTitle(p.title) === target
    );
    if (matched) {
      return { page: 'blog-detail' as const, slug: getSlugFromTitle(matched.title) };
    }

    return { page: 'home' as const, slug: null };
  };

  useEffect(() => {
    const handleUrlSync = () => {
      const route = parseCurrentRoute();
      setCurrentPage(route.page);
      if (route.page === 'blog-detail') {
        setCurrentBlogSlug(route.slug);
      } else {
        setCurrentBlogSlug(null);
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
    window.location.hash = page;
    try {
      window.history.pushState(null, '', `/${page}`);
    } catch (e) {
      // Sandbox fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogSlug = (slug: string) => {
    setCurrentPage('blog-detail');
    setCurrentBlogSlug(slug);
    window.location.hash = `blog/${slug}`;
    try {
      window.history.pushState(null, '', `/blog/${slug}`);
    } catch (e) {
      // Sandbox fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLocation = (locationSlug: string) => {
    if (locationSlug === 'digital-marketing-agency-in-varanasi') {
      setCurrentPage('location-varanasi');
    } else if (locationSlug === 'digital-marketing-agency-in-prayagraj') {
      setCurrentPage('location-prayagraj');
    }
    setCurrentBlogSlug(null);
    window.location.hash = locationSlug;
    try {
      window.history.pushState(null, '', `/${locationSlug}`);
    } catch (e) {
      // Sandbox fallback
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

  // Find active blog post when viewing single blog post page
  const activeBlogPost =
    currentPage === 'blog-detail' && currentBlogSlug
      ? BLOG_POSTS_DATA.find(
          (p) => p.slug === currentBlogSlug || getSlugFromTitle(p.title) === currentBlogSlug
        ) || BLOG_POSTS_DATA[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage as PageType}
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onNavigateToBlogSlug={navigateToBlogSlug}
            onNavigateToLocation={navigateToLocation}
            onShowToast={handleShowToast}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {currentPage === 'blog' && (
          <BlogPage
            onNavigateToBlogSlug={navigateToBlogSlug}
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
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
            onShowToast={handleShowToast}
          />
        )}
        {currentPage === 'location-varanasi' && (
          <LocationPage
            locationKey="varanasi"
            onNavigate={navigateTo}
            onNavigateToLocation={navigateToLocation}
            onOpenBooking={handleOpenBooking}
            onShowToast={handleShowToast}
          />
        )}
        {currentPage === 'location-prayagraj' && (
          <LocationPage
            locationKey="prayagraj"
            onNavigate={navigateTo}
            onNavigateToLocation={navigateToLocation}
            onOpenBooking={handleOpenBooking}
            onShowToast={handleShowToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onNavigateToLocation={navigateToLocation}
        onShowToast={handleShowToast}
      />

      {/* Booking / Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillData={bookingPrefill}
        onShowToast={handleShowToast}
      />

      {/* Floating Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
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
