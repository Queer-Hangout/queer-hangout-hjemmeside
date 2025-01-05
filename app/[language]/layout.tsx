import { Language } from "@/types/language";
import { ReactNode } from "react";
import LayoutComponent from "@/components/layout";
import Analytics from "@/components/analytics";
import { Metadata } from "next";
import { PageMdx } from "@/types/content";
import { languages } from "@/config/languages";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ language: Language }>;
  children: ReactNode | ReactNode[];
}) {
  const { language } = await params;
  return (
    <>
      <Analytics language={language} />
      {children}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: Language }>;
}): Promise<Metadata> {
  const { language } = await params;
  const { frontmatter } = (await import(
    `@/content/pages/${language}/index.mdx`
  )) as PageMdx;
  return {
    title: {
      template: "%s | Queer Hangout",
      default: frontmatter.title,
    },
    description: frontmatter.description,
    openGraph: {
      url: `/${language}`,
      locale: language,
      alternateLocale: languages,
    },
    alternates: {
      canonical: `/${language}`,
      languages: {
        no: "/no",
        en: "/en",
      },
    },
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
