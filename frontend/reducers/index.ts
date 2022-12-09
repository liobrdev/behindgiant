import { combineReducers } from 'redux';

import { loadingViewReducer, initialLoadingViewState } from './loadingView';
import { mainReducer, initialMainState } from './main';
import { navigationReducer, initialNavigationState } from './navigation';
import { userReducer, initialUserState } from './user';


const reducers = {
  loadingView: loadingViewReducer,
  main: mainReducer,
  navigation: navigationReducer,
  user: userReducer,
};

export const initialAppState = {
  loadingView: initialLoadingViewState,
  main: initialMainState,
  navigation: initialNavigationState,
  user: initialUserState,
};

export default combineReducers(reducers);
