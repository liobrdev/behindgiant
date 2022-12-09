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
    name: "Production",
    item: "https://behindgiant.com/production"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function Production() {
  return (
    <>
      <Head>
        <title>Production</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <UnderConstruction />
    </>
  );
}
