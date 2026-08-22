'use client';

import React, { useState } from 'react';

export type ImageAspectRatio = '16:9' | '4:3' | '1:1' | '21:9' | 'auto';
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type ImageObjectFit = 'cover' | 'contain' | 'fill';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  radius?: ImageRadius;
  objectFit?: ImageObjectFit;
  caption?: string;
  overlay?: boolean;
  priority?: boolean;
  className?: string;
  id?: string;
}

const aspectRatioStyles: Record<ImageAspectRatio, string> = {
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '21:9': 'aspect-[21/9]',
  auto: '',
};

const radiusStyles: Record<ImageRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  radius = 'lg',
  objectFit = 'cover',
  caption,
  overlay = false,
  priority = false,
  className = '',
  id,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fitClass =
    objectFit === 'cover'
      ? 'object-cover'
      : objectFit === 'contain'
      ? 'object-contain'
      : 'object-fill';

  return (
    <figure id={id} className={`relative overflow-hidden w-full ${radiusStyles[radius]} ${className}`}>
      <div className={`relative w-full overflow-hidden bg-[#0D1424] ${aspectRatioStyles[aspectRatio]}`}>
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full ${fitClass} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...rest}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0D1424] border border-[#1E293B] text-center">
            <span className="font-mono text-xs text-[#64748B] uppercase tracking-wider">
              [Image Resource Unavailable]
            </span>
            <span className="text-xs text-[#94A3B8] mt-1 line-clamp-1">{alt}</span>
          </div>
        )}

        {overlay && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-60 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs font-mono text-[#94A3B8] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
