'use client';

import React from 'react';
import { Container, ContainerMaxWidth } from './Container';

export type SectionVariant = 'canvas' | 'surface' | 'elevated' | 'subtle' | 'transparent';
export type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  borderTop?: boolean;
  borderBottom?: boolean;
  withContainer?: boolean;
  containerMaxWidth?: ContainerMaxWidth;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const variantStyles: Record<SectionVariant, string> = {
  canvas: 'bg-[#070B14] text-white',
  surface: 'bg-[#0D1424] text-white',
  elevated: 'bg-[#131D33] text-white',
  subtle: 'bg-[#090E1A] text-white',
  transparent: 'bg-transparent text-white',
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: 'py-0',
  xs: 'py-4 md:py-6',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
};

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'canvas',
  spacing = 'lg',
  borderTop = false,
  borderBottom = false,
  withContainer = false,
  containerMaxWidth = 'xl',
  className = '',
  id,
  as: Component = 'section',
  ...rest
}) => {
  const borderClasses = `${borderTop ? 'border-t border-[#1E293B]' : ''} ${
    borderBottom ? 'border-b border-[#1E293B]' : ''
  }`.trim();

  const content = withContainer ? (
    <Container maxWidth={containerMaxWidth}>{children}</Container>
  ) : (
    children
  );

  return (
    <Component
      id={id}
      className={`relative w-full ${variantStyles[variant]} ${spacingStyles[spacing]} ${borderClasses} ${className}`}
      {...rest}
    >
      {content}
    </Component>
  );
};
