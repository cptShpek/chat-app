import { useCallback } from "react";

export const useLocalStorage = (): [
  <T = any>(_key: string) => T | null,
  (_key: string, _value: any) => void,
  () => void
] => {
  const getItem = useCallback(<T = any>(key: string): T | null => {
    try {
      const saved = localStorage.getItem(key);
      const value = JSON.parse(saved || "");
      return value;
    } catch (err) {
      console.log({ err });
      return null;
    }
  }, []);

  const setItem = useCallback(
    (key: string, value: any): void =>
      localStorage.setItem(key, JSON.stringify(value)),
    []
  );

  const clearAll = useCallback(() => localStorage.clear(), []);

  return [getItem, setItem, clearAll];
};
