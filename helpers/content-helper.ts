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
