"use client"

import { useState } from "react"
import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Calendar,
  Camera,
  CheckCircle2,
  Eye,
  Flame,
  GraduationCap,
  Info,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  Target,
  Timer,
  TrendingUp,
  UserRound,
} from "lucide-react"

import { PortalBreadcrumbs } from "@/components/portal/breadcrumbs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { portalUser } from "@/lib/portal-user"

const curriculumOptions = [
  {
    value: "kelas-12-utbk",
    label: "Kelas 12 SMA / Persiapan UTBK-SNBT 2025",
  },
  {
    value: "alumni-utbk",
    label: "Alumni / Gap Year (Persiapan UTBK Mandiri)",
  },
  {
    value: "kelas-11-bakat",
    label: "Kelas 11 SMA / Asesmen Bakat Minat",
  },
  {
    value: "kedinasan-skd",
    label: "Persiapan Sekolah Kedinasan & SKD CPNS",
  },
]

const weeklyHours = [
  { day: "Sen", value: 1.2 },
  { day: "Sel", value: 1.5 },
  { day: "Rab", value: 0.8 },
  { day: "Kam", value: 1.6 },
  { day: "Jum", value: 1.4 },
  { day: "Sab", value: 1.0 },
  { day: "Min", value: 1.0 },
]

function Field({
  label,
  hint,
  icon: Icon,
  verified,
  children,
}: {
  label: string
  hint?: string
  icon: typeof UserRound
  verified?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-1.5">
          <Icon className="size-3.5 text-muted-foreground" />
          {label}
        </Label>
        {verified ? (
          <Badge
            variant="secondary"
            className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <BadgeCheck className="size-3" />
            Terverifikasi
          </Badge>
        ) : null}
      </div>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export default function ProfilPage() {
  const [curriculum, setCurriculum] = useState("kelas-12-utbk")
  const [dailyReminder, setDailyReminder] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const maxHours = Math.max(...weeklyHours.map((item) => item.value))

  return (
    <div className="space-y-6">
      <PortalBreadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Profil Pengguna" },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            <UserRound className="size-3.5" />
            Pengaturan Akun · ID: {portalUser.id}
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Profil &amp; Pengaturan Akun
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Kelola informasi pribadi, preferensi belajar asesmen, dan pengaturan
            keamanan akun QuizHub kamu.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="w-fit border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        >
          <CheckCircle2 className="size-3.5" />
          Status Sinkronisasi: Terhubung
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Left column */}
        <div className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-3 text-center">
              <div className="relative">
                <Avatar className="size-20">
                  <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                    {portalUser.initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  aria-label="Perbarui avatar"
                  className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>
              <div>
                <p className="font-heading text-base font-semibold text-foreground">
                  {portalUser.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {portalUser.email}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  <BadgeCheck className="size-3" />
                  {portalUser.role}
                </Badge>
                <Badge variant="outline">{portalUser.target}</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Camera data-icon="inline-start" />
                Perbarui Avatar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Informasi Akademik
              </p>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <GraduationCap className="size-3.5" />
                    Sekolah
                  </dt>
                  <dd className="font-medium text-foreground">
                    {portalUser.school}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <BadgeCheck className="size-3.5" />
                    Tingkat
                  </dt>
                  <dd className="font-medium text-foreground">
                    {portalUser.grade}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <UserRound className="size-3.5" />
                    NISN
                  </dt>
                  <dd className="font-medium tabular-nums text-foreground">
                    {portalUser.nisn}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="size-3.5" />
                    Bergabung
                  </dt>
                  <dd className="font-medium text-foreground">
                    {portalUser.joinedAt}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="size-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Target Belajar
                </p>
              </div>
              <div className="rounded-lg bg-muted/60 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Fokus Utama</p>
                <p className="font-medium text-foreground">
                  {portalUser.target}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  1. Kedokteran UI · 2. Aktuaria ITB
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <Flame className="size-4 text-orange-500" />
                  <p className="mt-1 font-heading text-lg font-bold text-foreground">
                    {portalUser.streakDays} Hari
                  </p>
                  <p className="text-xs text-muted-foreground">Streak belajar</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <Timer className="size-4 text-sky-500" />
                  <p className="mt-1 font-heading text-lg font-bold text-foreground">
                    {portalUser.totalPracticeHours} Jam
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {portalUser.modulesDone} modul selesai
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="size-3.5" />
                    Aktivitas 7 Hari Terakhir
                  </span>
                  <span className="font-medium text-foreground">8.5 Jam</span>
                </div>
                <div className="flex h-16 items-end gap-1.5">
                  {weeklyHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t bg-primary/80"
                        style={{
                          height: `${Math.max(6, (item.value / maxHours) * 48)}px`,
                        }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <UserRound className="size-4 text-primary" />
                  Data Pribadi
                </p>
                <Badge
                  variant="secondary"
                  className="border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="size-3.5" />
                  Terverifikasi
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nama Lengkap"
                  icon={UserRound}
                  hint="Sesuai kartu identitas atau data Dapodik."
                >
                  <Input defaultValue={portalUser.name} />
                </Field>
                <Field
                  label="Alamat Email"
                  icon={Mail}
                  verified
                  hint="Email institusi utama tidak dapat diganti secara mandiri."
                >
                  <Input type="email" defaultValue={portalUser.email} disabled />
                </Field>
                <Field
                  label="Nomor WhatsApp / Seluler"
                  icon={Phone}
                  hint="Digunakan untuk notifikasi jadwal simulasi akbar."
                >
                  <Input defaultValue="+62 812-3456-7890" />
                </Field>
                <Field
                  label="Asal Sekolah / Institusi"
                  icon={MapPin}
                  hint="Wilayah Provinsi DKI Jakarta."
                >
                  <Input defaultValue={portalUser.school} />
                </Field>
              </div>

              <Field
                label="Jenjang & Kurikulum Target"
                icon={GraduationCap}
              >
                <Select
                  items={curriculumOptions}
                  value={curriculum}
                  onValueChange={(value) => setCurriculum(value as string)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {curriculumOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                Perubahan email atau NISN resmi memerlukan verifikasi dari
                koordinator sekolah atau tim bantuan akademik QuizHub.
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="ghost">Batal</Button>
                <Button>
                  <Save data-icon="inline-start" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lock className="size-4 text-primary" />
                Keamanan &amp; Kata Sandi
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Kata Sandi Saat Ini" icon={Lock}>
                  <div className="relative">
                    <Input type="password" defaultValue="password" />
                    <Eye className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>
                <div className="hidden sm:block" />
                <Field
                  label="Kata Sandi Baru"
                  icon={Lock}
                  hint="Kuat — 8+ karakter, kombinasi simbol & angka."
                >
                  <Input type="password" placeholder="••••••••" />
                </Field>
                <Field
                  label="Konfirmasi Kata Sandi Baru"
                  icon={Lock}
                  hint="Pastikan kedua kata sandi sama persis."
                >
                  <Input type="password" placeholder="••••••••" />
                </Field>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button variant="link" className="px-0">
                  Lupa kata sandi lama?
                </Button>
                <Button>
                  <Lock data-icon="inline-start" />
                  Perbarui Kata Sandi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Bell className="size-4 text-primary" />
                Preferensi Notifikasi &amp; Latihan
              </p>
              <label className="flex items-start gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  checked={dailyReminder}
                  onCheckedChange={(checked) =>
                    setDailyReminder(Boolean(checked))
                  }
                />
                <span className="space-y-0.5">
                  <span className="block text-sm font-medium text-foreground">
                    Pengingat Latihan Harian via Email
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Kirimkan pengingat soal latihan setiap pukul 19:00 WIB agar
                    streak belajarmu tidak terputus.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  checked={weeklyReport}
                  onCheckedChange={(checked) =>
                    setWeeklyReport(Boolean(checked))
                  }
                />
                <span className="space-y-0.5">
                  <span className="block text-sm font-medium text-foreground">
                    Rangkuman Rapor Mingguan
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Kirim statistik analisis kelemahan subtes (TPS, Literasi,
                    Penalaran Matematika) setiap hari Minggu.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <Card className="ring-destructive/20">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                <p className="text-sm font-semibold text-destructive">
                  Zona Bahaya Akun
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Tindakan berikut akan mengakhiri sesi aktif di semua peramban
                atau menonaktifkan rekam jejak penilaian simulasi secara
                permanen.
              </p>
              <div className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Keluar dari Sesi Lain
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Saat ini terhubung di Chrome Windows dan Mobile Web Android.
                  </p>
                </div>
                <Button variant="destructive" className="shrink-0">
                  <LogOut data-icon="inline-start" />
                  Keluar dari Sesi Lain
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
