export type Category = {
  id: string
  name: string
  description: string
  questionCount: number
  tone: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet"
  createdAt: string
}

export type QuestionType = "Pilihan Ganda" | "Benar/Salah" | "Isian Singkat"
export type Difficulty = "Mudah" | "Sedang" | "Sulit"
export type QuestionStatus = "Terbit" | "Draf"

export type QuestionOption = {
  key: string
  text: string
}

export type Question = {
  id: string
  code: string
  text: string
  categoryId: string
  type: QuestionType
  difficulty: Difficulty
  status: QuestionStatus
  options: QuestionOption[]
  answer: string
  explanation: string
  updatedAt: string
}

export type UserRole = "Admin" | "Guru" | "Siswa"
export type UserStatus = "Aktif" | "Nonaktif"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string
  lastActive: string
}

export type SubmissionStatus = "Selesai" | "Berlangsung" | "Belum Mulai"

export type Submission = {
  id: string
  studentName: string
  exam: string
  categoryId: string
  score: number
  correct: number
  total: number
  durationMinutes: number
  submittedAt: string
  status: SubmissionStatus
}

export const categories: Category[] = [
  {
    id: "cat-mat",
    name: "Matematika",
    description: "Aljabar, geometri, statistika, dan logika dasar.",
    questionCount: 248,
    tone: "indigo",
    createdAt: "12 Jan 2026",
  },
  {
    id: "cat-bind",
    name: "Bahasa Indonesia",
    description: "Membaca, menulis, tata bahasa, dan sastra.",
    questionCount: 196,
    tone: "emerald",
    createdAt: "14 Jan 2026",
  },
  {
    id: "cat-ipa",
    name: "Ilmu Pengetahuan Alam",
    description: "Fisika, biologi, dan kimia terpadu.",
    questionCount: 172,
    tone: "amber",
    createdAt: "18 Jan 2026",
  },
  {
    id: "cat-ips",
    name: "Ilmu Pengetahuan Sosial",
    description: "Sejarah, geografi, ekonomi, dan sosiologi.",
    questionCount: 143,
    tone: "rose",
    createdAt: "21 Jan 2026",
  },
  {
    id: "cat-bing",
    name: "Bahasa Inggris",
    description: "Reading, grammar, dan vocabulary.",
    questionCount: 158,
    tone: "sky",
    createdAt: "24 Jan 2026",
  },
  {
    id: "cat-tik",
    name: "Teknologi Informasi",
    description: "Dasar komputer, internet, dan literasi digital.",
    questionCount: 94,
    tone: "violet",
    createdAt: "02 Feb 2026",
  },
]

export const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? "Tanpa Kategori"

export const questions: Question[] = [
  {
    id: "q-1",
    code: "MTK-001",
    text: "Hasil dari 12 × 8 − 45 : 9 adalah …",
    categoryId: "cat-mat",
    type: "Pilihan Ganda",
    difficulty: "Mudah",
    status: "Terbit",
    options: [
      { key: "A", text: "86" },
      { key: "B", text: "91" },
      { key: "C", text: "96" },
      { key: "D", text: "101" },
    ],
    answer: "B",
    explanation: "12 × 8 = 96, 45 : 9 = 5, sehingga 96 − 5 = 91.",
    updatedAt: "10 Feb 2026",
  },
  {
    id: "q-2",
    code: "MTK-002",
    text: "Nilai x yang memenuhi 2x + 6 = 20 adalah …",
    categoryId: "cat-mat",
    type: "Pilihan Ganda",
    difficulty: "Sedang",
    status: "Terbit",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    answer: "C",
    explanation: "2x = 20 − 6 = 14, sehingga x = 7.",
    updatedAt: "11 Feb 2026",
  },
  {
    id: "q-3",
    code: "BIN-014",
    text: "Gagasan pokok pada paragraf pertama teks tersebut adalah …",
    categoryId: "cat-bind",
    type: "Pilihan Ganda",
    difficulty: "Sedang",
    status: "Terbit",
    options: [
      { key: "A", text: "Penyebab banjir di kota besar" },
      { key: "B", text: "Manfaat ruang terbuka hijau" },
      { key: "C", text: "Dampak pembangunan gedung" },
      { key: "D", text: "Sejarah tata kota" },
    ],
    answer: "B",
    explanation: "Kalimat utama menekankan manfaat ruang terbuka hijau.",
    updatedAt: "09 Feb 2026",
  },
  {
    id: "q-4",
    code: "IPA-007",
    text: "Air membeku pada suhu 0°C. Pernyataan tersebut benar atau salah?",
    categoryId: "cat-ipa",
    type: "Benar/Salah",
    difficulty: "Mudah",
    status: "Terbit",
    options: [
      { key: "B", text: "Benar" },
      { key: "S", text: "Salah" },
    ],
    answer: "B",
    explanation: "Pada tekanan 1 atm air membeku pada 0°C.",
    updatedAt: "08 Feb 2026",
  },
  {
    id: "q-5",
    code: "IPS-021",
    text: "Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal …",
    categoryId: "cat-ips",
    type: "Isian Singkat",
    difficulty: "Mudah",
    status: "Terbit",
    options: [],
    answer: "17 Agustus 1945",
    explanation: "Dibacakan oleh Ir. Soekarno di Jalan Pegangsaan Timur 56.",
    updatedAt: "07 Feb 2026",
  },
  {
    id: "q-6",
    code: "BIG-033",
    text: "Choose the correct form: She ___ to school every day.",
    categoryId: "cat-bing",
    type: "Pilihan Ganda",
    difficulty: "Sedang",
    status: "Draf",
    options: [
      { key: "A", text: "go" },
      { key: "B", text: "goes" },
      { key: "C", text: "going" },
      { key: "D", text: "gone" },
    ],
    answer: "B",
    explanation: "Subjek tunggal orang ketiga memakai kata kerja +s.",
    updatedAt: "12 Feb 2026",
  },
  {
    id: "q-7",
    code: "TIK-005",
    text: "Perangkat keras yang berfungsi memproses data disebut …",
    categoryId: "cat-tik",
    type: "Pilihan Ganda",
    difficulty: "Sedang",
    status: "Terbit",
    options: [
      { key: "A", text: "Monitor" },
      { key: "B", text: "CPU" },
      { key: "C", text: "Keyboard" },
      { key: "D", text: "Printer" },
    ],
    answer: "B",
    explanation: "CPU (Central Processing Unit) memproses instruksi program.",
    updatedAt: "06 Feb 2026",
  },
  {
    id: "q-8",
    code: "MTK-018",
    text: "Luas lingkaran dengan jari-jari 7 cm adalah … (π = 22/7)",
    categoryId: "cat-mat",
    type: "Pilihan Ganda",
    difficulty: "Sulit",
    status: "Draf",
    options: [
      { key: "A", text: "44 cm²" },
      { key: "B", text: "154 cm²" },
      { key: "C", text: "308 cm²" },
      { key: "D", text: "616 cm²" },
    ],
    answer: "B",
    explanation: "L = πr² = 22/7 × 49 = 154 cm².",
    updatedAt: "12 Feb 2026",
  },
]

