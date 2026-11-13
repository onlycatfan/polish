import { useState } from "react";
import { readStored, writeStored } from "../lib/storage";

/** useState mirrored to localStorage; values from older versions that fail `isValid` fall back to the default */
export function useStoredState<T>(key: string, fallback: T, isValid: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    const stored = readStored<unknown>(key, fallback);
    return isValid(stored) ? stored : fallback;
  });
  const update = (next: T) => {
    setValue(next);
    writeStored(key, next);
  };
  return [value, update] as const;
}

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
