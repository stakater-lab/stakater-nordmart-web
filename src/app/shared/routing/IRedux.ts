import { Reducer } from "nested-combine-reducers/dist/types";
import { Epic } from "redux-observable";

export interface IRedux {
  key: string;
  reducer: Reducer<any, any>;
  epics: Epic[];
}
