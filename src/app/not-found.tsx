import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-slate-400 mb-8 max-w-md">The page or resource you are looking for does not exist or has been moved.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
        Return Home
      </a>
    </div>
  );
}
