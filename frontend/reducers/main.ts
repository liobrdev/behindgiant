import { IMainState } from '@/types';


export const initialMainState: IMainState = {
  isShowing: false,
  isScrollable: false,
};

export const mainReducer = (state: IMainState = initialMainState, action: any): IMainState => {
  switch (action.type) {
    case 'MAIN_SHOW':
      return { ...state, isShowing: true };

    case 'MAIN_HIDE':
      return { ...state, isShowing: false };

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