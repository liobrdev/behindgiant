import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import every from 'lodash/every';
import filter from 'lodash/filter';
import throttle from 'lodash/throttle';

import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';

import { AppDispatch, AppState } from '@/types';

import { LoadingView, MediaToBeLoaded, Navigation } from './';


const description = 'behind GIANT - Creative Agency';
const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

class RootComponent extends Component<Props> {
  private animationTimeout?: ReturnType<typeof setTimeout>;
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleResize = throttle(this.handleResize.bind(this), 200, { leading: true });
    this.isMediaLoaded = this.isMediaLoaded.bind(this);
    this.checkIsMediaLoaded = this.checkIsMediaLoaded.bind(this);
    this.animationTimeout = undefined;
    this.loadingTimeout = undefined;
  }

  handleEsc(e: KeyboardEvent) {
    if (e.code === 'Escape') this.props.closeNavigation();
  }

  handleResize() {
    document.body.style.height = window.innerHeight + 'px';
  }

  isMediaLoaded(): boolean {
    const divs = document.getElementsByClassName('MediaToBeLoaded');
    let mediaLoadedSuccessfully = true;

    for (let i = 0; i < divs.length; ++i) {
      const media = divs[i];

      const videos = filter(media.children, element => 
        element.nodeName.toLowerCase() === 'video'
        && 'readyState' in element
      );

      if (!every(videos, (vid) => (vid as HTMLVideoElement).readyState === 4)) {
        mediaLoadedSuccessfully = false;
        break;
      }
  
      const images = filter(media.children, element => 
        element.nodeName.toLowerCase() === 'img'
        && 'complete' in element
        && 'naturalHeight' in element
      );
  
      if (!every(images, (img) =>
        (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalHeight !== 0
      )) {
        mediaLoadedSuccessfully = false;
        break;
      }
    }

    return mediaLoadedSuccessfully;
  }

  checkIsMediaLoaded(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.isMediaLoaded()) return resolve(true);

      let counter = 10;

      const recursiveCheck = () => {
        this.loadingTimeout = setTimeout(() => {
          --counter;

          if (this.isMediaLoaded()) {
            resolve(true);
          } else if (counter === 0) {
            resolve(false);
          } else {
            recursiveCheck();
          }
        }, 1000);
      };

      recursiveCheck();
    });
  }

  async animateShowMain() {
    if (this.props.mainIsScrollable) this.props.makeMainUnscrollable();
    if (this.props.mainIsOpaque) this.props.turnMainOpacityOff();
    if (this.props.mainIsDisplayed) this.props.turnMainDisplayOff();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 1000);
    });

    if (!await this.checkIsMediaLoaded()) {
      console.error('Media did not load within a reasonable time frame!');
    }

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 1000);
    });

    this.props.turnMainDisplayOn();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 250);
    });
  
    this.props.turnMainOpacityOn();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 1000);
    });

    this.props.makeMainScrollable();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 100);
    });

    window.scrollTo(0, 0);
    document.getElementById('main')?.scrollTo(0, 0);

    this.props.hideLoadingView();
  }

  async componentDidMount() {
    this.handleResize();
    window.addEventListener('keydown', this.handleEsc);
    window.addEventListener('resize', this.handleResize);
    await this.animateShowMain();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      await this.animateShowMain();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
    window.removeEventListener('resize', this.handleResize);
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  render() {
    const { loadingViewIsShowing, mainIsDisplayed, mainIsOpaque, mainIsScrollable } = this.props;

    let name = this.props.router.pathname;

    if (name === '/') name = 'home';
    else name = name.slice(1);

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            sizes="48x48"
            href="/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#9A544B" />
          <meta name="theme-color" content="#9A544B" />
          <meta itemProp="name" content="behind GIANT" />
          <meta itemProp="description" content={description} />
          <meta name="description" content={description} />
          <meta property="og:title" content="behind GIANT" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://behindgiant.com" />
          <meta property="og:description" content={description} />
        </Head>
        <div className='SiteContainer'>
          <MediaToBeLoaded imageUrls={[`${imagesUrl}/Logo-pr.png`]}/>
          {loadingViewIsShowing && <LoadingView />}
          <main id='main' className={
            `Main Main--${name}${
              mainIsDisplayed ? ' is-displayed' : ''
            }${
              mainIsOpaque ? ' is-opaque' : ''
            }${
              mainIsScrollable ? ' is-scrollable' : ''
            }`
          }>
            <Navigation />
            {this.props.children}
          </main>
        </div>
      </>
    );    
  }
}

const mapStateToProps = (state: AppState) => ({
  loadingViewIsShowing: state.loadingView.isShowing,
  mainIsDisplayed: state.main.isDisplayed,
  mainIsOpaque: state.main.isOpaque,
  mainIsScrollable: state.main.isScrollable,
  navigationOn: state.navigation.navigationOn,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
  hideLoadingView: () => {
    dispatch({ type: 'LOADING_VIEW_HIDE' });
  },
  makeMainScrollable: () => {
    dispatch({ type: 'MAIN_MAKE_SCROLLABLE' });
  },
  makeMainUnscrollable: () => {
    dispatch({ type: 'MAIN_MAKE_UNSCROLLABLE' });
  },
  turnMainDisplayOn: () => {
    dispatch({ type: 'MAIN_DISPLAY_ON' });
  },
  turnMainDisplayOff: () => {
    dispatch({ type: 'MAIN_DISPLAY_OFF' });
  },
  turnMainOpacityOn: () => {
    dispatch({ type: 'MAIN_OPACITY_ON' });
  },
  turnMainOpacityOff: () => {
    dispatch({ type: 'MAIN_OPACITY_OFF' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  children: ReactNode;
  router: NextRouter;
}

export default connector(withRouter(RootComponent));
