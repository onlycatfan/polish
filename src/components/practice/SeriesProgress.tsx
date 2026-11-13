import type { Answer } from "../../hooks/usePracticeSeries";

/** Ten segments: answered right, answered wrong, current, still ahead */
export function SeriesProgress({ length, answers, position }: { length: number; answers: Answer[]; position: number }) {
  const stateOf = (index: number) => {
    if (index < answers.length) return answers[index].correct ? "correct" : "incorrect";
    return index === position ? "current" : "";
  };
  return (
    <div className="progress" aria-hidden="true">
      {Array.from({ length }, (_, index) => <span key={index} className={stateOf(index)} />)}
    </div>
  );
}
