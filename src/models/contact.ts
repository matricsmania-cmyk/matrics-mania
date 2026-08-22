import { Media } from './media';
import { SchemaPostalAddress, SchemaGeoCoordinates } from './structuredData';
export type {
  ContactQualificationData,
  ContactSubmissionResult,
  ContactSubmissionProvider,
} from '../services/contactSubmissionService';

export interface OfficeNode {
  id: string;
  nodeCode: string; // e.g. 'BLR-HQ', 'SFO-NODE'
  city: string;
  region: string;
  country: string;
  role: 'Global Headquarters & Core Lab' | 'Regional Growth Hub' | 'Strategic Data Node';
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  businessHours: string;
  googleMapsUrl?: string;
  image?: string | Media;
  isHeadquarters: boolean;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  github?: string;
  youtube?: string;
  instagram?: string;
}

export interface ContactInformation {
  companyName: string;
  legalEntityName: string;
  taxRegistrationNumber?: string; // GSTIN / EIN
  corporateEmail: string;
  admissionsEmail: string;
  securityEmail: string;
  pressEmail: string;
  primaryPhone: string;
  tollFreePhone?: string;
  headquarters: OfficeNode;
  regionalNodes: OfficeNode[];
  socials: SocialLinks;
  globalCoverageSummary: string;
  responseSLAHours: number;
}
