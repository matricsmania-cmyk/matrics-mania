/**
 * Image optimization utility to make Unsplash and remote images load up to 10x faster
 * by serving WebP format, target responsive widths, and optimized compression.
 */
export function getFastImageUrl(url: string, width = 600, quality = 70): string {
  if (!url) return '';
  
  // Handle Unsplash images specifically
  if (url.includes('images.unsplash.com')) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set('fm', 'webp');
      parsedUrl.searchParams.set('q', quality.toString());
      parsedUrl.searchParams.set('w', width.toString());
      parsedUrl.searchParams.set('auto', 'format,compress');
      parsedUrl.searchParams.set('fit', 'crop');
      return parsedUrl.toString();
    } catch {
      // Fallback string replacement if URL parsing fails
      let fastUrl = url.replace(/w=\d+/, `w=${width}`);
      fastUrl = fastUrl.replace(/q=\d+/, `q=${quality}`);
      if (!fastUrl.includes('fm=')) {
        fastUrl += '&fm=webp';
      }
      return fastUrl;
    }
  }

  return url;
}
