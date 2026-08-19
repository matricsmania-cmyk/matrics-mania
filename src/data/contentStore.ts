import { SERVICES_PAGE_DATA, ServicePageData } from './serviceTemplateData';
import { INDUSTRY_DETAILS, IndustryDetailData } from './industryDetailsData';
import { LOCATIONS_DATA, LocationDetailData } from './locationsData';
import { INSIGHTS_POSTS_DATA } from './insightsData';
import { CASE_STUDIES_STORE, CaseStudyDetailData } from './caseStudiesData';
import { WORK_PROJECTS_DATA, FAQS_DATA, TEAM_DATA, TESTIMONIALS_DATA } from './mockData';
import { BlogPost, WorkProject, FAQItem, TeamMember, Testimonial } from '../types';

/**
 * MatricsMania Central Content Repository
 * 
 * Future Headless WordPress Note:
 * This interface and provider layer maps 1:1 with future WordPress REST API CPTs:
 * - Services -> wp/v2/services
 * - Industries -> wp/v2/industries
 * - Locations -> wp/v2/locations
 * - Insights -> wp/v2/posts (or wp/v2/insights)
 * - Case Studies -> wp/v2/case-studies
 * 
 * Switching to WordPress in the future will only require swapping the implementation
 * of these getter methods to fetch from the WP REST API endpoints.
 */

// ==========================================
// 1. SERVICES
// ==========================================
export function getAllServices(): ServicePageData[] {
  return Object.values(SERVICES_PAGE_DATA);
}

export function getServiceBySlug(slug: string): ServicePageData | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return SERVICES_PAGE_DATA[normalized] || null;
}

// ==========================================
// 2. INDUSTRIES
// ==========================================
export function getAllIndustries(): IndustryDetailData[] {
  return Object.values(INDUSTRY_DETAILS);
}

export function getIndustryBySlug(slug: string): IndustryDetailData | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return INDUSTRY_DETAILS[normalized] || null;
}

// ==========================================
// 3. LOCATIONS
// ==========================================
export function getAllLocations(): LocationDetailData[] {
  return Object.values(LOCATIONS_DATA);
}

export function getLocationBySlug(slug: string): LocationDetailData | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return LOCATIONS_DATA[normalized] || null;
}

// ==========================================
// 4. INSIGHTS (Canonical Editorial)
// ==========================================
export function getAllInsights(): BlogPost[] {
  return INSIGHTS_POSTS_DATA;
}

export function getInsightBySlug(slug: string): BlogPost | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return INSIGHTS_POSTS_DATA.find((p) => p.slug.toLowerCase() === normalized) || null;
}

// ==========================================
// 5. CASE STUDIES
// ==========================================
export function getAllCaseStudies(): CaseStudyDetailData[] {
  return Object.values(CASE_STUDIES_STORE);
}

export function getCaseStudyBySlug(slug: string): CaseStudyDetailData | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return CASE_STUDIES_STORE[normalized] || null;
}

// ==========================================
// 6. WORK PROJECTS & MISC
// ==========================================
export function getAllWorkProjects(): WorkProject[] {
  return WORK_PROJECTS_DATA;
}

export function getWorkProjectBySlug(slug: string): WorkProject | null {
  const normalized = slug.trim().toLowerCase().replace(/\/+$/, '');
  return WORK_PROJECTS_DATA.find((p) => p.id.toLowerCase() === normalized) || null;
}

export function getAllFAQs(): FAQItem[] {
  return FAQS_DATA;
}

export function getAllTeamMembers(): TeamMember[] {
  return TEAM_DATA;
}

export function getAllTestimonials(): Testimonial[] {
  return TESTIMONIALS_DATA;
}
