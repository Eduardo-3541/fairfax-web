import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("img-assets");
const OUTPUT_DIR = path.resolve("public/images");

const SUPPORTED_INPUTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_INPUTS.has(ext)) {
    return { skipped: true, filePath };
  }

  const relativePath = path.relative(SOURCE_DIR, filePath);
  const baseName = relativePath.replace(ext, "");
  const outputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));

  await ensureDir(outputDir);

  const webpTarget = path.join(outputDir, `${path.basename(baseName)}.webp`);
  const avifTarget = path.join(outputDir, `${path.basename(baseName)}.avif`);

  const image = sharp(filePath);
  await Promise.all([
    image.clone().webp({ quality: 75 }).toFile(webpTarget),
    image.clone().avif({ quality: 60 }).toFile(avifTarget),
  ]);

  return { skipped: false, filePath, outputs: [webpTarget, avifTarget] };
}

async function main() {
  try {
    await ensureDir(OUTPUT_DIR);
    const sourceStats = await stat(SOURCE_DIR).catch(() => null);
    if (!sourceStats || !sourceStats.isDirectory()) {
      console.error(`Source directory not found: ${SOURCE_DIR}`);
      process.exitCode = 1;
      return;
    }

    const results = { converted: 0, skipped: 0 };
    for await (const filePath of walk(SOURCE_DIR)) {
      const result = await convertImage(filePath);
      if (result.skipped) {
        results.skipped += 1;
      } else {
        results.converted += 1;
        console.log(`Converted: ${path.relative(process.cwd(), filePath)}`);
        result.outputs.forEach((output) => {
          console.log(`  → ${path.relative(process.cwd(), output)}`);
        });
      }
    }

    console.log(`Finished. Converted ${results.converted} file(s), skipped ${results.skipped}.`);
  } catch (error) {
    console.error("Failed to optimize images:", error);
    process.exitCode = 1;
  }
}

main();
