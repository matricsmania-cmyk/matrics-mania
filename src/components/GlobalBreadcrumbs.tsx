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

export const GlobalBreadcrumbs: React.FC<GlobalBreadcrumbsProps> = ({
  currentPath = '/',
  customItems,
  onNavigate,
  className = '',
}) => {
  // If on homepage or about page, don't display breadcrumbs
  const normalizedPath = (currentPath || '').replace(/\/+$/, '') || '/';
  if ((normalizedPath === '/' || normalizedPath === '/about') && !customItems) {
    return null;
  }

  // Derive default breadcrumbs from currentPath
  const resolveBreadcrumbsFromPath = (path: string): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
    ];

    const segments = path.split('/').filter(Boolean);

    let accumulatedPath = '';
    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}/`;
      const isLast = index === segments.length - 1;

      // Format readable title
      let formattedLabel = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (segment === 'services') formattedLabel = 'Services';
      if (segment === 'industries') formattedLabel = 'Industries';
      if (segment === 'insights') formattedLabel = 'Insights';
      if (segment === 'locations') formattedLabel = 'Locations';
      if (segment === 'case-studies') formattedLabel = 'Case Studies';
      if (segment === 'about') formattedLabel = 'About';
      if (segment === 'work') formattedLabel = 'Work';
      if (segment === 'process') formattedLabel = 'Process';
      if (segment === 'careers') formattedLabel = 'Careers';
      if (segment === 'faq') formattedLabel = 'FAQ';
      if (segment === 'contact') formattedLabel = 'Contact';

      items.push({
        label: formattedLabel,
        href: accumulatedPath,
        isCurrent: isLast,
      });
    });

    return items;
  };

  const breadcrumbs = customItems || resolveBreadcrumbsFromPath(currentPath);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (onNavigate && href) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div
      className={`w-full border-b border-[#1E293B] bg-[#070B14]/80 backdrop-blur-sm py-2.5 ${className}`}
      aria-label="Breadcrumb Navigation"
    >
      <Container maxWidth="xl">
        <nav aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] overflow-x-auto no-scrollbar whitespace-nowrap list-none m-0 p-0"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1 || crumb.isCurrent;

              return (
                <li
                  key={idx}
                  className="flex items-center gap-1.5 shrink-0 list-none m-0 p-0"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {idx === 0 && (
                    <Home className="w-3 h-3 text-[#64748B] inline-block mr-0.5 shrink-0" />
                  )}

                  {isLast ? (
                    <span
                      className="text-white font-semibold flex items-center gap-1"
                      itemProp="name"
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href || '#'}
                      onClick={(e) => handleClick(e, crumb.href)}
                      className="hover:text-white transition-colors cursor-pointer text-[#94A3B8]"
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </a>
                  )}

                  <meta itemProp="position" content={String(idx + 1)} />

                  {!isLast && (
                    <ChevronRight
                      className="w-3 h-3 text-[#475569] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
};
