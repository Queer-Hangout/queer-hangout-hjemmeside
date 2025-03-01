import LayoutComponent from "@/components/layout";
import NotFoundComponent from "@/components/not-found";
import { defaultLanguage, languages } from "@/config/languages";
import { headers } from "next/headers";

export default async function NotFound() {
  const headerList = await headers();
  const langHeader = headerList.get("x-detected-language");
  const language =
    languages.find((lang) => lang === langHeader) || defaultLanguage;
  return (
    <LayoutComponent language={language}>
      <NotFoundComponent language={language} />
    </LayoutComponent>
  );
}
