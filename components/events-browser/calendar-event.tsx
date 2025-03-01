import { CalendarEvent } from "@/helpers/events-helper";
import { Language, Translated } from "@/types/language";
import DateIcon from "./date-icon";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoTimerOutline,
} from "react-icons/io5";
import { getDurationString, getEventTimeString } from "@/helpers/date-helper";

export default function CalendarEventItem(
  props: CalendarEvent & { language: Language }
) {
  return (
    <Accordion className="w-full">
      <AccordionSummary
        id="panel-header"
        aria-controls="panel-content"
        className="flex flex-row py-2 px-4"
      >
        <DateIcon language={props.language} datetimeIso={props.start} />
        <div className="flex flex-col flex-grow gap-1">
          <h3 className="text-base">{props.name}</h3>
          <div>
            <TimeString {...props} />
            <DurationString {...props} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-4">
        <LocationString {...props} />
        <p dangerouslySetInnerHTML={{ __html: props.description }} />
      </AccordionDetails>
    </Accordion>
  );
}

const translations: { [key: string]: Translated<string> } = {
  time: { en: "Time", no: "Tid" },
  duration: { en: "Duration", no: "Varighet" },
  location: { en: "Location", no: "Sted" },
};

function TimeString({
  start,
  end,
  duration,
  language,
}: {
  start: string;
  end: string;
  duration: string;
  language: Language;
}) {
  const time = getEventTimeString(start, end, duration);
  return time != null ? (
    <div
      className="flex flex-row items-center gap-1"
      aria-label={`${translations.time[language]}: ${time}`}
    >
      <IoTimeOutline size={16} aria-hidden="true" />
      <span className="text-sm mt-auto" aria-hidden="true">
        {time}
      </span>
    </div>
  ) : null;
}

function DurationString({
  duration,
  language,
}: {
  duration: string;
  language: Language;
}) {
  const durationString = getDurationString(duration, language);
  return durationString != null ? (
    <div
      className="flex flex-row items-center gap-1"
      aria-label={`${translations.duration[language]}: ${durationString}`}
    >
      <IoTimerOutline size={16} aria-hidden="true" />
      <span className="text-sm mt-auto" aria-hidden="true">
        {durationString}
      </span>
    </div>
  ) : null;
}

function LocationString({
  location,
  language,
}: {
  location: string;
  language: Language;
}) {
  return location != null && location !== "" ? (
    <div
      className="flex flex-row items-center gap-1"
      aria-label={`${translations.location[language]}: ${location}`}
    >
      <IoLocationOutline size={18} aria-hidden="true" />
      <span className="text-sm" aria-hidden="true">
        {location}
      </span>
    </div>
  ) : null;
}
