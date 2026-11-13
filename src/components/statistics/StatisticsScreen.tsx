import { strings } from "../../i18n/language";
import type { Progress } from "../../lib/progress";
import { computeStatistics } from "../../lib/statistics";
import { AccuracyChart } from "./AccuracyChart";
import { CaseBars } from "./CaseBars";
import { ResetButton } from "./ResetButton";
import { SummaryCards } from "./SummaryCards";
import { WeakCards } from "./WeakCards";

export function StatisticsScreen({ progress, onReset, syncedWithAccount }: { progress: Progress; onReset: () => void; syncedWithAccount: boolean }) {
  const text = strings();
  const statistics = computeStatistics(progress);
  if (!statistics.overall.total) return <div className="empty">{text.statsEmpty}</div>;
  return (
    <div>
      <SummaryCards statistics={statistics} />
      <section className="block">
        <h3>{text.chartTitle}</h3>
        <AccuracyChart days={statistics.chartDays} />
      </section>
      <section className="block">
        <h3>{text.byCaseTitle}</h3>
        <CaseBars rows={statistics.byCase} />
      </section>
      {statistics.weakCards.length > 0 && (
        <section className="block">
          <h3>{text.weakTitle}</h3>
          <WeakCards cards={statistics.weakCards} />
        </section>
      )}
      <div className="footer">
        <span>{syncedWithAccount ? text.savedInAccount : text.savedInBrowser}</span>
        <ResetButton onReset={onReset} />
      </div>
    </div>
  );
}
