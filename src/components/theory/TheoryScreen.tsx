import { useEffect, useState } from "react";
import { CASE_BY_KEY, type CaseKey } from "../../data/cases";
import { levelIndex, type Level } from "../../data/levels";
import { THEORY, THEORY_KEYS, type TheoryKey } from "../../data/theory";
import { currentLanguage, strings } from "../../i18n/language";
import type { CaseFilter } from "../../lib/deck";
import { caseTerm } from "../../lib/grammar";
import { readStored, writeStored } from "../../lib/storage";
import { HighlightedText } from "../text/HighlightedText";
import { TheoryBlock } from "./TheoryBlock";

const isCaseKey = (key: TheoryKey): key is CaseKey => key !== "base" && key !== "cheatSheet";
const visibleAt = (level: Level, block: { minLevel: Level; maxLevel?: Level }) =>
  levelIndex(level) >= levelIndex(block.minLevel) && (!block.maxLevel || levelIndex(level) <= levelIndex(block.maxLevel));

export function TheoryScreen({ level, onPractice }: { level: Level; onPractice: (filter: CaseFilter) => void }) {
  const text = strings();
  const [section, setSection] = useState<TheoryKey>(() => readStored("pl-cases-theory-tab", "base"));
  const sections = THEORY_KEYS.filter((key) => key !== "cheatSheet" || levelIndex(level) >= levelIndex("A1"));
  const current = sections.includes(section) ? section : "base";
  useEffect(() => writeStored("pl-cases-theory-tab", current), [current]);

  const grammarCase = isCaseKey(current) ? CASE_BY_KEY[current] : null;
  const blocks = THEORY[currentLanguage][current].filter((block) => visibleAt(level, block));
  const sectionTitle = (key: TheoryKey) => (key === "base" ? text.baseTab : key === "cheatSheet" ? text.cheatTab : CASE_BY_KEY[key].name.pl);

  return (
    <div data-case={grammarCase ? current : "none"}>
      <div className="chips" role="group" aria-label={text.section}>
        {sections.map((key) => (
          <button key={key} className="chip" aria-pressed={key === current} onClick={() => setSection(key)}>{sectionTitle(key)}</button>
        ))}
      </div>
      <div className="case-head">
        <h2>{grammarCase ? <HighlightedText text={caseTerm(grammarCase)} /> : current === "base" ? text.startTitle : text.cheatTitle}</h2>
        {grammarCase && <div className="question"><HighlightedText text={text.caseHeading(grammarCase)} /></div>}
      </div>
      <div className="theory">
        {blocks.map((block, index) => <TheoryBlock key={index} block={block} />)}
      </div>
      <div className="next-hint">
        <button className="button-link" onClick={() => onPractice(grammarCase ? grammarCase.key : "all")}>
          {grammarCase ? `${text.practiceCase} ${grammarCase.name.pl}` : text.goToCards}
        </button>
      </div>
    </div>
  );
}
