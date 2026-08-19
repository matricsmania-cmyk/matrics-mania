export type PageType =
  | 'home'
  | 'services'
  | 'search'
  | 'industries'
  | 'locations'
  | 'work'
  | 'case-studies'
  | 'process'
  | 'careers'
  | 'faq'
  | 'blog'
  | 'company'
  | 'about'
  | 'contact';

export type BlogCategory =
  | 'Industry Intelligence';

export type BlogContentType =
  | 'Guide'
  | 'Analysis'
  | 'Research'
  | 'Framework'
  | 'Case Learning'
  | 'Opinion';

export interface BlogSection {
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  standfirst?: string;
  excerpt: string;
  content: string;
  sections?: BlogSection[];
  category: BlogCategory;
  contentType: BlogContentType;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  reviewer?: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  wordCount?: number;
  featuredImageUrl: string;
  tags: string[];
  keyTakeaways: string[];
  relatedServiceSlug?: string;
  relatedServiceName?: string;
  relatedIndustrySlug?: string;
  relatedIndustryName?: string;
  relatedCaseStudySlug?: string;
  originalStudyData?: {
    sampleSize: string;
    timeframe: string;
    methodology: string;
    stats: { label: string; value: string; note: string }[];
  };
  ctaContext?: {
    headline: string;
    subheadline: string;
    buttonText: string;
    serviceSlug?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  priceStarting: string;
  recommendedFor: string;
}

export interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: 'Paid Creative & Ads' | 'Web & CRO' | 'SEO & Content Systems' | 'Brand & Motion';
  industry: string;
  thumbnail: string;
  summary: string;
  scope: string[];
  tools: string[];
  keyMetric: {
    value: string;
    label: string;
  };
  beforeAfter?: {
    before: string;
    after: string;
  };
  caseStudyId?: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  logo: string;
  title: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonialQuote: string;
  clientAuthor: string;
  clientRole: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  specialties: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  metricHighlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Services' | 'Onboarding';
}

export interface AuditResult {
  domain: string;
  overallScore: number;
  seoScore: number;
  performanceScore: number;
  securityScore: number;
  conversionScore: number;
  issues: {
    type: 'critical' | 'warning' | 'pass';
    title: string;
    description: string;
  }[];
  estimatedTrafficBoost: string;
}

export interface QuoteRequest {
  services: string[];
  budget: string;
  timeline: string;
  domain: string;
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
}
