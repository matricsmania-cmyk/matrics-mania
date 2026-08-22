'use client';

import React from 'react';
import { ChevronRight, Slash } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash';
  className?: string;
  id?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = 'chevron',
  className = '',
  id,
  ...rest
}) => {
  return (
    <nav
      id={id}
      aria-label="Breadcrumb"
      className={`py-2 overflow-x-auto ${className}`.trim()}
      {...rest}
    >
      <ol
        className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] whitespace-nowrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li
              key={index}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className="text-white font-semibold"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-white transition-colors cursor-pointer"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="hover:text-white transition-colors cursor-pointer"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span itemProp="name">{item.label}</span>
              )}

              <meta key={`meta-${index}`} itemProp="position" content={String(index + 1)} />

              {!isLast && (
                <span className="text-[#475569] shrink-0" aria-hidden="true">
                  {separator === 'chevron' ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                  ) : (
                    <Slash className="w-3 h-3" />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
