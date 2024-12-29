import { Language, Translated } from "@/types/language";

export const languages: Language[] = ["no", "en"];
export const defaultLanguage: Language = "no";

export const languageNames: Translated<string> = {
  no: "Norsk",
  en: "English",
};
