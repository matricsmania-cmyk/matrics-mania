'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ContentProvider } from './ContentProvider';
import { wordPressProvider, WordPressProvider } from './WordPressProvider';
import { Service, Industry, Location, CaseStudy, Insight } from '../models';

export interface CmsInitialData {
  services?: Service[];
  industries?: Industry[];
  locations?: Location[];
  caseStudies?: CaseStudy[];
  insights?: Insight[];
}

export interface ContentContextValue {
  provider: ContentProvider;
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  refreshContent: () => Promise<void>;
  services: Service[];
  industries: Industry[];
  locations: Location[];
  caseStudies: CaseStudy[];
  insights: Insight[];
}

const ContentContext = createContext<ContentContextValue>({
  provider: wordPressProvider,
  isSyncing: false,
  lastSyncedAt: null,
  refreshContent: async () => {},
  services: [],
  industries: [],
  locations: [],
  caseStudies: [],
  insights: [],
});

export const ContentContextProvider: React.FC<{
  provider?: ContentProvider;
  initialData?: CmsInitialData;
  children: React.ReactNode;
}> = ({ provider = wordPressProvider, initialData, children }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [version, setVersion] = useState(0);

  // Initialize state with initialData (from server SSR) or provider cache
  const [services, setServices] = useState<Service[]>(() => {
    if (initialData?.services && initialData.services.length > 0) return initialData.services;
    if (provider instanceof WordPressProvider) {
      const cached = provider.getServicesCache();
      if (cached && cached.length > 0) return cached;
    }
    return [];
  });

  const [industries, setIndustries] = useState<Industry[]>(() => {
    if (initialData?.industries && initialData.industries.length > 0) return initialData.industries;
    if (provider instanceof WordPressProvider) {
      const cached = provider.getIndustriesCache();
      if (cached && cached.length > 0) return cached;
    }
    return [];
  });

  const [locations, setLocations] = useState<Location[]>(() => {
    if (initialData?.locations && initialData.locations.length > 0) return initialData.locations;
    if (provider instanceof WordPressProvider) {
      const cached = provider.getLocationsCache();
      if (cached && cached.length > 0) return cached;
    }
    return [];
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    if (initialData?.caseStudies && initialData.caseStudies.length > 0) return initialData.caseStudies;
    if (provider instanceof WordPressProvider) {
      const cached = provider.getCaseStudiesCache();
      if (cached && cached.length > 0) return cached;
    }
    return [];
  });

  const [insights, setInsights] = useState<Insight[]>(() => {
    if (initialData?.insights && initialData.insights.length > 0) return initialData.insights;
    if (provider instanceof WordPressProvider) {
      const cached = provider.getInsightsCache();
      if (cached && cached.length > 0) return cached;
    }
    return [];
  });

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
        if (json.data) {
          if (Array.isArray(json.data.services)) {
            setServices(json.data.services);
            if (provider instanceof WordPressProvider) {
              provider.setServicesCache(json.data.services);
            }
          }
          if (Array.isArray(json.data.industries)) {
            setIndustries(json.data.industries);
            if (provider instanceof WordPressProvider) {
              provider.setIndustriesCache(json.data.industries);
            }
          }
          if (Array.isArray(json.data.locations)) {
            setLocations(json.data.locations);
            if (provider instanceof WordPressProvider) {
              provider.setLocationsCache(json.data.locations);
            }
          }
          if (Array.isArray(json.data.caseStudies)) {
            setCaseStudies(json.data.caseStudies);
            if (provider instanceof WordPressProvider) {
              provider.setCaseStudiesCache(json.data.caseStudies);
            }
          }
          if (Array.isArray(json.data.insights)) {
            setInsights(json.data.insights);
            if (provider instanceof WordPressProvider) {
              provider.setInsightsCache(json.data.insights);
            }
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

  // Sync on initial mount + auto-polling so newly created items in CMS reflect immediately
  useEffect(() => {
    refreshContent();

    // Auto-poll every 20 seconds so items created in CMS appear promptly without manual refresh
    const interval = setInterval(() => {
      refreshContent();
    }, 20000);

    // Auto-sync when switching back to tab after editing in WordPress admin
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshContent();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    // Expose global trigger for instantaneous manual refresh
    (window as any).__refreshWordPressContent = refreshContent;

    return () => {
      clearInterval(interval);
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
      services,
      industries,
      locations,
      caseStudies,
      insights,
      _version: version,
    }),
    [provider, isSyncing, lastSyncedAt, refreshContent, services, industries, locations, caseStudies, insights, version]
  );

  return <ContentContext.Provider value={value as any}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext);
  if (!context) {
    return {
      provider: wordPressProvider,
      isSyncing: false,
      lastSyncedAt: null,
      refreshContent: async () => {},
      services: [],
      industries: [],
      locations: [],
      caseStudies: [],
      insights: [],
    };
  }
  return context;
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
