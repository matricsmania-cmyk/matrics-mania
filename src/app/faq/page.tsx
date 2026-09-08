import React from 'react';
import { FAQTemplate } from '@/src/templates/FAQTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('faq'));

export default function FAQPage() {
  const faqs = wordPressProvider.getAllFAQs();
  return <FAQTemplate faqs={faqs} />;
}
