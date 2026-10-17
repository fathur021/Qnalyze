"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

export function PasswordField({
  id,
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  invalid,
  className,
}: {
  id: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  invalid?: boolean
  className?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        className="pr-9"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}
