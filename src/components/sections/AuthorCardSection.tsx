'use client';

import React from 'react';
import { OptimizedImage } from '../OptimizedImage';
import { Author } from '../../models';
import { Linkedin, Twitter, Globe, CheckCircle2 } from 'lucide-react';

export interface AuthorCardSectionProps {
  author: Author;
  readingTime?: string;
  publishedDate?: string;
}

export const AuthorCardSection: React.FC<AuthorCardSectionProps> = ({
  author,
  readingTime,
  publishedDate,
}) => {
  if (!author) return null;

  const avatarUrl = typeof author.avatar === 'string' ? author.avatar : author.avatar?.url || '';

  return (
    <div className="p-6 rounded-2xl bg-[#0D1424] border border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="relative shrink-0">
        {avatarUrl && (
          <OptimizedImage
            src={avatarUrl}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#2563EB]/40"
          />
        )}
        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#070B14]" />
      </div>

      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{author.name}</h3>
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <p className="text-xs text-[#60A5FA] font-mono">{author.role}</p>
          </div>

          <div className="flex items-center gap-2">
            {author.socials?.linkedin && (
              <a
                href={author.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {author.socials?.twitter && (
              <a
                href={author.socials.twitter}
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            {author.socials?.website && (
              <a
                href={author.socials.website}
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
          {author.bio}
        </p>

        {(readingTime || publishedDate) && (
          <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#64748B]">
            {publishedDate && <span>Published: {publishedDate}</span>}
            {publishedDate && readingTime && <span>•</span>}
            {readingTime && <span>{readingTime}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
