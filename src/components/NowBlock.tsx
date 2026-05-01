import { now } from "../data/now";

export function NowBlock() {
  return (
    <aside className="border-l-2 border-accent dark:border-accent-dark pl-5 py-2">
      <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
        Now · updated {now.updated}
      </p>
      <p className="mt-2 leading-relaxed">{now.text}</p>
    </aside>
  );
}
