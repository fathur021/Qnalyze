"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Clock,
  Download,
  GraduationCap,
  Lightbulb,
  PlayCircle,
  PlusCircle,
  RefreshCw,
  Search,
} from "lucide-react"

import { PortalBreadcrumbs } from "@/components/portal/breadcrumbs"
import { attemptStatusMeta } from "@/components/portal/attempt-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, categoryName } from "@/lib/mock-data"
import { attemptHistory, recommendations } from "@/lib/portal-data"
import { cn } from "cn"

const categoryOptions = [
  { value: "all", label: "Semua Kategori" },
  ...categories.map((category) => ({
    value: category.id,
    label: category.name,
  })),
]

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "lulus", label: "Lulus KKM" },
  { value: "remedial", label: "Remedial" },
]

const rangeOptions = [
  { value: "all", label: "Semua Riwayat" },
  { value: "7d", label: "7 Hari Terakhir" },
  { value: "30d", label: "30 Hari Terakhir" },
]

export default function RiwayatPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [range, setRange] = useState("all")

  const stats = useMemo(() => {
    const sessions = attemptHistory.length
    const average =
      sessions === 0
        ? 0
        : attemptHistory.reduce((sum, item) => sum + item.score, 0) / sessions
    const passed = attemptHistory.filter(
      (item) => item.outcome !== "Remedial"
    ).length
    const completion = sessions === 0 ? 0 : (passed / sessions) * 100
    return { sessions, average, completion, passed }
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return attemptHistory.filter((attempt) => {
      const matchesQuery = !term || attempt.title.toLowerCase().includes(term)
      const matchesCategory =
        category === "all" || attempt.categoryId === category
      const matchesStatus =
        status === "all" ||
        (status === "lulus" && attempt.outcome !== "Remedial") ||
        (status === "remedial" && attempt.outcome === "Remedial")
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [query, category, status])

  return (
    <div className="space-y-6">
      <PortalBreadcrumbs
        items={[{ label: "Beranda", href: "/" }, { label: "Riwayat Latihan" }]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            <GraduationCap className="size-3.5" />
            Arsip Evaluasi Mandiri
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Riwayat Latihan
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Pantau rekam jejak pengerjaan soal, tren peningkatan skor, dan
            tinjau pembahasan asesmen sebelumnya.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Unduh Riwayat
          </Button>
          <Button nativeButton={false} render={<Link href="/kerjakan" />}>
            <PlusCircle data-icon="inline-start" />
            Mulai Latihan Baru
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Sesi Selesai</p>
            <p className="font-heading text-2xl font-bold tabular-nums text-foreground">
              {stats.sessions}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                Sesi
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Rata-rata Skor Keseluruhan
            </p>
            <p className="font-heading text-2xl font-bold tabular-nums text-foreground">
              {stats.average.toFixed(1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / 100
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Tingkat Ketuntasan
            </p>
            <p className="font-heading text-2xl font-bold tabular-nums text-foreground">
              {stats.completion.toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.passed} dari {stats.sessions} sesi lulus
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari riwayat latihan…"
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            items={categoryOptions}
            value={category}
            onValueChange={(value) => setCategory(value as string)}
          >
            <SelectTrigger className="min-w-40" aria-label="Filter kategori">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            items={statusOptions}
            value={status}
            onValueChange={(value) => setStatus(value as string)}
          >
            <SelectTrigger className="min-w-40" aria-label="Filter status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            items={rangeOptions}
            value={range}
            onValueChange={(value) => setRange(value as string)}
          >
            <SelectTrigger className="min-w-40" aria-label="Filter rentang">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filtered.map((attempt) => {
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
                          <Badge variant="outline" className="hidden sm:inline-flex">
                            {categoryName(attempt.categoryId)}
                          </Badge>
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {attempt.submittedAt}
                          </span>
                          <span>•</span>
                          <span>{attempt.durationLabel}</span>
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
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-5" />
            </span>
            <div>
              <p className="font-medium text-foreground">
                Belum Ada Riwayat Latihan
              </p>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Tidak ada riwayat yang cocok dengan filter kamu. Mulai latihan
                sekarang untuk menguji pemahaman konsep dan melihat grafik
                perkembangan belajarmu.
              </p>
            </div>
            <Button nativeButton={false} render={<Link href="/kerjakan" />}>
              <PlayCircle data-icon="inline-start" />
              Mulai Latihan
            </Button>
          </CardContent>
        </Card>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Rekomendasi Modul Untuk Memulai
          </h2>
          <p className="text-sm text-muted-foreground">
            Modul pilihan untuk membangun kebiasaan belajar yang konsisten.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendations.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-primary">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
                <Button
                  nativeButton={false}
                  render={<Link href="/kerjakan" />}
                  variant="outline"
                  size="sm"
                  className="mt-auto w-full"
                >
                  {item.questionCount} Soal
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardContent className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Lightbulb className="size-4.5" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Tips Belajar QuizHub
            </p>
            <p className="text-sm text-muted-foreground">
              Mulai dengan latihan berdurasi 10–15 menit setiap hari untuk
              membangun kebiasaan belajar dan melacak tren akurasi nilaimu
              secara otomatis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
