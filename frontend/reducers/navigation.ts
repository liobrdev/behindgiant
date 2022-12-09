import { INavigationState } from '@/types';


export const initialNavigationState: INavigationState = {
  cornerIsCropped: false,
  isScrollable: false,
  navigationOn: false,
  overlayOn: false,
};

export const navigationReducer = (
  state: INavigationState = initialNavigationState, 
  action: any,
): INavigationState => {
  switch (action.type) {
    case 'NAVIGATION_SHOW':
      return {
        ...state,
        cornerIsCropped: true,
        isScrollable: true,
        navigationOn: true,
        overlayOn: true,
      };

    case 'NAVIGATION_CLOSE':
      return {
        ...state,
        cornerIsCropped: false,
        isScrollable: false,
        navigationOn: false,
        overlayOn: false,
      };

    case 'NAVIGATION_OVERLAY_SHOW':
      return {
        ...state,
        overlayOn: true,
      };

    case 'NAVIGATION_OVERLAY_HIDE':
      return {
        ...state,
        overlayOn: false,
      };

    case 'NAVIGATION_MAKE_SCROLLABLE':
      return {
        ...state,
        isScrollable: true,
      };

    case 'NAVIGATION_MAKE_UNSCROLLABLE':
      return {
        ...state,
        isScrollable: false,
      };

    case 'NAVIGATION_CORNER_CROP':
      return {
        ...state,
        cornerIsCropped: true,
      };

    case 'NAVIGATION_CORNER_UNCROP':
      return {
        ...state,
        cornerIsCropped: false,
      };

    case 'NAVIGATION_RESET':
      return initialNavigationState;

    default:
      return state;
  }
};