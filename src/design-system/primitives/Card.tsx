'use client';

import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'subtle' | 'interactive' | 'blueprint' | 'bordered';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  interactive?: boolean;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[#0D1424] border border-[#1E293B] text-white shadow-sm',
  elevated: 'bg-[#131D33] border border-[#1E293B] text-white shadow-md',
  subtle: 'bg-[#090E1A] border border-[#1E293B] text-white',
  interactive:
    'bg-[#0D1424] border border-[#1E293B] hover:border-[#2563EB]/50 hover:bg-[#0F172A] text-white transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md',
  blueprint:
    'bg-[#0D1424] border border-[#1E293B] text-white relative before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#2563EB]/60 before:to-transparent',
  bordered: 'bg-transparent border border-[#1E293B] text-white',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6 lg:p-7',
  lg: 'p-6 sm:p-8 lg:p-10',
  xl: 'p-8 sm:p-10 lg:p-12',
};

const radiusStyles: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',     // 6px
  md: 'rounded-lg',     // 8px
  lg: 'rounded-xl',     // 12px
  xl: 'rounded-2xl',    // 16px (standard maximum for cards)
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  interactive = false,
  className = '',
  id,
  as: Component = 'div',
  ...rest
}) => {
  const resolvedVariant = interactive && variant === 'default' ? 'interactive' : variant;

  return (
    <Component
      id={id}
      className={`relative overflow-hidden ${variantStyles[resolvedVariant]} ${paddingStyles[padding]} ${radiusStyles[radius]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
