'use client';

import React from 'react';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: GridCols;
  colsSm?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  colsXl?: GridCols;
  gap?: GridGap;
  gapX?: GridGap;
  gapY?: GridGap;
  align?: GridAlign;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const colsDefaultMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

const gapMap: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10 sm:gap-12',
};

const gapXMap: Record<GridGap, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-2',
  sm: 'gap-x-4',
  md: 'gap-x-6',
  lg: 'gap-x-8',
  xl: 'gap-x-10 sm:gap-x-12',
};

const gapYMap: Record<GridGap, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-2',
  sm: 'gap-y-4',
  md: 'gap-y-6',
  lg: 'gap-y-8',
  xl: 'gap-y-10 sm:gap-y-12',
};

const alignMap: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  gapX,
  gapY,
  align = 'stretch',
  className = '',
  id,
  as: Component = 'div',
  ...rest
}) => {
  let colsClass = colsDefaultMap[cols];

  if (colsSm || colsMd || colsLg || colsXl) {
    const sm = colsSm ? `sm:grid-cols-${colsSm}` : '';
    const md = colsMd ? `md:grid-cols-${colsMd}` : '';
    const lg = colsLg ? `lg:grid-cols-${colsLg}` : '';
    const xl = colsXl ? `xl:grid-cols-${colsXl}` : '';
    colsClass = `grid-cols-${cols} ${sm} ${md} ${lg} ${xl}`.trim();
  }

  const gapClass = gapX || gapY
    ? `${gapX ? gapXMap[gapX] : ''} ${gapY ? gapYMap[gapY] : ''}`.trim()
    : gapMap[gap];

  return (
    <Component
      id={id}
      className={`grid ${colsClass} ${gapClass} ${alignMap[align]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
