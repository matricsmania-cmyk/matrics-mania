/**
 * Raw WordPress Headless REST API & GraphQL Response Types
 * 
 * IMPORTANT:
 * These types reflect raw WordPress JSON shapes (e.g., `wp/v2/*`, ACF, Yoast/RankMath, _embedded).
 * UI components NEVER consume these raw types directly.
 * Instead, they are transformed into clean Domain Models via normalizers.
 */

export interface RawWpRenderedString {
  rendered: string;
  raw?: string;
  protected?: boolean;
}

export interface RawWpMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface RawWpEmbeddedMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: RawWpRenderedString;
  author: number;
  caption: RawWpRenderedString;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details?: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, RawWpMediaSize>;
  };
  source_url: string;
}

export interface RawWpEmbeddedAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls?: Record<string, string>;
  acf?: {
    job_title?: string;
    department?: string;
    social_linkedin?: string;
    social_twitter?: string;
    social_github?: string;
    credentials?: string[];
    is_leadership?: boolean;
  };
}

export interface RawWpEmbeddedTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface RawWpYoastHeadJson {
  title?: string;
  description?: string;
  robots?: {
    index?: 'index' | 'noindex';
    follow?: 'follow' | 'nofollow';
    'max-snippet'?: string;
    'max-image-preview'?: string;
    'max-video-preview'?: string;
  };
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: {
    url: string;
    width?: number;
    height?: number;
    type?: string;
    alt?: string;
  }[];
  twitter_card?: 'summary' | 'summary_large_image';
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_creator?: string;
  twitter_site?: string;
  schema?: {
    '@context': string;
    '@graph': Record<string, any>[];
  };
}

export interface RawWpRankMathHeadJson {
  title?: string;
  description?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: { url: string }[];
  };
  twitter?: {
    title?: string;
    description?: string;
    card?: string;
    image?: string;
  };
}

export interface RawWpBasePost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: RawWpRenderedString;
  content: RawWpRenderedString;
  excerpt: RawWpRenderedString;
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: Record<string, any>;
  acf?: Record<string, any>;
  yoast_head_json?: RawWpYoastHeadJson;
  rank_math_seo?: RawWpRankMathHeadJson;
  _embedded?: {
    author?: RawWpEmbeddedAuthor[];
    'wp:featuredmedia'?: RawWpEmbeddedMedia[];
    'wp:term'?: RawWpEmbeddedTerm[][];
    'wp:relationships'?: {
      services?: RawWpBasePost[];
      industries?: RawWpBasePost[];
      locations?: RawWpBasePost[];
      insights?: RawWpBasePost[];
      case_studies?: RawWpBasePost[];
    }[];
  };
}

/**
 * Raw Service CPT (wp/v2/services)
 */
export interface RawWpServicePost extends RawWpBasePost {
  type: 'services';
  acf?: {
    // Live ACF REST field names used by WordPress Service payload
    servicecode?: string;
    category?: string;
    metatitle?: string;
    metadescription?: string;
    canonicalurl?: string;
    ogtitle?: string;
    ogdescription?: string;
    ogimage?: string;
    robotsindex?: boolean | string;
    robotsfollow?: boolean | string;

    // Backward-compatible fallback fields & extended metadata
    service_code?: string;
    category_slug?: string;
    icon_name?: string;
    short_description?: string;
    tagline?: string;
    deliverables_summary?: string[];
    metrics?: { label: string; value: string; timeframe?: string }[];
    process_phases?: { step: string; title: string; duration: string; description: string; key_outputs: string[] }[];
    deliverable_list?: { title: string; category: string; specifications: string[]; cadence: string }[];
    toolchain?: { name: string; purpose: string; category: string }[];
    price_starting_monthly?: string;
    recommended_for?: string[];
    sla_commitment?: string;
    // Relationships in ACF Post Objects
    related_industries?: (number | RawWpBasePost)[];
    related_insights?: (number | RawWpBasePost)[];
    related_case_studies?: (number | RawWpBasePost)[];
    faqs?: { question: string; answer: string; category?: string }[];
  };
}

/**
 * Raw Industry CPT (wp/v2/industries)
 */
