const isVercel = Boolean(process.env.VERCEL);
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branchName =
  process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || "main";

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

function throwGithubAPIError(message: string, res: Response) {
  let solution = undefined;
  let relevantDocs = undefined;
  switch (res.status) {
    case 401:
    case 403:
      solution = !process.env.GITHUB_TOKEN
        ? `Authenticate by setting GITHUB_TOKEN in ${
            isVercel ? "Vercel environment variables" : ".env.local"
          }.`
        : "Check that GITHUB_TOKEN is not expired.";
      relevantDocs =
        "https://github.com/Queer-Hangout/queer-hangout-hjemmeside/docs/localdev.md#miljøvariabler";
      break;
    case 404:
      solution =
        !process.env.VERCEL_GIT_COMMIT_REF && !process.env.GITHUB_BRANCH
          ? `Set GITHUB_BRANCH to your working branch name in ${
              isVercel ? "Vercel environment variables" : ".env.local"
            }.`
          : undefined;
      relevantDocs =
        !process.env.VERCEL_GIT_COMMIT_REF && !process.env.GITHUB_BRANCH
          ? "https://github.com/Queer-Hangout/queer-hangout-hjemmeside/docs/localdev.md#miljøvariabler"
          : undefined;
      break;
  }
  throw Error(
    `${message}
      GitHub API request failed with status ${res.status}: ${res.statusText}
      ${solution || ""}
      ${
        relevantDocs ? `For more information, see docs at ${relevantDocs}` : ""
      }`
  );
}

export async function fetchGitCommits(
  fileRelativePath: string,
  perPage?: number
): Promise<GitHubCommit[] | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${fileRelativePath}&sha=${branchName}&per_page=${
    perPage || 1
  }`;
  const res: Response = await fetch(url, {
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
      res
    );
    return null;
  }

  return (await res.json()) as GitHubCommit[];
}

export async function getLastModifiedOnGithub(filename: string) {
  const commits = await fetchGitCommits(filename);
  if (!Array.isArray(commits) || commits.length === 0) {
    return null; // No commits found for that file
  }
  const lastModifiedString = commits[0].commit.author.date;
  return new Date(lastModifiedString).toISOString();
}

export async function getAuthorsOfFileOnGithub(filename: string) {
  const commits = await fetchGitCommits(filename, 100);
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

export async function listMdxFilesOnGithub(
  directory: string
): Promise<string[]> {
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
      res
    );
  }
  const data = (await res.json()) as GitHubContent[];
  return data
    .filter((item) => item.type === "file" && item.name.endsWith(".mdx"))
    .map((item) => item.name);
}
