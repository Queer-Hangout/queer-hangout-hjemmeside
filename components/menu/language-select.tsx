"use client";

import Selector from "@/components/input/selector";
import { languages, languageNames } from "@/config/languages";
import { Language } from "@/types/language";
import { MdOutlineLanguage } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function LanguageSelect({ language }: { language: Language }) {
  const router = useRouter();
  return (
    <Selector<Language>
      innerLabel={
        <MdOutlineLanguage
          size={25}
          aria-hidden="true"
          className="flex h-full min-h-full mr-2"
        />
      }
      aria-label={
        {
          se: "Giella",
          no: "Språk",
          en: "Language",
        }[language]
      }
      defaultValue={language}
      onSelect={(event) =>
        router.push(
          {
            se: "/se",
            no: "/no",
            en: "/en",
          }[event.value]
        )
      }
      options={languages.map((language) => {
        return {
          label: languageNames[language],
          value: language,
        };
      })}
      classes={{
        selectedOption:
          "!w-0 sm:!w-full !overflow-x-hidden sm:!overflow-x-visible",
      }}
    />
  );
}
