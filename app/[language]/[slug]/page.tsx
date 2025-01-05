import { languages } from "@/config/languages";
import { Language } from "@/types/language";
import { getSlugs, loadPageMdx } from "@/helpers/content-helper";
import type { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language; slug: string }>;
}) {
  const { language, slug } = await params;
  const { default: PageContent, frontmatter } = await loadPageMdx(
    language,
    slug
  );
  return <PageContent />;
}

export async function generateStaticParams() {
  return languages.flatMap((language) =>
    getSlugs(language)
      .filter((slug) => slug !== "index")
      .map((slug) => {
        return {
          language,
          slug,
        };
      })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: Language; slug: string }>;
}): Promise<Metadata> {
  const { language, slug } = await params;
  const { frontmatter } = await loadPageMdx(language, slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      url: `/${language}/${slug}`,
    },
    alternates: {
      canonical: `/${language}/${slug}`,
      languages: Object.fromEntries(
        languages.map((lang) => [
          lang,
          `/${lang}/${lang === language ? slug : frontmatter[lang] || ""}`,
        ])
      ),
    },
    robots: {
      index: frontmatter.disableRobots === true ? false : true,
      googleBot: {
        index: frontmatter.disableRobots === true ? false : true,
      },
    },
  };
}

export const dynamicParams = false;
