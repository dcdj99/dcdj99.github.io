import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PaperGrain } from "./PaperGrain";
import { CustomCursor } from "./CustomCursor";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <PaperGrain />
      <CustomCursor />
      <Header />
      <main className="flex-1 relative z-[2]">{children}</main>
      <Footer />
    </div>
  );
}
