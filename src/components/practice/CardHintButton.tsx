import { useRef } from "react";
import type { Card } from "../../data/cards";
import { strings } from "../../i18n/language";
import { cardHintLines } from "../../lib/hints";
import { HighlightedText } from "../text/HighlightedText";
import { openTooltip } from "../tooltip/tooltipBus";

/** The round "?" button: opens a pinned hint, one more step per "more" click */
export function CardHintButton({ card, step, onStepChange }: { card: Card; step: number; onStepChange: (step: number) => void }) {
  const text = strings();
  const button = useRef<HTMLButtonElement>(null);

  const content = (shownSteps: number) => {
    const lines = cardHintLines(card);
    return (
      <div className="tooltip-hint">
        <div className="tooltip-label">{text.tip.hintTitle}</div>
        {lines.slice(0, shownSteps).map((line, index) => <div key={index}><HighlightedText text={line} /></div>)}
        {shownSteps < lines.length && (
          <button className="tooltip-more" onClick={() => show(shownSteps + 1)}>{text.tip.moreHint}</button>
        )}
      </div>
    );
  };
  const show = (shownSteps: number) => {
    onStepChange(shownSteps);
    openTooltip(button.current, content(shownSteps), true);
  };

  return (
    <button
      ref={button}
      className="hint-button"
      aria-label={text.hint}
      title={text.hint}
      onClick={(event) => {
        event.stopPropagation();
        show(Math.max(1, step));
      }}
    >
      ?
    </button>
  );
}
