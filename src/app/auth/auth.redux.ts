import { Action } from "nested-combine-reducers/dist/types";
import moment from "moment";
import { Epic, ofType } from "redux-observable";
import { createSelector } from "reselect";
import { authService } from "./keycloak.service";
import { catchError, mapTo, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Session } from "./Session";
import { doubleStorage } from "../shared/decorators/utils";

export const STORED_REALM = "keycloak-realm";
export const UNAUTHORIZED = "auth/unauthorized";

export class UnauthorizedAccessAction implements Action {
  public type = UNAUTHORIZED;
}

export const LOGIN = "auth/login";
export const LOGIN_SUCCESS = "auth/login/success";
export const LOGIN_FAILED = "auth/login/failed";

export class LoginAction implements Action {
  public type = LOGIN;

  constructor(public email: string) {}
}

export class LoginSuccessAction implements Action {
  public type = LOGIN_SUCCESS;

  constructor(public loginSession: Session) {}
}

export class LoginFailedAction implements Action {
  public type = LOGIN_FAILED;

  constructor(public error: Error) {}
}

export const LOGOUT = "auth/logout";
export const LOGOUT_SUCCESS = "auth/logout/success";
export const LOGOUT_FAILED = "auth/logout/failed";

export class LogoutAction implements Action {
  public type = LOGOUT;
}

export class LogoutSuccessAction implements Action {
  public type = LOGOUT_SUCCESS;
}

export class LogoutFailedAction implements Action {
  public type = LOGOUT_FAILED;

  constructor(public error: Error) {}
}

type ACTIONS = LoginAction & LoginSuccessAction;

interface IAuthState {
  username?: string;
  token?: string;
  tokenExpiration?: string;
  unauthorizedAccessDetected: boolean;
}

const initialState: IAuthState = {
  unauthorizedAccessDetected: false,
};

export function authReducer(state: IAuthState = initialState, action: ACTIONS) {
  switch (action.type) {
    case LOGOUT:
      doubleStorage.set(STORED_REALM, undefined);
      return state;
    case LOGIN_SUCCESS:
      const { username, token } = action.loginSession;
      return {
        ...state,
        username,
        token,
        tokenExpiration,
        unauthorizedAccessDetected: false,
      };

    case LOGOUT_SUCCESS:
      return {
        unauthorizedAccessDetected: false,
      };

    case UNAUTHORIZED:
      return {
        ...state,
        unauthorizedAccessDetected: true,
      };
    default:
      return state;
  }
}

export const AUTH_STORE_KEY = "auth";
const root = (appState: any): IAuthState => appState[AUTH_STORE_KEY];
const tokenExpiration = createSelector(root, (authState) => moment(authState.tokenExpiration).toDate());
const isAuthorized = createSelector(root, (authState) => authState.token && !authService.keyCloak.isTokenExpired());
const unauthorizedAccessDetected = createSelector(root, (authState) => !authState.unauthorizedAccessDetected);

export const AUTH_SELECTOR = {
  isAuthorized,
  unauthorizedAccessDetected,
};

export const AUTH_EPICS: Epic[] = [
  (action$) =>
    action$.pipe(
      ofType(LOGOUT),
      switchMap(() =>
        authService.signOut().pipe(
          mapTo(new LogoutSuccessAction()),
          catchError((err) => of(new LogoutFailedAction(err))),
        ),
      ),
    ),
];
