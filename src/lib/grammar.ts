import { ADDITIONAL_CARDS } from "../data/additionalCards";
import type { Card } from "../data/cards";
import { FORMS, FORMS_KEY_BY_CARD } from "../data/forms";
import { EXPLANATIONS } from "../data/why";
import { currentLanguage, strings } from "../i18n/language";

export const explanationFor = (cardId: string) => EXPLANATIONS[currentLanguage][cardId] || EXPLANATIONS.uk[cardId] || "";

/** Base form as shown on a card: "syn, PLURAL" becomes "syn, мн." */
export const baseFormText = (base: string) => base.replace("PLURAL", strings().pluralMark);

/** The card word in all four cases: [Mianownik, Biernik, Dopełniacz, Narzędnik] */
export const formsOf = (card: Card) => FORMS[FORMS_KEY_BY_CARD[card.id] || card.base] || null;

/** Mark the part of each word that differs from the dictionary form: telefon{u} */
export function markEnding(form: string, base: string) {
  const baseWords = base.split(" ");
  return form
    .split(" ")
    .map((word, index) => {
      const baseWord = baseWords[index] || "";
      if (word === baseWord) return word;
      let common = 0;
      while (common < word.length && common < baseWord.length && word[common] === baseWord[common]) common++;
      if (common >= word.length) return word;
      return word.slice(0, common) + "{" + word.slice(common) + "}";
    })
    .join(" ");
}

/** Endings of a marked form: "dobr{ego} syn{a}" gives ["-ego", "-a"] */
export const endingsOf = (marked: string) => [...marked.matchAll(/\{([^}]*)\}/g)].map((match) => "-" + match[1]);

/** Grammatical gender, named after its GLOSS key */
export type Gender = "masculine" | "feminine" | "neuter" | "plural";
const MASCULINE_ENDING_IN_A = ["tata", "mężczyzna", "programista", "kierowca", "kolega"];
const PLURAL_BASES = [
  ...["nowe telefony", "dobrzy rodzice", "polscy studenci", "polskie studentki", "nowi koledzy", "małe dzieci", "jabłka", "spodnie"],
  ...ADDITIONAL_CARDS.filter((entry) => entry.plural).map((entry) => entry.base.toLowerCase()),
];
/** Feminine nouns ending in a consonant (besides -ść) */
const FEMININE_ON_CONSONANT = ["noc", "pomoc", "odpowiedź"];

export function genderOf(base: string | null): Gender | null {
  if (!base) return null;
  const lower = base.toLowerCase();
  if (/plural/.test(lower) || PLURAL_BASES.includes(lower)) return "plural";
  const noun = lower.split(" ").pop() ?? "";
  if (MASCULINE_ENDING_IN_A.includes(noun)) return "masculine";
  if (/a$/.test(noun) || /ść$/.test(noun) || FEMININE_ON_CONSONANT.includes(noun)) return "feminine";
  if (/(o|e|ę|um)$/.test(noun)) return "neuter";
  return "masculine";
}

/** Case name as a glossary term in text markup: [[biernik|Biernik]] */
export const caseTerm = (grammarCase: { key: string; name: { pl: string } }) => `[[${grammarCase.key}|${grammarCase.name.pl}]]`;
