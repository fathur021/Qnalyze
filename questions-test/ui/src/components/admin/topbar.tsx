"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, GraduationCap, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { isNavActive, mainNav } from "@/lib/nav"
import { cn } from "cn"

export function Topbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" className="lg:hidden" />}
        >
          <Menu />
          <span className="sr-only">Buka menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Menu Utama</DropdownMenuLabel>
            {mainNav.map((item) => {
              const Icon = item.icon
              const active = isNavActive(pathname, item)
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

      <Link href="/admin" className="flex items-center gap-2 lg:hidden">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-4" />
        </span>
        <span className="font-heading text-sm font-semibold">Qnalyze</span>
      </Link>

      <div className="relative ml-auto hidden w-full max-w-sm md:block lg:ml-0">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari soal, kategori, atau pengguna…"
          className="pl-8"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifikasi"
          className="relative"
        >
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
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
              <AvatarFallback className="bg-primary/10 text-primary">
                AF
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-sm text-foreground">
                Ahmad Fauzi
              </DropdownMenuLabel>
              <DropdownMenuLabel className="pt-0 font-normal">
                ahmad.fauzi@qnalyze.id
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil Saya</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan Akun</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
