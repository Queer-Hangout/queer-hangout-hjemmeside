import LayoutComponent from "@/components/layout";
import { languages } from "@/config/languages";
import { loadPageMdx } from "@/helpers/content-helper";
import { Language } from "@/types/language";
import { Metadata } from "next";
import { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ language: Language; slug: string }>;
  children: ReactNode | ReactNode[];
}) {
  const { language, slug } = await params;
  return (
    <LayoutComponent language={language} slug={slug}>
      {children}
    </LayoutComponent>
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
