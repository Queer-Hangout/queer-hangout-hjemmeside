import React, { useState, useRef, useEffect } from "react"
import DateBox from "./date-box"
import AccordionArrow from "./accordion-arrow"
import { eventObserver } from "./utils"
import TimeAndLocation, { LocationString } from "./time-and-location"

export default function Event({ event, onClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const detailsRef = useRef()
  const observer = eventObserver(setIsOpen)

  useEffect(() => {
    if (detailsRef.current) {
      observer.observe(detailsRef.current, {
        attributes: true,
      })
      return () => {
        setIsOpen(false)
        observer.disconnect()
      }
    }
  }, [])

  return (
    <details
      ref={detailsRef}
      onClick={e => e.preventDefault()}
      className="box-border bg-white border border-[#BBBBBB] shadow-md rounded h-full"
    >
      <summary
        onClick={e => {
          e.preventDefault()
          onClick({
            ...e,
            currentTarget: detailsRef.current,
          })
        }}
        aria-expanded={isOpen}
        className="flex flex-row px-4 sm:py-4 py-3 list-none box-border overflow-hidden cursor-pointer max-w-full"
      >
        <DateBox datetime={event.start} />
        <div className="flex flex-col justify-center grow gap-2">
          <h3 className="p-0 m-0 sm:text-lg text-base font-normal">
            {event.name}
          </h3>
          <TimeAndLocation
            location={event.location}
            duration={event.duration}
            start={event.start}
            end={event.end}
          />
        </div>
        <AccordionArrow isOpen={isOpen} />
      </summary>
      <div className="flex flex-col px-4">
        <LocationString location={event.location} />
        <p
          className="px-2 sm:text-base text-sm"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </div>
    </details>
  )
}
