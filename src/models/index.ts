/**
 * MatricsMania Core Domain Model Library
 * 
 * Cleanly decouples UI components, static stores, and future Headless WordPress CMS integrations.
 * 
 * Data Flow Architecture:
 * 1. CMS API Response (REST/GraphQL) -> rawWpTypes
 * 2. Normalizers / Mappers -> normalizers.ts
 * 3. Domain Model Entities -> Page, Service, Industry, Location, CaseStudy, Insight, etc.
 * 4. UI Components consume pure Domain Models (0 WordPress implementation leakage).
 */

// Base & Media
export * from './base';
export * from './media';

// SEO & Structured Data
export * from './seo';
export * from './structuredData';
export * from './breadcrumb';

// Common Components & Metadata
export * from './author';
export * from './faq';
export * from './testimonial';
export * from './cta';
export * from './navigation';
export * from './contact';
export * from './relationships';

// Domain Entities
export * from './entities/page';
export * from './entities/service';
export * from './entities/industry';
export * from './entities/location';
export * from './entities/caseStudy';
export * from './entities/insight';
export * from './entities/workProject';


// Raw DTOs and Mappers
export * from './mappers/rawWpTypes';
export * from './mappers/normalizers';
export * from './mappers/schemaGenerators';
