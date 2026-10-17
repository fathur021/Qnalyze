import { CheckCircle2, ListChecks, RefreshCw, type LucideIcon } from "lucide-react"

import type { AttemptOutcome } from "@/lib/portal-data"

export const attemptStatusMeta: Record<
  AttemptOutcome,
  { className: string; icon: LucideIcon }
> = {
  "Sangat Baik": {
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  "Lulus KKM": {
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    icon: ListChecks,
  },
  Remedial: {
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    icon: RefreshCw,
  },
}
