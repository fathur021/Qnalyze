import type { Difficulty, QuestionOption } from "./mock-data"

export const portalDashboard = {
  targetWeekly: { done: 14, total: 20 },
  metrics: {
    sessionsCompleted: 28,
    sessionsDelta: "+4 minggu ini",
    sessionsTargetPercent: 70,
    averageScore: 84.5,
    kkm: 75,
    percentile: 88,
    accuracy: 86,
    correct: 240,
    totalItems: 278,
  },
}

export type CategoryMeta = {
  badgeLabel: string
  badgeClass: string
  tags: string[]
  avgScore: number
  students: number
  difficulty: string
  level: string
}

export const categoryMeta: Record<string, CategoryMeta> = {
  "cat-mat": {
    badgeLabel: "Populer",
    badgeClass: "bg-primary/10 text-primary",
    tags: ["Aljabar", "Geometri", "Statistika"],
    avgScore: 784,
    students: 1290,
    difficulty: "Sedang – Sulit",
    level: "SMA / UTBK",
  },
  "cat-bind": {
    badgeLabel: "Disarankan",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    tags: ["Membaca", "Tata Bahasa", "Sastra"],
    avgScore: 812,
    students: 980,
    difficulty: "Sedang",
    level: "SMA / UTBK",
  },
  "cat-ipa": {
    badgeLabel: "Wajib",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    tags: ["Fisika", "Biologi", "Kimia"],
    avgScore: 731,
    students: 1120,
    difficulty: "Sedang – Sulit",
    level: "SMA / UTBK",
  },
  "cat-ips": {
    badgeLabel: "Soshum",
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    tags: ["Sejarah", "Geografi", "Ekonomi"],
    avgScore: 766,
    students: 640,
    difficulty: "Sedang",
    level: "SMA / UTBK",
  },
  "cat-bing": {
    badgeLabel: "Disarankan",
    badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    tags: ["Reading", "Grammar", "Vocabulary"],
    avgScore: 798,
    students: 1500,
    difficulty: "Sedang",
    level: "SMA / UTBK",
  },
  "cat-tik": {
    badgeLabel: "Baru",
    badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    tags: ["Komputer", "Internet", "Literasi Digital"],
    avgScore: 822,
    students: 420,
    difficulty: "Mudah – Sedang",
    level: "SMA",
  },
}

export type QuizQuestion = {
  id: string
  number: number
  topic: string
  difficulty: Difficulty
  stimulus?: string
  prompt: string
  options: QuestionOption[]
  answer: string
  guide?: string
  explanation: string
}

export type QuizSession = {
  id: string
  title: string
  packageLabel: string
  categoryId: string
  durationLimitMinutes: number
  questions: QuizQuestion[]
}

