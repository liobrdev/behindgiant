import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { NavigationIcon, NavigationMenu } from '@/components';
import { AppDispatch, AppState } from '@/types';


class Navigation extends Component<Props> {
  render() {
    const { navigationOn, closeNavigation } = this.props;

    return (
      <>
        {navigationOn && <div className='Navigation-overlay' onClick={closeNavigation} />}
        <div className={`Navigation${navigationOn ? ' is-on' : ''}`}>
          <NavigationIcon isOn={navigationOn} />
          {navigationOn && <NavigationMenu />}
        </div>
        {navigationOn && <div className='Navigation-edge' />}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  navigationOn: state.navigation.navigationOn,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeNavigation: () => {
    dispatch({ type: 'NAVIGATION_CLOSE' });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Navigation);
