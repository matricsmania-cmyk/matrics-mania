import { Media } from './media';
import { BreadcrumbTrail } from './breadcrumb';

export interface NavLinkItem {
  id: string;
  label: string;
  url: string;
  description?: string;
  badge?: string;
  iconName?: string;
  isExternal?: boolean;
  isFeatured?: boolean;
  target?: '_self' | '_blank';
}

export interface MegaMenuColumn {
  id: string;
  title: string;
  categoryLabel?: string;
  items: NavLinkItem[];
  featuredCard?: {
    title: string;
    description: string;
    url: string;
    image?: string | Media;
    ctaLabel?: string;
  };
}

export interface NavMenuItem {
  id: string;
  label: string;
  url: string;
  isMegaMenu?: boolean;
  megaMenuColumns?: MegaMenuColumn[];
  children?: NavLinkItem[];
  highlightBadge?: string;
}

export interface FooterSection {
  id: string;
  title: string;
  items: NavLinkItem[];
}

export interface Navigation {
  headerMenu: NavMenuItem[];
  footerMenu: {
    solutions: FooterSection;
    industries: FooterSection;
    locations: FooterSection;
    research: FooterSection;
    company: FooterSection;
    legal: FooterSection;
  };
  ctaItem: {
    label: string;
    action: 'openBooking';
    badge?: string;
  };
  breadcrumbs?: BreadcrumbTrail;
}
