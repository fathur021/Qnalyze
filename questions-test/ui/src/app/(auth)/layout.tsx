import Link from "next/link"
import { BarChart3, GraduationCap, Sparkles, Target } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"

const highlights = [
  {
    icon: Target,
    title: "Bank soal terkurasi",
    description: "Ribuan soal psikotes, SKD, dan tes masuk kerja yang selalu diperbarui.",
  },
  {
    icon: Sparkles,
    title: "Pembahasan mendetail",
    description: "Pelajari langkah penyelesaian setiap soal, bukan sekadar kunci jawaban.",
  },
  {
    icon: BarChart3,
    title: "Statistik kemajuan",
    description: "Pantau skor, waktu pengerjaan, dan area yang masih perlu diperkuat.",
  },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative isolate hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-primary-foreground/10 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">
            Qnalyze
          </span>
        </Link>

        <div className="relative max-w-md space-y-8">
          <div className="space-y-3">
            <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight">
              Taklukkan setiap ujian bersama Qnalyze
            </h1>
            <p className="text-sm text-primary-foreground/80">
              Platform latihan terpadu untuk psikotes, SKD CPNS, dan tes masuk
              kerja — belajar lebih terarah, hasil lebih terukur.
            </p>
          </div>

          <ul className="space-y-5">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
                    <Icon className="size-4" />
                  </span>
                  <span className="space-y-0.5">
                    <span className="block text-sm font-medium">
                      {item.title}
                    </span>
                    <span className="block text-sm text-primary-foreground/75">
                      {item.description}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Qnalyze. Seluruh hak cipta dilindungi.
        </p>
      </aside>

      <main className="flex min-h-svh flex-col bg-background">
        <div className="flex items-center justify-between p-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="font-heading text-base font-semibold tracking-tight">
              Qnalyze
            </span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
          {children}
        </div>
      </main>
    </div>
  )
}
