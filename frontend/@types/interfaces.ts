// Misc
export interface IAction {
  type: string;
  [key: string]: any;
}

export interface IBreadcrumbListItem {
  '@type': string;
  position: number;
  name: string;
  item: string;
}

export interface IButton {
  action: IAction;
  text: string;
}

export interface IErrorMsg {
  id: string;
  msg: string;
}

export interface IErrorInfo {
  [key: string]: IErrorMsg[];
}

export interface IIntervalTimebase {
  timeoutId?: ReturnType<typeof setTimeout>;
}

export interface IRoute {
  path: string;
  name?: string;
}

export interface IUser {
  user_slug: string;
  name: string;
  email: string;
}

export interface IUserForm {
  name: string;
  email: string;
  phone_number?: string;
  tfa_is_enabled?: boolean;
  password?: string;
  password_2?: string;
  current_password: string;
}

// Reducer states
export interface ILoadingViewState {
  isShowing: boolean;
}

export interface IMainState {
  isDisplayed: boolean;
  isOpaque: boolean;
  isScrollable: boolean;
}

export interface INavigationState {
  navigationOn: boolean;
}

export interface IUserState {
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isUpdating: boolean;
  user?: IUser;
}
