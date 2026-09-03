import React from 'react';
import { ContactTemplate } from '@/src/templates/ContactTemplate';
import { wordPressProvider } from '@/src/providers/WordPressProvider';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = toNextMetadata(getStaticRouteSeo('contact'));

export default async function ContactPage() {
  await wordPressProvider.asyncGetAllLocations();
  const contactInfo = wordPressProvider.getContactInfo();
  return <ContactTemplate contactInfo={contactInfo} />;
}
