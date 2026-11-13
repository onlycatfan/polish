import { useEffect } from "react";
import type { PracticeSeries } from "./usePracticeSeries";

/** Keys 1 to 4 pick an option, Enter or Space goes on, Enter on the summary starts a new series */
export function usePracticeKeyboard(series: PracticeSeries) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (!series.card) {
        if (event.key === "Enter") series.restart();
        return;
      }
      if (series.picked == null) {
        const number = parseInt(event.key, 10);
        if (number >= 1 && number <= series.options.length) series.choose(series.options[number - 1]);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        series.next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}
