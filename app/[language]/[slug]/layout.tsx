import LayoutComponent from "@/components/layout";
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
  return getMetadata(language, slug);
}
