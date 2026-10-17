"use client"

import { Bookmark } from "lucide-react"

import { cn } from "cn"

export function QuestionNavigator({
  total,
  current,
  answered,
  flagged,
  onSelect,
}: {
  total: number
  current: number
  answered: Set<number>
  flagged: Set<number>
  onSelect: (index: number) => void
}) {
  const answeredCount = answered.size
  const flaggedCount = flagged.size
  const emptyCount = total - answeredCount

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, index) => {
          const number = index + 1
          const isCurrent = index === current
          const isFlagged = flagged.has(number)
          const isAnswered = answered.has(number)
          return (
            <button
              key={number}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "relative flex h-9 items-center justify-center rounded-lg border text-sm font-semibold tabular-nums transition-colors",
                isFlagged
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : isAnswered
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted",
                isCurrent && "ring-2 ring-primary ring-offset-1 ring-offset-card"
              )}
            >
              {String(number).padStart(2, "0")}
              {isFlagged ? (
                <Bookmark className="absolute -top-1 -right-1 size-3 fill-amber-500 text-amber-500" />
              ) : null}
            </button>
          )
        })}
      </div>

      <ul className="space-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            Dijawab
          </span>
          <span className="tabular-nums">({answeredCount})</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full border border-border" />
            Kosong
          </span>
          <span className="tabular-nums">({emptyCount})</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-amber-500" />
            Ragu
          </span>
          <span className="tabular-nums">({flaggedCount})</span>
        </li>
      </ul>
    </div>
  )
}
