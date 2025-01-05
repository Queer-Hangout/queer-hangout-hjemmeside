import { Language, Translated } from "@/types/language";
import fs from "node:fs";
import path from "node:path";
import { MenuItem, PageMdx } from "@/types/content";
import { languages } from "@/config/languages";
import { fetchGitCommits, listGitHubMdxFiles } from "@/helpers/git-helper";

export const getMdxFiles = async (language: Language) => {
  const isVercel = Boolean(process.env.VERCEL);
  const directory = path.join("content", "pages", language);
  if (isVercel) return await listGitHubMdxFiles(directory);
  else return fs.readdirSync(directory);
};

export const getSlugs = async (language: Language) => {
  return (await getMdxFiles(language)).map((filename) =>
    filename.replace(".mdx", "")
  );
};

export const loadPageMdx = (language: Language, slug: string) =>
  import(`@/content/pages/${language}/${slug}.mdx`).catch((e: any) => {
    throw Error(
      `Failed to load content markdown at content/pages/${language}/${slug}.mdx\n${e}`
    );
  }) as Promise<PageMdx>;

export const loadMenuItems = async (language: Language) =>
  (
    (
      await Promise.all(
        (
          await getSlugs(language)
        ).map((slug) =>
          loadPageMdx(language, slug).then((mdx) => {
            return {
              language,
              slug,
              title: mdx.frontmatter.title,
              description: mdx.frontmatter.description,
              index: mdx.frontmatter.menu,
            };
          })
        )
      )
    ).filter((a) => a.index != null) as MenuItem[]
  ).toSorted((a, b) => a.index - b.index);

export const getAlternates = async (
  language: Language,
  slug: string
): Promise<Translated<string>> =>
  Object.fromEntries(
    await Promise.all(
      languages.map(async (lang) => {
        if (lang === language) return [lang, `/${lang}/${slug}`];
        else
          return [
            lang,
            `/${lang}/${
              (await loadPageMdx(language, slug)).frontmatter[lang] || ""
            }`,
          ];
      })
    )
  ) as Translated<string>;

export async function getLastModifiedTimestamp(
  language: Language,
  slug: string
) {
  const commits = await fetchGitCommits(
    path.join("content", "pages", language, `${slug}.mdx`)
  );
  if (!Array.isArray(commits) || commits.length === 0) {
    return null; // No commits found for that file
  }
  const lastModifiedString = commits[0].commit.author.date;
  return new Date(lastModifiedString).toISOString();
}

export async function getAuthors(
  language: Language,
  slug: string
): Promise<string[]> {
  const commits = await fetchGitCommits(
    path.join("content", "pages", language, `${slug}.mdx`),
    100
  );
  if (!Array.isArray(commits) || commits.length === 0) {
    return []; // No commits found for that file
  }
  return Array.from(
    new Set(
      commits
        .map((commit) => commit.commit.author.name)
        .filter((name) => name != null)
    )
  );
}
