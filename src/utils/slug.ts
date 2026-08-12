/**
 * Generates a clean URL slug using the first four words of the blog post's H1 / Title.
 */
export function getSlugFromTitle(title: string): string {
  if (!title) return '';

  // Replace ampersands with 'and' for clean reading
  const cleanTitle = title.replace(/&/g, 'and');

  // Extract first 4 words and sanitize non-alphanumeric characters
  const words = cleanTitle
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean);

  return words.join('-').toLowerCase();
}
