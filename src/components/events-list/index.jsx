import React, { useState, useEffect } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { fetchEvents, onEventClick } from "./utils"
import Event from "./event"
import { createLastUpdatedString } from "./string-formatter"

function LoadingSpinner() {
  return (
    <div className="mx-auto my-auto">
      <ClipLoader />
    </div>
  )
}

export default function EventsList() {
  const [pages, setPages] = useState({})
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  let i = 0
  useEffect(() => {
    async function loadPage() {
      if (isLoading) {
        return
      }
      if (!Object.keys(pages).includes(currentPage.toString())) {
        setIsLoading(true)
        const res = await fetchEvents(currentPage)
        let newPages = { ...pages }
        newPages[currentPage] = res.events
        setPages(newPages)
        setLastUpdated(res["last-updated"])
        setIsLoading(false)
      } else {
        setEvents(pages[currentPage])
      }
    }
    loadPage()
  }, [currentPage, isLoading, pages])

  return (
    <div className="container flex flex-col mx-auto min-h-[280px] sm:min-h-[420px] pb-5">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col min-w-full min-h-full border border-solid border-slate-300">
          {events.map(event => (
            <Event key={i++} event={event} onClick={onEventClick} />
          ))}
          {events.length === 0 ? (
            <span className="mx-auto my-auto">
              Ingen kommende arrangementer
            </span>
          ) : null}
        </div>
      )}
      {lastUpdated != null ? (
        <span className="my-2 mx-auto">
          {createLastUpdatedString("Sist oppdatert", lastUpdated)}
        </span>
      ) : null}
    </div>
  )
}
