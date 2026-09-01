import React from 'react';
import { FAQTemplate } from '@/src/templates/FAQTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('faq'));

export default function FAQPage() {
  const faqs = wordPressProvider.getAllFAQs();
  return <FAQTemplate faqs={faqs} />;
}