export const quizSession: QuizSession = {
  id: "session-tps-01",
  title: "TPS Penalaran Umum — Paket 01",
  packageLabel: "Silogisme & Logika Proposisi",
  categoryId: "cat-mat",
  durationLimitMinutes: 20,
  questions: [
    {
      id: "qs-1",
      number: 1,
      topic: "Silogisme Kategorik",
      difficulty: "Sedang",
      prompt:
        "Semua dokter menguasai anatomi tubuh. Sebagian dokter adalah peneliti medis. Kesimpulan yang paling tepat adalah…",
      options: [
        { key: "A", text: "Semua peneliti medis menguasai anatomi tubuh." },
        { key: "B", text: "Sebagian peneliti medis menguasai anatomi tubuh." },
        { key: "C", text: "Semua yang menguasai anatomi tubuh adalah dokter." },
        { key: "D", text: "Sebagian dokter bukan peneliti medis." },
        { key: "E", text: "Tidak ada peneliti medis yang menguasai anatomi tubuh." },
      ],
      answer: "B",
      guide:
        "Premis universal diikuti premis partikular selalu menghasilkan simpulan partikular.",
      explanation:
        "Karena semua dokter (M) menguasai anatomi (P) dan sebagian dokter adalah peneliti medis (S), maka irisan S dan M pasti berada di dalam P. Simpulan sah: sebagian peneliti medis menguasai anatomi tubuh.",
    },
    {
      id: "qs-2",
      number: 2,
      topic: "Logika Proposisi",
      difficulty: "Sedang",
      prompt:
        "Jika hujan turun maka jalan basah. Ternyata jalan tidak basah. Kesimpulan yang valid adalah…",
      options: [
        { key: "A", text: "Hujan turun." },
        { key: "B", text: "Hujan tidak turun." },
        { key: "C", text: "Jalan tetap basah." },
        { key: "D", text: "Hujan turun dan jalan basah." },
        { key: "E", text: "Tidak dapat disimpulkan." },
      ],
      answer: "B",
      guide: "Gunakan modus tollens: p → q, ¬q, maka ¬p.",
      explanation:
        "Bentuk p → q dengan q yang dinegasikan menghasilkan ¬p (modus tollens). Karena jalan tidak basah, dapat disimpulkan hujan tidak turun.",
    },
    {
      id: "qs-3",
      number: 3,
      topic: "Silogisme Kategorik",
      difficulty: "Sedang",
      stimulus:
        "Semua ilmuwan yang meneliti bioteknologi memiliki pemahaman mendalam tentang rekayasa genetika. Sebagian aktivis lingkungan hidup di organisasi internasional adalah ilmuwan yang meneliti bioteknologi.",
      prompt:
        "Kesimpulan yang paling tepat dan logis dari pernyataan di atas adalah…",
      options: [
        {
          key: "A",
          text: "Semua aktivis lingkungan hidup memiliki pemahaman mendalam tentang rekayasa genetika.",
        },
        {
          key: "B",
          text: "Sebagian aktivis lingkungan hidup di organisasi internasional memiliki pemahaman mendalam tentang rekayasa genetika.",
        },
        {
          key: "C",
          text: "Tidak ada aktivis lingkungan hidup yang memahami rekayasa genetika.",
        },
        {
          key: "D",
          text: "Sebagian ilmuwan bioteknologi bukan merupakan aktivis lingkungan hidup.",
        },
        { key: "E", text: "Semua aktivis lingkungan hidup adalah ilmuwan bioteknologi." },
      ],
      answer: "B",
      guide:
        "Perpaduan premis Universal (A) dan Partikular (I) selalu menghasilkan simpulan Partikular.",
      explanation:
        "Premis mayor bersifat universal, premis minor partikular. Irisan aktivis lingkungan dengan ilmuwan bioteknologi otomatis berada di dalam himpunan pemaham rekayasa genetika. Maka simpulan sah bersifat partikular: sebagian aktivis lingkungan hidup memahami rekayasa genetika.",
    },
    {
      id: "qs-4",
      number: 4,
      topic: "Silogisme Kategorik",
      difficulty: "Sulit",
      prompt:
        "Jika semua mawar berduri dan sebagian tanaman hias adalah mawar, maka simpulan yang paling valid adalah…",
      options: [
        { key: "A", text: "Semua tanaman hias berduri." },
        { key: "B", text: "Sebagian mawar bukan tanaman hias." },
        { key: "C", text: "Sebagian tanaman hias berduri." },
        { key: "D", text: "Semua yang berduri adalah mawar." },
        { key: "E", text: "Semua tanaman hias tidak berduri." },
      ],
      answer: "C",
      guide:
        "Karena salah satu premis partikular, simpulan wajib mengikuti sifat partikular.",
      explanation:
        "Kekeliruan umum adalah menarik simpulan universal. Hanya tanaman hias yang merupakan mawar yang pasti berduri; tanaman hias lain belum tentu. Maka simpulan sah yang tidak terbantahkan adalah sebagian tanaman hias berduri.",
    },
    {
      id: "qs-5",
      number: 5,
      topic: "Simpulan Kausalitas",
      difficulty: "Sedang",
      stimulus:
        "Sejak sekolah menerapkan program literasi 15 menit sebelum pelajaran, nilai rata-rata ujian bahasa siswa meningkat 12%.",
      prompt:
        "Simpulan yang paling tepat berdasarkan informasi tersebut adalah…",
      options: [
        { key: "A", text: "Program literasi pasti penyebab tunggal peningkatan nilai." },
        { key: "B", text: "Program literasi berkaitan dengan peningkatan nilai bahasa." },
        { key: "C", text: "Nilai bahasa siswa tidak pernah turun." },
        { key: "D", text: "Semua siswa membaca 15 menit setiap hari." },
        { key: "E", text: "Program literasi tidak berpengaruh apa pun." },
      ],
      answer: "B",
      guide: "Hubungan sebab-akibat tak selalu tunggal; gunakan simpulan proporsional.",
      explanation:
        "Data menunjukkan kenaikan setelah program diterapkan, namun tidak membuktikan sebab tunggal. Simpulan paling aman adalah adanya keterkaitan antara program literasi dan peningkatan nilai.",
    },
    {
      id: "qs-6",
      number: 6,
      topic: "Logika Proposisi",
      difficulty: "Mudah",
      prompt:
        "Jika sebuah bilangan habis dibagi 4, maka bilangan itu genap. Bilangan 18 tidak habis dibagi 4. Kesimpulan…",
      options: [
        { key: "A", text: "18 genap." },
        { key: "B", text: "18 ganjil." },
        { key: "C", text: "18 tidak dapat disimpulkan genap atau ganjil dari premis." },
        { key: "D", text: "18 habis dibagi 2." },
        { key: "E", text: "Semua bilangan genap habis dibagi 4." },
      ],
      answer: "C",
      explanation:
        "Dari p → q dan ¬p (18 tidak habis dibagi 4) tidak dapat disimpulkan apa pun tentang q. Menyimpulkan berdasarkan negasi anteseden adalah kekeliruan.",
    },
    {
      id: "qs-7",
      number: 7,
      topic: "Silogisme Kategorik",
      difficulty: "Sedang",
      prompt:
        "Semua pegawai bank wajib mengenakan seragam. Beberapa pegawai bank adalah teller. Simpulan yang sah adalah…",
      options: [
        { key: "A", text: "Semua teller wajib mengenakan seragam." },
        { key: "B", text: "Sebagian teller wajib mengenakan seragam." },
        { key: "C", text: "Semua yang berseragam adalah pegawai bank." },
        { key: "D", text: "Tidak ada teller yang berseragam." },
        { key: "E", text: "Semua pegawai bank adalah teller." },
      ],
      answer: "B",
      explanation:
        "Pegawai bank (M) ⊂ berseragam (P); sebagian teller (S) adalah M, sehingga sebagian teller wajib berseragam (partikular).",
    },
    {
      id: "qs-8",
      number: 8,
      topic: "Penalaran Analitis",
      difficulty: "Sulit",
      prompt:
        "Lima siswa A, B, C, D, E duduk berurutan. A di depan B. C di belakang D. E tepat di tengah. B tepat di belakang E. Siapa yang duduk paling depan?",
      options: [
        { key: "A", text: "A" },
        { key: "B", text: "C" },
        { key: "C", text: "D" },
        { key: "D", text: "E" },
        { key: "E", text: "Tidak dapat ditentukan." },
      ],
      answer: "C",
      explanation:
        "Dari aturan: urutan D–C memuat C di belakang D, E di tengah (posisi 3), B di belakang E (posisi ≥4), dan A di depan B. Susunan yang konsisten D–E–C dengan A/B di depan menjadikan D paling depan.",
    },
    {
      id: "qs-9",
      number: 9,
      topic: "Logika Proposisi",
      difficulty: "Sedang",
      prompt:
        "Semua yang rajin berolahraga sehat. Andi tidak sehat. Kesimpulan yang pasti benar adalah…",
      options: [
        { key: "A", text: "Andi rajin berolahraga." },
        { key: "B", text: "Andi tidak rajin berolahraga." },
        { key: "C", text: "Semua orang sehat rajin berolahraga." },
        { key: "D", text: "Andi sakit karena tidak berolahraga." },
        { key: "E", text: "Tidak dapat disimpulkan." },
      ],
      answer: "B",
      explanation:
        "Modus tollens: rajin → sehat; ¬sehat, maka ¬rajin. Andi pasti tidak rajin berolahraga.",
    },
    {
      id: "qs-10",
      number: 10,
      topic: "Simpulan Kausalitas",
      difficulty: "Sedang",
      prompt:
        "Tingkat polusi kota X menurun setelah diberlakukan pembatasan kendaraan pribadi. Simpulan paling tepat adalah…",
      options: [
        { key: "A", text: "Pembatasan kendaraan pasti satu-satunya penyebab." },
        { key: "B", text: "Kebijakan pembatasan berpotensi menurunkan tingkat polusi." },
        { key: "C", text: "Polusi akan terus menurun selamanya." },
        { key: "D", text: "Semua kota harus membatasi kendaraan." },
        { key: "E", text: "Pembatasan tidak berhubungan dengan polusi." },
      ],
      answer: "B",
      explanation:
        "Korelasi waktu tidak membuktikan sebab tunggal, tetapi secara wajar kebijakan tersebut berpotensi menurunkan polusi.",
    },
  ],
}

