import LayoutComponent from "@/components/layout";
import { getSlugs } from "@/helpers/content-helper";
import { getMetadata } from "@/helpers/metadata-helper";
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
  const allowedSlugs = await getSlugs(language);
  return (
    <LayoutComponent
      language={language}
      slug={allowedSlugs.includes(slug) ? slug : undefined}
    >
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
  const allowedSlugs = await getSlugs(language);
  if (!allowedSlugs.includes(slug)) return {};
  return getMetadata(language, slug);
}
