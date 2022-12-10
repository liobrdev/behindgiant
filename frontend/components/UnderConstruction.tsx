import { AnimatedLink, Footer } from '@/components';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

export default function UnderConstruction() {
  return (
    <>
      <section id='under-construction-banner' className='Section--genericBanner'>
        <div className='Banner-underlay' />
        <div className='Banner-overlay' />
        <div className='Info'>
          <div className='Logo'>
            <AnimatedLink href='/'>
              <img className='Logo-image' src={`${imagesUrl}/Logo-wh.png`} alt='behind GIANT'/>
            </AnimatedLink>
          </div>
          <h1>This page is currently under construction - check back soon!</h1>
        </div>
      </section>
      <Footer classNames='Footer--underConstruction' />
    </>
  );
}
