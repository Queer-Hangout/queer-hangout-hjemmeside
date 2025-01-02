import { Language } from "@/types/language";
import { ReactNode } from "react";
import LayoutComponent from "@/components/layout";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ language: Language }>;
  children: ReactNode | ReactNode[];
}) {
  const { language } = await params;
  return <LayoutComponent language={language}>{children}</LayoutComponent>;
}
