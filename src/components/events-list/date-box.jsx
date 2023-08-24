import React from "react"

const monthIndices = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
]

export default function DateBox({ datetime }) {
  const date = new Date(datetime)
  const dateString = date.getDate()
  const monthString = monthIndices[date.getMonth()]
  return (
    <div
      className="flex flex-row min-h-full h-full pr-0.5 mr-2.5 my-auto"
      aria-label={`${dateString}. ${monthString}`}
    >
      <div className={`w-0.5 rounded-sm bg-[#ff9cf5]`} aria-hidden="true" />
      <div className="flex flex-col justify-center w-16" aria-hidden="true">
        <span className="text-center  sm:text-lg text-base">{dateString}</span>
        <span className="text-center  sm:text-lg text-base">
          {monthString.slice(0, 3)}
        </span>
      </div>
    </div>
  )
}
