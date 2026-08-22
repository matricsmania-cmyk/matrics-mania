import { BaseContentEntity } from '../base';
import { CaseStudyRelationships } from '../relationships';
import { Media } from '../media';
import { CTA } from '../cta';

export interface CaseStudyMetric {
  metric: string; // e.g. "+340%"
  label: string; // e.g. "Qualified Pipeline"
  baseline?: string;
  achieved?: string;
  timeframe?: string;
}

export interface CaseStudyBeforeAfter {
  aspect: string;
  before: string;
  after: string;
  delta: string;
}

export interface ClientExecutive {
  name: string;
  role: string;
  avatar?: string | Media;
  linkedinUrl?: string;
}

export interface ArchitectureMilestone {
  phase: string;
  timeline: string;
  title: string;
  description: string;
  keyDeliverable: string;
}

/**
 * Case Study Domain Model
 * Supports quantified B2B client outcomes and bidirectional relations to Services and Industries.
 */
export interface CaseStudy extends BaseContentEntity<CaseStudyRelationships> {
  caseStudyCode: string; // e.g. "CS-VEL-01"
  clientName: string;
  clientIndustry: string;
  clientIndustrySlug: string;
  clientLogo: string | Media;
  heroHeadline: string;
  challengeSummary: string;
  solutionArchitecture: string;
  executiveSummary: string;
  results: CaseStudyMetric[];
  beforeAfterComparison: CaseStudyBeforeAfter[];
  milestones?: ArchitectureMilestone[];
  techStackDeployed: string[];
  testimonialQuote: string;
  clientAuthor: ClientExecutive | string; // Supports rich executive profile or plain name
  verifiedAuditReportUrl?: string;
  cta?: CTA;

  // Legacy field aliases for seamless UI compatibility
  industry?: string;
  challenge?: string;
  solution?: string;
  clientRole?: string;
  logo?: string;
  image?: string;
}
