import Head from 'next/head';

import { UnderConstruction } from '@/components';
import { IBreadcrumbListItem } from '@/types';


const breadcrumbList: IBreadcrumbListItem[] = [
  {
    "@type": "ListItem",
    position: 1,
    name: "Home",
    item: "https://behindgiant.com"
  },
  {
    "@type": "ListItem",
    position: 2,
    name: "About",
    item: "https://behindgiant.com/about"
  },
  {
    "@type": "ListItem",
    position: 3,
    name: "Founder",
    item: "https://behindgiant.com/about/founder"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function AboutFounder() {
  return (
    <>
      <Head>
        <title>Founder</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <UnderConstruction />
    </>
  );
}
