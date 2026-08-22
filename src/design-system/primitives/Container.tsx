'use client';

import React from 'react';

export type ContainerMaxWidth = 'narrow' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: ContainerMaxWidth;
  padding?: ContainerPadding;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const maxWidthMap: Record<ContainerMaxWidth, string> = {
  narrow: 'max-w-[760px]',
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1200px]',
  '2xl': 'max-w-[1380px]',
  full: 'max-w-full',
};

const paddingMap: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = '',
  id,
  as: Component = 'div',
  ...rest
}) => {
  const resolvedMaxWidth = maxWidthMap[maxWidth] || maxWidthMap.xl;
  const resolvedPadding = paddingMap[padding] || paddingMap.md;

  return (
    <Component
      id={id}
      className={`w-full mx-auto ${resolvedMaxWidth} ${resolvedPadding} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
