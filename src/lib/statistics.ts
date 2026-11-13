import { CARD_BY_ID } from "../data/cards";
import { CASES } from "../data/cases";
import { dayKey, percent } from "./format";
import type { Progress, Tally } from "./progress";

const add = (left: Tally, right: Tally): Tally => ({ correct: left.correct + right.correct, total: left.total + right.total });
const NOTHING: Tally = { correct: 0, total: 0 };
const missRate = (tally: Tally) => (tally.total - tally.correct) / tally.total;

/** Day keys of the last `count` days, oldest first, ending `offset` days ago */
function lastDays(count: number, offset = 0) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - offset - (count - 1 - index));
    return dayKey(date);
  });
}

export function computeStatistics(progress: Progress) {
  const dayTotal = (day: string) => Object.values(progress.days[day] ?? {}).reduce(add, NOTHING);
  const sum = (days: string[]) => days.map(dayTotal).reduce(add, NOTHING);

  const overall = sum(Object.keys(progress.days));
  const thisWeek = sum(lastDays(7)), lastWeek = sum(lastDays(7, 7));
  const weekAccuracy = percent(thisWeek.correct, thisWeek.total);
  const previousAccuracy = percent(lastWeek.correct, lastWeek.total);
  const weekChange = weekAccuracy != null && previousAccuracy != null ? weekAccuracy - previousAccuracy : null;

  let daysInRow = 0;
  const cursor = new Date();
  if (!dayTotal(dayKey(cursor)).total) cursor.setDate(cursor.getDate() - 1);
  while (dayTotal(dayKey(cursor)).total) { daysInRow++; cursor.setDate(cursor.getDate() - 1); }

  const chartDays = lastDays(14).map((day) => {
    const total = dayTotal(day);
    return { day, answers: total.total, accuracy: percent(total.correct, total.total) };
  });
  const byCase = CASES.map((grammarCase) => {
    const total = Object.values(progress.days).reduce((sumSoFar, cases) => add(sumSoFar, cases[grammarCase.key] ?? NOTHING), NOTHING);
    return { grammarCase, answers: total.total, accuracy: percent(total.correct, total.total) };
  });
  const weakCards = Object.entries(progress.cards)
    .filter(([id, tally]) => CARD_BY_ID[id] && tally.total > tally.correct)
    .sort(([, first], [, second]) => missRate(second) - missRate(first) || second.total - first.total)
    .slice(0, 5)
    .map(([id, tally]) => ({ card: CARD_BY_ID[id], misses: tally.total - tally.correct, total: tally.total }));

  return { overall, overallAccuracy: percent(overall.correct, overall.total), weekAccuracy, weekChange, daysInRow, chartDays, byCase, weakCards };
}
export type Statistics = ReturnType<typeof computeStatistics>;
