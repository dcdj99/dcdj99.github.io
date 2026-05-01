import { copyFile } from "node:fs/promises";
await copyFile("dist/index.html", "dist/404.html");
console.log("copied dist/index.html → dist/404.html for SPA fallback");
