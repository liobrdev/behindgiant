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
    name: "Blog",
    item: "https://behindgiant.com/blog"
  },
  {
    "@type": "ListItem",
    position: 3,
    name: "BlogEntry",
    item: "https://behindgiant.com/blog/entry"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function BlogEntry() {
  return (
    <>
      <Head>
        <title>Blog Entry</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <UnderConstruction />
    </>
  );
}
