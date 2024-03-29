import debounce from 'lodash/debounce';
import Head from 'next/head';
import { Component, MouseEvent } from 'react';

import {
  AnimatedLink, Footer, InViewWrapper, MediaToBeLoaded, NavigationMenu,
} from '@/components';

import { IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';
const videosUrl = process.env.NEXT_PUBLIC_VIDEOS_URL || '';

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

export default class Home extends Component {
  private banner1: HTMLElement | null;
  private banner2: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.banner1 = null;
    this.banner2 = null;
    this.onScroll = debounce(this.onScroll.bind(this), 5, { leading: true });
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
  }

  onScroll() {
    if (this.banner1?.parentElement) {
      if (window.innerHeight < 500) {
        if (this.banner1.style.transform != 'translateY(0)') {
          this.banner1.style.transform = 'translateY(0)';
        }
      } else {
        let { bottom, top } = this.banner1.parentElement.getBoundingClientRect();
  
        if (bottom >= 0 && top <= 0) {
          if ((this.banner1 as HTMLVideoElement).paused) {
            (this.banner1 as HTMLVideoElement).play();
          }

          this.banner1.style.transform = `translateY(${top / window.innerHeight * 15}%)`;
        } else if (this.banner2?.parentElement) {
          let top2 = this.banner2.parentElement.getBoundingClientRect().top;

          if (top2 <= window.innerHeight) {
            if ((this.banner1 as HTMLVideoElement).paused) {
              (this.banner1 as HTMLVideoElement).play();
            }

            this.banner1.style.transform =
              `translateY(${15 - ((window.innerHeight - top2) / window.innerHeight * 15)}%)`;
          } else {
            if (!(this.banner1 as HTMLVideoElement).paused) {
              (this.banner1 as HTMLVideoElement).pause();
            }
          }
        } else {
          if (!(this.banner1 as HTMLVideoElement).paused) {
            (this.banner1 as HTMLVideoElement).pause();
          }
        }
      }
    }
  }

  handleScrollDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    document.getElementById('main')?.scrollTo({
      top: document.getElementById('home-banner1')?.clientHeight,
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
    this.banner1 = document.getElementById('home-banner1-bg');
    this.banner2 = document.getElementById('home-banner2-bg');
  }

  componentWillUnmount() {
    document.getElementById('main')?.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <>
        <Head>
          <title>behind Giant</title>
          <script type='application/ld+json'>{breadcrumb}</script>
        </Head>
        <MediaToBeLoaded imageUrls={[
          imagesUrl + '/meeting-icon.png',
          imagesUrl + '/puzzle-icon.png',
          imagesUrl + '/gears-icon.png',
          imagesUrl + '/ikigai.png',
          imagesUrl + '/sold.jpg',
          imagesUrl + '/converse.jpg',
          '/twitter_white.png',
          '/instagram_white.png',
          '/facebook_white.png',
          '/linkedin_white.png',
        ]} videoUrls={[videosUrl + '/walking-beach.mp4']} />
        <section id='home-banner1' className='Section--banner'>
          <video id='home-banner1-bg' className='Banner-underlay' autoPlay muted loop
            src={videosUrl + '/walking-beach.mp4'}
          />
          <div className='Banner-overlay' />
          <div className='Intro Intro--home'>
            <div className='Logo'>
              <h1>behind Giant</h1>
            </div>
            <div className='IntroText IntroText--home'>
              <h2>
                A Tokyo-based creative consultancy placing emphasis on the elevation of the
                minority voice.
              </h2>
            </div>
          </div>
          <button className='ScrollDown' onClick={this.handleScrollDown} type='button'>
            <span>Scroll</span>
            <div/>
          </button>
        </section>
        <section id='home-mission'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <div className='Columns'>
              <div className='Column'>
                <h5>
                  <span>We produce marketing that</span>&nbsp;<wbr/>
                  <strong>resonates</strong>&nbsp;<wbr/>
                  <span>with the minority consumer culturally and empirically.</span>
                </h5>
              </div>
              <div className='Column'>
                <p>
                  <span>
                    Creative consultancies identify the needs of their client and find creative
                    strategies for solving the client&apos;s problems. Unfortunately, the
                    solutions are often void of the insights and voices of the communities they
                    intend to serve.
                  </span>
                </p>
                <p>
                  <span>
                    Collaborations often leave out culturally competent agency partners, pointing
                    to a lack of diversity in representation and resulting in biased marketing and
                    missed opportunities. Only 11.4% of creative industry jobs are filled by
                    Black, Asian, or minority ethnic people, and just 11.5% of creative directors
                    in the USA are women.
                  </span>
                </p>
                <p>
                  <span>
                    Huge disparities in opportunities for participation result in smaller reach
                    and lower profits &mdash; the issue must be addressed. We constructed
                  </span>&nbsp;<wbr/>
                  <strong className='u-neonorange'>behind</strong>&nbsp;<wbr/>
                  <strong className='u-teal'>Giant</strong>&nbsp;<wbr/>
                  <span>
                    to strategically fill creative gaps and better connect brands with customers.
                  </span>
                </p>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='home-values'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <h3>Our Core Values</h3>
            <div className='Columns'>
              <div className='Column'>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>01</div>
                  <h5><strong>Comprehension before action.</strong></h5>&nbsp;&nbsp;
                  <p><span>Identify an avenue for improvement &mdash; and act.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>02</div>
                  <h5><strong>Break through biases.</strong></h5>&nbsp;&nbsp;
                  <p><span>Every story deserves to be told.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>03</div>
                  <h5><strong>Belief-driven.</strong></h5>&nbsp;&nbsp;
                  <p><span>We represent your values and societal change.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>04</div>
                  <h5><strong>Collaborative approach.</strong></h5>&nbsp;&nbsp;
                  <p><span>We value and employ the input of the community.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>05</div>
                  <h5><strong>Transparent with intention.</strong></h5>&nbsp;&nbsp;
                  <p><span>Creating with integrity.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>06</div>
                  <h5><strong>Pursuit with purpose.</strong></h5>&nbsp;&nbsp;
                  <p><span>Steps guided by reason for existence.</span></p>
                </div>
                <div className='CoreValue'>
                  <div className='CoreValue-number'>07</div>
                  <h5><strong>Move without the ball.</strong></h5>&nbsp;&nbsp;
                  <p>
                    <span>
                      The opportunity to score may not be present yet, but it is important to be
                      prepared to score.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='home-offerings'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <h3>Our Offerings</h3>
            <div className='Offerings'>
              <div className='Offering'>
                <div className='IconContainer'>
                  <img src={imagesUrl + '/meeting-icon.png'} alt='' width='100px' />
                </div>
                <h5>Consulting &amp; Strategy</h5>
                <p>Brand Strategy &amp; Marketing</p>
                <p>Consumer Insights</p>
              </div>
              <div className='Offering'>
                <div className='IconContainer'>
                  <img src={imagesUrl + '/puzzle-icon.png'} alt='' width='100px' />
                </div>
                <h5>Creative</h5>
                <p>Storytelling</p>
                <p>Experiential Marketing</p>
                <p>Print &amp; OOH</p>
                <p>Branding &amp; Design</p>
                <p>Social</p>
              </div>
              <div className='Offering'>
                <div className='IconContainer'>
                  <img src={imagesUrl + '/gears-icon.png'} alt='' width='100px' />
                </div>                
                <h5>Production</h5>
                <p>Film &amp; TV Production</p>
                <p>Social Content Creation</p>
                <p>Directing</p>
                <p>Post Production</p>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='home-beliefs'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <h3>Our Beliefs</h3>
            <div className='Columns'>
              <div className='Column'>
                <h5>
                  <strong><i>Ikigai</i></strong>&nbsp;<wbr/>
                  <span>
                    (生き甲斐) &mdash; a Japanese philosophy dating back three millennia which
                    translates as &apos;a reason for being.&apos;
                  </span>
                </h5>
                <img className='Ikigai-image' src={imagesUrl + '/ikigai.png'} alt='Ikigai image'
                  width='500px'
                />
              </div>
              <div className='Column'>
                <h5>
                  <strong><i>Ikigai</i></strong>&nbsp;<wbr/>
                  <span>
                    (生き甲斐) &mdash; a Japanese philosophy dating back three millennia which
                    translates as &apos;a reason for being.&apos;
                  </span>
                </h5>
                <p>
                  <span>
                    The concept is meant to give people a clearer idea of their purpose in life,
                    leading to well-being and satisfaction. While generally applied to one&apos;s
                    personal life,
                  </span>&nbsp;<wbr/>
                  <strong className='u-neonorange'>behind</strong>&nbsp;<wbr/>
                  <strong className='u-teal'>Giant</strong>&nbsp;<wbr/>
                  <span>applies</span>&nbsp;<wbr/>
                  <i>ikigai</i>&nbsp;<wbr/>
                  <span>to build resilient, sustainable businesses.</span>
                </p>
                <p>
                  <span>
                    Our beliefs are rooted in answering four important questions and in guiding our
                    clients to do the same:
                  </span>
                </p>
                <ul>
                  <li>
                    <span>How is your business giving back to the world?</span>
                  </li>
                  <li>
                    <span>What is the driving force behind your motivation?</span>
                  </li>
                  <li>
                    <span>What are you good at?</span>
                  </li>
                  <li>
                    <span>How can what you&apos;re good at translate to profit?</span>
                  </li>
                </ul>
              </div>
              <div className='Column'>
                <img className='Ikigai-image' src={imagesUrl + '/ikigai.png'} alt='Ikigai image'
                  width='500px'
                />
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='home-clients'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <h3>Clients</h3>
            <div className='Columns'>
              <div className='Column'>
                <p>
                  <strong className='u-neonorange'>behind</strong>&nbsp;<wbr/>
                  <strong className='u-teal'>Giant</strong>&nbsp;<wbr/>
                  <span>has worked with:</span>
                </p>
                <ul>
                  <li>
                    <span>Putative Brand</span>
                  </li>
                  <li>
                    <span>Adeedok Shoes</span>
                  </li>
                  <li>
                    <span>Iconic Agency</span>
                  </li>
                  <li>
                    <span>Old &amp; News Clothing</span>
                  </li>
                </ul>
                <p>
                  <span>+ other brands, creators, and shops.</span>
                </p>
              </div>
              <div className='Column'>
                <h5>
                  <span>We connect businesses with consumers.</span>
                </h5>
                <h5>
                  <AnimatedLink href='/contact'>
                    <strong>Contact us</strong>
                  </AnimatedLink>&nbsp;<wbr/>
                  <span>&mdash;</span>&nbsp;<wbr/>
                  <span>schedule a chat today.</span>
                </h5>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='home-recent-posts'>
          <InViewWrapper threshold={0.125} unobserveOnEnter>
            <h3>Recent Posts</h3>
            <div className='RecentPostThumbnails'>
              <AnimatedLink href='/news/latest8' className='ThumbnailLink'>
                <div className='RecentPostThumbnail'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' style={{
                        backgroundImage: 'url(' + imagesUrl + '/sold.jpg' + ')'
                      }}/>
                    </div>
                  </div>
                  <div className='Text'>
                    <time dateTime='2023-01-08'>January 8, 2023</time>
                    <h5>Announcing upcoming Brand Company LLC partnership in Q2 2023</h5>
                  </div>
                </div>
              </AnimatedLink>
              <AnimatedLink href='/blog/latest6' className='ThumbnailLink'>
                <div className='RecentPostThumbnail'>
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
            </div>
          </InViewWrapper>
        </section>
        <section id='home-banner2' className='Section--banner'>
          <div id='home-banner2-bg' className='Banner-underlay' />
          <div className='Banner-overlay' />
          <button className='ScrollTop' onClick={this.handleScrollTop} type='button'>
            <div />
          </button>
          <NavigationMenu />
          <Footer classNames='Footer--home' />
        </section>
      </>
    );
  }
}
