import { Component, MouseEvent, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { NextRouter, withRouter } from 'next/router';

import { AppDispatch } from '@/types';


class AnimatedLink extends Component<Props> {
  private animationTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.animationTimeout = undefined;
  }

  async handleLink(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    let pathname = (e.currentTarget as HTMLAnchorElement).pathname || '/';

    if (pathname === this.props.router.pathname) {
      return this.props.closeNavigation();
    }

    this.props.uncropNavigationCorner();
    this.props.makeNavigationUnscrollable();
    this.props.makeMainUnscrollable();
    this.props.hideNavigationOverlay();
    this.props.showLoadingView();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 200);
    });

    this.props.hideMain();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 1000);
    });

    this.props.closeNavigation();
    this.props.router.push(pathname);
  }

  componentWillUnmount() {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
  }

  render() {
    const { handleLink, props: { children, href } } = this;

    return <a href={href} onClick={handleLink}>{children}</a>;
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
  hideNavigationOverlay: () => {
    dispatch({ type: 'NAVIGATION_OVERLAY_HIDE' });
  },
  hideMain: () => {
    dispatch({ type: 'MAIN_HIDE' });
  },
  makeNavigationUnscrollable: () => {
    dispatch({ type: 'NAVIGATION_MAKE_UNSCROLLABLE' });
  },
  makeMainUnscrollable: () => {
    dispatch({ type: 'MAIN_MAKE_UNSCROLLABLE' });
  },
  showLoadingView: () => {
    dispatch({ type: 'LOADING_VIEW_SHOW' });
  },
  uncropNavigationCorner: () => {
    dispatch({ type: 'NAVIGATION_CORNER_UNCROP' });
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  children: ReactNode;
  href: string;
  router: NextRouter;
}

export default connector(withRouter(AnimatedLink));
