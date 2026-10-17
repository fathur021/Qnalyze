"use client"

import { useSession } from "@/components/auth/session-provider"

export function UserGreeting({ className }: { className?: string }) {
  const { user } = useSession()
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "Pengguna"

  return <h1 className={className}>Halo, {firstName}! 👋</h1>
}
