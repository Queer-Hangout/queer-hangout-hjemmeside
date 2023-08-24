export async function fetchEvents(pageNumber) {
  const apiUrl = `https://events.api.queerhangout.no/pages/${pageNumber}.json`
  const response = await fetch(apiUrl)
  if (!response.ok) {
    console.error(`${response.status}: ${response.statusText}`)
  }
  return response.json()
}

export function onEventClick(e) {
  const isOpen = e.currentTarget.open
  Array.from(
    document.getElementsByClassName(e.currentTarget.className),
  ).forEach(element => {
    element.removeAttribute("open")
  })
  if (!isOpen) e.currentTarget.setAttribute("open", true)
}

export function eventObserver(setIsOpen) {
  return new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "open") {
        setIsOpen(mutation.target.open)
      }
    })
  })
}
