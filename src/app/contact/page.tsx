import React from 'react';
import { ContactTemplate } from '@/src/templates/ContactTemplate';
import { mockDataProvider } from '@/src/providers/MockDataProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('contact'));

export default function ContactPage() {
  const contactInfo = mockDataProvider.getContactInfo();
  return <ContactTemplate contactInfo={contactInfo} />;
}
