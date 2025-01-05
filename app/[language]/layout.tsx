import { Language } from "@/types/language";
import { ReactNode } from "react";
import { Metadata } from "next";
import { getMetadata } from "@/helpers/metadata-helper";

export default async function Layout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return <>{children}</>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: Language }>;
}): Promise<Metadata> {
  const { language } = await params;
  return getMetadata(language, "index");
}
