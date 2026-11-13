import { useEffect, useRef, useState } from "react";
import type { Card } from "../data/cards";
import { saveProgress, syncWithAccount } from "../lib/accountSync";
import { emptyProgress, mergeProgress, PROGRESS_STORAGE_KEY, withAnswer, withExam, type ExamRecord, type Progress } from "../lib/progress";
import { readStored } from "../lib/storage";

/** Progress state: loaded from localStorage, merged with the account copy when there is one, saved on every change */
export function useProgress() {
  const [progress, setProgress] = useState(() => mergeProgress(readStored<unknown>(PROGRESS_STORAGE_KEY, null), null));
  const [syncedWithAccount, setSyncedWithAccount] = useState(false);
  const latest = useRef(progress);
  latest.current = progress;

  useEffect(() => {
    let mounted = true;
    syncWithAccount(() => latest.current)
      .then((merged) => {
        if (!merged || !mounted) return;
        setProgress(merged);
        setSyncedWithAccount(true);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const change = (update: (previous: Progress) => Progress) =>
    setProgress((previous) => {
      const next = update(previous);
      saveProgress(next);
      return next;
    });

  return {
    progress,
    syncedWithAccount,
    recordAnswer: (card: Card, correct: boolean) => change((previous) => withAnswer(previous, card, correct)),
    recordExam: (record: ExamRecord) => change((previous) => withExam(previous, record)),
    reset: () => change(() => emptyProgress()),
  };
}
