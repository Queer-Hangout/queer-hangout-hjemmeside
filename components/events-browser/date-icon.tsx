import { Language, Translated } from "@/types/language";

export default function DateIcon({
  language,
  datetimeIso,
}: {
  language: Language;
  datetimeIso: string;
}) {
  const date = new Date(datetimeIso);
  return (
    <div
      className="flex flex-col justify-center items-center border-l-2 border-fuchsia-400 mr-auto w-16 h-full"
      aria-label={`${date.getDate()}. ${months[date.getMonth()][language]}`}
    >
      <span aria-hidden="true">{date.getDate()}</span>
      <span aria-hidden="true">
        {months[date.getMonth()][language].slice(0, 3)}
      </span>
    </div>
  );
}

const months: Translated<string>[] = [
  {
    en: "January",
    no: "Januar",
  },
  {
    en: "February",
    no: "Februar",
  },
  {
    en: "March",
    no: "Mars",
  },
  {
    en: "April",
    no: "April",
  },
  {
    en: "May",
    no: "Mai",
  },
  {
    en: "June",
    no: "Juni",
  },
  {
    en: "July",
    no: "Juli",
  },
  {
    en: "August",
    no: "August",
  },
  {
    en: "September",
    no: "September",
  },
  {
    en: "October",
    no: "Oktober",
  },
  {
    en: "November",
    no: "November",
  },
  {
    en: "December",
    no: "Desember",
  },
];
