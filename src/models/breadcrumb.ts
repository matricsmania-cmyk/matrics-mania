/**
 * Breadcrumb Domain Model
 * Used for hierarchical UI path rendering and Schema.org BreadcrumbList serialization.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
  isCurrentPage?: boolean;
}

export interface BreadcrumbTrail {
  items: BreadcrumbItem[];
  canonicalPath: string;
}
