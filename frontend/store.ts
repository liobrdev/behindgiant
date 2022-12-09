import { applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer, { initialAppState } from '@/reducers';


export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialAppState,
  devTools: composeWithDevTools(applyMiddleware()),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
