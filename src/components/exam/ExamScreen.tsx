import { useExamSession } from "../../hooks/useExamSession";
import type { ExamRecord } from "../../lib/progress";
import { ExamResultView } from "./ExamResultView";
import { ExamSectionView } from "./ExamSectionView";
import { ExamStart } from "./ExamStart";

/** Exam mode: original tasks in the format of the B1 grammar part, 4 parts, 20 tasks */
export function ExamScreen({ history, onFinish }: { history: ExamRecord[]; onFinish: (record: ExamRecord) => void }) {
  const session = useExamSession(onFinish);
  if (session.phase === "start") {
    return <ExamStart history={history} instantCheck={session.instantCheck} onInstantCheckChange={session.setInstantCheck} onStart={session.start} />;
  }
  if (session.phase === "done" && session.result) return <ExamResultView result={session.result} onRestart={session.start} />;
  return <ExamSectionView session={session} />;
}
