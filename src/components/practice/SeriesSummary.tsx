import { CARD_BY_ID } from "../../data/cards";
import { beginnerMode, strings } from "../../i18n/language";
import { cardContext } from "../../lib/endingContext";
import { percent } from "../../lib/format";
import { explanationFor } from "../../lib/grammar";
import type { Answer } from "../../hooks/usePracticeSeries";
import { HighlightedText } from "../text/HighlightedText";

/** End of a series: score, a word of encouragement and all 10 answers with explanations */
export function SeriesSummary({ answers, onRestart }: { answers: Answer[]; onRestart: () => void }) {
  const text = strings();
  const correct = answers.filter((answer) => answer.correct).length;
  const share = percent(correct, answers.length) ?? 0;
  return (
    <div className="card done">
      <h2>{correct} {text.outOf} {answers.length}</h2>
      <div className="subtitle">{share >= 90 ? text.resultGreat : share >= 70 ? text.resultGood : text.resultStart}</div>
      <div className="section-title results-title">{text.answersTitle}</div>
      <div className="results">
        {answers.map((answer) => {
          const card = CARD_BY_ID[answer.cardId];
          return (
            <div key={card.id} className={"result-row " + (answer.correct ? "correct" : "incorrect")}>
              <span className="result-mark" aria-hidden="true">{answer.correct ? "✓" : "✗"}</span>
              <div className="result-body">
                <b lang="pl"><HighlightedText text={card.prompt.replace("___", "{" + card.answer + "}")} /></b>
                {!answer.correct && <div className="result-answer">{text.yourPick}: <s lang="pl">{answer.picked}</s></div>}
                {beginnerMode && <div className="small-note"><HighlightedText text={explanationFor(card.id)} context={cardContext(card)} /></div>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
        <button className="button-primary" onClick={onRestart}>{text.moreCards}</button>
        <span className="small-note">Enter</span>
      </div>
    </div>
  );
}
