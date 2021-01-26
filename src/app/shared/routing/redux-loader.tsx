import { PropsWithChildren, useEffect } from "react";
import { IRedux } from "./IRedux";
import { reducerRegister } from "../redux/reducers";
import { registerEpics, startEpic, stopEpic } from "../redux/middlewares";

interface IReduxLoaderProps {
  redux: IRedux[];
}

export const ReduxLoader = ({ redux, children }: PropsWithChildren<IReduxLoaderProps>) => {
  useEffect(() => {
    redux.forEach(({ key, epics, reducer }: IRedux) => {
      reducerRegister.addReducer(key, reducer);
      registerEpics(key, epics);
      startEpic(key);
    });

    return () => {
      redux.forEach(({ key }) => {
        stopEpic(key);
      });
    };
  }, [redux]);

  return children as any;
};
