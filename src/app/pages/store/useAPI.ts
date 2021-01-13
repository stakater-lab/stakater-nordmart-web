import {Observable} from "rxjs";
import {useEffect, useState} from "react";
import {tap} from "rxjs/operators";

export function useAPI<T>($observable: Observable<T>, defaultValue: T): [T, any] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const subscription = $observable.pipe(tap(() => setIsFetching(true))).subscribe(results => {
      setValue(results);
      setIsFetching(false);
    });
    return () => {
      subscription.unsubscribe();
      setIsFetching(false);
    }
  }, [$observable]);

  return [value, isFetching];
}
