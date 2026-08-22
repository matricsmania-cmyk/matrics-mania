/**
 * Structured Data (Schema.org) Domain Models
 * For generating search engine rich snippet graphs (JSON-LD).
 */

export interface SchemaContext {
  '@context': 'https://schema.org';
}

export interface SchemaImageObject {
  '@type': 'ImageObject';
  '@id'?: string;
  url: string;
  contentUrl?: string;
  caption?: string;
  width?: number | string;
  height?: number | string;
}

export interface SchemaPostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
}

export interface SchemaGeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface SchemaOpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface SchemaContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

export interface SchemaPerson {
  '@type': 'Person';
  '@id'?: string;
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string | SchemaImageObject;
  sameAs?: string[];
  worksFor?: {
    '@type'?: 'Organization';
    '@id'?: string;
    name?: string;
    url?: string;
  };
  knowsAbout?: string[];
}

export interface SchemaOrganization extends SchemaContext {
  '@type': 'Organization' | 'Corporation';
  '@id'?: string;
  name: string;
  legalName?: string;
  url: string;
  logo: string | SchemaImageObject;
  image?: string | SchemaImageObject;
  description?: string;
  founder?: SchemaPerson;
  foundingDate?: string;
  address?: SchemaPostalAddress;
  contactPoint?: SchemaContactPoint[];
  sameAs?: string[];
  numberOfEmployees?: string;
  knowsAbout?: string[];
}

export interface SchemaLocalBusiness extends SchemaContext {
  '@type': 'ProfessionalService' | 'LocalBusiness';
  '@id'?: string;
  name: string;
  image?: string | SchemaImageObject;
  url: string;
  telephone: string;
  email?: string;
  priceRange?: string;
  address: SchemaPostalAddress;
  geo?: SchemaGeoCoordinates;
  openingHoursSpecification?: SchemaOpeningHoursSpecification[];
  areaServed?: string | string[] | { '@type': string; name: string };
  parentOrganization?: {
    '@type'?: 'Organization';
    '@id': string;
    name?: string;
    url?: string;
  };
}

export interface SchemaWebSite extends SchemaContext {
  '@type': 'WebSite';
  '@id'?: string;
  name: string;
  url: string;
  description?: string;
  publisher?: {
    '@type'?: 'Organization';
    '@id': string;
    name?: string;
  };
  inLanguage?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface SchemaWebPage extends SchemaContext {
  '@type': 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage' | 'ItemPage' | 'SearchResultsPage' | 'FAQPage';
  '@id'?: string;
  url: string;
  name: string;
  description?: string;
  isPartOf?: {
    '@type'?: 'WebSite';
    '@id': string;
  };
  breadcrumb?: {
    '@type'?: 'BreadcrumbList';
    '@id': string;
  };
  primaryImageOfPage?: SchemaImageObject | { '@id': string };
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  mainEntity?: Record<string, any>;
  about?: Record<string, any>;
}

export interface SchemaProfilePage extends SchemaWebPage {
  '@type': 'ProfilePage';
  mainEntity: SchemaPerson;
}

export interface SchemaService extends SchemaContext {
  '@type': 'Service';
  '@id'?: string;
  name: string;
  serviceType: string;
  provider: {
    '@type'?: 'Organization';
    '@id': string;
    name?: string;
    url?: string;
  };
  description: string;
  areaServed?: string | string[] | { '@type': string; name: string };
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: {
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description?: string;
      };
    }[];
  };
  termsOfService?: string;
}

export interface SchemaArticle extends SchemaContext {
  '@type': 'TechArticle' | 'Article' | 'BlogPosting' | 'Report';
  '@id'?: string;
  headline: string;
  description: string;
  image?: string | string[] | SchemaImageObject;
  datePublished?: string;
  dateModified?: string;
  author?: SchemaPerson | SchemaPerson[] | { '@id': string } | { '@type': 'Organization'; '@id': string; name: string };
  publisher: {
    '@type'?: 'Organization';
    '@id': string;
    name?: string;
    logo?: SchemaImageObject;
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string | string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
  about?: Record<string, any>;
  creator?: {
    '@type'?: 'Organization';
    '@id': string;
    name?: string;
  };
}

export interface SchemaFAQPage extends SchemaContext {
  '@type': 'FAQPage';
  '@id'?: string;
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface SchemaBreadcrumbList extends SchemaContext {
  '@type': 'BreadcrumbList';
  '@id'?: string;
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export type StructuredDataEntity =
  | SchemaOrganization
  | SchemaLocalBusiness
  | SchemaWebSite
  | SchemaWebPage
  | SchemaProfilePage
  | SchemaService
  | SchemaArticle
  | SchemaFAQPage
  | SchemaBreadcrumbList
  | Record<string, any>;

export interface StructuredDataGraph {
  '@context': 'https://schema.org';
  '@graph': StructuredDataEntity[];
}

/**
 * CMS Structured Data Input Contract
 * Used for receiving schema graph payloads from WordPress Headless CMS (Yoast, RankMath, ACF).
 */
export type CmsStructuredDataInput =
  | string
  | StructuredDataEntity
  | StructuredDataGraph
  | StructuredDataEntity[];
