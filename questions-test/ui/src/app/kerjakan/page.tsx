"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  ListChecks,
  LogOut,
  Network,
  Timer,
} from "lucide-react"

import { QuestionCard } from "@/components/portal/quiz/question-card"
import { QuestionNavigator } from "@/components/portal/quiz/question-navigator"
import { SubmitDialog } from "@/components/portal/quiz/submit-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quizSession } from "@/lib/portal-data"
import { cn } from "cn"

const logicTerms = [
  { label: "Term Mayor (P)", value: "Paham Rekayasa Genetika" },
  { label: "Term Penengah (M)", value: "Ilmuwan Bioteknologi" },
  { label: "Term Minor (S)", value: "Aktivis Lingkungan Hidup" },
]

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export default function KerjakanPage() {
  const router = useRouter()
  const total = quizSession.questions.length
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [secondsLeft, setSecondsLeft] = useState(
    quizSession.durationLimitMinutes * 60
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const question = quizSession.questions[current]
  const answeredSet = new Set(
    Object.keys(answers).map((key) => Number(key))
  )
  const answeredCount = answeredSet.size
  const completeness = Math.round((answeredCount / total) * 100)
  const isFlagged = flagged.has(question.number)

  const select = (key: string) => {
    setAnswers((prev) => ({ ...prev, [question.number]: key }))
  }

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(question.number)) next.delete(question.number)
      else next.add(question.number)
      return next
    })
  }

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, index)))
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </span>
            <span className="font-heading text-sm font-semibold text-foreground">
              QuizHub
            </span>
          </Link>
          <span className="hidden h-6 w-px bg-border sm:block" />
          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="text-xs text-muted-foreground">Sesi Latihan</span>
            <span className="truncate text-sm font-medium text-foreground">
              {quizSession.title}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1 tabular-nums"
              aria-label="Waktu tersisa"
            >
              <Timer className="size-3.5" />
              {formatTime(secondsLeft)}
            </Badge>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Soal {current + 1} dari {total}
            </span>
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              variant="ghost"
              size="sm"
            >
              <LogOut data-icon="inline-start" />
              <span className="hidden sm:inline">Keluar Latihan</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge
                  variant="secondary"
                  className="border-0 bg-primary/10 text-primary"
                >
                  Mode Latihan Mandiri
                </Badge>
                <div className="space-y-1">
                  <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {quizSession.title}: {quizSession.packageLabel}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Kelengkapan: {completeness}% ({answeredCount} dari {total}{" "}
                    soal)
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <QuestionCard
                  question={question}
                  mode="answering"
                  value={answers[question.number]}
                  onSelect={select}
                />
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Soal Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleFlag}
                  className={cn(
                    isFlagged &&
                      "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  )}
                >
                  {isFlagged ? (
                    <BookmarkCheck data-icon="inline-start" />
                  ) : (
                    <Bookmark data-icon="inline-start" />
                  )}
                  {isFlagged ? "Ditandai Ragu" : "Tandai Ragu-ragu"}
                </Button>
                <Button
                  onClick={() => goTo(current + 1)}
                  disabled={current === total - 1}
                >
                  Soal Selanjutnya
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                <Network className="size-4.5" />
              </span>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Struktur Logika Soal
                </p>
                <p className="text-xs text-muted-foreground">
                  Metode: Diagram Venn Silogisme
                </p>
                <dl className="grid gap-1.5">
                  {logicTerms.map((term) => (
                    <div
                      key={term.label}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <dt className="text-muted-foreground">{term.label}</dt>
                      <dd className="font-medium text-foreground">
                        {term.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <ListChecks className="size-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Navigasi Nomor Soal
                </p>
              </div>
              <QuestionNavigator
                total={total}
                current={current}
                answered={answeredSet}
                flagged={flagged}
                onSelect={goTo}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Tips Latihan Terarah
                </p>
                <p>
                  Jawaban dapat diubah kapan saja sebelum menekan tombol
                  kumpulkan. Latihan ini tidak memiliki batas waktu pengerjaan.
                </p>
              </div>
            </CardContent>
          </Card>

          <SubmitDialog
            total={total}
            answered={answeredCount}
            flagged={flagged.size}
            onConfirm={() => router.push("/")}
          />
        </aside>
      </div>
    </div>
  )
}
