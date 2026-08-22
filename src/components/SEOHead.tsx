'use client';

import React, { useEffect } from 'react';
import { SEOMetadataInput, SEOResolved, resolveSeoMetadata } from '../utils/seo';
import { generateCompleteSchemaGraph } from '../utils/structuredData';
import { SEO } from '../models/seo';
import { BreadcrumbItem } from '../models/breadcrumb';

export interface SEOHeadProps {
  // Can pass a resolved SEO object, raw input options, or individual props
  seo?: SEOResolved | SEOMetadataInput | Partial<SEO>;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile' | 'business.business';
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  pageType?: 'home' | 'about' | 'service' | 'industry' | 'location' | 'insight' | 'case-study' | 'faq' | 'contact' | 'profile' | 'static';
  entity?: any;
  faqs?: any[];
  schema?: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Universal SEO Head Component
 * Dynamically synchronizes document head, Open Graph, Twitter cards, canonical tags,
 * robots directives, and Schema.org JSON-LD structured data.
 */
export const SEOHead: React.FC<SEOHeadProps> = (props) => {
  // Resolve unified metadata
  const resolvedSeo: SEOResolved = React.useMemo(() => {
    // If already resolved
    if (props.seo && 'robotsString' in props.seo && 'openGraph' in props.seo) {
      return props.seo as SEOResolved;
    }

    // Merge individual props with input object
    const input: SEOMetadataInput = {
      ...(props.seo as SEOMetadataInput),
      title: props.title || (props.seo as SEOMetadataInput)?.title,
      description: props.description || (props.seo as SEOMetadataInput)?.description,
      canonicalUrl: props.canonicalUrl || (props.seo as SEOMetadataInput)?.canonicalUrl,
      ogType: props.ogType || (props.seo as SEOMetadataInput)?.ogType,
      ogImage: props.ogImage || (props.seo as SEOMetadataInput)?.ogImage,
      noindex: props.noindex ?? (props.seo as SEOMetadataInput)?.noindex,
      nofollow: props.nofollow ?? (props.seo as SEOMetadataInput)?.nofollow,
      breadcrumbs: props.breadcrumbs || (props.seo as SEOMetadataInput)?.breadcrumbs,
      structuredData: props.schema || (props.seo as SEOMetadataInput)?.structuredData,
      entityData: props.entity || (props.seo as SEOMetadataInput)?.entityData,
    };

    return resolveSeoMetadata(input);
  }, [
    props.seo,
    props.title,
    props.description,
    props.canonicalUrl,
    props.ogType,
    props.ogImage,
    props.noindex,
    props.nofollow,
    props.breadcrumbs,
    props.schema,
    props.entity,
  ]);

  // Generate structured data schema graph
  const computedSchema = React.useMemo(() => {
    if (props.schema) return props.schema;
    if (resolvedSeo.structuredData) return resolvedSeo.structuredData;

    return generateCompleteSchemaGraph({
      canonicalUrl: resolvedSeo.canonicalUrl,
      title: resolvedSeo.title,
      description: resolvedSeo.description,
      pageType: props.pageType,
      breadcrumbs: resolvedSeo.breadcrumbs,
      entity: props.entity,
      faqs: props.faqs,
    });
  }, [props.schema, resolvedSeo, props.pageType, props.entity, props.faqs]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Set Document Title & HTML Language
    document.title = resolvedSeo.title;
    if (resolvedSeo.lang) {
      document.documentElement.lang = resolvedSeo.lang;
    }

    // 2. Helper to set/update meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('title', resolvedSeo.title);
    setMetaTag('description', resolvedSeo.description);
    if (resolvedSeo.keywords && resolvedSeo.keywords.length > 0) {
      setMetaTag('keywords', resolvedSeo.keywords.join(', '));
    }
    setMetaTag('robots', resolvedSeo.robotsString);
    setMetaTag('theme-color', resolvedSeo.themeColor);

    // OpenGraph
    setMetaTag('og:title', resolvedSeo.openGraph.title, true);
    setMetaTag('og:description', resolvedSeo.openGraph.description, true);
    setMetaTag('og:url', resolvedSeo.openGraph.url, true);
    setMetaTag('og:type', resolvedSeo.openGraph.type, true);
    setMetaTag('og:image', resolvedSeo.openGraph.image, true);
    setMetaTag('og:site_name', resolvedSeo.openGraph.siteName, true);
    setMetaTag('og:locale', resolvedSeo.openGraph.locale, true);

    if (resolvedSeo.openGraph.publishedTime) {
      setMetaTag('article:published_time', resolvedSeo.openGraph.publishedTime, true);
    }
    if (resolvedSeo.openGraph.modifiedTime) {
      setMetaTag('article:modified_time', resolvedSeo.openGraph.modifiedTime, true);
    }
    if (resolvedSeo.openGraph.section) {
      setMetaTag('article:section', resolvedSeo.openGraph.section, true);
    }

    // Twitter / X
    setMetaTag('twitter:card', resolvedSeo.twitter.card);
    setMetaTag('twitter:site', resolvedSeo.twitter.site);
    setMetaTag('twitter:creator', resolvedSeo.twitter.creator);
    setMetaTag('twitter:title', resolvedSeo.twitter.title);
    setMetaTag('twitter:description', resolvedSeo.twitter.description);
    setMetaTag('twitter:image', resolvedSeo.twitter.image);
    setMetaTag('twitter:url', resolvedSeo.canonicalUrl);

    // Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', resolvedSeo.canonicalUrl);

    // 3. Inject dynamic JSON-LD Schema
    const schemaId = 'matricsmania-structured-data';
    const existingScript = document.getElementById(schemaId);
    if (existingScript) {
      existingScript.remove();
    }

    if (computedSchema) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.id = schemaId;
      scriptTag.text = JSON.stringify(computedSchema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      const scriptToRemove = document.getElementById(schemaId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [resolvedSeo, computedSchema]);

  return null;
};
