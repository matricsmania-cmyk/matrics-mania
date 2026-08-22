import React from 'react';
import '../index.css';
import { ClientShell } from '../components/ClientShell';
import { getStaticRouteSeo } from '../utils/seo';
import { toNextMetadata } from '../utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('home'));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="dark">
      <head>
        <link rel="icon" type="image/webp" href="/matrics-mania-logo-dark.webp" />
      </head>
      <body className="bg-[#070B14] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
