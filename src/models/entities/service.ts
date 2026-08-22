import { BaseContentEntity } from '../base';
import { ServiceRelationships } from '../relationships';
import { FAQ } from '../faq';
import { CTA } from '../cta';
import { Testimonial } from '../testimonial';

export type ServiceCategory =
  | 'Search & Organic Architecture'
  | 'Paid Media & Demand Systems'
  | 'Engineering & Platform CRO'
  | 'Brand Identity & Visual Engine';

export interface ServiceMetric {
  label: string;
  value: string;
  timeframe?: string;
  sourceBenchmark?: string;
}

export interface ServiceProcessStep {
  step: string; // e.g. "01"
  title: string;
  duration: string;
  description: string;
  keyOutputs: string[];
}

export type ProcessPhase = ServiceProcessStep;

export interface ServiceDeliverable {
  title: string;
  category: string;
  specifications: string[];
  cadence: 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'One-Time';
}

export interface ServiceToolchainItem {
  name: string;
  purpose: string;
  category: 'Telemetry' | 'Analytics' | 'Infrastructure' | 'Creative' | 'Automation';
}

export interface ServiceDiagnosisSymptom {
  code?: string; // e.g. "SYM-01"
  title: string;
  description: string;
  impact?: string;
  remediation?: string;
}

export interface ServiceDiagnosis {
  headline?: string;
  summary?: string;
  symptoms: ServiceDiagnosisSymptom[];
}

export interface ServicePillar {
  pillarNumber: string; // e.g. "01", "02", "03", "04"
  title: string;
  subtitle?: string;
  description: string;
  capabilities: string[];
  outcome?: string;
}

export interface ServiceEconomics {
  modelTitle?: string;
  description?: string;
  benchmarkMetrics?: ServiceMetric[];
  formulas?: Array<{
    name: string;
    formula: string;
    explanation: string;
  }>;
}

/**
 * Service Domain Model
 * Supports complete growth services architecture and bidirectional relations to Industries, Insights, and Case Studies.
 */
export interface Service extends BaseContentEntity<ServiceRelationships> {
  serviceCode: string; // e.g. "SRV-SEO-01"
  category: ServiceCategory;
  categorySlug: string;
  iconName: string;
  shortDescription: string;
  tagline: string;
  positioningStatement?: string;
  whyTraditionalFails?: string;
  diagnosis?: ServiceDiagnosis;
  fourPillars?: ServicePillar[];
  economics?: ServiceEconomics;
  deliverablesSummary: string[];
  metrics: ServiceMetric[];
  processPhases: ServiceProcessStep[];
  deliverableList: ServiceDeliverable[];
  toolchain: ServiceToolchainItem[];
  priceStartingMonthly?: string;
  recommendedFor: string[];
  idealClientProfile?: string;
  slaCommitment?: string;
  faqs?: FAQ[];
  testimonials?: Testimonial[];
  cta?: CTA;
}
