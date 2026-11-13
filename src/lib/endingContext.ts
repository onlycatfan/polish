import type { Card } from "../data/cards";
import { CASE_BY_KEY, CASES, type CaseKey } from "../data/cases";
import type { ExamItem } from "../data/exam";
import { strings } from "../i18n/language";
import { formsOf } from "./grammar";
import { examHint, triggerOf } from "./hints";

/** What an ending tooltip needs to explain itself */
export interface EndingContext {
  caseKey: CaseKey | null;
  base: string | null;
  answer: string;
  forms: string[] | null;
  reason: string;
}

export const cardContext = (card: Card): EndingContext => ({
  caseKey: card.caseKey,
  base: card.base,
  answer: card.answer,
  forms: formsOf(card),
  reason: `«${triggerOf(card)}» ${strings().tip.requires} ${CASE_BY_KEY[card.caseKey].name.pl}`,
});

export function examContext(task: ExamItem): EndingContext {
  const caseName = task.explanation.match(/Mianownik|Biernik|Dopełniacz|Narzędnik/)?.[0];
  const caseKey = CASES.find((grammarCase) => grammarCase.name.pl === caseName)?.key ?? null;
  const base = task.type === "type" && !/[.!?]$/.test(task.given || "") ? (task.given ?? null) : null;
  return { caseKey, base, answer: task.answer, forms: null, reason: examHint(task) };
}
