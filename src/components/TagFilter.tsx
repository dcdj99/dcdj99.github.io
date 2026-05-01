type Props = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
};

export function TagFilter({ tags, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 font-mono text-xs">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`px-2 py-1 border ${active === null ? "border-accent text-accent dark:border-accent-dark dark:text-accent-dark" : "border-ink/20 dark:border-ink-dark/20"}`}
      >
        all
      </button>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={`px-2 py-1 border ${active === t ? "border-accent text-accent dark:border-accent-dark dark:text-accent-dark" : "border-ink/20 dark:border-ink-dark/20"}`}
        >
          #{t}
        </button>
      ))}
    </div>
  );
}
