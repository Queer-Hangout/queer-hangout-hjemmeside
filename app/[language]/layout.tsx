import { Language } from "@/types/language";
import { ReactNode } from "react";
import LayoutComponent from "@/components/layout";
import Analytics from "@/components/analytics";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ language: Language }>;
  children: ReactNode | ReactNode[];
}) {
  const { language } = await params;
  return (
    <LayoutComponent language={language}>
      <Analytics language={language} />
      {children}
    </LayoutComponent>
  );
}
