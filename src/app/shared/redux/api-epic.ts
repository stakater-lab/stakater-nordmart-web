import { Action } from "nested-combine-reducers/dist/types";
import { ApiAction } from "./api-action";
import { IConstructable } from "../decorators/property-mapper";
import { Epic, ofType } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/operators";
import { from } from "rxjs";

type ActionConstructor<T> = new (origin: T, ...rest: any[]) => Action;

export function createAPIEpic<T extends ApiAction>(
  type: string,
  success: ActionConstructor<T>,
  failed: IConstructable<Action>,
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
          catchError((err: Error) => {
            return from([new failed(err)]);
          }),
        ),
      ),
    );
}
