'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ContentProvider } from './ContentProvider';
import { wordPressProvider, WordPressProvider } from './WordPressProvider';

interface ContentContextValue {
  provider: ContentProvider;
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue>({
  provider: wordPressProvider,
  isSyncing: false,
  lastSyncedAt: null,
  refreshContent: async () => {},
});

export const ContentContextProvider: React.FC<{
  provider?: ContentProvider;
  children: React.ReactNode;
}> = ({ provider = wordPressProvider, children }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [version, setVersion] = useState(0);

  const refreshContent = useCallback(async () => {
    if (typeof window === 'undefined') return;
    setIsSyncing(true);
    try {
      const res = await fetch('/api/content?refresh=true', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && provider instanceof WordPressProvider) {
          if (Array.isArray(json.data.services) && json.data.services.length > 0) {
            provider.setServicesCache(json.data.services);
          }
          if (Array.isArray(json.data.industries) && json.data.industries.length > 0) {
            provider.setIndustriesCache(json.data.industries);
          }
          if (Array.isArray(json.data.locations) && json.data.locations.length > 0) {
            provider.setLocationsCache(json.data.locations);
          }
          if (Array.isArray(json.data.caseStudies) && json.data.caseStudies.length > 0) {
            provider.setCaseStudiesCache(json.data.caseStudies);
          }
          if (Array.isArray(json.data.insights) && json.data.insights.length > 0) {
            provider.setInsightsCache(json.data.insights);
          }
          setLastSyncedAt(new Date());
          setVersion((v) => v + 1);
        }
      }
    } catch {
      // ignore client network hiccup
    } finally {
      setIsSyncing(false);
    }
  }, [provider]);

  // Sync on initial mount
  useEffect(() => {
    refreshContent();

    // Auto-sync when switching back to tab after editing WordPress
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshContent();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    // Expose global test/trigger method
    (window as any).__refreshWordPressContent = refreshContent;

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [refreshContent]);

  const value = useMemo(
    () => ({
      provider,
      isSyncing,
      lastSyncedAt,
      refreshContent,
      _version: version, // trigger re-render on sync
    }),
    [provider, isSyncing, lastSyncedAt, refreshContent, version]
  );

  return <ContentContext.Provider value={value as any}>{children}</ContentContext.Provider>;
};

export const useContentProvider = (): ContentProvider => {
  const context = useContext(ContentContext);
  if (!context) {
    return wordPressProvider;
  }
  return context.provider;
};

export const useContentSync = () => {
  const context = useContext(ContentContext);
  return {
    isSyncing: context?.isSyncing ?? false,
    lastSyncedAt: context?.lastSyncedAt ?? null,
    refreshContent: context?.refreshContent ?? (async () => {}),
  };
};
