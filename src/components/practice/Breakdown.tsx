import type { Card } from "../../data/cards";
import { CASE_BY_KEY, CASE_ORDER } from "../../data/cases";
import { RULES, RULE_BY_CARD } from "../../data/rules";
import { strings } from "../../i18n/language";
import { formsOf } from "../../lib/grammar";
import { FormsTable } from "./FormsTable";
import { RuleExamples } from "./RuleExamples";

/** The word in all four cases, which case the wrong pick really is, and more examples of the rule */
export function Breakdown({ card, picked }: { card: Card; picked: string }) {
  const text = strings();
  const forms = formsOf(card);
  const wrong = picked !== card.answer;
  const pickedCases = forms ? CASE_ORDER.filter((_, index) => forms[index].toLowerCase() === picked.toLowerCase()) : [];
  return (
    <div className="breakdown">
      {wrong && (
        <div className="picked-note">
          {pickedCases.length ? text.pickedFormNote(picked, pickedCases.map((key) => CASE_BY_KEY[key].name.pl).join(" / ")) : text.notAFormNote(picked)}
        </div>
      )}
      {forms && <FormsTable forms={forms} target={card.caseKey} picked={wrong ? picked : null} />}
      <RuleExamples examples={RULES[RULE_BY_CARD[card.id]] || []} />
    </div>
  );
}
