import { Action, applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { Subject } from "rxjs";

export const action$ = new Subject<Action>();
export const toPlainActionObject: Middleware = () => (next) => (action) => {
  action$.next({ ...action });
  next({ ...action });
};
export const effectRunner = createEpicMiddleware();
const initialState = {};

export const store = createStore(
  (state: any) => state,
  initialState,
  composeWithDevTools(applyMiddleware(toPlainActionObject, effectRunner)),
);
