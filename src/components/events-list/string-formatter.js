export function createLastUpdatedString(updatedLabel, datetime) {
  if (datetime == null) return null
  const date = new Date(datetime)
  return `${updatedLabel} ${date.getDate()}.${date.getMonth()}.${date
    .getFullYear()
    .toString()
    .slice(2)} - ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`
}

export function getTimeStringFromDatetime(datetime) {
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function parseDuration(durationIso) {
  const REGEX =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
  const [, years, months, weeks, days, hours, minutes, secs] =
    durationIso.match(REGEX)
  return {
    years: parseInt(years || 0),
    months: parseInt(months || 0),
    weeks: parseInt(weeks || 0),
    days: parseInt(days || 0),
    hours: parseInt(hours || 0),
    minutes: parseInt(minutes || 0),
    secs: parseInt(secs || 0),
  }
}

function durationUnit(key, value) {
  let units = {
    years: "år",
    months: value === 1 ? "måned" : "måneder",
    weeks: value === 1 ? "uke" : "uker",
    days: value === 1 ? "dag" : "dager",
    hours: value === 1 ? "time" : "timer",
    minutes: value === 1 ? "minutt" : "minutter",
    secs: value === 1 ? "sekund" : "sekunder",
  }
  return units[key]
}

export function getDurationString(durationIso) {
  if (!isLongerThanADay(durationIso)) return null

  const parsedDuration = parseDuration(durationIso)
  var durationStringArray = []
  for (const [key, value] of Object.entries(parsedDuration)) {
    if (value > 0) {
      durationStringArray.push(`${value} ${durationUnit(key, value)}`)
    }
  }
  return durationStringArray.length === 0
    ? null
    : durationStringArray.join(", ")
}

export function isLongerThanADay(durationIso) {
  const { years, months, weeks, days, hours, minutes } =
    parseDuration(durationIso)
  if (years > 0 || months > 0 || weeks > 0 || days >= 1) return true
  if (days === 0) return false
  else return hours > 0 || minutes > 0
}

export function getTimeString(start, end, duration) {
  if (isLongerThanADay(duration)) return null
  if (!start.includes("T") && !end.includes("T")) return null

  const startDate = new Date(start)
  const endDate = new Date(end)

  return `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`
}
