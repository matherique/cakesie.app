import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function useLocalStorage<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const storageValue = window.localStorage.getItem(key);
    if (storageValue) {
      setState(JSON.parse(storageValue))
      return
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;