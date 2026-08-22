'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { ContentProvider } from './ContentProvider';
import { mockDataProvider } from './MockDataProvider';

interface ContentContextValue {
  provider: ContentProvider;
}

const ContentContext = createContext<ContentContextValue>({
  provider: mockDataProvider,
});

export const ContentContextProvider: React.FC<{
  provider?: ContentProvider;
  children: React.ReactNode;
}> = ({ provider = mockDataProvider, children }) => {
  const value = useMemo(() => ({ provider }), [provider]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContentProvider = (): ContentProvider => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentProvider must be used within a ContentContextProvider');
  }
  return context.provider;
};
