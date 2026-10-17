import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  RefreshCw,
  Target,
  TrendingUp,
} from "lucide-react"

import { CategoryCard } from "@/components/portal/category-card"
import { attemptStatusMeta } from "@/components/portal/attempt-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { categories } from "@/lib/mock-data"
import { attemptHistory, categoryMeta, portalDashboard } from "@/lib/portal-data"
import { portalUser } from "@/lib/portal-user"
import { cn } from "cn"

export default function BerandaPage() {
  const firstName = portalUser.name.split(" ")[0]
  const { targetWeekly, metrics } = portalDashboard
  const weeklyPercent = Math.round((targetWeekly.done / targetWeekly.total) * 100)
  const featured = categories.slice(0, 4)
  const recent = attemptHistory.slice(0, 3)
  const accuracyWrongPercent = 100 - metrics.accuracy

  return (
    <div className="space-y-8">
      {/* Greeting banner */}
      <section className="relative overflow-hidden rounded-xl bg-card p-6 ring-1 ring-foreground/5">
        <div className="pointer-events-none absolute -top-16 -right-12 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-48 -bottom-16 size-48 rounded-full bg-sky-500/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
              <Flame className="size-3.5 text-orange-500" />
              <span className="font-semibold text-primary">
                {portalUser.streakDays} Hari Berturut-turut
              </span>
              <span className="text-muted-foreground">
                • Pertahankan ritme belajarmu!
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Halo, {firstName}! 👋
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Siap belajar hari ini? Lanjutkan latihan terpandu untuk
              meningkatkan skor asesmen nasional dan peluang lolos UTBK SNBT
              impianmu.
            </p>
          </div>

          <div className="flex min-w-[240px] items-center gap-4 rounded-xl bg-muted/60 p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="size-6" />
            </span>
            <div className="flex-1 space-y-1.5">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Target Mingguan
              </p>
              <p className="font-heading text-lg font-semibold text-foreground">
                {targetWeekly.done}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  / {targetWeekly.total} Sesi
                </span>
              </p>
              <Progress value={weeklyPercent} />
            </div>
          </div>
        </div>
      </section>

      {/* KPI metrics */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Latihan Selesai
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tabular-nums text-foreground">
                  {metrics.sessionsCompleted}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    Sesi
                  </span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-lg bg-muted text-primary">
                <CheckCircle2 className="size-5" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="secondary"
                className="border-0 bg-sky-500/10 text-sky-600 dark:text-sky-400"
              >
                <TrendingUp className="size-3.5" />
                {metrics.sessionsDelta}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Target tercapai {metrics.sessionsTargetPercent}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rata-rata Nilai
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tabular-nums text-foreground">
                  {metrics.averageScore}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    / 100
                  </span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-lg bg-muted text-emerald-600 dark:text-emerald-400">
                <Gauge className="size-5" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="secondary"
                className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                Di atas KKM ({metrics.kkm})
              </Badge>
              <span className="text-xs text-muted-foreground">
                Persentil ke-{metrics.percentile}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Akurasi Jawaban
                </p>
                <p className="mt-1 font-heading text-3xl font-bold tabular-nums text-foreground">
                  {metrics.accuracy}%{" "}
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Tinggi
                  </span>
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-lg bg-muted text-primary">
                <Target className="size-5" />
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {metrics.correct} benar dari {metrics.totalItems} butir
                </span>
                <span className="font-medium tabular-nums text-foreground">
                  {((metrics.correct / metrics.totalItems) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${metrics.accuracy}%` }}
                />
                <div
                  className="h-full bg-rose-500"
                  style={{ width: `${accuracyWrongPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Pilih Kategori Latihan
            </h2>
            <p className="text-sm text-muted-foreground">
              Modul terstruktur dengan bank soal teruji dan kunci pembahasan
              mendalam.
            </p>
          </div>
          <Link
            href="/latihan"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Lihat Semua Kategori
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              meta={categoryMeta[category.id]}
            />
          ))}
        </div>
      </section>

      {/* Recent attempts */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Latihan Terakhir
            </h2>
            <p className="text-sm text-muted-foreground">
              Lacak evaluasi pengerjaan modul terbaru untuk memperkuat poin
              kelemahan.
            </p>
          </div>
          <Link
            href="/riwayat"
            className="text-sm font-medium text-primary hover:underline"
          >
            Semua Riwayat
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recent.map((attempt) => {
                const meta = attemptStatusMeta[attempt.outcome]
                const Icon = meta.icon
                return (
                  <div
                    key={attempt.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg",
                          meta.className
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {attempt.title}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn("border-0", meta.className)}
                          >
                            {attempt.outcome}
                          </Badge>
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {attempt.submittedAt}
                          </span>
                          <span>•</span>
                          <span>
                            {attempt.correct} / {attempt.total} Benar (
                            {Math.round((attempt.correct / attempt.total) * 100)}
                            %)
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="text-right">
                        <span
                          className={cn(
                            "font-heading text-lg font-bold tabular-nums",
                            attempt.outcome === "Remedial"
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          )}
                        >
                          {attempt.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          / 100
                        </span>
                      </div>
                      {attempt.outcome === "Remedial" ? (
                        <Button
                          nativeButton={false}
                          render={<Link href="/kerjakan" />}
                          size="sm"
                        >
                          <RefreshCw data-icon="inline-start" />
                          Latihan Ulang
                        </Button>
                      ) : (
                        <Button
                          nativeButton={false}
                          render={<Link href="/hasil" />}
                          size="sm"
                          variant="outline"
                        >
                          Tinjau Pembahasan
                          <ChevronRight data-icon="inline-end" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
