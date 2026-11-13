import { useEffect, useState } from "react";
import { isLevel, type Level } from "./data/levels";
import { isLanguage, setRuntimeSettings, type Language } from "./i18n/language";
import type { CaseFilter } from "./lib/deck";
import { useProgress } from "./hooks/useProgress";
import { isBoolean, useStoredState } from "./hooks/useStoredState";
import { ExamScreen } from "./components/exam/ExamScreen";
import { PageHeader } from "./components/PageHeader";
import { PracticeScreen } from "./components/practice/PracticeScreen";
import { StatisticsScreen } from "./components/statistics/StatisticsScreen";
import { isTab, TabBar, type Tab } from "./components/TabBar";
import { TheoryScreen } from "./components/theory/TheoryScreen";
import { TooltipLayer } from "./components/tooltip/TooltipLayer";

export function App() {
  const [language, setLanguage] = useStoredState<Language>("pl-cases-lang", "uk", isLanguage);
  const [beginner, setBeginner] = useStoredState("pl-cases-explain", true, isBoolean);
  const [level, setLevel] = useStoredState<Level>("pl-cases-level", "A0", isLevel);
  const [tab, setTab] = useStoredState<Tab>("pl-cases-tab", "theory", isTab);
  const [caseFilter, setCaseFilter] = useState<CaseFilter>("all");
  const { progress, syncedWithAccount, recordAnswer, recordExam, reset } = useProgress();

  // Helpers like strings() read these during this same render
  setRuntimeSettings(language, beginner);
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const openPractice = (filter: CaseFilter) => {
    setCaseFilter(filter);
    setTab("practice");
  };

  return (
    <div className="wrap">
      <PageHeader language={language} onLanguageChange={setLanguage} level={level} onLevelChange={setLevel} beginner={beginner} onBeginnerChange={setBeginner} />
      <TabBar value={tab} onChange={setTab} />
      {tab === "theory" && <TheoryScreen key={language} level={level} onPractice={openPractice} />}
      {tab === "practice" && (
        <PracticeScreen key={`${level}-${caseFilter}`} level={level} progress={progress} onAnswer={recordAnswer} caseFilter={caseFilter} onCaseFilterChange={setCaseFilter} />
      )}
      {tab === "exam" && <ExamScreen history={progress.exams} onFinish={recordExam} />}
      {tab === "stats" && <StatisticsScreen progress={progress} onReset={reset} syncedWithAccount={syncedWithAccount} />}
      <TooltipLayer />
    </div>
  );
}
