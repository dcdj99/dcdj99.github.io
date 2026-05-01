import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/theme";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button']"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent dark:border-accent-dark transition-[width,height,opacity] duration-150 ease-out hidden md:block ${
        hovering ? "w-8 h-8 opacity-80" : "w-3 h-3 opacity-50"
      }`}
    />
  );
}
