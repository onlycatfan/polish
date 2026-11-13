import { CASE_BY_KEY, type CaseKey } from "../../data/cases";
import { strings } from "../../i18n/language";
import { caseTerm } from "../../lib/grammar";
import { HighlightedText } from "../text/HighlightedText";

/** Beginner hint on a card: which case and its question */
export function CaseBadge({ caseKey, showNativeQuestion }: { caseKey: CaseKey; showNativeQuestion: boolean }) {
  const text = strings();
  const grammarCase = CASE_BY_KEY[caseKey];
  const nativeQuestion = text.nativeQuestion(grammarCase);
  return (
    <div className="hint">
      <span className="pill">
        <HighlightedText text={text.caseTerm} /> <b><HighlightedText text={caseTerm(grammarCase)} /></b>
      </span>
      <span>{grammarCase.question.pl}</span>
      {showNativeQuestion && nativeQuestion && <span>{nativeQuestion}</span>}
    </div>
  );
}
