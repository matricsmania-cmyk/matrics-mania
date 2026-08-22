/**
 * Media Domain Model
 * Decoupled from WordPress attachment/media structures.
 */

export type MediaType = 'image' | 'video' | 'document' | 'audio';

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: string;
}

export interface ImageVariant {
  url: string;
  width: number;
  height: number;
  filesize?: number;
  mimeType?: string;
}

export interface FocalPoint {
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
}

export interface Media {
  id: string | number;
  url: string;
  altText: string;
  title?: string;
  caption?: string;
  description?: string;
  mimeType: string;
  mediaType: MediaType;
  dimensions?: ImageDimensions;
  focalPoint?: FocalPoint;
  blurDataUrl?: string; // Base64 blur placeholder for performant hydration
  filesizeBytes?: number;
  sizes?: {
    thumbnail?: ImageVariant;
    medium?: ImageVariant;
    mediumLarge?: ImageVariant;
    large?: ImageVariant;
    full?: ImageVariant;
    webp?: ImageVariant;
    avif?: ImageVariant;
  };
}

/**
 * Helper to construct a fallback media object when an image URL string is provided
 */
export function createMediaFromUrl(url: string, altText = '', dimensions?: ImageDimensions): Media {
  return {
    id: `media-${Math.abs(url.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0))}`,
    url,
    altText,
    mimeType: url.endsWith('.svg') ? 'image/svg+xml' : url.endsWith('.png') ? 'image/png' : 'image/jpeg',
    mediaType: 'image',
    dimensions: dimensions || { width: 1200, height: 630, aspectRatio: '16:9' },
  };
}
