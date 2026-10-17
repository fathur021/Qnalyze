import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "cn"

export type Crumb = {
  label: string
  href?: string
}

export function PortalBreadcrumbs({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-muted-foreground",
        className
      )}
    >
      {items.map((item, index) => {
        const last = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {item.href && !last ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(last && "font-medium text-foreground")}
                aria-current={last ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!last ? (
              <ChevronRight className="size-3.5 text-muted-foreground/60" />
            ) : null}
          </span>
        )
      })}
    </nav>
  )
}
