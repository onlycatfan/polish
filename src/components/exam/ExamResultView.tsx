import { EXAM } from "../../data/exam";
import { beginnerMode, strings } from "../../i18n/language";
import { examContext } from "../../lib/endingContext";
import { markedSentence, translationOf } from "../../lib/exam";
import { formatTime } from "../../lib/format";
import type { ExamResult } from "../../hooks/useExamSession";
import { HighlightedText } from "../text/HighlightedText";

const PASS_SHARE = 50;

/** Score, pass or fail, per-part results and a review of every task */
export function ExamResultView({ result, onRestart }: { result: ExamResult; onRestart: () => void }) {
  const text = strings().exam;
  const share = Math.round((result.score / result.maximum) * 100);
  const passed = share >= PASS_SHARE;
  return (
    <div className="exam">
      <div className="card done">
        <h2>{result.score} / {result.maximum}</h2>
        <div className="subtitle"><span className={"badge " + (passed ? "pass" : "fail")}>{passed ? text.pass : text.fail}</span> {share}% · {formatTime(result.seconds)}</div>
        <div className="exam-sections">
          {EXAM.map((section) => {
            const tasks = result.graded.filter((entry) => entry.section === section.key);
            return <span key={section.key}>{text.part} {section.key}: {tasks.filter((entry) => entry.grade.correct).length}/{tasks.length}</span>;
          })}
        </div>
        <div className="row"><button className="button-primary" onClick={onRestart}>{text.again}</button></div>
      </div>
      <div className="exam-review">
        {result.graded.map(({ task, answer, grade }, index) => (
          <div key={task.id} className={"review " + (grade.correct ? "correct" : "incorrect")}>
            <div className="review-head"><span className="number">{index + 1}</span><span lang="pl"><HighlightedText text={markedSentence(task)} /></span></div>
            {!grade.correct && (
              <div className="review-answer">
                {text.yourAnswer}: {answer ? <s lang="pl">{answer}</s> : text.noAnswer}
                {grade.onlyPolishLetters && <> · <b>{text.almost}</b></>}
              </div>
            )}
            {beginnerMode && <div className="review-explanation"><HighlightedText text={task.explanation} context={examContext(task)} /></div>}
            {beginnerMode && translationOf(task) && <div className="review-translation">{translationOf(task)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
