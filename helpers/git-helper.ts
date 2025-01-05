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

export async function fetchGitCommits(
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
  const branchName =
    (isVercel
      ? process.env.VERCEL_GIT_COMMIT_REF
      : process.env.GITHUB_BRANCH) || "main";

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
    const msg = `Failed to fetch Github metadata for file ${fileRelativePath}
    GitHub API request failed with status ${res.status}: ${res.statusText}`;
    if (isVercel)
      throw Error(`${msg}
    Authenticate by setting GITHUB_TOKEN in Vercel's environment variables.
    `);
    else {
      console.warn(
        `\x1b[33mWARN:\x1b[0m ${msg}
    ${
      res.status === 403
        ? "Authenticate by setting GITHUB_TOKEN in .env.local"
        : ""
    }
    ${
      res.status === 403
        ? `For more information, see docs at https://github.com/Queer-Hangout/queer-hangout-hjemmeside/docs/localdev.md#miljøvariabler`
        : ""
    }
    `
      );
      return null;
    }
  }

  return (await res.json()) as GitHubCommit[];
}
