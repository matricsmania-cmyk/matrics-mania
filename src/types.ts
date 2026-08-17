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
  | 'insights'
  | 'company'
  | 'about'
  | 'contact';

export interface InsightSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  dataPoints?: { label: string; value: string }[];
  quote?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface InsightItem {
  id: string;
  title: string;
  slug: string;
  category: 'Benchmark Report' | 'Industry Study' | 'ROI Audit' | 'Executive Whitepaper' | 'Market Data';
  type: 'Research Report' | 'Data Benchmark' | 'Market Teardown' | 'Whitepaper';
  excerpt: string;
  publishedAt: string;
  readTime: string;
  downloadablePdf?: string;
  keyMetrics: { label: string; value: string }[];
  featuredImageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  summaryPoints: string[];
  fullReportContent: string;
  sections?: InsightSection[];
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  quote?: string;
  codeSnippet?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  sections?: BlogSection[];
  category: 'SEO & Growth' | 'Paid Media' | 'AI Marketing' | 'Analytics' | 'Brand Strategy';
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: string;
  wordCount?: number;
  featuredImageUrl: string;
  tags: string[];
  keyTakeaways: string[];
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
