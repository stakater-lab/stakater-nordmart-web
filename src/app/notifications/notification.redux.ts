import { Action } from "nested-combine-reducers/dist/types";
import { INotification } from "./INotification";
import { Epic } from "redux-observable";
import { delay, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import get from "lodash/get";
import { createSelector } from "reselect";

export const SHOW_NOTIFICATION = "notification/show";

export class ShowNotificationAction implements Action {
  public type = SHOW_NOTIFICATION;

  constructor(public notification: INotification) {}
}

export const HIDE_NOTIFICATION = "notification/hide";

export class HideNotificationAction implements Action {
  public type = HIDE_NOTIFICATION;
}

type ACTIONS = ShowNotificationAction;

interface INotificationState {
  notifications: INotification[];
  active?: INotification;
}

const initialState: INotificationState = {
  notifications: [],
};

export function notificationReducer(state: INotificationState = initialState, action: ACTIONS) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        active: action.notification,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, state.active],
        active: undefined,
      };
    default:
      return state;
  }
}

export const NOTIFICATION_REDUX_KEY = "notifications";
const root = (state: any): INotificationState => get(state, NOTIFICATION_REDUX_KEY);
export const NOTIFICATION_SELECTORS = {
  notification: createSelector(root, (s) => s.active),
};

const hideNotification$: Epic = (action$) =>
  action$.ofType(SHOW_NOTIFICATION).pipe(
    switchMap(({ notification: { duration = 1000 } }: ShowNotificationAction) => {
      return of(new HideNotificationAction()).pipe(delay(duration));
    }),
  );
export const NOTIFICATION_EPICS: Epic[] = [hideNotification$];
