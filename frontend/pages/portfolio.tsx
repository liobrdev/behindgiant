import debounce from 'lodash/debounce';
import Head from 'next/head';
import { Component, MouseEvent } from 'react';

import { AnimatedLink, Footer, MediaToBeLoaded } from '@/components';
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
    name: "Portfolio",
    item: "https://behindgiant.com/portfolio"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default class Portfolio extends Component {
  private header: HTMLElement | null;
  private banner: HTMLElement | null;
  private bannerBg: HTMLElement | null;
  private bannerText: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.header = null;
    this.banner = null;
    this.bannerBg = null;
    this.bannerText = null;
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
    this.onScroll = debounce(this.onScroll.bind(this), 5, { leading: true });
  }

  onScroll() {
    if (this.bannerBg && this.bannerText) {
      if (window.innerHeight < 500) {
        if (this.bannerBg.style.top != '0') this.bannerBg.style.top = '0';
        if (this.bannerText.style.top != '0') this.bannerText.style.top = '0';
      } else if (this.banner) {
        const { bottom } = this.banner.getBoundingClientRect();
  
        if (bottom <= window.innerHeight && bottom >= 0) {
          const bannerToScreenRatio = (window.innerHeight - bottom) / window.innerHeight;
          this.bannerBg.style.top = `${bannerToScreenRatio * 10}%`;
          this.bannerText.style.top = `${bannerToScreenRatio * 100}%`;
        }
      }
    }
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

  handleScrollTop(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    window.scrollTo(0, 0);
    document.getElementById('main')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  componentDidMount() {
    document.getElementById('main')?.addEventListener('scroll', this.onScroll);
    this.header = document.getElementById('portfolio-header');
    this.banner = document.getElementById('portfolio-banner');
    this.bannerBg = document.getElementById('portfolio-banner-bg');
    this.bannerText = document.getElementById('portfolio-banner-text');
  }

  componentWillUnmount() {
    document.getElementById('main')?.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <>
        <Head>
          <title>Portfolio</title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <MediaToBeLoaded imageUrls={[
          imagesUrl + '/Logo-bl2.png',
          imagesUrl + '/madonnina.jpg',
          imagesUrl + '/food-truck.jpg',
          imagesUrl + '/skateboard.jpg',
          imagesUrl + '/buildings.jpg',
          imagesUrl + '/stickers.jpg',
          imagesUrl + '/basketball.jpg',
          '/twitter_white.png',
          '/instagram_white.png',
          '/facebook_white.png',
          '/linkedin_white.png',
        ]}/>
        <header id='portfolio-header'>
          <div className='Logo'>
            <AnimatedLink href='/'>
              <h1>
                <strong className='u-neonorange'>behind</strong>&nbsp;<wbr/>
                <strong className='u-teal'>Giant</strong>&nbsp;<wbr/>
              </h1>
            </AnimatedLink>
          </div>
        </header>
        <section id='portfolio-banner'>
          <div id='portfolio-banner-bg' className='Banner-underlay' />
          <div className='Banner-overlay' />
          <div className='Intro Intro--portfolio'>
            <AnimatedLink href='/portfolio/latest5'>
              <div id='portfolio-banner-text'>
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
        <section id='portfolio-projects-list'>
          <h3>
            <span>Recent work from</span>&nbsp;<wbr/>
            <strong className='u-neonorange'>behind</strong>&nbsp;<wbr/>
            <strong className='u-teal'>Giant</strong>
            <span>:</span>
          </h3>
          <div className='Projects'>
            <div className='Project'>
              <AnimatedLink href='/portfolio/latest6' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-06'>January 6, 2023</time>
                  <h5>Madonnina</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest6' className='ThumbLink'>
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
              <AnimatedLink href='/portfolio/latest5' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-05'>January 5, 2023</time>
                  <h5>Food Truck</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest5' className='ThumbLink'>
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
              <AnimatedLink href='/portfolio/latest4' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-04'>January 4, 2023</time>
                  <h5>Fourth Wheel</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest4' className='ThumbLink'>
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
              <AnimatedLink href='/portfolio/latest3' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-03'>January 3, 2023</time>
                  <h5>To the Sky</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest3' className='ThumbLink'>
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
              <AnimatedLink href='/portfolio/latest2' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-02'>January 2, 2023</time>
                  <h5>Collage</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest2' className='ThumbLink'>
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
              <AnimatedLink href='/portfolio/latest1' className='TextLink'>
                <div className='Text'>
                  <time dateTime='2023-01-01'>January 1, 2023</time>
                  <h5>Hello World</h5>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/portfolio/latest1' className='ThumbLink'>
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
        <section id='portfolio-footer'>
          <button className='ScrollTop' onClick={this.handleScrollTop} type='button'>
            <div />
          </button>
          <div className='Logo'><AnimatedLink href='/'><h1>behind Giant</h1></AnimatedLink></div>
          <Footer classNames='Footer--portfolio' />
        </section>
      </>
    );
  }
}
