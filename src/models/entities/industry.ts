import { BaseContentEntity } from '../base';
import { IndustryRelationships } from '../relationships';
import { FAQ } from '../faq';
import { CTA } from '../cta';
import { Testimonial } from '../testimonial';

export interface IndustryChallenge {
  title: string;
  description: string;
  impactLevel: 'High' | 'Critical' | 'Severe';
  typicalCACWaste: string;
}

export interface IndustryPlaybookPillar {
  phase: string;
  title: string;
  actionItems: string[];
  expectedImpact: string;
}

export interface IndustryBenchmark {
  metric: string;
  industryAverage: string;
  matricsManiaEngineered: string;
  deltaPercent: string;
}

export interface AcquisitionChannel {
  name: string;
  shareOfMix: string;
  focus: string;
  metric: string;
}

export interface FunnelStageFlow {
  stage: string;
  action: string;
  dropoffRisk: string;
  engineeredFix: string;
}

export interface IndustryAcquisitionMechanics {
  overview: string;
  channels: AcquisitionChannel[];
  funnelStages: FunnelStageFlow[];
}

export interface IndustrySalesCycleStage {
  stage: string;
  duration: string;
  focus: string;
}

export interface IndustrySalesCycleInfo {
  typicalDuration: string;
  buyingCommitteeSize: string;
  primaryHesitation: string;
  keyDecisionMakers: string[];
  velocityCatalysts: string[];
  stageBreakdown?: IndustrySalesCycleStage[];
}

export interface IndustryUnitEconomicsData {
  averageACV: string;
  targetCAC: string;
  paybackPeriod: string;
  ltvToCacRatio: string;
  keyLever: string;
  economicsNotes?: string;
}

export interface IndustryBuyerPersona {
  role: string;
  focus: string;
  coreObjection: string;
  valueProposition: string;
}

export interface IndustryCustomerProfile {
  icpDefinition: string;
  targetCompanySize: string;
  keyTriggers: string[];
  buyerPersonas: IndustryBuyerPersona[];
  disqualificationSignals?: string[];
}

export interface IndustryServiceRecommendation {
  serviceSlug: string;
  serviceTitle?: string;
  rationale: string;
  priority: 'Critical Foundation' | 'Scale Driver' | 'Efficiency Multiplier';
  expectedTimeline: string;
}

/**
 * Industry Domain Model
 * Supports industry-specific growth playbooks and bidirectional relations to Services, Insights, and Case Studies.
 */
export interface Industry extends BaseContentEntity<IndustryRelationships> {
  industryCode: string; // e.g. "IND-RE-01"
  tagline: string;
  marketSummary: string;
  challenges: IndustryChallenge[];
  benchmarks: IndustryBenchmark[];
  playbookPillars: IndustryPlaybookPillar[];
  complianceStandards: string[]; // e.g. "RERA Compliant", "HIPAA/SOC2"
  typicalSalesCycle: string;
  averageACV: string;
  recommendedServicesSummary?: string;
  
  // Extended Domain Properties
  acquisitionMechanics?: IndustryAcquisitionMechanics;
  salesCycleInfo?: IndustrySalesCycleInfo;
  unitEconomicsData?: IndustryUnitEconomicsData;
  customerProfile?: IndustryCustomerProfile;
  serviceRecommendations?: IndustryServiceRecommendation[];
  
  faqs?: FAQ[];
  testimonials?: Testimonial[];
  cta?: CTA;
}

