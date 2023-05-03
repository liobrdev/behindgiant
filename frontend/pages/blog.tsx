import debounce from 'lodash/debounce';
import Head from 'next/head';
import { Component, MouseEvent } from 'react';

import { AnimatedLink, Footer, MediaToBeLoaded } from '@/components';
import { IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';
const videosUrl = process.env.NEXT_PUBLIC_VIDEOS_URL || '';

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
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

export default class Blog extends Component {
  private banner: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.banner = null;
    this.onScroll = debounce(this.onScroll.bind(this), 5, { leading: true });
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
  }

  onScroll() {
    if (this.banner?.parentElement) {
      if (window.innerHeight < 500) {
        if (this.banner.style.transform != 'translateY(0)') {
          this.banner.style.transform = 'translateY(0)';
        }
      } else {
        let { bottom, top } = this.banner.parentElement.getBoundingClientRect();
  
        if (bottom >= 0 && top <= 0) {
          if ((this.banner as HTMLVideoElement).paused) {
            (this.banner as HTMLVideoElement).play();
          }

          this.banner.style.transform = `translateY(${top / window.innerHeight * -25}%)`;
        } else if (!(this.banner as HTMLVideoElement).paused) {
          (this.banner as HTMLVideoElement).pause();
        }
      }
    }
  }

  handleScrollDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    document.getElementById('main')?.scrollTo({
      top: document.getElementById('blog-master-banner')?.clientHeight,
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
    this.banner = document.getElementById('blog-master-banner-bg');
  }

  componentWillUnmount() {
    document.getElementById('main')?.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <>
        <Head>
          <title>Blog</title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <MediaToBeLoaded imageUrls={[
          imagesUrl + '/converse.jpg',
          imagesUrl + '/street-art.jpg',
          imagesUrl + '/roller-coaster.jpg',
          imagesUrl + '/strawberry.jpg',
          imagesUrl + '/cat.jpg',
          '/twitter_white.png',
          '/instagram_white.png',
          '/facebook_white.png',
          '/linkedin_white.png',
        ]} videoUrls={[videosUrl + '/sitting-radio.mp4']} />
        <section id='blog-master-banner' className='Section--banner'>
          <video id='blog-master-banner-bg' className='Banner-underlay' autoPlay muted loop
            src={videosUrl + '/sitting-radio.mp4'}
          />
          <div className='Banner-overlay' />
          <div className='Intro Intro--blogMaster'>
            <div className='Logo'>
              <h1>behind Giant</h1>
            </div>
            <div className='IntroText IntroText--blogMaster'>
              <h2>Blog</h2>
            </div>
          </div>
          <button className='ScrollDown' onClick={this.handleScrollDown} type='button'>
            <span>Scroll</span>
            <div/>
          </button>
        </section>
        <section id='blog-master-list'>
          <div className='BlogThumbnails'>
            <AnimatedLink href='/blog/latest6' className='ThumbnailLink'>
              <div className='BlogThumbnail'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/converse.jpg' + ')'
                    }}/>
                  </div>
                </div>
                <div className='Text'>
                  <time dateTime='2023-01-06'>January 6, 2023</time>
                  <h5>A Mile in Their Shoes</h5>
                </div>
              </div>
            </AnimatedLink>
            <AnimatedLink href='/blog/latest5' className='ThumbnailLink'>
              <div className='BlogThumbnail'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/street-art.jpg' + ')'
                    }}/>
                  </div>
                </div>
                <div className='Text'>
                  <time dateTime='2023-01-05'>January 5, 2023</time>
                  <h5>The Art of Spotting Opportunities</h5>
                </div>
              </div>
            </AnimatedLink>
            <AnimatedLink href='/blog/latest4' className='ThumbnailLink'>
              <div className='BlogThumbnail'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/roller-coaster.jpg' + ')'
                    }}/>
                  </div>
                </div>
                <div className='Text'>
                  <time dateTime='2023-01-04'>January 4, 2023</time>
                  <h5>What Makes a &quot;Calculated&quot; Risk?</h5>
                </div>
              </div>
            </AnimatedLink>
            <AnimatedLink href='/blog/latest3' className='ThumbnailLink'>
              <div className='BlogThumbnail'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/strawberry.jpg' + ')'
                    }}/>
                  </div>
                </div>
                <div className='Text'>
                  <time dateTime='2023-01-03'>January 3, 2023</time>
                  <h5>Building Connections Across Continents</h5>
                </div>
              </div>
            </AnimatedLink>
            <AnimatedLink href='/blog/latest2' className='ThumbnailLink'>
              <div className='BlogThumbnail'>
                <div className='Thumb'>
                  <div className='ThumbImage-wrapper'>
                    <div className='ThumbImage' style={{
                      backgroundImage: 'url(' + imagesUrl + '/cat.jpg' + ')'
                    }}/>
                  </div>
                </div>
                <div className='Text'>
                  <time dateTime='2023-01-02'>January 2, 2023</time>
                  <h5>Learning To Truly Pay Attention</h5>
                </div>
              </div>
            </AnimatedLink>
          </div>
        </section>
        <section id='blog-master-footer'>
          <button className='ScrollTop' onClick={this.handleScrollTop} type='button'>
            <div />
          </button>
          <div className='Logo'>
            <AnimatedLink href='/'><h1>behind Giant</h1></AnimatedLink>
          </div>
          <Footer classNames='Footer--blogMaster' />
        </section>
      </>
    );
  }
}
