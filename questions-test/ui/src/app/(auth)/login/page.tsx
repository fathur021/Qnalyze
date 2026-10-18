"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"

import { PasswordField } from "@/components/auth/password-field"
import { useSession } from "@/components/auth/session-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiError, login } from "@/lib/api"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type LoginErrors = {
  email?: string
  password?: string
}

export default function LoginPage() {
  const router = useRouter()
  const { refresh } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<LoginErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    setFormError(null)
    if (Object.keys(next).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      await login({ email: email.trim(), password })
      await refresh()
      toast.success("Berhasil masuk", {
        description: "Selamat datang kembali di Qnalyze.",
      })

      const target = new URLSearchParams(window.location.search).get("next")
      const isSafeRedirect =
        !!target &&
        target.startsWith("/") &&
        !target.startsWith("//") &&
        !target.startsWith("/\\") &&
        !target.includes("..")
      router.push(isSafeRedirect ? target : "/admin")
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Terjadi kesalahan tak terduga."
      setFormError(message)
      toast.error("Gagal masuk", { description: message })
    } finally {
      setSubmitting(false)
    }
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
            {formError ? (
              <p
                className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
                role="alert"
              >
                {formError}
              </p>
            ) : null}
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
                placeholder="nama@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "login-email-error" : undefined}
              />
              {errors.email ? (
                <p
                  id="login-email-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.email}
                </p>
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
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }
                }}
                autoComplete="current-password"
                invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
              />
              {errors.password ? (
                <p
                  id="login-password-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.password}
                </p>
              ) : null}
            </div>



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
