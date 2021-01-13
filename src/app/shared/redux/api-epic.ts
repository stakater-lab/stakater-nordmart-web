import {Action} from "nested-combine-reducers/dist/types";
import {ApiAction} from "./api-action";
import {Epic, ofType} from "redux-observable";
import {catchError, map, switchMap} from "rxjs/operators";
import {from} from "rxjs";
import {AjaxError} from "rxjs/internal-compatibility";
import {ShowNotificationAction} from "../../notifications/notification.redux";

type ActionConstructor<T> = new (origin: T, ...rest: any[]) => Action;
type ActionFailedConstructor<T> = new (error: Error, origin?: T) => Action;

export function createAPIEpic<T extends ApiAction>(
  type: string,
  success: ActionConstructor<T>,
  failed: ActionFailedConstructor<T>,
): Epic {
  return (action$) =>
    action$.pipe(
      ofType(type),
      switchMap((a: T) =>
        a.api$.pipe(
          map((response) => {
            a.success(response, a);
            return new success(a, response);
          }),
          catchError((err: AjaxError) => {
            return from([
              new failed(err, a),
              new ShowNotificationAction({
                type: "error",
                message: err.response?.message ? `${err.status} : ${err.response?.message}` : err.message,
                duration: 3000,
              }),
            ]);
          }),
        ),
      ),
    );
}
