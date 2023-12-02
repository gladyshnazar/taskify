import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useStorage<T>(key, initialValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useStorage<T>(key, initialValue, window.sessionStorage);
}

function useStorage<T>(key: string, initialValue: T, storageObject: Storage) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    if (initialValue instanceof Function) {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value === undefined) {
      storageObject.removeItem(key);
    }
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue] as const;
}
