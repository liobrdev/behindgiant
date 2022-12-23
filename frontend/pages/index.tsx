import Head from 'next/head';

import { Footer, MediaToBeLoaded } from '@/components';
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
      <MediaToBeLoaded imageUrls={[
        imagesUrl + '/Logo-wh.png',
        imagesUrl + '/HomeBanner.jpg',
        '/twitter_white.png',
        '/instagram_white.png',
        '/facebook_white.png',
        '/linkedin_white.png',
      ]}/>
      <section id='home-banner' className='Section--genericBanner'>
        <div className='Banner-underlay' />
        <div className='Banner-overlay' />
        <div className='Info'>
          <div className='Logo'>
            <img className='Logo-image' src={`${imagesUrl}/Logo-wh.png`} alt='behind GIANT' />
          </div>
          <h1>A consultancy and creative agency, purposefully built for the modern age.</h1>
        </div>
      </section>
      <Footer classNames='Footer--home' />
    </>
  );
}
