import { Media } from './media';

export interface AuthorSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  email?: string;
  website?: string;
}

export interface Author {
  id: string | number;
  slug: string;
  name: string;
  role: string;
  bio?: string;
  shortBio?: string;
  avatar: string | Media;
  socials?: AuthorSocialLinks;
  credentials?: string[];
  department?: string;
  isLeadership?: boolean;
  publishedArticlesCount?: number;
  verifiedExpertise?: string[];
}
