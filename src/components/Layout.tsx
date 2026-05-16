import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ds } from "../lib/design";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: ds.bg, color: ds.text }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
