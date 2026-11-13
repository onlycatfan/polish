import { GLOSS } from "../../data/gloss";
import { currentLanguage } from "../../i18n/language";
import type { EndingContext } from "../../lib/endingContext";
import { EndingTooltip } from "./EndingTooltip";
import { GlossTerm, polishTermForm } from "./GlossTerm";

const MARKUP = /(\{[^}]*\}|\[\[[^\]]+\]\])/;
const LAST_POLISH_WORD = /[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

/**
 * Render text with markup:
 *   {ę}            highlighted ending (explained in a tooltip when `context` is given)
 *   [[key|shown]]  grammar term from GLOSS; in UA and RU it is shown in Polish
 */
export function HighlightedText({ text, context }: { text: string; context?: EndingContext }) {
  const parts = String(text).split(MARKUP);
  return parts.map((part, index) => {
    if (part.startsWith("{")) {
      const ending = part.slice(1, -1);
      if (!context) return <span key={index} className="ending">{ending}</span>;
      const stem = index > 0 ? (parts[index - 1].match(LAST_POLISH_WORD)?.[0] ?? "") : "";
      return <EndingTooltip key={index} stem={stem} ending={ending} context={context} />;
    }
    if (part.startsWith("[[")) {
      const [glossKey, shown] = part.slice(2, -2).split("|");
      const gloss = GLOSS[glossKey];
      if (!gloss) return shown || glossKey;
      if (currentLanguage === "pl") return <GlossTerm key={index} glossKey={glossKey} text={shown || gloss.pl} />;
      return <GlossTerm key={index} glossKey={glossKey} polish text={polishTermForm(gloss, shown)} />;
    }
    return part;
  });
}

/** Exam source sentence with the [underlined] part */
export const UnderlinedText = ({ text }: { text: string }) =>
  text.split(/(\[[^\]]+\])/).map((part, index) => (part.startsWith("[") ? <u key={index}>{part.slice(1, -1)}</u> : part));

