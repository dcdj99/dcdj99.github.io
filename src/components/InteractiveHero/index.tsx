import { lazy, Suspense } from "react";
import { usePrefersReducedMotion } from "../../lib/theme";

const Constellation = lazy(() =>
  import("./Constellation").then((m) => ({ default: m.Constellation }))
);

export function InteractiveHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="aspect-[4/3] sm:aspect-[16/9] w-full border border-ink/10 dark:border-ink-dark/10 overflow-hidden">
      {reduced ? (
        <StaticFallback />
      ) : (
        <Suspense fallback={<StaticFallback />}>
          <Constellation />
        </Suspense>
      )}
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-mono text-xs opacity-50">— a quiet field —</div>
    </div>
  );
}
