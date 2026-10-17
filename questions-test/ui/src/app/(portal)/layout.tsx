import { PortalFooter } from "@/components/portal/footer"
import { PortalHeader } from "@/components/portal/header"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <PortalHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <PortalFooter />
    </div>
  )
}
