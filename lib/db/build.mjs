import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { mkdir } from "node:fs/promises";

const libDir = path.dirname(fileURLToPath(import.meta.url));

const external = ["pg", "pg-native", "drizzle-orm", "drizzle-zod", "zod", "*.node"];

async function buildAll() {
  const distDir = path.resolve(libDir, "dist");
  // Do NOT delete dist — tsc --build writes .d.ts files there and we must preserve them.
  await mkdir(distDir, { recursive: true });
  await mkdir(path.resolve(distDir, "schema"), { recursive: true });

  await esbuild({
    entryPoints: [
      path.resolve(libDir, "src/index.ts"),
      path.resolve(libDir, "src/schema/index.ts"),
    ],
    platform: "node",
    bundle: true,
    format: "esm",
    outdir: distDir,
    outbase: path.resolve(libDir, "src"),
    external,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
