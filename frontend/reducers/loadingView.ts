import { ILoadingViewState } from '@/types';


export const initialLoadingViewState: ILoadingViewState = {
  isShowing: true,
};

export const loadingViewReducer = (
  state: ILoadingViewState = initialLoadingViewState,
  action: any,
): ILoadingViewState => {
  switch (action.type) {
    case 'LOADING_VIEW_SHOW':
      return { ...state, isShowing: true };

    case 'LOADING_VIEW_HIDE':
      return { ...state, isShowing: false };

    default:
      return state;
  }
};
