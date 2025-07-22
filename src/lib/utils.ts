import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function insertAlphabeticallyByKey<
  T extends Record<K, string>,
  K extends keyof T,
>(newItem: T, oldItems: T[], key: K) {
  const newItems = [...oldItems];
  const insertion = newItems.findIndex(
    (item) => newItem[key].localeCompare(item[key]) < 0,
  );
  newItems.splice(insertion, 0, newItem);
  return newItems;
}
