import { Component, MouseEvent } from 'react';

import range from 'lodash/range';
import debounce from 'lodash/debounce';

import Head from 'next/head';

import { AnimatedLink, Footer, InViewWrapper, MediaToBeLoaded } from '@/components';
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
    name: "About",
    item: "https://behindgiant.com/about"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

const clientsRange = range(12);

export default class About extends Component {
  private banner1: HTMLElement | null;
  private banner2: HTMLElement | null;
  private collabH2: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.banner1 = null;
    this.banner2 = null;
    this.collabH2 = null;
    this.onScroll = debounce(this.onScroll.bind(this), 5, { leading: true });
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
  }

  onScroll() {
    if (this.banner1?.parentElement) {
      if (window.innerHeight < 500) {
        if (this.banner1.style.top != '0') this.banner1.style.top = '0';
      } else {
        const { bottom, top } = this.banner1.parentElement.getBoundingClientRect();
  
        if (bottom >= 0 && top <= 0) {
          this.banner1.style.top = `${-top / (1.33 * window.innerHeight) * 100}%`;
        }
      }
    }

    if (this.collabH2?.parentElement) {
      const { bottom, top } = this.collabH2.parentElement.getBoundingClientRect();

      if (top <= window.innerHeight && bottom >= 0) {
        this.collabH2.style.top = `${
          ((window.innerHeight + 0.75 * this.collabH2.parentElement.clientHeight) - bottom) /
          (window.innerHeight + this.collabH2.parentElement.clientHeight) * 100
        }%`;
      }
    }

    if (this.banner2?.parentElement) {
      if (window.innerHeight < 500) {
        if (this.banner2.style.top != '0') this.banner2.style.top = '0';
      } else {
        const { bottom, top } = this.banner2.parentElement.getBoundingClientRect();

        if (top <= window.innerHeight && bottom >= window.innerHeight - 20) {
          this.banner2.style.top =
            `${(window.innerHeight - bottom) / (1.33 * window.innerHeight) * 100}%`;
        }
      }
    }
  }

  handleScrollDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    document.getElementById('main')?.scrollTo({
      top: this.banner1?.clientHeight,
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
    this.banner1 = document.getElementById('about-banner1-bg');
    this.banner2 = document.getElementById('about-banner2-bg');
    this.collabH2 = document.getElementById('collab-h2');
  }

  componentWillUnmount() {
    document.getElementById('main')?.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <>
        <Head>
          <title>About</title>
          <script type='application/ld+json'>{breadcrumb}</script>
        </Head>
        <MediaToBeLoaded imageUrls={[
          imagesUrl + '/Logo-wh.png',
          imagesUrl + '/tokyo.jpg',
          imagesUrl + '/meeting-icon.png',
          imagesUrl + '/puzzle-icon.png',
          imagesUrl + '/gears-icon.png',
          imagesUrl + '/ikigai.png',
          imagesUrl + '/stock-portrait-man2.jpg',
          imagesUrl + '/photographer.jpg',
          imagesUrl + '/sold.jpg',
          imagesUrl + '/ideas.jpg',
          '/twitter_white.png',
          '/instagram_white.png',
          '/facebook_white.png',
          '/linkedin_white.png',
        ]}/>
        <section id='about-banner1' className='Section--banner'>
          <div id='about-banner1-bg' className='Banner-underlay' />
          <div className='Banner-overlay' />
          <div className='Intro Intro--about'>
            <div className='Logo'>
              <img className='Logo-image' src={imagesUrl + '/Logo-wh.png'} alt='behind GIANT' />
            </div>
            <div className='IntroText IntroText--about'>
              <h1>A consultancy and creative agency, purposefully built for the modern age.</h1>
            </div>
          </div>
          <button className='ScrollDown' onClick={this.handleScrollDown} type='button'>
            <span>Scroll</span>
            <div/>
          </button>
        </section>
        <section id='about-mission'>
          <h3>WHY behind GIANT?</h3>
          <div className='Columns'>
            <div className='Column'>
              <h5>
                <strong>Our mission</strong>&nbsp;
                <span>
                  is consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </span>
              </h5>
            </div>
            <div className='Column'>
              <p>
                <span>
                  Quis lectus nulla at volutpat diam ut &mdash; ridiculus mus mauris vitae
                  ultricies leo integer.
                </span>
              </p>
              <p>
                <span>
                  Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras, enim nulla
                  aliquet porttitor lacus luctus accumsan.
                </span>
              </p>
              <p>
                <span>
                  Lectus magna fringilla urna porttitor rhoncus dolor purus non enim, vehicula
                  ipsum a arcu cursus vitae.
                </span>
              </p>
              <p>
                <span>
                  Volutpat odio facilisis mauris sit amet massa. Convallis tellus id interdum
                  velit laoreet id donec ultrices tincidunt. 
                </span>
              </p>
            </div>
          </div>
        </section>
        <section id='about-offerings'>
          <h3>OUR OFFERINGS</h3>
          <div className='Offerings'>
            <div className='Offering'>
              <div className='IconContainer'>
                <img src={imagesUrl + '/meeting-icon.png'} alt='' width='100px' />
              </div>
              <h5>Consulting &amp; Strategy</h5>
              <p>Brand Strategy &amp; Marketing</p>
              <p>Data &amp; Analytics</p>
              <p>Consumer Insights</p>
              <p>Digital Integration</p>
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
              <p>User Experience Design</p>
              <p>Mobile</p>
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
              <p>Prototype Development</p>
            </div>
          </div>
        </section>
        <section id='about-beliefs'>
          <InViewWrapper threshold={0.25} unobserveOnEnter>
            <h2>What we believe</h2>
          </InViewWrapper>
          <div className='Row Row--mission'>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <div className='Column'>
                <h3>
                  Lorem ipsum <strong>dolor</strong> sit amet, <strong>consectetur </strong>
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </h3>
                <p>
                  Tellus mauris a diam maecenas sed enim, augue mauris augue neque gravida in
                  fermentum et sollicitudin, nibh nisl condimentum id venenatis a, molestie at
                  elementum eu facilisis sed odio aoreet suspendisse interdum consectetur libero
                  id faucibus nisl tincidunt eget.
                </p>
                <p>
                  Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Interdum
                  consectetur libero id faucibus nisl tincidunt eget nullam, neque convallis a
                  cras semper auctor neque.
                </p>
                <p>
                  Nunc congue nisi vitae suscipit tellus mauris a diam. Sit amet facilisis magna
                  etiam, et magnis dis parturient montes.
                </p>
              </div>
            </InViewWrapper>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <img className='Ikigai-image' src={imagesUrl + '/ikigai.png'} alt='Ikigai image' />
            </InViewWrapper>
          </div>
        </section>
        <section id='about-who-we-are'>
          <h3>Who we are</h3>
          <div className='Columns'>
            <div className='Column'>
              <h5>
                <span>Founder and CEO</span>&nbsp;
                <b>Anwar Malloy</b>&nbsp;
                <span>
                  congue nisi vitae suscipit tellus mauris a diam. Sit amet facilisis magna etiam,
                  et magnis dis parturient montes.
                </span>
              </h5>
              <img src={imagesUrl + '/stock-portrait-man2.jpg'} alt='Photo of CEO' />
            </div>
            <div className='Column'>
              <p>
                <q>Here should be a neat quote uttered at least once by this founder.</q>&nbsp;
                <i>Read more</i>
              </p>
              <p>
                <span>
                  Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras, enim nulla
                  aliquet porttitor lacus luctus accumsan.
                </span>
              </p>
              <p>
                <span>
                  Lectus magna fringilla urna porttitor rhoncus dolor purus non enim, vehicula
                  ipsum a arcu cursus vitae.
                </span>
              </p>
              <p>
                <span>
                  Volutpat odio facilisis mauris sit amet massa. Convallis tellus id interdum
                  velit laoreet id donec ultrices tincidunt. 
                </span>
              </p>
            </div>
          </div>
        </section>
        <section id='about-clients'>
          <h3>Clients</h3>
          <div>
            <h5>
              <span>behind Giant has partnered with:</span>
            </h5>
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
                <span>Old & News Clothing</span>
              </li>
            </ul>
            <h5>
              <span>+ several other brands, individuals, and creative agencies.</span>&nbsp;
              <AnimatedLink href='/contact'><strong>Talk to us</strong></AnimatedLink>&nbsp;
              <span>&mdash;</span>&nbsp;
              <span>we'd love to work with you.</span>
            </h5>
          </div>
        </section>
        <section id='about-latest'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Recent posts</h2></InViewWrapper>
          <InViewWrapper unobserveOnEnter>
            <div className='LatestNews'>
              <div className='Article'>
                <AnimatedLink href='/news/latest3' className='TextLink'>
                  <div className='Text'>
                    <time dateTime='2023-01-03'>January 3, 2023</time>
                    <h4>behind GIANT welcomes newest design team members</h4>
                  </div>
                </AnimatedLink>
                <AnimatedLink href='/news/latest3' className='ThumbLink'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' style={{
                        backgroundImage: 'url(' + imagesUrl + '/photographer.jpg' + ')'
                      }}/>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
              <div className='Article'>
                <AnimatedLink href='/news/latest2' className='TextLink'>
                  <div className='Text'>
                    <time dateTime='2023-01-02'>January 2, 2023</time>
                    <h4>Announcing upcoming Brand Company LLC partnership in Q2 2023</h4>
                  </div>
                </AnimatedLink>
                <AnimatedLink href='/news/latest2' className='ThumbLink'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' style={{
                        backgroundImage: 'url(' + imagesUrl + '/sold.jpg' + ')'
                      }}/>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
              <div className='Article'>
                <AnimatedLink href='/news/latest1' className='TextLink'>
                  <div className='Text'>
                    <time dateTime='2023-01-01'>January 1, 2023</time>
                    <h4>Debuting renovated online landing page</h4>
                  </div>
                </AnimatedLink>
                <AnimatedLink href='/news/latest1' className='ThumbLink'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' style={{
                        backgroundImage: 'url(' + imagesUrl + '/ideas.jpg' + ')'
                      }}/>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='about-banner2' className='Section--banner'>
          <div id='about-banner2-bg' className='Banner-underlay' />
          <div className='Banner-overlay' />
          <button className='ScrollTop' onClick={this.handleScrollTop} type='button'>
            <div/>
            <span>Scroll top</span>
          </button>
          <div className='Logo'>
            <AnimatedLink href='/'>
              <img className='Logo-image' src={imagesUrl + '/Logo-wh.png'} alt='behind GIANT'/>
            </AnimatedLink>
          </div>
          <Footer classNames='Footer--about' />
        </section>
      </>
    );
  }
}
