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

    this.props.makeMainUnscrollable();
    this.props.turnMainOpacityOff();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 333);
    });

    this.props.turnMainDisplayOff();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 500);
    });

    this.props.showLoadingView();

    await new Promise(resolve => {
      this.animationTimeout = setTimeout(resolve, 1000);
    });

    this.props.closeNavigation();
    this.props.router.push(pathname, undefined, { scroll: false });
  }

  componentWillUnmount() {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
  }

  render() {
    const { handleLink, props: { className, children, href } } = this;

    return <a href={href} onClick={handleLink} className={className}>{children}</a>;
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
  makeMainUnscrollable: () => {
    dispatch({ type: 'MAIN_MAKE_UNSCROLLABLE' });
  },
  showLoadingView: () => {
    dispatch({ type: 'LOADING_VIEW_SHOW' });
  },
  turnMainDisplayOff: () => {
    dispatch({ type: 'MAIN_DISPLAY_OFF' });
  },
  turnMainOpacityOff: () => {
    dispatch({ type: 'MAIN_OPACITY_OFF' });
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  children: ReactNode;
  href: string;
  router: NextRouter;
  className?: string;
}

export default connector(withRouter(AnimatedLink));
