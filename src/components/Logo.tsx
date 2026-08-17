import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textColor?: string;
  textClassName?: string;
}

// Eager memory cache preloading for instantaneous theme switching
if (typeof window !== 'undefined') {
  const lightPreload = new Image();
  lightPreload.src = '/matrics-mania-logo-light.webp';
  const darkPreload = new Image();
  darkPreload.src = '/matrics-mania-logo-dark.webp';
}

export const LogoSymbol: React.FC<{
  size?: number | string;
  className?: string;
  lightSrc?: string;
  darkSrc?: string;
}> = ({
  size = 35,
  className = '',
  lightSrc = '/matrics-mania-logo-light.webp',
  darkSrc = '/matrics-mania-logo-dark.webp',
}) => {
  const { theme } = useTheme();
  const pixelSize = typeof size === 'number' ? `${size}px` : size;
  const isDark = theme === 'dark';

  const [lightError, setLightError] = useState(false);
  const [darkError, setDarkError] = useState(false);

  if ((isDark && darkError) || (!isDark && lightError)) {
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
      className={`relative shrink-0 inline-block transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      {/* Light Mode Logo */}
      <img
        src={lightSrc}
        alt="MatricsMania Logo"
        loading="eager"
        decoding="sync"
        onError={() => setLightError(true)}
        style={{ width: pixelSize, height: pixelSize }}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${
          isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Dark Mode Logo */}
      <img
        src={darkSrc}
        alt="MatricsMania Logo"
        loading="eager"
        decoding="sync"
        onError={() => setDarkError(true)}
        style={{ width: pixelSize, height: pixelSize }}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${
          isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps & { lightSrc?: string; darkSrc?: string }> = ({
  className = '',
  size = 35,
  showText = true,
  textColor,
  textClassName = '',
  lightSrc,
  darkSrc,
}) => {
  if (!showText) {
    return <LogoSymbol size={size} className={className} lightSrc={lightSrc} darkSrc={darkSrc} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoSymbol size={size} lightSrc={lightSrc} darkSrc={darkSrc} />

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


