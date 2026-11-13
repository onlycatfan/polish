import { EXAM, type ExamItem, type ExamSection } from "../data/exam";
import { currentLanguage } from "../i18n/language";
import { shuffle } from "./format";

export const POLISH_LETTERS = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];

export type PaperTask = ExamItem & { options: string[] | null };
export type PaperSection = ExamSection & { tasks: PaperTask[] };
export interface Grade { correct: boolean; empty?: boolean; onlyPolishLetters?: boolean }
export interface GradedTask { task: PaperTask; section: string; answer: string; grade: Grade }

/** A fresh attempt: random tasks per section, shuffled options for choice tasks */
export const buildPaper = (): PaperSection[] =>
  EXAM.map((section) => ({
    ...section,
    tasks: shuffle(section.items)
      .slice(0, section.taskCount)
      .map((task) => ({ ...task, options: task.type === "choice" ? shuffle([task.answer, ...(task.distractors ?? [])]) : null })),
  }));

const normalize = (value: string | undefined) => String(value || "").trim().replace(/[.,!?;:]+$/, "").replace(/\s+/g, " ").toLowerCase();
const withoutPolishLetters = (value: string) => normalize(value).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

export function gradeTask(task: ExamItem, answer: string | undefined): Grade {
  if (task.type === "choice") return { correct: answer === task.answer, empty: !answer };
  const given = normalize(answer);
  if (!given) return { correct: false, empty: true };
  if (normalize(task.answer) === given) return { correct: true };
  return { correct: false, onlyPolishLetters: withoutPolishLetters(task.answer) === withoutPolishLetters(given) };
}

export const gradePaper = (paper: PaperSection[], answers: Record<string, string>): GradedTask[] =>
  paper.flatMap((section) =>
    section.tasks.map((task) => ({ task, section: section.key, answer: answers[task.id] || "", grade: gradeTask(task, answers[task.id]) })),
  );

export const fullSentence = (task: ExamItem) => task.question.replace("___", task.answer);
/** Full sentence with the answer marked as an ending: "Nie mam {czasu}." */
export const markedSentence = (task: ExamItem) => fullSentence(task).replace(task.answer, "{" + task.answer + "}");

/** Translation of a task sentence in the interface language; none in Polish mode */
export const translationOf = (task: ExamItem) => (currentLanguage === "pl" ? null : task.translation[currentLanguage]);
