import { CASES } from "../../data/cases";
import { strings } from "../../i18n/language";
import type { CaseFilter } from "../../lib/deck";

export function CaseFilterChips({ value, onChange }: { value: CaseFilter; onChange: (filter: CaseFilter) => void }) {
  const text = strings();
  return (
    <div className="chips" role="group" aria-label={text.caseFilterLabel}>
      <button className="chip" aria-pressed={value === "all"} onClick={() => onChange("all")}>{text.allCases}</button>
      {CASES.map((grammarCase) => (
        <button key={grammarCase.key} className="chip" aria-pressed={value === grammarCase.key} onClick={() => onChange(grammarCase.key)}>
          {grammarCase.name.pl}
        </button>
      ))}
    </div>
  );
}
