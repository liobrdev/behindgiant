import Head from 'next/head';
import Link from 'next/link';
import { Component } from 'react';

import { Clocks, Footer, MediaToBeLoaded } from '@/components';
import { IBreadcrumbListItem, IIntervalTimebase } from '@/types';
import { customSetInterval, customClearInterval } from '@/utils';


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
    name: "Contact",
    item: "https://behindgiant.com/contact"
  }
];

const breadcrumb = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbList
});

interface State {
  clocksAreMounted: boolean;
}

export default class Contact extends Component<{}, State> {
  private refreshClockInterval?: IIntervalTimebase;

  constructor(props: {}) {
    super(props);
    this.state = { clocksAreMounted: true };
  }

  componentDidUpdate() {
    if (!this.state.clocksAreMounted) {
      this.setState({ clocksAreMounted: true }, () => {
        customClearInterval(this.refreshClockInterval);

        this.refreshClockInterval = customSetInterval(() => {
          this.setState({ clocksAreMounted: false });
        }, 5 * 60 * 1000);
      });
    }
  }

  componentDidMount() {
    this.refreshClockInterval = customSetInterval(() => {
      this.setState({ clocksAreMounted: false });
    }, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    customClearInterval(this.refreshClockInterval);
  }

  render() {
    return (
      <>
        <Head>
          <title>Contact</title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <MediaToBeLoaded imageUrls={[
          imagesUrl + '/Logo-wh.png',
          imagesUrl + '/urban-colors.jpg',
          '/twitter_white.png',
          '/instagram_white.png',
          '/facebook_white.png',
          '/linkedin_white.png',
        ]}/>
        <section id='contact'>
          <div className='Banner-underlay' />
          <div className='Banner-overlay' />
          <div className='Logo'>
            <h1>behind Giant</h1>
          </div>
          <div className='ContactDetails'>
            <div className='ContactDetail'>
              {this.state.clocksAreMounted && <Clocks />}
              <h2 className='Location'>東京 Tokyo, Japan</h2>
              <hr/>
              <div className='Connect'>
                <div><Link href="tel://510.555.8400"><a>510.555.8400</a></Link></div>
                <div>
                  <Link href="mailto:info@behindgiant.com"><a>info@behindgiant.com</a></Link>
                </div>
              </div>
            </div>
          </div>
          <Footer classNames='Footer--contact'/>
        </section>
      </>
    );
  }
}
