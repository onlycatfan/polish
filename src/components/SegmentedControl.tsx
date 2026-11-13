export function SegmentedControl<Key extends string>({ items, value, onChange, label }: {
  items: [Key, string][];
  value: Key;
  onChange: (key: Key) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {items.map(([key, title]) => (
        <button key={key} aria-pressed={key === value} onClick={() => onChange(key)}>
          {title}
        </button>
      ))}
    </div>
  );
}
