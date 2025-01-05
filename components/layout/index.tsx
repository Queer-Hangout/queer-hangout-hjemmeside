import { Language } from "@/types/language";
import { ReactNode } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function LayoutComponent({
  language,
  slug,
  children,
}: {
  language: Language;
  slug?: string;
  children?: ReactNode | ReactNode[];
}) {
  return (
    <html lang={language} className="flex flex-col h-full bg-slate-800">
      <body className="flex flex-col h-full">
        <div className="flex flex-col flex-grow justify-between">
          <Header language={language} slug={slug} />
          <main className="flex flex-col flex-grow w-full bg-white text-black px-3 lg:px-0">
            <div className="flex flex-col max-w-[920px] mx-auto mdx-content">
              {children}
            </div>
          </main>
          <Footer language={language} />
        </div>
      </body>
    </html>
  );
}
