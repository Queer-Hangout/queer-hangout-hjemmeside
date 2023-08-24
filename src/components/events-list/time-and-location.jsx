import React from "react"
import {
  IoLocationOutline,
  IoTimeOutline,
  IoTimerOutline,
} from "react-icons/io5"
import { getDurationString, getTimeString } from "./string-formatter"

const timeLocationClass = "inline-flex flex-row"
const spanClass = "inline-block sm:text-base text-sm"

const TimeString = ({ start, end, duration }) => {
  const time = getTimeString(start, end, duration)
  return time != null ? (
    <div className={timeLocationClass} aria-label={`Tid: ${time}`}>
      <IoTimeOutline
        size={18}
        style={{
          margin: "auto 5px auto 0",
        }}
        aria-hidden="true"
      />
      <span className={spanClass}>{time}</span>
    </div>
  ) : null
}

const DurationString = ({ duration }) => {
  const durationString = getDurationString(duration)
  return durationString != null ? (
    <div
      className={timeLocationClass}
      aria-label={`Varighet: ${durationString}`}
    >
      <IoTimerOutline
        size={18}
        style={{
          margin: "auto 5px auto 0",
        }}
        aria-hidden="true"
      />
      <span className={spanClass}>{durationString}</span>
    </div>
  ) : null
}

export const LocationString = ({ location }) =>
  location != null && location !== "" ? (
    <div className="inline-flex flex-row pt-2" aria-label={`Sted: ${location}`}>
      <IoLocationOutline
        size={20}
        style={{
          margin: "auto 5px auto 0",
          minWidth: "20px",
        }}
        aria-hidden="true"
      />
      <span className="inline-flex break-words sm:text-base text-sm">
        {location}
      </span>
    </div>
  ) : null

export default function TimeAndLocation({ start, end, duration, location }) {
  return (
    <div className="flex flex-row flex-wrap whitespace-normal gap-x-5">
      <TimeString start={start} end={end} duration={duration} />
      <DurationString duration={duration} />
    </div>
  )
}
