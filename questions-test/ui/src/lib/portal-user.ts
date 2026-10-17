export type PortalUser = {
  id: string
  name: string
  email: string
  role: string
  school: string
  grade: string
  nisn: string
  joinedAt: string
  target: string
  streakDays: number
  totalPracticeHours: number
  modulesDone: number
  initials: string
}

export const portalUser: PortalUser = {
  id: "USR-88421",
  name: "Fathur Rahman",
  email: "fathur.rahman@siswa.belajar.id",
  role: "Siswa Aktif",
  school: "SMAN 1 Jakarta",
  grade: "Kelas 12 IPA",
  nisn: "004819231",
  joinedAt: "15 Juli 2024",
  target: "UTBK-SNBT 2025",
  streakDays: 5,
  totalPracticeHours: 42,
  modulesDone: 14,
  initials: "FR",
}
