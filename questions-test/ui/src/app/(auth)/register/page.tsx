"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiError, register } from "@/lib/api"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type RegisterErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  agree?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { refresh } = useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const next: RegisterErrors = {}
    if (!name.trim()) {
      next.name = "Nama lengkap wajib diisi."
    }
    if (!email.trim()) {
      next.email = "Email wajib diisi."
    } else if (!emailPattern.test(email)) {
      next.email = "Format email tidak valid."
    }
    if (!password) {
      next.password = "Kata sandi wajib diisi."
    } else if (password.length < 8) {
      next.password = "Kata sandi minimal 8 karakter."
    }
    if (!confirmPassword) {
      next.confirmPassword = "Konfirmasi kata sandi wajib diisi."
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Konfirmasi kata sandi tidak cocok."
    }
    if (!agree) {
      next.agree = "Anda harus menyetujui Syarat & Ketentuan."
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
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      })
      await refresh()
      toast.success("Akun berhasil dibuat", {
        description: "Selamat datang di Qnalyze.",
      })
      router.push("/admin")
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Terjadi kesalahan tak terduga."
      setFormError(message)
      toast.error("Gagal mendaftar", { description: message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Buat akun baru</CardTitle>
          <CardDescription>
            Gratis, tanpa kartu kredit. Mulai latihan dalam hitungan menit.
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
              <Label htmlFor="register-name">Nama Lengkap</Label>
              <Input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }))
                  }
                }}
                placeholder="Nama lengkap Anda"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "register-name-error" : undefined}
              />
              {errors.name ? (
                <p
                  id="register-name-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
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
                aria-describedby={errors.email ? "register-email-error" : undefined}
              />
              {errors.email ? (
                <p
                  id="register-email-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="register-password">Kata Sandi</Label>
              <PasswordField
                id="register-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }
                }}
                autoComplete="new-password"
                invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
              />
              {errors.password ? (
                <p
                  id="register-password-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.password}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Minimal 8 karakter.
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="register-confirm-password">
                Konfirmasi Kata Sandi
              </Label>
              <PasswordField
                id="register-confirm-password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
                  }
                }}
                autoComplete="new-password"
                invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? "register-confirm-password-error"
                    : undefined
                }
              />
              {errors.confirmPassword ? (
                <p
                  id="register-confirm-password-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label className="flex items-start gap-2 text-sm text-muted-foreground select-none">
                <Checkbox
                  className="mt-0.5"
                  checked={agree}
                  onCheckedChange={(checked) => {
                    setAgree(Boolean(checked))
                    if (errors.agree) {
                      setErrors((prev) => ({ ...prev, agree: undefined }))
                    }
                  }}
                  aria-invalid={Boolean(errors.agree)}
                  aria-describedby={errors.agree ? "register-agree-error" : undefined}
                />
                <span>
                  Saya menyetujui{" "}
                  <span className="font-medium text-primary">
                    Syarat &amp; Ketentuan
                  </span>{" "}
                  serta{" "}
                  <span className="font-medium text-primary">
                    Kebijakan Privasi
                  </span>{" "}
                  Qnalyze.
                </span>
              </label>
              {errors.agree ? (
                <p
                  id="register-agree-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.agree}
                </p>
              ) : null}
            </div>

            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <UserPlus data-icon="inline-start" />
              )}
              Buat Akun
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  )
}
