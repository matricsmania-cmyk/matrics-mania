import React from 'react';
import { FAQTemplate } from '@/src/templates/FAQTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('faq'));

export default function FAQPage() {
  const faqs = mockDataProvider.getAllFAQs();
  return <FAQTemplate faqs={faqs} />;
}
