export function getInitials(name: string | null, email: string) {
  const source = name?.trim() || email.split("@")[0] || "?"
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return source.slice(0, 2).toUpperCase()
}

const joinDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export function formatJoinDate(isoDate: string) {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) return "-"

  return joinDateFormatter.format(date)
}
