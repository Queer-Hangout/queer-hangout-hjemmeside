import { Language } from "@/types/language";
import fs from "node:fs";
import path from "node:path";
import { MenuItem, PageMdx } from "@/types/content";
import { describe } from "node:test";

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
