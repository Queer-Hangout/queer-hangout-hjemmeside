import fs from "node:fs";
import path from "node:path";

export async function listMdxFilesOnDisk(directory: string) {
  return fs.readdirSync(directory);
}

export async function getLastModifiedOnDisk(filename: string) {
  try {
    const absolutePath = path.join(process.cwd(), filename);
    const stats = fs.statSync(absolutePath);
    return stats.mtime.toISOString();
  } catch (error) {
    console.error(`Failed to read stats for file "${filename}":`, error);
    return null;
  }
}
