import type { Card } from "../data/cards";
import type { CaseKey } from "../data/cases";
import { dayKey } from "./format";

export interface Tally { correct: number; total: number }
export interface CardTally extends Tally { lastSeen: number }
export interface ExamRecord { time: number; score: number; maximum: number; seconds: number }
export interface Progress {
  version: 2;
  /** Day (YYYY-MM-DD) to answers per case */
  days: Record<string, Partial<Record<CaseKey, Tally>>>;
  cards: Record<string, CardTally>;
  exams: ExamRecord[];
}

export const PROGRESS_STORAGE_KEY = "pl-cases-progress-v1";
export const emptyProgress = (): Progress => ({ version: 2, days: {}, cards: {}, exams: [] });

/* Version 1 used short names: { ok, n } tallies, `items`, case keys like "mian", exams { t, max, secs } */
const LEGACY_CASE_KEYS: Record<string, CaseKey> = { mian: "mianownik", bier: "biernik", dop: "dopelniacz", narz: "narzednik" };
type Loose = Record<string, any>; // legacy and remote data are untyped JSON
const tallyOf = (raw: Loose): Tally => ({ correct: raw.correct ?? raw.ok ?? 0, total: raw.total ?? raw.n ?? 0 });

function normalize(raw: Loose | null | undefined): Progress {
  const progress = emptyProgress();
  if (!raw) return progress;
  for (const [day, cases] of Object.entries<Loose>(raw.days || {})) {
    progress.days[day] = {};
    for (const [key, tally] of Object.entries<Loose>(cases)) progress.days[day][LEGACY_CASE_KEYS[key] ?? (key as CaseKey)] = tallyOf(tally);
  }
  for (const [id, tally] of Object.entries<Loose>(raw.cards || raw.items || {})) {
    progress.cards[id] = { ...tallyOf(tally), lastSeen: tally.lastSeen ?? tally.last ?? 0 };
  }
  for (const exam of raw.exams || []) {
    const time = exam?.time ?? exam?.t;
    if (time) progress.exams.push({ time, score: exam.score || 0, maximum: exam.maximum ?? exam.max ?? 0, seconds: exam.seconds ?? exam.secs ?? 0 });
  }
  return progress;
}

/** Merge two progress copies (any version): the larger count wins per day and case, exams are a union by time */
export function mergeProgress(first: unknown, second: unknown): Progress {
  const result = emptyProgress();
  for (const source of [normalize(first as Loose), normalize(second as Loose)]) {
    for (const [day, cases] of Object.entries(source.days)) {
      result.days[day] = result.days[day] || {};
      for (const [key, tally] of Object.entries(cases) as [CaseKey, Tally][]) {
        const current = result.days[day][key];
        if (!current || tally.total > current.total) result.days[day][key] = tally;
      }
    }
    for (const [id, tally] of Object.entries(source.cards)) {
      const current = result.cards[id];
      if (!current || tally.total > current.total) result.cards[id] = tally;
    }
    for (const exam of source.exams) if (!result.exams.some((known) => known.time === exam.time)) result.exams.push(exam);
  }
  result.exams = result.exams.sort((earlier, later) => earlier.time - later.time).slice(-50);
  return result;
}

const increment = (tally: Tally | undefined, correct: boolean): Tally => ({
  correct: (tally?.correct ?? 0) + (correct ? 1 : 0),
  total: (tally?.total ?? 0) + 1,
});

export function withAnswer(progress: Progress, card: Card, correct: boolean): Progress {
  const day = dayKey();
  const cases = { ...progress.days[day], [card.caseKey]: increment(progress.days[day]?.[card.caseKey], correct) };
  const cardTally = { ...increment(progress.cards[card.id], correct), lastSeen: Date.now() };
  return { ...progress, days: { ...progress.days, [day]: cases }, cards: { ...progress.cards, [card.id]: cardTally } };
}

export const withExam = (progress: Progress, record: ExamRecord): Progress => ({ ...progress, exams: [...progress.exams, record].slice(-50) });
