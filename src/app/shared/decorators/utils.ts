const STORAGE_PREFIX = "";

export function toStorageKey(token: string) {
  if (!token) {
    throw Error("WebStorageUtil error: Token is not defined");
  }

  return STORAGE_PREFIX + token;
}

export function get(key: string, storage: Storage): any {
  const storageKey = toStorageKey(key);
  const value = storage.getItem(storageKey);

  return value ? deserialize(value) : null;
}

export function set(key: string, value: any, storage: Storage): void {
  const storageKey = toStorageKey(key);

  if (value === undefined) {
    storage.removeItem(storageKey);
  } else {
    storage.setItem(storageKey, serialize(value));
  }
}

class DoubleStorage {
  public get(key: string) {
    return get(key, sessionStorage) || get(key, localStorage);
  }

  public set(key: string, value: any) {
    if (value === undefined) {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    } else {
      set(key, value, sessionStorage);
      set(key, value, localStorage);
    }
  }
}

export const doubleStorage = new DoubleStorage();

export function remove(key: string, storage: Storage): void {
  const storageKey = toStorageKey(key);

  storage.removeItem(storageKey);
}

export function clear(storage: Storage) {
  storage.clear();
}

function serialize(value: any): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function deserialize(value: string): any {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
