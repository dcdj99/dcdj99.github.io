import { ds } from "../lib/design";

type Props = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
};

export function TagFilter({ tags, active, onChange }: Props) {
  const btn = (isActive: boolean): React.CSSProperties => ({
    fontFamily: ds.mono, fontSize: "0.65rem", letterSpacing: ".06em",
    padding: "4px 10px", border: "none", borderRadius: "3px", cursor: "pointer",
    background: isActive ? ds.accent : ds.dim,
    color: isActive ? "#fff" : ds.sub,
    transition: "all 0.15s",
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
      <button type="button" onClick={() => onChange(null)} style={btn(active === null)}>
        all
      </button>
      {tags.map(t => (
        <button key={t} type="button" onClick={() => onChange(t)} style={btn(active === t)}>
          #{t}
        </button>
      ))}
    </div>
  );
}
