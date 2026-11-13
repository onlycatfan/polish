import { strings } from "../../i18n/language";
import { caseTerm } from "../../lib/grammar";
import type { Statistics } from "../../lib/statistics";
import { HighlightedText } from "../text/HighlightedText";

export function CaseBars({ rows }: { rows: Statistics["byCase"] }) {
  const text = strings();
  return (
    <div className="bars">
      {rows.map(({ grammarCase, answers, accuracy }) => (
        <div key={grammarCase.key} className="bar-row" data-case={grammarCase.key}>
          <span><HighlightedText text={caseTerm(grammarCase)} /></span>
          <div className="track"><div className="fill" style={{ width: (accuracy || 0) + "%" }} /></div>
          <span className="number">{answers ? `${accuracy}% · ${answers}` : text.nothing}</span>
        </div>
      ))}
    </div>
  );
}
