import Link from "next/link"

const footerLinks = [
  { label: "Panduan Belajar", href: "#" },
  { label: "Ketentuan Layanan", href: "#" },
  { label: "Bantuan", href: "#" },
]

export function PortalFooter() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-heading text-sm font-semibold text-foreground">
            QuizHub
          </span>
          <span className="text-xs text-muted-foreground">
            © 2026 QuizHub Indonesia. Hak Cipta Dilindungi.
          </span>
        </div>
        <nav className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
