import { useEffect, useRef } from "react";
import type { Card } from "../../data/cards";
import type { Level } from "../../data/levels";
import { strings } from "../../i18n/language";
import { baseFormText } from "../../lib/grammar";
import type { PracticeSeries } from "../../hooks/usePracticeSeries";
import { HighlightedText } from "../text/HighlightedText";
import { AnswerOptions } from "./AnswerOptions";
import { CardFeedback } from "./CardFeedback";
import { CardHintButton } from "./CardHintButton";
import { CaseBadge } from "./CaseBadge";

export function PracticeCard({ card, level, series }: { card: Card; level: Level; series: PracticeSeries }) {
  const text = strings();
  const nextButton = useRef<HTMLButtonElement>(null);
  const answered = series.picked != null;
  const [before, after] = card.prompt.split("___");

  useEffect(() => {
    if (answered) nextButton.current?.focus({ preventScroll: true });
  }, [answered]);

  return (
    <div className="card" data-case={card.caseKey}>
      <div className="card-top">
        {level === "A0" || level === "A1" ? <CaseBadge caseKey={card.caseKey} showNativeQuestion={level === "A0"} /> : <span />}
        {!answered && <CardHintButton card={card} step={series.hintStep} onStepChange={series.setHintStep} />}
      </div>
      <div className="prompt" lang="pl">
        {before}
        <span className={"blank" + (answered ? " filled" : "")}>{answered ? card.answer : " "}</span>
        {after}
      </div>
      <div className="base"><HighlightedText text={text.baseTerm} />: <span lang="pl">{baseFormText(card.base)}</span></div>
      <AnswerOptions options={series.options} answer={card.answer} picked={series.picked} onChoose={series.choose} />
      {series.picked != null && <CardFeedback card={card} picked={series.picked} />}
      <div className="row">
        <span className="small-note">{answered ? text.enterNext : text.keyboardHint(series.options.length)}</span>
        {answered && (
          <button ref={nextButton} className="button-primary" onClick={series.next}>
            {series.isLast ? text.summary : text.next}
          </button>
        )}
      </div>
    </div>
  );
}
