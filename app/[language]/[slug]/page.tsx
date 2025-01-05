import { languages } from "@/config/languages";
import { Language } from "@/types/language";
import { getSlugs, loadPageMdx } from "@/helpers/content-helper";

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

export const dynamicParams = false;
