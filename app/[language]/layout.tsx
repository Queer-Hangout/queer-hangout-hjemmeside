import { Language } from "@/types/language";
import { ReactNode } from "react";
import Analytics from "@/components/analytics";
import { Metadata } from "next";
import { getMetadata } from "@/helpers/metadata-helper";

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
  return getMetadata(language, "index");
}
