import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { store } from "./store";
import { nestedCombineReducers } from "nested-combine-reducers";
import set from "lodash/set";
import merge from "lodash/merge";

export class ReducerRegister {
  private _reducers: { [key: string]: Reducer } = {};

  get reducers(): ReducersMapObject {
    return this._reducers;
  }

  public addReducer(name: string, reducer: Reducer<any, any>) {
    const reducerObj = {};
    set(reducerObj, name, reducer);
    this._reducers = merge(this._reducers, reducerObj);
    store.replaceReducer(nestedCombineReducers(this._reducers, combineReducers));
  }

  public remove(name: string) {
    const res = Object.assign({}, this._reducers);
    delete res[name];
    this._reducers = res;
    store.replaceReducer(combineReducers(this._reducers));
  }
}

export const reducerRegister = new ReducerRegister();
