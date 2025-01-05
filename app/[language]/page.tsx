import LayoutComponent from "@/components/layout";
import { languages } from "@/config/languages";
import { Language } from "@/types/language";

export default async function Page({
  params,
}: {
  params: Promise<{ language: Language }>;
}) {
  const { language } = await params;
  const { default: PageContent } = await import(
    `@/content/pages/${language}/index.mdx`
  );
  return (
    <LayoutComponent language={language}>
      <PageContent />
    </LayoutComponent>
  );
}

export function generateStaticParams() {
  return languages.map((language) => {
    return { language };
  });
}

export const dynamicParams = false;
