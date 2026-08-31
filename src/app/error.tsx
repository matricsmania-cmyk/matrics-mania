'use client';

import React from 'react';

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">Something went wrong</h1>
      <p className="text-slate-400 mb-8 max-w-md">An unexpected error occurred. Please try again.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
