import Link from "next/link"
import {
  BookOpenText,
  Calculator,
  Languages,
  Lightbulb,
  PlayCircle,
  Shapes,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/mock-data"
import type { CategoryMeta } from "@/lib/portal-data"
import { cn } from "cn"

const iconByCategory: Record<string, LucideIcon> = {
  "cat-verbal": Languages,
  "cat-numerik": Calculator,
  "cat-figural": Shapes,
  "cat-logika": Lightbulb,
  "cat-analisis": Target,
  "cat-kepribadian": Users,
}

export function CategoryCard({
  category,
  meta,
  showStats = false,
  className,
}: {
  category: Category
  meta: CategoryMeta
  showStats?: boolean
  className?: string
}) {
  const Icon = iconByCategory[category.id] ?? BookOpenText

  return (
    <Card
      className={cn(
        "group h-full transition-shadow hover:shadow-md",
        className
      )}
    >
      <CardContent className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className={cn("border-0", meta.badgeClass)}>
            {meta.badgeLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {category.questionCount} Butir
          </span>
        </div>

        <span className="mt-3 flex size-10 items-center justify-center rounded-lg bg-muted text-primary transition-transform group-hover:scale-105">
          <Icon className="size-5" />
        </span>

        <h3 className="mt-3 font-heading text-base font-semibold tracking-tight text-foreground">
          {category.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {category.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {showStats ? (
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Rata-rata Skor</dt>
              <dd className="font-semibold tabular-nums text-foreground">
                {meta.avgScore}{" "}
                <span className="font-normal text-muted-foreground">/ 1000</span>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Pengerja</dt>
              <dd className="flex items-center gap-1 font-semibold tabular-nums text-foreground">
                <Users className="size-3.5 text-muted-foreground" />
                {meta.students.toLocaleString("id-ID")}
                <span className="font-normal text-muted-foreground">siswa</span>
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted-foreground">Tingkat</dt>
              <dd className="font-medium text-foreground">{meta.difficulty}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-4 pt-1">
          <Button
            nativeButton={false}
            render={<Link href="/kerjakan" />}
            className="w-full"
          >
            Mulai Latihan
            <PlayCircle data-icon="inline-end" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
