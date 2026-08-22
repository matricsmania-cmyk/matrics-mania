'use client';

import React, { useState } from 'react';
import { getFastImageUrl, getResponsiveSrcSet } from '../utils/image';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthParam?: number;
  qualityParam?: number;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
  aspectRatioClass?: string;
  aspectRatio?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  widthParam = 800,
  qualityParam = 75,
  priority = false,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fit=crop&w=800&q=75&fm=webp',
  aspectRatioClass,
  aspectRatio,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  const targetSrc = hasError ? fallbackSrc : src;
  const optimizedSrc = getFastImageUrl(targetSrc, widthParam, qualityParam);
  const responsiveSrcSet = getResponsiveSrcSet(targetSrc, [360, 640, 960, 1280, 1600], qualityParam);

  const containerStyle: React.CSSProperties = {
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#0D1424]/40 ${aspectRatioClass || ''}`}
      style={containerStyle}
    >
      {/* Skeleton placeholder until loaded (only for non-priority images to avoid blocking LCP) */}
      {!priority && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E293B]/40 to-transparent animate-pulse z-0 pointer-events-none" />
      )}

      <img
        src={optimizedSrc}
        srcSet={responsiveSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'low'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) setHasError(true);
        }}
        className={`w-full h-full object-cover ${
          priority
            ? 'opacity-100'
            : `transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`
        } ${className}`}
        style={style}
        {...props}
      />
    </div>
  );
};