export const users: User[] = [
  {
    id: "u-1",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@qnalyze.id",
    role: "Admin",
    status: "Aktif",
    joinedAt: "05 Jan 2026",
    lastActive: "Baru saja",
  },
  {
    id: "u-2",
    name: "Siti Nurhaliza",
    email: "siti.n@qnalyze.id",
    role: "Guru",
    status: "Aktif",
    joinedAt: "08 Jan 2026",
    lastActive: "5 menit lalu",
  },
  {
    id: "u-3",
    name: "Budi Santoso",
    email: "budi.s@qnalyze.id",
    role: "Guru",
    status: "Aktif",
    joinedAt: "11 Jan 2026",
    lastActive: "1 jam lalu",
  },
  {
    id: "u-4",
    name: "Dewi Lestari",
    email: "dewi.l@qnalyze.id",
    role: "Siswa",
    status: "Aktif",
    joinedAt: "20 Jan 2026",
    lastActive: "Kemarin",
  },
  {
    id: "u-5",
    name: "Rizky Pratama",
    email: "rizky.p@qnalyze.id",
    role: "Siswa",
    status: "Nonaktif",
    joinedAt: "22 Jan 2026",
    lastActive: "3 hari lalu",
  },
  {
    id: "u-6",
    name: "Maya Anggraini",
    email: "maya.a@qnalyze.id",
    role: "Siswa",
    status: "Aktif",
    joinedAt: "02 Feb 2026",
    lastActive: "Baru saja",
  },
  {
    id: "u-7",
    name: "Fajar Hidayat",
    email: "fajar.h@qnalyze.id",
    role: "Guru",
    status: "Aktif",
    joinedAt: "04 Feb 2026",
    lastActive: "30 menit lalu",
  },
  {
    id: "u-8",
    name: "Nadia Kirana",
    email: "nadia.k@qnalyze.id",
    role: "Siswa",
    status: "Nonaktif",
    joinedAt: "07 Feb 2026",
    lastActive: "1 minggu lalu",
  },
]

