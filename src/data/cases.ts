/** Case keys double as GLOSS keys of the case terms */
export type CaseKey = "mianownik" | "biernik" | "dopelniacz" | "narzednik";
export interface Case {
  key: CaseKey;
  name: { pl: string; uk: string; ru: string };
  question: { pl: string; uk: string; ru: string };
}

export const CASES: Case[] = [
  { key: "mianownik", name: { pl: "Mianownik", uk: "Називний", ru: "Именительный" }, question: { pl: "kto? co?", uk: "хто? що?", ru: "кто? что?" } },
  { key: "biernik", name: { pl: "Biernik", uk: "Знахідний", ru: "Винительный" }, question: { pl: "kogo? co?", uk: "кого? що?", ru: "кого? что?" } },
  { key: "dopelniacz", name: { pl: "Dopełniacz", uk: "Родовий", ru: "Родительный" }, question: { pl: "kogo? czego?", uk: "кого? чого?", ru: "кого? чего?" } },
  { key: "narzednik", name: { pl: "Narzędnik", uk: "Орудний", ru: "Творительный" }, question: { pl: "kim? czym?", uk: "ким? чим?", ru: "кем? чем?" } },
];
export const CASE_BY_KEY = Object.fromEntries(CASES.map((item) => [item.key, item])) as Record<CaseKey, Case>;
/** Order of the four forms in FORMS rows */
export const CASE_ORDER: CaseKey[] = ["mianownik", "biernik", "dopelniacz", "narzednik"];
