# Polskie przypadki

Тренажер польських відмінків A0-C1: теорія, картки з розбором, іспит B1, прогрес.
Live: https://onlycatfan.github.io/polish/

Vite + React 19 + TypeScript, без бекенду: прогрес у localStorage.

```bash
pnpm install
pnpm dev      # http://localhost:5173/polish/
pnpm build    # typecheck + build into dist/
```

Push to `main` deploys to GitHub Pages via Actions.

## Structure

- `src/data` content: cards, theory, word forms, rules, explanations, exam tasks
- `src/i18n` interface strings and the current language
- `src/lib` plain logic: grammar helpers, hints, deck building, progress, statistics, exam grading, account sync
- `src/hooks` state: progress, a practice series, an exam session, values kept in localStorage
- `src/components` screens split into small parts: `theory`, `practice`, `exam`, `statistics`, `text` (markup), `tooltip`

Conventions: full words in names (no abbreviations), components around 50-100 lines with logic in `lib` and `hooks`.

Text markup in data: `{ę}` highlights an ending, `[[key|shown]]` is a grammar term from `GLOSS`.
Progress keeps the storage key `pl-cases-progress-v1`; `mergeProgress` also reads the first format (short field names, case keys like `mian`).
