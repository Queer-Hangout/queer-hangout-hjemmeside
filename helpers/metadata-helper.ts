import { Language } from "@/types/language";
import { Metadata } from "next";
import {
  getAuthors,
  getLastModifiedTimestamp,
  loadPageMdx,
} from "@/helpers/content-helper";
import { languages } from "@/config/languages";

export async function getMetadata(
  language: Language,
  slug: string
): Promise<Metadata> {
  const { frontmatter } = await loadPageMdx(language, slug || "index");
  const authors = (await getAuthors(language, slug || "index")).map((name) => {
    return {
      name,
    };
  });
  const modifiedTime =
    (await getLastModifiedTimestamp(language, slug || "index")) || undefined;
  return {
    title:
      slug === "index"
        ? {
            template: "%s | Queer Hangout",
            default: frontmatter.title,
          }
        : frontmatter.title,
    description: frontmatter.description,
    authors,
    openGraph: {
      url: `/${language}${slug === "index" ? "" : `/${slug}`}`,
      locale: language,
      alternateLocale: languages,
    },
    alternates: {
      canonical: `/${language}${slug === "index" ? "" : `/${slug}`}`,
      languages: Object.fromEntries(
        languages.map((lang) => [
          lang,
          `/${lang}${
            slug === "index"
              ? ""
              : `/${lang === language ? slug : frontmatter[lang] || ""}`
          }`,
        ])
      ),
    },
    other: modifiedTime
      ? {
          "last-modified": modifiedTime,
        }
      : undefined,
    robots: {
      index: frontmatter.disableRobots === true ? false : true,
      follow: true,
      nocache: true,
      googleBot: {
        index: frontmatter.disableRobots === true ? false : true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
