import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { NavigationIcon, NavigationMenu } from '@/components';
import { AppDispatch, AppState } from '@/types';


class Navigation extends Component<Props> {
  render() {
    const {
      cornerIsCropped, isScrollable, navigationOn, overlayOn, closeNavigation,
    } = this.props;

    return (
      <>
        {overlayOn && <div className='Navigation-overlay' onClick={closeNavigation} />}
        <div className={
          `Navigation${
            navigationOn ? ' is-on' : ''
          }${
            isScrollable ? ' is-scrollable' : ''
          }${
            cornerIsCropped ? ' is-corner-cropped' : ''
          }`
        }>
          <NavigationIcon isOn={navigationOn} />
          {navigationOn && <NavigationMenu />}
        </div>
        {navigationOn && <div className='Navigation-edge' />}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cornerIsCropped: state.navigation.cornerIsCropped,
  isScrollable: state.navigation.isScrollable,
  navigationOn: state.navigation.navigationOn,
  overlayOn: state.navigation.overlayOn,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Navigation);
