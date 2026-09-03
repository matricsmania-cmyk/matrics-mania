import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';
import { ClientShell } from '../components/ClientShell';
import { getStaticRouteSeo } from '../utils/seo';
import { toNextMetadata } from '../utils/nextMetadata';

import type { Metadata } from 'next';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://matricsmania.com'),
  title: {
    default: "MatricsMania - India's #1 Performance Digital Marketing Agency | SEO, PPC & Growth",
    template: '%s',
  },
  description:
    "MatricsMania is India's leading performance digital marketing agency specializing in 100% On-Page SEO, high-ROAS PPC advertising, CRO web development, and real-time revenue attribution engines.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`dark ${plusJakartaSans.variable}`}>
      <body className={`bg-[#070B14] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col ${plusJakartaSans.className}`}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
