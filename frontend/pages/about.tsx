import { Component, MouseEvent } from 'react';

import range from 'lodash/range';
import debounce from 'lodash/debounce';

import Head from 'next/head';

import { AnimatedLink, Footer, InViewWrapper } from '@/components';
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
      const { bottom, top } = this.banner1.parentElement.getBoundingClientRect();

      if (bottom >= 0 && top <= 0) {
        this.banner1.style.top = `${-top / (1.33 * window.innerHeight) * 100}%`;
      }
    }

    if (this.collabH2?.parentElement) {
      const { bottom, top } = this.collabH2.parentElement.getBoundingClientRect();

      if (top <= window.innerHeight && bottom >= 0) {
        this.collabH2.style.top = `${
          ((window.innerHeight + 0.67 * this.collabH2.parentElement.clientHeight) - bottom) /
          (window.innerHeight + this.collabH2.parentElement.clientHeight) * 100
        }%`;
      }
    }

    if (this.banner2?.parentElement) {
      const { bottom, top } = this.banner2.parentElement.getBoundingClientRect();

      if (top <= window.innerHeight && bottom >= window.innerHeight - 20) {
        this.banner2.style.top =
          `${(window.innerHeight - bottom) / (1.33 * window.innerHeight) * 100}%`;
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
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <section id='about-banner1' className='Section--banner'>
          <div id='about-banner1-bg' className='Banner-underlay' />
          <div className='Banner-overlay' />
          <div className='Intro Intro--about'>
            <div className='Logo'>
              <img className='Logo-image' src={`${imagesUrl}/Logo-wh.png`} alt='behind GIANT' />
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
        <section id='about-mission' className='Section--generic'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Why behind GIANT?</h2></InViewWrapper>
          <div className='Row Row--mission'>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <h3>
                <strong>behind GIANT&apos;s mission</strong> is consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </h3>
            </InViewWrapper>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <div className='Column'>
                <p>
                  Quis lectus nulla at volutpat diam ut &mdash; ridiculus mus mauris vitae ultricies
                  leo integer.
                </p>
                <p>
                  Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras, enim nulla
                  aliquet porttitor lacus luctus accumsan.
                </p>
                <p>
                  Lectus magna fringilla urna porttitor rhoncus dolor purus non enim, vehicula
                  ipsum a arcu cursus vitae.
                </p>
                <p>
                  Volutpat odio facilisis mauris sit amet massa. Convallis tellus id interdum
                  velit laoreet id donec ultrices tincidunt. 
                </p>
              </div>
            </InViewWrapper>
          </div>
        </section>
        <section id='about-beliefs'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Our beliefs</h2></InViewWrapper>
          <div className='Row Row--beliefs'>
            <div className='Column'>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>01</b>
                  <p>
                    Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque
                    pulvinar.
                  </p>
                </div>
              </InViewWrapper>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>02</b>
                  <p>
                    Lectus magna fringilla urna porttitor. Ut ornare lectus sit amet est placerat.
                  </p>
                </div>
              </InViewWrapper>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>03</b>
                  <p>Enim ut sem viverra aliquet eget sit amet tellus.</p>
                </div>
              </InViewWrapper>
            </div>
            <div className='Column'>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>04</b>
                  <p>
                    Diam in arcu cursus euismod quis viverra nibh. Diam donec adipiscing
                    tristique risus nec feugiat.
                  </p>
                </div>
              </InViewWrapper>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>05</b>
                  <p>Varius sit amet mattis vulputate enim nulla aliquet porttitor.</p>
                </div>
              </InViewWrapper>
              <InViewWrapper threshold={0.5} unobserveOnEnter>
                <div className='BeliefTile'>
                  <b>06</b>
                  <p>
                    Platea dictumst vestibulum rhoncus est pellentesque. Potenti nullam ac tortor
                    vitae.
                  </p>
                </div>
              </InViewWrapper>
            </div>
          </div>
        </section>
        <section id='about-offerings'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>What we offer</h2></InViewWrapper>
          <InViewWrapper animation='enter-left' unobserveOnEnter>
            <div className='Offerings'>
              <div className='Offering'>
                <b>01</b>
                <h3>Consulting &amp; Strategy</h3>
                <p>Brand Strategy &amp; Marketing</p>
                <p>Data &amp; Analytics</p>
                <p>Consumer Insights</p>
                <p>Digital Integration</p>
              </div>
              <div className='Offering'>
                <b>02</b>
                <h3>Creative</h3>
                <p>Storytelling</p>
                <p>Experiential Marketing</p>
                <p>Print &amp; OOH</p>
                <p>Branding &amp; Design</p>
                <p>Social</p>
                <p>User Experience Design</p>
                <p>Mobile</p>
              </div>
              <div className='Offering'>
                <b>03</b>
                <h3>Production</h3>
                <p>Film &amp; TV Production</p>
                <p>Social Content Creation</p>
                <p>Directing</p>
                <p>Post Production</p>
                <p>Prototype Development</p>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='about-collab'>
          <h2 id='collab-h2'><span>Collaborative</span><span>Environment</span></h2>
          <InViewWrapper animation='triangles' threshold={0.9} unobserveOnEnter>
            <div/>
            <img src={`${imagesUrl}/triangles.png`} alt='triangles' />
            <span>INNOVATION</span>
            <span>STRATEGY</span>
            <span>TECHNOLOGY</span>
            <span>COMMUNITY</span>
          </InViewWrapper>
        </section>
        <section id='about-strategy' className='Section--generic'>
          <div className='Row Row--mission'>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <h3>
                Lorem ipsum <strong>dolor</strong> sit amet, <strong>consectetur </strong>
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </h3>
            </InViewWrapper>
            <InViewWrapper threshold={0.25} unobserveOnEnter>
              <div className='Column'>
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
          </div>
        </section>
        <section id='about-founders'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Our Team</h2></InViewWrapper>
          <InViewWrapper animation='enter-right' unobserveOnEnter>
            <div className='Founders'>
              <div className='Founder-wrapper'>
                <AnimatedLink href='/about/alvin-brown'>
                  <div className='Founder'>
                    <h3>Alvin Brown</h3>
                    <div className='FounderImage-wrapper'>
                      <div className='FounderImage' />
                    </div>
                    <div className='Founder-text'>
                      <p>
                        <q>Here should be a neat quote uttered at least once by this founder.</q>
                      </p>
                      <span>Read more</span>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
              <div className='Founder-wrapper'>
                <AnimatedLink href='/about/breanna-doe'>
                  <div className='Founder'>
                    <h3>Breanna Doe</h3>
                    <div className='FounderImage-wrapper'>
                      <div className='FounderImage' />
                    </div>
                    <div className='Founder-text'>
                      <p>
                        <q>Here should be a neat quote uttered at least once by this founder.</q>
                      </p>
                      <span>Read more</span>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
              <div className='Founder-wrapper'>
                <AnimatedLink href='/about/cole-smith'>
                  <div className='Founder'>
                    <h3>Cole Smith</h3>
                    <div className='FounderImage-wrapper'>
                      <div className='FounderImage' />
                    </div>
                    <div className='Founder-text'>
                      <p>
                        <q>Here should be a neat quote uttered at least once by this founder.</q>
                      </p>
                      <span>Read more</span>
                    </div>
                  </div>
                </AnimatedLink>
              </div>
            </div>
          </InViewWrapper>
        </section>
        <section id='about-clients'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Clients</h2></InViewWrapper>
          <div className='Clients'>
            <InViewWrapper threshold={0.5} unobserveOnEnter>
              <h3>behind GIANT has partnered with:</h3>
            </InViewWrapper>
            <InViewWrapper threshold={0.5} unobserveOnEnter>
              <ul>
                {clientsRange.map(i => (
                  <li key={i}><img src={`${imagesUrl}/Logo-bl.png`} alt='Logo' /></li>
                ))}
              </ul>
            </InViewWrapper>
          </div>
        </section>
        <section id='about-latest'>
          <InViewWrapper threshold={0.5} unobserveOnEnter><h2>Latest news</h2></InViewWrapper>
          <InViewWrapper animation='enter-left' unobserveOnEnter>
            <div className='LatestNews'>
              <div className='Article'>
                <AnimatedLink href='/news/latest3'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' />
                    </div>
                    <div className='Thumb-info'>
                      <time dateTime="2023-01-03"><b>3 Jan</b></time>
                      <img src={`${imagesUrl}/Logo-bl.png`} alt='Logo' />
                    </div>
                  </div>
                  <p>behind GIANT welcomes newest design team members</p>
                </AnimatedLink>
              </div>
              <div className='Article'>
                <AnimatedLink href='/news/latest2'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' />
                    </div>
                    <div className='Thumb-info'>
                      <time dateTime="2023-01-02"><b>2 Jan</b></time>
                      <img src={`${imagesUrl}/Logo-bl.png`} alt='Logo' />
                    </div>
                  </div>
                  <p>Announcing new partnership with Brand Company LLC by second quarter 2023</p>
                </AnimatedLink>
              </div>
              <div className='Article'>
                <AnimatedLink href='/news/latest1'>
                  <div className='Thumb'>
                    <div className='ThumbImage-wrapper'>
                      <div className='ThumbImage' />
                    </div>
                    <div className='Thumb-info'>
                      <time dateTime="2023-01-01"><b>1 Jan</b></time>
                      <img src={`${imagesUrl}/Logo-bl.png`} alt='Logo' />
                    </div>
                  </div>
                  <p>Debuting renovated online landing page</p>
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
              <img className='Logo-image' src={`${imagesUrl}/Logo-wh.png`} alt='behind GIANT'/>
            </AnimatedLink>
          </div>
          <Footer classNames='Footer--about' />
        </section>
      </>
    );
  }
}
