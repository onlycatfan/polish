import { GLOSS, type Gloss } from "../../data/gloss";
import { beginnerMode } from "../../i18n/language";
import { tooltipHandlers } from "../tooltip/tooltipBus";

/** Tooltip body of a term: Ukrainian on top, Russian below, no labels */
const translations = (gloss: Gloss) => (
  <div className="tooltip-gloss">
    <div lang="uk">{gloss.uk}</div>
    <div lang="ru">{gloss.ru}</div>
  </div>
);

/** Pick the Polish form of a term matching how the native text wrote it (short, abbreviated, capitalised) */
export function polishTermForm(gloss: Gloss, shown?: string) {
  let word = gloss.pl;
  if (shown && gloss.shortForm && !/рід|роду|род/i.test(shown)) word = gloss.shortForm;
  if (shown && shown.endsWith(".") && gloss.abbreviation) word = gloss.abbreviation;
  const first = shown?.[0];
  if (first && first === first.toUpperCase() && first !== first.toLowerCase()) word = word[0].toUpperCase() + word.slice(1);
  return word;
}

/** A grammar term. In beginner mode it carries a translation tooltip, otherwise it is plain text. */
export function GlossTerm({ glossKey, text, polish }: { glossKey: string; text: string; polish?: boolean }) {
  const gloss = GLOSS[glossKey];
  const lang = polish ? "pl" : undefined;
  if (!gloss) return text;
  if (!beginnerMode) return <span lang={lang}>{text}</span>;
  return (
    <span
      className={"term" + (polish ? " polish-term" : "")}
      lang={lang}
      tabIndex={0}
      role="button"
      aria-label={`${text}: ${gloss.uk}, ${gloss.ru}`}
      {...tooltipHandlers(() => translations(gloss))}
    >
      {text}
    </span>
  );
}
