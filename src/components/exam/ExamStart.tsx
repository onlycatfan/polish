import { EXAM } from "../../data/exam";
import { strings } from "../../i18n/language";
import { formatTime } from "../../lib/format";
import type { ExamRecord } from "../../lib/progress";

const OFFICIAL_SAMPLES = [
  ["https://certyfikatpolski.pl/o-egzaminie/przykladowe-testy-zbiory-zadan/", "certyfikatpolski.pl: przykładowe testy"],
  ["https://certyfikatpolski.pl/wp-content/uploads/2025/02/20-21.04.2024-B1_arkusz_egzaminacyjny.pdf", "Egzamin B1, kwiecień 2024 (PDF)"],
  ["https://testy.propolski.com/en/certificate-b1-polish-sample-test-questions-2019-grammar/", "testy.propolski.com: B1 gramatyka 2019"],
];

interface Props { history: ExamRecord[]; instantCheck: boolean; onInstantCheckChange: (value: boolean) => void; onStart: () => void }

/** Parts overview, the instant check option, recent attempts and links to official samples */
export function ExamStart({ history, instantCheck, onInstantCheckChange, onStart }: Props) {
  const text = strings().exam;
  const recent = history.slice(-6).reverse();
  return (
    <div className="exam">
      <div className="case-head" data-case="none"><h2>Egzamin B1</h2><div className="question">Poprawność gramatyczna</div></div>
      <p className="exam-intro">{text.intro}</p>
      <div className="exam-parts">
        {EXAM.map((section) => (
          <div key={section.key} className="exam-part">
            <b>{text.part} {section.key}</b>
            <span lang="pl">{section.instruction.pl}</span>
            <span className="muted">{section.taskCount} {text.tasksWord(section.taskCount)}</span>
          </div>
        ))}
      </div>
      <label className="toggle">
        <input type="checkbox" id="exam-instant" checked={instantCheck} onChange={(event) => onInstantCheckChange(event.target.checked)} />
        <span>{text.instant}</span>
      </label>
      <div className="row"><button className="button-primary" onClick={onStart}>{text.start}</button><span className="small-note">{text.threshold}</span></div>
      {recent.length > 0 && (
        <section className="block">
          <h3>{text.history}</h3>
          <div className="weak">
            {recent.map((attempt) => (
              <div key={attempt.time}>
                <span>{new Date(attempt.time).toLocaleDateString()} · {formatTime(attempt.seconds || 0)}</span>
                <span className={attempt.score / attempt.maximum >= 0.5 ? "pass" : "fail"}>{attempt.score} / {attempt.maximum}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="block">
        <h3>{text.officialSamples}</h3>
        <div className="links">
          {OFFICIAL_SAMPLES.map(([href, title]) => <a key={href} href={href} target="_blank" rel="noopener">{title}</a>)}
        </div>
      </section>
    </div>
  );
}
