import { Media } from './media';
import { SEO } from './seo';

export type ContentStatus = 'published' | 'draft' | 'future' | 'archived' | 'pending';

/**
 * Base Content Entity Interface
 * Every domain entity (Page, Service, Industry, Location, CaseStudy, Insight)
 * strictly implements this contract.
 */
export interface BaseContentEntity<TRelationships = Record<string, any>> {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Structured HTML or rich markdown/block content
  featuredImage: Media;
  publishedAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  status: ContentStatus;
  seo: SEO;
  relationships: TRelationships;

  // Optional Common Telemetry & Metadata
  uri?: string; // e.g. "/services/technical-seo/"
  authorId?: string | number;
  wordCount?: number;
  readingTimeMinutes?: number;
  commentStatus?: 'open' | 'closed';
  menuOrder?: number;
  customFields?: Record<string, any>;
}
