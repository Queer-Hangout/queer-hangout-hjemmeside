import { Language } from "@/types/language";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function NotFoundComponent({
  language,
}: {
  language: Language;
}) {
  return (
    <div className="flex-grow flex flex-col justify-center text-center h-full gap-8">
      <h1>{{ no: "Siden finnes ikke", en: "Page not found" }[language]}</h1>
      <div className="flex justify-center mx-auto rounded-full p-2 border-2 border-zinc-700 h-24 w-24">
        <LiveHelpIcon className="min-h-10 min-w-10 my-auto mx-auto text-zinc-700" />
      </div>
      <p>
        {
          {
            no: "Den kan ha blitt flyttet, eller adressen er feil.",
            en: "It might have been moved, or the URL could be wrong.",
          }[language]
        }
      </p>
      <Link
        href={{ no: "/no", en: "/en" }[language]}
        className="flex flex-row justify-center text-black no-underline hover:underline gap-1 mx-auto"
      >
        <ArrowBackIcon className="my-auto" />
        {
          {
            no: "Tilbake til forsiden",
            en: "Return home",
          }[language]
        }
      </Link>
    </div>
  );
}
