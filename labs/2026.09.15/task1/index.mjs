import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const ISU = "563052";
const ROOT_DIR = "/data";

async function analyzeDirectory(directory) {
  let files = 0;
  let directories = 0;
  let size = 0;

  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isFile()) {
      const fileStat = await stat(fullPath);

      files++;
      size += fileStat.size;
    } else if (entry.isDirectory()) {
      directories++;

      const result = await analyzeDirectory(fullPath);

      files += result.files;
      directories += result.directories;
      size += result.size;
    }
  }

  return {
    files,
    directories,
    size,
  };
}

const result = await analyzeDirectory(ROOT_DIR);

console.log(`${ISU}-${result.files}-${result.directories}-${result.size}`);
