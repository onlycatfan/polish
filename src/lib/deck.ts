import { CARDS } from "../data/cards";
import type { CaseKey } from "../data/cases";
import { levelIndex, type Level } from "../data/levels";
import type { Progress } from "./progress";

export type CaseFilter = CaseKey | "all";

/** Cards answered within this window are pushed back, so the next series brings new ones */
const RECENT_WINDOW = 30 * 60 * 1000;
const RECENT_WEIGHT = 0.15;

/** Pick a series of cards: favour the current level, unseen and often missed cards, hold back the ones just answered */
export function buildDeck(level: Level, caseFilter: CaseFilter, progress: Progress, size = 10) {
  const current = levelIndex(level);
  let pool = CARDS.filter((card) => levelIndex(card.level) <= current && (caseFilter === "all" || card.caseKey === caseFilter));
  if (level === "A0") pool = pool.filter((card) => card.level === "A0");
  if (current >= levelIndex("B2")) pool = pool.filter((card) => levelIndex(card.level) >= levelIndex("A2"));
  const weighted = pool.map((card) => {
    const seen = progress.cards[card.id];
    let weight = card.level === level ? 3 : 1;
    weight *= seen ? 1 + 2.5 * ((seen.total - seen.correct) / seen.total) : 1.6;
    if (seen && Date.now() - seen.lastSeen < RECENT_WINDOW) weight *= RECENT_WEIGHT;
    return { id: card.id, sortKey: Math.pow(Math.random(), 1 / weight) };
  });
  return weighted.sort((first, second) => second.sortKey - first.sortKey).slice(0, size).map((entry) => entry.id);
}
