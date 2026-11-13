import { CASE_BY_KEY } from "../../data/cases";
import { GLOSS } from "../../data/gloss";
import { beginnerMode, currentLanguage, strings } from "../../i18n/language";
import type { EndingContext } from "../../lib/endingContext";
import { genderOf } from "../../lib/grammar";
import { tooltipHandlers } from "../tooltip/tooltipBus";

/** Word type, gender and (for masculine Biernik) animacy of the highlighted word, or null if it is not in the answer */
function wordDescription(context: EndingContext, word: string) {
  const text = strings().tip;
  const words = String(context.answer || "").toLowerCase().split(" ");
  const index = words.indexOf(word.toLowerCase());
  if (index < 0) return null;
  const parts = [words.length > 1 && index < words.length - 1 ? text.adjective : text.noun];
  const gender = genderOf(context.base);
  if (gender) parts.push(GLOSS[gender][currentLanguage]);
  if (gender === "masculine" && context.caseKey === "biernik" && context.forms) {
    parts.push(GLOSS[context.forms[1] !== context.forms[0] ? "animate" : "inanimate"][currentLanguage]);
  }
  return parts.join(", ");
}

const withoutMarkup = (text: string) => text.replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, "$1");

function EndingDetails({ context, stem, ending }: { context: EndingContext; stem: string; ending: string }) {
  const text = strings().tip;
  const grammarCase = context.caseKey ? CASE_BY_KEY[context.caseKey] : null;
  const description = wordDescription(context, stem + ending);
  return (
    <div className="tooltip-ending">
      <div className="tooltip-word" lang="pl">{stem}<span className="ending">{ending}</span></div>
      {grammarCase && (
        <div><span className="tooltip-label">{text.caseLabel}</span>{grammarCase.name.pl} <span className="muted">({grammarCase.question.pl})</span></div>
      )}
      {description && <div><span className="tooltip-label">{text.wordLabel}</span>{description}</div>}
      {context.reason && <div><span className="tooltip-label">{text.reasonLabel}</span>{withoutMarkup(context.reason)}</div>}
    </div>
  );
}

/** A highlighted ending; in beginner mode it explains itself in a tooltip */
export function EndingTooltip({ stem, ending, context }: { stem: string; ending: string; context: EndingContext }) {
  if (!beginnerMode) return <span className="ending">{ending}</span>;
  return (
    <span className="ending ending-tip" tabIndex={0} role="button" {...tooltipHandlers(() => <EndingDetails context={context} stem={stem} ending={ending} />)}>
      {ending}
    </span>
  );
}
