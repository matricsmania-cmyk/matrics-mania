function cleanDomainUrl(val: string | undefined, defaultUrl: string): string {
  if (!val) return defaultUrl;
  let cleaned = val.trim();
  if (cleaned.includes('=')) {
    cleaned = cleaned.substring(cleaned.lastIndexOf('=') + 1).trim();
  }
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = defaultUrl;
  }
  cleaned = cleaned.replace(/\/$/, '');
  if (/^https?:\/\/matricsmania\.com$/i.test(cleaned)) {
    cleaned = 'https://www.matricsmania.com';
  }
  return cleaned;
}

export const PUBLIC_DOMAIN = cleanDomainUrl(process.env.NEXT_PUBLIC_SITE_URL, 'https://www.matricsmania.com');
export const CMS_DOMAIN = cleanDomainUrl(process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL, 'https://cms.matricsmania.com');
export const DEFAULT_SITE_NAME = 'MatricsMania';
export const DEFAULT_LOCALE = 'en_IN';
export const DEFAULT_LANG = 'en-IN';
export const TWITTER_SITE_HANDLE = '@matricsmania';
export const TWITTER_CREATOR_HANDLE = '@matricsmania';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
export const DEFAULT_FAVICON_DARK = '/matricsmania.webp';
export const DEFAULT_FAVICON_LIGHT = '/matricsmania.webp';
export const DEFAULT_THEME_COLOR = '#0136BD';
export const DEFAULT_TITLE = '#1 Best Digital Marketing Agency in India | Matrics Mania';
export const DEFAULT_DESCRIPTION = 'Metrics Mania is a results-driven digital marketing agency in India helping businesses grow with SEO, PPC, social media, content, and data-driven strategies.';
export const DEFAULT_KEYWORDS = [
  'digital marketing agency india',
  'performance marketing agency',
  'best SEO agency in india',
  'PPC management india',
  'CRO web development',
  'growth marketing agency',
  'bangalore seo agency',
  'ai search optimization',
  'revenue attribution',
];
