'use client';

import React from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'hairline' | 'subtle' | 'dashed' | 'technical';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string | React.ReactNode;
  className?: string;
  id?: string;
}

const variantStyles: Record<DividerVariant, string> = {
  hairline: 'border-[#1E293B]',
  subtle: 'border-white/5',
  dashed: 'border-[#1E293B] border-dashed',
  technical: 'border-[#1E293B]',
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'hairline',
  label,
  className = '',
  id,
  ...rest
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        id={id}
        className={`inline-block h-auto self-stretch border-l ${variantStyles[variant]} ${className}`}
        role="separator"
        aria-orientation="vertical"
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div
        id={id}
        className={`relative flex items-center py-4 ${className}`}
        role="separator"
        aria-orientation="horizontal"
        {...rest}
      >
        <div className={`flex-grow border-t ${variantStyles[variant]}`} />
        <span className="shrink-0 px-3 font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
          {label}
        </span>
        <div className={`flex-grow border-t ${variantStyles[variant]}`} />
      </div>
    );
  }

  return (
    <hr
      id={id}
      className={`w-full border-0 border-t ${variantStyles[variant]} my-4 ${className}`.trim()}
      {...rest}
    />
  );
};
