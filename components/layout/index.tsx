import { Language } from "@/types/language";
import { ReactNode } from "react";
import Menu from "@/components/menu";
import LanguageSelect from "@/components/menu/language-select";
import Link from "next/link";
import LogoImage from "/public/Logo_QH.svg";
import Image from "next/image";
import Footer from "@/components/layout/footer";

export default async function LayoutComponent({
  language,
  children,
}: {
  language: Language;
  children?: ReactNode | ReactNode[];
}) {
  return (
    <div className="flex flex-col flex-grow justify-between">
      <header className="flex w-full h-32 lg:h-40 z-10 text-white bg-slate-800 px-3 sm:px-6">
        <div className="flex flex-row justify-between bg-inherit text-inherit h-full w-full z-10">
          <Link
            href={`/${language}`}
            className="flex flex-row items-center gap-6 text-lg font-light"
          >
            <Image
              src={LogoImage}
              aria-hidden="true"
              alt=""
              width={60}
              height={60}
              loading="eager"
            />
            <span>Queer Hangout</span>
          </Link>
        </div>
        <nav
          aria-label={{ no: "Språkvalg", en: "Language selection" }[language]}
          className="flex flex-row h-full align-middle items-center text-inherit bg-inherit"
        >
          <LanguageSelect language={language} />
        </nav>
        <Menu language={language} />
      </header>
      <main className="flex flex-col flex-grow w-full bg-white text-black px-3 sm:px-0">
        <div className="flex flex-col max-w-[920px] mx-auto mdx-content">
          {children}
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}
