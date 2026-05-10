import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { mkdir } from "node:fs/promises";

const libDir = path.dirname(fileURLToPath(import.meta.url));

async function buildAll() {
  const distDir = path.resolve(libDir, "dist");
  // Do NOT delete dist — tsc --build writes .d.ts files there and we must preserve them.
  await mkdir(distDir, { recursive: true });

  await esbuild({
    entryPoints: [path.resolve(libDir, "src/index.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outfile: path.resolve(distDir, "index.js"),
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
