'use client';

import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'mono'
  | 'outline'
  | 'metric';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#131D33] text-[#CBD5E1] border border-[#1E293B]',
  accent: 'bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/30',
  success: 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30',
  warning: 'bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/30',
  error: 'bg-[#EF4444]/10 text-[#F87171] border border-[#EF4444]/30',
  mono: 'font-mono bg-[#0D1424] text-[#60A5FA] border border-[#1E293B] uppercase tracking-wider',
  outline: 'bg-transparent text-[#94A3B8] border border-[#1E293B]',
  metric: 'font-mono bg-[#070B14] text-[#10B981] border border-[#1E293B] font-bold',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] font-semibold py-0.5 px-2 gap-1 rounded',
  md: 'text-xs font-semibold py-1 px-2.5 gap-1.5 rounded-md',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[#94A3B8]',
  accent: 'bg-[#60A5FA]',
  success: 'bg-[#10B981]',
  warning: 'bg-[#F59E0B]',
  error: 'bg-[#EF4444]',
  mono: 'bg-[#60A5FA]',
  outline: 'bg-[#64748B]',
  metric: 'bg-[#10B981]',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
  id,
  ...rest
}) => {
  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center whitespace-nowrap select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
      {...rest}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
