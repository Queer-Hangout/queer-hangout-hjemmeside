import { Language } from "@/types/language";
import MenuClient from "@/components/menu/menu-client";
import Link from "next/link";
import { loadMenuItems } from "@/helpers/content-helper";

export default async function Menu({ language }: { language: Language }) {
  const menuItems = await loadMenuItems(language);
  return (
    <nav
      aria-label={
        {
          no: "Meny",
          en: "Menu",
        }[language]
      }
      className="h-full font-normal text-inherit bg-inherit"
    >
      <MenuClient language={language}>
        <ul className="relative text-white bg-slate-800 flex-grow w-screen lg:w-96 flex flex-col justify-start gap-12 px-3 sm:px-6 pt-3 pb-12">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="text-right">
              <Link
                className="my-auto mx-auto"
                href={`/${language}${
                  menuItem.slug === "index" ? "" : `/${menuItem.slug}`
                }`}
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </MenuClient>
    </nav>
  );
}
