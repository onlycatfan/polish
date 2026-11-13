import { useEffect, useState } from "react";
import { buildPaper, gradePaper, type GradedTask, type PaperSection } from "../lib/exam";
import type { ExamRecord } from "../lib/progress";
import { readStored, writeStored } from "../lib/storage";
import { closeTooltip } from "../components/tooltip/tooltipBus";

export interface ExamResult { graded: GradedTask[]; score: number; maximum: number; seconds: number }
const scrollToTop = () => window.scrollTo(0, 0);

/** Exam attempt: start, answers, per-task checks, timer, section navigation, result */
export function useExamSession(onFinish: (record: ExamRecord) => void) {
  const [phase, setPhase] = useState<"start" | "run" | "done">("start");
  const [paper, setPaper] = useState<PaperSection[]>([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [instantCheck, setInstantCheckState] = useState(() => readStored<boolean>("pl-cases-exam-instant", true) !== false);

  useEffect(() => {
    if (phase !== "run") return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const start = () => {
    setPaper(buildPaper());
    setAnswers({});
    setChecked({});
    setSectionIndex(0);
    setStartedAt(Date.now());
    setNow(Date.now());
    setResult(null);
    setPhase("run");
    scrollToTop();
  };
  const finish = () => {
    const graded = gradePaper(paper, answers);
    const score = graded.filter((entry) => entry.grade.correct).length;
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    setResult({ graded, score, maximum: graded.length, seconds });
    setPhase("done");
    onFinish({ time: Date.now(), score, maximum: graded.length, seconds });
    scrollToTop();
  };

  return {
    phase, paper, sectionIndex, answers, checked, result, instantCheck,
    elapsedSeconds: Math.round((now - startedAt) / 1000),
    start, finish,
    setAnswer: (taskId: string, value: string) => setAnswers((previous) => ({ ...previous, [taskId]: value })),
    check: (taskIds: string[]) => {
      closeTooltip();
      setChecked((previous) => ({ ...previous, ...Object.fromEntries(taskIds.map((id) => [id, true])) }));
    },
    goToSection: (index: number) => { setSectionIndex(index); scrollToTop(); },
    setInstantCheck: (value: boolean) => { setInstantCheckState(value); writeStored("pl-cases-exam-instant", value); },
  };
}
export type ExamSession = ReturnType<typeof useExamSession>;
