import type { Card } from "../../data/cards";
import { CASE_BY_KEY } from "../../data/cases";
import { beginnerMode, strings } from "../../i18n/language";
import { cardContext } from "../../lib/endingContext";
import { explanationFor } from "../../lib/grammar";
import { HighlightedText } from "../text/HighlightedText";
import { Breakdown } from "./Breakdown";

/** After an answer: verdict, then either the full explanation (beginner mode) or just the full sentence */
export function CardFeedback({ card, picked }: { card: Card; picked: string }) {
  const text = strings();
  const correct = picked === card.answer;
  return (
    <div className="feedback" aria-live="polite">
      <div className={"verdict " + (correct ? "correct" : "incorrect")}>{correct ? text.right : text.wrong + card.answer}</div>
      {beginnerMode ? (
        <>
          <div className="why"><HighlightedText text={explanationFor(card.id)} context={cardContext(card)} /></div>
          <div className="case">{text.caseSummary(CASE_BY_KEY[card.caseKey])}</div>
          <Breakdown card={card} picked={picked} />
        </>
      ) : (
        <div className="full-sentence" lang="pl"><HighlightedText text={card.prompt.replace("___", "{" + card.answer + "}")} /></div>
      )}
    </div>
  );
}
