import { strings } from "../../i18n/language";
import type { Statistics } from "../../lib/statistics";

const trendOf = (change: number) => (change > 0 ? "up" : change < 0 ? "down" : "flat");

/** Week accuracy with the change to last week, total answers, days in a row */
export function SummaryCards({ statistics }: { statistics: Statistics }) {
  const text = strings();
  const { weekAccuracy, weekChange, overall, overallAccuracy, daysInRow } = statistics;
  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="value">{weekAccuracy != null ? weekAccuracy + "%" : text.nothing}</div>
        <div className="label">{text.weekAccuracy}</div>
        {weekChange != null && (
          <div className={"change " + trendOf(weekChange)}>{weekChange > 0 ? "+" : ""}{weekChange} {text.weekChange}</div>
        )}
      </div>
      <div className="summary-card">
        <div className="value">{overall.total}</div>
        <div className="label">{text.cardsTotal(overall.total)}</div>
        <div className="change flat">{overallAccuracy}% {text.correct}</div>
      </div>
      <div className="summary-card">
        <div className="value">{daysInRow}</div>
        <div className="label">{text.daysInRow(daysInRow)}</div>
      </div>
    </div>
  );
}
