import { IMainState } from '@/types';


export const initialMainState: IMainState = {
  isDisplayed: false,
  isOpaque: false,
  isScrollable: false,
};

export const mainReducer = (state: IMainState = initialMainState, action: any): IMainState => {
  switch (action.type) {
    case 'MAIN_DISPLAY_ON':
      return { ...state, isDisplayed: true };

    case 'MAIN_DISPLAY_OFF':
      return { ...state, isDisplayed: false };

    case 'MAIN_OPACITY_ON':
      return { ...state, isOpaque: true };

    case 'MAIN_OPACITY_OFF':
      return { ...state, isOpaque: false };

    case 'MAIN_MAKE_SCROLLABLE':
    case 'NAVIGATION_CLOSE':
      return { ...state, isScrollable: true };

    case 'MAIN_MAKE_UNSCROLLABLE':
    case 'NAVIGATION_SHOW':
      return { ...state, isScrollable: false };

    default:
      return state;
  }
};