import { languages } from "@/config/languages";
import { Language } from "@/types/language";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language }>;
}) {
  const { language } = await params;
  const { default: PageContent, frontmatter } = await import(
    `@/content/pages/${language}/index.mdx`
  );
  return <PageContent />;
}

export function generateStaticParams() {
  return languages.map((language) => {
    return { language };
  });
}

export const dynamicParams = false;