export const submissions: Submission[] = [
  {
    id: "SUB-1042",
    studentName: "Dewi Lestari",
    exam: "UTS Matematika Ganjil",
    categoryId: "cat-mat",
    score: 92,
    correct: 23,
    total: 25,
    durationMinutes: 78,
    submittedAt: "12 Feb 2026, 09:41",
    status: "Selesai",
  },
  {
    id: "SUB-1041",
    studentName: "Rizky Pratama",
    exam: "UTS Matematika Ganjil",
    categoryId: "cat-mat",
    score: 64,
    correct: 16,
    total: 25,
    durationMinutes: 85,
    submittedAt: "12 Feb 2026, 09:38",
    status: "Selesai",
  },
  {
    id: "SUB-1040",
    studentName: "Maya Anggraini",
    exam: "Latihan Bahasa Indonesia",
    categoryId: "cat-bind",
    score: 88,
    correct: 22,
    total: 25,
    durationMinutes: 61,
    submittedAt: "12 Feb 2026, 08:55",
    status: "Selesai",
  },
  {
    id: "SUB-1039",
    studentName: "Fajar Hidayat",
    exam: "Kuis IPA Terpadu",
    categoryId: "cat-ipa",
    score: 76,
    correct: 19,
    total: 25,
    durationMinutes: 44,
    submittedAt: "11 Feb 2026, 14:20",
    status: "Selesai",
  },
  {
    id: "SUB-1038",
    studentName: "Nadia Kirana",
    exam: "Kuis IPA Terpadu",
    categoryId: "cat-ipa",
    score: 0,
    correct: 0,
    total: 25,
    durationMinutes: 0,
    submittedAt: "11 Feb 2026, 14:05",
    status: "Belum Mulai",
  },
  {
    id: "SUB-1037",
    studentName: "Budi Santoso",
    exam: "Latihan Bahasa Inggris",
    categoryId: "cat-bing",
    score: 71,
    correct: 17,
    total: 24,
    durationMinutes: 52,
    submittedAt: "11 Feb 2026, 10:12",
    status: "Selesai",
  },
  {
    id: "SUB-1036",
    studentName: "Siti Nurhaliza",
    exam: "Ujian Sejarah & Sosiologi",
    categoryId: "cat-ips",
    score: 84,
    correct: 21,
    total: 25,
    durationMinutes: 70,
    submittedAt: "10 Feb 2026, 15:30",
    status: "Berlangsung",
  },
  {
    id: "SUB-1035",
    studentName: "Ahmad Fauzi",
    exam: "Ujian Sejarah & Sosiologi",
    categoryId: "cat-ips",
    score: 68,
    correct: 17,
    total: 25,
    durationMinutes: 66,
    submittedAt: "10 Feb 2026, 15:02",
    status: "Selesai",
  },
]

export const dashboardStats = [
  {
    key: "questions",
    label: "Total Soal",
    value: "1.011",
    delta: "+48 minggu ini",
    trend: "up" as const,
  },
  {
    key: "categories",
    label: "Kategori",
    value: "6",
    delta: "+1 bulan ini",
    trend: "up" as const,
  },
  {
    key: "users",
    label: "Pengguna Aktif",
    value: "842",
    delta: "+3,2% dari bulan lalu",
    trend: "up" as const,
  },
  {
    key: "attempts",
    label: "Pengerjaan Selesai",
    value: "2.480",
    delta: "-1,1% dari bulan lalu",
    trend: "down" as const,
  },
]

export const scoreDistribution = [
  { label: "0–49", value: 42 },
  { label: "50–59", value: 88 },
  { label: "60–69", value: 176 },
  { label: "70–79", value: 264 },
  { label: "80–89", value: 318 },
  { label: "90–100", value: 205 },
]

export const weeklyActivity = [
  { day: "Sen", value: 320 },
  { day: "Sel", value: 410 },
  { day: "Rab", value: 285 },
  { day: "Kam", value: 470 },
  { day: "Jum", value: 512 },
  { day: "Sab", value: 198 },
  { day: "Min", value: 96 },
]

export const recentActivity = [
  {
    id: "a-1",
    actor: "Siti Nurhaliza",
    action: "menambahkan 12 soal baru ke",
    target: "Matematika",
    time: "12 menit lalu",
    tone: "indigo" as const,
  },
  {
    id: "a-2",
    actor: "Budi Santoso",
    action: "menerbitkan paket ujian",
    target: "UTS Bahasa Indonesia",
    time: "48 menit lalu",
    tone: "emerald" as const,
  },
  {
    id: "a-3",
    actor: "Ahmad Fauzi",
    action: "mengimpor soal dari Excel ke",
    target: "Ilmu Pengetahuan Alam",
    time: "2 jam lalu",
    tone: "amber" as const,
  },
  {
    id: "a-4",
    actor: "Fajar Hidayat",
    action: "menonaktifkan akun",
    target: "Rizky Pratama",
    time: "5 jam lalu",
    tone: "rose" as const,
  },
  {
    id: "a-5",
    actor: "Siti Nurhaliza",
    action: "memperbarui kunci jawaban",
    target: "Bahasa Inggris",
    time: "Kemarin",
    tone: "sky" as const,
  },
]

export const topCategories = [
  { categoryId: "cat-mat", attempts: 684, average: 78 },
  { categoryId: "cat-bind", attempts: 542, average: 82 },
  { categoryId: "cat-ipa", attempts: 431, average: 71 },
  { categoryId: "cat-bing", attempts: 389, average: 74 },
  { categoryId: "cat-ips", attempts: 276, average: 80 },
]

/* ------------------------------------------------------------------ */
/* Portal siswa (sisi user)                                            */
/* ------------------------------------------------------------------ */

export const toneClasses: Record<
  Category["tone"],
  { bg: string; text: string; ring: string }
> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/20",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-500/20",
  },
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
    ring: "ring-sky-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/20",
  },
}
