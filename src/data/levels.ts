export const LEVELS = ["A0", "A1", "A2", "B1", "B2", "C1"] as const;
export type Level = (typeof LEVELS)[number];
export const levelIndex = (level: Level) => LEVELS.indexOf(level);
export const isLevel = (value: unknown): value is Level => LEVELS.includes(value as Level);
/** Number of answer options per level */
export const OPTIONS_BY_LEVEL: Record<Level, number> = { A0: 2, A1: 3, A2: 4, B1: 4, B2: 4, C1: 4 };
