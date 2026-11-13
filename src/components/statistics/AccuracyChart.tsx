import { strings } from "../../i18n/language";
import type { Statistics } from "../../lib/statistics";

const WIDTH = 560, HEIGHT = 170, PADDING_LEFT = 34, PADDING_BOTTOM = 22, PADDING_TOP = 10;
const GRID = [0, 50, 100];
/** Vertical position of an accuracy percentage */
const yOf = (accuracy: number) => PADDING_TOP + (HEIGHT - PADDING_TOP - PADDING_BOTTOM) * (1 - accuracy / 100);

/** Accuracy per day for the last 14 days; today is solid, days without answers show a dot */
export function AccuracyChart({ days }: { days: Statistics["chartDays"] }) {
  const text = strings();
  const slot = (WIDTH - PADDING_LEFT) / days.length;
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={text.chartTitle}>
        {GRID.map((value) => (
          <g key={value}>
            <line x1={PADDING_LEFT} x2={WIDTH} y1={yOf(value)} y2={yOf(value)} stroke="var(--line)" strokeDasharray={value === 0 ? "" : "3 4"} />
            <text x={PADDING_LEFT - 6} y={yOf(value) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{value}%</text>
          </g>
        ))}
        {days.map(({ day, answers, accuracy }, index) => {
          const left = PADDING_LEFT + index * slot + slot * 0.2, barWidth = slot * 0.6;
          const isToday = index === days.length - 1;
          return (
            <g key={day}>
              {accuracy != null ? (
                <rect x={left} y={yOf(accuracy)} width={barWidth} height={Math.max(2, yOf(0) - yOf(accuracy))} rx="3" fill="var(--accent)" opacity={isToday ? 1 : 0.55}>
                  <title>{`${day}: ${accuracy}%, ${answers} ${text.pieces}`}</title>
                </rect>
              ) : (
                <circle cx={left + barWidth / 2} cy={yOf(0) - 3} r="2" fill="var(--line)" />
              )}
              <text x={left + barWidth / 2} y={HEIGHT - 6} textAnchor="middle" fontSize="10.5" fill={isToday ? "var(--ink)" : "var(--muted)"}>
                {parseInt(day.slice(8), 10)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
