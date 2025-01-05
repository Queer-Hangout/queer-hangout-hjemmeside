import { languages } from "@/config/languages";
import { Language } from "@/types/language";
import { getSlugs, loadPageMdx } from "@/helpers/content-helper";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language; slug: string }>;
}) {
  const { language, slug } = await params;
  const { default: PageContent } = await loadPageMdx(language, slug);
  return <PageContent />;
}

export async function generateStaticParams() {
  return (
    await Promise.all(
      languages.flatMap((language) =>
        getSlugs(language).then((slugs) => {
          return {
            language,
            slugs,
          };
        })
      )
    )
  ).flatMap(({ language, slugs }) =>
    slugs.flatMap((slug) => {
      return {
        language,
        slug,
      };
    })
  );
}

export const dynamicParams = false;
