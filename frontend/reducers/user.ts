import { IUserState } from '@/types';


export const initialUserState: IUserState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdating: false,
  user: undefined,
};

export const userReducer = (
  state: IUserState = initialUserState,
  action: any,
): IUserState => {
  switch (action.type) {
    case 'START_LOGIN_USER':
      return {
        ...state,
        isLoggingIn: true,
      };

    case 'STOP_LOGIN_USER':
      return {
        ...state,
        isLoggingIn: false,
      };

    case 'SUCCESS_LOGIN_USER':
      return {
        ...state,
        isLoggingIn: false,
        user: action.data,
      };

    case 'START_LOGOUT_USER':
      return {
        ...state,
        isLoggingOut: true,
      };

    case 'STOP_LOGOUT_USER':
      return {
        ...state,
        isLoggingOut: false,
      };

    case 'SUCCESS_LOGOUT_USER':
      return {
        ...state,
        isLoggingOut: false,
        user: undefined,
      };

    case 'START_UPDATE_USER':
      return {
        ...state,
        isUpdating: true,
      };

    case 'STOP_UPDATE_USER':
      return {
        ...state,
        isUpdating: false,
      };

    case 'SUCCESS_UPDATE_USER':
      return {
        ...state,
        isUpdating: false,
        user: action.data,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.data?.user,
      };

    default:
      return { ...state };
  }
};