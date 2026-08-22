import { PUBLIC_DOMAIN } from './seo';

/**
 * Generates the production-grade robots.txt directives for MatricsMania.
 * 
 * Strict Directives:
 * - Public crawlers allowed across all canonical indexable marketing pages.
 * - Protects internal APIs, WordPress/headless CMS administrative endpoints, draft previews, and query parameters.
 * - Explicitly points to the single canonical sitemap at https://matricsmania.com/sitemap.xml (NOT CMS domain).
 */
export function generateRobotsTxt(host: string = PUBLIC_DOMAIN): string {
  const cleanHost = host.replace(/\/+$/, '');

  return `# ==============================================================================
# MatricsMania Public Robots Directives
# Canonical Host: ${cleanHost}
# Environment: Production Edge
# ==============================================================================

User-agent: *
Allow: /

# Protected API & Headless System Endpoints
Disallow: /api/
Disallow: /api/*

# Protected Administrative & CMS Backdoors
Disallow: /admin/
Disallow: /admin/*
Disallow: /wp-admin/
Disallow: /wp-admin/*
Disallow: /wp-login.php
Disallow: /wp-json/
Disallow: /wp-json/*
Disallow: /xmlrpc.php

# Protected Draft, Preview, and Staging Envelopes
Disallow: /preview/
Disallow: /preview/*
Disallow: /draft/
Disallow: /draft/*
Disallow: /staging/
Disallow: /private/

# Disallow Crawling Internal Query Parameters & Search Filter Combinations
Disallow: /*?*q=
Disallow: /*?*query=
Disallow: /*?*preview=
Disallow: /*?*token=
Disallow: /*?*session=
Disallow: /*?*filter=
Disallow: /*?*sort=
Disallow: /*?*utm_*
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

# Canonical Sitemap Declaration
Sitemap: ${cleanHost}/sitemap.xml
Host: ${cleanHost}
`;
}
