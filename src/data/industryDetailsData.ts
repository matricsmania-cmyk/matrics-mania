import React from 'react';

export interface IndustryDetailData {
  slug: string;
  name: string;
  categoryBadge: string;
  tagline: string;
  overview: string;
  heroMetrics: { label: string; value: string }[];
  challenges: { problem: string; solution: string }[];
  playbooks: { title: string; desc: string }[];
  caseStudyPreview: {
    client: string;
    result: string;
    description: string;
  };
  keyChannels: string[];
  faqs: { question: string; answer: string }[];
}

export const INDUSTRY_SLUGS = [
  'real-estate',
  'healthcare',
  'education',
  'finance',
  'saas',
  'legal',
  'hospitality',
  'luxury',
  'professional-services',
] as const;

export type IndustrySlug = typeof INDUSTRY_SLUGS[number];

export const INDUSTRY_DETAILS: Record<string, IndustryDetailData> = {
  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate & Property Developers',
    categoryBadge: 'High-Ticket Lead Generation & Site Visits',
    tagline: 'Scale verified high-net-worth buyer inquiries, weekend site visits, and rapid unit sales.',
    overview:
      'We engineer high-converting digital pipelines for luxury residential developments, commercial towers, gated communities, and real estate developers. From hyper-targeted Google Search ads targeting high-budget and NRI investors to immersive 3D interactive floorplans and automated CRM lead scoring.',
    heroMetrics: [
      { label: 'Cost Per Verified Site Visit', value: '-42%' },
      { label: 'Verified HNI Inquiries', value: '45,000+' },
      { label: 'Inventory Sold Value', value: '₹420+ Cr' },
    ],
    challenges: [
      {
        problem: 'High volume of unqualified, fake, or low-budget portal leads wasting sales teams’ time.',
        solution: 'Multi-step qualification funnels filtering by budget threshold, location preference, and purchase timeline before passing to CRM.',
      },
      {
        problem: 'Long sales cycles and high drop-offs between ad click and physical site visit.',
        solution: 'Instant automated WhatsApp booking bots, calendar syncing, and personalized 3D virtual site tour confirmations.',
      },
    ],
    playbooks: [
      {
        title: 'Hyperlocal GEO & NRI Target Strategy',
        desc: 'Custom-built radius bidding targeting tech corridors, corporate hubs, and high-income postal codes alongside GCC/US NRI buyer segments.',
      },
      {
        title: 'High-Converting Floorplan & VR Landing Pages',
        desc: 'Sub-second loading mobile landing pages featuring interactive 360° drone captures, unit configurations, and pricing calculators.',
      },
      {
        title: 'Google Map Pack & Neighborhood Dominance SEO',
        desc: 'Dominating local search rankings for "luxury apartments in [Location]" and project-specific name queries.',
      },
      {
        title: 'Automated WhatsApp & CRM Fast-Response Triggers',
        desc: 'Immediate two-way WhatsApp nurturing delivering brochures, location maps, and instant site visit scheduling.',
      },
    ],
    caseStudyPreview: {
      client: 'Apex Grandeur Luxury Residences',
      result: '120 Units Sold Out in 4 Months',
      description: 'Engineered a hyper-targeted paid search and Meta VR campaign generating ₹185 Cr in booked inventory with 6.4x ROAS.',
    },
    keyChannels: ['Google Search & PMax', 'Meta Direct Response', 'WhatsApp API Automation', 'Local SEO & Schema', 'YouTube Video Tours'],
    faqs: [
      {
        question: 'How do you guarantee lead quality over quantity in real estate?',
        answer: 'We deploy multi-tier form filters with OTP verification, minimum budget qualifying questions, and negative keyword lists that exclude rental or low-budget inquiries.',
      },
      {
        question: 'Can you integrate leads into our existing real estate CRM?',
        answer: 'Yes, we seamlessly integrate webhook triggers into Salesforce, LeadSquared, HubSpot, Sell.Do, and Zoho CRM in real-time.',
      },
    ],
  },
};
