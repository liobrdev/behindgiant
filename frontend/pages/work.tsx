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
    name: "Work",
    item: "https://behindgiant.com/work"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function Work() {
  return (
    <>
      <Head>
        <title>Work</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <UnderConstruction />
    </>
  );
}
