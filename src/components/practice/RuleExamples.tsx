import { currentLanguage, strings } from "../../i18n/language";
import { HighlightedText } from "../text/HighlightedText";

/** Three more sentences on the same rule, with a translation in UA and RU */
export function RuleExamples({ examples }: { examples: [string, string, string][] }) {
  const text = strings();
  if (examples.length === 0) return null;
  const translationOf = ([, ukrainian, russian]: [string, string, string]) =>
    currentLanguage === "uk" ? ukrainian : currentLanguage === "ru" ? russian : null;
  return (
    <div className="breakdown-section">
      <div className="section-title">{text.moreTitle}</div>
      <div className="examples">
        {examples.map((example, index) => (
          <div key={index} className="example">
            <span className="polish" lang="pl"><HighlightedText text={example[0]} /></span>
            {translationOf(example) && <span className="translation">{translationOf(example)}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