export type AttemptOutcome = "Sangat Baik" | "Lulus KKM" | "Remedial"

export type Attempt = {
  id: string
  title: string
  categoryId: string
  submittedAt: string
  durationLabel: string
  correct: number
  total: number
  score: number
  outcome: AttemptOutcome
}

export const attemptHistory: Attempt[] = [
  {
    id: "att-1",
    title: "TPS Penalaran Umum — Paket 03",
    categoryId: "cat-mat",
    submittedAt: "Kemarin, 14:20 WIB",
    durationLabel: "16m 40s",
    correct: 18,
    total: 20,
    score: 92,
    outcome: "Sangat Baik",
  },
  {
    id: "att-2",
    title: "Matematika — Aljabar Matriks",
    categoryId: "cat-mat",
    submittedAt: "11 Feb 2026, 09:15 WIB",
    durationLabel: "21m 05s",
    correct: 16,
    total: 20,
    score: 80,
    outcome: "Lulus KKM",
  },
  {
    id: "att-3",
    title: "IPA — Biologi Sel & Genetika Dasar",
    categoryId: "cat-ipa",
    submittedAt: "09 Feb 2026, 19:40 WIB",
    durationLabel: "24m 12s",
    correct: 13,
    total: 20,
    score: 65,
    outcome: "Remedial",
  },
  {
    id: "att-4",
    title: "Bahasa Inggris — Reading Comprehension",
    categoryId: "cat-bing",
    submittedAt: "07 Feb 2026, 20:10 WIB",
    durationLabel: "18m 30s",
    correct: 17,
    total: 20,
    score: 85,
    outcome: "Lulus KKM",
  },
  {
    id: "att-5",
    title: "Bahasa Indonesia — Membaca Kritis",
    categoryId: "cat-bind",
    submittedAt: "04 Feb 2026, 15:55 WIB",
    durationLabel: "14m 20s",
    correct: 19,
    total: 20,
    score: 95,
    outcome: "Sangat Baik",
  },
]

