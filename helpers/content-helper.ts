import { Language, Translated } from "@/types/language";
import { MenuItem, PageMdx } from "@/types/content";
import { languages } from "@/config/languages";
import {
  getAuthorsOfFileOnGithub,
  getLastModifiedOnGithub,
  listMdxFilesOnGithub,
} from "@/helpers/git-helper";
import { getLastModifiedOnDisk, listMdxFilesOnDisk } from "./disk-helper";

async function listMdxFiles(directory: string) {
  const listMdxFilesFunc = process.env.VERCEL
    ? listMdxFilesOnGithub
    : listMdxFilesOnDisk;
  return listMdxFilesFunc(directory);
}

export async function getSlugs(language: Language): Promise<string[]> {
  return (await listMdxFiles(`content/pages/${language}`)).map((f) =>
    f.replace(".mdx", "")
  );
}

export async function getAllSlugs() {
  return Promise.all(
    languages.map(async (language) => {
      const slugs = await getSlugs(language);
      return {
        language,
        slugs,
      };
    })
  );
}

export async function getLastModifiedTimestamp(
  language: Language,
  slug: string
) {
  const getLastModifiedFunc = process.env.VERCEL
    ? getLastModifiedOnGithub
    : getLastModifiedOnDisk;
  return getLastModifiedFunc(`content/pages/${language}/${slug}.mdx`);
}

export async function getAuthors(language: Language, slug: string) {
  return process.env.VERCEL
    ? getAuthorsOfFileOnGithub(`content/pages/${language}/${slug}`)
    : [];
}

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
