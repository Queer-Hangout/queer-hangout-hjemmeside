import { Language } from "@/types/language";
import fs from "fs";
import path from "path";

/**
 * Lists all slugs for pages of a given language.
 * @param language - Language for paths to generate.
 * @returns An array of slugs relative to the language path.
 */
export function getPageSlugs(language: Language): string[] {
  const basePath: string = path.resolve(
    process.cwd(),
    `content/pages/${language}`
  );
  return listMarkdownFiles(basePath)
    .filter((filename) => filename !== "index.mdx")
    .map(stripFileExtension);
}

/**
 * Lists all .mdx files in a given folder.
 * @param folderPath - The path of the folder to list files from.
 * @returns An array of slugs relative to the language path.
 */
function listMarkdownFiles(folderPath: string): string[] {
  return listFilesInFolder(folderPath).filter((filename) =>
    filename.endsWith(".mdx")
  );
}

/**
 * Lists all files in a given folder.
 * @param folderPath - The path of the folder to list files from.
 * @returns An array of filenames in the given folder.
 */
function listFilesInFolder(folderPath: string): string[] {
  const files: string[] = [];

  try {
    const items = fs.readdirSync(folderPath);

    items.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isFile()) {
        files.push(item);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading folder: ${error.message}`);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
  }

  return files;
}

/**
 * Strips the file extension from a given filename.
 * @param filename - The filename to process (e.g., "index.mdx").
 * @returns The filename without its extension (e.g., "index").
 */
function stripFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;
}
