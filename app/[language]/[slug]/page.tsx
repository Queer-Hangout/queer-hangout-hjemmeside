import { Language } from "@/types/language";
import { getAllSlugs, getSlugs, loadPageMdx } from "@/helpers/content-helper";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language; slug: string }>;
}) {
  const { language, slug } = await params;
  const allowedSlugs = await getSlugs(language);
  if (!allowedSlugs.includes(slug)) notFound();
  const { default: PageContent } = await loadPageMdx(language, slug);
  return <PageContent />;
}

export async function generateStaticParams() {
  return (await getAllSlugs()).flatMap(({ language, slugs }) =>
    slugs
      .filter((slug) => slug !== "index")
      .flatMap((slug) => {
        return {
          language,
          slug,
        };
      })
  );
}
