import React from 'react';
import { ContactTemplate } from '@/src/templates/ContactTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const revalidate = 3600;

export const metadata = toNextMetadata(getStaticRouteSeo('contact'));

export default function ContactPage() {
  const contactInfo = wordPressProvider.getContactInfo();
  return <ContactTemplate contactInfo={contactInfo} />;
}
