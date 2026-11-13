import { useMemo, useState } from "react";
import { CARD_BY_ID, type Card } from "../data/cards";
import { OPTIONS_BY_LEVEL, type Level } from "../data/levels";
import { buildDeck, type CaseFilter } from "../lib/deck";
import { shuffle } from "../lib/format";
import type { Progress } from "../lib/progress";
import { closeTooltip } from "../components/tooltip/tooltipBus";

export interface Answer { cardId: string; correct: boolean; picked: string }

/** One series of 10 cards: current card, shuffled options, answers so far */
export function usePracticeSeries(level: Level, caseFilter: CaseFilter, progress: Progress, onAnswer: (card: Card, correct: boolean) => void) {
  const [deck, setDeck] = useState(() => buildDeck(level, caseFilter, progress));
  const [position, setPosition] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [round, setRound] = useState(0);
  const [hintStep, setHintStep] = useState(0);

  const card: Card | null = position < deck.length ? CARD_BY_ID[deck[position]] : null;
  const options = useMemo(
    () => (card ? shuffle([card.answer, ...shuffle(card.distractors).slice(0, OPTIONS_BY_LEVEL[level] - 1)]) : []),
    // a new shuffle per card and per round, not on every render
    [card?.id, round, level],
  );

  const choose = (option: string) => {
    if (picked != null || !card) return;
    closeTooltip();
    const correct = option === card.answer;
    setPicked(option);
    setAnswers((previous) => [...previous, { cardId: card.id, correct, picked: option }]);
    onAnswer(card, correct);
  };
  const next = () => {
    closeTooltip();
    setPicked(null);
    setHintStep(0);
    setPosition((current) => current + 1);
  };
  const restart = () => {
    setDeck(buildDeck(level, caseFilter, progress));
    setPosition(0);
    setPicked(null);
    setAnswers([]);
    setRound((current) => current + 1);
    setHintStep(0);
  };

  return { deck, position, card, options, picked, answers, hintStep, setHintStep, choose, next, restart, isLast: position + 1 === deck.length };
}
export type PracticeSeries = ReturnType<typeof usePracticeSeries>;
