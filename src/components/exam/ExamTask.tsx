import { strings } from "../../i18n/language";
import { gradeTask, type PaperTask } from "../../lib/exam";
import type { ExamSession } from "../../hooks/useExamSession";
import { UnderlinedText } from "../text/HighlightedText";
import { ExamHintButton } from "./ExamHintButton";
import { TaskFeedback } from "./TaskFeedback";

interface Props { task: PaperTask; sectionKey: string; session: ExamSession; onInputFocus: (input: HTMLInputElement) => void }

/** One task: source sentence, the gap (typed or chosen), hint, and feedback once checked */
export function ExamTask({ task, sectionKey, session, onInputFocus }: Props) {
  const text = strings().exam;
  const [before, after] = task.question.split("___");
  const value = session.answers[task.id] || "";
  const checked = !!session.checked[task.id];
  const grade = checked ? gradeTask(task, value) : null;
  const canCheckNow = !checked && session.instantCheck && task.type === "type" && value.trim();

  return (
    <li className={grade ? (grade.correct ? "is-correct" : "is-incorrect") : ""}>
      {task.type === "type" && sectionKey === "B" && <div className="exam-source" lang="pl">{task.given}</div>}
      {task.source && <div className="exam-source" lang="pl"><UnderlinedText text={task.source} /></div>}
      <div className="exam-question" lang="pl">
        {before}
        {task.type === "type" ? (
          <input
            className="exam-input"
            data-task-id={task.id}
            id={"exam-" + task.id}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={checked}
            value={value}
            onFocus={(event) => onInputFocus(event.target)}
            onChange={(event) => session.setAnswer(task.id, event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter" && canCheckNow) session.check([task.id]); }}
          />
        ) : (
          <span className={"exam-gap" + (value ? " filled" : "")}>{value || " "}</span>
        )}
        {sectionKey === "A" && <span className="muted base-form-hint">({task.given})</span>}
        {after}
        {!checked && <ExamHintButton task={task} />}
      </div>
      {task.options && (
        <div className="chips exam-options">
          {task.options.map((option) => (
            <button key={option} className="chip" disabled={checked} aria-pressed={value === option} lang="pl"
              onClick={() => { session.setAnswer(task.id, option); if (session.instantCheck) session.check([task.id]); }}>
              {option}
            </button>
          ))}
        </div>
      )}
      {canCheckNow && <div className="task-tools"><button className="check-link" onClick={() => session.check([task.id])}>{text.check}</button></div>}
      {grade && <TaskFeedback task={task} grade={grade} />}
    </li>
  );
}
