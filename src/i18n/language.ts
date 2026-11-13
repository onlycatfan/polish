import { UI, type Strings } from "./ui";

export type Language = "pl" | "uk" | "ru";
export const LANGUAGES: { key: Language; label: string }[] = [
  { key: "pl", label: "PL" },
  { key: "uk", label: "UA" },
  { key: "ru", label: "RU" },
];
export const isLanguage = (value: unknown): value is Language => value === "pl" || value === "uk" || value === "ru";

/*
 * Current language and beginner mode as live module bindings.
 * App sets them on every render before its children render, so plain helpers
 * (strings(), explanationFor(), ...) read the same values as the component tree.
 */
export let currentLanguage: Language = "uk";
export let beginnerMode = true;
export function setRuntimeSettings(language: Language, beginner: boolean) {
  currentLanguage = language;
  beginnerMode = beginner;
}

export const strings = (): Strings => UI[currentLanguage];
