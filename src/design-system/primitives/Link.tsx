'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export type LinkVariant = 'inline' | 'standalone' | 'nav' | 'mono' | 'discreet';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: LinkVariant;
  href?: string;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
  id?: string;
}

const variantStyles: Record<LinkVariant, string> = {
  inline: 'text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-4 decoration-[#60A5FA]/40 hover:decoration-[#60A5FA] transition-colors',
  standalone: 'text-sm font-semibold text-[#60A5FA] hover:text-white inline-flex items-center gap-1.5 transition-colors group',
  nav: 'text-sm font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer',
  mono: 'font-mono text-xs text-[#60A5FA] hover:text-white tracking-wider uppercase inline-flex items-center gap-1 transition-colors',
  discreet: 'text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors',
};

export const Link: React.FC<LinkProps> = ({
  children,
  variant = 'standalone',
  href = '#',
  external = false,
  showArrow = false,
  className = '',
  id,
  ...rest
}) => {
  const isExternal = external || href.startsWith('http');
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      id={id}
      href={href}
      className={`cursor-pointer ${variantStyles[variant]} ${className}`.trim()}
      {...externalProps}
      {...rest}
    >
      <span>{children}</span>
      {isExternal && !showArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 inline-block ml-0.5 opacity-70 shrink-0" />
      )}
      {showArrow && (
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </a>
  );
};
