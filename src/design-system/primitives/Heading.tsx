'use client';

import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize =
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
export type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type HeadingColor = 'primary' | 'secondary' | 'accent' | 'muted';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: HeadingColor;
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide';
  className?: string;
  as?: React.ElementType;
  id?: string;
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const sizeStyles: Record<HeadingSize, string> = {
  display1: 'text-4xl sm:text-6xl md:text-7xl leading-[1.08] tracking-[-0.035em]',
  display2: 'text-3xl sm:text-5xl md:text-6xl leading-[1.12] tracking-[-0.03em]',
  h1: 'text-2xl sm:text-4xl md:text-5xl leading-[1.15] tracking-[-0.025em]',
  h2: 'text-xl sm:text-3xl md:text-4xl leading-[1.2] tracking-[-0.02em]',
  h3: 'text-lg sm:text-2xl md:text-3xl leading-[1.25] tracking-[-0.015em]',
  h4: 'text-base sm:text-xl md:text-2xl leading-[1.3] tracking-[-0.01em]',
  h5: 'text-sm sm:text-lg md:text-xl leading-[1.35] tracking-[-0.005em]',
  h6: 'text-xs sm:text-base md:text-lg leading-[1.4] tracking-normal',
};

const weightStyles: Record<HeadingWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const colorStyles: Record<HeadingColor, string> = {
  primary: 'text-white',
  secondary: 'text-[#94A3B8]',
  accent: 'text-[#60A5FA]',
  muted: 'text-[#64748B]',
};

const trackingStyles = {
  tighter: 'tracking-[-0.04em]',
  tight: 'tracking-[-0.025em]',
  normal: 'tracking-normal',
  wide: 'tracking-[0.05em]',
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  size,
  weight = 'bold',
  color = 'primary',
  tracking,
  className = '',
  as,
  id,
  ...rest
}) => {
  const Component = as || (`h${level}` as React.ElementType);
  const resolvedSize = size || defaultSizeForLevel[level];
  const sizeClass = sizeStyles[resolvedSize];
  const weightClass = weightStyles[weight];
  const colorClass = colorStyles[color];
  const trackingClass = tracking ? trackingStyles[tracking] : '';

  return (
    <Component
      id={id}
      className={`font-sans ${sizeClass} ${weightClass} ${colorClass} ${trackingClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
