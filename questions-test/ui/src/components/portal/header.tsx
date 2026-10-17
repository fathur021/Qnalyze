"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, GraduationCap, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession } from "@/components/auth/session-provider"
import { isPortalNavActive, portalNav } from "@/lib/nav"
import { getInitials } from "@/lib/user"
import { cn } from "cn"

export function PortalHeader() {
  const pathname = usePathname()
  const { user, signOut } = useSession()
  const initials = user ? getInitials(user.name, user.email) : "?"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="flex items-center gap-2">
              <span className="font-heading text-base font-semibold tracking-tight text-foreground">
                QuizHub
              </span>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Portal Belajar
              </Badge>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {portalNav.map((item) => {
              const active = isPortalNavActive(pathname, item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="relative ml-auto hidden w-full max-w-xs lg:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari modul atau materi…"
            className="pl-8"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifikasi"
            className="relative"
          >
            <Bell />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-card" />
          </Button>
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Menu pengguna"
                />
              }
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-primary/10 text-primary text-[0.65rem] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-sm text-foreground">
                  {user?.name ?? "Pengguna"}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="pt-0 font-normal">
                  {user?.email ?? ""}
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                nativeButton={false}
                render={<Link href="/profil" />}
              >
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem
                nativeButton={false}
                render={<Link href="/profil" />}
              >
                Pengaturan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Buka menu"
                />
              }
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Menu Utama</DropdownMenuLabel>
                {portalNav.map((item) => {
                  const Icon = item.icon
                  const active = isPortalNavActive(pathname, item)
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      nativeButton={false}
                      render={<Link href={item.href} />}
                      className={cn(active && "bg-accent text-accent-foreground")}
                    >
                      <Icon />
                      {item.label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
