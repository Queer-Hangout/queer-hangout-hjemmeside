import { Language, Translated } from "@/types/language";

export function getDateString(datetimeIso: string) {
  const date = new Date(datetimeIso);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
}

export function getTimeString(datetimeIso: string) {
  const date = new Date(datetimeIso);
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function getDatetimeString(datetimeIso: string) {
  return `${getDateString(datetimeIso)} - ${getTimeString(datetimeIso)}`;
}

export function parseDuration(durationIso: string) {
  const REGEX =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
  const [, years, months, weeks, days, hours, minutes, secs] =
    durationIso.match(REGEX) || [];
  return {
    years: parseInt(years || "0"),
    months: parseInt(months || "0"),
    weeks: parseInt(weeks || "0"),
    days: parseInt(days || "0"),
    hours: parseInt(hours || "0"),
    minutes: parseInt(minutes || "0"),
    secs: parseInt(secs || "0"),
  };
}

type TimeUnit =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";

const translations: { [key: string]: Translated<string> } = {
  year: { en: "year", no: "år" },
  years: { en: "years", no: "år" },
  month: { en: "month", no: "måned" },
  months: { en: "months", no: "måneder" },
  week: { en: "week", no: "uke" },
  weeks: { en: "weeks", no: "uker" },
  day: { en: "day", no: "dag" },
  days: { en: "days", no: "dager" },
  hour: { en: "hour", no: "time" },
  hours: { en: "hours", no: "timer" },
  minute: { en: "minute", no: "minutt" },
  minutes: { en: "minutes", no: "minutter" },
  second: { en: "second", no: "sekund" },
  seconds: { en: "seconds", no: "sekunder" },
};

function durationUnit(key: TimeUnit, value: number, lang: Language) {
  let units = {
    years: value === 1 ? translations.year : translations.years,
    months: value === 1 ? translations.month : translations.months,
    weeks: value === 1 ? translations.week : translations.weeks,
    days: value === 1 ? translations.day : translations.days,
    hours: value === 1 ? translations.hour : translations.hours,
    minutes: value === 1 ? translations.minute : translations.minutes,
    seconds: value === 1 ? translations.second : translations.seconds,
  };
  return units[key][lang];
}

export function getDurationString(durationIso: string, lang: Language) {
  if (!eventIsLongerThanADay(durationIso)) return null;

  const parsedDuration = parseDuration(durationIso);
  var durationStringArray = [];
  for (const [key, value] of Object.entries(parsedDuration)) {
    if (value > 0) {
      durationStringArray.push(
        `${value} ${durationUnit(key as TimeUnit, value, lang)}`
      );
    }
  }
  return durationStringArray.length === 0
    ? null
    : durationStringArray.join(", ");
}

export function eventIsLongerThanADay(durationIso: string) {
  const { years, months, weeks, days, hours, minutes } =
    parseDuration(durationIso);
  if (years > 0 || months > 0 || weeks > 0 || days >= 1) return true;
  if (days === 0) return false;
  else return hours > 0 || minutes > 0;
}

export function getEventTimeString(
  start: string,
  end: string,
  duration: string
) {
  if (eventIsLongerThanADay(duration)) return null;
  if (!start.includes("T") && !end.includes("T")) return null;
  return `${getTimeString(start)} - ${getTimeString(end)}`;
}
