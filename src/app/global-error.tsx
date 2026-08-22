'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070B14] text-white p-8 font-sans">
        <div className="max-w-xl mx-auto space-y-4 border border-red-500/30 bg-[#0D1424] p-6 rounded-xl">
          <h2 className="text-xl font-bold text-red-400">Application Runtime Fault</h2>
          <p className="text-sm text-slate-300">{error?.message || 'An unhandled error occurred.'}</p>
          {error?.stack && (
            <pre className="p-3 bg-[#070B14] text-xs font-mono text-red-300 overflow-x-auto rounded">
              {error.stack}
            </pre>
          )}
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