export interface RawWpIndustryPost extends RawWpBasePost {
  type: 'industries';
  acf?: {
    // Live ACF REST field names used by WordPress Industry payload
    industrycode?: string;
    tagline?: string;
    marketsummary?: string;
    metatitle?: string;
    metadescription?: string;
    canonicalurl?: string;
    ogtitle?: string;
    ogdescription?: string;
    ogimage?: string;
    robotsindex?: boolean | string;
    robotsfollow?: boolean | string;

    // Backward-compatible fallback fields
    industry_code?: string;
    market_summary?: string;
    challenges?: { title: string; description: string; impact_level: string; typical_cac_waste: string }[];
    benchmarks?: { metric: string; industry_average: string; matrics_mania_engineered: string; delta_percent: string }[];
    playbook_pillars?: { phase: string; title: string; action_items: string[]; expected_impact: string }[];
    compliance_standards?: string[];
    typical_sales_cycle?: string;
    average_acv?: string;
    // Relationships
    related_services?: (number | RawWpBasePost)[];
    related_insights?: (number | RawWpBasePost)[];
    related_case_studies?: (number | RawWpBasePost)[];
    faqs?: { question: string; answer: string }[];
  };
}

/**
 * Raw Location CPT (wp/v2/locations)
 */
export interface RawWpLocationPost extends RawWpBasePost {
  type: 'locations';
  acf?: {
    location_code?: string;
    city?: string;
    state_or_region?: string;
    country?: string;
    country_code?: string;
    hub_type?: string;
    node_code?: string;
    address_line1?: string;
    address_line2?: string;
    postal_code?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    business_hours?: string;
    local_market_summary?: string;
    market_drivers?: { title: string; metric: string; description: string }[];
    regional_clients?: { client_name: string; industry: string; result_metric: string; location_area: string }[];
    target_sectors?: string[];
    supported_languages?: string[];
    timezone?: string;
    // Relationships
    related_services?: (number | RawWpBasePost)[];
    related_industries?: (number | RawWpBasePost)[];
    related_insights?: (number | RawWpBasePost)[];
  };
}

/**
 * Raw Insight / Post CPT (wp/v2/posts or wp/v2/insights)
 */
export interface RawWpInsightPost extends RawWpBasePost {
  type: 'insights' | 'post';
  acf?: {
    standfirst?: string;
    category?: string;
    content_type?: string;
    reading_time_minutes?: number;
    word_count?: number;
    reviewer_name?: string;
    reviewer_role?: string;
    key_takeaways?: string[];
    sections?: {
      id?: string;
      title: string;
      subtitle?: string;
      content: string;
      key_points?: string[];
      quote?: string;
      code_snippet?: string;
      code_language?: string;
    }[];
    original_study_data?: {
      sample_size: string;
      timeframe: string;
      methodology: string;
      stats: { label: string; value: string; note: string }[];
    };
    // Relationships
    related_services?: (number | RawWpBasePost)[];
    related_industries?: (number | RawWpBasePost)[];
    related_locations?: (number | RawWpBasePost)[];
    related_case_studies?: (number | RawWpBasePost)[];
  };
}

/**
 * Raw Case Study CPT (wp/v2/case-studies)
 */
export interface RawWpCaseStudyPost extends RawWpBasePost {
  type: 'case-studies';
  acf?: {
    case_study_code?: string;
    client_name?: string;
    client_industry?: string;
    client_industry_slug?: string;
    hero_headline?: string;
    challenge_summary?: string;
    solution_architecture?: string;
    executive_summary?: string;
    results?: { metric: string; label: string; baseline?: string; achieved?: string; timeframe?: string }[];
    before_after_comparison?: { aspect: string; before: string; after: string; delta: string }[];
    tech_stack_deployed?: string[];
    testimonial_quote?: string;
    client_author_name?: string;
    client_author_role?: string;
    client_author_avatar?: string;
    verified_audit_report_url?: string;
    // Relationships
    related_services?: (number | RawWpBasePost)[];
    related_industries?: (number | RawWpBasePost)[];
    related_insights?: (number | RawWpBasePost)[];
  };
}
