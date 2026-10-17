import { BookOpen, ClipboardCheck, Tags, Users } from "lucide-react"

import { PageHeader } from "@/components/admin/page-header"
import { StatCard } from "@/components/admin/stat-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  dashboardStats,
  recentActivity,
  scoreDistribution,
  topCategories,
  weeklyActivity,
  categoryName,
  toneClasses,
} from "@/lib/mock-data"

const statIcons = [BookOpen, Tags, Users, ClipboardCheck] as const
const statTints = [
  "bg-primary/10 text-primary",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
] as const

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

export default function AdminDashboardPage() {
  const maxActivity = Math.max(...weeklyActivity.map((d) => d.value))
  const maxScore = Math.max(...scoreDistribution.map((d) => d.value))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan aktivitas bank soal, pengguna, dan hasil asesmen."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            trend={stat.trend}
            icon={statIcons[index]}
            tint={statTints[index]}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Pengerjaan</CardTitle>
            <CardDescription>
              Jumlah soal dikerjakan siswa selama 7 hari terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-52 items-end gap-3">
              {weeklyActivity.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {day.value}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                    style={{
                      height: `${Math.round((day.value / maxActivity) * 160)}px`,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sebaran Nilai</CardTitle>
            <CardDescription>
              Distribusi nilai pengerjaan seluruh asesmen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scoreDistribution.map((bucket) => (
              <div key={bucket.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    {bucket.label}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {bucket.value} siswa
                  </span>
                </div>
                <Progress value={(bucket.value / maxScore) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Perubahan terakhir pada bank soal dan pengguna.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((item) => {
              const tone = toneClasses[item.tone]
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <Avatar size="sm" className="mt-0.5">
                    <AvatarFallback
                      className={`${tone.bg} ${tone.text} text-[0.65rem] font-semibold`}
                    >
                      {initials(item.actor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="text-foreground">
                      <span className="font-medium">{item.actor}</span>{" "}
                      <span className="text-muted-foreground">
                        {item.action}
                      </span>{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kategori Terpopuler</CardTitle>
            <CardDescription>
              Berdasarkan jumlah pengerjaan dan nilai rata-rata.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.map((item, index) => (
              <div key={item.categoryId} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {categoryName(item.categoryId)}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {item.attempts} pengerjaan
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Progress value={item.average} />
                  </div>
                </div>
                <Badge variant="secondary" className="tabular-nums">
                  {item.average}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
