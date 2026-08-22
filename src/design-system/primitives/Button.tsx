'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'mono';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2563EB] hover:bg-[#1D4ED8] text-white border border-[#2563EB]/40 shadow-sm shadow-blue-500/25 active:scale-[0.98]',
  secondary:
    'bg-[#0D1424] hover:bg-[#131D33] text-white border border-[#1E293B] hover:border-[#334155] active:scale-[0.98]',
  outline:
    'bg-transparent hover:bg-[#0D1424] text-[#CBD5E1] hover:text-white border border-[#1E293B] hover:border-[#60A5FA] active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-[#131D33]/60 text-[#94A3B8] hover:text-white border border-transparent active:scale-[0.98]',
  mono:
    'font-mono bg-[#0D1424] hover:bg-[#131D33] text-[#60A5FA] hover:text-white border border-[#1E293B] hover:border-[#2563EB] tracking-wider text-xs active:scale-[0.98]',
};

// Button horizontal padding must be exactly 2x vertical padding
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs font-semibold py-1.5 px-3 gap-1.5 rounded-md min-h-[32px]',
  md: 'text-xs sm:text-sm font-semibold py-2.5 px-5 gap-2 rounded-lg min-h-[42px]',
  lg: 'text-sm sm:text-base font-semibold py-3.5 px-7 gap-2.5 rounded-xl min-h-[50px]',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  iconLeading,
  iconTrailing,
  fullWidth = false,
  disabled = false,
  className = '',
  id,
  type = 'button',
  ...rest
}) => {
  const isInteractiveDisabled = disabled || isLoading;

  return (
    <button
      id={id}
      type={type}
      disabled={isInteractiveDisabled}
      className={`inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 cursor-pointer select-none font-sans ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${fullWidth ? 'w-full' : 'w-auto'} ${
        isInteractiveDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`.trim()}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : (
        iconLeading && <span className="shrink-0">{iconLeading}</span>
      )}
      <span>{children}</span>
      {!isLoading && iconTrailing && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
};
