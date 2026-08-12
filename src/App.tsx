import React, { useState, useEffect } from 'react';
import { PageType, BlogPost } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { BlogReaderModal } from './components/BlogReaderModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Sync page state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      if (['home', 'about', 'services', 'blog', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page;
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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onOpenBlogModal={(post) => setSelectedBlogPost(post)}
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
            onOpenBlogModal={(post) => setSelectedBlogPost(post)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onOpenBooking={() => handleOpenBooking()}
            onShowToast={handleShowToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} onShowToast={handleShowToast} />

      {/* Booking / Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillData={bookingPrefill}
        onShowToast={handleShowToast}
      />

      {/* Blog Post Reader Modal */}
      <BlogReaderModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
        onOpenBooking={() => handleOpenBooking()}
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
