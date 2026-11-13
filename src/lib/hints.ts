import type { Card } from "../data/cards";
import { CASE_BY_KEY, CASE_ORDER } from "../data/cases";
import type { ExamItem } from "../data/exam";
import { RULE_BY_CARD, RULE_TRIGGERS } from "../data/rules";
import { currentLanguage, strings } from "../i18n/language";
import { endingsOf, formsOf, markEnding } from "./grammar";

const CASE_NAMES = /Mianownik|Biernik|Dopełniacz|Narzędnik/;

/** What to look at in the sentence for this card */
export const triggerOf = (card: Card) => RULE_TRIGGERS[RULE_BY_CARD[card.id]] || CASE_BY_KEY[card.caseKey].question.pl;

/** Hint steps for a card: the trigger and the case, then the endings. Never the answer itself. */
export function cardHintLines(card: Card) {
  const text = strings();
  const grammarCase = CASE_BY_KEY[card.caseKey];
  const lines = [text.hintTrigger(triggerOf(card), `[[${grammarCase.key}|${grammarCase.name.pl}]]`, grammarCase.question.pl)];
  const forms = formsOf(card);
  if (forms) {
    const endings = endingsOf(markEnding(forms[CASE_ORDER.indexOf(card.caseKey)], forms[0]));
    lines.push(endings.length ? text.hintEndings(endings.join(", ")) : text.hintSameForm);
  }
  return lines;
}

/** Exam hint: the rule part of the explanation with the endings hidden */
export function examHint(task: ExamItem) {
  if (task.hint) return task.hint[currentLanguage];
  const [rule, ...rest] = task.explanation.split(":");
  let hint = rule;
  if (rest.length > 0 && !CASE_NAMES.test(hint)) {
    const firstExample = rest[0].split(/[,.]/)[0].trim();
    if (firstExample && !firstExample.includes("{")) hint = hint + ": " + firstExample;
  }
  if (hint === task.explanation) hint = task.explanation.split(".")[0];
  return hint.replace(/\{[^}]*\}/g, "…");
}