export const topicMastery = [
  { topic: "Silogisme Kategorik", percent: 100 },
  { topic: "Logika Proposisi", percent: 66 },
  { topic: "Simpulan Kausalitas", percent: 100 },
  { topic: "Penalaran Analitis", percent: 83 },
]

export const recommendations = [
  {
    id: "rec-1",
    title: "TPS Penalaran Umum",
    subtitle: "Penarikan Kesimpulan Cepat",
    questionCount: 10,
    categoryId: "cat-mat",
  },
  {
    id: "rec-2",
    title: "Matematika Dasar",
    subtitle: "Aljabar & Aritmetika Praktis",
    questionCount: 15,
    categoryId: "cat-mat",
  },
  {
    id: "rec-3",
    title: "Bahasa Inggris",
    subtitle: "Asesmen Reading Comprehension",
    questionCount: 10,
    categoryId: "cat-bing",
  },
]

export const latestResult = {
  sessionId: quizSession.id,
  title: quizSession.title,
  score: 90,
  kkm: 70,
  target: 85,
  correct: 9,
  total: 10,
  accuracy: 90,
  durationLabel: "14m 25s",
  durationLimitLabel: "20m",
  pacePerQuestion: "~1.4 menit / soal",
  timeSaved: "5m 35s lebih efisien",
  percentile: 92,
  wrongNumbers: [4],
}
