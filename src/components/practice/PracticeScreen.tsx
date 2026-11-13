import type { Card } from "../../data/cards";
import type { Level } from "../../data/levels";
import type { CaseFilter } from "../../lib/deck";
import type { Progress } from "../../lib/progress";
import { usePracticeKeyboard } from "../../hooks/usePracticeKeyboard";
import { usePracticeSeries } from "../../hooks/usePracticeSeries";
import { CaseFilterChips } from "./CaseFilterChips";
import { PracticeCard } from "./PracticeCard";
import { SeriesProgress } from "./SeriesProgress";
import { SeriesSummary } from "./SeriesSummary";

interface Props {
  level: Level;
  progress: Progress;
  onAnswer: (card: Card, correct: boolean) => void;
  caseFilter: CaseFilter;
  onCaseFilterChange: (filter: CaseFilter) => void;
}

/** A series of 10 cards. App remounts it (by key) when the level or the case filter changes. */
export function PracticeScreen({ level, progress, onAnswer, caseFilter, onCaseFilterChange }: Props) {
  const series = usePracticeSeries(level, caseFilter, progress, onAnswer);
  usePracticeKeyboard(series);
  return (
    <div>
      <CaseFilterChips value={caseFilter} onChange={onCaseFilterChange} />
      <SeriesProgress length={series.deck.length} answers={series.answers} position={series.position} />
      {series.card ? <PracticeCard card={series.card} level={level} series={series} /> : <SeriesSummary answers={series.answers} onRestart={series.restart} />}
    </div>
  );
}
