'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '../design-system/primitives/Container';
import { BreadcrumbItem } from '../design-system/primitives/Breadcrumb';

export interface GlobalBreadcrumbsProps {
  currentPath?: string;
  customItems?: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

export const GlobalBreadcrumbs: React.FC<GlobalBreadcrumbsProps> = () => {
  return null;
};
