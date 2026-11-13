import type { ExamItem } from "../../data/exam";
import { beginnerMode, strings } from "../../i18n/language";
import { examContext } from "../../lib/endingContext";
import { markedSentence, translationOf, type Grade } from "../../lib/exam";
import { HighlightedText } from "../text/HighlightedText";

/** Verdict for a checked task, then the explanation (beginner mode) or the full sentence */
export function TaskFeedback({ task, grade }: { task: ExamItem; grade: Grade }) {
  const text = strings().exam;
  const translation = translationOf(task);
  return (
    <div className="task-feedback">
      <div className={"verdict " + (grade.correct ? "correct" : "incorrect")}>
        {grade.correct ? text.right : text.correctIs + task.answer}
        {!grade.correct && grade.onlyPolishLetters && <> · <span className="muted">{text.almost}</span></>}
      </div>
      {beginnerMode ? (
        <>
          <div className="review-explanation"><HighlightedText text={task.explanation} context={examContext(task)} /></div>
          {translation && <div className="review-translation">{translation}</div>}
        </>
      ) : (
        <div className="full-sentence" lang="pl"><HighlightedText text={markedSentence(task)} /></div>
      )}
    </div>
  );
}
