"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, HelpCircle, LogOut, Settings } from "lucide-react"

import { isNavActive, mainNav } from "@/lib/nav"
import { cn } from "cn"

const footerNav = [
  { label: "Pengaturan Akun", href: "#", icon: Settings },
  { label: "Bantuan", href: "#", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex lg:w-[260px]">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="font-heading text-sm font-semibold text-sidebar-foreground">
            Qnalyze
          </p>
          <p className="text-xs text-muted-foreground">Panel Admin</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="px-2 pt-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Menu Utama
        </p>
        {mainNav.map((item) => {
          const active = isNavActive(pathname, item)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
        {footerNav.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            >
              <Icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="size-4.5 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
