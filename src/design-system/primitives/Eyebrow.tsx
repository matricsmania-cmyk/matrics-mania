'use client';

import React from 'react';

export type EyebrowVariant = 'mono' | 'accent' | 'pill' | 'ghost';
export type EyebrowDotColor = 'blue' | 'green' | 'amber' | 'violet' | 'emerald';

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: EyebrowVariant;
  dot?: boolean;
  dotColor?: EyebrowDotColor;
  className?: string;
  id?: string;
}

const variantStyles: Record<EyebrowVariant, string> = {
  mono: 'font-mono text-[11px] sm:text-xs text-[#60A5FA] tracking-wider uppercase font-semibold inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1424] border border-[#1E293B]',
  accent: 'font-mono text-[11px] sm:text-xs text-[#60A5FA] tracking-wider uppercase font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30',
  pill: 'font-sans text-[11px] sm:text-xs text-[#CBD5E1] tracking-wider uppercase font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131D33] border border-[#1E293B]',
  ghost: 'font-mono text-[11px] sm:text-xs text-[#94A3B8] tracking-widest uppercase font-semibold inline-flex items-center gap-2',
};

const dotColorStyles: Record<EyebrowDotColor, string> = {
  blue: 'bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.6)]',
  green: 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]',
  emerald: 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]',
  amber: 'bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]',
  violet: 'bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.6)]',
};

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  variant = 'mono',
  dot = false,
  dotColor = 'blue',
  className = '',
  id,
  ...rest
}) => {
  return (
    <div id={id} className={`${variantStyles[variant]} ${className}`} {...rest}>
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColorStyles[dotColor]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
};
