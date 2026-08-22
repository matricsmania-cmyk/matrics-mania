import { Media } from '../media';

export type WorkProjectCategory =
  | 'Paid Creative & Ads'
  | 'Web & CRO'
  | 'SEO & Content Systems'
  | 'Brand & Motion';

export interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: WorkProjectCategory;
  industry: string;
  thumbnail: string | Media;
  summary: string;
  scope: string[];
  tools: string[];
  keyMetric: {
    value: string;
    label: string;
  };
  caseStudyId?: string;
  deliverables?: string[];
  liveUrl?: string;
}
