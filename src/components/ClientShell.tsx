'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer, ToastMessage } from './Toast';
import { BookingModal } from './BookingModal';
import { ThemeProvider } from '../context/ThemeContext';
import { ContentContextProvider, CmsInitialData } from '../providers/ContentContext';
import { usePathname } from 'next/navigation';

export function ClientShell({
  initialData,
  children,
}: {
  initialData?: CmsInitialData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<any>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const purgeHash = () => {
        const hash = window.location.hash;
        if (hash && (hash.includes('core-services-section') || hash.includes('core-services') || hash.includes('services'))) {
          const cleanPath = (window.location.pathname || '/') + (window.location.search || '');
          try {
            window.history.replaceState(null, '', cleanPath);
          } catch (e) {}
          if (window.parent && window.parent !== window) {
            try {
              window.parent.postMessage({ type: 'navigation', url: cleanPath, path: cleanPath }, '*');
              window.parent.postMessage({ type: 'urlchange', url: cleanPath, path: cleanPath }, '*');
              window.parent.postMessage({ action: 'navigate', url: cleanPath, path: cleanPath }, '*');
            } catch (e) {}
          }
        }
      };

      purgeHash();
      window.addEventListener('hashchange', purgeHash);
      return () => {
        window.removeEventListener('hashchange', purgeHash);
      };
    }
  }, [pathname]);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const handleOpenBooking = (prefillInfo?: any) => {
    setBookingPrefill(prefillInfo);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleShowToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ThemeProvider>
      <ContentContextProvider initialData={initialData}>
        <Navbar
          currentPath={pathname || '/'}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
        <main className="flex-grow">{children}</main>
        <Footer onNavigate={handleNavigate} showIntelBanner={pathname !== '/' && pathname !== ''} />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          prefillData={bookingPrefill}
          onShowToast={handleShowToast}
        />
      </ContentContextProvider>
    </ThemeProvider>
  );
}
