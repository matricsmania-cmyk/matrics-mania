import { BaseContentEntity } from '../base';
import { InsightRelationships } from '../relationships';
import { Author } from '../author';
import { CTA } from '../cta';

export type InsightCategory =
  | 'Industry Intelligence'
  | 'Search Architecture'
  | 'Paid Demand Science'
  | 'Conversion Engineering'
  | 'B2B Growth Playbooks';

export type InsightContentType =
  | 'Guide'
  | 'Analysis'
  | 'Research'
  | 'Framework'
  | 'Case Learning'
  | 'Whitepaper'
  | 'Opinion';

export interface InsightSection {
  id: string;
  title: string;
  content: string;
  subtitle?: string;
  keyPoints?: string[];
  quote?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  diagram?: {
    type: 'flow' | 'comparison' | 'matrix' | 'steps';
    title: string;
    items: { label: string; description: string; tag?: string }[];
  };
}

export interface OriginalStudyData {
  sampleSize: string;
  timeframe: string;
  methodology: string;
  stats: { label: string; value: string; note: string }[];
}

/**
 * Insight Domain Model (Canonical Research, Whitepapers, Engineering Articles)
 * Supports rich editorial sections and bidirectional relations to Services, Industries, and Locations.
 */
export interface Insight extends BaseContentEntity<InsightRelationships> {
  standfirst?: string;
  category: InsightCategory | string;
  categorySlug: string;
  contentType: InsightContentType;
  author: Author;
  reviewer?: {
    name: string;
    role: string;
    avatar?: string;
  };
  readingTimeMinutes: number;
  wordCount: number;
  sections?: InsightSection[];
  tags: string[];
  keyTakeaways: string[];
  originalStudyData?: OriginalStudyData;
  cta?: CTA;
}
