import { Action } from "nested-combine-reducers/dist/types";
import { Observable } from "rxjs";
import {CallBack} from "../../typings";

export interface IApiAction extends Action {
  api$: Observable<any>;
  successCb?: CallBack;
}

export abstract class ApiAction implements IApiAction {
  public type: string;
  public abstract api$: Observable<any>;
  public successCb?: CallBack;

  public success = (...args: any) => {
    try {
      if (!this.successCb) {
        return;
      }

      this.successCb(...args);
    } catch (e) {}
  };
}
