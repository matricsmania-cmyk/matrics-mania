import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';
import { ClientShell } from '../components/ClientShell';
import { getStaticRouteSeo } from '../utils/seo';
import { toNextMetadata } from '../utils/nextMetadata';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata = toNextMetadata(getStaticRouteSeo('home'));

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
