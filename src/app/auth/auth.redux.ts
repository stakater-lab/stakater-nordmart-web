import {Action} from "nested-combine-reducers/dist/types";
import {Epic} from "redux-observable";
import {createSelector} from "reselect";
import {authService} from "./keycloak.service";
import {Session} from "./Session";
import {ApiAction} from "../shared/redux/api-action";
import {createAPIEpic} from "../shared/redux/api-epic";


export const LOGIN = "auth/login";
export const LOGIN_SUCCESS = "auth/login/success";
export const LOGIN_FAILED = "auth/login/failed";

export class LoginAction extends ApiAction {
  public type = LOGIN;
  public api$ = authService.signIn();

  constructor() {
    super();
  }
}

export class LoginSuccessAction implements Action {
  public type = LOGIN_SUCCESS;

  constructor(public origin: LoginAction, public loginSession: Session) {

  }
}

export class LoginFailedAction implements Action {
  public type = LOGIN_FAILED;

  constructor(public error: Error) {

  }
}

export const LOGOUT = "auth/logout";
export const LOGOUT_SUCCESS = "auth/logout/success";
export const LOGOUT_FAILED = "auth/logout/failed";

export class LogOutAction extends ApiAction {
  public type = LOGOUT;
  public api$ = authService.signOut();
}

export class LogOutSuccessAction implements Action {
  public type = LOGOUT_SUCCESS;

  constructor(public origin: LogOutAction,) {

  }
}

export class LogOutFailedAction implements Action {
  public type = LOGOUT_FAILED;

  constructor(public error: Error) {

  }
}


type ACTIONS = LoginAction & LoginSuccessAction;

interface IAuthState {
  session?: Session;
}

const initialState: IAuthState = {};

export function authReducer(state: IAuthState = initialState, action: ACTIONS) {
  switch (action.type) {
    case LOGOUT:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        session: action.loginSession
      };

    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export const AUTH_STORE_KEY = "auth";
const root = (appState: any): IAuthState => appState[AUTH_STORE_KEY];

export const AUTH_SELECTOR = {
  session: createSelector(root, s => s.session),
};

export const AUTH_EPICS: Epic[] = [
  createAPIEpic(LOGIN, LoginSuccessAction, LoginFailedAction),
  createAPIEpic(LOGOUT, LogOutSuccessAction, LogOutFailedAction)
];
