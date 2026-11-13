import type { ExamItem } from "../../data/exam";
import { strings } from "../../i18n/language";
import { examHint } from "../../lib/hints";
import { HighlightedText } from "../text/HighlightedText";
import { openTooltip } from "../tooltip/tooltipBus";

/** Small inline "?" that pins the rule hint for a task, without the answer */
export function ExamHintButton({ task }: { task: ExamItem }) {
  const text = strings();
  return (
    <button
      className="hint-button hint-button-inline"
      aria-label={text.hint}
      title={text.hint}
      onClick={(event) => {
        event.stopPropagation();
        openTooltip(event.currentTarget, (
          <div className="tooltip-hint">
            <div className="tooltip-label">{text.tip.hintTitle}</div>
            <div><HighlightedText text={examHint(task)} /></div>
          </div>
        ), true);
      }}
    >
      ?
    </button>
  );
}
