import type { ReactNode } from "react";

export function HandUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 -bottom-1 w-full h-2 text-accent dark:text-accent-dark"
      >
        <path
          d="M2,5 Q50,1 100,4 T198,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
