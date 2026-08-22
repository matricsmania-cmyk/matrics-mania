'use client';

import React from 'react';

/**
 * SkipToContent Component
 * Standard accessible skip link allowing screen reader and keyboard-only users
 * to bypass repetitive header navigation and jump directly to the main content area.
 */
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#2563EB] focus:text-white focus:font-semibold focus:text-xs focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#070B14] transition-all"
    >
      Skip to main content
    </a>
  );
};
