import { Language } from "@/types/language";
import { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ language: Language }>;
  children: ReactNode | ReactNode[];
}) {
  return <div>{children}</div>;
}
