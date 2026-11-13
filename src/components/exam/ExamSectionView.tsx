import { useRef } from "react";
import { currentLanguage, strings } from "../../i18n/language";
import { formatTime } from "../../lib/format";
import type { ExamSession } from "../../hooks/useExamSession";
import { ExamTask } from "./ExamTask";
import { PolishLetterButtons } from "./PolishLetterButtons";

/** One exam part: instruction, its tasks, "check the part" and then "next" */
export function ExamSectionView({ session }: { session: ExamSession }) {
  const text = strings().exam;
  const activeInput = useRef<HTMLInputElement | null>(null);
  const { paper, sectionIndex, checked } = session;
  const section = paper[sectionIndex];
  const isLast = sectionIndex === paper.length - 1;
  const allChecked = section.tasks.every((task) => checked[task.id]);

  return (
    <div className="exam">
      <div className="exam-top">
        <span>{text.part} {section.key} · {sectionIndex + 1} / {paper.length}</span>
        <span className="timer">{formatTime(session.elapsedSeconds)}</span>
      </div>
      <div className="card">
        <div className="exam-instruction" lang="pl">{section.instruction.pl}</div>
        {currentLanguage !== "pl" && <div className="exam-instruction-translation">{section.instruction[currentLanguage]}</div>}
        {section.type === "type" && !allChecked && <PolishLetterButtons input={activeInput} onInsert={session.setAnswer} />}
        <ol className="exam-items">
          {section.tasks.map((task) => (
            <ExamTask key={task.id} task={task} sectionKey={section.key} session={session} onInputFocus={(input) => { activeInput.current = input; }} />
          ))}
        </ol>
        <div className="row">
          {sectionIndex > 0 ? <button className="button-link" onClick={() => session.goToSection(sectionIndex - 1)}>{text.back}</button> : <span />}
          {allChecked ? (
            <button className="button-primary" onClick={() => (isLast ? session.finish() : session.goToSection(sectionIndex + 1))}>
              {isLast ? text.finish : text.next}
            </button>
          ) : (
            <button className="button-primary" onClick={() => session.check(section.tasks.map((task) => task.id))}>{text.checkPart}</button>
          )}
        </div>
      </div>
    </div>
  );
}
