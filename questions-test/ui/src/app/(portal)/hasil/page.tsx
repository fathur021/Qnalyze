"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Gauge,
  History,
  RotateCcw,
  Rocket,
  Timer,
  TrendingUp,
  XCircle,
} from "lucide-react"

import { PortalBreadcrumbs } from "@/components/portal/breadcrumbs"
import { QuestionCard } from "@/components/portal/quiz/question-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  latestResult,
  quizSession,
  recommendations,
  topicMastery,
  type QuizQuestion,
} from "@/lib/portal-data"
import { portalUser } from "@/lib/portal-user"
import { cn } from "cn"

function wrongKeyFor(question: QuizQuestion) {
  return question.options.find((option) => option.key !== question.answer)?.key ?? question.answer
}

export default function HasilPage() {
  const [tab, setTab] = useState("all")
  const total = quizSession.questions.length
  const wrongCount = latestResult.wrongNumbers.length
  const correctCount = total - wrongCount
  const firstName = portalUser.name.split(" ")[0]

  const userAnswers = useMemo(() => {
    const map: Record<number, string> = {}
    quizSession.questions.forEach((question) => {
      map[question.number] = latestResult.wrongNumbers.includes(question.number)
        ? wrongKeyFor(question)
        : question.answer
    })
    return map
  }, [])

  const questionsFor = (filter: "all" | "wrong" | "correct") =>
    quizSession.questions.filter((question) => {
      const wrong = latestResult.wrongNumbers.includes(question.number)
      if (filter === "wrong") return wrong
      if (filter === "correct") return !wrong
      return true
    })

  const jumpTo = (number: number) => {
    setTab("all")
    window.setTimeout(() => {
      document
        .getElementById(`soal-${number}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const renderList = (questions: QuizQuestion[]) => (
    <div className="space-y-4">
      {questions.map((question) => {
        const wrong = latestResult.wrongNumbers.includes(question.number)
        return (
          <div
            key={question.id}
            id={`soal-${question.number}`}
            className="scroll-mt-24 rounded-xl bg-card p-4 ring-1 ring-foreground/5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <span className="text-sm font-semibold text-foreground">
                Soal Nomor {String(question.number).padStart(2, "0")}
              </span>
              {wrong ? (
                <Badge
                  variant="secondary"
                  className="border-0 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                >
                  <XCircle className="size-3.5" />
                  Jawaban Salah (0 Poin)
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="size-3.5" />
                  Jawaban Benar (+10 Poin)
                </Badge>
              )}
            </div>
            <QuestionCard
              question={question}
              mode="review"
              value={userAnswers[question.number]}
            />
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6">
      <PortalBreadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Latihan Soal", href: "/latihan" },
          { label: "Hasil Latihan" },
        ]}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{quizSession.title}</Badge>
            <Badge
              variant="secondary"
              className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              Selesai
            </Badge>
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Hasil Latihan &amp; Pembahasan
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Evaluasi lengkap pengerjaan modul {quizSession.title}. Analisis
            pemahaman konsep, pelajari kekeliruan logika, dan telaah pembahasan
            detail tiap butir soal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button nativeButton={false} render={<Link href="/kerjakan" />}>
            <RotateCcw data-icon="inline-start" />
            Coba Latihan Lagi
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/riwayat" />}
            variant="outline"
          >
            <History data-icon="inline-start" />
            Riwayat Latihan
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="ghost"
          >
            <ArrowLeft data-icon="inline-start" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>

      {/* Score summary */}
      <Card>
        <CardContent className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-primary/5 p-6">
            <span className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <Award className="size-3.5 text-primary" />
              Skor Akhir
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-5xl font-bold tabular-nums text-primary">
                {latestResult.score}
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <Badge
              variant="secondary"
              className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="size-3.5" />
              Lulus · Melampaui KKM
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-heading text-lg font-semibold text-foreground">
                Sangat Memuaskan!
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Hebat, {firstName}! Kamu berhasil menjawab {correctCount} dari{" "}
                {total} soal dengan benar. Tingkat ketelitian penalaran deduktif
                kamu berada di persentil {latestResult.percentile}% siswa
                nasional.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Persentase Keberhasilan
                </span>
                <span className="font-semibold tabular-nums text-foreground">
                  {latestResult.accuracy}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${latestResult.accuracy}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Tercapai
                </span>
                <span>Ambang KKM: {latestResult.kkm}</span>
                <span>Target Ideal: {latestResult.target}+</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="space-y-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4.5" />
            </span>
            <p className="text-xs text-muted-foreground">Jawaban Benar</p>
            <p className="font-heading text-xl font-bold tabular-nums text-foreground">
              {correctCount} / {total}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                Soal
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Mendominasi silogisme
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="size-4.5" />
            </span>
            <p className="text-xs text-muted-foreground">Akurasi</p>
            <p className="font-heading text-xl font-bold tabular-nums text-foreground">
              {latestResult.accuracy}%
            </p>
            <p className="text-xs text-muted-foreground">
              Konsistensi menjawab
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <XCircle className="size-4.5" />
            </span>
            <p className="text-xs text-muted-foreground">Jawaban Salah</p>
            <p className="font-heading text-xl font-bold tabular-nums text-foreground">
              {wrongCount} / {total}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                Soal
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Soal Nomor {latestResult.wrongNumbers.map((n) => String(n).padStart(2, "0")).join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Timer className="size-4.5" />
            </span>
            <p className="text-xs text-muted-foreground">Total Waktu</p>
            <p className="font-heading text-xl font-bold tabular-nums text-foreground">
              {latestResult.durationLabel}
            </p>
            <p className="text-xs text-muted-foreground">
              Batas {latestResult.durationLimitLabel} · {latestResult.timeSaved}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Topic distribution */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Gauge className="size-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Distribusi Kemampuan Topik
            </p>
            <Badge variant="secondary" className="ml-auto">
              Standar UTBK-SNBT
            </Badge>
          </div>
          <div className="space-y-3">
            {topicMastery.map((topic) => (
              <div key={topic.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{topic.topic}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {topic.percent}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full",
                      topic.percent >= 80 ? "bg-emerald-500" : "bg-amber-500"
                    )}
                    style={{ width: `${topic.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review */}
      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Tinjau &amp; Pembahasan Soal
          </h2>
          <p className="text-sm text-muted-foreground">
            Pahami pola argumentasi rasional dan alasan logis di balik setiap
            kunci jawaban.
          </p>
        </div>

        <Tabs value={tab} onValueChange={(value) => setTab(value as string)}>
          <TabsList>
            <TabsTrigger value="all">Semua Soal ({total})</TabsTrigger>
            <TabsTrigger value="wrong">
              Hanya Jawaban Salah ({wrongCount})
            </TabsTrigger>
            <TabsTrigger value="correct">
              Jawaban Benar ({correctCount})
            </TabsTrigger>
          </TabsList>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Lompat ke Soal:</span>
            {quizSession.questions.map((question) => {
              const wrong = latestResult.wrongNumbers.includes(question.number)
              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => jumpTo(question.number)}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md border text-xs font-semibold tabular-nums transition-colors",
                    wrong
                      ? "border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {String(question.number).padStart(2, "0")}
                </button>
              )
            })}
          </div>

          <TabsContent value="all" className="mt-4">
            {renderList(questionsFor("all"))}
          </TabsContent>
          <TabsContent value="wrong" className="mt-4">
            {renderList(questionsFor("wrong"))}
          </TabsContent>
          <TabsContent value="correct" className="mt-4">
            {renderList(questionsFor("correct"))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Recommendation */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Rocket className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Rekomendasi Belajar Personal
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Perkuat pemahamanmu pada kaidah partikularitas dengan mengerjakan{" "}
                {recommendations[0].title}: {recommendations[0].subtitle}.
              </p>
            </div>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/kerjakan" />}
            className="shrink-0"
          >
            Mulai Paket Berikutnya
            <ChevronRight data-icon="inline-end" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
