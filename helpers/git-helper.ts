import { Language } from "@/types/language";

const isVercel = Boolean(process.env.VERCEL);
const owner = isVercel
  ? process.env.VERCEL_GIT_REPO_OWNER
  : process.env.GITHUB_OWNER;
const repo = isVercel
  ? process.env.VERCEL_GIT_REPO_SLUG
  : process.env.GITHUB_REPO;
const branchName =
  (isVercel ? process.env.VERCEL_GIT_COMMIT_REF : process.env.GITHUB_BRANCH) ||
  "main";

export interface GitHubCommit {
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

interface GitHubContent {
  type: "file" | "dir" | "symlink" | "submodule";
  name: string;
  path: string;
}

function throwGithubAPIError(
  message: string,
  status: number,
  statusText: string
) {
  const msg = `${message}
    GitHub API request failed with status ${status}: ${statusText}`;
  if (isVercel)
    throw Error(`${msg}
      Authenticate by setting GITHUB_TOKEN in Vercel's environment variables.
      `);
  else {
    console.warn(
      `\x1b[33mWARN:\x1b[0m ${msg}
      ${
        status === 403
          ? "Authenticate by setting GITHUB_TOKEN in .env.local"
          : ""
      }
      ${
        status === 403
          ? `For more information, see docs at https://github.com/Queer-Hangout/queer-hangout-hjemmeside/docs/localdev.md#miljøvariabler`
          : ""
      }
      `
    );
  }
}

export async function fetchGitCommits(
  fileRelativePath: string,
  perPage?: number
): Promise<GitHubCommit[] | null> {
  // Fetch from GitHub’s commits API
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${fileRelativePath}&sha=${branchName}&per_page=${
    perPage || 1
  }`;
  const res = await fetch(url, {
    headers: process.env.GITHUB_TOKEN
      ? {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        }
      : undefined,
  });

  if (!res.ok) {
    throwGithubAPIError(
      `Failed to fetch Github metadata for file ${fileRelativePath}`,
      res.status,
      res.statusText
    );
    return null;
  }

  return (await res.json()) as GitHubCommit[];
}

export async function listGitHubMdxFiles(directory: string): Promise<string[]> {
  const url = new URL(
    `https://api.github.com/repos/${owner}/${repo}/contents/${directory}`
  );
  url.searchParams.append("ref", branchName);

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    throwGithubAPIError(
      `Failed to list contents of directory ${directory}`,
      res.status,
      res.statusText
    );
  }
  const data = (await res.json()) as GitHubContent[];
  return data
    .filter((item) => item.type === "file" && item.name.endsWith(".mdx"))
    .map((item) => item.name);
}
