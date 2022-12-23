import Head from 'next/head';
import { Component, MouseEvent } from 'react';

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

export default class Work extends Component {
  private header: HTMLElement | null;
  private banner: HTMLElement | null;
  private bannerText: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.header = null;
    this.banner = null;
    this.bannerText = null;
    this.handleScrollDown = this.handleScrollDown.bind(this);
  }

  handleScrollDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!(this.banner && this.header)) return;

    document.getElementById('main')?.scrollTo({
      top: this.header.clientHeight + this.banner.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  componentDidMount() {
    this.header = document.getElementById('work-header');
    this.banner = document.getElementById('work-banner');
    this.bannerText = document.getElementById('work-banner-text');
  }

  render() {
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
            <AnimatedLink href='/work/latest5'>
              <div id='work-banner-text'>
                <h2>New Work</h2>
                <h3>Food Truck</h3>
                <h4>#LoremIpsum</h4>
              </div>
            </AnimatedLink>
          </div>
          <button className='ScrollDown' onClick={this.handleScrollDown} type='button'>
            <span>Scroll</span>
            <div/>
          </button>
        </section>
        <section id='work-projects-list'>
          <h3>Recent <strong>work</strong> from <strong>behind GIANT:</strong></h3>
          <div className='Projects'>
            <div className='Project'>
              <AnimatedLink href='/work/latest6' className='TextLink'>
                <div className='Text'>
                  <h4>Madonnina</h4>
                  <p>In the Cathedral</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest6' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/madonnina.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
            <div className='Project'>
              <AnimatedLink href='/work/latest5' className='TextLink'>
                <div className='Text'>
                  <h4>Food Truck</h4>
                  <p>#LoremIpsum</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest5' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/food-truck.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
            <div className='Project'>
              <AnimatedLink href='/work/latest4' className='TextLink'>
                <div className='Text'>
                  <h4>Fourth Wheel</h4>
                  <p>Now you see it.</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest4' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/skateboard.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
            <div className='Project'>
              <AnimatedLink href='/work/latest3' className='TextLink'>
                <div className='Text'>
                  <h4>To the Sky</h4>
                  <p>Examine the American Dream</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest3' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/buildings.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
            <div className='Project'>
              <AnimatedLink href='/work/latest2' className='TextLink'>
                <div className='Text'>
                  <h4>Collage</h4>
                  <p>A Fresh Coat of Ink</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest2' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/stickers.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
            <div className='Project'>
              <AnimatedLink href='/work/latest1' className='TextLink'>
                <div className='Text'>
                  <h4>Hello World</h4>
                  <p>What do you think so far?</p>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/work/latest1' className='ThumbLink'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/basketball.jpg' + ')'
                    }}/>
                  </div>
                </div>
              </AnimatedLink>
            </div>
          </div>
        </section>
      </>
    );
  }
}
