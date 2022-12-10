import { INavigationState } from '@/types';


export const initialNavigationState: INavigationState = {
  navigationOn: false,
};

export const navigationReducer = (
  state: INavigationState = initialNavigationState, 
  action: any,
): INavigationState => {
  switch (action.type) {
    case 'NAVIGATION_SHOW':
      return { ...state, navigationOn: true };

    case 'NAVIGATION_CLOSE':
      return { ...state, navigationOn: false };

    case 'NAVIGATION_RESET':
      return initialNavigationState;

    default:
      return state;
  }
};