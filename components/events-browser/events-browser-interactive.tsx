"use client";

import { Language } from "@/types/language";
import CalendarEvent from "./calendar-event";
import { CalendarPage } from "@/helpers/events-helper";
import { useState } from "react";
import { getDatetimeString } from "@/helpers/date-helper";

export default function EventsBrowserInteractive({
  language,
  initialCalendarPage,
}: {
  language: Language;
  initialCalendarPage: CalendarPage;
}) {
  const [calendarPages, setCalendarPages] = useState([initialCalendarPage]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentCalendarPage = calendarPages[currentPage];
  let i = 0;

  return (
    <div className="events-browser not-prose flex flex-col justify-center items-center mx-auto gap-6 w-full max-w-[920px]">
      <div className="border-2 w-full">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <div>
            {calendarPages[currentPage].events.length > 0 ? (
              calendarPages[currentPage].events.map((calendarEvent) => (
                <CalendarEvent
                  key={i++}
                  language={language}
                  {...calendarEvent}
                />
              ))
            ) : (
              <span>
                {
                  {
                    en: "No upcoming events",
                    no: "Ingen hendelser",
                  }[language]
                }
              </span>
            )}
          </div>
        )}
      </div>
      <p suppressHydrationWarning={true}>{`${
        {
          en: "Last updated",
          no: "Oppdatert",
        }[language]
      } ${getDatetimeString(currentCalendarPage["last-updated"])}`}</p>
    </div>
  );
}
