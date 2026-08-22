'use client';

import React from 'react';

export type StackDirection = 'vertical' | 'horizontal';
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const directionStyles: Record<StackDirection, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
};

const gapStyles: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

const alignStyles: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  id,
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      id={id}
      className={`flex ${directionStyles[direction]} ${gapStyles[gap]} ${alignStyles[align]} ${justifyStyles[justify]} ${
        wrap ? 'flex-wrap' : 'flex-nowrap'
      } ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
