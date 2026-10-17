"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"

import { PasswordField } from "@/components/auth/password-field"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type LoginErrors = {
  email?: string
  password?: string
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const next: LoginErrors = {}
    if (!email.trim()) {
      next.email = "Email wajib diisi."
    } else if (!emailPattern.test(email)) {
      next.email = "Format email tidak valid."
    }
    if (!password) {
      next.password = "Kata sandi wajib diisi."
    }
    return next
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      return
    }

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      toast.success("Berhasil masuk", {
        description: "Selamat datang kembali di Qnalyze.",
      })
      router.push("/")
    }, 700)
  }

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Masuk ke akun Anda</CardTitle>
          <CardDescription>
            Lanjutkan latihan dan pantau kemajuan belajar Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-xs text-destructive">{errors.email}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Kata Sandi</Label>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Fitur lupa kata sandi segera hadir.")
                  }
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <PasswordField
                id="login-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                invalid={Boolean(errors.password)}
              />
              {errors.password ? (
                <p className="text-xs text-destructive">{errors.password}</p>
              ) : null}
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
              <Checkbox
                checked={remember}
                onCheckedChange={(checked) => setRemember(Boolean(checked))}
              />
              Ingat saya di perangkat ini
            </label>

            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <LogIn data-icon="inline-start" />
              )}
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
}
