import { Language } from "@/types/language";
import Menu from "@/components/menu";
import LanguageSelect from "@/components/menu/language-select";
import Link from "next/link";
import LogoImage from "/public/Logo_QH.svg";
import Image from "next/image";
import { getAlternates } from "@/helpers/content-helper";

export default async function Header({
  language,
  slug,
}: {
  language: Language;
  slug?: string;
}) {
  return (
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
        <LanguageSelect
          language={language}
          routes={slug ? await getAlternates(language, slug) : undefined}
        />
      </nav>
      <Menu language={language} />
    </header>
  );
}
