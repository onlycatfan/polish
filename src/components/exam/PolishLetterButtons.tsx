import type { RefObject } from "react";
import { strings } from "../../i18n/language";
import { POLISH_LETTERS } from "../../lib/exam";

/** ą ć ę ... buttons that type into the last focused answer field at the caret */
export function PolishLetterButtons({ input, onInsert }: { input: RefObject<HTMLInputElement | null>; onInsert: (taskId: string, value: string) => void }) {
  const insert = (letter: string) => {
    const field = input.current;
    if (!field?.dataset.taskId) return;
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    onInsert(field.dataset.taskId, field.value.slice(0, start) + letter + field.value.slice(end));
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(start + 1, start + 1);
    });
  };
  return (
    <div className="letters" aria-label={strings().exam.letters}>
      {POLISH_LETTERS.map((letter) => (
        <button key={letter} className="letter" onMouseDown={(event) => event.preventDefault()} onClick={() => insert(letter)}>{letter}</button>
      ))}
    </div>
  );
}
