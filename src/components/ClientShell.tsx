'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlobalBreadcrumbs } from './GlobalBreadcrumbs';
import { ToastContainer, ToastMessage } from './Toast';
import { CookieConsent } from './CookieConsent';
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
        <GlobalBreadcrumbs currentPath={pathname || '/'} onNavigate={handleNavigate} />
        <main className="flex-grow">{children}</main>
        <Footer onNavigate={handleNavigate} />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
        <CookieConsent />
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
