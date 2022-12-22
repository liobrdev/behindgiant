import Head from 'next/head';

import { AnimatedLink } from '@/components';
import { IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

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
      <header id='work-header'>
        <div className='Logo'>
          <AnimatedLink href='/'>
            <img className='Logo-image' src={`${imagesUrl}/Logo-bl2.png`} alt='behind GIANT'/>
          </AnimatedLink>
        </div>
      </header>
      <section id='work-banner'>
        <div id='work-banner-bg' className='Banner-underlay' />
        <div className='Banner-overlay' />
        <div className='Intro Intro--work'>
          <AnimatedLink href='#work-banner'>
            <div className='IntroText IntroText--about'>
              <h2>New Work</h2>
              <h3>Food Truck</h3>
              <h4>#LoremIpsum</h4>
            </div>
          </AnimatedLink>
        </div>
      </section>
    </>
  );
}
