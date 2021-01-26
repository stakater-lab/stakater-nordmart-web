import { combineEpics, Epic } from "redux-observable";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";
import { effectRunner } from "./store";
import { useLayoutEffect } from "react";

const epicRegister = new Map<string, Subject<Epic>>();
const pausedEpics = new Map<string, boolean>();

export const registerEpic = (key: string, epic: Epic) => {
  if (!epicRegister.has(key)) {
    const epic$ = new BehaviorSubject<Epic>(epic);
    const hotReloadingEpic: Epic = (action$, ...rest) =>
      epic$.pipe(mergeMap((epc) => epc(action$, ...rest).pipe(filter(() => !pausedEpics.get(key)))));
    epicRegister.set(key, epic$);
    effectRunner.run(hotReloadingEpic);
  }

  pausedEpics.set(key, false);
};

export const startEpic = (key: string) => {
  pausedEpics.set(key, false);
};

export const stopEpic = (key: string) => {
  pausedEpics.set(key, true);
};

export function registerEpics(key: string, epics: Epic[]) {
  registerEpic(key, combineEpics(...epics));
}

export function useDynamicEpics(key: string) {
  useLayoutEffect(() => {
    startEpic(key);
    return () => {
      stopEpic(key);
    };
  }, []);
}
