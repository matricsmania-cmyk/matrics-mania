import { Media } from './media';
import { StructuredDataGraph } from './structuredData';

/**
 * Robots Meta Directives
 */
export type RobotsIndex = 'index' | 'noindex' | boolean;
export type RobotsFollow = 'follow' | 'nofollow' | boolean;

export interface RobotsDirectives {
  index: boolean;
  follow: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

/**
 * Open Graph Meta Specifications
 */
export interface OpenGraphMeta {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article' | 'profile' | 'business.business';
  siteName: string;
  locale: string;
  image: string | Media;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

/**
 * Twitter Card Meta Specifications
 */
export interface TwitterMeta {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image: string | Media;
  imageAlt?: string;
}

/**
 * Canonical SEO Domain Model
 * Consumed by UI head meta injectors, sitemap generators, and crawler indexers.
 */
export interface SEO {
  // Required Minimum Properties
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string | Media;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string | Media;

  // Extended Professional B2B SEO Properties
  metaKeywords?: string[];
  focusKeyphrase?: string;
  secondaryKeywords?: string[];
  robotsDirectives?: RobotsDirectives;
  openGraph?: OpenGraphMeta;
  twitter?: TwitterMeta;
  structuredData?: StructuredDataGraph;
  jsonLdRaw?: Record<string, any>[];
  alternateLanguages?: {
    hrefLang: string;
    href: string;
  }[];
  readingTimeMinutes?: number;
  wordCount?: number;
  breadcrumbsPath?: string;
}
