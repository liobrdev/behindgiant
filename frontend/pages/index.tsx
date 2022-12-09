import Head from 'next/head';

import { Footer } from '@/components';
import { IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

const breadcrumbList: IBreadcrumbListItem[] = [
  {
    "@type": "ListItem",
    position: 1,
    name: "Home",
    item: "https://behindgiant.com"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default function Home() {
  return (
    <>
      <Head>
        <title>behind GIANT</title>
        <script type="application/ld+json">{breadcrumb}</script>
      </Head>
      <section id='home-banner1'>
        <div className='Banner-overlay' />
        <div className='Intro Intro--home'>
          <div className='Logo'>
            <img className='Logo-image' src={`${imagesUrl}/Logo-wh.png`} alt='behind GIANT' />
          </div>
          <div className='IntroText IntroText--home'>
            <h1>A consultancy and creative agency, purposefully built for the modern age.</h1>
          </div>
        </div>
      </section>
      <Footer classNames='Footer--home' />
    </>
  );
}
