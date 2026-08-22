import React from 'react';
import { HomeTemplate } from '@/src/templates/HomeTemplate';
import { getStaticRouteSeo } from '@/src/utils/seo';
import { toNextMetadata } from '@/src/utils/nextMetadata';

export const metadata = toNextMetadata(getStaticRouteSeo('home'));

export default function HomePage() {
  return <HomeTemplate />;
}
