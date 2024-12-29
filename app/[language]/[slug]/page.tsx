import { languages } from "@/config/languages";
import { Language } from "@/types/language";
import fs from "node:fs";
import path from "node:path";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language; slug: string }>;
}) {
  const { language, slug } = await params;
  const { default: PageContent, frontmatter } = await import(
    `@/content/pages/${language}/${slug}.mdx`
  );
  return <PageContent />;
}

export async function generateStaticParams() {
  return languages.flatMap((language) =>
    fs.readdirSync(path.join("content", "pages", language)).map((filename) => ({
      language,
      slug: filename.replace(".mdx", ""),
    }))
  );
}

export const dynamicParams = false;
