import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm } from "node:fs/promises";

const libDir = path.dirname(fileURLToPath(import.meta.url));

async function buildAll() {
  const distDir = path.resolve(libDir, "dist");
  await rm(distDir, { recursive: true, force: true });

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
