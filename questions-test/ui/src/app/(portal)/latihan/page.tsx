"use client"

import { useMemo, useState } from "react"
import { BookOpen, Search, SlidersHorizontal } from "lucide-react"

import { PortalBreadcrumbs } from "@/components/portal/breadcrumbs"
import { CategoryCard } from "@/components/portal/category-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/lib/mock-data"
import { categoryMeta } from "@/lib/portal-data"
import { cn } from "cn"

const levelOptions = [
  { value: "all", label: "Semua Jenjang" },
  { value: "sma", label: "SMA / MA" },
  { value: "utbk", label: "UTBK / SNBT" },
]

const sortOptions = [
  { value: "popular", label: "Paling Populer" },
  { value: "name", label: "Nama A–Z" },
]

export default function KatalogPage() {
  const [query, setQuery] = useState("")
  const [level, setLevel] = useState("all")
  const [sort, setSort] = useState("popular")
  const [activeCategory, setActiveCategory] = useState("all")

  const totalQuestions = categories.reduce(
    (sum, category) => sum + category.questionCount,
    0
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    let list = categories.filter((category) => {
      const meta = categoryMeta[category.id]
      const matchesQuery =
        !term ||
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term) ||
        meta.tags.some((tag) => tag.toLowerCase().includes(term))
      const matchesLevel =
        level === "all" ||
        (level === "sma" && meta.level.includes("SMA")) ||
        (level === "utbk" && meta.level.includes("UTBK"))
      const matchesCategory =
        activeCategory === "all" || category.id === activeCategory
      return matchesQuery && matchesLevel && matchesCategory
    })

    list = [...list].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name, "id")
        : b.questionCount - a.questionCount
    )
    return list
  }, [query, level, sort, activeCategory])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <PortalBreadcrumbs
          items={[{ label: "Beranda", href: "/" }, { label: "Latihan Soal" }]}
        />
        <div className="flex flex-col gap-1">
          <span className="inline-flex w-fit items-center gap-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            <BookOpen className="size-3.5" />
            Katalog Soal Terverifikasi
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Latihan Soal &amp; Bank Kategori
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Pilih modul dan mata pelajaran yang ingin kamu pelajari. Semua modul
            dilengkapi kunci jawaban terverifikasi, statistik akurasi, dan
            pembahasan komprehensif berstandar nasional.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:max-w-md">
        <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/5">
          <p className="text-xs font-medium text-muted-foreground">
            Total Soal Aktif
          </p>
          <p className="mt-1 font-heading text-2xl font-bold tabular-nums text-foreground">
            {totalQuestions.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/5">
          <p className="text-xs font-medium text-muted-foreground">Kurikulum</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">
            UTBK / SNBT
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari modul, mata pelajaran, atau topik…"
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            items={levelOptions}
            value={level}
            onValueChange={(value) => setLevel(value as string)}
          >
            <SelectTrigger className="min-w-40" aria-label="Filter jenjang">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            items={sortOptions}
            value={sort}
            onValueChange={(value) => setSort(value as string)}
          >
            <SelectTrigger className="min-w-44" aria-label="Urutkan">
              <SlidersHorizontal className="size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            activeCategory === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          Semua Modul ({categories.length})
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === category.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          dari{" "}
          <span className="font-medium text-foreground">
            {categories.length}
          </span>{" "}
          modul utama
        </p>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Terverifikasi
        </Badge>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              meta={categoryMeta[category.id]}
              showStats
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
          <Search className="size-6 text-muted-foreground" />
          <p className="font-medium text-foreground">Modul tidak ditemukan</p>
          <p className="text-sm text-muted-foreground">
            Coba ubah kata kunci atau filter yang kamu gunakan.
          </p>
        </div>
      )}
    </div>
  )
}
