import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  tint = "bg-primary/10 text-primary",
}: {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down"
  icon: LucideIcon
  tint?: string
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight

  return (
    <Card size="sm">
      <CardContent className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="font-heading text-2xl font-semibold tabular-nums text-foreground">
            {value}
          </p>
          {delta ? (
            <p
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              <TrendIcon className="size-3.5" />
              {delta}
            </p>
          ) : null}
        </div>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            tint
          )}
        >
          <Icon className="size-4.5" />
        </span>
      </CardContent>
    </Card>
  )
}
