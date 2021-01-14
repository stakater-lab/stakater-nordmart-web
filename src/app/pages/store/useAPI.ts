import { Observable } from "rxjs";
import { useEffect, useState } from "react";

export function useAPI<T>($observable: Observable<T>, defaultValue: T): [T, any] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const subscription = $observable.subscribe((results) => {
      setValue(results);
      setIsFetching(false);
    });
    return () => {
      subscription.unsubscribe();
      setIsFetching(false);
    };
  }, [$observable]);

  return [value, isFetching];
}
