import { Language, Translated } from "@/types/language";
import fs from "node:fs";
import path from "node:path";
import { MenuItem, PageMdx } from "@/types/content";
import { languages } from "@/config/languages";

export const getMdxFiles = (language: Language) =>
  fs.readdirSync(path.join("content", "pages", language));

export const getSlugs = (language: Language) =>
  getMdxFiles(language).map((filename) => filename.replace(".mdx", ""));

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
        getSlugs(language).map((slug) =>
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

interface GitHubCommit {
  commit: {
    author: {
      date: string;
      name: string;
    };
    committer?: {
      date: string;
    };
  };
}

async function fetchGitCommits(
  fileRelativePath: string,
  perPage?: number
): Promise<GitHubCommit[] | null> {
  const isVercel = Boolean(process.env.VERCEL);
  const owner = isVercel
    ? process.env.VERCEL_GIT_REPO_OWNER
    : process.env.GITHUB_OWNER;
  const repo = isVercel
    ? process.env.VERCEL_GIT_REPO_SLUG
    : process.env.GITHUB_REPO;
  const branchName = process.env.VERCEL_GIT_COMMIT_REF || "main";

  // Fetch from GitHub’s commits API
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${fileRelativePath}&sha=${branchName}&per_page=${
    perPage || 1
  }`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error(`GitHub API request failed with status ${res.status}`);
    return null;
  }

  return (await res.json()) as GitHubCommit[];
}

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
