const twoDigits = (value: number) => String(value).padStart(2, "0");

/** Local calendar day as YYYY-MM-DD, the key of daily progress */
export const dayKey = (date = new Date()) => `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;

export const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${twoDigits(seconds % 60)}`;

export const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : null);

export function shuffle<T>(items: readonly T[]): T[] {
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index--) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapWith]] = [result[swapWith], result[index]];
  }
  return result;
}
