const url = "https://events.api.queerhangout.no";

export type CalendarEvent = {
  uid: string;
  start: string;
  end: string;
  duration: string;
  created: string;
  name: string;
  summary: string;
  description: string;
  location: string;
  rrule: string;
  status: string;
};

export type CalendarPage = {
  "source-url": string;
  "last-updated": string;
  "total-events": number;
  "total-pages": number;
  "per-page": string;
  events: CalendarEvent[];
};

export async function getCalendarPage(page?: number) {
  const res = await fetch(`${url}${page ? `/pages/${page}.json` : ""}`, {
    cache: "no-store",
  });
  const body = await res.json();
  const calendarPage: CalendarPage = body;
  return calendarPage;
}
