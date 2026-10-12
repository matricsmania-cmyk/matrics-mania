'use client';

import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textColor?: string;
  textClassName?: string;
}

// Eager memory cache preloading
if (typeof window !== 'undefined') {
  const logoPreload = new Image();
  logoPreload.src = '/matricsmania.webp';
}

export const LogoSymbol: React.FC<{
  size?: number | string;
  className?: string;
  src?: string;
  lightSrc?: string;
  darkSrc?: string;
}> = ({
  size = 36,
  className = '',
  src = '/matricsmania.webp',
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        style={{ width: pixelSize, height: pixelSize }}
        className={`shrink-0 inline-flex items-center justify-center font-extrabold text-[#3B82F6] text-lg select-none ${className}`}
      >
        M
      </span>
    );
  }

  return (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative shrink-0 inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <img
        src={src}
        alt="MatricsMania Logo"
        loading="eager"
        decoding="sync"
        onError={() => setHasError(true)}
        style={{ width: pixelSize, height: pixelSize }}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps & { src?: string; lightSrc?: string; darkSrc?: string }> = ({
  className = '',
  size = 36,
  showText = true,
  textColor,
  textClassName = '',
  src = '/matricsmania.webp',
}) => {
  if (!showText) {
    return <LogoSymbol size={size} className={className} src={src} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoSymbol size={size} src={src} />

      <div className={`flex flex-col text-left ${textClassName}`}>
        <span
          className={`text-xl font-extrabold tracking-tight flex items-center gap-1 ${
            textColor || 'text-white'
          }`}
        >
          MatricsMania
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#8B5CF6]" />
        </span>
      </div>
    </div>
  );
};
