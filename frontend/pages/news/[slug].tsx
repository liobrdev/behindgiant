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
    name: "News",
    item: "https://behindgiant.com/news"
  },
  {
    "@type": "ListItem",
    position: 3,
    name: "Article",
    item: "https://behindgiant.com/news/article"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function NewsArticle() {
  return (
    <>
      <Head>
        <title>Article</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <UnderConstruction />
    </>
  );
}
