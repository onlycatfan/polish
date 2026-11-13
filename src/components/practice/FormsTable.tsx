import { CASE_BY_KEY, CASE_ORDER, type CaseKey } from "../../data/cases";
import { strings } from "../../i18n/language";
import { caseTerm, markEnding } from "../../lib/grammar";
import { HighlightedText } from "../text/HighlightedText";

/** Four rows, one per case; the needed case and the wrong pick are marked */
export function FormsTable({ forms, target, picked }: { forms: string[]; target: CaseKey; picked: string | null }) {
  const text = strings();
  return (
    <div className="breakdown-section">
      <div className="section-title">{text.formsTitle}</div>
      <div className="forms">
        {CASE_ORDER.map((key, index) => {
          const isTarget = key === target;
          const isPicked = picked != null && forms[index].toLowerCase() === picked.toLowerCase();
          return (
            <div key={key} className={"form-row" + (isTarget ? " here" : "") + (isPicked ? " picked" : "")} data-case={key}>
              <span className="form-case"><HighlightedText text={caseTerm(CASE_BY_KEY[key])} /></span>
              <span className="form-question">{CASE_BY_KEY[key].question.pl}</span>
              <span className="form-word" lang="pl"><HighlightedText text={index === 0 ? forms[0] : markEnding(forms[index], forms[0])} /></span>
              <span className="form-tag">{isTarget ? text.here : isPicked ? text.picked : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
