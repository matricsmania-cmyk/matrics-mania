import React, { useState } from 'react';
import { getFastImageUrl } from '../utils/image';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthParam?: number;
  qualityParam?: number;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
  aspectRatioClass?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  widthParam = 600,
  qualityParam = 70,
  priority = false,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fit=crop&w=600&q=70&fm=webp',
  aspectRatioClass,
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const optimizedSrc = getFastImageUrl(hasError ? fallbackSrc : src, widthParam, qualityParam);

  return (
    <div className={`relative overflow-hidden bg-[#E9E5DC] dark:bg-[#2B2925] ${aspectRatioClass || ''}`}>
      {/* Pulse Skeleton placeholder until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D9D4CA]/30 dark:via-[#38352F]/40 to-transparent animate-pulse z-0" />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
        {...props}
      />
    </div>
  );
};
