import { strings } from "../../i18n/language";
import type { Statistics } from "../../lib/statistics";

/** The five cards missed most often */
export function WeakCards({ cards }: { cards: Statistics["weakCards"] }) {
  const text = strings();
  return (
    <div className="weak">
      {cards.map(({ card, misses, total }) => (
        <div key={card.id}>
          <span lang="pl">{card.prompt.replace("___", card.answer)}</span>
          <span>{misses} {text.outOf} {total}</span>
        </div>
      ))}
    </div>
  );
}
