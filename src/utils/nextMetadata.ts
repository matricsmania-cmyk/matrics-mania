import type { Metadata } from 'next';
import { SEOResolved } from './seo';

/**
 * Transforms MatricsMania SEOResolved structure into standard Next.js Metadata API object.
 */
export function toNextMetadata(seo: SEOResolved): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
      googleBot: {
        index: seo.robotsIndex,
        follow: seo.robotsFollow,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.canonicalUrl,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      type: seo.openGraph.type === 'article' ? 'article' : 'website',
      images: [
        {
          url: seo.openGraph.image,
          width: seo.openGraph.imageWidth,
          height: seo.openGraph.imageHeight,
          alt: seo.openGraph.imageAlt,
        },
      ],
    },
    twitter: {
      card: seo.twitter.card,
      site: seo.twitter.site,
      creator: seo.twitter.creator,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [seo.twitter.image],
    },
  };
}
