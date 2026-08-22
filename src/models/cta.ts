import { Media } from './media';

export type CTAVariant = 'blueprint' | 'elevated' | 'glass' | 'minimal' | 'sidebar';

export interface CTAButton {
  label: string;
  action: 'navigate' | 'openBooking' | 'download' | 'external';
  url?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  icon?: string;
  prefillInfo?: Record<string, any>;
}

export interface CTA {
  id?: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  badge?: {
    text: string;
    variant?: 'mono' | 'success' | 'amber' | 'blue';
  };
  variant?: CTAVariant;
  backgroundImage?: string | Media;
  guaranteeText?: string;
  contextBindings?: {
    serviceSlug?: string;
    industrySlug?: string;
    locationSlug?: string;
    caseStudySlug?: string;
  };
}
