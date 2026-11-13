import { LEVELS, type Level } from "../data/levels";
import { LANGUAGES, strings, type Language } from "../i18n/language";
import { SegmentedControl } from "./SegmentedControl";
import { HighlightedText } from "./text/HighlightedText";

interface Props {
  language: Language;
  onLanguageChange: (language: Language) => void;
  level: Level;
  onLevelChange: (level: Level) => void;
  beginner: boolean;
  onBeginnerChange: (beginner: boolean) => void;
}

/** Title, language and level switches, beginner mode, and the note about the chosen level */
export function PageHeader({ language, onLanguageChange, level, onLevelChange, beginner, onBeginnerChange }: Props) {
  const text = strings();
  return (
    <>
      <header className="page-header">
        <div className="brand">Polskie przypadki<small>{text.subtitle}</small></div>
        <div className="controls">
          <SegmentedControl label={text.language} items={LANGUAGES.map((item) => [item.key, item.label])} value={language} onChange={onLanguageChange} />
          <SegmentedControl label={text.level} items={LEVELS.map((item) => [item, item])} value={level} onChange={onLevelChange} />
          <label className="switch" title={text.beginnerHint}>
            <input type="checkbox" id="explain-toggle" checked={beginner} onChange={(event) => onBeginnerChange(event.target.checked)} />
            <span className="track" aria-hidden="true" />
            <span>{text.beginner}</span>
          </label>
        </div>
      </header>
      <div className="level-note"><HighlightedText text={text.notes[level]} /></div>
    </>
  );
}
