import { strings } from "../i18n/language";

export const TABS = ["theory", "practice", "exam", "stats"] as const;
export type Tab = (typeof TABS)[number];
export const isTab = (value: unknown): value is Tab => TABS.includes(value as Tab);

export function TabBar({ value, onChange }: { value: Tab; onChange: (tab: Tab) => void }) {
  const titles = strings().tabs;
  return (
    <nav className="tabs" role="tablist">
      {TABS.map((tab, index) => (
        <button key={tab} role="tab" aria-selected={value === tab} onClick={() => onChange(tab)}>{titles[index]}</button>
      ))}
    </nav>
  );
}
