'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { ContentProvider } from './ContentProvider';
import { wordPressProvider } from './WordPressProvider';

interface ContentContextValue {
  provider: ContentProvider;
}

const ContentContext = createContext<ContentContextValue>({
  provider: wordPressProvider,
});

export const ContentContextProvider: React.FC<{
  provider?: ContentProvider;
  children: React.ReactNode;
}> = ({ provider = wordPressProvider, children }) => {
  const value = useMemo(() => ({ provider }), [provider]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContentProvider = (): ContentProvider => {
  const context = useContext(ContentContext);
  if (!context) {
    return wordPressProvider;
  }
  return context.provider;
};
