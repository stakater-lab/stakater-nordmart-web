import "reflect-metadata";
import { deserialize, IConstructable, serialize } from "./property-mapper";
import { doubleStorage, get, set } from "./utils";

export function LocalStorage(key?: string, deserializeClass?: IConstructable<any>) {
  return decorate(localStorage, key || "", deserializeClass);
}

export function SessionStorage(key?: string, deserializeClass?: IConstructable<any>) {
  return decorate(sessionStorage, key || "", deserializeClass);
}

export function DoubleStorage(key?: string, deserializeClass?: IConstructable<any>) {
  return doubleStorageAccess(key || "", deserializeClass);
}

// initialization cache
function decorate(storage: Storage, key: string, deserializeClass?: IConstructable<any>) {
  return (target: any, propertyName: string): void => {
    key = key || propertyName;
    Object.defineProperty(target, propertyName, {
      get: () => {
        const storageValue = get(key, storage);
        if (deserializeClass) {
          return storageValue ? deserialize(deserializeClass, storageValue) : storageValue;
        } else {
          return storageValue;
        }
      },
      set: (value: any) => {
        if (deserializeClass) {
          value = serialize(value);
        }
        set(key, value, storage);
      },
    });
  };
}

/**
 * Sync data between session and local storage
 * @param key Storage key
 */
function doubleStorageAccess(key: string, clazz?: IConstructable<any>) {
  return (target: any, propertyName: string): void => {
    key = key || propertyName;
    const deserializeClass = clazz || Reflect.getMetadata("design:type", target, propertyName);

    Object.defineProperty(target, propertyName, {
      get: () => {
        const storageValue = doubleStorage.get(key);
        return deserializeClass ? deserialize(deserializeClass, storageValue) : storageValue;
      },
      set: (value: any) => {
        doubleStorage.set(key, value);
      },
    });
  };
}
