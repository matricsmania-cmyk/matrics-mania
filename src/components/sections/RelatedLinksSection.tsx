'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { EntityRef } from '../../models';
import { InternalLinkingGraph } from '../InternalLinkingGraph';

export type RelatedLinkItem = EntityRef | string;

export interface RelatedLinksSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  services?: RelatedLinkItem[];
  industries?: RelatedLinkItem[];
  insights?: RelatedLinkItem[];
  caseStudies?: RelatedLinkItem[];
  locations?: RelatedLinkItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

const normalizeItem = (item: RelatedLinkItem, basePath: string): EntityRef => {
  const isRootLevel = basePath === 'locations';
  if (typeof item === 'string') {
    const cleanSlug = item.replace(/^\/+|\/+$/g, '').replace(/^(services|industries|locations|insights|case-studies)\//, '');
    const title = cleanSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      id: cleanSlug,
      slug: cleanSlug,
      title,
      url: isRootLevel ? `/${cleanSlug}/` : `/${basePath}/${cleanSlug}/`,
    };
  }
  const cleanUrl = item.url
    ? (isRootLevel ? item.url.replace(/^\/locations\//, '/') : item.url)
    : (isRootLevel ? `/${item.slug}/` : `/${basePath}/${item.slug}/`);
  return {
    id: item.id || item.slug,
    slug: item.slug,
    title: item.title,
    url: cleanUrl,
    excerpt: item.excerpt,
    category: item.category,
  };
};

export const RelatedLinksSection: React.FC<RelatedLinksSectionProps> = ({
  title = 'Interconnected Growth Taxonomy',
  subtitle = 'Explore cross-domain engineering services, industry playbooks, regional nodes, and verified research mapped to this system.',
  badge = 'Relational Knowledge Graph',
  services = [],
  industries = [],
  insights = [],
  caseStudies = [],
  locations = [],
  onNavigate,
  className = '',
}) => {
  const normServices = services.map((s) => normalizeItem(s, 'services'));
  const normIndustries = industries.map((i) => normalizeItem(i, 'industries'));
  const normCaseStudies = caseStudies.map((c) => normalizeItem(c, 'case-studies'));
  const normInsights = insights.map((i) => normalizeItem(i, 'insights'));
  const normLocations = locations.map((l) => normalizeItem(l, 'locations'));

  return (
    <InternalLinkingGraph
      title={title}
      subtitle={subtitle}
      badge={badge}
      services={normServices}
      industries={normIndustries}
      locations={normLocations}
      insights={normInsights}
      caseStudies={normCaseStudies}
      onNavigate={onNavigate}
      className={className}
    />
  );
};

