import { mergeProgress, PROGRESS_STORAGE_KEY, type Progress } from "./progress";
import { writeStored } from "./storage";

/*
 * Optional account sync. Inside a claude.ai artifact the page gets window.claude
 * with a private per-viewer database; on any other host this stays off and
 * progress lives in localStorage only.
 */
interface DocumentReference {
  get(): Promise<{ exists: boolean; data(): unknown }>;
  set(value: unknown): Promise<void>;
}
interface ClaudeRuntime {
  use(name: "db"): Promise<{ doc(path: string): DocumentReference }>;
  use(name: "user"): Promise<{ id(): Promise<string | null> }>;
}
declare global {
  interface Window { claude?: ClaudeRuntime }
}

const remote: { document: DocumentReference | null; latest: Progress | null; writing: boolean; writeAgain: boolean; timer?: ReturnType<typeof setTimeout> } = {
  document: null, latest: null, writing: false, writeAgain: false,
};

async function connect(): Promise<DocumentReference | null> {
  const runtime = window.claude;
  if (!runtime?.use) return null;
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000));
  const connection = (async () => {
    const [database, user] = await Promise.all([runtime.use("db"), runtime.use("user")]);
    const userId = await user?.id();
    return database && userId ? database.doc(`data/users/${userId}/progress`) : null;
  })();
  try {
    return await Promise.race([connection, timeout]);
  } catch {
    return null;
  }
}

async function flush() {
  if (!remote.document || !remote.latest) return;
  if (remote.writing) { remote.writeAgain = true; return; }
  remote.writing = true;
  try { await remote.document.set(structuredClone(remote.latest)); } catch { /* the next save retries */ }
  remote.writing = false;
  if (remote.writeAgain) { remote.writeAgain = false; void flush(); }
}

/** Save locally right away and to the account (if connected) a moment later */
export function saveProgress(progress: Progress) {
  writeStored(PROGRESS_STORAGE_KEY, progress);
  remote.latest = progress;
  clearTimeout(remote.timer);
  remote.timer = setTimeout(flush, 1200);
}

/** Connect to the account copy and merge it with the local one; null when there is no account sync */
export async function syncWithAccount(local: () => Progress): Promise<Progress | null> {
  const document = await connect();
  if (!document) return null;
  remote.document = document;
  const snapshot = await document.get();
  const stored = snapshot?.exists ? snapshot.data() : null;
  const merged = mergeProgress(local(), stored);
  writeStored(PROGRESS_STORAGE_KEY, merged);
  if (JSON.stringify(merged) !== JSON.stringify(mergeProgress(stored, null))) {
    remote.latest = merged;
    void flush();
  }
  return merged;
}
