import { BaseContentEntity } from '../base';
import { LocationRelationships } from '../relationships';
import { OfficeNode } from '../contact';
import { FAQ } from '../faq';
import { CTA } from '../cta';
import { Testimonial } from '../testimonial';

export interface LocalMarketDriver {
  title: string;
  metric: string;
  description: string;
}

export interface RegionalClientProof {
  clientName: string;
  industry: string;
  resultMetric: string;
  locationArea: string;
  slug?: string;
}

export interface LocationOperatingLogistics {
  officeAddress?: string;
  directions?: string;
  transportInfo?: string;
  securityProtocol?: string;
  discoveryWorkshopCapacity?: string;
  keyOnSiteCapabilities?: string[];
}

export interface GeographicRelevanceData {
  ecosystemDensity: string;
  talentPool: string;
  timeZoneOverlap: string;
  strategicAdvantages: string[];
  crossBorderConnectivity?: string;
}

/**
 * Location Domain Model
 * Supports regional geographic hubs and bidirectional relations to Services, Industries, and Insights.
 */
export interface Location extends BaseContentEntity<LocationRelationships> {
  locationCode: string; // e.g. "LOC-BLR-01"
  city: string;
  stateOrRegion: string;
  country: string;
  countryCode: string; // ISO 2-letter, e.g. "IN", "US", "AE"
  hubType: 'Headquarters & Core Engineering' | 'Regional Growth Hub' | 'Strategic Data Node';
  officeNode: OfficeNode;
  localMarketSummary: string;
  marketDrivers: LocalMarketDriver[];
  regionalClients: RegionalClientProof[];
  targetSectors: string[];
  supportedLanguages: string[];
  localTimeZone: string;
  
  // Extended Location Fields
  operatingLogistics?: LocationOperatingLogistics;
  geographicRelevance?: GeographicRelevanceData;

  faqs?: FAQ[];
  testimonials?: Testimonial[];
  cta?: CTA;
}

